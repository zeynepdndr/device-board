//To manage the state and the logic for an input

import { useEffect, useState } from "react";

const useInput = (validateValue: Function, initialValue: any) => {
  const [enteredValue, setEnteredValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEnteredValue(e.currentTarget.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  useEffect(() => {
    setEnteredValue(initialValue);
  }, [initialValue]);

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
