import React, {useState} from 'react'
import {TailSpin} from "react-loader-spinner";
import useStore from '../services/useStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../services/axiosInstance'

const EditProfileModal = ({currentUserLogId,status,modalCloseHandler}) => {
    const queryClient = useQueryClient()
    const {user} = useStore()
   
    const [username, setUsername] = useState(user.username)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [bio, setBio] = useState('')
    const [error, setError] = useState('')

    const dataUpdate = {username, name, email, bio}
    const {mutate, isLoading} = useMutation({
        mutationFn: (dataUpdate) => axiosInstance.patch(`/api/binder/user/${currentUserLogId}`, dataUpdate).then(res => res.data),
        onSuccess: (dataUpdate) => {
            console.log(dataUpdate)
            queryClient.invalidateQueries("userinfo", currentUserLogId)
            modalCloseHandler(false)
        }
    })


    const updateHandler = (e) => {
        e.preventDefault()
        mutate(dataUpdate)
    }

    return (
       <div style={{display: status ? 'flex' : 'none'}} className='fixed z-10 top-0 left-0 flex items-center justify-center accent-gray-500/100 h-screen w-screen'>
        <div onClick={modalCloseHandler}  className='flex justify-center items-center w-screen h-screen fixed bottom-0 left-0 right-0 top-0 bg-black bg-opacity-60'></div>
         <div className=" rounded-sm mb-3 border-b p-2 max-w-[500px] w-full bg-white
         absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className=' font-bold text-lg'>Edit Profile</h3>
            <form className='mt-4'>
                <div className="flex flex-col mb-2">
                    <div className="flex flex-col mb-2">
                        <label htmlFor="username">Username</label>
                        <input
                            value={username}
                            className="border p-2 mt-2"
                            onChange={e => {
                                setUsername(e.target.value);
                            }}
                            type="text"
                        />
                    </div>
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        className="border p-2 mt-2"
                        onChange={e => {
                            setName(e.target.value);
                        }}
                        type="text"
                    />
                    {/* {isError &&(<span className=' text-xs text-red-600'>Field is required</span>)} */}
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        className="border p-2 mt-2"
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        type="text"
                    />
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="bio">Bio</label>
                    <input
                        value={bio}
                        className="border p-2 mt-2"
                        onChange={e => {
                            setBio(e.target.value);
                        }}
                        type="text"
                        placeholder='Add Bio'
                    />
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        className="border p-2 mt-2"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        type="text"
                    />
                </div>
                <button
                    onClick={updateHandler}
                    style={{opacity: isLoading && "0.5"}}
                    className="flex gap-2 items-center justify-center p-2 bg-gray-900 text-white text-center mt-2 rounded-sm w-full"
                >
                    {isLoading ? "Saving" : "Save "}
                    {isLoading && (
                        <TailSpin
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
                        />
                    )}
                </button>
                {error && (
                    <div className=" text-center p-1 border text-red-600 border-red-600 bg-red-100 text-sm my-2">
                        {error.error}
                    </div>
                )}
            </form>
        </div>
        
       </div>
    );
};

export default EditProfileModal;
