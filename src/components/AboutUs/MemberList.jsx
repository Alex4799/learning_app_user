import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import { api, header } from "../../api/api";

function MemberList(){

    const [members,setMember] = useState([]);
    const [loadingStatus,setLoading] = useState(false);

    const getMember =async ()=>{
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response = await api.get('user/home/member',{headers:header});

        if (response.data) {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].image!=null) {
                  response.data[i].image='http://127.0.0.1:8000/storage/profile/'+response.data[i].image;
                }else{
                  if (response.data[i].gender=='male') {
                    response.data[i].image='http://127.0.0.1:8000/image/default-male-image.png';
                  }else{
                    response.data[i].image='http://127.0.0.1:8000/image/default-female-image.webp';
                  }
                }
                
              }
            setMember(response.data);
        }
        setLoading(false);
    }

    useEffect(()=>{
        getMember();
    },[])

    return (
        <div>
            <h1 className="py-2"><NavLink to={`/about`}>About Us</NavLink> / Member List</h1>
            {
              loadingStatus==true ? (
                  <div className="py-3 d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
              ) : (null)
            }
            <div className="d-flex justify-content-around py-3">
                <h2>Total - {members.length}</h2>
            </div>
            <div className="p-2 row container-fluid">
                {
                    members.length !=0 ? (
                        members.map((member)=>
                            <div key={member.id} className="bag-white text-deep-dark border border-white col-md-4">
                                <div className=" row">
                                    <div className="d-flex justify-content-center col-md-6">
                                        <img src={member.image} className="w-100" alt="profile" />  
                                    </div>
                                    <div className="col-md-6 m-auto">
                                        <h5 className="text-center py-2">Name - {member.name}</h5>
                                        <h6 className="text-center py-2">Email - {member.email}</h6>
                                        <h6 className="text-center py-2">Position - {member.position}</h6>
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (null)
                }
            </div>
        </div>
    )
}

export default MemberList