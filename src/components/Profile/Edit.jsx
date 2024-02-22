import { useEffect, useState } from "react"
import { api, header } from "../../api/api";
import { useNavigate } from "react-router";

function Edit() {

    const navigate=useNavigate();

    const [user,setUser] = useState({});
    const [loadingStatus,setLoading] = useState(false);
    const [alertStatus,setAlert] = useState(false);

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [phone,setPhone]=useState('');
    const [gender,setGender]=useState('');
    const [image,setImage] = useState(null);

    const [nameError,setNameError]=useState(false);
    const [emailError,setEmailError]=useState(false);
    const [phoneError,setPhoneError]=useState(false);
    const [genderError,setGenderError]=useState(false);

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

                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setGender(response.data.gender);

                setLoading(false);

            }
        
    }

    const updateUser =async () =>{
        setLoading(true);
        setNameError(false);
        setEmailError(false);
        setPhoneError(false);
        setGenderError(false);


        if (name=='') {
            setNameError(true);
        }

        if (email=='') {
            setEmailError(true);
        }

        if (phone=='') {
            setPhoneError(true);
        }

        if (gender=='') {
            setGenderError(true);
        }

        if (name!='' && email!='' && phone!='' && gender!='') {

            const data={
                'name':name,
                'email':email,
                'phone':phone,
                'gender':gender,
                'image':image
            };

            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            const response= await api.post('user/update',data,{headers:header});
            if (response.data.status=='success') {
                navigate('/profile');
            }
        }else{
            setAlert(true);
        }
        setLoading(false);

    }

    useEffect(()=>{
        getUserData();
    },[])

    return(
        <div className="container">
            <h1 className="py-3"><a href="{{route('admin#profile')}}">Profile</a> / Edit Profile</h1>
            <div className="">
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
                    alertStatus ?  (
                        <div className="alert alert-success alert-dismissible fade show col-md-4 offset-md-8" role="alert">
                            Please Fill Completely !!!!
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    ):(null)
                }
                <div className=" shadow rounded py-4">
                    <div>
                        <div className="row container-fluid">
                            <div className="col-md-3 offset-md-1" >
                                <div>
                                    <img src={user.image} alt="User Profile" className="w-100 rounded img-thumbnail"/>
                                </div>
                                <div className="py-2">
                                    <input type="file" onChange={(e)=>setImage(e.target.files[0])} name="image" id="" className="form-control"/>
                                </div>
                            </div>
                            <div className="col-md-6 offset-md-2">

                                <div className="py-2">
                                    <label className="py-2" htmlFor=""><i className="fa-solid fa-file-signature me-2"></i>Name</label>
                                    <input type="text" onChange={(e)=>setName(e.target.value)} name="name" className="form-control py-2" value={name} />
                                    {
                                        nameError ? (
                                            <small className="text-danger">name field is required !!!!</small>
                                        ) : (null)
                                    }
                                </div>

                                <div className="py-2">
                                    <label className="py-2" htmlFor=""><i className="fa-solid fa-envelope me-2"></i>Email</label>
                                    <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} className="form-control py-2" value={email} />
                                    {
                                        emailError ? (
                                            <small className="text-danger">Email field is required !!!!</small>
                                        ) : (null)
                                    }
                                </div>

                                <div className="py-2">
                                    <label className="py-2" htmlFor=""><i className="fa-solid fa-phone me-2"></i>Phone</label>
                                    <input type="text" name="phone" onChange={(e)=>setPhone(e.target.value)} className="form-control py-2" value={phone} />
                                    {
                                        phoneError ? (
                                            <small className="text-danger">Phone field is required !!!!</small>
                                        ) : (null)
                                    }
                                </div>

                                <div className="py-2">
                                    <label className="py-2" htmlFor=""><i className="fa-solid fa-venus-mars me-2"></i>Gender</label>
                                    <select name="gender" id="" className="form-control" onChange={(e)=>setGender(e.target.value)}>
                                        <option value="" className="text-dark">Choose Gender</option>
                                        <option value="male" className="text-dark" selected={gender=='male' ? true : false} >Male</option>
                                        <option value="female" className="text-dark" selected={gender=='female' ? true : false}>Female</option>
                                    </select>
                                    {
                                        genderError ? (
                                            <small className="text-danger">Gender field is required !!!!</small>
                                        ) : (null)
                                    }
                                </div>

                                <div className="py-2 float-end">
                                    <button className="btn btn-primary" onClick={()=>updateUser()}>Update</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Edit