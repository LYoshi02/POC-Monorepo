import { render, screen } from "@testing-library/react";
import { HttpResponse, http } from "msw";

import { Users } from "./Users";
import { server } from "../../test/server/server";

describe("Users", () => {
  test("renders correctly", () => {
    render(<Users />);
    const textElement = screen.getByText("Users");
    expect(textElement).toBeInTheDocument();
  });

  test("renders a list of users", async () => {
    render(<Users />);

    const users = await screen.findAllByRole("listitem");

    expect(users).toHaveLength(2);
  });

  test("renders error", async () => {
    server.use(
      http.get("https://jsonplaceholder.typicode.com/users", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    render(<Users />);

    const error = await screen.findByText("Error fetching users");

    expect(error).toBeInTheDocument();
  });
});
