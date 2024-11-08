import { Input } from "./Input";
import { Label } from "./Label";

export const InputForm = ({ label, name, type, placeholder }) => {
  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} placeholder={placeholder} name={name} />
    </>
  );
};
