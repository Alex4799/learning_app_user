import Home from './components/Home/Home'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Blog from './components/Blog/Blog'
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import { api } from './api/api'
import BlogDetail from './components/Blog/BlogDetail'
import Course from './components/Course/Course'
import CourseDetail from './components/Course/CourseDetail'
import CourseCategory from './components/Course/CourseCategory'
import LessonList from './components/Lesson/LessonList'
import ViewLesson from './components/Lesson/ViewLesson'
import EnrollCourse from './components/Course/EnrollCourse'
import AboutUs from './components/AboutUs/AboutUs'
import SendMessage from './components/Message/SendMessage'
import ListMessage from './components/Message/ListMessage'
import ViewMessage from './components/Message/ViewMessage'

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [layout,setLayout] = useState({});

  const authorization =()=>{
    if (location.pathname == '/' || location.pathname == '/register') {
      const token = localStorage.getItem('token');
      if (token!="null") {
        navigate('/home');
      }
    }else{
      const token = localStorage.getItem('token');
      if (token=="null") {
        navigate('/');
      }
    }
  };

  const checkLayout=async () =>{
    const response= await api.get('user/interface');
    if (response.data) {
      if (response.data.background_color!=null) {
        document.documentElement.style.setProperty('--color-background',response.data.background_color);
        document.documentElement.style.setProperty('--color-white',response.data.background_color);
      }
      if (response.data.background_color!=null) {
        document.documentElement.style.setProperty('--color-dark',response.data.font_color)
      }
    }
  }

  
  useEffect(()=>{
    checkLayout();
    authorization();
  },[location])

  return (
    <div className='bag-white text-deep-dark'>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<div><Login></Login></div>} />
        <Route path='/register' element={<div><Register></Register></div>}/>


        <Route path='/home' element={<div><Home></Home></div>} />


        <Route path='/blog' element={<div><Blog></Blog></div>}/>
        <Route path='/blog/details/:id' element={<div><BlogDetail></BlogDetail></div>}/>

        <Route path='/course' element={<div><Course></Course></div>}/>
        <Route path='/course/detail/:id' element={<div><CourseDetail></CourseDetail></div>}/>
        <Route path='/course/category/:id' element={<div><CourseCategory></CourseCategory></div>}/>
        <Route path='/course/enroll/:id/:status/:detailId' element={<div><EnrollCourse></EnrollCourse></div>}/>


        <Route path='/lesson/:id' element={<div><LessonList></LessonList></div>}/>
        <Route path='/lesson/view/:course_category/:id' element={<div><ViewLesson></ViewLesson></div>}/>

        <Route path='/about' element={<div><AboutUs></AboutUs></div>}/>

        <Route path='/contact' element={<div><SendMessage></SendMessage></div>}/>
        <Route path='/message/list' element={<div><ListMessage></ListMessage></div>}/>
        <Route path='/message/view/:id' element={<div><ViewMessage></ViewMessage></div>}/>

      </Routes>
      <Footer></Footer>

    </div>
  );
}

export default App;
