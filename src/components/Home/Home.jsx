import Cover from './Cover';
import Blog from './Blog';
import Course from './Course';
import Member from './Member';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';

function Home(){
    const [token,setToken] = useState('null');
    const getToken=async()=>{
        await setToken(JSON.parse(localStorage.getItem('token')));
    }

    useEffect(()=>{
        getToken();
    },[])

    return(
        <div>
            {
                token!='null' ? (
                    <div>
                        <Cover></Cover>
                        <Blog></Blog>
                        <Course></Course>
                        <Member></Member>
                        
                    </div>
                ): (null)
            }
        </div>
    );
}

export default Home;