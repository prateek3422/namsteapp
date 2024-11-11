import http from "http";
import socketService from "./Services/sockets";

async function init() {
  const socket = new socketService();
  const httpServer = http.createServer();

  socket.io.attach(httpServer);

  const port = process.env.PORT ? process.env.PORT : 8000;

  httpServer.listen(port, () => `http server running on ${port}`);

  socket.listeners();
}

init();
