import React from "react";
import "./App.css";

function App() {
  React.useEffect(() => {
    fetch("/api/auth", {
      method: "POST",
    
      body: JSON.stringify({ user: "bl@wamoco.de", name: 'User' }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">start</header>
    </div>
  );
}

export default App;
