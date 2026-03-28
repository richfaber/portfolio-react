import Button from '@/component/Button'
import style from '@/component/Button.module.scss'

export default function ButtonPage() {

  return (
    <>
      <Button type="submit" className={ style.빨간색 }>버튼컴포넌트</Button>
      <Button type="submit" className={ style.노란색 }>버튼컴포넌트</Button>
    </>
  )
  
}