import App from "./App";

import { render, screen } from "@testing-library/react";

it("renders Vite heading", () => {
  render(<App />);

  const viteHeading = screen.getByRole("heading", { name: /vite/i });

  expect(viteHeading).toBeInTheDocument();
});
