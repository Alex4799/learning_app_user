import { useEffect, useState } from "react"
import { api, header } from "../../api/api";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

function CourseDetail(){

    const [course,setCourse]=useState({});
    const [courseCategories,setCourseCategory]=useState([]);
    const [loadingStatus,setLoading] = useState(false);
    const [courseState,setCourseStatus] = useState(false);
    const [detailId,setDetailId] = useState('null');

    const {id} = useParams();

    const getData=async ()=>{
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get(`user/course/detail/${id}`,{headers:header});
        if (response.data) {
            setLoading(false);
            if (response.data.course.image!=null) {
                response.data.course.image='http://127.0.0.1:8000/storage/courseImage/'+response.data.course.image;
            }else{
                response.data.course.image='http://127.0.0.1:8000/image/default.jpg';
            }
            setCourse(response.data.course);
            setCourseCategory(response.data.courseCategory);
        }
    }

    const checkCourse = async () =>{
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get(`user/course_detail/check/${id}`,{headers:header});
        if (response.data) {
            setDetailId(response.data.courseDetail);
            setCourseStatus(response.data.status);
        }
    }

    useEffect(()=>{
        getData();
        checkCourse();
    },[]);

    return(
        <div>
        <h1 className="py-2"><NavLink to={'/course'}>Course</NavLink> / View Course</h1>
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
            <div className="col-md-8 offset-md-2 border border-black rounded p-3">
                <div className="row">

                    <div className="col-md-4 py-2">
                    <img src={course.image} className="w-100 img-thumbnail" alt="course image" />
                    </div>
                    <div className="col-md-8 py-2">
                            <h3 className="py-2">{course.name}</h3>
                            <div className="d-flex gap-1">
                                {
                                    courseState!=false ? (
                                        courseState != 'pending' ? (
                                            <NavLink to={`/course/category/${id}`} className="py-2 btn btn-secondary">{course.course_category_count} Course Category</NavLink>
                                        ) : (
                                            <button className="py-2 btn btn-secondary">{course.course_category_count} Course Category</button>
                                        )
                                    ) : (
                                        <button className="py-2 btn btn-secondary">{course.course_category_count} Course Category</button>
                                    )
                                }
                                <a href="#" className="py-2 btn btn-secondary">{course.lesson_count} Lesson Count</a>
                                <a href="#" className="py-2 btn btn-secondary">{course.course_fee} MMK</a>
                                </div>
                            <p className="p-3 text-justify">{course.description}</p>
                            <div className="py-2">
                                {
                                    courseCategories.map((courseCategory)=>
                                        <div className="py-2" key={courseCategory.id}>
                                            {
                                                courseState!= false ? (
                                                    courseState!='pending' ? (
                                                        <span className="w-100">
                                                            <NavLink to={`/lesson/${courseCategory.id}`}>
                                                                <div className="py-2 bg-secondary rounded shadow d-flex justify-content-around">
                                                                    <h6>{courseCategory.name}</h6>
                                                                    <input type="checkbox" className="rounded" name="" id="" />
                                                                </div>
                                                            </NavLink>
                                                        </span>
                                                    ) : (
                                                        <span className="w-100">
                                                            <div className="py-2 bg-secondary rounded shadow d-flex justify-content-around">
                                                                <h6>{courseCategory.name}</h6>
                                                                <input type="checkbox" className="rounded" name="" id="" />
                                                            </div>
                                                        </span>
                                                    )
                                                ) : (
                                                    <span className="w-100">
                                                        <div className="py-2 bg-secondary rounded shadow d-flex justify-content-around">
                                                            <h6>{courseCategory.name}</h6>
                                                            <input type="checkbox" className="rounded" name="" id="" />
                                                        </div>
                                                    </span>
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                            <div  className="d-flex gap-1">
                                {
                                    courseState==false ? (
                                        <NavLink to={`/course/enroll/${id}/25/${detailId}`} className="py-2 btn btn-secondary">Enroll</NavLink>
                                    ) : courseState!='100%' ? (
                                        <NavLink to={`/course/enroll/${id}/${courseState}/${detailId}`} className="py-2 btn btn-success">Fee {courseState}% Complete</NavLink>
                                    ) : (
                                        <button className="py-2 btn btn-success">Fee {courseState} Complete</button>
                                    )
                                }
                                

                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )

}

export default CourseDetail