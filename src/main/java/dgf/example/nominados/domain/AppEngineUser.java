package dgf.example.nominados.domain;

import com.google.appengine.api.users.User;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;

@Entity
public class AppEngineUser {
	
	/*Esta entidad de usuario se utiliza para la app Android, 
	 * que no devuelve el usuario directamente como la aplicación web
	 * En la aplicación web el usuario se registra con la cuenta de google+
	 * y se guarda como tipo de dato User de google appengine
	 * */
	
    @Id
    private String email;
    private User user;
    
    private AppEngineUser() {}
    
    public AppEngineUser(User user) {
        this.user = user;
        this.email = user.getEmail();
    }
    public User getUser() {
        return user;
    }
    public Key<AppEngineUser> getKey() {
        return Key.create(AppEngineUser.class, email);
    }
}
