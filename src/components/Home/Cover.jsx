import { useEffect, useState } from "react";
import { api } from "../../api/api";

function Cover(){

    const [cover,setCover]=useState('https://learningapp.alexlucifer.info/image/cover.webp');

    const checkLayout=async () =>{
        const response= await api.get('user/interface');
        if (response.data) {
          if (response.data.coverimage!=null) {
            setCover(`https://learningapp.alexlucifer.info/storage/interface/${response.data.coverimage}`);
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