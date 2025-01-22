"use client";

import { useEffect, useId, useState } from "react";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { ScrollArea } from "../../components/ui/scroll-area";
import { Button } from "./Button";
import { useForm } from "../../react/snippets/formProvider";
import { Label } from "./FormLabel";
import { LuX } from "react-icons/lu";
import { InputError } from "./InputError";
import { MultiSelectProps } from "../../input.type";

export function MultiSelect({
  addEmpty = false,
  name,
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
}: MultiSelectProps) {
  const { formValues, formErrors, updateValue, validateField } = useForm();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string[]>(defaultValue || []);

  const id = useId();

  useEffect(() => {
    const inputValue = (
      defaultValue
        ? defaultValue
        : name
        ? (formValues as { [key: string]: string })?.[name]?.split(",") ?? []
        : []
    ) as string[];

    if (name && inputValue) {
      setValue(inputValue);
    }
  }, [formValues, name]);

  const errorData = error
    ? error
    : name
    ? (formErrors as { [key: string]: any })?.[name] || ""
    : "";

  let formattedOptions =
    options?.map((option) => ({
      value: option.value?.toString() || "",
      label: option.label?.toString() || "",
      disabled: option.disabled ?? false,
    })) || [];

  if (addEmpty && options)
    formattedOptions = [
      { value: "", label: "", disabled: false },
      ...formattedOptions,
    ];

  async function handleSelectOptions(selected: string) {
    let newValue = value;

    if (!value.includes(selected)) {
      newValue = [...value, selected];
    } else {
      newValue = [...value.filter((v) => v !== selected)];
    }
    setValue(newValue);

    handleSelection
      ? handleSelection(newValue)
      : updateValue(name, newValue.join(","));
    await validateField(name, newValue.join(","));
  }

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
            data-empty={value.length === 0}
            data-clearable={isClearable && value.length > 0}
            className={"multi-select-input"}
            disabled={isDisabled}
          >
            {value.length > 0 ? (
              <div className="multi-select-items">
                {value.map((v) => {
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
              </div>
            ) : (
              <span>{placeholder}</span>
            )}
            <LuChevronsUpDown className="chevron-icon" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="explita-popover-content" align="start">
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
