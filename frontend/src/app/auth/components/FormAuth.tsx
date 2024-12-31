import { Button } from "@lib/shared/components/common";
import { FormInput } from "@lib/shared/components/Form";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { Control } from "react-hook-form";
import { Icon } from "src/assets/icons";

type Field = {
  name: "email" | "password" | "confirmPassword" | "userName";
  type: "text" | "password";
  placeholder: string;
  label: string;
  labelIcon?: ReactNode;
};
type FormAuthProps = {
  control: Control<{
    password: string;
    email: string;
    confirmPassword: string;
    userName: string;
  }>;
  title: string;
  submitText: string;
  onSubmit: (e: React.BaseSyntheticEvent) => void;
  fields: Field[];
  subText: string;
  actionLinkUrl: string;
  actionLinkText: string;
  btnLoading: boolean;
};

const FormAuth: React.FC<FormAuthProps> = ({
  control,
  title,
  submitText = "Submit",
  onSubmit,
  fields,
  subText,
  actionLinkUrl,
  actionLinkText,
  btnLoading,
}) => {
  const router = useRouter();
  const URL = "http://localhost:8080/api/v1/auth/google";
  const handleLoginWithGoogle = () => {
    router.push(URL);
    console.log("Login with Google");
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-8 overflow-hidden">
        <div className="absolute left-0 right-0 top-0 h-[140px] overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            style={{
              filter: "drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.3))",
            }}
          >
            <path
              fill="#0099ff"
              fillOpacity="1"
              d="M0,256L48,213.3C96,171,192,85,288,80C384,75,480,149,576,165.3C672,181,768,139,864,122.7C960,107,1056,117,1152,144C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        <div className="relative text-center mb-8 flex flex-col items-center pt-12">
          <Image
            src="/images/logo.png"
            alt="logo"
            layout="intrinsic"
            quality={100}
            height={70}
            width={70}
          />
          <h1 className="text-3xl font-semibold text-black mt-4">{title}</h1>
        </div>
        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmit}>
          {fields &&
            fields?.map((item, index) => (
              <div key={index}>
                <FormInput
                  control={control}
                  name={item.name}
                  label={item.label}
                  labelIcon={item?.labelIcon}
                  type={item.type}
                  inputProps={{
                    placeholder: item.placeholder,
                    className: "bg-[#f9fbfb]",
                  }}
                />
              </div>
            ))}
            <div className="text-right text-sm text-primary font-medium">
              <Link href="/auth/forgot">Forgot password</Link>
            </div>
          <Button
            variant="primary"
            type="submit"
            size="full"
            // className="!bg-blue-400"
            // className="bg-gradient-to-r from-[#006BFF] to-[#0099ff] text-white"
            isLoading={btnLoading}
          >
            {submitText}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {subText}
            <Link
              href={actionLinkUrl}
              className="text-blue-500 font-semibold hover:underline"
            >
              {actionLinkText}
            </Link>
          </p>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-4">
          <span className="h-px w-24 bg-gray-300"></span>
          <span className="text-sm text-gray-500">OR</span>
          <span className="h-px w-24 bg-gray-300"></span>
        </div>
        {/* SSO */}
        <div className="flex justify-center space-x-4 mt-4">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
            <Icon name="facebook" />
          </button>
          <button
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            onClick={handleLoginWithGoogle}
          >
            <Icon name="google" />
          </button>
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200">
            <Icon name="twitter" />
          </button>
        </div>
        {/* <div>
          <Button
            variant="outline"
            size={"full"}
            onClick={handleLoginWithGoogle}
          >
            <Icon name="google" />
            Continue with Google
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export { FormAuth };
