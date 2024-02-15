import { useState } from "react"
import {  useNavigate, useParams } from "react-router";
import { api, header } from "../../api/api";

function EnrollCourse(){

    const [loadingStatus,setLoading] = useState(false);
    const [method,setMethod] = useState('wave');
    const [image,setImage] = useState({});
    const {id,status,detailId} = useParams();
    const navigator = useNavigate();

    const sendCourseEnroll =async () =>{
        setLoading(true);
        const data = {
            'course_id' : id,
            'courseDetailId' :detailId
        };
        if (status=='25') {
            data.image25=image;
        }else if (status=='50') {
            data.image75=image;
        }else if (status=='75') {
            data.image100=image;
        }else{
            data.image25=image;
        }


        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response = await api.post(`user/course_detail/enroll`,data,{headers:header});
        if (response.data.status=='success') {
            setLoading(false);
            navigator(`/course/detail/${id}`);
        }
    }

    return(
        <div>
            <div className="py-2">
                <h3 className="text-center">Course Enroll</h3>
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
            <div className="row container-fluid">
                <div className="col-md-6 offset-md-3 p-3 border border-black shadow rounded">
                    <div className="py-2">
                        <h4>Enroll Form</h4>
                    </div>
                    <div className="py-2">
                        <h5 className="py-1">Choose Method</h5>
                        <div className="d-flex justify-content-around flex-wrap">
                            <button onClick={()=>setMethod('wave')} className="btn btn-info">Wave Pay</button>
                            <button onClick={()=>setMethod('kbz')} className="btn btn-info">KBZ Pay</button>
                            <button onClick={()=>setMethod('cb')} className="btn btn-info">CB Pay</button>
                        </div>
                    </div>
                    {
                        method=='wave' ? (
                            <div>
                                <div className="py-2">
                                    <p>Wave Pay Account Phone - 09980730638</p>
                                    <p>Wave Pay Account Name - Htet Arkar Lin</p>
                                </div>
                                <div className="py-2">
                                    <h5 className="py-1">How to Enroll ?</h5>
                                    <div className="d-flex justify-content-center">
                                        <iframe className="w-100" height="315" src="https://www.youtube.com/embed/e3DM9h608mk?si=fVR6Scud1QzdC35r" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                        ) : method=='kbz' ? (
                            <div>
                                <div className="py-2">
                                    <p>KBZ Pay Account Phone - 09980730638</p>
                                    <p>KBZ Pay Account Name - Htet Arkar Lin</p>
                                </div>
                                <div className="py-2">
                                    <h5 className="py-1">How to Enroll ?</h5>
                                    <div className="d-flex justify-content-center">
                                        <iframe className="w-100" height="315" src="https://www.youtube.com/embed/e3DM9h608mk?si=fVR6Scud1QzdC35r" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="py-2">
                                    <p>CB Pay Account Phone - 09980730638</p>
                                    <p>CB Pay Account Name - Htet Arkar Lin</p>
                                </div>
                                <div className="py-2">
                                    <h5 className="py-1">How to Enroll ?</h5>
                                    <div className="d-flex justify-content-center">
                                        <iframe className="w-100" height="315" src="https://www.youtube.com/embed/e3DM9h608mk?si=fVR6Scud1QzdC35r" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="py-2">
                        <div className="py-2">
                            <p>Enter your transition screenshot </p>
                            <input type="file" className="form-control" onChange={(e)=> setImage(e.target.files[0])}/>
                        </div>
                        <div className="py-2 d-flex justify-content-end">
                            <button className="btn btn-primary" onClick={()=>sendCourseEnroll()}>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnrollCourse