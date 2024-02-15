import { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router';
import { api } from '../../api/api';

function Register(){
    const [email,setEmail] = useState('');
    const [name,setName]=useState('');
    const [psc,setPSC]=useState('');
    const [password,setPassword] = useState('');
    const [loadingStatus,setLoadingStatus]=useState(false);
    const [userData,setUserData]=useState('');
    const [alertStatus,setAlertStatus]=useState(false);
    const [error,setError] = useState('');
    const [logo,setLogo] = useState('https://learningapp.alexlucifer.info/image/ANGLE_logo.png');
    const [title,setTitle] = useState('Angle');

    const navigate=useNavigate();

    const goLogin=()=>{
        navigate('/');
    }

    const register = async ()=>{
        if (name!='' && email!="" && password != "" && psc != '') {
            if (password==psc) {
                let data={
                    'name':name,
                    'email':email,
                    'password':password,
                    'password_confirmation':psc,
                };
                setLoadingStatus(true);
    
                const response =await api.post('/user/register',data);

                if (response.data) {
                    setLoadingStatus(false);
                    if (response.data.status=='success') {
                        localStorage.setItem("token",JSON.stringify(response.data.token));
                        if (localStorage.getItem('token')!='null') {
                            navigate('/home');
                        }
                        
                    }
                }

            }else{
                setError('Password and Confirm Password must be same !!!');
                setAlertStatus(true);
            }

        }else{
            setError('Please Fill Completely !!!');
            setAlertStatus(true);
        }

    }

    const checkLayout=async () =>{
        const response= await api.get('user/interface');
        if (response.data) {
          if (response.data.logo!=null) {
            setLogo(`https://learningapp.alexlucifer.info/storage/interface/${response.data.logo}`);
          }
          setTitle(response.data.title);

        }
    }

    useEffect(()=>{
        checkLayout();
    },[])

    return(
        <div className="d-flex justify-content-center align-items-center parents">
        <div className="container-fluid row">
            <div className="col-lg-4 offset-lg-4 bg-white shadow p-3 rounded">
                <div className="p-4">
                        <h2 className="py-2 text-center">Welcome To {title}</h2>
                        <div className='py-2 d-flex justify-content-center'>
                            <img src={logo} alt="" className='w-50 rounded shadow' />
                        </div>
                        <h2 className=" py-2 text-center">Register</h2>
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
                                    {(error)}
                                </div>
                            ) : (null)
                        }
                        <div className="py-2">
                            <label className="py-2">Name</label>
                            <input type="text" onChange={ (e)=> setName(e.target.value) } className="form-control py-2" name="name" />
                        </div>
                        <div className="py-2">
                            <label className="py-2">Email</label>
                            <input type="email" onChange={ (e)=> setEmail(e.target.value) } className="form-control py-2" name="email" />
                        </div>
                        <div className="py-2">
                            <label className="py-2">Password</label>
                            <input type="password" onChange={ (e)=> setPassword(e.target.value) } className="form-control py-2" name="password" />
                        </div>
                        <div className="py-2">
                            <label className="py-2">Confirm Password</label>
                            <input type="password" onChange={ (e)=> setPSC(e.target.value) } className="form-control py-2" name="password_confirmation" />
                        </div>
                        <div className="py-4">
                            <button className="buttonone fs-4" onClick={()=>register()}>Register</button>
                        </div>
                        <div className="py-1">
                            <a onClick={()=> goLogin()}>You already have an account? Login Here!</a>
                        </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Register