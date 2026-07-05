import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = <T extends FieldValues>({ name, control, label, type, error }: Props<T>) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) =>
          <input id={name} type={type} {...field} className={`form-control ${error ? "is-invalid" : ""}`} />
        }
      />
      {error && <p className="error">{error.message}</p>}
    </div>
  )
}

export default InputForm;