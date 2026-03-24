import { useLocation } from 'react-router-dom'

import style from './Error.module.scss'

export default function Error() {

  const { state } = useLocation()

  return (
    <div className={ style.error }>
      <h1>오류 발생</h1>
      <p>{ state?.message }</p>
    </div>
  )

}