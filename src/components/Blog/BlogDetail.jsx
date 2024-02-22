import { useEffect, useState } from "react";
import { api, header } from "../../api/api";
import { useParams } from "react-router";
import { NavLink } from "react-router-dom";

function BlogDetail(){
    const [blog,setBlog] = useState({});
    const [loadingStatus,setLoading] = useState(false);
    const [commentLoadingStatus,setCMLoading] = useState(false);
    const [comments,setComments] = useState([]);
    const [commentsAlert,setCommentsAlert] = useState(false);
    const [userComment,setUserComment] = useState('');
    const [image,setImage] = useState(null);
    const [replyId,setReplyId] = useState(null);
    const [userId,setUserId] =useState(null);


    const {id} = useParams();

    const getData = async () =>{
        setLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response = await api.get(`user/blog/detail/${id}`,{headers:header});
        if (response.data) {
            setLoading(false);
            setBlog(response.data.blog);
            setUserId(response.data.user_id);
        }
    }

    const changeCommentimage =(data)=>{
        for (let i = 0; i < data.length; i++) {
            if (data[i].image!=null) {
              data[i].image='http://127.0.0.1:8000/storage/commentImage/'+data[i].image;
            }
          }
        setComments(data);
    }

    const getComment = async () =>{
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response = await api.get(`user/comment/get/${id}`,{headers:header});
        if (response.data) {
            changeCommentimage(response.data);
            setComments(response.data);
        }
    }

    const sendComment = async () =>{
        if (userComment !='' || image != null) {
            setCMLoading(true);
            setCommentsAlert(false);
            const data={
                'lesson_id':id,
                'content':userComment,
                'image':image,
                'reply_id':null,
            };
            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            const response = await api.post(`user/comment/send`,data,{headers:header});
            if (response.data) {
                setCMLoading(false);
                changeCommentimage(response.data);
                setComments(response.data);
            }
        }else{
            setCommentsAlert(true);
        }
    }

    const reply= (e,reply_id)=>{
        setReplyId(reply_id);
        const input=e.parentElement.nextSibling;
        input.classList.toggle('display-none');
    }

    const seeMore= (e)=>{
        const input=e.parentElement.nextSibling;
        input.classList.toggle('display-none');
    }

    const sendReply=async ()=>{
        if (userComment !='' || image != null) {
            setCMLoading(true);
            setCommentsAlert(false);
            const data={
                'lesson_id':id,
                'content':userComment,
                'image':image,
                'reply_id':replyId,
            };
            header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
            const response = await api.post(`user/comment/send`,data,{headers:header});
            if (response.data) {
                setCMLoading(false);
                changeCommentimage(response.data);
                setComments(response.data);
            }
        }else{
            setCommentsAlert(true);
        }
    }

    const deleteComment = async (comment_id)=>{
        setCMLoading(true);
        header.Authorization='Bearer '+JSON.parse(localStorage.getItem('token'));
        const response = await api.get(`user/comment/delete/${comment_id}/${id}`,{headers:header});
        if (response.data) {
            setCMLoading(false);
            changeCommentimage(response.data);
            setComments(response.data);
        }
    }

    useEffect(()=>{
        getData();
        getComment();
    },[]);

    return (
        <div className="p-5">
          <div className="p-2">
              <h3>Blog</h3>
          </div>
          <div className="hr"></div>
          {
              loadingStatus===true ? (
                  <div className="py-3 d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                      </div>
                  </div>
              ) : (null)
          }
            <div className="p-5">
                <NavLink to={'/blog'}>
                    Back
                </NavLink>
            </div>
            <div className="row py-3">
                {
                    blog!={} ? (
                        <div className="col-md-8 offset-md-2 p-3 border border-black shadow rounded">
                            <h3>{blog.name}</h3>
                            <p className="p-3">{blog.description}</p>
                            {
                                blog.vd_link != null ? (
                                    <div className="d-flex justify-content-center">
                                        <iframe className="w-100" height="315" src={blog.vd_link} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                                    </div>
                                ): (null)
                            }
                        </div>
                    ) : (null)
                }
            </div>
            <div className="row py-3">
                <div className="col-md-8 offset-md-2 p-3 border border-black shadow rounded">
                    <h3>Comment</h3>
                    {
                        commentLoadingStatus==true ? (
                            <div className="py-3 d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (null)
                    }
                    {
                        commentsAlert==true ? (
                            <div className="alert alert-danger" role="alert">
                                Comment or Image must be filled.
                            </div>
                        ) : (null)
                    }
                    <div className="row gap-2 p-3">
                        <input type="text" onChange={(e)=>setUserComment(e.target.value)} className="col-sm form-control" placeholder="Enter your comment"/>
                        <input type="file" className="col-sm" onChange={(e)=>setImage(e.target.files[0])}/>
                        <button className="btn btn-primary col-sm" onClick={()=>sendComment()}>Send</button>
                    </div>
                    <div>

                        {
                            comments.map((comment)=>
                                    comment.reply_id ==null ? (
                                        <div className="py-2" key={comment.id}>
                                            <div className="p-3 border border-black shadow rounded">
                                                <h5>{comment.user_name}</h5>
                                                <p>{comment.content}</p>
                                                {
                                                    comment.image != null ? (
                                                        <div className="d-flex justify-content-end py-2">
                                                            <span onClick={(e)=>seeMore(e.target)}>See More &gt;&gt;&gt;</span>
                                                        </div>
                                                    ) : (null)
                                                }
                                                {
                                                    comment.image !=null ? (
                                                        <div className="comment-image display-none">
                                                            <img src={comment.image} className="w-100 img-thumbnail rounded" alt="" />
                                                        </div>
                                                    ) : (null)
                                                }

                                                {
                                                    comments.map((rpComment)=>
                                                        rpComment.reply_id != null ? (
                                                            rpComment.reply_id == comment.id ? (
                                                                <div className="py-2" key={rpComment.id}>
                                                                    <div className="p-3 border border-black shadow rounded">
                                                                        <h5>{rpComment.user_name}</h5>
                                                                        <p>{rpComment.content}</p>
                                                                        {
                                                                            rpComment.image != null ? (
                                                                                <div className="d-flex justify-content-end py-2">
                                                                                    <span onClick={(e)=>seeMore(e.target)}>See More &gt;&gt;&gt;</span>
                                                                                </div>
                                                                            ) : (null)
                                                                        }            
                                                                        {
                                                                            rpComment.image !=null ? (
                                                                                <div className="comment-image display-none">
                                                                                    <img src={rpComment.image} className="w-100 img-thumbnail rounded" alt="" />
                                                                                </div>
                                                                            ) : (null)
                                                                        }
                                                                    </div>
                                                                </div>  
                                                            ) : (null)
                                                        ) : (null)
                                                    )
                                                }
            
                                                <div className="d-flex justify-content-end gap-2 py-2">
                                                    <button className="btn btn-primary" onClick={(e)=>reply(e.target,comment.id)}>Reply</button>
                                                    {
                                                        comment.user_id==userId ? (
                                                            <button className="btn btn-danger" onClick={(e)=>deleteComment(comment.id)}>Delete</button>
                                                        ) : (null)

                                                    }
                                                </div>
            
                                                <div className="row gap-2 p-3 display-none" >
                                                    <input type="text" onChange={(e)=>setUserComment(e.target.value)} className="col-sm form-control" placeholder="Enter your comment"/>
                                                    <input type="file" className="col-sm" onChange={(e)=>setImage(e.target.files[0])}/>
                                                    <button className="btn btn-primary col-sm" onClick={()=>sendReply()}>Send</button>
                                                </div>
            
            
                                            </div>
                                        </div>
                                    ) : (null)
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BlogDetail