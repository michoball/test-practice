import React from "react";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { APIComponent } from "./APIComponents";
import { rest } from "msw";

const server = setupServer(
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ name: "jack" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("gets the data", async () => {
  render(<APIComponent />);

  const out = await waitFor(() => screen.getByRole("contentinfo"));

  expect(out).toHaveTextContent("Name is jack");
});
