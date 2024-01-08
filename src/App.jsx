import Home from './components/Home'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Blog from './components/Blog/Blog'
import {Route, Routes} from 'react-router-dom'

import './App.css'
function App() {
  return (
    <div>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<div><Login></Login></div>}/>
        <Route path='/register' element={<div><Register></Register></div>}/>
        <Route path='/home' element={<div><Home></Home></div>}/>
        <Route path='/blog' element={<div><Blog></Blog></div>}/>

      </Routes>
      <Footer></Footer>

    </div>
  );
}

export default App;
