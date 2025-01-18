"use client";

import { BsPlusLg, BsSearch, BsXLg } from "react-icons/bs";
import { HiOutlineSaveAs } from "react-icons/hi";
import React from "react";
import { Button as BaseButton, ButtonProps } from "../../components/ui/button";
import { Spinner } from "../../components/Spinner";
import { LuMinus } from "react-icons/lu";

type BtnProps = ButtonProps & {
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

export function Button({
  children,
  icon,
  type = "button",
  variant = "default",
  size = "default",
  isDisabled = false,
  loading = false,
  ...rest
}: BtnProps) {
  return (
    <BaseButton
      type={type}
      size={size}
      disabled={isDisabled}
      variant={variant}
      {...rest}
    >
      {loading && <Spinner color="blue" />}
      {icon && <span>{icon}</span>}
      {children}
    </BaseButton>
  );
}

Button.Add = function Add({
  children = "Add New",
  variant = "green",
  size = "sm",
  ...rest
}: BtnProps) {
  return (
    <Button icon={<BsPlusLg />} size={size} variant={variant} {...rest}>
      {children}
    </Button>
  );
};

Button.Remove = function Remove({
  children = "Remove",
  variant = "destructive",
  size = "icon",
  ...rest
}: BtnProps) {
  return (
    <Button size={size} variant={variant} {...rest}>
      <LuMinus />
    </Button>
  );
};

export function ButtonAdd({ ...rest }: BtnProps) {
  return <Button.Add {...rest} />;
}

Button.Submit = function Submit({
  children = "Submit",
  isDisabled = false,
  size = "default",
  loading,
  ...rest
}: BtnProps) {
  return (
    <Button
      type={"submit"}
      icon={<HiOutlineSaveAs />}
      isDisabled={loading || isDisabled}
      loading={loading}
      variant="teal"
      {...rest}
    >
      {children}
    </Button>
  );
};

Button.Search = function Search({
  children = "Search",
  variant = "secondary",
  ...rest
}: BtnProps) {
  return (
    <Button.Submit icon={<BsSearch />} variant={variant} {...rest}>
      {children}
    </Button.Submit>
  );
};

Button.Close = function Close({
  children = "Close",
  variant = "destructive",
  size,
  ...rest
}: BtnProps) {
  return (
    <Button
      type="button"
      icon={<BsXLg />}
      size={size}
      variant={variant}
      {...rest}
    >
      {children}
    </Button>
  );
};
