"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "./Button";
import { Label } from "./FormLabel";
import { LuX } from "react-icons/lu";
import { InputError } from "./InputError";
import { MultiSelectProps } from "../input.type";
import { useForm } from "../hooks/useForm";

export function MultiSelect({
  addEmpty = false,
  name = "",
  label,
  options,
  isDisabled = false,
  isRequired = true,
  isSearchable = false,
  isClearable = true,
  defaultValue,
  handleSelection,
  error,
  placeholder,
  maxCount,
}: MultiSelectProps) {
  const { formValues, formErrors, setValue, validateValue } = useForm();
  const [open, setOpen] = useState(false);
  const id = useId();

  // Extract formValues[name] safely to avoid unnecessary re-renders
  const formValue = useMemo(() => {
    return name && formValues ? formValues[name]?.split(",") ?? [] : [];
  }, [name, formValues]);

  // Use lazy initialization to avoid unnecessary re-renders
  const [value, setInputValue] = useState<string[]>(() => defaultValue || []);

  // Sync state when formValues or defaultValue changes
  useEffect(() => {
    const inputValue = defaultValue ? defaultValue : formValue;

    if (name && inputValue.length > 0) {
      setInputValue(inputValue);
    }
  }, [defaultValue, formValue, name]);

  // Simplify error handling
  const errorData = error
    ? error
    : (formErrors as { [key: string]: string })?.[name] || "";

  // Memoize options formatting to improve performance
  const formattedOptions = useMemo(() => {
    let optionsList =
      options?.map((option) => ({
        value: option.value?.toString() || "",
        label: option.label?.toString() || "",
        disabled: option.disabled ?? false,
      })) || [];

    if (addEmpty && options) {
      optionsList = [{ value: "", label: "", disabled: false }, ...optionsList];
    }

    return optionsList;
  }, [options, addEmpty]);

  async function handleSelectOptions(selected: string) {
    let newValue = value;

    if (!value.includes(selected)) {
      newValue = [...value, selected];
    } else {
      newValue = [...value.filter((v) => v !== selected)];
    }
    setInputValue(newValue);

    handleSelection
      ? handleSelection(newValue)
      : setValue(name, newValue.join(","));
    await validateValue(name, newValue.join(","));
  }

  const values = useMemo(() => {
    if (maxCount) {
      return value.filter(Boolean).slice(0, maxCount);
    }

    return value.filter(Boolean);
  }, [value]);

  return (
    <div className="explita-input-root">
      <Label id={id} label={label} isRequired={isRequired} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            data-error={errorData.length > 0}
            data-empty={value.filter(Boolean).length === 0}
            data-clearable={isClearable && value.filter(Boolean).length > 0}
            className={"group multi-select-input"}
            disabled={isDisabled}
          >
            {values.length > 0 ? (
              <div className="multi-select-items items-center">
                {values.map((v) => {
                  const label = formattedOptions.find(
                    (item) => item.value === v
                  )?.label;
                  return (
                    <SelectItem
                      key={v}
                      value={v}
                      label={label || ""}
                      handleSelectOptions={handleSelectOptions}
                    />
                  );
                })}
                {}
              </div>
            ) : (
              <span>{placeholder}</span>
            )}
            <Remainder value={value} maxCount={maxCount} />
            <LuChevronsUpDown className="chevron-icon" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="explita-popover-content"
          align="start"
          onPointerDown={(e) => e.stopPropagation()}
          forceMount
        >
          <Command>
            {isSearchable && <CommandInput placeholder="Search..." />}
            <CommandList>
              <ScrollArea>
                <div className="select-list">
                  <CommandEmpty className="empty-list">
                    No records found.
                  </CommandEmpty>
                  <CommandGroup>
                    {formattedOptions.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.value}
                        onSelect={async (currentValue) => {
                          handleSelectOptions(currentValue);
                        }}
                        className="select-list-item"
                      >
                        {item.label}
                        <LuCheck
                          data-checked={value && value.includes(item.value)}
                          className={"check-icon"}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </div>
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <InputError message={errorData} />
      <input type="hidden" name={name} value={value.join(",")} id={id} />
    </div>
  );
}

type SelectItemProps = {
  label: string | undefined;
  value: string;
  handleSelectOptions: (selected: string) => void;
};

function SelectItem({ label, value, handleSelectOptions }: SelectItemProps) {
  return (
    <span className="multi-select-item">
      {label}
      <span onClick={() => handleSelectOptions(value || "")}>
        <LuX />
      </span>
    </span>
  );
}

type RemainderProps = {
  value: string[];
  maxCount: number | undefined;
};

function Remainder({ value, maxCount }: RemainderProps) {
  if (!maxCount || value.length <= maxCount) return null;

  const rem = value.length - maxCount;

  return <span className="multi-select-remainder">+{rem > 9 ? 9 : rem}</span>;
}
