package dgf.example.nominados;

import static dgf.example.nominados.service.OfyService.factory;
import static dgf.example.nominados.service.OfyService.ofy;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.response.NotFoundException;
import com.google.api.server.spi.response.UnauthorizedException;
import com.google.appengine.api.taskqueue.Queue;
import com.google.appengine.api.taskqueue.QueueFactory;
import com.google.appengine.api.users.User;
import com.google.appengine.api.utils.SystemProperty;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.Work;
import com.googlecode.objectify.cmd.Query;

import dgf.example.nominados.domain.AppEngineUser;
import dgf.example.nominados.domain.Jugador;
import dgf.example.nominados.domain.Quiniela;
import dgf.example.nominados.form.QuinielaForm;

/**
 * Defines APIs.
 */
@Api(name = "nominados", 
	version = "v1", 
	scopes = { Constants.EMAIL_SCOPE }, 
	clientIds = {Constants.WEB_CLIENT_ID, 
				Constants.API_EXPLORER_CLIENT_ID, 
				Constants.ANDROID_CLIENT_ID }, 
	audiences = {Constants.ANDROID_AUDIENCE},
	description = "API for the Nominados Backend application.")
public class NominadosApi {

    /*
     * Get the display name from the user's email. For example, if the email is
     * lemoncake@example.com, then the display name becomes "lemoncake."
     */
    private static String extractDefaultDisplayNameFromEmail(String email) {
        return email == null ? null : email.substring(0, email.indexOf("@"));
    }
    
    /**
     * Creates or updates a Jugador object associated with the given user
     * object.
     *
     * @param user
     *            A User object injected by the cloud endpoints.
     * @return Jugador object just created.
     * @throws UnauthorizedException
     *             when the User object is null.
     */    
    // Declare this method as a method available externally through Endpoints
    @ApiMethod(name = "saveJugador", path = "jugador", httpMethod = HttpMethod.POST)
    public Jugador saveJugador(User user) throws UnauthorizedException {
    	
        String userId = null;
        String mainEmail = null;
        String displayName = null;
        
        if (user == null) {
        	throw new UnauthorizedException("Usuario no autorizado");
        }
        
        userId = getUserId(user);
        mainEmail = user.getEmail();
        
    	Jugador miJugador = ofy().load().key(Key.create(Jugador.class, userId)).now();
    	
    	if (miJugador==null){
    		if (displayName == null){
    			displayName = extractDefaultDisplayNameFromEmail(user.getEmail());
    		}
    		
    		miJugador = new Jugador(userId, displayName, mainEmail);
    	}/* Este else no lo usamos porque ahora mismo no hay posibilidad de modificar nada
    		si en el futuro se añade la funcionalidad habría que descomentarlo
    		
    		else{
    		miJugador.update(displayName);
    	}
    	*/
    	
    	ofy().save().entity(miJugador).now();
    	
    	return(miJugador);
    }
    
    /**
     * This is an ugly workaround for null userId for Android clients.
     *
     * @param user A User object injected by the cloud endpoints.
     * @return the App Engine userId for the user.
     */
    private static String getUserId(User user) {
    	
        String userId = user.getUserId();
        
        if (userId == null) {
        	
            //LOG.info("userId is null, so trying to obtain it from the datastore.");
            AppEngineUser appEngineUser = new AppEngineUser(user);
            ofy().save().entity(appEngineUser).now();
            // Begin new session for not using session cache.
            Objectify objectify = ofy().factory().begin();
            AppEngineUser savedUser = objectify.load().key(appEngineUser.getKey()).now();
            userId = savedUser.getUser().getUserId();
            //LOG.info("Obtained the userId: " + userId);
        }
        return userId;
    }
    
    /**
     * Gets the Jugador entity for the current user
     * or creates it if it doesn't exist
     * @param user
     * @return user's Jugador
     */
    private Jugador getJugadorFromCurrentUser(User user){
    	// First fetch the user's Jugador from the datastore.
    	Jugador jugador = ofy().load().key(Key.create(Jugador.class, getUserId(user))).now();
    	
    	if (jugador==null){
    		// Create a new Jugador if it doesn't exist.
    		String email = user.getEmail();
    		String name = extractDefaultDisplayNameFromEmail(email);
    		
    		jugador = new Jugador(getUserId(user), name, email);
    	}
    	
    	return(jugador);
    }
    
    /**
     * Returns a Jugador object associated with the given user object. The cloud
     * endpoints system automatically inject the User object.
     *
     * @param user
     *            A User object injected by the cloud endpoints.
     * @return Jugador object.
     * @throws UnauthorizedException
     *             when the User object is null.
     */
    @ApiMethod(name = "getJugador", path = "jugador", httpMethod = HttpMethod.GET)
    public Jugador getJugador (User user) throws UnauthorizedException {
        if (user == null) {
            throw new UnauthorizedException("Usuario no autorizado");
        }
        Jugador jugador = ofy().load().key(Key.create(Jugador.class, getUserId(user))).now();
        return(jugador);
    }
    
