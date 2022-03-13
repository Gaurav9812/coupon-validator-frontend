import { useState } from "react";

export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(params[property]);

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&");
}

export function useFormInputs(initialvalue) {
  const [value, setValue] = useState(initialvalue);
  function onChange(e) {
    console.log(e.target.value);
    setValue(e.target.value.toUpperCase().replace(/\s/g, ""));
  }
  return {
    value,
    onChange: onChange,
  };
}
