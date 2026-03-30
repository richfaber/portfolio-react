import { useQuery, useMutation } from '@tanstack/react-query'
import { useState } from 'react'

export default function TanStack() {

  const [read, setRead] = useState(false)
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn() {
      return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
    },
    select(data) {
      return data.filter(item => item.completed)
    },
    enabled: read
  })

  const postMutation = useMutation({

    mutationFn(data) {

      return fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res => res.json())

    }

  })

  const patchMutation = useMutation({

    mutationFn({ id, ...data }) {

      return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      }).then(res => res.json())

    }

  })

  const deleteMutation = useMutation({

    mutationFn(id) {

      return fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      }).then(res => res.json())

    }

  })

  let postMessage = <p>post 대기</p>
  if (postMutation.isPending) postMessage = <p>로딩중...</p>
  if (postMutation.isSuccess) postMessage = <p>성공</p>

  let patchMessage = <p>patch 대기</p>
  if (patchMutation.isPending) patchMessage = <p>로딩중...</p>
  if (patchMutation.isSuccess) patchMessage = <p>성공</p>

  let deleteMessage = <p>delete 대기</p>
  if (deleteMutation.isPending) deleteMessage = <p>로딩중...</p>
  if (deleteMutation.isSuccess) deleteMessage = <p>성공</p>

  return (
    <>
      <div style={{ height: '100px', overflow: 'auto', background: 'white' }}>
        {
          !read ? (<p>대기</p>) : isLoading ? (<p>로딩중...</p>) : data?.map(item => (<li key={item.id}>{item.title}</li>))
        }
      </div>

      <p><button type="button" onClick={() => setRead(true)}>GET버튼</button></p>
      
      <hr /><hr /><hr /><hr />

      <div style={{ height: '30px', overflow: 'auto', background: 'pink' }}>
        {
          postMessage
        }
      </div>
      <p><button type="button" onClick={() => postMutation.mutate({ title: '새 할일', completed: false })}>POST버튼</button></p>

      <hr /><hr /><hr /><hr />

      <div style={{ height: '30px', overflow: 'auto', background: 'green' }}>
        {
          patchMessage
        }
      </div>      
      <p><button type="button" onClick={() => patchMutation.mutate({ id: 1, title: '수정된 할일' })}>PATCH버튼</button></p>

      <hr /><hr /><hr /><hr />

      <div style={{ height: '30px', overflow: 'auto', background: 'black', color: 'white' }}>
        {
          deleteMessage
        }
      </div>      
      <p><button type="button" onClick={() => deleteMutation.mutate(1)}>DELETE버튼</button></p>
    </>
  )

}