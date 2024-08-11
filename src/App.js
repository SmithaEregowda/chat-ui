import "./App.css";
// import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import io from "socket.io-client";// import io from "socket.io-client";
import Login from "./pages/login";
import Signup from "./pages/register";
import Chat from "./pages/chatroom";

function App() {
  // function sendMessage() {
  //   console.log("Button clicked");
  //   socket.emit("send_message_io", { message: "Hello from client" });
  // }
  // useEffect(() => {
  //   socket.on("receive_message", (data) => {
  //     console.log(data.message)
  //   });
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Chat />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
