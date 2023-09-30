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

function App() {

  const user = useStore((state) => state.user)

  return (
    <div className=''>
     <BrowserRouter>
        <Header/>
        {/* <main className='grid grid-cols-3 gap-2 mt-3 relative'>
        <AsideMenu /> */}
        {/* {window.location.pathname !== '/login' && <AsideMenu />} */}
        <Routes>
          <Route path='/' element={user ? <Home/> : <Navigate to={'/login'} />} />
          <Route path='/profile/:userID' element={user ? <ProfileScreeen/> : <Navigate to={'/login'} />} />
          <Route path='/signup' element={!user ? <SignUp /> : <Navigate to={'/'} />} />
          <Route path='/login' element={!user ? <LogIn /> : <Navigate to={'/'} />} />
          <Route path='/settings' element={<SettingsScreen/>} />
          
        </Routes>
        {/* </main> */}
     </BrowserRouter>
    </div>
  )
}

export default App
