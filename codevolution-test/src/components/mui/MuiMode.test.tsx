// import { render, screen } from "@testing-library/react";
// import { AppProviders } from "../../providers/AppProviders";
// import { MuiMode } from "./MuiMode";

// describe("MuiMode", () => {
//   test("renders text correctly", () => {
//     render(<MuiMode />, {
//       // MuiMode 컴포넌트는 appProvider로 감싸져 있어야 제대로 작동되는 컴포넌트
//       // test에서도 AppProvider로 감싸야 제대로 test를 할 수 있다.
//       wrapper: AppProviders,
//       // 매 test마다 이렇게 wrapper를 넣을 수 없으니 testing library.com에 가면
//       // frameworks-> react testing library -> setup의 custom render를 보고 test.utils.tsx를 만들어
//       // 전체 적용을 해보자
//     });
//     const headingEl = screen.getByRole("heading");
//     expect(headingEl).toHaveTextContent(/dark mode/i);
//   });
// });

// test-utils 를 따로 만들어 AppProvider가 감싸진 상태로 render 되도록 만듬
import { render, screen } from '../../test-utils'
import { MuiMode } from './MuiMode'

describe('MuiMode', () => {
  test('renders text correctly', () => {
    // 이제 여기 위 처럼 wrapper option을 설정할 필요가 없다.
    render(<MuiMode />)
    const headingEl = screen.getByRole('heading')
    expect(headingEl).toHaveTextContent(/dark mode/i)
  })
})
