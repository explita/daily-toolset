import { LuX } from "react-icons/lu";

export function Clear({ onClick }: { onClick?: () => void }) {
  return (
    <span className="clear-input" onClick={onClick}>
      <LuX size={16} />
    </span>
  );
}
