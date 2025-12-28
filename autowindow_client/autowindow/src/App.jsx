import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Home.jsx';
import SignUp from './SignUp.jsx';
import Dashboard from './Dashboard.jsx';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
