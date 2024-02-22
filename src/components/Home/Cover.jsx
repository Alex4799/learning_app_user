import { useEffect, useState } from "react";
import { api } from "../../api/api";

function Cover(){

    const [cover,setCover]=useState('http://127.0.0.1:8000/image/cover.webp');

    const checkLayout=async () =>{
        const response= await api.get('user/interface');
        if (response.data) {
          if (response.data.coverimage!=null) {
            setCover(`http://127.0.0.1:8000/storage/interface/${response.data.coverimage}`);
          }
        }
      }

    useEffect(()=>{
        checkLayout();
    },[]);
    return(
        <section className="cover">
        <div>
            <img src={cover} alt="cover image" className="w-100" />
        </div>
    </section>
    );
}

export default Cover