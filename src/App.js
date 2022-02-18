import { useEffect,useState } from "react";
import React from 'react'
import { Navbar } from "./components/Elements/Navigation/Navbar/Navbar";
import {
  BrowserRouter as Router,
  Route,
  Routes /*, Navigate*/,
} from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import {RegisterSlug} from './components/Register/RegisterSlug'
import { Team } from "./components/Team/Team";
import { GuestTeam } from "./components/Team/GuestTeam";
import { Profile } from "./components/Profile/Profile";
import { PendingTeam } from "./components/Team/PendingTeam";
import { EditUser } from './components/EditUser/EditUser'
import { EditPendingUser } from './components/EditUser/EditPendingUser'
import { Questions } from './components/Questions/Questions'
import { AddQuestion } from './components/Questions/AddQuestion'
import { EditQuestion } from './components/Questions/EditQuestion'
import { Company } from './components/Company/Company'
import { UserNav } from './components/Elements/Navigation/UserNav/UserNav'
import { GuestRoute } from './routes/GuestRoute'
import { OmniRoute } from './routes/OmniRoute'
import { UserRoute } from './routes/UserRoute'
import { AdminRoute } from './routes/AdminRoute'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import store from './redux/store'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import ThemeContext, { themes }  from './context/useTheme'

function App() {

  const [themeIcon, setThemeIcon] = useState(true)
  const [theme, setTheme] = useState(themes.dark)
  const [theme1, setTheme1] = useState(themes.dark1)
  const [fontColor, setFontColor] = useState(themes.fontColor)

  const toggleTheme = () => {
    if (theme === themes.dark) {
      setThemeIcon(false)
      setTheme(null)
      setTheme1(null)
      setFontColor(null)
      localStorage.setItem("theme", "light")
    }
      else {
      setThemeIcon(true)
      setTheme(themes.dark)
      setTheme1(themes.dark1)
      setFontColor(themes.fontColor)
      localStorage.setItem("theme", "dark")
    }
  }

    useEffect(()=>{
        const localStorageTheme = window.localStorage.getItem("theme")
        if (localStorageTheme === "light") {
              setThemeIcon(false)
              setTheme(null)
              setTheme1(null)
              setFontColor(null)
            }
            else {
              setThemeIcon(true)
              setTheme(themes.dark)             
              setTheme1(themes.dark1)
              setFontColor(themes.fontColor)
            }
    },[]);


  const persistor = persistStore(store)

  return (
    <PersistGate loading={null} persistor={persistor}>
      <DndProvider backend={HTML5Backend}>
        <Router>
        <ThemeContext.Provider value={{value:[theme, setTheme], value2:[theme1, setTheme1], value3:[fontColor, setFontColor]}}>
          <div className="wrapper">
            <Navbar themeIcon={themeIcon} toggleTheme={toggleTheme}/>
            <div className="panel" style={theme1}>
              <UserNav />
              <div className="control">
                  <Routes>
                    <Route exact path="/login" element={<GuestRoute redirect="/admin"><Login /></GuestRoute>} />
                    <Route exact path="/join" element={<GuestRoute redirect="/admin"><Register /></GuestRoute>} />
                    <Route exact path="/join/:slug" element={<GuestRoute redirect="/admin"><RegisterSlug /></GuestRoute>} />
                    <Route exact path="/team/:slug" element={<GuestRoute redirect="/login"><GuestTeam /></GuestRoute>} />
                    <Route exact path="/team" element={<UserRoute redirect="/login"><Team /></UserRoute>} />
                    <Route exact path="/questions" element={<UserRoute redirect="/login"><Questions /></UserRoute>} />
                    <Route exact path="/team/pending" element={<AdminRoute redirect="/login" redirectUser="/team"><PendingTeam /></AdminRoute>} />
                    <Route exact path="/team/:id/edit" element={<AdminRoute redirect="/login" redirectUser="/team"><EditUser /></AdminRoute>} />
                    <Route exact path="/team/pending/:id/edit" element={<AdminRoute redirect="/login" redirectUser="/team"><EditPendingUser /></AdminRoute>} />
                    <Route exact path="/questions/new" element={<AdminRoute redirect="/login" redirectUser="/team"><AddQuestion /></AdminRoute>} />
                    <Route exact path="/questions/:id/edit" element={<AdminRoute redirect="/login" redirectUser="/team"><EditQuestion /></AdminRoute>} />
                    <Route exact path="/company" element={<AdminRoute redirect="/login" redirectUser="/team"><Company /></AdminRoute>} />
                    <Route exact path="/profile" element={<UserRoute redirect="/login" redirectUser="/team"><Profile /></UserRoute>} />
                    <Route path="*" element={<OmniRoute></OmniRoute>} />
                  </Routes>
              </div>
            </div>
          </div>
          </ThemeContext.Provider>
        </Router>
      </DndProvider>
    </PersistGate>
  );
}

export default App;
