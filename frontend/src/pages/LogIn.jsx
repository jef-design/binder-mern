import React, {useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useStore from '../services/useStore'
import {TailSpin} from "react-loader-spinner";
import axiosInstance from '../services/axiosInstance'

const LogIn = () => {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const {user,setLogInUser} = useStore()
    console.log(error)

    const logIn = async (User) => {
        const response = await axiosInstance.post('/api/binder/login', User);
        return response.data; // Return the newly created post
      };
      
    const {mutate, isLoading} = useMutation({
        mutationFn: logIn,
        mutationKey: ['login'],
        onSuccess: (User) => {
            setLogInUser(User)
            navigate('/')
        },
        onError: (errorResponse)=>{
            setError(errorResponse.response.data)
            console.log(errorResponse.response.data)
          
        }
    })
    const submitHandler = (e) => {
        e.preventDefault()
        const User = {email,password}
        mutate(User)
    }
  return (
    <div className=' max-w-[458px] w-full mt-9 mx-auto border rounded-md p-5 bg-white'>
        <div>
            <h3 className=' text-center font-bold text-lg'>Sign in to Binder</h3>
            {/* <p>Connect to your binder and share thoughts</p> */}
        </div>
        <form onSubmit={submitHandler}>
            <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input className='border p-2 my-2' onChange={(e) => {setEmail(e.target.value)}} type="text" />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <input className='border p-2 my-2' onChange={(e) => {setPassword(e.target.value)}} type="text" />
            </div>
            <button style={{opacity: isLoading && '0.5'}} className='flex gap-2 items-center justify-center p-2 bg-gray-900 text-white text-center mt-2 rounded-sm w-full'>
                {isLoading ? 'Signing in' : 'Sign in '}
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
        </form>
        {error && (<div className=' text-center p-1 border text-red-600 border-red-600 bg-red-100 text-sm my-2'>{error.error}</div>)}
        <Link className=' text-sm underline' to={`http://localhost:5173/signup`}>Sign up here</Link>
    </div>
  )
}

export default LogIn
