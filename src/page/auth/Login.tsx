import { useRef, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom"

// import style from "./Login.module.scss"

import { useAuth } from "@/context/AuthContext"

export default function Login() {

  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, generateOAuth } = useAuth()

  const idRef = useRef(null)
  const pwRef = useRef(null)
  const [errorMsg, setErrorMsg] = useState(null)

  function onSubmit(e) {

    e.preventDefault()

    const id = idRef.current.value
    const pw = pwRef.current.value
    const from = location.state?.from?.pathname || '/'
    
    let validateMsg = ''

    if (!id) validateMsg += '아이디가 없습니다. '
    if (!pw) validateMsg += '비밀번호가 없습니다. '

    if(validateMsg) {

      setErrorMsg(validateMsg)

    } else {

      signIn({ id, pw }).then(res => {

        navigate(from, { replace: true })

      }).catch(errorMsg => {

        setErrorMsg(errorMsg)

      })
      
    }
    
  }


  return (
    <>
      <h2>로그인</h2>
      <form onSubmit={onSubmit}>
        <fieldset>

          <legend>로그인폼</legend>
          <input ref={ idRef } type="text" placeholder="admin" />
          <input ref={ pwRef } type="password" placeholder="1234" />

          <button type="submit">로그인</button>

          { errorMsg &&
            <p className="errorMsg">{ errorMsg }</p>
          }
        </fieldset>

      </form>

      <p><button type="button" onClick={ () => generateOAuth('google') }>OAuth 구글</button></p>

    </>
  )

}