import React from "react";

export function InputError({ message }: { message: string }) {
  if (!message) return <></>;

  return <span className="input-error">{message}</span>;
}
