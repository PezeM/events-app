import React from "react";
import { render } from "../test-utils";
import { EventForm } from "./EventForm";
import { act, fireEvent, screen } from "@testing-library/react";

describe("EventForm", () => {
  beforeEach(async () => {
    render(<EventForm />);
  });

  it("renders without crashing", () => {});

  it("should display required error when submitting empty form", async () => {
    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("form-error-message")).toHaveLength(4);
  });

  it("should display error when inputting invalid email", async () => {
    fireEvent.input(screen.getByLabelText("Email"), {
      target: {
        value: "email@invalid",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(
      await screen.findByText("Entered value does not match email format")
    ).toBeVisible();
  });

  it("should be able to input values and display correct values", () => {
    const fields = [
      {
        labelText: "First name",
        value: "Adam",
      },
      {
        labelText: "Last name",
        value: "DVVAS",
      },
      {
        labelText: "Email",
        value: "email@gmail.com",
      },
      {
        labelText: "Event date",
        value: `${Date.now()}`,
      },
    ];

    for (const field of fields) {
      fireEvent.input(screen.getByLabelText(field.labelText), {
        target: {
          value: field.value,
        },
      });
    }

    for (const field of fields) {
      expect(
        (screen.getByLabelText(field.labelText) as HTMLInputElement).value
      ).toBe(field.value);
    }
  });

  it("should display minimum length error on short name", async () => {
    fireEvent.input(screen.getByLabelText("First name"), {
      target: {
        value: "a",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findByText("Minimum length should be 3")).toBeVisible();
  });

  it("should display maximum length error on long name", async () => {
    fireEvent.input(screen.getByLabelText("First name"), {
      target: {
        value:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(
      await screen.findByText("Maximum length should be 30")
    ).toBeVisible();
  });

  it("should not display error when values are correct", async () => {
    const fields = [
      {
        labelText: "First name",
        value: "Adam",
      },
      {
        labelText: "Last name",
        value: "DVVAS",
      },
      {
        labelText: "Email",
        value: "email@gmail.com",
      },
      {
        labelText: "Event date",
        placeholderText: "Click to select date",
        value: `${new Date()}`,
      },
    ];

    for (const field of fields) {
      const element = field.placeholderText
        ? screen.getByPlaceholderText(field.placeholderText)
        : screen.getByLabelText(field.labelText);

      fireEvent.input(element, {
        target: {
          value: field.value,
        },
      });
    }

    await act(async () => {
      await fireEvent.submit(screen.getByRole("button"));
    });

    expect(screen.queryAllByRole("form-error-message")).toHaveLength(0);
  });
});
