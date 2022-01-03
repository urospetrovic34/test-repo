import { Navbar } from "./components/Elements/Navigation/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { ProxyElement } from './components/ProxyElement'
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from "react-redux";
import store from "./redux/store";

function App() {
  const persistor = persistStore(store);
 /* const user = useSelector((state) => state.user)

  const ProtectedRoute = ({ element: Component, ...otherProps }) => {
    const isAuth = user.isAuthenticated
    return (
      <Route {...otherProps} render={(props) => (isAuth ? <Component {...props} /> : <Navigate to="/" />)} />
    )
  }*/

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div className="wrapper">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<ProxyElement />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </PersistGate>
  );
}

export default App;
