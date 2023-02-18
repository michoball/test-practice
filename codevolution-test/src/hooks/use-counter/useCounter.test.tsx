import { renderHook, act } from '@testing-library/react'
import { useCounter } from './useCounter'

describe('useCounter', () => {
  test('should render the initial count', () => {
    // custom hook은 jsx를 반환하지 않기때문에 render 로는 test를 할 수 없다.
    // 대산 renderHook을 쓰고 반환된 result로 test를 한다.
    // renderHook은 들어온 hook을 invoke하고 나온 결과를 object로 반환한다.
    // 그중 result는 hook의 실행 결과 값을 가지고 있다.
    const { result } = renderHook(useCounter)
    expect(result.current.count).toBe(0)
  })

  test('should accept and render the same initial count', () => {
    // hook이 초기 props를 가진다면 option에서 설정해서 넣어주고 test를 할 수 있다.
    const { result } = renderHook(useCounter, {
      initialProps: {
        initialCount: 10,
      },
    })
    expect(result.current.count).toBe(10)
  })

  test('should increment the count', () => {
    const { result } = renderHook(useCounter)
    //act 를 사용해서 act안의 update 가 완료된 경우를 test하게 해줘야함 -> state update나 fetching
    // 그렇지 않으면 다음과 같은 increment 는 실행된 값이 test에 반영되지 않는다.
    act(() => result.current.increment())
    expect(result.current.count).toBe(1)
  })

  test('should decrement the count', () => {
    const { result } = renderHook(useCounter)
    act(() => result.current.decrement())
    expect(result.current.count).toBe(-1)
  })
})
