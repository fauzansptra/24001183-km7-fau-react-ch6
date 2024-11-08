import { Button } from "../Elements/button/Button";
import { InputForm } from "../Elements/Input";

export const FormLogin = () => {
  return (
    <form>
      <InputForm
        label={"email"}
        type={"email"}
        placeholder={"example@gmail.com"}
        name={"email"}
      />
      <InputForm
        label={"password"}
        type={"password"}
        placeholder={"password"}
        name={"password"}
      />
      <Button>Login</Button>
    </form>
  );
};
