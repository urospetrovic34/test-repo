//import { useEffect } from "react";
import { Navbar } from "./components/Elements/Navigation/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes /*, Navigate*/,
} from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Team } from "./components/Team/Team";
//import useAuthProfile from "./hooks/useAuthProfile";

function App() {

  /* const ProtectedRoute = ({ element: Component, ...otherProps }) => {
     const isAuth = user.isAuthenticated
     return (
       <Route {...otherProps} render={(props) => (isAuth ? <Component {...props} /> : <Navigate to="/" />)} />
     )
   }*/

  //const data = useAuthProfile();
  //console.log(data);

  return (
      <Router>
        <div className="wrapper">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Team />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
