import { io } from "socket.io-client"
import React from "react";

export const socket = io(process.env.REACT_APP_API_KEY);
export const SocketContext = React.createContext();