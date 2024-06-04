import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Index from "./components/Index";
import Show from "./components/Show";
import Form from "./components/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div>
        <NavigationBar />
        <div className="container mt-3">
          <Routes>
            <Route
              path="/"
              element={<Index backendUrl={import.meta.env.VITE_API_URL} />}
            />
            <Route
              path="/transactions/:id"
              element={<Show backendUrl={import.meta.env.VITE_API_URL} />}
            />
            <Route
              path="/transactions/new"
              element={<Form backendUrl={import.meta.env.VITE_API_URL} />}
            />
            <Route
              path="/transactions/edit/:id"
              element={<Form backendUrl={import.meta.env.VITE_API_URL} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
