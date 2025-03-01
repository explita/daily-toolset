import React from "react";
import { FormCheckBox } from "../input.type";
import { Checkbox as BaseCheckbox } from "../ui/checkbox";
import { useId } from "react";

export function Checkbox({
  isChecked = false,
  isDisabled,
  handleCheck,
  label,
}: FormCheckBox) {
  const id = useId();

  return (
    <div className="explita-checkbox-root">
      <BaseCheckbox
        id={id}
        disabled={isDisabled}
        checked={isChecked}
        onCheckedChange={handleCheck ? handleCheck : undefined}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  );
}
