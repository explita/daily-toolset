import React, { useId } from "react";
import { FormRadioButton } from "../input.type";
import { RadioGroupItem } from "../ui/radio-group";

export function RadioButton({ isDisabled, value, label }: FormRadioButton) {
  const id = useId();

  return (
    <div className="explita-radio-group-button">
      <RadioGroupItem value={value} id={id} disabled={isDisabled} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
