import { useState } from "react";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);

  function handleChange(evt) {
    const { name, values } = evt.target;
    setValues({ ...value, [name]: value });
  }

  return { values, setValues, handleChange };
}
