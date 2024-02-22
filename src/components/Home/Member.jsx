import { useEffect, useState } from "react";
import { api, header } from "../../api/api";
import { NavLink } from "react-router-dom";

function Member(){

  const [members,SetMembers] = useState([]);

  const getData = async ()=>{
    header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
    const response = await api.get('user/home/member',{headers:header});
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].image!=null) {
          response.data[i].image='http://127.0.0.1:8000/storage/profile/'+response.data[i].image;
          SetMembers(response.data);
        }else{
          if (response.data[i].gender=='male') {
            response.data[i].image='http://127.0.0.1:8000/image/default-male-image.png';
            SetMembers(response.data);
          }else{
            response.data[i].image='http://127.0.0.1:8000/image/default-female-image.webp';
            SetMembers(response.data);
          }
        }
        
      }
      SetMembers(response.data);
  }

  useEffect(()=>{
    getData();
  },[]);

    return(
        <section className="member">
        <div className="member-header">
            <div className="d-flex justify-content-between">
            <h3>Member</h3>
            <NavLink to={'/member/list'}>See More &gt;&gt;&gt;</NavLink>
        </div>
            <div className="hr"></div>
        </div>
        <div className="row container-fluid">
          <div className="col-md-8 offset-md-2">

          <div id="carouselExample" className="carousel slide">
              <div className="carousel-inner">
                {
                      members.length!=0 ? (
                        members.map((member,index)=>

                        <div className={index=="0" ? 'carousel-item active' : 'carousel-item'} key={member.id}>
                              <div className="bag-white text-deep-dark border border-white row">
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
                      ) : null 
                    }
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
          </div>

          </div>
        </div>
      </section>
    );
}

export default Member
