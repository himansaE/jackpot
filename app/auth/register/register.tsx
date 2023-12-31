"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputBox } from "@/components/ui/input-box";
import { OrLine } from "@/components/ui/or-line";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { FormEvent, ReactNode, SetStateAction, useRef, useState } from "react";
import { ReCaptchaProvider, useReCaptcha } from "next-recaptcha-v3";
import Image from "next/image";
import { LoginProviders } from "@/components/login-providers";
import { AuthAction } from "@/lib/auth_action";

type FormData = {
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  pass: string;
  pass_conf: string;
};

export function Page() {
  const { executeRecaptcha } = useReCaptcha();
  const [form_data, setFormData] = useState<FormData>({
    f_name: "",
    l_name: "",
    email: "",
    phone: "",
    pass: "",
    pass_conf: "",
  });

  const error_ref = useRef<HTMLDivElement>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setErrorText] = useState<ReactNode>("");
  const setValue = (id: keyof FormData, value: string) => {
    setFormData({ ...form_data, [id]: value });
  };

  const setError = (text: SetStateAction<ReactNode>) => {
    if (text != "") {
      if ((error_ref.current as any)?.scrollIntoViewIfNeeded)
        (error_ref.current as any)?.scrollIntoViewIfNeeded();
      else error_ref.current?.scrollIntoView();
    }
    setErrorText(text);
  };
  const validate = () => {
    if (form_data.pass.length < 8) {
      setError("Password must contain at least 8 characters.");
      return false;
    }
    if (form_data.pass != form_data.pass_conf) {
      setError("Password and Conform password must be same.");
      return false;
    }
    return true;
  };
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await AuthAction({
      setError,
      setSubmitting,
      submitting,
      validate,
      executeRecaptcha,
      action_path: "/api/auth/register",
      recaptcha_name: "register",
      body: {
        email: form_data.email,
        first_name: form_data.f_name,
        last_name: form_data.l_name,
        password: form_data.pass,
        phone: form_data.phone,
      },
    });
  };
  return (
    <div className="grid sm:justify-items-center lg:[grid-template-columns:0.6fr_1fr]">
      <div className="flex max-h-[calc(100vh_-_200px)] w-full max-w-xl lg:sticky lg:top-[105px] lg:translate-x-14">
        <div className="lg:m-auto">
          <div className="my-5 hidden justify-center lg:flex ">
            <Image
              src="/static/images/logo_icon.svg"
              alt="Jackpot Logo"
              width={200}
              height={200}
            />
          </div>
          <h1 className="flex flex-wrap items-center gap-x-3 text-3xl font-semibold">
            Welcome to Jackpot
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Create your account, and test your luck today.
          </p>
          <div className="my-5 font-medium">
            Already have an Account{" "}
            <Link className="text-blue-500 underline" href={"/auth/login"}>
              Login here
            </Link>
            .
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl">
        <div className="lg:rounded-2xl lg:px-8 lg:py-9 lg:dark:bg-[#0c0c25]">
          <h2 className="text-lg font-medium">
            Fill This form to complete the Registration
          </h2>
          <div ref={error_ref}>
            {error != "" && <div className="my-2 text-red-500">{error}</div>}
          </div>
          <form className="my-3 flex flex-col gap-5" onSubmit={submit}>
            <div className="flex flex-row gap-3 [&>div]:w-full">
              <InputBox
                name="First Name"
                onChange={(e) => setValue("f_name", e.target.value)}
                placeholder="Your first name"
                value={form_data.f_name}
                autoComplete="first-name"
                disabled={submitting}
              />
              <InputBox
                name="Last Name"
                onChange={(e) => setValue("l_name", e.target.value)}
                placeholder="Your last name"
                value={form_data.l_name}
                autoComplete="last-name"
                disabled={submitting}
              />
            </div>
            <InputBox
              name="Email"
              onChange={(e) => setValue("email", e.target.value)}
              placeholder="Your Email Address"
              value={form_data.email}
              autoComplete="email"
              disabled={submitting}
            />
            <InputBox
              name="Phone"
              onChange={(e) => setValue("phone", e.target.value)}
              placeholder="Your Phone Number"
              value={form_data.phone}
              autoComplete="tel"
              disabled={submitting}
            />
            <InputBox
              name="Password"
              onChange={(e) => setValue("pass", e.target.value)}
              placeholder="New Password"
              value={form_data.pass}
              autoComplete="new-password"
              disabled={submitting}
              type="password"
            />
            <InputBox
              name="Conform Password"
              onChange={(e) => setValue("pass_conf", e.target.value)}
              placeholder="Conform new Password"
              value={form_data.pass_conf}
              autoComplete="new-password"
              type="password"
              disabled={submitting}
            />
            <div className="items-top flex space-x-2">
              <Checkbox id="terms1" required disabled={submitting} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-xs text-gray-700 dark:text-gray-400">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            <Button className="dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-800">
              {submitting ? <Spinner /> : <></>}Sign Up
            </Button>
          </form>
        </div>
        <OrLine />
        <LoginProviders type="up" />
        <p className="mx-2 mt-8 text-xs text-gray-700 dark:text-gray-400 ">
          This site is protected by reCAPTCHA and the Google
          <a
            href="https://policies.google.com/privacy"
            className="text-blue-600 underline"
          >
            {" "}
            Privacy Policy{" "}
          </a>
          and
          <a
            href="https://policies.google.com/terms"
            className="text-blue-600 underline"
          >
            {" "}
            Terms of Service{" "}
          </a>
          apply.
        </p>
      </div>
    </div>
  );
}

export default function RegisterWithCaptcha() {
  return (
    <ReCaptchaProvider>
      <Page />
    </ReCaptchaProvider>
  );
}
