import { useLocation, useNavigate } from "react-router-dom"

import style from "./Login.module.scss"

import { useAuth } from "@/context/AuthContext"
import { signIn } from "@/lib/auth"

export default function Login() {

  const navigate = useNavigate()
  const location = useLocation()
  const { refresh } = useAuth()

  async function onSubmit(e) {

    if (e) e.preventDefault()

    const from = location.state?.from?.pathname || '/'

    signIn()
    refresh()
    navigate(from, { replace: true })

  }

  return (
    <>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <fieldset>

          <legend>로그인폼</legend>
          <input type="text" defaultValue="1234" placeholder="로그인 아이디 입력" />
          <input type="password" defaultValue="1234" placeholder="비밀번호 입력" />

          <button type="submit">로그인</button>

        </fieldset>

      </form>
    </>
  )

}