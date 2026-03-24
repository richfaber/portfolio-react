import { Outlet } from 'react-router-dom'
import style from "./Blank.module.scss"

export default function Blank() {

  return (<>

    <div className={style.blank}>
      <Outlet />
    </div>
  </>)

}