import Calendar from "./pages/Calendar";
import Login from "./pages/Login";
import RegisterIn from "./pages/Register";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from "react";

export const userContext = createContext(null);

function App() {
  const [userId, setUserId] = useState(localStorage.getItem('userId'))
  const [userName, setUserName] = useState(localStorage.getItem('userName'))

  useEffect(() => { console.log('userId', userId, 'userName', userName); }, [userId, userName])

  return (
    <userContext.Provider value={{ userId, setUserId, userName, setUserName }}>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/register/calendar" element={<Calendar />} />
          <Route path="/register" element={<RegisterIn />} />
        </ Routes>
      </BrowserRouter>

    </userContext.Provider>
  );
}

export default App;
