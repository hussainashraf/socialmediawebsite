import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Profile from './components/Profile';
import Createpost from './components/Createpost';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/createpost' element={<Createpost/>}></Route>
      </Routes>
      <ToastContainer theme="dark"/>
    </div>
    </BrowserRouter>
  
  );
}

export default App;
