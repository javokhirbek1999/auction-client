import React, {useEffect} from 'react';
import axiosInstance from '../axios/login';
import { useNavigate } from 'react-router-dom';


export default function SignOut() {
    const history = useNavigate();

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        axiosInstance.defaults.headers['Authorization'] = null;
        history('/login');
        window.location.reload();
    });
    return <div>Logout</div>
}