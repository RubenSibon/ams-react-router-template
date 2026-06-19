import { MemoryRouter } from "react-router";

import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Contact from "./Contact";

describe("Contact", () => {
  it("renders the component", () => {
    const { container } = render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>,
    );

    expect(container.firstChild).toBeDefined();
  });
});
