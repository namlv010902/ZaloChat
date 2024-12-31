"use client";

import { useForm } from "react-hook-form";
import { FormAuth } from "../components";
import { Icon } from "src/assets/icons";
import { useAtomValue } from "jotai";
import { tokenAtom } from "@lib/shared/stores/jotai";

export default function SignUp() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });
  const token = useAtomValue(tokenAtom);
  console.log("token ", token);
  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  return (
    <FormAuth
      btnLoading={false}
      title="SignUp"
      submitText="SignUp"
      fields={[
        {
          name: "email",
          type: "text",
          placeholder: "example@gmail.com",
          label: "Email",
          labelIcon: <Icon name="email" />,
        },
        {
          name: "userName",
          type: "text",
          placeholder: "Name",
          label: "User Name",
          labelIcon: <Icon name="google" />,
        },
        {
          name: "password",
          type: "password",
          placeholder: "******",
          label: "Password",
          labelIcon: <Icon name="password" />,
        },
        {
          name: "confirmPassword",
          type: "password",
          placeholder: "******",
          label: "Confirm Password",
          labelIcon: <Icon name="password" />,
        },
      ]}
      onSubmit={handleSubmit(onSubmit)}
      control={control}
      subText="Already have an account? "
      actionLinkUrl="/auth/login"
      actionLinkText="Login"
    />
  );
}
