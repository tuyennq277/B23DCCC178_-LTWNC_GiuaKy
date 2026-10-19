import { configureStore, type Middleware } from '@reduxjs/toolkit'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import booksReducer, { borrowBook, setWarning } from '../features/books/booksSlice'

const borrowingLimitMiddleware: Middleware<{}, { books: ReturnType<typeof booksReducer> }> =
  (store) => (next) => (action) => {
    if (borrowBook.match(action)) {
      const { books } = store.getState()
      const book = books.items.find((item) => item.id === action.payload)
      if (book && book.available > 0 && !books.borrowedIds.includes(book.id) && books.borrowedIds.length >= 3) {
        store.dispatch(setWarning('Bạn chỉ có thể mượn tối đa 3 cuốn sách cùng lúc.'))
        return action
      }
    }
    return next(action)
  }

export const store = configureStore({
  reducer: { books: booksReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(borrowingLimitMiddleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
