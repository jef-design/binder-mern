import React,{useState} from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axiosInstance from '../services/axiosInstance'
import { Link } from 'react-router-dom'
import { UserCircleIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import useDebounce from '../hooks/useDebounce';

const Search = () => {
    const [term, setTerm] = useState('')
    const queryClient = useQueryClient()
    const debounceValue = useDebounce(term)

    const {data: dataSearch, isLoading} = useQuery({
        queryKey: ['search', debounceValue],
        queryFn: fetchSearch,
            enabled: debounceValue !== '', // Fetch data only when searchTerm is not empty
    })

    async function fetchSearch(){
       return axiosInstance.get(`/api/binder/search?term=${debounceValue}`).then(res => res.data)
    }
    const searchHandler = (e) => {
        setTerm(e.target.value)
        queryClient.invalidateQueries(['search', debounceValue])
        // if( term && term.length > 0 && term !== ''){
        //     queryClient.invalidateQueries(['search', term])
        //     refetch()
        // }else{
        //     queryClient.cancelQueries(['search', term]);
         
        // }   
    }

  return (
    <div className=' bg-white p-2 rounded-md shadow-sm mb-5 dark:bg-dark-main dark:text-white duration-300 ease-in-out'>
        <div className=' border w-full flex items-center px-1 overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#3a3b3c] dark:border-none'>
        <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
            <input value={term} className='px-3 py-1 bg-transparent text-gray-700 outline-none w-full dark:bg-[#3a3b3c]' type="text" onChange={searchHandler} placeholder='Search Binder' />
        </div>
        {dataSearch?.length == 0 && (<div className=' mt-2'>No results found for "{term}"</div>)}
        <div className=' p-1 mt-3 z-10'>
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