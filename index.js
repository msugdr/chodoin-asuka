// 2023.5.10 chodoin-asuka
const http = require('http');
const fs = require('fs');
var html;
var dummy;
var filename;
const server = http.createServer((request, response) => { 
    if (request.method === 'GET'){
        [dummy,filename]=request.url.split("/");
        [file,ext]=filename.split(".");
//        if (ext.match(/html|css|javascript/) ){
         if (ext==="html" || ext === "css"){
            response.writeHead(200, {"Content-Type": `text/${ext}`});
            html=fs.readFileSync(filename,'utf8');
            response.end(html);
        }
//        if (ext.match(/png|jpg|gif/) ){
          if (ext==="gif" || ext==="jpg" || ext==="png" ){
            response.writeHead(200, {"Content-Type": `img/${ext}`});
            var image = fs.readFileSync(filename, "binary");
            response.end(image,"binary"); 
        } 
        if (ext==="txt" || ext==="ico" ){
                response.writeHead(200, {"Content-Type": "text/html"});      
                msg = `EDIT-7.1b:method = ${request.method}, filename = ${filename}, ext = ${ext}`;
                response.end(msg);
        }
    } else if (request.method === 'POST'){
        var data = '';
    
        //POSTデータを受けとる
        request.on('data', function(chunk) {data += chunk})
           .on('end', function() {
            response.writeHead(200, {"Content-Type": "text/html"});
             response.end(data);
            })
    }
});
const port = process.env.PORT || 1337;
server.listen(port);
