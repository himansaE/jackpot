"use client";
import { Button } from "@/components/ui/button";
import Center from "@/components/ui/center";
import { Checkbox } from "@/components/ui/checkbox";
import { InputBox } from "@/components/ui/input-box";
import { OrLine } from "@/components/ui/or-line";
import { ProviderButton } from "@/components/ui/provider-button";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import { ReCaptchaProvider, useReCaptcha } from "next-recaptcha-v3";
import { signIn } from "next-auth/react";

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

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ReactNode>("");

  const setValue = (id: keyof FormData, value: string) => {
    setFormData({ ...form_data, [id]: value });
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
    if (submitting) return;
    setSubmitting(true);
    setError("");
    if (!validate()) return setSubmitting(false);
    let token;
    try {
      token = await executeRecaptcha("register");
    } catch (err) {}

    if (token == undefined)
      return setError("Recaptcha has not been loaded. Try reload the page.");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          token,
          email: form_data.email,
          first_name: form_data.f_name,
          last_name: form_data.l_name,
          password: form_data.pass,
          phone: form_data.phone,
        }),
      }).then((r) => r.json());
      if (!res.done)
        setError(
          (res.errors as string[]).map((i, n) => <div key={n}>{i}</div>)
        );
      else {
        await signIn("credentials", {
          email: form_data.email,
          password: form_data.pass,
          redirect: false,
          callbackUrl: "/",
        });
        const url = new URLSearchParams(window.location.search).get(
          "callbackUrl"
        );
        window.location.assign(url ?? "/dashboard");
      }
    } catch (e) {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <h1 className="my-3 mb-1 text-3xl items-center sm:px-0 font-medium">
        Welcome to Jackpot
      </h1>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 md:mx-6">
        Create your account, and test your luck today.
      </p>
      <div className="m-5 mt-7 font-medium">
        Already have an Account{" "}
        <Link className="text-blue-500 underline" href={"/auth/login"}>
          Login here
        </Link>
        .
      </div>
      <div className="md:grid md:[grid-template-columns:1fr_20px_1fr] my-3  md:my-5">
        <div className="[grid-column:3] ">
          <Center className="flex flex-col gap-5 mt-10 mb-12 md:mt-26 ">
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              Sign Up Using
            </h2>
            <ProviderButton
              name="Google"
              type="up"
              action={() => {}}
              icon="/static/images/g_logo.svg"
            />
            <ProviderButton
              name="Apple"
              type="up"
              action={() => {}}
              icon="/static/images/apple_logo.svg"
            />
          </Center>
        </div>
        <div className="[grid-column:2] [grid-row:1]">
          <OrLine />
        </div>
        <div className="[grid-column:1] [grid-row:1] mx-3 md:mx-0">
          <h2 className="mt-8 mb-6 text-xl font-medium md:hidden">
            Fill This form to complete the Registration
          </h2>
          {error != "" && (
            <div className="text-red-200 mx-0 md:mx-3 my-10 mb-5 border border-solid border-[#ff10102e] bg-red-950 rounded-md px-8 py-2 text-sm">
              {error}
            </div>
          )}
          <form className="flex flex-col gap-5 my-3 md:mx-6" onSubmit={submit}>
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
            <div className="flex space-x-2 items-top">
              <Checkbox id="terms1" required disabled={submitting} />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-xs text-gray-700 dark:text-gray-400">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            <Button className="mt-2 ">
              {submitting ? <Spinner /> : <></>}Sign Up
            </Button>
          </form>
        </div>
      </div>
      <p className="text-xs text-gray-700 dark:text-gray-400 mx-2 mt-8 ">
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
    </>
  );
}

export default function RegisterWithCaptcha() {
  return (
    <ReCaptchaProvider>
      <Page />
    </ReCaptchaProvider>
  );
}
