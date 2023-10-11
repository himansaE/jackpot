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
import Image from "next/image";

type FormData = {
  email: string;
  pass: string;
};

export default function LoginPage() {
  const [form_data, setFormData] = useState<FormData>({
    email: "",
    pass: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ReactNode>("");

  const setValue = (id: keyof FormData, value: string) => {
    setFormData({ ...form_data, [id]: value });
  };

  const validate = () => {
    if (form_data.email.trim() != "" || form_data.pass.trim() == "")
      return true;
    return false;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return setError("Provide Username and Password to Login.");
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form_data.email,
          password: form_data.pass,
        }),
      }).then((r) => r.json());

      if (res.done) {
        return window.location.assign("/dashboard");
      } else
        setError(
          (res.errors as string[]).map((i, n) => <div key={n}>{i}</div>)
        );
    } catch {}
    setSubmitting(false);
  };

  return (
    <>
      <h1 className="my-3 text-3xl md:mx-6 flex gap-x-3 items-center flex-wrap sm:px-0 font-medium mb-5 sm:mb-0">
        Welcome to{" "}
        <Image
          className="dark:invert dark:hue-rotate-[135deg] dark:contrast-150 elative z-[-1] w-auto "
          src="/static/images/logo_inline.svg"
          alt="logo"
          height={45}
          width={188}
        />
      </h1>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 md:mx-6">
        Create your account, and test your luck today.
      </p>

      <div className="m-5 font-medium">
        Don&apos;t have an Account{" "}
        <Link className="text-blue-500 underline" href={"/auth/register"}>
          Register here
        </Link>
        .
      </div>
      <div className="md:grid md:[grid-template-columns:1fr_20px_1fr] my-3  md:my-5">
        <div className="[grid-column:3]">
          <Center className="flex flex-col gap-5 mt-10 mb-12 md:mt-26 ">
            <h2 className="text-xl font-medium text-gray-700  dark:text-gray-300">
              Log In Using
            </h2>
            <ProviderButton
              name="Google"
              type="in"
              action={() => {}}
              icon="/static/images/g_logo.svg"
            />
            <ProviderButton
              name="Apple"
              type="in"
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
            Enter your Username and Password to Log in.
          </h2>
          <form
            className={`flex flex-col gap-5 my-3 md:mx-6 ${
              submitting ? "opacity-80" : ""
            }`}
            onSubmit={submit}
          >
            {error != "" && (
              <div className="text-red-500 mb-[-1em]">{error}</div>
            )}

            <InputBox
              name="Email"
              onChange={(e) => setValue("email", e.target.value)}
              placeholder="Your Email Address"
              value={form_data.email}
              autoComplete="email"
              disabled={submitting}
            />

            <InputBox
              name="Password"
              onChange={(e) => setValue("pass", e.target.value)}
              placeholder="Password"
              value={form_data.pass}
              autoComplete="password"
              type="password"
              disabled={submitting}
            />

            <div className="flex space-x-2 items-top">
              {/* TODO:: Implement remember me functionality */}
              <Checkbox id="terms1" disabled={submitting} />

              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>
            </div>
            <Button className="mt-2">
              {submitting ? <Spinner /> : <></>}
              Log In
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
