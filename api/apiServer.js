const http = require("http");
const ApiCoordinatior = require('./apiCoordinator');

const host = 'localhost';
const port = 8000;

async function requestListener (req, res) {
    res.setHeader("Content-Type", "application/json");
    if (req.method === "GET") {
        if (req.url.replace(/[?].+/g, '') === '/forecast') {
            res.writeHead(200);
            res.end(await ApiCoordinatior.getForecastByAddress("http://localhost:8000" + req.url));
        } else {
            res.writeHead(404);
            res.end(`{"message": "no endpoints found"}`);
        }
    } else {
        res.writeHead(404);
        res.end(`{"message": "no endpoints found"}`);
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});