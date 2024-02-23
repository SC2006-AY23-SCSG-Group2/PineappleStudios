import {useEffect, useRef} from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
}

// eslint-disable-next-line react/prop-types
export function TextField({
  id,
  label,
  type = "text",
  value,
  ...rest
}: FormFieldProps) {
  const input = useRef(null);

  useEffect(() => {
    if (
      input.current !== undefined &&
      input.current !== null &&
      input.current.value !== value
    ) {
      input.current.value = value;
    }
  }, [value]);

  return (
    <>
      <p className="form-control">
        <label className="label" htmlFor={id}>
          <span className="label-text">{label}</span>
        </label>
        <input
          ref={input}
          type={type}
          id={id}
          name={id}
          className="input input-bordered"
          placeholder={`Enter your ${label.toLowerCase()}`}
          {...rest}
        />
      </p>
    </>
  );
}
