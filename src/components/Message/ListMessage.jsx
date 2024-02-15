import { useEffect, useState } from "react";
import { api, header } from "../../api/api"
import { NavLink } from "react-router-dom";

function ListMessage(){
    const [loadingStatus,setLoading] = useState(false);
    const [messages,setMessage] = useState([]);

    const getMessage =async () =>{
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response = await api.get('user/message/get',{headers:header});
        if (response.data) {
            setMessage(response.data);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getMessage();
    },[])

    return(
        <div className="bag-white">
        <h3 className="text-center py-3">Message List</h3>

        <div className="d-block d-lg-flex justify-content-around">
            <div className="py-2">
                <h4>Total - {messages.length}</h4>
            </div>
        </div>
        {
              loadingStatus==true ? (
                  <div className="py-3 d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
              ) : (null)
          }
        <div className="m-3 row">
            <table className=" text-center">
                <thead>
                  <tr className="row py-2">
                    <th className="col">ID</th>
                    <th className="col">Name</th>
                    <th className="col"></th>
                  </tr>
                </thead>
                <tbody className="">
                    {
                        messages.length !=0 ? (
                            messages.map((message)=>
                                    <tr key={message.id} className={message.status==0 ? "row border border-primary py-2 bg-secondary" : "row border border-primary py-2 bag-white"}>
                                        <td className="col">{message.id}</td>
                                        <td className="col">{message.user_name}</td>
                                        <td className="col"><NavLink to={`/message/view/${message.id}`} className="btn btn-secondary"><i className="fa-solid fa-eye"></i></NavLink></td>
                                    </tr>
                            )
                        ) : (null)
                    }
                </tbody>
              </table>
        </div>
    </div>
    )
}
export default ListMessage