import React, {useState} from 'react'
import {TailSpin} from "react-loader-spinner";
import useStore from '../services/useStore';

const EditProfileModal = ({status,modalCloseHandler}) => {
    const {user} = useStore()
   
    const [username, setUsername] = useState(user.username)
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const isLoading = ''
    return (
       <div  onClick={modalCloseHandler} style={{display: status ? 'block' : ''}} className='relative hidden'>
        <div  className='w-screen h-screen -50 fixed left-0 right-0 top-0
         flex items-center justify-center bg-black bg-opacity-60'>
         <div className=" rounded-sm mb-3 border-b p-2 max-w-[500px] w-full bg-white z-10">
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
       </div>
    );
};

export default EditProfileModal;
