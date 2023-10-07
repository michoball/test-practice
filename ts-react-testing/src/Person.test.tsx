import React from "react";
import { render, screen } from "@testing-library/react";
import { Person } from "./Person";

test("renders learn react link", () => {
  render(<Person name="Jack" />);
  // const divElement = screen.getByText(/name is Jack/i);
  const divElement = screen.getByRole("contentinfo");
  expect(divElement).toHaveTextContent(/Name is jack/i);
  expect(divElement).toHaveAttribute("role", "contentinfo");
});
