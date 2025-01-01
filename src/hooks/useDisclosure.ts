import { useState } from "react";

/**
 * A custom React hook that manages the open/closed state of a component.
 *
 * @param defaultOpen - Initial open state (default is false).
 * @returns A tuple containing the current open state and an object with methods to open, close, and toggle the state.
 */
export function useDisclosure(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);

  return [
    open,
    {
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen(!open),
    },
  ] as const;
}
