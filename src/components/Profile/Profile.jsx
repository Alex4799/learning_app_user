import { useEffect, useState } from "react";
import { api, header } from "../../api/api";
import { NavLink, useNavigate } from "react-router-dom";

function Profile(){

    const [user,setUser] = useState({});
    const [courseDatails,setCourseDetail] = useState([]);
    const [loadingStatus,setLoading] = useState(false);
    const [alertStatus,setAlert] = useState(false);
    const [password,setPassword] =useState('');
    const navigate = useNavigate();


    const getUserData = async ()=>{
        setLoading(true);
            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            const response= await api.get('user/data',{headers:header});
            if (response.data) {
                if (response.data.image!=null) {
                    response.data.image='http://127.0.0.1:8000/storage/profile/'+response.data.image;
                }else{
                    if (response.data.gender=='male') {
                      response.data.image='http://127.0.0.1:8000/image/default-male-image.png';
                    }else{
                      response.data.image='http://127.0.0.1:8000/image/default-female-image.webp';
                    }
                }
                setUser(response.data)
                setLoading(false);

            }
        
    }

    const CourseDetailList =async ()=>{
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get('user/course_detail/get',{headers:header});
        if (response.data) {
            setCourseDetail(response.data);
        }
    }

    const deleteProfile=async ()=>{
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get('user/delete/profile',{headers:header});
        if (response.data.status=='success') {
            getUserData();
        }
    }

    const deleteAccount = async ()=>{
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const data={
            'password':password,
        };
        const response=await api.post('user/delete/account',data,{headers:header});
        if (response.data.status=='success') {
            localStorage.setItem("token","null");
            navigate('/');
        }
    }


    useEffect(()=>{
        getUserData();
        CourseDetailList();
    },[])

    return(
            <div className="container">
                <h1 className="py-3">Profile</h1>
                {
                    loadingStatus==true ? (
                        <div className="py-3 d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (null)
                }

                <div className="">
                    <div className=" shadow rounded py-4">
                        <div className="row container-fluid">
                            <div className="col-md-3 offset-md-1 py-4" >
                                <img src={user.image} alt="User Profile" className="w-100 rounded img-thumbnail"/>
                            </div>
                            <div className="offset-md-2 col-md-6 py-4">
                                <h4 className="py-2"><i className="fa-solid fa-file-signature me-2"></i>Name - {user.name}</h4>
                                <h4 className="py-2"><i className="fa-solid fa-envelope me-2"></i>Email - {user.email}</h4>
                                <h4 className="py-2"><i className="fa-solid fa-phone me-2"></i>Phone - {user.phone}</h4>
                                <h4 className="py-2"><i className="fa-solid fa-venus-mars me-2"></i>Gender - {user.gender}</h4>
                                <div className="py-2">
                                    {
                                        courseDatails.map((course)=>
                                            <div key={course.id} className="d-flex justify-content-around bg-secondary p-2 my-2 rounded">
                                                <h5 className="pt-1">{course.name}</h5>
                                                {
                                                    course.done_lesson==0 ? 
                                                    (
                                                        <div className="btn btn-primary">0%</div>
                                                    ) : (
                                                        <div className="btn btn-primary">{(course.done_lesson/course.lesson_count)*100}%</div>
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                                <div className=" d-flex gap-1 flex-wrap">
                                    <NavLink to={'/edit/profile'} className="btn btn-primary my-2"><i className="fa-solid fa-pen-to-square me-2"></i>Edit Profile</NavLink>
                                    <button onClick={()=>deleteProfile()} className="btn btn-danger my-2"><i className="fa-solid fa-trash me-2"></i>Delete Profile Photo</button>
                                    <button onClick={()=>setAlert(true)} className="btn btn-danger my-2"><i className="fa-solid fa-trash me-2"></i>Delete Account</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className=" ">
                    {
                        alertStatus?(
                            <div className=" position-relative p-3 shadow rounded alert">
                                <div>
                        
                                    <h3 className="py-3">Are you sure to delete your account ?</h3>
                                    <h3 className="py-3">Enter Your Password</h3>
                                    <div className=" py-3">
                                        <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="form-control" />
                                    </div>
                        
                                    <div className=" py-3 d-flex justify-content-end">
                                        <button onClick={()=>deleteAccount()} type="submit" className="btn btn-danger">Delete</button>
                                    </div>
                        
                                </div>
                                <div className=" position-absolute p-4 top-0 end-0 close" onClick={()=>setAlert(false)}>
                                    <i className="fa-solid fa-xmark fs-5"></i>
                                </div>
                            </div>
                        ) : (null)

                    }
                </div>
            </div>
    )
}

export default Profile