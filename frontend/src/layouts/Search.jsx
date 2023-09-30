import React,{useState} from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../services/axiosInstance'
import { Link } from 'react-router-dom'
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Search = () => {
    const [term, setTerm] = useState('')
    const queryClient = useQueryClient()
    const {data: dataSearch, isLoading} = useQuery({
        queryKey: ['search', term],
        queryFn: fetchSearch,
            enabled: term !== '', // Fetch data only when searchTerm is not empty
      
        
  
    })

    async function fetchSearch(){
       return axiosInstance.get(`/api/binder/search?term=${term}`).then(res => res.data)
    }
    const searchHandler = (e) => {
        setTerm(e.target.value)
        queryClient.invalidateQueries(['search', term])
        // if( term && term.length > 0 && term !== ''){
        //     queryClient.invalidateQueries(['search', term])
        //     refetch()
        // }else{
        //     queryClient.cancelQueries(['search', term]);
         
        // }   
    }
    console.log(dataSearch)
  return (
    <div className=' bg-white p-2 rounded-md shadow-sm mb-5'>
        <div>
            <input value={term} className='px-3 py-1 border w-full rounded-sm' type="text" onChange={searchHandler} placeholder='Search Binder' />
        </div>
        {dataSearch?.length == 0 && (<div className=' mt-2'>No results found for "{term}"</div>)}
        <div className=' p-1 mt-3'>
            {dataSearch && dataSearch.map((user) => {
                return(
                    <Link to={`/profile/${user._id}`} className=' flex mb-2 gap-4 items-center' key={user._id}>
                        {!user.profile_image?.url && (<UserCircleIcon className="h-9 w-9 text-gray-500" />)}
                        {user.profile_image && <img className='h-[40px] w-[40px] rounded-full border' src={user?.profile_image?.url} alt={user.name} />}
                        <span>{user.name}</span>
                    </Link>
                )
            })}
        </div>
    </div>
  )
}

export default Search