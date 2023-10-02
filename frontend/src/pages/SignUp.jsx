import React, {useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useStore from '../services/useStore'
import {TailSpin} from "react-loader-spinner";
import axiosInstance from '../services/axiosInstance'

const SignUp = () => {

    const [username, setUsername] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {setLogInUser} = useStore()

    const signInHandler = async (User) => {
        const response = await axiosInstance.post('/api/binder/signup', User);
        console.log(response)
        return response.data;
      };
      
    const {mutate, isError, isLoading} = useMutation({
        mutationFn: signInHandler,
        mutationKey: ['signin'],
        onSuccess: (User) => {
            console.log(User)
            setLogInUser(User)
            navigate('/')
        },
        onError: (errorResponse)=> {
            setError(errorResponse?.response?.data)
        }
    })
    const submitHandler = (e) => {
        e.preventDefault()
        const User = {username,name,email,password}
        mutate(User)
    }
  return (
    <div className=' max-w-[458px] w-full mt-9 mx-auto border rounded-md p-5 bg-white'>
        <div>
            <h3 className=' text-center font-bold text-lg'>Register to Binder</h3>
        </div>
        <form onSubmit={submitHandler}>
        <div className='flex flex-col mb-2'>
        <div className='flex flex-col mb-2'>
                <label htmlFor="username">Username</label>
                <input style={{border: isError && '1px solid red'}} value={username} className='border p-2 mt-2' onChange={(e) => {setUsername(e.target.value)}} type="text" />
            </div>
                <label htmlFor="name">Name</label>
                <input style={{border: isError && '1px solid red'}} value={name} className='border p-2 mt-2' onChange={(e) => {setName(e.target.value)}} type="text" />
                {/* {isError &&(<span className=' text-xs text-red-600'>Field is required</span>)} */}
            </div>
            <div className='flex flex-col mb-2'>
                <label htmlFor="email">Email</label>
                <input style={{border: isError && '1px solid red'}} value={email} className='border p-2 mt-2' onChange={(e) => {setEmail(e.target.value)}} type="email" />
            </div>
            <div className='flex flex-col mb-2'>
                <label htmlFor="password">Password</label>
                <input style={{border: isError && '1px solid red'}} value={password} className='border p-2 mt-2' onChange={(e) => {setPassword(e.target.value)}} type="password" />
            </div>
           < button style={{opacity: isLoading && '0.5'}} className='flex gap-2 items-center justify-center p-2 bg-gray-900 text-white text-center mt-2 rounded-sm w-full'>
                {isLoading ? 'Registering' : 'Register '}
                {isLoading && (<TailSpin
                        height={25}
                        width={25}
                        color="#0b536d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="oval-loading"
                        secondaryColor="#0b536d"
                        strokeWidth={4}
                        strokeWidthSecondary={4}
                    />)}
            </button>
            {error && (<div className=' text-center p-1 border text-red-600 border-red-600 bg-red-100 text-sm my-2'>{error.error}</div>)}
        </form>
        Already have account? sign in <Link to={`http://localhost:5173/login`}>here</Link>
    </div>
  )
}

export default SignUp
