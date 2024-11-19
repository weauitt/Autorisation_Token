import React, { useState } from "react";

const PostRequestComponent: React.FC = () => {
  const [message, setMessage] = useState("");

  const sendPostRequest = () => {
    fetch("http://localhost:5000/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  
      },
      body: JSON.stringify({ message: "Hello from client" }), 
      credentials: "include", 
    })
      .then((response) => response.json()) 
      .then((data) => {
        setMessage("Ответ от сервера: " + data.message); 
      })
      .catch((error) => {
        console.error("Ошибка при отправке запроса:", error);
        setMessage("Ошибка при отправке запроса");
      });
  };

  return (
    <div>
      <button onClick={sendPostRequest}>Отправить POST-запрос</button>
      <p>{message}</p>
    </div>
  );
};

export default PostRequestComponent;
