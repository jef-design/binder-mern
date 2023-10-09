import React, {useState} from 'react'
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import {Link, useNavigate} from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useStore from '../services/useStore'
import {TailSpin} from "react-loader-spinner";
import axiosInstance from '../services/axiosInstance'
import useDebounce from '../hooks/useDebounce';

const LogIn = () => {
    const [credentials, setCredentials] = useState({
        email: '', password: ''
    })
    const debouncedEmail = useDebounce(credentials.email);
    const debouncedPassword = useDebounce(credentials.password);

    const [visible, setVisible] = useState('password')
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
        const User = {email: debouncedEmail, password: debouncedPassword}
        mutate(User)
    }
    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(event)
        setCredentials({
          ...credentials,
          [name]: value,
        });
      };
  return (
    <div className=' max-w-[458px] w-full mt-9 mx-auto border rounded-md p-5 bg-white'>
        <div>
            <h3 className=' text-center font-bold text-lg'>Sign in to Binder</h3>
       
        </div>
        <form onSubmit={submitHandler}>
            <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input  name="email" className='border p-2 my-2' value={credentials.email} onChange={handleChange} type="text" />
            </div>
            <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <div  className='border my-2 flex items-center'>
                <input  name="password" className='p-2 w-full outline-none' value={credentials.password} onChange={handleChange} type={visible} />
                 {visible === 'password' && (<EyeSlashIcon onClick={()=> setVisible('text')} className="h-6 w-6 text-gray-500 mr-1" />)}
                 {visible === 'text' && <EyeIcon onClick={()=> setVisible('password')} className="h-6 w-6 text-gray-500 mr-1" />}
                </div>
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
        
        <div className="mt-3 text-sm">
        <Link className=' text-sm underline' to={import.meta.env.PROD ? import.meta.env.VITE_CLIENT_BASE_URL : import.meta.env.VITE_DEV_CLIENT_BASE_URL + '/signup'}>Sign up here</Link>
        </div>
        
    </div>
  )
}

export default LogIn
