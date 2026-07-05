import { Controller } from "react-hook-form";
import type { Control, FieldError } from "react-hook-form";
import type { RegisterSchemaType, LoginSchemaType } from "../models";
import ".AuthInputForm.css"

interface Props {
  name: keyof RegisterSchemaType | keyof LoginSchemaType;
  control: Control<RegisterSchemaType | LoginSchemaType>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = ({ name, control, label, type, error }: Props) => {
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