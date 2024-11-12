"use client";
import { createContext, useCallback, useEffect } from "react";
import { io } from "socket.io-client";
import { useStore } from "zustand";

interface socketProviderProps {
  children?: React.ReactNode;
}

interface ISocketContext {
  sendMessage: (msg: string) => any;
}
const socketContext = createContext<ISocketContext | null>(null);

export const SocketProvider: React.FC<socketProviderProps> = ({ children }) => {
  const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
    console.log("send Message", msg);
  }, []);

  useEffect(() => {
    const _socket = io("http://localhost:8000");

    return () => {
      _socket.disconnect();
    };
  }, []);
  return (
    <socketContext.Provider value={{ sendMessage }}>
      {children}
    </socketContext.Provider>
  );
};
