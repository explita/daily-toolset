"use client";

import { BsPlusLg, BsSearch, BsXLg } from "react-icons/bs";
import { HiOutlineSaveAs } from "react-icons/hi";
import { Button as BaseButton } from "../../components/ui/button";
import { Spinner } from "../../components/Spinner";
import { LuMinus } from "react-icons/lu";
import { ButtonProps } from "../../input.type";

export function Button({
  children,
  icon,
  type = "button",
  variant = "default",
  size = "default",
  isDisabled = false,
  loading = false,
  ...rest
}: ButtonProps) {
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
}: ButtonProps) {
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
}: ButtonProps) {
  return (
    <Button size={size} variant={variant} {...rest}>
      <LuMinus />
    </Button>
  );
};

export function ButtonAdd({ ...rest }: ButtonProps) {
  return <Button.Add {...rest} />;
}

Button.Submit = function Submit({
  children = "Submit",
  isDisabled = false,
  size = "default",
  loading,
  ...rest
}: ButtonProps) {
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
}: ButtonProps) {
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
}: ButtonProps) {
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
