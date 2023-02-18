import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useAPI } from "./useAPI";
import { renderHook } from "@testing-library/react-hooks";

const server = setupServer(
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ name: "Jack" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should increment", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAPI());

  await waitForNextUpdate();

  expect(result.current).toEqual({ name: "Jack" });
});
