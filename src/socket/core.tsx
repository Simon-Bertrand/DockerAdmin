import io from "socket.io-client";
export const socket = io("http://localhost:5000");

socket.on('logs', (data) => {
  console.log("received logs event : ", data)
});


socket.on('stats', (data) => {
  console.log("received stats event : ", data)
});
