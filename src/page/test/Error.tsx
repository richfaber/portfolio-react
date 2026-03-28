import { useState } from 'react'
import { useErrorBoundary, ErrorBoundary } from 'react-error-boundary'

// 강제발생 예제로 never 타입추가
function BrokenComponent():never {
  throw new Error('라우트 에러 바운드리 에서 캡춰, 렌더링중 에러 발생')
}

// 에러바운드리 캡처
function LocalFallback({ error, resetErrorBoundary }) {
  return (
    <div>
      <p>페이지 안에서 처리된 에러: { error.message }</p>
      <button onClick={ resetErrorBoundary }>다시 시도</button>
    </div>
  )
}

function LocalErrorSection() {

  const { showBoundary } = useErrorBoundary()

  function handleManualError() {
    try {
      throw new Error('에러를 상위로 전파하지 않고, 페이지 내에서 처리')
    } catch(e) {
      showBoundary(e)
    }
  }

  return (
    <>
      <p><button onClick={ handleManualError }>에러를 상위로 전파하지 않고, 페이지 내에서 처리</button></p>
    </>
  )
}

export default function TestError() {

  const [ crash, setCrash ] = useState(false)
  const { showBoundary } = useErrorBoundary()

  function handleManualError() {
    try {

      throw new Error('이벤트 핸들러 에러는 라우터 에러 바운드리가 수신하지 못한다.직접 발생사켜야 한다.')

    } catch(e) {

      showBoundary(e)

    }
  }

  return(
    <>

      <p><button onClick={ () => setCrash(true) }>렌더링 에러 발생</button></p>
      { crash && <BrokenComponent /> }

      <hr />

      <p><button onClick={ handleManualError }>이벤트 핸들러 에러 발생</button></p>

      <hr />

      {/* 페이지 안에서 에러를 처리 - 상위로 전파 안됨 */}
      <ErrorBoundary FallbackComponent={ LocalFallback }>
        <LocalErrorSection />
      </ErrorBoundary>

    </>
  )

}