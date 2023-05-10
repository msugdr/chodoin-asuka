// 2023.5.9 chodoin-asuka
const http = require('http');
const fs = require('fs');
var msg;
var html;
var dummy;
var filename;
const server = http.createServer((request, response) => { 
    [dummy,filename]=request.url.split("/");
    [file,ext]=filename.split(".");
    if (ext == 'html'){
        fs.readFile(filename,'utf8', function(err, data) {html=data});
        response.writeHead(200, {"Content-Type": "text/html"});
        msg=html;
        response.end(msg);
        console.log(" URI : " + request.url + " DUMMY=" + dummy + "  filename=" + filename); 
    }
});
const port = process.env.PORT || 1337;
server.listen(port);
console.log("Server running at http://localhost:%d", port);
