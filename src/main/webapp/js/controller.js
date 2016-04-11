'use strict';


var nominadosApp = nominadosApp || {};

nominadosApp.controllers = angular.module('nominadosControllers', ['ui.bootstrap']);

/**
 * @ngdoc controller
 * @name RootCtrl
 *
 * @description
 * The root controller having a scope of the body element and methods used in the application wide
 * such as user authentications.
 *
 */
nominadosApp.controllers.controller('RootCtrl', function ($scope, $modal, $log, $location, oauth2Provider,  $routeParams, HTTP_ERRORS) {

    /**
     * Returns if the viewLocation is the currently viewed page.
     *
     * @param viewLocation
     * @returns {boolean} true if viewLocation is the currently viewed page. Returns false otherwise.
     */
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    /**
     * Returns the OAuth2 signedIn state.
     *
     * @returns {oauth2Provider.signedIn|*} true if siendIn, false otherwise.
     */
    $scope.getSignedInState = function () {
        return oauth2Provider.signedIn;
    };

    /**
     * Calls the OAuth2 authentication method.
     */
    $scope.signIn = function () {
        oauth2Provider.signIn(function () {
            gapi.client.oauth2.userinfo.get().execute(function (resp) {
                $scope.$apply(function () {
                    if (resp.email) {
                        oauth2Provider.signedIn = true;
                        $scope.alertStatus = 'success';
                        $scope.rootMessages = 'Logged in with ' + resp.email;
                        //Va al inicio de la página para que se vea el mensaje
                        window.scrollTo(0, 0);
                    }
                });
            });
        });
    };

    /**
     * Render the signInButton and restore the credential if it's stored in the cookie.
     * (Just calling this to restore the credential from the stored cookie. So hiding the signInButton immediately
     *  after the rendering)
     */
    $scope.initSignInButton = function () {
        gapi.signin.render('signInButton', {
            'callback': function () {
                jQuery('#signInButton button').attr('disabled', 'true').css('cursor', 'default');
                if (gapi.auth.getToken() && gapi.auth.getToken().access_token) {
                    $scope.$apply(function () {
                        oauth2Provider.signedIn = true;
                    });
                }
            },
            'clientid': oauth2Provider.CLIENT_ID,
            'cookiepolicy': 'single_host_origin',
            'scope': oauth2Provider.SCOPES
        });
    };

    /**
     * Logs out the user.
     */
    $scope.signOut = function () {
        oauth2Provider.signOut();
        oauth2Provider.signedIn = false;
        $scope.alertStatus = 'success';
        $scope.rootMessages = 'Logged out';
        $scope.quiniela = {};
        $scope.isQuiniela = false;
        //Va al inicio de la página para que se vea el mensaje
        window.scrollTo(0, 0);
        
    };

    /**
     * Collapses the navbar on mobile devices.
     */
    $scope.collapseNavbar = function () {
        angular.element(document.querySelector('.navbar-collapse')).removeClass('in');
    };

    
    
    /**
     * The quiniela object being edited in the page.
     * @type {{}|*}
     */
    $scope.quiniela = $scope.quiniela || {};
    
    
    /**
     * Tests if $scope.quiniela is valid.
     * @param quinielaForm the form object from the nominados.html page.
     * @returns {boolean|*} true if valid, false otherwise.
     */
    $scope.isValidQuiniela = function (quinielaForm) {
        if($scope.quiniela.pelicula) {
            return true;
        }else {
            return false;
        } 
    };
    
    /**
     * Shows the modal with info
     *
     * @returns {*|Window}
     */
    $scope.ventanaInfo = function() {
        var modalInstance = $modal.open({
            templateUrl: '/info.modal.html'
        });
        return modalInstance;
    };

    $scope.isQuiniela = false;
    
    //Variables para guardar a los ganadores
    //En principio vacías para que no se muestre la marca del ganador
    $scope.oscar_pelicula = "";
	$scope.oscar_director = "";
	$scope.oscar_actor = "";
	$scope.oscar_actriz = "";
	$scope.oscar_actor_reparto = "";
	$scope.oscar_actriz_reparto = "";
	$scope.oscar_pelicula_animada = "";
	$scope.oscar_guion_original = "";
	$scope.oscar_guion_adaptado = "";
	$scope.oscar_dis_produccion = "";
	$scope.oscar_fotografia = "";
	$scope.oscar_vestuario = "";
	$scope.oscar_montaje = "";
	$scope.oscar_efectos = "";
	$scope.oscar_maquillaje = "";
	$scope.oscar_edicion_sonido = "";
	$scope.oscar_mezcla_sonido = "";
	$scope.oscar_bso = "";
	//Para la canción hemos usado un número por el tema de las comillas
	$scope.oscar_cancion = -1; 
    
	/* 
	 * Funcion para Comprobar la Quiniela y ver los aciertos
	 * 
	 */
    $scope.comprobarQuiniela = function (quinielaForm) {
    	
        $scope.apuesta_pelicula = $scope.quiniela.pelicula;
    	$scope.apuesta_director = $scope.quiniela.director;
    	$scope.apuesta_actor = $scope.quiniela.actor;
    	$scope.apuesta_actriz = $scope.quiniela.actriz;
    	$scope.apuesta_actor_reparto = $scope.quiniela.actor_reparto;
    	$scope.apuesta_actriz_reparto = $scope.quiniela.actriz_reparto;
    	$scope.apuesta_pelicula_animada = $scope.quiniela.pelicula_animada;
    	$scope.apuesta_guion_original = $scope.quiniela.guion_original;
    	$scope.apuesta_guion_adaptado = $scope.quiniela.guion_adaptado;
    	$scope.apuesta_dis_produccion = $scope.quiniela.dis_produccion;
    	$scope.apuesta_fotografia = $scope.quiniela.fotografia;
    	$scope.apuesta_vestuario = $scope.quiniela.vestuario;
    	$scope.apuesta_montaje = $scope.quiniela.montaje;
    	$scope.apuesta_efectos = $scope.quiniela.efectos;
    	$scope.apuesta_maquillaje = $scope.quiniela.maquillaje;
    	$scope.apuesta_edicion_sonido = $scope.quiniela.edicion_sonido;
    	$scope.apuesta_mezcla_sonido = $scope.quiniela.mezcla_sonido;
    	$scope.apuesta_bso = $scope.quiniela.bso;
    	$scope.apuesta_cancion = $scope.quiniela.cancion;
    	
    	$scope.aciertos = 0;
    	
    	if($scope.isQuiniela==false){
    		$scope.messages = 'Primero pulsa la opción Mi Quiniela para recuperar tu quiniela';
            $scope.alertStatus = 'warning';

            //Va al inicio de la página para que se vea el mensaje
            window.scrollTo(0, 0);

            return;
    	}
    	
    	//Aquí hay que poner a los ganadores cuando lo sepamos
    	$scope.oscar_pelicula = "Spotlight";
    	$scope.oscar_director = "Alejandro G. Iñárritu (El renacido)";
    	$scope.oscar_actor = "Leonardo DiCaprio (El renacido)";
    	$scope.oscar_actriz = "Brie Larsson (La habitación)";
    	$scope.oscar_actor_reparto = "Mark Rylance (El puente de los espías)";
    	$scope.oscar_actriz_reparto = "Alicia Vikander (La chica danesa)";
    	$scope.oscar_pelicula_animada = "Del revés";
    	$scope.oscar_fotografia = "El renacido";
    	$scope.oscar_vestuario = "Mad Max: Furia en la carretera";
    	$scope.oscar_montaje = "Mad Max: Furia en la carretera";
    	$scope.oscar_efectos = "Ex Machina";
    	$scope.oscar_maquillaje = "Mad Max: Furia en la carretera";
    	$scope.oscar_edicion_sonido = "Mad Max: Furia en la carretera";
    	$scope.oscar_mezcla_sonido = "Mad Max: Furia en la carretera";
    	$scope.oscar_bso = "Los odiosos ocho";
    	$scope.oscar_dis_produccion = "Mad Max: Furia en la carretera";
    	$scope.oscar_guion_original = "Spotlight";
    	$scope.oscar_guion_adaptado = "La gran apuesta";
    	//Para la canción tenemos un número para marcar al ganador, 
    	//pero también usamos el texto del título porque tiene que coincidir con lo que está guardado para que sume un acierto 
    	$scope.oscar_cancion = 4;     	
    	$scope.oscar_cancion_titulo = "Writing on the wall (Spectre)";
    	
      	if($scope.quiniela.pelicula && $scope.quiniela.pelicula == $scope.oscar_pelicula) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	}; 

      	if($scope.quiniela.director && $scope.quiniela.director == $scope.oscar_director) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	}; 

      	if($scope.quiniela.actor && $scope.quiniela.actor == $scope.oscar_actor) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.actriz && $scope.quiniela.actriz == $scope.oscar_actriz) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.actor_reparto && $scope.quiniela.actor_reparto == $scope.oscar_actor_reparto) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.actriz_reparto && $scope.quiniela.actriz_reparto == $scope.oscar_actriz_reparto) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.pelicula_animada && $scope.quiniela.pelicula_animada == $scope.oscar_pelicula_animada) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.guion_original && $scope.quiniela.guion_original == $scope.oscar_guion_original) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.guion_adaptado && $scope.quiniela.guion_adaptado == $scope.oscar_guion_adaptado) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.dis_produccion && $scope.quiniela.dis_produccion == $scope.oscar_dis_produccion) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.fotografia && $scope.quiniela.fotografia == $scope.oscar_fotografia) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.vestuario && $scope.quiniela.vestuario == $scope.oscar_vestuario) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.montaje && $scope.quiniela.montaje == $scope.oscar_montaje) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.efectos && $scope.quiniela.efectos == $scope.oscar_efectos) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.maquillaje && $scope.quiniela.maquillaje == $scope.oscar_maquillaje) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.edicion_sonido && $scope.quiniela.edicion_sonido == $scope.oscar_edicion_sonido) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.mezcla_sonido && $scope.quiniela.mezcla_sonido == $scope.oscar_mezcla_sonido) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.bso && $scope.quiniela.bso == $scope.oscar_bso) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
      	if($scope.quiniela.cancion && $scope.quiniela.cancion == $scope.oscar_cancion_titulo) {
    		$scope.aciertos = $scope.aciertos + 1; 
    	};
    	
    	if($scope.aciertos==0){
        	$scope.messages = "No has tenido ningún acierto. Qué desastre!!";
    	}else {
	    	if($scope.aciertos==1){
	        	$scope.messages = 'Sólo has tenido ' + $scope.aciertos + " acierto de 19 posibles. A ver si el año que viene tienes más suerte!";
	    	}else {
	    		if($scope.aciertos>1 && $scope.aciertos<=5){
	            	$scope.messages = 'Sólo has tenido ' + $scope.aciertos + " aciertos de 19 posibles. A ver si el año que viene tienes más suerte!";
	    		}else{
	    			if($scope.aciertos>5 && $scope.aciertos<=15){
	                	$scope.messages = 'Has tenido ' + $scope.aciertos + " aciertos de 19 posibles. No está nada mal!";
	    			}else {
	    				if($scope.aciertos>15){
	                    	$scope.messages = 'Has tenido ' + $scope.aciertos + " aciertos de 19 posibles. Eres un fenómeno!!!";
	    				}
	    			}
	    		}
	    	}
    	}

    	$scope.alertStatus = 'success';
        //Va al inicio de la página para que se vea el mensaje
        window.scrollTo(0, 0);
    	
    };

    /**
     * Invokes the nominados.createQuiniela API.
     *
     * @param quinielaForm the form object.
     */
    $scope.createQuiniela = function (quinielaForm) {
        if (!$scope.isValidQuiniela(quinielaForm)) {
            return;
        }
    
		    $scope.loading = true;
		    gapi.client.nominados.createQuiniela($scope.quiniela).
		        execute(function (resp) {
		            $scope.$apply(function () {
		                $scope.loading = false;
		                if (resp.error) {
		                    // The request has failed.
		                    var errorMessage = resp.error.message || '';
		                    $scope.messages = 'Fallo al guardar la quiniela : ' + errorMessage;
		                    $scope.alertStatus = 'warning';
		                    $log.error($scope.messages + ' Quiniela : ' + JSON.stringify($scope.quiniela));
		                    //Va al inicio de la página para que se vea el mensaje
		                    window.scrollTo(0, 0);
		
		                    if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
		                        oauth2Provider.showLoginModal();
		                        return;
		                    }
		                }
		                else {
		                        // The request has succeeded.
		                        $scope.messages = 'Se ha guardado la quiniela';
		                        $scope.alertStatus = 'success';
		                        $scope.submitted = false;
		                        //$scope.quiniela = {};
		                        $log.info($scope.messages + ' : ' + JSON.stringify(resp.result));
		                        //Va al inicio de la página para que se vea el mensaje
		                        window.scrollTo(0, 0);
		                    }
		                    
		            });
		        });       
    };
    
    $scope.enviarQuiniela = function () {
	    $scope.loading = true;
    	gapi.client.nominados.enviarQuiniela().execute(function (resp) {
    		$scope.$apply(function () {
    			$scope.loading = false;
                if (resp.error) {
                    // The request has failed.
                    var errorMessage = resp.error.message || '';
                    $scope.messages = 'Fallo al enviar la quiniela: '
                        + ' ' + errorMessage;
                    $scope.alertStatus = 'warning';
                    $log.error($scope.messages);
                    //Va al inicio de la página para que se vea el mensaje
                    window.scrollTo(0, 0);
                    
                    if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                        oauth2Provider.showLoginModal();
                        return;
                    }                    
                }else {
                    // The request has succeeded.
                    $scope.messages = 'Se ha enviado la quiniela ';
                    $scope.alertStatus = 'success';
                    $scope.quiniela = resp.result;
                    //Va al inicio de la página para que se vea el mensaje
                    window.scrollTo(0, 0);
                }     			
    		});    		
    	});
    };
    
    /**
     * Invokes the getQuiniela method and sets the returned quiniela in the $scope.
     *
     */
    $scope.getQuiniela = function () {
    	
        //Inicializamos las variables
    	$scope.oscar_pelicula = "";
    	$scope.oscar_director = "";
    	$scope.oscar_actor = "";
    	$scope.oscar_actriz = "";
    	$scope.oscar_actor_reparto = "";
    	$scope.oscar_actriz_reparto = "";
    	$scope.oscar_pelicula_animada = "";
    	$scope.oscar_guion_original = "";
    	$scope.oscar_guion_adaptado = "";
    	$scope.oscar_dis_produccion = "";
    	$scope.oscar_fotografia = "";
    	$scope.oscar_vestuario = "";
    	$scope.oscar_montaje = "";
    	$scope.oscar_efectos = "";
    	$scope.oscar_maquillaje = "";
    	$scope.oscar_edicion_sonido = "";
    	$scope.oscar_mezcla_sonido = "";
    	$scope.oscar_bso = "";
    	$scope.oscar_cancion = 9;   
    	
        $scope.apuesta_pelicula = "";
    	$scope.apuesta_director = "";
    	$scope.apuesta_actor = "";
    	$scope.apuesta_actriz = "";
    	$scope.apuesta_actor_reparto = "";
    	$scope.apuesta_actriz_reparto = "";
    	$scope.apuesta_pelicula_animada = "";
    	$scope.apuesta_guion_original = "";
    	$scope.apuesta_guion_adaptado = "";
    	$scope.apuesta_dis_produccion = "";
    	$scope.apuesta_fotografia = "";
    	$scope.apuesta_vestuario = "";
    	$scope.apuesta_montaje = "";
    	$scope.apuesta_efectos = "";
    	$scope.apuesta_maquillaje = "";
    	$scope.apuesta_edicion_sonido = "";
    	$scope.apuesta_mezcla_sonido = "";
    	$scope.apuesta_bso = "";
    	$scope.apuesta_cancion = "";
    	
    	$scope.loading = true;
    	gapi.client.nominados.getQuiniela().execute(function (resp) {
    		$scope.$apply(function () {
    			$scope.loading = false;
                if (resp.error) {
                    // The request has failed.
                    var errorMessage = resp.error.message || '';
                    $scope.messages = 'Fallo al recuperar la quiniela : ' //+ $routeParams.websafeKey
                        + ' ' + errorMessage;
                    $scope.alertStatus = 'warning';
                    $log.error($scope.messages);
                    //Va al inicio de la página para que se vea el mensaje
                    window.scrollTo(0, 0);
                    
                    if (resp.code && resp.code == HTTP_ERRORS.UNAUTHORIZED) {
                        oauth2Provider.showLoginModal();
                        return;
                    }                    
                }else {
                    // The request has succeeded.
                    $scope.messages = 'Esta es tu quiniela '; //+ resp.result.pelicula;
                	
                    $scope.alertStatus = 'success';
                    $scope.quiniela = resp.result;
                    $scope.isQuiniela = true;
                    //Va al inicio de la página para que se vea el mensaje
                    window.scrollTo(0, 0);
                }     			
    		});
    	});
    	
    };
    
    
});


/**
 * @ngdoc controller
 * @name OAuth2LoginModalCtrl
 *
 * @description
 * The controller for the modal dialog that is shown when an user needs to login to achive some functions.
 *
 */
nominadosApp.controllers.controller('OAuth2LoginModalCtrl',
    function ($scope, $modalInstance, $rootScope, oauth2Provider) {
        $scope.singInViaModal = function () {
            oauth2Provider.signIn(function () {
                gapi.client.oauth2.userinfo.get().execute(function (resp) {
                    $scope.$root.$apply(function () {
                        oauth2Provider.signedIn = true;
                        $scope.$root.alertStatus = 'success';
                        $scope.$root.rootMessages = 'Logged in with ' + resp.email;
                        //Va al inicio de la página para que se vea el mensaje
                        window.scrollTo(0, 0);
                    });

                    $modalInstance.close();
                });
            });
        };
    });

