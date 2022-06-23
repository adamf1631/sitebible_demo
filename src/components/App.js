import "../App.css";
import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import Header from "./Header";
import { AuthProvider } from "../contexts/authContext";

function App() {
  const [mode, setMode] = useState(true);

  const changeMode = () => {
    setMode(!mode);
  };

  const colorMode = () => {
    if (mode) {
      return "lightmode";
    } else {
      return "darkmode";
    }
  };

  const btnText = mode ? "Dark Mode" : "Light Mode";

  return (
    <>
      <Header mode={mode} />
      <div className={`${colorMode()}`}>
        <Button
          className="m-2"
          size="sm"
          variant="secondary"
          onClick={changeMode}
        >
          {btnText}
        </Button>
      </div>
      <Container
        style={{
          minHeight: "100vh",
          maxWidth: "100vw",
        }}
        className={`${colorMode()} d-flex justify-content-center`}
      >
        <div>
          <Router>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  );
}

export default App;
