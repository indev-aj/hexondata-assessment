import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";
import MapLocator from "./views/MapLocator";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MapLocator />} />
        <Route exact path="/login" element={<LoginView />} />
        <Route exact path="/signup" element={<SignupView />} />
      </Routes>
    </Router>
  );
}

export default App;
