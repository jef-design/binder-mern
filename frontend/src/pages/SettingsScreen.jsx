import React,{useState} from "react";
import useStore from "../services/useStore";
import AsideMenu from "../layouts/AsideMenu";
import AlertDialog from "../components/AlertDialog";
import {useMutation} from '@tanstack/react-query'
import axiosInstance from '../services/axiosInstance'

const SettingsScreen = () => {
    const {user, logOutUser} = useStore()
    const [open, setOpen] = useState(false);
    const userId = user._id

    const {mutate} = useMutation({
        mutationKey: ['deleteuser'],
        mutationFn: () => axiosInstance.delete(`/api/binder/user/${userId}`).then(res => res.data),
        onSuccess: ()=> {
            axiosInstance.post("/api/binder/logout").then(res => res.data);
            setOpen(false);
            logOutUser()
        }
    })
    const deleteHandler = () => {
        mutate(userId);
    };
 
    // const logOutHandler = () => {
    //     axiosInstance.post("/api/binder/logout").then(res => res.data);
       
    // };
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
   
    return (
        <main className='relative mt-3'>
            <AsideMenu/>
            <div className="max-w-[680px] w-full h-full mx-auto col-span-2 bg-white px-4 py-2 rounded-sm">
                <h2 className=" font-bold text-lg">Manage Account</h2>
                <div className=" mt-3">
                    <p className=" font-[600]">Name</p>
                    <span>{user.name}</span>
                </div>
                <div className=" mt-3">
                    <p className=" font-[600]">Email</p>
                    <span>{user.email}</span>
                </div>
                <div onClick={handleClickOpen} className="mt-4 p-2 border inline-block rounded-sm text-red-400 cursor-pointer">
                    Delete Account Permanently
                </div>
                <AlertDialog deleteHandler={deleteHandler} open={open} handleClose={handleClose} />
            </div>
          
        </main>
    );
};

export default SettingsScreen;
