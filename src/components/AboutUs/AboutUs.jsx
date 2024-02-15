import { useEffect, useState } from "react"
import Member from "../Home/Member"
import { api, header } from "../../api/api";

function AboutUs(){

    const [address,setAddress] = useState('Yangon');
    const [phone,setPhone] = useState('+959980730638');
    const [email,setEmail] = useState('mr.alex4799@gmail.com');
    const [map,setMap] = useState('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d488797.97858163906!2d95.85189695302519!3d16.839536845157664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1949e223e196b%3A0x56fbd271f8080bb4!2sYangon!5e0!3m2!1sen!2smm!4v1706984717554!5m2!1sen!2smm');


    const getLayout = async ()=>{
        const response =await api.get('user/interface');
        if (response.data) {
            setAddress(response.data.address);
            setPhone(response.data.phone);
            setEmail(response.data.email);
            setMap(response.data.map);
        }
    }

    useEffect(()=>{
        getLayout();
    },[]);

    return(
        <section className="about">
            <h2 className="text-center py-2">Angle Training Center</h2>
            
            <div className="history">
                <h4 className="py-2">Our Center History</h4>
                <div className="hr"></div>
                <p className="py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem obcaecati suscipit ducimus, itaque ipsum voluptatum ullam 
                 corporis nihil tempore dolor at sequi totam consectetur quaerat delectus laborum natus officia est?
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem obcaecati suscipit ducimus, itaque ipsum voluptatum ullam 
                 corporis nihil tempore dolor at sequi totam consectetur quaerat delectus laborum natus officia est?
                 </p>
            </div>

            <div>
                <Member></Member>
            </div>

            <div className="address">
                <h4 className="py-2">Our Center Address</h4>
                <div className="hr"></div>
                <div className="py-3 row container-fluid">
                    <div className="col-md-6">
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
                    <div className="col-md-6">
                        <div className="w-100">
                            <iframe className="w-100" src={map} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default AboutUs