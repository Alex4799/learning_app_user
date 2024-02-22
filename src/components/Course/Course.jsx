import { useEffect, useState } from "react";
import { api,header } from '../../api/api';
import { NavLink } from "react-router-dom";

function Course(){

  const [courses,setCourse] =useState([]);
  const [courseStatus,setCourseStatus] = useState('all');
  const [loadingStatus,setLoading] = useState(false);
  const [courseDatails,setCourseDetail] = useState([]);


  const getData=async (status)=> {
    setLoading(true);
      header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
      let response;
      if (status=='all') {
         response=await api.get('user/course/get',{headers:header});
      }else{
        response=await api.get('user/course_detail/get',{headers:header});
      }
      for (let i = 0; i < response.data.length; i++) {
        if (response.data[i].image!=null) {
          response.data[i].image='http://127.0.0.1:8000/storage/courseImage/'+response.data[i].image;
        }else{
          response.data[i].image='http://127.0.0.1:8000/image/default.jpg';
        }
      }
      setLoading(false);
      setCourse(response.data);
  }

  const CourseDetailList =async ()=>{
    header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
    const response=await api.get('user/course_detail/get',{headers:header});
    if (response.data) {
        setCourseDetail(response.data);
    }
  }

  const ChangeStatus = (status)=>{
    setCourseStatus(status);
    getData(status);
  }


  useEffect(()=>{
    getData('all');
    CourseDetailList();
  },[])


    return(
        <section className="course">
        <div className="d-flex py-3 justify-content-between">
          <h3>Course</h3>
          {
            courseStatus == 'all' ? (
                <button className="btn btn-primary" onClick={()=>ChangeStatus('myCourse')}>My Courses</button>
            ) : (
                <button className="btn btn-primary" onClick={()=>ChangeStatus('all')}>All Courses</button>
            )
          }
        </div>
        <div className="hr"></div>
        {
              loadingStatus==true ? (
                  <div className="py-3 d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
              ) : (null)
          }
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
                        <div className="d-flex justify-content-center gap-2 p-2">
                        {
                            courseDatails.map((courseDatail)=> 
                                courseDatail.course_id==course.id ? (
                                    <button className="btn btn-success" key={courseDatail.id}>Enrolled</button>
                                ) : (
                                    null
                                )
                            )
                        }
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