import { useState } from "react"
import { api, header } from "../../api/api";
import { useNavigate } from "react-router";

function PasswordChange(){
    const [oldPassword,setOld] = useState('');
    const [newPassword,setNew] = useState('');
    const [confirmPassword,setConfirm] = useState('');
    const [alertStatus,setAlert] = useState(false);
    const [message,setMessage] = useState('');
    const navigate=useNavigate();

    const changePassword =async () =>{
        if (oldPassword!='' && newPassword !='' && confirmPassword !='') {
            if (newPassword==confirmPassword) {
                const data={
                    'oldPassword':oldPassword,
                    'newPassword':newPassword
                };
                header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
                const response=await api.post('user/change/password',data,{headers:header});
                if (response.data.status=='success') {
                    navigate('/profile');
                }else{
                    setAlert(true);
                    setMessage('Old Password is worng. Please try again.');
                }
            }else{
                setAlert(true);
                setMessage('Password and Confirm Password must be same.');
            }
        }else{
            setAlert(true);
            setMessage('Please Fill Completely !!!');
        }
    }
    
    return (
        <div className=" row container-fluid py-3">
            <div className="p-3 shadow rounded alert col-md-8 offset-md-2">

                <h3 className="py-3">Change Password</h3>
                {
                    alertStatus ?  (
                        <div className="alert alert-success alert-dismissible fade show col-md-4 offset-md-8" role="alert">
                            {message}
                        </div>
                    ):(null)
                }
                <div className=" py-3">
                    <label htmlFor="">Current Password</label>
                    <input type="password" onChange={(e)=>setOld(e.target.value)} className="form-control" />
                </div>

                <div className=" py-3">
                    <label htmlFor="">New Password</label>
                    <input type="password" onChange={(e)=>setNew(e.target.value)} className="form-control" />
                </div>

                <div className=" py-3">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" onChange={(e)=>setConfirm(e.target.value)} className="form-control" />
                </div>

                <div className=" py-3 d-flex justify-content-end">
                    <button onClick={()=>changePassword()} type="submit" className="btn btn-primary">Update</button>
                </div>

            </div>
        </div>
    )
}

export default PasswordChange