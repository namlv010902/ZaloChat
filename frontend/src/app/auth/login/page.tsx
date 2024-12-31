"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Icon } from "src/assets/icons";
import { FormAuth } from "../components";
import { useLoginMutation } from "./hook";
import { PayloadLogin } from "./types";
import { loginSchema } from "./validation/login";

export default function Login() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "all",
    resolver:yupResolver(loginSchema)
  });
  const { isPending, isSuccess, mutate } = useLoginMutation();

  const onSubmit = (data: PayloadLogin) => {
    console.log(data);
    mutate(data);
  };

  return (
    <>
      <FormAuth
        title="Login"
        submitText="Login"
        fields={[
          {
            name: "email",
            type: "text",
            placeholder: "@example.gmail.com",
            label: "Email",
            labelIcon: <Icon name="email" />,
          },
          {
            name: "password",
            type: "password",
            placeholder: "*******",
            label: "Password",
            labelIcon: <Icon name="password" />,
          },
        ]}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        subText="New user? "
        actionLinkUrl="/auth/signup"
        actionLinkText="Sign up"
        btnLoading={isPending}
      />

    </>
  );
}
