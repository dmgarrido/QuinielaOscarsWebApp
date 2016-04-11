package dgf.example.nominados.domain;

import com.googlecode.objectify.annotation.Cache;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;


@Entity
@Cache
public class Jugador {
	@Id
	String userId;
	
	String displayName;
	String mainEmail;
	
	public Jugador (String userId, String displayName, String mainEmail){
		this.userId = userId;
		this.displayName = displayName;
		this.mainEmail = mainEmail;
		
	}
	
	public void update(String displayName){
		if(displayName!=null){
			this.displayName = displayName;
		}
	}
	
	public String getUserId() {
		return userId;
	}
	
	public String getDisplayName() {
		return displayName;
	}

	public String getMainEmail() {
		return mainEmail;
	}
	
	/**
     * Just making the default constructor private.
     */
	private Jugador(){}
	
}
