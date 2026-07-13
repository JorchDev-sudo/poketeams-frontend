import { Controller } from "react-hook-form";
import type { Control, FieldError, FieldValues, Path } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  type?: string;
  error?: FieldError;
}

const InputForm = <T extends FieldValues>({ name, control, label, type, error }: Props<T>) => {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input id={name} type={type} aria-invalid={!!error} {...field} />
        )}
      />
      {error && (
        <p role="alert" className="text-xs text-destructive">
          {error.message}
        </p>
      )}
    </div>
  )
}

export default InputForm;
