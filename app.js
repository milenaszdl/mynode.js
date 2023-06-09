const http = require('node:http');

const host = "127.0.0.1";
const port = 5500;

var stats = {user_agent:0};
var comments = [];

const server = http.createServer((req,res)=>{
    if (req.url === "/") {
        res.statusCode = 201;
        res.setHeader("Content-type", "text/plain");
        res.end("Hi!");
    }else if (req.url === "/stats") {
        if (req.method === "GET") {
            res.statusCode = 200;
            stats.user_agent++;
            res.setHeader("Content-Type", "text/html");
            res.end(`<table>
            <tr>
                <th>User-agent:</th>
                <th>Number of requests:</th>
            </tr>
            <tr>
                <td>${req.headers['user-agent']}</td>
                <td>${stats.user_agent}</td>
            </tr>
            </table>`);
        }
    }else if (req.url === "/comments") {
        if (req.method === "POST") {
            // var comments = [];
            body = "";
            req.on("data", (chunk)=>{
                body+= chunk;
            })
            req.on("end", ()=>{
                comments.push(JSON.parse(body));
                res.end(JSON.stringify(comments)); //полученные сервером данные выводим обратно клиенту
                console.log(comments); //выводим данные, полученные на сервер в консоль
            })
        }
    } else{
            res.statusCode = 400;
            res.setHeader("Content-type", "text/plain");
            res.end("Bad request");
        }
    })

server.on("connection", ()=> {
    console.log("Новое подключение");
});

server.listen(port,host,()=> {
    console.log(`Server is on. http://${host}:${port}`);
})