import React from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { useColorMode } from "@chakra-ui/react";

import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

const DatePicker = ({
  isClearable = false,
  showPopperArrow = false,
  ...rest
}: ReactDatePickerProps) => {
  const isLight = useColorMode().colorMode === "light";

  return (
    <div className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker
        autoComplete={"off"}
        isClearable={isClearable}
        showPopperArrow={showPopperArrow}
        className="react-datepicker__input-text"
        {...rest}
      />
    </div>
  );
};

export default DatePicker;
