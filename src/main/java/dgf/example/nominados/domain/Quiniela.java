package dgf.example.nominados.domain;

import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.ApiResourceProperty;
import com.google.appengine.api.users.User;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Parent;

import dgf.example.nominados.form.QuinielaForm;

@Entity
@Cache
public class Quiniela {

    /**
     * The id for the datastore key.
     *
     * We use automatic id assignment for entities of Quiniela class.
     */
    @Id
    private long id;
    
    /**
     * Holds Jugador key as the parent.
     */
    @Parent
    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    private Key<Jugador> jugadorKey;
    
    /**
     * The userId of the jugador
     */
    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    private String jugadorUserId;
    
	private String pelicula;
	private String actor;
	
	private String director;
	private String actriz;
	private String actor_reparto;
	private String actriz_reparto;
	private String pelicula_animada;
	private String guion_original;
	private String guion_adaptado;
	private String dis_produccion;
	private String fotografia;
	private String vestuario;
	private String montaje;
	private String efectos;
	private String maquillaje;
	private String edicion_sonido;
	private String mezcla_sonido;
	private String bso;
	private String cancion;
	
    /**
     * Just making the default constructor private.
     */
	private Quiniela(){}
	
	
	public Quiniela(final long id, final QuinielaForm quinielaForm, final String jugadorUserId){
		this.id = id;
		this.jugadorKey = Key.create(Jugador.class, jugadorUserId);
		this.jugadorUserId = jugadorUserId;
		updateWithQuinielaForm(quinielaForm);
		
	}
	
	
    public long getId() {
        return id;
    }	
    
    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    public Key<Jugador> getJugadorKey() {
    	return jugadorKey;
    }
    
    // Get a String version of the key
    public String getWebsafekey(){
    	return Key.create(jugadorKey, Quiniela.class, id).getString();
    }
    
    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    public String getJugadorUserId(){
    	return jugadorUserId;
    }
    
    public String getPelicula() {
		return pelicula;
	}
	public String getActor() {
		return actor;
	}
	
    /**
     * Updates the Quiniela with QuinielaForm.
     * This method is used upon object creation as well as updating existing Quinielas.
     *
     * @param quinielaForm contains form data sent from the client.
     */
	public void updateWithQuinielaForm(QuinielaForm quinielaForm) {
		this.pelicula = quinielaForm.getPelicula();
		this.actor = quinielaForm.getActor();
		this.director = quinielaForm.getDirector();
		this.actriz = quinielaForm.getActriz();
		this.actor_reparto = quinielaForm.getActor_reparto();
		this.actriz_reparto = quinielaForm.getActriz_reparto();
		this.pelicula_animada = quinielaForm.getPelicula_animada();
		this.guion_original = quinielaForm.getGuion_original();
		this.guion_adaptado = quinielaForm.getGuion_adaptado();
		this.dis_produccion = quinielaForm.getDis_produccion();
		this.fotografia = quinielaForm.getFotografia();
		this.vestuario = quinielaForm.getVestuario();
		this.montaje = quinielaForm.getMontaje();
		this.efectos = quinielaForm.getEfectos();
		this.maquillaje = quinielaForm.getMaquillaje();
		this.edicion_sonido = quinielaForm.getEdicion_sonido();
		this.mezcla_sonido = quinielaForm.getMezcla_sonido();
		this.bso = quinielaForm.getBso();
		this.cancion = quinielaForm.getCancion();
		
	}
	
	public void update(String pelicula
			, String actor
			, String director
			, String actriz
			, String actor_reparto
			, String actriz_reparto
			, String pelicula_animada
			, String guion_original
			, String guion_adaptado
			, String dis_produccion
			, String fotografia
			, String vestuario
			, String montaje
			, String efectos
			, String maquillaje
			, String edicion_sonido
			, String mezcla_sonido
			, String bso
			, String cancion)
	{
		if (pelicula!=null){
			this.pelicula = pelicula;
		}
		if (actor!=null){
			this.actor = actor;
		}
		if (director!=null){
			this.director = director;
		}	
		if (actriz!=null){
			this.actriz = actriz;
		}
		if (actor_reparto!=null){
			this.actor_reparto = actor_reparto;
		}
		if (actriz_reparto!=null){
			this.actriz_reparto = actriz_reparto;
		}
		if (pelicula_animada!=null){
			this.pelicula_animada = pelicula_animada;
		}
		if (guion_original!=null){
			this.guion_original = guion_original;
		}
		if (guion_adaptado!=null){
			this.guion_adaptado = guion_adaptado;
		}
		if (dis_produccion!=null){
			this.dis_produccion = dis_produccion;
		}
		if (fotografia!=null){
			this.fotografia = fotografia;
		}
		if (vestuario!=null){
			this.vestuario = vestuario;
		}
		if (montaje!=null){
			this.montaje = montaje;
		}
		if (efectos!=null){
			this.efectos = efectos;
		}
		if (maquillaje!=null){
			this.maquillaje = maquillaje;
		}
		if (edicion_sonido!=null){
			this.edicion_sonido = edicion_sonido;
		}
		if (mezcla_sonido!=null){
			this.mezcla_sonido = mezcla_sonido;
		}
		if (bso!=null){
			this.bso = bso;
		}
		if (cancion!=null){
			this.cancion = cancion;
		}
		
	}
	
	
	public String getDirector() {
		return director;
	}

