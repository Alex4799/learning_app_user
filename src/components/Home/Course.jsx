import { useEffect, useState } from "react";
import { api,header } from '../../api/api';
import { NavLink } from "react-router-dom";

function Course(){

  const [courses,setCourse] =useState([]);

  const getData=async ()=> {
      header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
      const response=await api.get('user/home/course',{headers:header});
      for (let i = 0; i < response.data.data.length; i++) {
        if (response.data.data[i].image!=null) {
          response.data.data[i].image='https://learningapp.alexlucifer.info/storage/courseImage/'+response.data.data[i].image;
        }else{
          response.data.data[i].image='https://learningapp.alexlucifer.info/image/default.jpg';
        }
      }
      setCourse(response.data.data);
  }

  useEffect(()=>{
    getData();
  },[])


    return(
        <section className="course">
        <div className="d-flex justify-content-between">
            <h3>Course</h3>
            <a href="">See More &gt;&gt;&gt;</a>
        </div>
        <div className="hr"></div>
        <div className="row course-container py-3">
        {
          courses.length!=0 ? (
            courses.map((course)=>
              course.id != 1 ? (
                <div className="col-md-3 py-2" key={course.id}>
                  <div className=" bag-white shadow rounded p-2">
                      <div className="p-2 img-container">
                        <img src={course.image} className="w-100 img-thumbnail" alt="course image" />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title py-2">{course.name}</h5>
                        <button className="btn btn-secondary py-2">Course Fee - {course.course_fee} MMK</button>
                        <p className="card-text py-2">{course.description.slice(0,100)+'....'}</p>
                        <div className="d-flex justify-content-end p-2">
                        <NavLink to={`/course/detail/${course.id}`}>
                          <button className="btn btn-secondary"><i className="fa-solid fa-eye"></i></button>
                        </NavLink>
                        </div>
                      </div>
                    </div>
              </div>
              ) : (null)
          )
          ):(
            <h1>There is no course</h1>
          )
        }
        </div>
    </section>
    );
}

export default Course