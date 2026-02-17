import { BrowserRouter } from "react-router";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AppFooter from "./AppFooter";

describe("AppFooter", () => {
  it("renders the component", () => {
    const { container } = render(
      <BrowserRouter>
        <AppFooter />
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeDefined();
  });
});
