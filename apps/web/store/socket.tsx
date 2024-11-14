"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useStore } from "zustand";

interface socketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => any;
}
const socketContext = createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(socketContext);

  if (!state) throw new Error(`state is undifined`);

  return state;
};

export const SocketProvider: React.FC<socketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const sendMessage: ISocketContext["sendMessage"] = useCallback(
    (msg) => {
      console.log("send Message", msg);
      if (socket) {
        socket.emit("event:message", { message: msg });
      }
    },
    [socket]
  );

  const onMessageRec = useCallback((message: string) => {
    console.log("From Server Msg Rec", message);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");
    _socket.on("message", onMessageRec);
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off("message", onMessageRec);
      setSocket(undefined);
    };
  }, []);
  return (
    <socketContext.Provider value={{ sendMessage }}>
      {children}
    </socketContext.Provider>
  );
};
