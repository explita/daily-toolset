import React from "react";

type Props = {
  id?: string;
  label?: React.ReactNode;
  isRequired?: boolean;
};

export function Label({ id, label, isRequired }: Props) {
  if (!label) return null;

  return (
    <label className="input-label" htmlFor={id} data-required={isRequired}>
      {label}
    </label>
  );
}
