// dépendance api express
 var express = require('express');
// serveur html
 var server= express();
 server.listen(8080);
    
 server.get('/page.html', function(request, response) {
      response.sendFile( __dirname  + '/page.html');
 });

