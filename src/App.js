import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import UserAuth from "./ProtectRoutes/ProtectedRoute";
import PublicRoute from "./ProtectRoutes/PublicRoute";
import store from "./Redux/store";

function App() {
  return (
    <div className="App min-h-screen bg-gray-200">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <UserAuth>
                  <Home />
                </UserAuth>
              }
            />

            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <Signin />
                </PublicRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
