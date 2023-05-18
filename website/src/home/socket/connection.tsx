import io from "socket.io-client";
export const socket = io("http://localhost:"+process.env.API_PORT, {
   auth : {
    login : process.env.SIO_LOGIN,
    password : process.env.SIO_SECRET
   }, 
   transports: ["websocket"] 
  });

socket.on('logs', (data) => {
  console.log("received logs event : ", data)
});

