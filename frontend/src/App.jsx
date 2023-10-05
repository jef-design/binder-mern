import { useState, useEffect } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Header from './layouts/Header'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import ProfileDetails from './pages/ProfileDetails'
import useStore from './services/useStore'
import AsideMenu from './layouts/AsideMenu'
import ProfileScreeen from './pages/ProfileScreen'
import SettingsScreen from './pages/SettingsScreen'
import FriendsScreeen from './pages/FriendsScreen'
//
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import MobileMenu from './layouts/MobileMenu'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


function App() {

  const user = useStore((state) => state.user)
  const [themes, setTheme] = useState('light')

  useEffect(() => {
    if(themes=== 'dark'){
      document.documentElement.classList.add("dark")
    }else{
      document.documentElement.classList.remove("dark")
    }
  
  }, [themes])
  
  const toggleTheme = () => {
    setTheme(themes === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className=''>
     <BrowserRouter>
        <Header toggleTheme={toggleTheme} themes={themes} />
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to={'/login'} />} />
          <Route path='/profile/:userID' element={user ? <ProfileScreeen/> : <Navigate to={'/login'} />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to={'/'} />} />
          <Route path='/login' element={!user ? <LogIn /> : <Navigate to={'/'} />} />
          <Route path='/friends' element={user ? <FriendsScreeen/> : <Navigate to={'/login'} />} />
          <Route path='/settings' element={user ? <SettingsScreen/> : <Navigate to={'/login'} />} />
        </Routes>
        <MobileMenu/>
     </BrowserRouter>
    </div>
  )
}

export default App
