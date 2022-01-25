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
import { PendingTeam } from "./components/Team/PendingTeam";
import {GuestRoute} from './routes/GuestRoute'
import {OmniRoute} from './routes/OmniRoute'
import {UserRoute} from './routes/UserRoute'
import {AdminRoute} from './routes/AdminRoute'
import {PersistGate} from 'redux-persist/integration/react'
import {persistStore} from 'redux-persist'
import store from './redux/store'

function App() {

  const persistor = persistStore(store)

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div className="wrapper">
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<GuestRoute redirect="/admin"><Login/></GuestRoute>} />
            <Route exact path="/register" element={<GuestRoute redirect="/admin"><Register/></GuestRoute>} />
            <Route exact path="/team" element={<UserRoute redirect="/login"><Team/></UserRoute>} />
            <Route exact path="/team/pending" element={<AdminRoute redirect="/login" redirectUser="/team"><PendingTeam/></AdminRoute>} />
            <Route path="*" element={<OmniRoute></OmniRoute>} />
          </Routes>
        </div>
      </Router>
    </PersistGate>
  );
}

export default App;
