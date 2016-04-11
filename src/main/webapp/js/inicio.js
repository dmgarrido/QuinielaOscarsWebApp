function init() {
	
	// You need to pass the root path when you load your API
	// otherwise calls to execute the API run into a problem
	
	// rootpath will evaulate to either of these, depending on where the app is running:
	// //localhost:8080/_ah/api
	// //your-app-id/_ah/api

	var rootpath = "//" + window.location.host + "/_ah/api";
	
	gapi.client.load('nominados', 'v1', null, rootpath);
    
	gapi.client.load('oauth2', 'v2', function () {
        angular.bootstrap(document, ['nominadosApp']);
    });	
}