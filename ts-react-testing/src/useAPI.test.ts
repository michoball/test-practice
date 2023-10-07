import { renderHook, act } from "@testing-library/react-hooks";

import { setupServer } from "msw/node";
import { rest } from "msw";
import { useAPI } from "./useAPI";

const server = setupServer(
  rest.get("/api", (req, res, ctx) => {
    return res(ctx.json({ name: "jack" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("should get api data", async () => {
  const { result, waitForNextUpdate } = renderHook(() => useAPI());

  await waitForNextUpdate();

  expect(result.current).toEqual({ name: "jack" });
});
