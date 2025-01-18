import { FormRadioButton } from "../../input.type";
import { RadioGroupItem } from "../../components/ui/radio-group";
import { useId } from "react";

export function RadioButton({ isDisabled, value, label }: FormRadioButton) {
  const id = useId();

  return (
    <div className="explita-radio-group-button">
      <RadioGroupItem value={value} id={id} disabled={isDisabled} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
