import  { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {

    const emailRef = useRef()
    const passwordRef = useRef()

    //ERROR
    const [errors, setErrors] = useState(null);

    const { setUser, setToken } = useStateContext()

    const onSubmit = (en) => {
        en.preventDefault();
        en.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,

        }
        setErrors(null);
        // console.log(payload);
        axiosClient.post('/login', payload)
            .then(({ data }) => {
                setUser(data.user)
                setToken(data.token)
            }).catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                    // console.log(response.data.errors);
                    if(response.data.errors) {
                        setErrors(response.data.errors);
                    }else{
                        setErrors({ 
                            email: [response.data.message]
                        });
                    }
                    
                }
            })
    }

    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <form action="" onSubmit={onSubmit}>
                    <h1 className='title'>
                        Login into your Account
                    </h1>
                    {
                        errors && <div className='alert'>
                            {Object.keys(errors).map(key => (
                                <p key={key}> {errors[key][0]} </p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type="email" placeholder='Email' />
                    <input ref={passwordRef} type="password" placeholder='Password' />
                    <button className='btn btn-block'>
                        Login
                    </button>
                    <p className='message'>
                        Not Registered ? <Link to='/signup'>Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login