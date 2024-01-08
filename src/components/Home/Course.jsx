import { useEffect, useState } from "react";
import { api,header } from '../../api/api';

function Course(){

  const [course,setCourse] =useState({});

  function getData() {
    header.Authorization=JSON.parse(localStorage.getItem('token'));
    console.log(header);
    const response=api.get('user/course',null,{headers:header});
    console.log(response);
  }

  useEffect(()=>{
    getData();
  })


    return(
        <section className="course">
        <div className="d-flex justify-content-between">
            <h3>Course</h3>
            <a href="">See More &gt;&gt;&gt;</a>
        </div>
        <div className="hr"></div>
        <div className="row course-container py-3">
            <div className="card col-md-3">
                <img src="./image/cover.webp" className=" w-100" alt="./image/cover.webp"/>
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Course