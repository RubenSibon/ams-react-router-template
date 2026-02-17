import { BrowserRouter } from "react-router";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("renders the component", () => {
    const { container } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeDefined();
  });
});
