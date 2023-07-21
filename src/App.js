import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from './components/NavBar';
import Tasks from './components/Tasks';
import Home from "./components/Home"
import { LoginContextProvider } from './Contexts/LoginContext';
import ProtectedLayout from './components/ProtectedLayout';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LoginContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ProtectedLayout/>}>
              <Route index element={<Home />}/>
              <Route path='search/:owner/:repo' element={<Tasks />}/>
            </Route>
          </Routes>
        </LoginContextProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
