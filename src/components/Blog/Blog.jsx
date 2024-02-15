import { useEffect, useState } from "react";
import { api, header } from "../../api/api";
import { NavLink } from "react-router-dom";

function Blog(){

  const [blogs, setBlog] = useState([]);
  const [loadingStatus,setLoading] = useState(false);
  
  const getData = async ()=>{
    setLoading(true);
    header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
    const response = await api.get('user/blog/get',{headers:header});
    if (response.data) {
      setBlog(response.data);
      setLoading(false);
    }

  }

  useEffect(()=>{
    getData();
  },[]);

    return(
        <section className="blog">
          <div className="py-2">
              <h3>Blog</h3>
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
          <div className="row blog-container py-5">
            {
              blogs.length!=0 ? (
                blogs.map((blog)=>
                <div className=" col-md-3" key={blog.id}>
                  <div className="border border-white shadow rounded p-3">
                    <h5 className=" text-center">{blog.name}</h5>
                    <p className="">{blog.description.slice(0,100)+'...'}</p>
                    <div className="d-flex justify-content-end">
                      <NavLink to={`/blog/details/${blog.id}`}>
                        <button className="btn btn-primary"><i className="fa-solid fa-eye"></i></button>
                      </NavLink>
                    </div>
                  </div>
              </div>
                )
              ): (<h1 className="text-danger">There is no Blogs !!!!!!</h1>)
            }
          </div>
    </section>
    );
}

export default Blog