    /**
     * Creates a new Quiniela object and stores it to the datastore.
     *
     * @param user A user who invokes this method, null when the user is not signed in.
     * @param quinielaForm A QuinielaForm object representing user's inputs.
     * @return A newly created Quiniela Object.
     * @throws UnauthorizedException when the user is not signed in.
     */    
    @ApiMethod(name = "createQuiniela", path = "quiniela", httpMethod = HttpMethod.POST)
    public Quiniela createQuiniela (final User user, final QuinielaForm quinielaForm) throws UnauthorizedException{
        if (user == null) {
            throw new UnauthorizedException("Usuario no autorizado");
        }
        // Allocate Id first, in order to make the transaction idempotent.
        Key<Jugador> jugadorKey = Key.create(Jugador.class, getUserId(user));
        final Key<Quiniela> quinielaKey = factory().allocateId(jugadorKey, Quiniela.class);
        final long quinielaId = quinielaKey.getId();
        final String userId = getUserId(user);


        //List<Quiniela> miQuiniela = ofy().load().key(quinielaKey).now();
        
        Query<Quiniela> query = ofy().load().type(Quiniela.class).ancestor(jugadorKey);
        
        List<Quiniela> listaQuiniela = query.list();
    
        Quiniela miQuiniela = null;
		try {
			miQuiniela = listaQuiniela.get(0);
		} catch (Exception e ) {
			
			//e.printStackTrace();
		}
        
        if (miQuiniela==null){
            // Start a transaction.
            miQuiniela = ofy().transact(new Work<Quiniela>() {
                @Override
                public Quiniela run() {
                	Jugador jugador = getJugadorFromCurrentUser(user);
                	Quiniela miQuiniela = new Quiniela(quinielaId, quinielaForm, jugador.getUserId());
                	// Save Quiniela and Jugador
                	ofy().save().entities(jugador, miQuiniela).now();
                	return miQuiniela;
                }
            });        	
        }else{
        	miQuiniela.updateWithQuinielaForm(quinielaForm);
        	ofy().save().entity(miQuiniela).now();
        }
		return miQuiniela;
    }
    

    /**
     * Returns a Quiniela object with the given quinielaId.
     *
     * @param websafeQuinielaKey The String representation of the Quiniela Key.
     * @return a Quiniela object with the given quinielaId.
     * @throws NotFoundException when there is no Quiniela with the given quinielaId.
     */
    @ApiMethod(name="getQuiniela", path="quiniela", httpMethod=HttpMethod.GET)
    /*
    public Quiniela getQuiniela(@Named("websafeQuinielaKey") final String websafeQuinielaKey)
    		throws NotFoundException{
    	Key<Quiniela> quinielaKey = Key.create(websafeQuinielaKey);
    	Quiniela quiniela = ofy().load().key(quinielaKey).now();
    	if (quiniela == null){
    		throw new NotFoundException("Not found Quiniela with key: "+websafeQuinielaKey);
    	}
    	return quiniela;
    }*/
    public Quiniela getQuiniela(final User user) throws UnauthorizedException, NotFoundException{
        if (user == null) {
            throw new UnauthorizedException("Usuario no autorizado");
        }    	

        Key<Jugador> jugadorKey = Key.create(Jugador.class, getUserId(user));
        Query<Quiniela> query = ofy().load().type(Quiniela.class).ancestor(jugadorKey);
        List<Quiniela> listaQuiniela = query.list();
        Quiniela miQuiniela = null;
		try {
			miQuiniela = listaQuiniela.get(0);
		} catch (Exception e ) {
			
			//e.printStackTrace();
		}

    	if (miQuiniela!=null){
    		return miQuiniela;
    	}else {
    		throw new NotFoundException("Para crear tu Quiniela tienes que rellenar como minimo Mejor Pelicula y pulsar Guardar");
    	}
    	
    }    	
    
    @ApiMethod(name = "enviarQuiniela", path = "EnviarQuiniela", httpMethod = HttpMethod.POST)
    public void enviarQuiniela(final User user) throws UnauthorizedException, NotFoundException{
        
    	if (user == null) {
            throw new UnauthorizedException("Usuario no autorizado");
        } 
        
    	Quiniela miQuiniela = getQuiniela(user);
    	Jugador jugador = getJugadorFromCurrentUser(user);
    	
    	//Enviar
        Properties props = new Properties();
        Session session = Session.getDefaultInstance(props, null);
        String body = "Hola, aquí tienes tu Quiniela de los Oscars 2016.\n" + miQuiniela.toString();
        try {
            Message message = new MimeMessage(session);
            InternetAddress from = new InternetAddress(
                    String.format("noreply@%s.appspotmail.com",
                            SystemProperty.applicationId.get()), "Quiniela de los Oscars 2016");
            message.setFrom(from);
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(jugador.getMainEmail(), ""));
            message.setSubject("Esta es tu Quiniela!");
            message.setText(body);
            Transport.send(message);
        } catch (MessagingException e) {
            //LOG.log(Level.WARNING, String.format("Failed to send an mail to %s", email), e);
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

    	
    	
    }

    
}
