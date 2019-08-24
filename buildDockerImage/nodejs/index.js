var express = require('express');
var ejs = require('ejs');
var formidable = require('formidable');
var fs = require('fs-extra')
var shell = require('shelljs')
var util = require('util');
var path = require("path");

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('/usr/src/app/properties.file');

var fileRecoToTail = ""+properties.get('main.shared.volume')+"log_reco.txt";
var fileLearnToTail = ""+properties.get('main.shared.volume')+"log_learn.txt";
var fileWatchToTail = ""+properties.get('main.shared.volume')+"log_watch.txt";

var Tail = require('tail').Tail;
var options= {separator: /[\r]{0,1}\n/, fromBeginning: true, fsWatchOptions: {}, follow: true, logger: console}
var tailReco = new Tail(fileRecoToTail,options);
var tailLearn = new Tail(fileLearnToTail,options);
var tailWatch = new Tail(fileWatchToTail,options);

var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var clientsSocket = new Array();

app.use('/static', express.static(__dirname + '/img'));


function mkDirCpFiles (f,page) {
   var listImg = []; 
   for(var i = 0; i < f.openedFiles.length; i++) {
      if ( i == 0) {
         var repoToCreate = f.openedFiles[0].name.split("_");
         var repoTarget = repoToCreate[0]
         console.log("repotocreate :"+repoTarget)
         /*Test existence r?pertoire */
         fs.stat('/Users/docker/www/ksia/images/'+page+'/'+repoTarget, function(err) {
            if (!err) {
               console.log(''+repoTarget+'file or directory exists');
            }
            else if (err.code === 'ENOENT') {
               fs.mkdir('/Users/docker/www/ksia/images/'+page+'/'+repoTarget, function (err) {
                  if (err) {
                     console.error(err);
                  }else{
                     console.log("mkdir success!")
                  }
               });
            }
         });
      }
      /* Temporary location of our uploaded file */
      var temp_path = f.openedFiles[i].path;
      /* The file name of the uploaded file */
      console.log("temp_path"+temp_path);
      var file_name = f.openedFiles[i].name;
      listImg.push('/'+repoTarget+'/'+file_name);
      console.log("file_name"+file_name);
      /* Location where we want to copy the uploaded file */
      var new_location = path.join('/Users/docker', '/www/ksia/images/'+page+'/'+repoTarget+'/');
      console.log("new_location"+new_location);
      fs.copy(temp_path, new_location + file_name, function (err) {
         if (err) {
            console.error(err);
         }else{
            console.log("cp success!");
            shell.exec('touch /Users/docker/'+page+'.lock');
	    shell.exec('echo "/Users/docker/www/ksia/images/'+page+'/'+repoTarget+'/'+file_name+'" > /Users/docker/'+page+'.lock');
	    shell.exec('echo "### Creiation fichier "'+page+'".lock" >> /Users/docker/log_watch.txt');
         }
       });
   }
return listImg;
}


app.get('/', function(req, res) {
   //res.setHeader('Content-Type', 'text/plain');
   //res.send('Page accueil');
   res.render('index.ejs', {page:'accueil', valeur:'1'});
});


app.post('/learn', function(req, res) {
   var form = new formidable.IncomingForm();

   form.parse(req);
   
	
   form.on('fileBegin', function (name, file){
      file.path = __dirname + '/img/tempo/' + file.name;
      console.log('form fileBegin '+util.inspect({name: name, file: file}));
   });
  
   form.on('file', function (name, file){
      console.log('form file '+util.inspect({name: name, file: file}));   
   });
 
   form.on('end', function (fields, files) {
      console.log('end ' + form.openedFiles.length);
      var imgToDisplay = mkDirCpFiles (form,'learn');
      res.render('learn.ejs', {page:'learn', valeur: imgToDisplay});
   });
});


app.post('/recognize', function(req, res) {
   var form = new formidable.IncomingForm();
   var fields = {}; 
   //form.parse(req);
   form.parse(req, function(err, fields, files) {
   //	console.log('parse '+util.inspect({fields:fields}));
        console.log('parse '+fields.imgToDisplay);
   });
   
   form.on('field', function(name, value) {
      console.log('field recu '+util.inspect({name: name, value: value}));
      if (name == 'imgToDisplay') { fields[name] = value; }
   });
	
   form.on('fileBegin', function (name, file){
      file.path = __dirname + '/img/tempo/' + file.name;
      console.log('form fileBegin '+util.inspect({name: name, file: file}));
   });

   form.on('file', function (name, file){
      console.log('form file '+util.inspect({name: name, file: file}));
   });

   form.on('end', function () {
      if(fields['imgToDisplay']){
      	console.log('fields '+fields['imgToDisplay']);
        res.render('recognize.ejs', {page:'recognize', valeur: fields['imgToDisplay'],ip: properties.get('main.ip'), port: properties.get('main.port')});
      } else {
	console.log('properties '+properties.get('main.some.thing'));
	var imgToDisplay= mkDirCpFiles (form,'recognize');
      	res.render('recognize.ejs', {page:'recognize', valeur: imgToDisplay, ip: properties.get('main.ip'), port: properties.get('main.port')});
      }
   });

});

app.use(function(req, res, next){
   res.setHeader('Content-Type', 'text/plain');
   res.status(404).send('Page introuvable !');
});

// A chaque client connecté on attibut son propre scope
io.sockets.on('connection', function (socket) {
//Ajout du nouveau client ?|  la liste des clients
        clientsSocket = socket;

        //Un client vient de se connecter
        console.log("Un client vient de se connecter! IP: " + socket.handshake.address);

        tailReco.on("line", function(data) {
        //console.log(data);
        // Envoi message de bienvenue au client
                socket.emit('message', {
                'from' : 'Serveur',
                'message' : 'RECO ---> '+data
                });
                setTimeout(function () {
                                    console.log('timeout completed tailReco');
                }, 1000);

        });


        tailLearn.on("line", function(data) {
        //console.log(data);
        //Envoi message de bienvenue au client
                socket.emit('message', {
                'from' : 'Serveur',
                'message' : 'LEARN ---> '+data
                });
                setTimeout(function () {
                                    console.log('timeout completed tailLearn');
                }, 1000);
        });

        tailWatch.on("line", function(data) {
         //console.log(data);
         //Envoi message de bienvenue au client
                socket.emit('message', {
                'from' : 'Serveur',
                'message' : '---> '+data
                });
                setTimeout(function () {
                                    console.log('timeout completed tailWatch');
                }, 1000);
        });

        // Reception message d'un client qui est renvoyé ?|  tous les clients
        socket.on('message', function(reception) {
                console.log("Message de " + reception.from + ": " + reception.message);
                for(key in io.sockets.sockets){
                        io.sockets.sockets[key].emit('message', reception);
                }
        });
});

//app.listen(8080);
http.listen(8080, function(){
   console.log('listening on *:8080');
});
