import { Server } from "socket.io";

class socketService {
  private _io: Server;
  constructor() {
    console.log("socket initialized");
    this._io = new Server();
  }

  public listeners() {
    const io = this._io;
    console.log("init socket listners...");

    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message resive...", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default socketService;
