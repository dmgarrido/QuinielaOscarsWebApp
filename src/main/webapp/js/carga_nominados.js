function carga_nominados(response){
    var arr = JSON.parse(response);
    var i;
    var width = "150";
    var height = "225";
    var width_2 = "200";
    var height_2 = "150";

	var obj = JSON.parse(response);

	// Pelicula
    var out_pelicula = "<table>";
    for(i = 0; i < obj.results.picture.length; i++) {
        out_pelicula += "<tr><td>"+
        	"<img src='" + obj.results.picture[i].title.href +"' width='" + width + "' height='" + height +"'></td>" +
        	"<td><div class='radio'>" +
        	"<input type='radio' id='pelicula' name='pelicula' ng-model='quiniela.pelicula' ng-bind='quiniela.pelicula' value='" + obj.results.picture[i].title.text + "'>"+obj.results.picture[i].title.text+"</div></td>"
        	+"<td><span class='label label-success' ng-show='quiniela.pelicula==\""+ obj.results.picture[i].title.text +"\"'>Tu apuesta</span></td>"
        	+"<td><span class='label label-warning' ng-show='oscar_pelicula==\""+ obj.results.picture[i].title.text +"\"'>Ganador</span></td>";
    }
    //alert(out_pelicula);
    out_pelicula += "</table>";
    document.getElementById("pelicula").innerHTML = out_pelicula;
 
	// Director
    var out_director = "<table><tr>";
    for(i = 0; i < obj.results.directing.length; i++) {
        out_director += "<td><table>" 
        	+"<tr>" 
        	+"<td><img src='" + obj.results.directing[i].title_direc.href +"' width='" + width + "' height='" + height +"'></td>" 
        	+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='director' name='director' ng-model='quiniela.director' ng-bind='quiniela.director' value='" + obj.results.directing[i].title_direc.text + "'>"+obj.results.directing[i].title_direc.text+"</div></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.director==\""+ obj.results.directing[i].title_direc.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_director==\""+ obj.results.directing[i].title_direc.text +"\"'>Ganador</span></td>"
        	+"</tr>"
        	+"</table></td>";
    }
    out_director += "</tr></table>";
    document.getElementById("director").innerHTML = out_director; 
    
	// Actor
    var out_actor = "<table>";
    for(i = 0; i < obj.results.actor_leading.length; i++) {
        out_actor += "<tr><td>" +
    	"<img src='" + obj.results.actor_leading[i].actor.href +"' width='" + width_2 + "' height='" + height_2 +"'></td>" +
    	"<td><div class='radio'>" +
    	"<input type='radio' id='actor' name='actor' ng-model='quiniela.actor' ng-bind='quiniela.actor' value='" + obj.results.actor_leading[i].actor.text + "'>"+obj.results.actor_leading[i].actor.text+"</div></td>"
    	+"<td><span class='label label-success' ng-show='quiniela.actor==\""+ obj.results.actor_leading[i].actor.text +"\"'>Tu apuesta</span></td>"
    	+"<td><span class='label label-warning' ng-show='oscar_actor==\""+ obj.results.actor_leading[i].actor.text +"\"'>Ganador</span></td>";
    }
    out_actor += "</table>";
    document.getElementById("actor").innerHTML = out_actor;       
       
    
	// Actriz
    var out_actriz = "<table>";
    for(i = 0; i < obj.results.actress_leading.length; i++) {
        out_actriz += "<tr><td>" +
    	"<img src='" + obj.results.actress_leading[i].actress.href +"' width='" + width_2 + "' height='" + height_2 +"'></td>" +
    	"<td><div class='radio'>" +        
    	"<input type='radio' id='actriz' name='actriz' ng-model='quiniela.actriz' ng-bind='quiniela.actriz' value='" + obj.results.actress_leading[i].actress.text + "'>"+obj.results.actress_leading[i].actress.text+"</div></td>"
    	+"<td><span class='label label-success' ng-show='quiniela.actriz==\""+ obj.results.actress_leading[i].actress.text +"\"'>Tu apuesta</span></td>"
    	+"<td><span class='label label-warning' ng-show='oscar_actriz==\""+ obj.results.actress_leading[i].actress.text +"\"'>Ganador</span></td>";
    }
    out_actriz += "</table>";
    document.getElementById("actriz").innerHTML = out_actriz;   
    
    
	// Actor Reparto
    var out_actor_rep = "<table>";
    for(i = 0; i < obj.results.actor_supporting.length; i++) {
        out_actor_rep += "<tr><td>" +
    	"<img src='" + obj.results.actor_supporting[i].actor_sup.href +"' width='" + width_2 + "' height='" + height_2 +"'></td>" +
    	"<td><div class='radio'>" +        
    	"<input type='radio' id='actor_reparto' name='actor_reparto' ng-model='quiniela.actor_reparto' ng-bind='quiniela.actor_reparto' value='" + obj.results.actor_supporting[i].actor_sup.text + "'>"+obj.results.actor_supporting[i].actor_sup.text+"</div></td>"
    	+"<td><span class='label label-success' ng-show='quiniela.actor_reparto==\""+ obj.results.actor_supporting[i].actor_sup.text +"\"'>Tu apuesta</span></td>"
    	+"<td><span class='label label-warning' ng-show='oscar_actor_reparto==\""+ obj.results.actor_supporting[i].actor_sup.text +"\"'>Ganador</span></td>";
    }
    out_actor_rep += "</table>";
    document.getElementById("actor_reparto").innerHTML = out_actor_rep;
    
	// Actriz Reparto
    var out_actriz_rep = "<table>";
    for(i = 0; i < obj.results.actress_supporting.length; i++) {
        out_actriz_rep += "<tr><td>" +
    	"<img src='" + obj.results.actress_supporting[i].actress_sup.href +"' width='" + width_2 + "' height='" + height_2 +"'></td>" +
    	"<td><div class='radio'>" +        
    	"<input type='radio' id='actriz_reparto' name='actriz_reparto' ng-model='quiniela.actriz_reparto' ng-bind='quiniela.actriz_reparto' value='" + obj.results.actress_supporting[i].actress_sup.text + "'>"+obj.results.actress_supporting[i].actress_sup.text+"</div></td>"
    	+"<td><span class='label label-success' ng-show='quiniela.actriz_reparto==\""+ obj.results.actress_supporting[i].actress_sup.text +"\"'>Tu apuesta</span></td>"
    	+"<td><span class='label label-warning' ng-show='oscar_actriz_reparto==\""+ obj.results.actress_supporting[i].actress_sup.text +"\"'>Ganador</span></td>";
    }
    out_actriz_rep += "</table>";
    document.getElementById("actriz_reparto").innerHTML = out_actriz_rep;     
    
	// Pelicula Animacion
    var out_pelicula_anim = "<table><tr>";
    for(i = 0; i < obj.results.animated_film.length; i++) {
        out_pelicula_anim += "<td><table>" 
        	+"<tr>" 
        	+"<td><img src='" + obj.results.animated_film[i].title_animated.href +"' width='" + width + "' height='" + height +"'></td>" 
        	+"</tr>"
        	+"<tr>" 
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='pelicula_animada' name='pelicula_animada' ng-model='quiniela.pelicula_animada' ng-bind='quiniela.pelicula_animada' value='" + obj.results.animated_film[i].title_animated.text + "'>"+obj.results.animated_film[i].title_animated.text+"</div></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-success' ng-show='quiniela.pelicula_animada==\""+ obj.results.animated_film[i].title_animated.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-warning' ng-show='oscar_pelicula_animada==\""+ obj.results.animated_film[i].title_animated.text +"\"'>Ganador</span></td>"
        	+"</tr>"
        	+"</table></td>";
    }
    out_pelicula_anim += "</tr></table>";
    document.getElementById("pelicula_animada").innerHTML = out_pelicula_anim;
    
	// Fotografia
    var out_fotografia = "<table><tr>";
    for(i = 0; i < obj.results.cinematography.length; i++) {
    	out_fotografia += "<td><table>"  
        	+"<tr>" 
        	+"<td><img src='" + obj.results.cinematography[i].title_cinema.href +"' width='" + width + "' height='" + height +"'></td>" 
        	+"</tr>"
        	+"<tr>" 
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='fotografia' name='fotografia' ng-model='quiniela.fotografia' ng-bind='quiniela.fotografia' value='" + obj.results.cinematography[i].title_cinema.text + "'>"+obj.results.cinematography[i].title_cinema.text+"</div></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-success' ng-show='quiniela.fotografia==\""+ obj.results.cinematography[i].title_cinema.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-warning' ng-show='oscar_fotografia==\""+ obj.results.cinematography[i].title_cinema.text +"\"'>Ganador</span></td>"
    		+"</tr>"
    		+"</table></td>";
    }
    out_fotografia += "</tr></table>";
    document.getElementById("fotografia").innerHTML = out_fotografia;    
        
	// Vestuario
    var out_vestuario = "<table><tr>";
    for(i = 0; i < obj.results.costume_design.length; i++) {
    	out_vestuario += "<td><table>" 
    		+"<tr>" 
    		+"<td><img src='" + obj.results.costume_design[i].title_costume.href +"' width='" + width + "' height='" + height +"'></td>" 
        	+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='vestuario' name='vestuario' ng-model='quiniela.vestuario' ng-bind='quiniela.vestuario' value='" + obj.results.costume_design[i].title_costume.text + "'>"+obj.results.costume_design[i].title_costume.text+"</div></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-success' ng-show='quiniela.vestuario==\""+ obj.results.costume_design[i].title_costume.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-warning' ng-show='oscar_vestuario==\""+ obj.results.costume_design[i].title_costume.text +"\"'>Ganador</span></td>"
    		+"</tr>"
    		+"</table></td>";
    }
    out_vestuario += "</tr></table>";
    document.getElementById("vestuario").innerHTML = out_vestuario;
    
	// Montaje
    var out_montaje = "<table><tr>";
    for(i = 0; i < obj.results.film_editing.length; i++) {
    	out_montaje += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.film_editing[i].title_editing.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='montaje' name='montaje' ng-model='quiniela.montaje' ng-bind='quiniela.montaje' value='" + obj.results.film_editing[i].title_editing.text + "'>"+obj.results.film_editing[i].title_editing.text+"</div></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-success' ng-show='quiniela.montaje==\""+ obj.results.film_editing[i].title_editing.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>" 
        	+"<td><span class='label label-warning' ng-show='oscar_montaje==\""+ obj.results.film_editing[i].title_editing.text +"\"'>Ganador</span></td>"
    		+"</tr>"
    		+"</table></td>";
    }
    out_montaje += "</tr></table>";
    document.getElementById("montaje").innerHTML = out_montaje;   
    
	// Maquillaje
    var out_maquillaje = "<table><tr>";
    for(i = 0; i < obj.results.makeup.length; i++) {
    	out_maquillaje += "<td><table>"
    		+"<tr>"
    		+"<td><img src='" + obj.results.makeup[i].title_makeup.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='maquillaje' name='maquillaje' ng-model='quiniela.maquillaje' ng-bind='quiniela.maquillaje' value='" + obj.results.makeup[i].title_makeup.text + "'>"+obj.results.makeup[i].title_makeup.text+"</div></td>"
    		+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.maquillaje==\""+ obj.results.makeup[i].title_makeup.text +"\"'>Tu apuesta</span></td>"
    		+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_maquillaje==\""+ obj.results.makeup[i].title_makeup.text +"\"'>Ganador</span></td>"
    		+"</tr>"
    		+"</table></td>";
    }
    out_maquillaje += "</tr></table>";
    document.getElementById("maquillaje").innerHTML = out_maquillaje;   

	// BSO
    var out_bso = "<table><tr>";
    for(i = 0; i < obj.results.music.length; i++) {
    	out_bso += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.music[i].title_music.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='bso' name='bso' ng-model='quiniela.bso' ng-bind='quiniela.bso' value='" + obj.results.music[i].title_music.text + "'>"+obj.results.music[i].title_music.text+"</div></td>"
    		+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.bso==\""+ obj.results.music[i].title_music.text +"\"'>Tu apuesta</span></td>"
    		+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_bso==\""+ obj.results.music[i].title_music.text +"\"'>Ganador</span></td>"
    		+"</tr>"
    		+"</table></td>";
    }
    out_bso += "</tr></table>";
    document.getElementById("bso").innerHTML = out_bso;  
    
	// Cancion
    var out_cancion = "<table><tr>";
    for(i = 0; i < obj.results.song.length; i++) {
    	out_cancion += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.song[i].title_song.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='cancion' name='cancion' ng-model='quiniela.cancion' ng-bind='quiniela.cancion' value='" + obj.results.song[i].title_song.text + "'>"+obj.results.song[i].title_song.text+"</div></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.cancion==\""+ obj.results.song[i].title_song.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_cancion=="+ i +"'>Ganador</span></td>"
        	+"</tr>"
    		+"</table></td>";
    }
    out_cancion += "</tr></table>";
    document.getElementById("cancion").innerHTML = out_cancion;  

	// Diseño produccion
    var out_dis_produccion = "<table><tr>";
    for(i = 0; i < obj.results.production_design.length; i++) {
    	out_dis_produccion += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.production_design[i].title_design.href +"' width='" + width + "' height='" + height +"'></td>"
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='dis_produccion' name='dis_produccion' ng-model='quiniela.dis_produccion' ng-bind='quiniela.dis_produccion' value='" + obj.results.production_design[i].title_design.text + "'>"+obj.results.production_design[i].title_design.text+"</div></td>"
    		+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.dis_produccion==\""+ obj.results.production_design[i].title_design.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_dis_produccion==\""+ obj.results.production_design[i].title_design.text +"\"'>Ganador</span></td>"
        	+"</tr>"
    		+"</table></td>";
    }
    out_dis_produccion += "</tr></table>";
    document.getElementById("dis_produccion").innerHTML = out_dis_produccion;  

	// Edición sonido
    var out_ed_sonido = "<table><tr>";
    for(i = 0; i < obj.results.sound_editing.length; i++) {
    	out_ed_sonido += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.sound_editing[i].title_s_edit.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='edicion_sonido' name='edicion_sonido' ng-model='quiniela.edicion_sonido' ng-bind='quiniela.edicion_sonido' value='" + obj.results.sound_editing[i].title_s_edit.text + "'>"+obj.results.sound_editing[i].title_s_edit.text+"</div></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.edicion_sonido==\""+ obj.results.sound_editing[i].title_s_edit.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_edicion_sonido==\""+ obj.results.sound_editing[i].title_s_edit.text +"\"'>Ganador</span></td>"
        	+"</tr>"
    		+"</table></td>";
    }
    out_ed_sonido += "</tr></table>";
    document.getElementById("edicion_sonido").innerHTML = out_ed_sonido;
    
	// Mezcla sonido
    var out_mz_sonido = "<table><tr>";
    for(i = 0; i < obj.results.sound_mixing.length; i++) {
    	out_mz_sonido += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.sound_mixing[i].title_s_mix.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='mezcla_sonido' name='mezcla_sonido' ng-model='quiniela.mezcla_sonido' ng-bind='quiniela.mezcla_sonido' value='" + obj.results.sound_mixing[i].title_s_mix.text + "'>"+obj.results.sound_mixing[i].title_s_mix.text+"</div></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.mezcla_sonido==\""+ obj.results.sound_mixing[i].title_s_mix.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_mezcla_sonido==\""+ obj.results.sound_mixing[i].title_s_mix.text +"\"'>Ganador</span></td>"
        	+"</tr>"
    		+"</table></td>";
    }
    out_mz_sonido += "</tr></table>";
    document.getElementById("mezcla_sonido").innerHTML = out_mz_sonido;
    
	// Efectos visuales
    var out_efectos = "<table><tr>";
    for(i = 0; i < obj.results.visual_effects.length; i++) {
    	out_efectos += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.visual_effects[i].title_effects.href +"' width='" + width + "' height='" + height +"'></td>"
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='efectos' name='efectos' ng-model='quiniela.efectos' ng-bind='quiniela.efectos' value='" + obj.results.visual_effects[i].title_effects.text + "'>"+obj.results.visual_effects[i].title_effects.text+"</div></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.efectos==\""+ obj.results.visual_effects[i].title_effects.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_efectos==\""+ obj.results.visual_effects[i].title_effects.text +"\"'>Ganador</span></td>"
        	+"</tr>"
    		+"</table></td>";
    }
    out_efectos += "</tr></table>";
    document.getElementById("efectos").innerHTML = out_efectos;   
    
	// Guion original
    var out_guion_o = "<table><tr>";
    for(i = 0; i < obj.results.writing_original.length; i++) {
    	out_guion_o += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.writing_original[i].title_w_orig.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='guion_original' name='guion_original' ng-model='quiniela.guion_original' ng-bind='quiniela.guion_original' value='" + obj.results.writing_original[i].title_w_orig.text + "'>"+obj.results.writing_original[i].title_w_orig.text+"</div></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.guion_original==\""+ obj.results.writing_original[i].title_w_orig.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_guion_original==\""+ obj.results.writing_original[i].title_w_orig.text +"\"'>Ganador</span></td>"
        	+"</tr>"
    		+"</table></td>";
    }
    out_guion_o += "</tr></table>";
    document.getElementById("guion_original").innerHTML = out_guion_o;     
    
	// Guion adaptado
    var out_guion_a = "<table><tr>";
    for(i = 0; i < obj.results.writing_adapted.length; i++) {
    	out_guion_a += "<td><table>" 
    		+"<tr>"
    		+"<td><img src='" + obj.results.writing_adapted[i].title_w_adap.href +"' width='" + width + "' height='" + height +"'></td>" 
    		+"</tr>"
        	+"<tr>"
        	+"<td><div class='radio'>" +
        	"<input type='radio' id='guion_adaptado' name='guion_adaptado' ng-model='quiniela.guion_adaptado' ng-bind='quiniela.guion_adaptado' value='" + obj.results.writing_adapted[i].title_w_adap.text + "'>"+obj.results.writing_adapted[i].title_w_adap.text+"</div></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-success' ng-show='quiniela.guion_adaptado==\""+ obj.results.writing_adapted[i].title_w_adap.text +"\"'>Tu apuesta</span></td>"
        	+"</tr>"
        	+"<tr>"
        	+"<td><span class='label label-warning' ng-show='oscar_guion_adaptado==\""+ obj.results.writing_adapted[i].title_w_adap.text +"\"'>Ganador</span></td>"
        	+"</tr>"
    		+"</table></td>";
    }
    out_guion_a += "</tr></table>";
    document.getElementById("guion_adaptado").innerHTML = out_guion_a;     
}
