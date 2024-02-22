import { useEffect, useState } from "react";
import { api, header } from "../../api/api";
import { NavLink } from "react-router-dom";

function Blog(){

  const [blogs,setBlog]=useState([]);

  const getBlog=async ()=>{
    header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
    const response=await api.get('user/home/blog',{headers:header});
    setBlog(response.data.data)
  }

  useEffect(()=>{
    getBlog();
  },[])

    return(
        <section className="blog">
        <div className="d-flex justify-content-between">
            <h3>Blog</h3>
            <NavLink to={'/blog'}>See More &gt;&gt;&gt;</NavLink>
        </div>
        <div className="hr"></div>
        <div className="row blog-container py-3">
            {
              blogs.length!=0 ? (
                blogs.map((blog)=>
                <div className=" col-md-3" key={blog.id}>
                  <div className="border border-white shadow rounded p-3">
                    <h5 className=" text-center">{blog.name}</h5>
                    <p className="">{blog.description.slice(0,100)+'...'}</p>
                    <NavLink to={`/blog/details/${blog.id}`}>
                        <button className="btn btn-primary"><i className="fa-solid fa-eye"></i></button>
                    </NavLink>
                  </div>
              </div>
                )
              ) : (
                <h1>There is no Blog</h1>
              )
            }
        </div>
    </section>
    );
}

export default Blog