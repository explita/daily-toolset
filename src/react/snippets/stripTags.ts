import { isValidElement, ReactElement, ReactNode } from "react";

export function stripTags(value: unknown): string {
  const traverseChildren = (children: ReactNode): string => {
    if (Array.isArray(children)) {
      return children.map(traverseChildren).join("");
    } else if (isValidElement(children)) {
      // Type assertion to ensure TypeScript recognizes `props`
      const element = children as ReactElement<{ children?: ReactNode }>;
      return traverseChildren(element.props.children);
    } else if (typeof children === "string") {
      return children.replace(/<[^>]*>?/gm, "");
    } else if (typeof children === "number") {
      return children.toString();
    } else {
      return "";
    }
  };

  if (isValidElement(value)) {
    // Type assertion to ensure TypeScript recognizes `props`
    const element = value as ReactElement<{ children?: ReactNode }>;
    return traverseChildren(element.props.children);
  } else if (typeof value === "string") {
    return value.replace(/<[^>]*>?/gm, "");
  } else if (typeof value === "number") {
    return value.toString();
  } else if (typeof value === "object" && value !== null) {
    const content = (value as { content?: string }).content;
    return content ? content.replace(/<[^>]*>?/gm, "") : "";
  } else {
    return "";
  }
}
