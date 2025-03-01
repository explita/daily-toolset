import { ButtonProps as BtnProps } from "./ui/button";
import React, { ChangeEvent, ReactNode } from "react";
import { CaptionLabelProps, DayPicker } from "react-day-picker";

type CommonProps = {
  id?: string;
  isRequired?: boolean;
  isChecked?: true | false;
  isDisabled?: true | false;
  defaultValue?: string | number | null;
  name?: string;
  label?: React.ReactNode;
  error?: string;
};

type SelectOption = {
  value: string | number | null;
  label: ReactNode | string;
  description?: ReactNode | string;
  disabled?: boolean;
};

export type ButtonProps = BtnProps & {
  icon?: React.ReactNode;
  type?: "submit" | "button";
  isDisabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "teal"
    | "green"
    | null;
  size?: "default" | "sm" | "lg" | "icon" | "xs" | null;
};

export type SelectProps = Omit<CommonProps, "isChecked"> & {
  addEmpty?: boolean;
  align?: "center" | "end" | "start";
  handleSelection?: (value: string) => void;
  onBlur?: () => void;
  isSearchable?: boolean;
  isClearable?: boolean;
  options: SelectOption[] | undefined;
  size?: string;
  placeholder?: string;
};

export type MultiSelectProps = Omit<
  SelectProps,
  "defaultValue" | "handleSelection"
> & {
  defaultValue?: string[];
  handleSelection?: (value: string[]) => void;
  maxCount?: number;
};

export type FormInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "required" | "disabled"
> &
  Omit<CommonProps, "isChecked"> & {
    type?: string;
    description?: string;
    showPassword?: boolean;
    showError?: boolean;
    leftSection?: React.ReactNode;
  };

export type FormTextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "defaultValue" | "required" | "disabled"
> &
  Omit<CommonProps, "isChecked"> & {
    autosize?: boolean;
    rows?: number;
    minRows?: number;
    maxRows?: number;
    maxlength?: number;
  };

export type DatePickerProps = Omit<
  CommonProps,
  "isChecked" | "defaultValue"
> & {
  isClearable?: boolean;
  startDate?: Date;
  endDate?: Date;
  defaultValue?: Date;
  placeholder?: string;
  onChange?: (value: string) => void;
  // mode?: CalendarProps["mode"];
};

export type FormCheckBox = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "checked" | "disabled" | "required"
> &
  CommonProps & {
    handleCheck?: (checked: boolean) => void;
  };

export type FormRadioButton = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "checked" | "disabled" | "required"
> & {
  isChecked?: true | false;
  isDisabled?: true | false;
  isRequired?: true | false;
  handleCheck?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: any;
  label?: CommonProps["label"];
};

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  captionLabelRenderer?: (props: CaptionLabelProps) => React.ReactElement;
};
