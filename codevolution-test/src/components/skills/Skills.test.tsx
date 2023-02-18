import { render, screen, logRoles } from '@testing-library/react'
import { Skills } from './Skills'

describe('Skills', () => {
  const skills = ['HTML', 'CSS', 'JavasScript']

  test('renders correctly', () => {
    render(<Skills skills={skills} />)

    // list 역할인 애들이 화면에 보여지는지 test
    const listEl = screen.getByRole('list')
    expect(listEl).toBeInTheDocument()
  })

  // all 을 쓸때는 length로 다 보여지는지 test
  test('render a list of skills', () => {
    render(<Skills skills={skills} />)
    const listItemEls = screen.getAllByRole('listitem')
    expect(listItemEls).toHaveLength(skills.length)
  })

  test('renders login button', () => {
    render(<Skills skills={skills} />)
    const loginButton = screen.getByRole('button', {
      name: 'Login',
    })
    expect(loginButton).toBeInTheDocument()
  })

  test('Start Learning button is not rendered', () => {
    render(<Skills skills={skills} />)
    // 여기서 getByRole은 사용할 수 없다 - Start learning은 dom에 존재하지 x 때문
    // queryBy => 맞는 노드가 없으면 null을 반환 , 없는 값을  test할 때 유용 , 1개이상 찾을시 error
    // queryAllBy => 조건에 맞는 노드 전부 반환, 없으면 빈 [] 반환
    const startLearningButton = screen.queryByRole('button', {
      name: 'Start learning',
    })
    expect(startLearningButton).not.toBeInTheDocument()
  })

  test('Start Learning button is eventually displayed', async () => {
    // logRoles를 사용하여 test 상에서 component의 모습을 볼 수 있다.
    const view = render(<Skills skills={skills} />)
    logRoles(view.container)
    // useEffect를 쓴 상황 일정 시간이 지난후 화면에 대한 test에는 findBy를 쓴다.
    // findBy => 조건에 맞는 ele을 찾으면 Promise 반환, 설정 시간(기본 1초) 안에 조건에 맞는 값을 찾지 못하면 Promise rejected됨
    // findAllBy => 위와 동일하나 배열을 반환한다.
    // debug로 감싸면 감싼 부분의 test 변화를 볼 수 있다.
    // screen.debug();
    const startLearningButton = await screen.findByRole(
      'button',
      {
        name: 'Start learning',
      },
      {
        // 기본 시간 1초를 바꾸는 option
        timeout: 2000,
      }
    )
    // screen.debug();
    expect(startLearningButton).toBeInTheDocument()
  })
})
