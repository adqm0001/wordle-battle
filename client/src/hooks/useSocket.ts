import { useRef, useEffect } from 'react'
import { io ,Socket } from 'socket.io-client';

export function useSocket(onConnect?: () =>  void){
  const socket = useRef<Socket | null>(null);
  
  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_API_URL}`);
    socket.current.on("connect", () => {
      onConnect?.();
    });
    return () => { socket.current?.disconnect(); };
  }, [])

  return socket;
}
