"use client";
import Image from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useSocket } from "../store/socket";
import { useState } from "react";

export default function Home() {
  const { sendMessage } = useSocket();
  const [message, setMessage] = useState("");
  return (
    <div className=" min-h-[100vh]">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-2 ">
          <input
            type="text"
            className="bg-white text-neutral-800 "
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={(e) => sendMessage(message)}>Send</button>
        </div>
        <div>
          <h1>All messages Here</h1>
        </div>
      </div>
    </div>
  );
}
