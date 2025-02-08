"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { LuCheck, LuChevronsUpDown } from "react-icons/lu";

import { Button } from "../../components/ui/button";
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
import { Label } from "./FormLabel";
import { Clear } from "./ClearInput";
import { InputError } from "./InputError";
import { stripTags } from "../../react/snippets/stripTags";
import { SelectProps } from "../../input.type";
import { useForm } from "../../react/snippets/formProvider";

export function Select({
  addEmpty = false,
  align = "start",
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
  placeholder = "",
}: SelectProps) {
  const { formValues, formErrors, setValue, validateValue } = useForm();

  const [open, setOpen] = useState(false);

  const id = useId();

  const [inputValue, setInputValue] = useState("");

  const errorData = error
    ? error
    : name
    ? (formErrors as { [key: string]: string })?.[name] || ""
    : "";

  const formattedOptions = useMemo(() => {
    let optionsList =
      options?.map((option) => ({
        ...option,
        value: option.value?.toString() || "",
        disabled: option.disabled ?? false,
      })) || [];

    if (addEmpty && options) {
      optionsList = [{ value: "", label: "", disabled: false }, ...optionsList];
    }

    return optionsList;
  }, [options, addEmpty]);

  useEffect(() => {
    const value = (name ? formValues[name] ?? "" : "").toString();

    if (value) {
      setInputValue(value);
    }
  }, [formValues[name]]);

  useEffect(() => {
    setInputValue(defaultValue?.toString() || "");
  }, [defaultValue]);

  async function handleSelect(currentValue: string) {
    if (currentValue === inputValue && !isClearable) {
      setOpen(false);
      return;
    }

    const selected =
      currentValue === inputValue && isClearable ? "" : currentValue;

    setInputValue(selected);

    handleSelection ? handleSelection(selected) : setValue(name, selected);

    await validateValue(name, selected);

    setOpen(false);
  }

  const selectedOption = formattedOptions.find(
    (item) => item.value === inputValue
  );

  return (
    <div className="explita-input-root">
      <Label id={id} label={label} isRequired={isRequired} />
      <Popover open={open} onOpenChange={setOpen}>
        <div>
          {isClearable && inputValue !== "" && !isDisabled && (
            <Clear onClick={() => handleSelect("")} />
          )}
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              data-error={errorData.length > 0}
              data-empty={!inputValue}
              data-clearable={isClearable && inputValue !== ""}
              className={"select-trigger"}
              disabled={isDisabled}
            >
              <span>
                {inputValue ? stripTags(selectedOption?.label) : placeholder}
              </span>

              {(!isClearable || !inputValue) && (
                <LuChevronsUpDown className="chevron-icon" />
              )}
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          className="explita-popover-content"
          align={align}
          onPointerDown={(e) => e.stopPropagation()}
          forceMount
        >
          <Command loop>
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
                        onSelect={handleSelect}
                        className="select-list-item"
                      >
                        <span>
                          <span>{item.label}</span>
                          <span className="description">
                            {item.description}
                          </span>
                        </span>
                        <LuCheck
                          data-checked={inputValue && inputValue === item.value}
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
      <input type="hidden" name={name} value={inputValue} id={id} />
    </div>
  );
}
