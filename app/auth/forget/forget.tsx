"use client";
import { Button } from "@/components/ui/button";
import { InputBox } from "@/components/ui/input-box";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import { ReCaptchaProvider, useReCaptcha } from "next-recaptcha-v3";
import Image from "next/image";
import { AuthAction } from "@/lib/auth_action";
import { useRouter } from "next/navigation";

export function Page(props: { email?: string }) {
  const { executeRecaptcha } = useReCaptcha();
  const [email, setEmail] = useState(props.email ?? "");
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ReactNode>("");

  const validate = () => {
    if (email.trim() == "") {
      setError("Enter valid Email address.");
      return false;
    }
    return true;
  };
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (
        await AuthAction({
          setError,
          setSubmitting,
          submitting,
          validate,
          executeRecaptcha,
          action_path: "/api/auth/forget",
          recaptcha_name: "forget",
          body: { email },
          type: "return",
        })
      ).done
    ) {
      setSubmitting(true);
      const url = new URL(window.location.origin);
      url.pathname = "/auth/forget/change";
      url.searchParams.set("email", email);
      router.push(url.href);
    }
  };
  return (
    <div className="grid sm:justify-items-center lg:h-[calc(100vh_-_6rem_-_58px)] lg:[grid-template-columns:0.6fr_1fr]">
      <div className="flex w-full max-w-xl lg:sticky lg:top-[105px]">
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
            Reset Password
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            We will send you a password reset link to your Email.
          </p>
          <div className="my-5 lg:font-medium">
            Remember password{" "}
            <Link className="text-blue-500 underline" href={"/auth/login"}>
              Login here
            </Link>
            .
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-xl flex-col justify-center">
        <div className="lg:rounded-2xl lg:px-8 lg:py-9 lg:dark:bg-[#0c0c25]">
          <h2 className="mb-6 text-lg font-medium">
            Enter your Email to forget password.
          </h2>
          <div>
            {error != "" && (
              <div className="mt-[-10px] text-red-500">{error}</div>
            )}
          </div>
          <form className="my-6 flex flex-col gap-5 lg:my-3" onSubmit={submit}>
            <InputBox
              name="Email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              value={email}
              autoComplete="email"
              type="email"
              disabled={submitting}
            />

            <Button
              className={`dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-800 ${
                submitting ? "opacity-60" : "opacity-100"
              }`}
            >
              {submitting ? <Spinner /> : <></>}Forget password
            </Button>
          </form>
        </div>

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

export default function RegisterWithCaptcha(props: { email?: string }) {
  return (
    <ReCaptchaProvider>
      <Page email={props.email} />
    </ReCaptchaProvider>
  );
}
