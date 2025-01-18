"use client";

import { useEffect, useId, useRef } from "react";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "./FormLabel";
import { InputError } from "./InputError";
import { useForm } from "../../form/formProvider";
import { FormTextAreaProps } from "../../input.type";

export function FormTextArea({
  autosize = true,
  minRows = 1,
  maxRows = 4,
  isRequired,
  label,
  isDisabled,
  error,
  name,
  defaultValue,
  onChange,
  style,
  ...rest
}: FormTextAreaProps) {
  const { formValues, formErrors, updateValue, validateField } = useForm();

  const errorData = error
    ? error
    : name
    ? (formErrors as { [key: string]: any })?.[name] || ""
    : "";

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const id = useId();

  const handleResize = () => {
    if (textareaRef.current && autosize) {
      const lineHeight = parseInt(
        getComputedStyle(textareaRef.current).lineHeight || "20",
        10
      );
      const maxHeight = maxRows ? maxRows * lineHeight : Infinity;

      textareaRef.current.style.height = "auto"; // Reset height to recalculate
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        maxHeight
      )}px`; // Set height within maxHeight
    }
  };

  useEffect(() => {
    handleResize(); // Adjust height on mount
  }, [defaultValue]);

  return (
    <div className="explita-input-root">
      <Label id={id} label={label} isRequired={isRequired} />
      <Textarea
        id={id}
        ref={textareaRef}
        rows={minRows}
        name={name}
        defaultValue={
          defaultValue
            ? defaultValue
            : name
            ? (formValues as { [key: string]: string })[name]
            : ""
        }
        onInput={handleResize}
        onChange={
          onChange
            ? onChange
            : async (e) => {
                updateValue(name, e.target.value);
                await validateField(name, e.target.value);
              }
        }
        disabled={isDisabled}
        style={{
          ...style,
          overflowY: "auto",
          resize: "none",
        }}
        data-error={errorData.length > 0}
        {...rest}
      />
      <InputError message={errorData} />
    </div>
  );
}
