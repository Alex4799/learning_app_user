import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { api, header } from "../../api/api";
import { NavLink } from "react-router-dom";

function CourseCategory(){
    const {id} =useParams();
    const [course,setCourse] = useState({});
    const [courseCategories,setCourseCategory] =useState([]);
    const [loadingStatus,setLoading] =useState(false);

    const getCourse = async() => {
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get(`user/course/get/${id}`,{headers:header});
        if (response.data) {
            setCourse(response.data);
            setLoading(false);
        }
    }

    const getCourseCategories = async () =>{
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get(`user/course/category/get/${id}`,{headers:header});
        if (response.data) {
            setCourseCategory(response.data);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getCourse();
        getCourseCategories();
    },[]);

    
    return(
        <div>
        <h1 className="py-2"><NavLink to={'/course'}>Course</NavLink> / <NavLink to={`/course/detail/${id}`}>View Course</NavLink> / Course Category List</h1>
        <div className="py-2">
            <h2 className="py-2 text-center">{course.name}</h2>
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
                {
                    courseCategories.map((courseCategory)=>
                        <div className="col-md-3 p-3" key={courseCategory.id}>
                            <div className="bag-white shadow rounded p-2 text-center">
                                <h6 className="py-2">ID - {courseCategory.id}</h6>
                                <h6 className="py-2">Name - {courseCategory.name}</h6>
                                <h6 className="py-2">Lesson - {courseCategory.lesson_count}</h6>
                                <div  className="py-2 d-flex justify-content-around">
                                    <NavLink to={`/lesson/${courseCategory.id}`} className="btn btn-secondary"><i className="fa-solid fa-eye"></i></NavLink>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
    )
}

export default CourseCategory