import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom";
import { api, header } from "../../api/api";

function LessonList(){

    const [lessons,setLesson] = useState([]);
    const [CourseCategory,setCourseCategory] = useState({});
    const [loadingStatus,setLoading] = useState(false);
    const {id} =useParams();

    const getData = async ()=>{
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response=await api.get(`user/course/category/view/${id}`,{headers:header});
        if (response.data) {
            setLesson(response.data.lesson);
            setCourseCategory(response.data.courseCategory);
            setLoading(false);
        }
    }

    useEffect(()=>{
        getData();
    },[])


    return (
        <div>
            <h1 className="py-2"><NavLink to={`/course/category/${id}`}>Course Category</NavLink> / Lesson List</h1>
            <h3 className="py-3">{CourseCategory.name}</h3>
            {
              loadingStatus==true ? (
                  <div className="py-3 d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
              ) : (null)
            }
            <div className="d-flex justify-content-around py-3">
                <h2>Total - {lessons.length}</h2>
            </div>
            <div className="p-2 ">
                {
                    lessons.length !=0 ? (
                        lessons.map((lesson)=>
                        <NavLink to={`/lesson/view/${CourseCategory.id}/${lesson.id}`} key={lesson.name}>
                            <div className="bag-white p-3 border border-black rounded shadow">
                                {lesson.name}
                            </div>
                        </NavLink>
                        )
                    ) : (null)
                }
            </div>
        </div>
    )

}

export default LessonList