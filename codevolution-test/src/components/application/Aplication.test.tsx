import { render, screen } from '@testing-library/react'
import { Application } from './Application'

describe('Application', () => {
  test('renders correctly', () => {
    render(<Application />)

    // getByRole의 옵션을 줘서 같은 role을 가진 것들을 구분할 수 있다.
    // option 값이 될 수 있는 것들 1.form element의 label, 2. button의 text값, 3. aria-label값 등등
    const pageHeading = screen.getByRole('heading', {
      level: 1,
    })
    expect(pageHeading).toBeInTheDocument()

    const sectionHeading = screen.getByRole('heading', {
      level: 2,
    })
    expect(sectionHeading).toBeInTheDocument()

    // text로 test
    const paragraphEl = screen.getByText('All fields are mandatory')
    // 다른 방식들
    // const paragraphEl = screen.getByText(/All fields are mandatory/i);
    // const paragraphEl = screen.getByText((text) => text.startsWith("All"));
    expect(paragraphEl).toBeInTheDocument()

    // title 값으로 test
    const closeEl = screen.getByTitle('close')
    expect(closeEl).toBeInTheDocument()

    // img를 test하려면 alt로
    const imgEl = screen.getByAltText('a person with a laptop')
    expect(imgEl).toBeInTheDocument()

    // data-testid 속성으로 test하기
    const customEl = screen.getByTestId('custom-element')
    expect(customEl).toBeInTheDocument()

    const nameEl = screen.getByRole('textbox', {
      name: 'Name',
    })
    expect(nameEl).toBeInTheDocument()
    // 다른 방법으로 name input 가져오기
    // 똑같은 label text 를 가지는 요소가 있을 수 있으니 selector로 어떤 tag인지 명확히할 수 있음
    const nameEl2 = screen.getByLabelText('Name', {
      selector: 'input',
    })
    expect(nameEl2).toBeInTheDocument()

    const nameEl3 = screen.getByPlaceholderText('Fullname')
    expect(nameEl3).toBeInTheDocument()

    const nameEl4 = screen.getByDisplayValue('Vishwas')
    expect(nameEl4).toBeInTheDocument()

    const bioEl = screen.getByRole('textbox', {
      name: 'Bio',
    })
    expect(bioEl).toBeInTheDocument()

    const jobLocationEl = screen.getByRole('combobox')
    expect(jobLocationEl).toBeInTheDocument()

    const termsEl = screen.getByRole('checkbox')
    expect(termsEl).toBeInTheDocument()

    const termsEl2 = screen.getByLabelText(
      'I agree to the terms and conditions'
    )
    expect(termsEl2).toBeInTheDocument()

    const submitButtonEl = screen.getByRole('button')
    expect(submitButtonEl).toBeInTheDocument()
    // eslint-plugin-jest-dom 을 install하면 다음과 같은 맞지않은 쿼리 문을 걸러준다
    // expect(submitButtonEl).not.toBeEnabled();  --> toBeDisabled() 로 하면 됨
    // "lint": "eslint --ignore-path .gitignore .", 이와 같은 명령어를 package의 script에 추가하고
    // npm run lint 를 하면 eslint 가 틀린 부분을 찾아서 터미널에서 알려준다.
  })
})

// test를 위한 쿼리 문을 어떤 순서로 쓰는 것이 좋을까?
// 1. getByRole
// 2. getByLabelText
// 3. getByPlaceholderText
// 4. getByText
// 5. getByDisplayValue
// 위 5개면 거의 커버 가능 안되면 코드를 확인 그래도 안되면 밑에 요소
// 6. getByAltText
// 7. getByTitle
// 8. getByTestId
