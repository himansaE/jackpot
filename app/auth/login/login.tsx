"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputBox } from "@/components/ui/input-box";
import { OrLine } from "@/components/ui/or-line";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import { LoginProviders } from "@/components/login-providers";
import { deleteCookie, getCookie } from "@/lib/utils";

type FormData = {
  email: string;
  pass: string;
};

export default function LoginPage({
  error: default_error,
}: {
  error?: string;
}) {
  const [form_data, setFormData] = useState<FormData>({
    email: "",
    pass: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ReactNode>(default_error);

  const setValue = (id: keyof FormData, value: string) => {
    setFormData({ ...form_data, [id]: value });
  };
  useEffect(() => {
    const error = getCookie("auth-error");
    if (error) {
      setError(decodeURI(error));
      deleteCookie("auth-error");
    }
  }, []);
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
          (res.errors as string[]).map((i, n) => <div key={n}>{i}</div>),
        );
    } catch {}
    setSubmitting(false);
  };

  return (
    <div className="grid min-h-[calc(100vh_-_6rem_-_80px)] sm:justify-items-center lg:[grid-template-columns:0.6fr_1fr]">
      <div className="flex max-h-[calc(100vh_-_200px)] lg:sticky lg:top-[105px]  lg:translate-x-14">
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
          <p className=" text-sm font-medium text-gray-500 dark:text-gray-400 lg:block">
            Create your account, and test your luck today.
          </p>

          <div className="my-5 font-medium ">
            Don&apos;t have an Account{" "}
            <Link className="text-blue-500 underline" href={"/auth/register"}>
              Register here
            </Link>
            .
          </div>
        </div>
      </div>
      <div className="my-auto w-full max-w-xl">
        <div className="lg:rounded-2xl lg:px-8 lg:py-9 lg:dark:bg-[#0c0c25]">
          <h2 className="text-xl font-medium">
            Enter your Email and Password to Log in.
          </h2>
          <form
            className={`my-3 flex flex-col gap-5 ${
              submitting ? "opacity-80" : ""
            }`}
            onSubmit={submit}
          >
            {error != "" && <div className="text-red-500">{error}</div>}

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

            <div className="flex justify-between space-x-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms1"
                  disabled={submitting}
                  name="remember-me"
                />

                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember Me
                  </label>
                </div>
              </div>
              <Link
                href="/auth/forget"
                className="justify-between text-sm text-blue-500 underline  dark:text-blue-400"
              >
                Forget Password
              </Link>
            </div>
            <Button className="dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-800">
              {submitting ? <Spinner /> : <></>}
              Log In
            </Button>
          </form>

          <OrLine />
          <LoginProviders type="in" />
        </div>
      </div>
    </div>
  );
}
