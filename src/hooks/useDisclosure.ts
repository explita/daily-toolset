import { useState } from "react";

export function useDisclosure(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);

  return [
    open,
    {
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(!open),
    },
  ];
}
