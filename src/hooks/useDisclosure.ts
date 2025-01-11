import { useState } from "react";

type Props = {
  initialState?: boolean;
  options?: {
    onOpen?: () => void;
    onClose?: () => void;
  };
};

/**
 * A custom React hook that manages the open/closed state of a component.
 *
 * @param defaultOpen - Initial open state (default is false).
 * @returns A tuple containing the current open state and an object with methods to open, close, and toggle the state.
 */
export function useDisclosure({ initialState = false, options }: Props) {
  const [open, setOpen] = useState(initialState);

  return [
    open,
    {
      open: () => {
        setOpen(true);
        options?.onOpen?.();
      },
      close: () => {
        setOpen(false);
        options?.onClose?.();
      },
      toggle: () => setOpen(!open),
    },
  ] as const;
}
