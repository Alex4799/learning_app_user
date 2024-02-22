import { useEffect, useState } from 'react';
import { useLocation ,NavLink, useNavigate } from 'react-router-dom';
import { api, header } from '../../api/api';

function Nav() {

    const location = useLocation()
    const navigate=useNavigate();
    const [logo,setLogo] = useState('http://127.0.0.1:8000/image/ANGLE_logo.png');
    const [title,setTitle] = useState('Angle');
    const [message_count,setMessageCount] = useState(0);
    const [userData,setUser] = useState({name:'User'});

    const showSidebar=()=>{
        const threeMenue=document.getElementById('three-menue');
        const sideNav=document.getElementById('side-nav');
        sideNav.style.display='block';
        sideNav.style.width="75%";
        threeMenue.style.display="none";
    }

    const hideSidebar=()=>{
        const threeMenue=document.getElementById('three-menue');
        const sideNav=document.getElementById('side-nav');
        sideNav.style.display='none';
        sideNav.style.width="0%";
        threeMenue.style.display="block";
    }


    const logout=()=>{
        localStorage.setItem("token","null");
        navigate('/');
    }

    const checkLayout=async () =>{
        const response= await api.get('user/interface');
        if (response.data) {
          if (response.data.logo!=null) {
            setLogo(`http://127.0.0.1:8000/storage/interface/${response.data.logo}`);
          }
          setTitle(response.data.title);

        }
    }

    const checkMessage = async () =>{
        const token = localStorage.getItem('token');
        if (token!="null") {
            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            const response= await api.get('user/message/check',{headers:header});
            if (response.data) {
                if (response.data.message_count!=0) {
                    setMessageCount(response.data.message_count);
                }else{
                    setMessageCount(0);
                }
            }
        }
    }

    const getUserData = async ()=>{
        const token = localStorage.getItem('token');
        if (token!="null") {
            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            const response= await api.get('user/data',{headers:header});
            if (response.data) {
                setUser(response.data);
            }
        }else{
            setUser({name:'User'});
        }
    }

    useEffect(()=>{
        checkLayout();
        checkMessage();
        getUserData();
    },[location.pathname]);

    return(
        <header className="nav p-1 p-md-2 position-sticky top-0 shadow">
        <div className="row w-100">
            <div className="logo col-8 col-md-3 d-flex align-items-center">
                <div className="row">
                    <div className="col-4 d-flex align-items-center">
                        <img src={logo} alt="logo image" className="w-100 rounded"/>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                        <div>
                            <h3 className="fs-4">{title}</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menues col col-md-7">
                {
                    location.pathname=='/'? (
                        <div></div>
                    ): location.pathname=='/register'? (
                        <div></div>
                    ):(
                        <ul className="d-flex justify-content-around pt-3 fs-5">
                            <li className={location.pathname=="/home" ? 'menue_item active' : 'menue_item'}>
                                <NavLink to="/home" className="text-decoration-none">
                                    Home
                                </NavLink>
                            </li>
                            <li className={location.pathname=="/blog" ? 'menue_item active' : 'menue_item'}>
                                <NavLink to="/blog" className="text-decoration-none">
                                    Blog
                                </NavLink>
                            </li>
                            <li className={location.pathname=="/course" ? 'menue_item active' : 'menue_item'}>
                                <NavLink to="/course" className="text-decoration-none">
                                    Course
                                </NavLink>
                            </li>
                            <li className={location.pathname=="/about" ? 'menue_item active' : 'menue_item'}>
                                <NavLink to="/about" className="text-decoration-none">
                                    About Us
                                </NavLink>
                            </li>
                            <li className={location.pathname=="/contact" ? 'menue_item active' : 'menue_item'}>
                                <NavLink to="/contact" className="text-decoration-none">
                                    Contact Us
                                </NavLink>
                            </li>
                            {
                                message_count!=0 ? (
                                    <div>
                                        <NavLink to='/message/list' className="text-decoration-none">
                                        <button type="button" className="btn btn-secondary position-relative">
                                            <i className="fa-solid fa-bell"></i>
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                {message_count}
                                                <span className="visually-hidden">unread messages</span>
                                            </span>
                                        </button>
                                        </NavLink>
                                    </div>
                                ):(null)
                            }
                        </ul>

                    )
                }
            </div>
            <div className="button col-4 col-md-2 pt-3">
                <div className="d-flex flex-wrap">
                    {
                        location.pathname=='/' ? (
                            <div className=" align-items-center gap-2 nav-btn-group">
                                <NavLink to="/register" className="btn btn-primary">
                                    Register
                                </NavLink>
                            </div>
                        ) : location.pathname=='/register' ? (
                            <div className=" align-items-center gap-2 nav-btn-group">
                                <NavLink to="/" className="btn btn-primary">
                                    Login
                                </NavLink>
                            </div>
                        ) : (
                            <div className=" align-items-center gap-2 nav-btn-group">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userData.name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><NavLink to={'/profile'} className="dropdown-item">Profile</NavLink></li>
                                        <li><NavLink to={'/change/password'} className="dropdown-item">Change Password</NavLink></li>
                                        <li><a onClick={()=>{logout()}} className="dropdown-item">Logout</a></li>
                                    </ul>
                                </div>
                                
                            </div>

                        )
                    }
                    <div className="align-items-center justify-content-end three-menue" onClick={()=>showSidebar()} id="three-menue">
                        <i className="fa-solid fa-bars fs-5"></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="p-5 side-nav shadow" id="side-nav">
          <div className="">
            <ul className=" fs-5">
                <li className={location.pathname=="/home" ? 'menue_item py-2 active' : 'menue_item py-2'}>
                    <NavLink to="/home" className="text-decoration-none">
                        Home
                    </NavLink>     
                </li>
                <li className={location.pathname=="/blog" ? 'menue_item py-2 active' : 'menue_item py-2'}>
                    <NavLink to="/blog" className="text-decoration-none">
                        Blog
                    </NavLink>
                </li>
                <li className={location.pathname=="/course" ? 'menue_item py-2 active' : 'menue_item py-2'}>
                    <NavLink to="/course" className="text-decoration-none">
                        Course
                    </NavLink>
                </li>
                <li className={location.pathname=="/about" ? 'menue_item py-2 active' : 'menue_item py-2'}>
                    <NavLink to="/about" className="text-decoration-none">
                        About Us
                    </NavLink>
                </li>
                <li className={location.pathname=="/contact" ? 'menue_item py-2 active' : 'menue_item py-2'}>
                    <NavLink to="/contact" className="text-decoration-none">
                        Contact Us
                    </NavLink>
                </li>
                {
                    location.pathname=='/' ? (
                        <>
                            <li className=" py-2">    
                                <NavLink to="/register" className="btn btn-primary">
                                    Register
                                </NavLink>
                            </li>
                        </>) : location.pathname=='/register' ? (
                        <>
                            <li className=" py-2">
                                <NavLink to="/" className="btn btn-primary">
                                    login
                                </NavLink>
                            </li>
                        </>) : (
                            <li className=" py-2">
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userData.name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><NavLink to={'/profile'} className="dropdown-item">Profile</NavLink></li>
                                        <li><NavLink to={'/change/password'} className="dropdown-item">Change Password</NavLink></li>
                                        <li><a onClick={()=>{logout()}} className="dropdown-item">Logout</a></li>
                                    </ul>
                                </div>
                            </li>
                        )
                }
            </ul>
          </div>
          <div className="crossx" id="crossx" onClick={()=>hideSidebar()}>
              <i className="fa-solid fa-circle-xmark fs-4"></i>
          </div>
        </div>
    </header>
    );
}

export default Nav