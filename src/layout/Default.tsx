import { useNavigate, Outlet } from 'react-router-dom'
import style from "./Default.module.scss"

import { useAuth } from '@/context/AuthContext'
import { signOut } from '@/lib/auth'

export default function Default() {

  const { isAuthenticated, refresh } = useAuth()
  const navigate = useNavigate()

  function handleSignOut() {
    signOut()
    refresh()
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