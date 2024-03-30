import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Search from './pages/Search';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SelectedPokemon from './pages/SelectedPokemon';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <div className='pages'>
            <Routes>
              <Route path='/' element={<Landing/>}/>
              <Route path='/search' element={<Search/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<Signup/>}/>
              <Route path='/pokemon' element={<SelectedPokemon/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
