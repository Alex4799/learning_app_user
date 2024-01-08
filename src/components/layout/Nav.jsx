import { useLocation ,NavLink } from 'react-router-dom';

function Nav() {

    const location = useLocation()
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

    return(
        <header className="nav p-1 p-md-2 position-sticky top-0 shadow">
        <div className="row w-100">
            <div className="logo col-8 col-md-3 d-flex align-items-center">
                <div className="row">
                    <div className="col-4 d-flex align-items-center">
                        <img src="./image/ANGLE_logo.png" alt="logo image" className="w-100 rounded"/>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                        <div>
                            <h3 className="fs-4">ANGLE</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="menues col col-md-7">
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
                    <li className={location.pathname=="/lesson" ? 'menue_item active' : 'menue_item'}>
                        <NavLink to="/lesson" className="text-decoration-none">
                            Lesson
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
                </ul>
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
                                <a className="btn btn-primary">Mg Mg</a>
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
                <li className={location.pathname=="/lesson" ? 'menue_item active' : 'menue_item'}>
                    <NavLink to="/lesson" className="text-decoration-none">
                        Lesson
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
                    location.pathname=='/' ? (
                        <>
                            <li className=" py-3">    
                                <NavLink to="/register" className="btn btn-primary">
                                    Register
                                </NavLink>
                            </li>
                        </>) : location.pathname=='/register' ? (
                        <>
                            <li className=" py-3">
                                <NavLink to="/" className="btn btn-primary">
                                    login
                                </NavLink>
                            </li>
                        </>) : null
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