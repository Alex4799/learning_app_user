import { useEffect, useState } from "react";
import { api, header } from "../../api/api";

function SendMessage(){
    const [address,setAddress] = useState('Yangon');
    const [phone,setPhone] = useState('+959980730638');
    const [email,setEmail] = useState('mr.alex4799@gmail.com');
    const [message,setMessage] = useState('');
    const [loadingStatus,setLoading] = useState(false);
    const [alertStatus,setAlertStatus]=useState(false);
    const [alertMesssage,setAlertMesssage]=useState('');

    
    const getLayout = async ()=>{
        const response =await api.get('user/interface');
        if (response.data) {
            setAddress(response.data.address);
            setPhone(response.data.phone);
            setEmail(response.data.email);
        }
    }

    const send =async ()=>{
        setLoading(true);
        setAlertStatus(false);

        if (message!='') {
            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            let data={
                'reply_id':null,
                'message':message,
            };
            const response = await api.post('user/message/send',data,{headers:header});
            if (response.data.status=='success') {
                setLoading(false);
                setAlertStatus(true);
                setAlertMesssage('Send Message Successful');
                setMessage('');
            }
        }else{
            setAlertMesssage('Fill Completely');
        }
    }

    useEffect(()=>{
        getLayout();
    },[]);

    return(
        <div>
            <h3 className="text-center py-3">Contact Us</h3>
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
                    <div className="alert alert-primary" role="alert">
                        {(alertMesssage)}
                    </div>
                ) : (null)
            }            
            <div className="row container-fluid">
                <div className="col-md-8 offset-md-2 p-4 rounded shadow">
                    <div className="py-3">
                        <h6 className="py-2 text-center">
                            <i className="fa-solid fa-location-dot me-2"></i>Address - {address}
                        </h6>
                        <h6 className="py-2 text-center">
                            <i className="fa-solid fa-phone me-2"></i>Phone - {phone}
                        </h6>
                        <h6 className="py-2 text-center">
                            <i className="fa-solid fa-envelope me-2"></i>Email - {email}
                        </h6>
                    </div>
                    <div className="py-3">
                        <label htmlFor="" className="py-2">Message</label>
                        <textarea id="" onChange={(e)=>setMessage(e.target.value)} className="form-control my-2" cols="30" rows="10"></textarea>
                        <button className="btn btn-primary" onClick={()=>send()}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default SendMessage