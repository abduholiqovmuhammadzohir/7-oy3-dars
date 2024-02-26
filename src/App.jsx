import { Routes, Route, NavLink } from "react-router-dom";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';

import Login from "./components/login"
import Home from "./components/home"
import Register from "./components/register"
import Nopage from "./components/nopage"

function App() {
  const [mode, setMode] = React.useState(localStorage.getItem('mode') || 'light');

  const handleChangeMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  React.useEffect(() => {
    const storedMode = localStorage.getItem('mode');
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className={`conta ${mode}`} > 
      <div className="containers">
        <div className="mode-toggle" onClick={handleChangeMode}>
          {mode === 'light' ?  <LightModeIcon/> : <DarkModeIcon /> }
        </div>
        <div className="select">
          <Box>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Lang</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value="lang"
                label="Lang"
                onChange={handleChange}
              >
                <MenuItem value='en'>en</MenuItem>
                <MenuItem value='uz'>uz</MenuItem>
                <MenuItem value='ru'>ru</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <Routes >
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
    </div>
  );
}

export default App;
