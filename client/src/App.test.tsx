import React from "react";
import { render } from "./test-utils";
import { App } from "./App";
import { screen } from "@testing-library/react";

describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });

  it("renders Add new event header text", () => {
    render(<App />);
    expect(screen.getByText("Add new event")).toBeInTheDocument();
  });
});