	public String getActriz() {
		return actriz;
	}
	public String getActor_reparto() {
		return actor_reparto;
	}
	public String getActriz_reparto() {
		return actriz_reparto;
	}
	public String getPelicula_animada() {
		return pelicula_animada;
	}
	public String getGuion_original() {
		return guion_original;
	}
	public String getGuion_adaptado() {
		return guion_adaptado;
	}
	public String getDis_produccion() {
		return dis_produccion;
	}
	public String getFotografia() {
		return fotografia;
	}
	public String getVestuario() {
		return vestuario;
	}
	public String getMontaje() {
		return montaje;
	}
	public String getEfectos() {
		return efectos;
	}
	public String getMaquillaje() {
		return maquillaje;
	}
	public String getEdicion_sonido() {
		return edicion_sonido;
	}
	public String getMezcla_sonido() {
		return mezcla_sonido;
	}
	public String getBso() {
		return bso;
	}
	public String getCancion() {
		return cancion;
	}
	
    @Override
    public String toString() {
    	StringBuilder stringBuilder = new StringBuilder("\n" + "Mejor Pelicula: " + pelicula + "\n");
        if (director != null) {
            stringBuilder.append("Mejor Director: ").append(director).append("\n");
        }
        if (actor != null) {
            stringBuilder.append("Mejor Actor: ").append(actor).append("\n");
        }
        if (actriz != null) {
            stringBuilder.append("Mejor Actriz: ").append(actriz).append("\n");
        }
        if (actor_reparto != null) {
            stringBuilder.append("Mejor Actor de Reparto: ").append(actor_reparto).append("\n");
        }
        if (actriz_reparto != null) {
            stringBuilder.append("Mejor Actriz De Reparto: ").append(actriz_reparto).append("\n");
        }
        if (pelicula_animada != null) {
            stringBuilder.append("Mejor Pelicula Animada: ").append(pelicula_animada).append("\n");
        }
        if (fotografia != null) {
            stringBuilder.append("Mejor Fotografia: ").append(fotografia).append("\n");
        }
        if (vestuario != null) {
            stringBuilder.append("Mejor Vestuario: ").append(vestuario).append("\n");
        }
        if (montaje != null) {
            stringBuilder.append("Mejor Montaje: ").append(montaje).append("\n");
        }
        if (maquillaje != null) {
            stringBuilder.append("Mejor Maquillaje: ").append(maquillaje).append("\n");
        }
        if (bso != null) {
            stringBuilder.append("Mejor Banda Sonora Original: ").append(bso).append("\n");
        }
        if (cancion != null) {
            stringBuilder.append("Mejor Cancion: ").append(cancion).append("\n");
        }
        if (dis_produccion != null) {
            stringBuilder.append("Mejor Diseño de Produccion: ").append(dis_produccion).append("\n");
        }
        if (edicion_sonido != null) {
            stringBuilder.append("Mejor Edicion de Sonido: ").append(edicion_sonido).append("\n");
        }
        if (mezcla_sonido != null) {
            stringBuilder.append("Mejor Mezcla de Sonido: ").append(mezcla_sonido).append("\n");
        }
        if (efectos != null) {
            stringBuilder.append("Mejor Efectos: ").append(efectos).append("\n");
        }
        if (guion_original != null) {
            stringBuilder.append("Mejor Guion Original: ").append(guion_original).append("\n");
        }
        if (guion_adaptado != null) {
            stringBuilder.append("Mejor Guion Adaptado: ").append(guion_adaptado).append("\n");
        }

        stringBuilder.append("\n").append("Suerte!! ");

        return stringBuilder.toString();
    }
}

