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
        if (ext.match(/html|css|javascript/) ){
            response.writeHead(200, {"Content-Type": `text/${ext}`});
            html=fs.readFileSync(filename,'utf8');
            response.end(html);
            console.log(" URI : " + request.url + " DUMMY=" + dummy + "  filename=" + filename); 
        }
        if (ext.match(/png|jpg|gif/) ){
            response.writeHead(200, {"Content-Type": `img/${ext}`});
            var image = fs.readFileSync(filename, "binary");
            response.end(image,"binary");
            console.log(" URI= " + request.url + " DUMMY=" + dummy + "  filename=" + filename); 
        }
    } else if (request.method === 'POST'){
        var data = '';
    
        //POSTデータを受けとる
        request.on('data', function(chunk) {data += chunk})
           .on('end', function() {
            response.writeHead(200, {"Content-Type": "text/html"});
             console.log(data);
             response.end(data);
            })
    }
});
const port = process.env.PORT || 1337;
server.listen(port);
console.log("Server running at http://localhost:%d", port);
