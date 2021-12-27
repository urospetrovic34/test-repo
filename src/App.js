import { Navbar } from "./components/Elements/Navigation/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import store from './store'

function App() {

  const persistor = persistStore(store)

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </PersistGate>
  );
}

export default App;