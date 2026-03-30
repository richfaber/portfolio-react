import { create } from 'zustand'

type Item = {
  id: number
  name: string
  price: number
  quantity: number
}

type CartStore = {
  availItems: Item[]
  bagItems: Item[]
  addItem: (item: Item) => void
  setAvailItems: (items: Item[]) => void
  removeItem: (id: number) => void
  increaseQty: (id: number) => void
  decreaseQty: (id: number) => void
}

export const useCartStore = create<CartStore>((set, get) => ({
  availItems: [],
  bagItems: [],

  setAvailItems(items) {
    set({ availItems: items })
  },

  addItem(item) {

    const curItem = get().bagItems.find((curItem) => curItem.id === item.id)

    if (curItem) {
      get().increaseQty(item.id)
      return
    }

    set((state) => ({ bagItems: [...state.bagItems, { ...item, quantity: 1 }] }))

  },

  removeItem(id) {

    set((state) => ({
      bagItems: state.bagItems.filter((item) => item.id !== id)
    }))

  },

  increaseQty(id) {

    set((state) => {

      return {

        bagItems: state.bagItems.map((curItem) => {

          if (curItem.id === id) {

            return {
              ...curItem, quantity: curItem.quantity + 1
            }

          }

          return curItem
        })

      }

    })

  },

  decreaseQty(id) {

    const curItem = get().bagItems.find((item) => item.id === id)

    if (curItem.quantity <= 1) {

      get().removeItem(id)
      return

    }

    set((state) => {

      return {

        bagItems: state.bagItems.map((item) => {

          if (item.id === id) {

            return { ...item, quantity: item.quantity - 1 }

          }

          return item

        })

      }

    })
  }

}))