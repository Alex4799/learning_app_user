import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { api, header } from "../../api/api";
import { NavLink } from "react-router-dom";

function ViewMessage(){

    const [loadingStatus,setLoading] = useState(false);
    const [message,setMessage] = useState({});
    const [replyMessages,setReplyMessages] = useState([]);
    const [replyMessage,setReplyMessage] = useState('');
    const [replyForm,setReplyForm] = useState(false);
    const [alertStatus,setAlertStatus]=useState(false);
    const [alertMesssage,setAlertMesssage]=useState('');

    const {id} = useParams();

    const getData= async ()=>{
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get(`user/message/view/${id}`,{headers:header});
        if (response.data) {
            setMessage(response.data.messsage);
            setReplyMessages(response.data.replyMessage);
            setLoading(false);
        }
    }

    const send =async ()=>{
        setLoading(true);
        setAlertStatus(false);

        if (message!='') {
            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            let data={
                'reply_id':message.id,
                'message':replyMessage,
            };
            const response = await api.post('user/message/send',data,{headers:header});
            if (response.data.status=='success') {
                setReplyForm(false);
                setLoading(false);
                getData();
            }
        }else{
            setAlertMesssage('Fill Completely');
        }
        
    }


    useEffect(()=>{
        getData();
    },[]);

    return(
    <div>
        <div>
            <h3 className="py-3"><NavLink to={'/message/list'}>Message List</NavLink> /View Message</h3>
            {
              loadingStatus==true ? (
                  <div className="py-3 d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
              ) : (null)
            }
            <div className="row container-fluid">
                <div className="col-md-8 offset-md-2 border border-primary rounded p-3">
                    <div className="row container-fluid">
                        <p className="col-2">name - </p>
                        <p className="col">{message.user_name}</p>
                    </div>
                    <div className="row container-fluid">
                        <p className="col-2">email - </p>
                        <p className="col">{message.user_email}</p>
                    </div>
                    <div className="row container-fluid">
                        <p className="col-2">Message - </p>
                        <p className="col">{message.message}</p>
                    </div>
                    <div className=" d-flex justify-content-end">
                        {
                            replyForm ? (
                                <button className="btn btn-primary" onClick={()=>setReplyForm(false)}>Close</button>
                            ): (
                                <button className="btn btn-primary" onClick={()=>setReplyForm(true)}>Reply</button>
                            )
                        }
                    </div>
                </div>
            </div>
            {
                alertStatus==true ? (
                    <div className="alert alert-primary" role="alert">
                        {(alertMesssage)}
                    </div>
                ) : (null)
            }   
            {
                replyForm ? (
                    <div className="" id="reply_box">
                        <div className="row container-fluid">
                            <div className="col-md-8 offset-md-2 border border-primary rounded p-3">
                                
                                <input type="hidden" name="reply_id" value={message.id}/>
                                <input type="hidden" name="get_id" value={message.send_id}/>
        
                                <div className="py-2">
                                    <textarea name="message" placeholder="Enter Your Message" className="form-control" cols="30" rows="2" onChange={(e)=>setReplyMessage(e.target.value)}></textarea>
                                </div>
                                <div className="py-2 d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={()=>send()} id="send">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (null)
            }
            {
                replyMessages.length!=0 ? (
                    replyMessages.map((item)=>
                        <div className="row container-fluid" key={item.id}>
                            <div className="col-md-8 offset-md-2 border border-primary rounded p-3">
                                <div className="row container-fluid">
                                    <p className="col-2">name - </p>
                                    <p className="col">{item.user_name}</p>
                                </div>
                                <div className="row container-fluid">
                                    <p className="col-2">email - </p>
                                    <p className="col">{item.user_email}</p>
                                </div>
                                <div className="row container-fluid">
                                    <p className="col-2">Message - </p>
                                    <p className="col">{item.message}</p>
                                </div>
                            </div>
                        </div>
                    ) 
                ): (null)
            }

        </div>
    </div>
    )
}

export default ViewMessage