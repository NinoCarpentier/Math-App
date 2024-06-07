import { useRef } from "react";

export const useFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setFocus = () => {
    inputRef.current && inputRef.current.focus();
  };

  return { inputRef, setFocus };
};
