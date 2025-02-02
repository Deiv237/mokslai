import { useState } from 'react';
import './App.css'
import ThemeContext from './ThemeContext';
import Login from './components/login';
import Dashboard from './components/pashboard';

function App() {
  const [theme, setTheme] =useState('light');
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {/* sukurti UserProvider ir is komponento Login "uzsetinti" useri, pvvz. {name: "Ann", role: "admin"} Jei user nera< Dashboard nerodyti */}
      <div>
        <Login />
        <Dashboard />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
