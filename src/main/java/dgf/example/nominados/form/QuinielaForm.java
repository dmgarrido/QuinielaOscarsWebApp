package dgf.example.nominados.form;

/**
 * A simple Java object (POJO) representing a Quiniela form sent from the client.
 */
public class QuinielaForm {
	
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
	
	
	private QuinielaForm() {}
	
	public QuinielaForm(String pelicula
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
		this.pelicula = pelicula;
		this.actor = actor;
		this.director = director;
		this.actriz = actriz;
		this.actor_reparto = actor_reparto;
		this.actriz_reparto = actriz_reparto;
		this.pelicula_animada = pelicula_animada;
		this.guion_original = guion_original;
		this.guion_adaptado = guion_adaptado;
		this.dis_produccion = dis_produccion;
		this.fotografia = fotografia;
		this.vestuario = vestuario;
		this.montaje = montaje;
		this.efectos = efectos;
		this.maquillaje = maquillaje;
		this.edicion_sonido = edicion_sonido;
		this.mezcla_sonido = mezcla_sonido;
		this.bso = bso;
		this.cancion = cancion;
		
	}
	
	public String getPelicula(){
		return pelicula;
	}
	
	public String getActor() {
		return actor;
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
		//String cancionSinComilla = cancion.replace("'", "\'");
		//return cancionSinComilla;
		return cancion;
	}
	
}
