import React from "react";
import { render } from "../test-utils";
import { InputField } from "./InputField";
import { screen } from "@testing-library/react";

describe("InputField", () => {
  const inputMockProps = {
    name: "firstName",
    label: "First name",
    type: "text",
    error: undefined,
    validationOptions: {},
    register: jest.fn(),
  };

  it("renders without crashing", () => {
    render(<InputField {...inputMockProps} />);
  });

  it("should be invalid with errors", () => {
    const props = {
      ...inputMockProps,
      error: { message: "Field is required" },
    };

    render(<InputField {...props} />);

    expect(screen.getByRole("textbox")).toBeInvalid();
  });

  it("should render correct placeholder text", () => {
    render(<InputField {...inputMockProps} />);

    expect(screen.queryByPlaceholderText("First name")).toBeInTheDocument();

    const newPlaceholderText = "New placeholder";
    const props = {
      ...inputMockProps,
      placeholder: newPlaceholderText,
    };

    render(<InputField {...props} />);

    expect(
      screen.queryByPlaceholderText(newPlaceholderText)
    ).toBeInTheDocument();
  });

  it("should show valid icon when field is valid", () => {
    const props = {
      ...inputMockProps,
      isFieldValid: true,
    };

    render(<InputField {...props} />);

    expect(screen.getByTestId("check-icon")).toBeInTheDocument();
  });
});
