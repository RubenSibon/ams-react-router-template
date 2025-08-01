import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Contact from "./Contact";

describe("Contact", () => {
  it("renders the component", () => {
    const { container } = render(<Contact />);

    expect(container.firstChild).toBeDefined();
  });

  it("has the expected content", () => {
    const { container } = render(<Contact />);

    expect(container.textContent).toEqual("Contact");
  });
});
