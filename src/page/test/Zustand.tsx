
import { useCartStore } from '@/store/cartStore'
import { useEffect } from 'react'

export default function Zustand() {

  const { availItems, bagItems, setAvailItems, addItem, removeItem, increaseQty, decreaseQty } = useCartStore()

  const totalPrice = bagItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  useEffect(() => {

    setAvailItems([

      {
        id: 1,
        name: '상품명1',
        price: 1000,
        quantity: 5
      },
      {
        id: 2,
        name: '상품명2',
        price: 5000,
        quantity: 1
      },
      {
        id: 3,
        name: '상품명3',
        price: 10000,
        quantity: 3
      },

    ])

  }, [])

  const handler = {

    add(item) {

      setAvailItems(availItems.map((curItem) => curItem.id === item.id ? { ...curItem, quantity: curItem.quantity - 1 } : curItem))
      addItem(item)

    },

    remove(item) {

      setAvailItems(availItems.map((curItem) => curItem.id === item.id ? { ...curItem, quantity: curItem.quantity + item.quantity } : curItem ))
      removeItem(item.id)

    },

    increase(item) {

      setAvailItems(availItems.map((curItem) => curItem.id === item.id ? { ...curItem, quantity: curItem.quantity - 1 } : curItem))
      increaseQty(item.id)

    },

    decrease(item) {

      setAvailItems(availItems.map((curItem) => curItem.id === item.id ? { ...curItem, quantity: curItem.quantity + 1 } : curItem))
      decreaseQty(item.id)

    }

  }

  return (
    <>

      <h2>상품목록</h2>
      <ul>
        {
          availItems.map((item) => {

            return (

              <li key={item.id}>

                <span>{item.id}</span>
                <span>{item.name}</span>
                <span>{item.price}</span>
                <span>잔고: {item.quantity}</span>

                <button type="button" onClick={handler.add.bind(null, item)} disabled={ item.quantity <= 0 }>+ 담기</button>

              </li>

            )

          })
        }

      </ul>

      <h2>장바구니</h2>
      <ul>
        {
          bagItems.map((item) => {

            return (

              <li key={item.id}>

                <span>{item.id}</span>
                <span>{item.name}</span>
                <span>{item.price}</span>
                <span>수량: {item.quantity}</span>

                <button type="button" onClick={handler.increase.bind(null, item)} disabled={ availItems.find((curItem) => curItem.id === item.id)?.quantity <= 0}>+ 더담기</button>
                <button type="button" onClick={handler.decrease.bind(null, item)}>- 빼기</button>
                <button type="button" onClick={handler.remove.bind(null, item)}>x 삭제</button>

              </li>

            )

          })
        }

      </ul>

      <p>총합 : {totalPrice}</p>

    </>
  )

}