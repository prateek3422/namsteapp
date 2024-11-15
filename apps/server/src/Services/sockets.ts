import { Server } from "socket.io";
import Redis from "ioredis";

const sub = new Redis();

const pub = new Redis();

class socketService {
  private _io: Server;
  constructor() {
    console.log("socket initialized");
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    sub.subscribe("MESSAGES");
  }

  public listeners() {
    const io = this._io;
    console.log("init socket listners...");

    io.on("connect", (socket) => {
      console.log("new socket connected", socket.id);

      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message resive...", message);

        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit(message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default socketService;
