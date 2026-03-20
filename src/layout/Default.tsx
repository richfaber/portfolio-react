import { useNavigate, Outlet } from 'react-router-dom'
import style from "./Default.module.scss"

import { useAuth } from '@/context/AuthContext'

export default function Default() {

  const { isAuthenticated, signOut } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    navigate('/')
  }

  return (<>

    { 
      isAuthenticated && (
        <button type="button" onClick={handleSignOut}>로그아웃</button>
      )
    }

    <div className={style.default}>
      <Outlet />
    </div>
  </>)

}