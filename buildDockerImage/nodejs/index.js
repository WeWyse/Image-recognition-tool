var http = require('http');
var url = require('url');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var jeu = new EventEmitter();
var formidable = require('formidable');
var path = require("path");
var fs = require('fs-extra')
var server = http.createServer(function(req, res) {
	    var page = url.parse(req.url).pathname;
	    console.log(page);
	    res.writeHead(200, {"Content-Type": "text/plain"});
	    if (page == '/load' || page =='/' ) 
			{

		    	    res.writeHead(200, {'content-type': 'text/html'});
		      	    res.end(
			        '<form action="/upload" enctype="multipart/form-data" method="post">'+
			        '<input type="text" name="title"><br>'+
			        '<input type="file" name="upload" multiple="multiple"><br>'+
			        '<input type="submit" value="Upload">'+
			         '</form>'
			    );
		        }
	   else if (page == '/upload')
			{
			var form = new formidable.IncomingForm();
		        form.parse(req, function(err, fields, files) {
			             res.writeHead(200, {'content-type': 'text/plain'});
			             res.write('received upload:\n\n');
			             res.end(util.inspect({fields: fields, files: files}));
			           });
		    
		        form.on('end', function (fields, files) {
				for(var i = 0; i < this.openedFiles.length; i++) {	
					
					if ( i == 0) {
						var repoToCreate = this.openedFiles[0].name.split("_");
						var repoTarget = repoToCreate[0]
						fs.mkdir('/Users/docker/www/ksia/images/recognize/'+repoTarget, function (err) {
							if (err) {
								console.error(err);
							}else{
								console.log("mkdir success!")
							}
					        });	
					}
					/* Temporary location of our uploaded file */
					var temp_path = this.openedFiles[i].path;
					/* The file name of the uploaded file */
					console.log("temp_path"+temp_path)
					var file_name = this.openedFiles[i].name;
					console.log("file_name"+file_name)
					/* Location where we want to copy the uploaded file */
					var new_location = path.join('/Users/docker', '/www/ksia/images/recognize/'+repoTarget+'/');
					console.log("new_location"+new_location) 
					fs.copy(temp_path, new_location + file_name, function (err) {
						if (err) {
							console.error(err);
						}else{ 
							console.log("cp success!")
						}
					});
				}	
			});
		        return;
			}
	   res.end();
});


server.listen(8080);
