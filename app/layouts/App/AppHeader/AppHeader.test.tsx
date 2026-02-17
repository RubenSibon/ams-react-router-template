import { BrowserRouter } from "react-router";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AppHeader from "./AppHeader";

describe("AppHeader", () => {
  it("renders the component", () => {
    const { container } = render(
      <BrowserRouter>
        <AppHeader />
      </BrowserRouter>,
    );

    expect(container.firstChild).toBeDefined();
  });
});
