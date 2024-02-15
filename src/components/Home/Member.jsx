import { useEffect, useState } from "react";
import { api, header } from "../../api/api";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

function Member(){

  const [members,SetMembers] = useState([]);

  const getData = async ()=>{
    header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
    const response = await api.get('user/home/member',{headers:header});
      
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].image!=null) {
          response.data[i].image='https://learningapp.alexlucifer.info/storage/profile/'+response.data[i].image;
          SetMembers(response.data);
        }else{
          if (response.data[i].gender=='male') {
            response.data[i].image='https://learningapp.alexlucifer.info/image/default-male-image.png';
            SetMembers(response.data);
          }else{
            response.data[i].image='https://learningapp.alexlucifer.info/image/default-female-image.webp';
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
            <h3>Member</h3>
            <div className="hr"></div>
        </div>
        <div className="row container-fluid">
          <div className="col-md-8 offset-md-2">
          <OwlCarousel className='owl-theme' loop margin={10} nav>
        {
                    members.length!=0 ? (
                      members.map((member)=>

                      <div className='item' key={member.id}>
                            <div className="card bag-white text-deep-dark border border-white">
                              <div className="d-flex justify-content-center">
                                <img src={member.image} className="card-img-top w-50" alt="profile" />  
                              </div>
                              <div className="card-body">
                                <h5 className="text-center">{member.name}</h5>
                                <h6 className="text-center">{member.position}</h6>
                              </div>
                            </div>
                      </div>
                      )
                    ) : null 
                  }
        </OwlCarousel>
          </div>
        </div>
      </section>
    );
}

export default Member
