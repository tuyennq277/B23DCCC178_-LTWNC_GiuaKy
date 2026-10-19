import { act, renderHook } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => jest.useFakeTimers())
  afterEach(() => jest.useRealTimers())

  test('chỉ cập nhật giá trị sau 300ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), { initialProps: { value: 'sách' } })
    rerender({ value: 'sách mới' })
    expect(result.current).toBe('sách')
    act(() => { jest.advanceTimersByTime(299) })
    expect(result.current).toBe('sách')
    act(() => { jest.advanceTimersByTime(1) })
    expect(result.current).toBe('sách mới')
  })
})
