
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import $ from 'jquery';
import Popper from 'popper.js';
import { useEffect } from 'react';
import axiosClient from '../axios-client';

const DefaultLayout = () => {

    const {user,token, setUser, setToken} = useStateContext();

    if(!token) {
        return <Navigate to='/login'/>
    }

    const onLogout = (ev) => {
        ev.preventDefault();    
        axiosClient.post('/logout')
        .then( () => {
            setUser({})
            setToken(null)
        })
    }

    useEffect( ( ) => {
        axiosClient.get('/user')
        .then( ({data}) => {
            setUser(data)
        })
    })



  return (
    <div id='defaultLayout'>
        <aside>
            <Link to='/dashboard'>Dashboard</Link>
            <Link to='/users'>Users</Link>
        </aside>
        <div className='content'>
            <header>
                <div>Header</div>
                <div>
                    {user.name}
                    <a href="/logout" onClick={onLogout} className='btn-logout'>Logout</a>
                </div>
            </header>
            <main>
            <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default DefaultLayout