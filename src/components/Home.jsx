import Cover from '../components/Home/Cover';
import Blog from '../components/Home/Blog';
import Course from '../components/Home/Course';
import Member from '../components/Home/Member';
import { useEffect, useState } from 'react';

function Home(){

    const [token,setToken]=useState('');
    
    function getToken() {
        setToken(localStorage.getItem('token'));
        console.log(token);
    }

    useEffect(()=>{
        getToken()
    })

    return(
        <div>
            <Cover></Cover>
            <Blog></Blog>
            <Course></Course>
            <Member></Member>
        </div>
    );
}

export default Home;