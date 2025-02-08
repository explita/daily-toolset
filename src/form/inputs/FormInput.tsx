"use client";

import { useId, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "../../components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Label } from "./FormLabel";
import { LuCheck, LuX } from "react-icons/lu";
import { InputError } from "./InputError";
import { DateInput } from "./FormDateInput";
import { useForm } from "../../react/snippets/formProvider";
import { FormInputProps } from "../../input.type";

export function FormInput(props: FormInputProps) {
  const {
    isRequired = true,
    isDisabled = false,
    label,
    type = "text",
    name,
    error,
    defaultValue,
    onChange,
    showError = true,
    leftSection,
    className = "",
    ...rest
  } = props;

  const { formValues, formErrors, setValue, validateValue } = useForm();

  const id = useId();

  const errorData = error
    ? error
    : name && name in formErrors
    ? (formErrors as { [key: string]: any })?.[name] || ""
    : "";

  const inputValue = defaultValue
    ? defaultValue
    : name && name in formValues
    ? (formValues as { [key: string]: any })[name] ?? ""
    : "";

  return (
    <div className="explita-input-root">
      <Label id={id} label={label} isRequired={isRequired} />
      <div>
        {leftSection && <span className="left-section">{leftSection}</span>}
        {/* {isClearable && value && !isDisabled && (
          <Clear onClick={() => handleChange(undefined)} />
        )} */}
        <Input
          id={id}
          name={name}
          type={type}
          disabled={isDisabled}
          defaultValue={inputValue}
          data-error={errorData.length > 0}
          onChange={
            onChange
              ? onChange
              : async (e) => {
                  setValue(name, e.target.value);
                  await validateValue(name, e.target.value);
                }
          }
          className={`${leftSection ? "has-left-section" : ""} ${className}`}
          {...rest}
        />
      </div>
      <InputError message={errorData} />
    </div>
  );
}

type PasswordProps = FormInputProps & {
  minLength?: number;
  showRequirements?: boolean;
};

FormInput.Password = function Password({
  minLength = 6,
  showRequirements = true,
  ...props
}: PasswordProps) {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  // const strength = getStrength(value);
  // const color =
  //   strength === 100
  //     ? "bg-teal-500"
  //     : strength > 50
  //     ? "bg-yellow-500"
  //     : "bg-red-500";

  return (
    <Popover open={popoverOpened} onOpenChange={setPopoverOpened}>
      <PopoverTrigger
        onFocusCapture={() => setPopoverOpened(true)}
        onBlurCapture={() => setPopoverOpened(false)}
        asChild
      >
        <FormInput
          type="password"
          autoComplete="off"
          defaultValue={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          {...props}
        />
      </PopoverTrigger>
      {showRequirements && (
        <PopoverContent
          className="explita-popover-content explita-password-popover"
          align="start"
          onPointerDown={(e) => e.stopPropagation()}
          forceMount
        >
          <PasswordRequirement
            label={`Includes at least ${minLength} characters`}
            meets={value.length > minLength - 1}
          />
          {checks}
        </PopoverContent>
      )}
    </Popover>
  );
};

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <p className={`password-requirement ${meets ? "success" : "error"}`}>
      {meets ? <LuCheck size={16} /> : <LuX size={16} />} <span>{label}</span>
    </p>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

FormInput.Search = function Search({
  placeholder = "Search...",
  ...props
}: FormInputProps) {
  return (
    <FormInput
      {...props}
      type="search"
      name="search"
      autoComplete="off"
      placeholder={placeholder}
      leftSection={<BsSearch />}
    />
  );
};

FormInput.Date = DateInput;
