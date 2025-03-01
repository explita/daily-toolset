"use client";

import React, { useId, useState } from "react";
import { Switch as BaseSwitch } from "../ui/switch";
import { Label } from "./FormLabel";
import { FormCheckBox } from "../input.type";

export function Switch({
  isChecked = false,
  value,
  name,
  label,
  handleCheck,
}: FormCheckBox) {
  const [checked, setChecked] = useState(isChecked);

  const id = useId();

  function handleCheckChange(checked: boolean) {
    setChecked(checked);
    handleCheck && handleCheck(checked);
  }

  return (
    <div className="explita-switch-toggle-root">
      <BaseSwitch
        id={id}
        value={checked ? value : ""}
        defaultChecked={checked}
        name={name}
        onCheckedChange={handleCheckChange}
      />
      <Label id={id} label={label} />
    </div>
  );
}
