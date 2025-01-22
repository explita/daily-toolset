import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Label } from "./FormLabel";
import { Clear } from "./ClearInput";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { Button } from "./Button";
import { LuCalendar as CalendarIcon } from "react-icons/lu";
import { Calendar } from "../../components/ui/calendar";
import { InputError } from "./InputError";
import { ScrollArea } from "../../components/ui/scroll-area";
import { useForm } from "../../react/snippets/formProvider";
import { formatDate } from "../../dateUtils";
import { DatePickerProps } from "../../input.type";

export function DateInput({
  isRequired = true,
  isDisabled = false,
  isClearable = true,
  defaultValue,
  label,
  name,
  error,
  startDate,
  endDate,
  placeholder = "dd/mm/yyyy",
  onChange,
}: // mode = "single",
DatePickerProps) {
  const { formValues, formErrors, updateValue, validateField } = useForm();

  const [value, setValue] = useState<Date | string | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const id = useId();

  useEffect(() => {
    const inputValue =
      name && (formValues as { [key: string]: any })[name]
        ? (formValues as { [key: string]: any })[name]
        : undefined;
    if (name && inputValue) {
      setValue(inputValue);
    }
  }, [formValues, name]);

  const handleChange = useCallback(
    (inputValue: Date | undefined) => {
      const formatted = formatDate(inputValue, { format: "YYYY-MM-DD" });

      const selected =
        inputValue === value || !inputValue ? undefined : formatted;

      validateField(name, selected ?? "");

      setValue(selected);

      onChange ? onChange(selected || "") : updateValue(name, selected);
    },
    [name, onChange, updateValue, validateField]
  );

  const handleYearAndMonthChange = useCallback(
    (year: number, month: number) => {
      const date = value ? new Date(value) : new Date();
      date.setFullYear(year);
      date.setMonth(month);
      handleChange(date);
    },
    [handleChange, value]
  );

  const errorData = error
    ? error
    : name
    ? (formErrors as { [key: string]: any })?.[name] || ""
    : "";

  return (
    <div className="explita-input-root">
      <Label id={id} label={label} isRequired={isRequired} />
      <Popover open={open} onOpenChange={setOpen}>
        <div>
          {isClearable && value && !isDisabled && (
            <Clear onClick={() => handleChange(undefined)} />
          )}
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              data-error={errorData.length > 0}
              data-empty={!value}
              data-clearable={isClearable && value !== ""}
              className={"date-input"}
              disabled={isDisabled}
            >
              <CalendarIcon size={16} />
              <span>
                {value
                  ? formatDate(value, { format: "Month DD, YYYY" })
                  : placeholder}
              </span>
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent
          className="explita-calendar-content explita-popover-content"
          align="start"
        >
          <Calendar
            key={value?.toString()}
            mode="single"
            selected={value ? new Date(value) : undefined}
            onSelect={(currentValue) => {
              handleChange(currentValue);
              setOpen(false);
            }}
            initialFocus
            fromDate={startDate}
            toDate={endDate}
            disabled={isDisabled}
            defaultMonth={value ? new Date(value) : undefined}
            classNames={{
              root: "explita-calendar-root",
            }}
            captionLabelRenderer={(props) => (
              <YearPicker
                displayMonth={props.displayMonth}
                startYear={startDate?.getFullYear()}
                endYear={endDate?.getFullYear()}
                handleYearAndMonthChange={handleYearAndMonthChange}
              />
            )}
          />
        </PopoverContent>
      </Popover>
      <InputError message={errorData} />
      <input
        type="hidden"
        name={name}
        value={value ? formatDate(value, { format: "YYYY-MM-DD" }) : ""}
        id={id}
      />
    </div>
  );
}

type YearPickerProps = {
  displayMonth: Date | string | undefined;
  startYear?: number | undefined | null;
  endYear?: number | undefined | null;
  handleYearAndMonthChange: (year: number, month: number) => void;
};

function YearPicker({
  displayMonth,
  startYear,
  endYear,
  handleYearAndMonthChange,
}: YearPickerProps) {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isMonthOpen, setIsMonthOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(
    displayMonth
      ? new Date(displayMonth).getFullYear()
      : new Date().getFullYear()
  );

  if (typeof displayMonth === "string") {
    displayMonth = new Date(displayMonth);
  }

  if (displayMonth === undefined) {
    displayMonth = new Date();
  }

  const years = useMemo(() => {
    const start = Number(startYear) || 1950;
    const end = Number(endYear) || new Date().getFullYear() + 10;

    const yearsList: number[] = [];
    for (let i = end; i >= start; i--) {
      yearsList.push(i);
    }

    return yearsList;
  }, [startYear, endYear]);

  function handleSelectYear(year: number) {
    setSelectedYear(year);
    setIsYearOpen(!isYearOpen);
    setIsMonthOpen(!isMonthOpen);
  }

  function handleSelectMonth(month: number) {
    handleYearAndMonthChange(selectedYear, month);
    setIsMonthOpen(!isMonthOpen);
  }

  return (
    <>
      <span
        role="button"
        className="year-picker-label"
        aria-expanded={isYearOpen}
        onClick={() => setIsYearOpen(!isYearOpen)}
      >
        {months[displayMonth.getMonth()].label} {displayMonth.getFullYear()}
      </span>
      <div className={"year-picker-root"} data-open={isYearOpen}>
        <span
          role="button"
          className="title"
          onClick={() => setIsYearOpen(!isYearOpen)}
        >
          Select Year
        </span>
        <ScrollArea className="year-picker-scroll-area">
          <div className="items">
            {years.map((year) => (
              <span
                role="button"
                key={year}
                className={"item"}
                data-active={displayMonth.getFullYear() === year}
                onClick={() => handleSelectYear(year)}
              >
                {year}
              </span>
            ))}
          </div>
        </ScrollArea>
      </div>
      <MonthPicker
        displayMonth={displayMonth}
        handleSelectMonth={handleSelectMonth}
        isMonthOpen={isMonthOpen}
      />
    </>
  );
}

type MonthPickerProps = {
  displayMonth: Date | string | undefined;
  handleSelectMonth: (month: number) => void;
  isMonthOpen?: boolean;
};

const months = [
  {
    value: 0,
    label: "Jan",
  },
  {
    value: 1,
    label: "Feb",
  },
  {
    value: 2,
    label: "Mar",
  },
  {
    value: 3,
    label: "Apr",
  },
  {
    value: 4,
    label: "May",
  },
  {
    value: 5,
    label: "Jun",
  },
  {
    value: 6,
    label: "Jul",
  },
  {
    value: 7,
    label: "Aug",
  },
  {
    value: 8,
    label: "Sep",
  },
  {
    value: 9,
    label: "Oct",
  },
  {
    value: 10,
    label: "Nov",
  },
  {
    value: 11,
    label: "Dec",
  },
];

function MonthPicker({
  displayMonth,
  handleSelectMonth,
  isMonthOpen = false,
}: MonthPickerProps) {
  if (typeof displayMonth === "string") {
    displayMonth = new Date(displayMonth);
  }

  if (displayMonth === undefined) {
    displayMonth = new Date();
  }

  return (
    <div className={"year-picker-root"} data-open={isMonthOpen}>
      <span role="button" className="title">
        Select Month
      </span>
      <ScrollArea className="year-picker-scroll-area">
        <div className="items">
          {months.map((month) => (
            <span
              role="button"
              key={month.value}
              className={"item"}
              data-active={displayMonth?.getMonth() === month.value}
              onClick={() => {
                handleSelectMonth(month.value);
              }}
            >
              {month.label}
            </span>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
