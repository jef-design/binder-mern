import React from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";


const ImageModal = ({modalOpen,handleCloseModal,imageUrl}) => {
  return (
    <div style={{display: modalOpen ? 'block' : 'none'}} className='fixed z-10 top-0 left-0 flex items-center justify-center accent-gray-500/100 h-screen w-screen'>
      <div onClick={handleCloseModal}  className='flex justify-center items-center w-screen h-screen fixed bottom-0 left-0 right-0 top-0 bg-black'></div>
        <div className='h-full flex items-center justify-center'>
            <img className='relative max-w-[900px] w-full' src={imageUrl} alt="" />
        </div>
        <div className='absolute right-9 top-3'>
        <XMarkIcon onClick={handleCloseModal} className="h-10 w-10 text-white cursor-pointer" />
        </div>
    </div>
  )
}

export default ImageModal