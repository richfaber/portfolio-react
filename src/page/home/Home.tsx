
import { Link } from "react-router-dom"
import style from "./Home.module.scss"

export default function Home() {

  return (
    <>
      <p className={style.pink}>Home</p>
      <Link to="/">루트로</Link>
    </>
  )
  
}