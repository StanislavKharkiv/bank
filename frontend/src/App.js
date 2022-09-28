import React from "react";
import "./App.css";

function App() {
  React.useEffect(() => {
    fetch("/api")
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
