import { useState } from 'react';
import './index.css';
import { api } from '../../api/api';
import { useLocation, useNavigate } from 'react-router'


function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loadingStatus,setLoadingStatus]=useState(false);
    const [userData,setUserData]=useState('');
    const [alertStatus,setAlertStatus]=useState(false);

    const navigate=useNavigate();

    const login =async ()=>{
        let data={
            'email':email,
            'password':password,
        };

        setLoadingStatus(true);
        
        const getData=await api.post('user/login',data);
        if (getData) {
            if(getData.data.status=='success'){
                setLoadingStatus(false);
                setUserData(getData.data);
                localStorage.setItem("token",JSON.stringify(getData.data.token));
                console.log(localStorage.getItem('token'));
                navigate('/home');
            }else{
                setUserData(getData.data);
                setAlertStatus(true);
                setLoadingStatus(false);
                
            };
        }
    }
    return(
        <div className="d-flex justify-content-center align-items-center parents">
        <div className="container-fluid row">
            <div className="col-lg-4 offset-lg-4 bg-white shadow p-3 rounded">
                <div className="p-4">
                        <h2 className=" text-center">Welcome To Angle</h2>
                        <div className='d-flex justify-content-center'>
                            <img src="./image/ANGLE_logo.png" alt="" className='w-50' />
                        </div>
                        <h2 className="py-2 text-center">Login</h2>



                        {
                            loadingStatus==true ? (
                                <div className="py-3 d-flex justify-content-center">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (null)
                        }

                        {
                            alertStatus==true ? (
                                <div className="alert alert-danger" role="alert">
                                    {(userData.message)}
                                </div>
                            ) : (null)
                        }

                        <div className="py-2">
                            <label className="py-2">Email</label>
                            <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control py-2" name="email" />
                        </div>
                        <div className="py-2">
                            <label className="py-2">Password</label>
                            <input type="password" onChange={(e)=>setPassword(e.target.value)} className="form-control py-2" name="password" />
                        </div>
                        <div className="py-1">
                            <a href="#">Forgot Password ?</a>
                        </div>
                        <div className="py-4">
                            <button className="buttonone fs-4" onClick={()=>login()}>LOGIN</button>
                        </div>
                        <div className="py-1">
                            <a href="#">You don't have an account? Sign Up Here!</a>
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Login