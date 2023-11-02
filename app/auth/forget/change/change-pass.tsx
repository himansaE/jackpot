"use client";
import { Button } from "@/components/ui/button";
import { InputBox, InputBoxWithRef } from "@/components/ui/input-box";
import Spinner from "@/components/ui/spinner";
import Link from "next/link";
import { FormEvent, ReactNode, useState } from "react";
import { ReCaptchaProvider, useReCaptcha } from "next-recaptcha-v3";
import Image from "next/image";
import { AuthAction } from "@/lib/auth_action";
import { URLWithParams } from "@/lib/utils-client";
import { useMask } from "@react-input/mask";
import { useRouter } from "next/navigation";

export function Page(props: { email: string }) {
  const { executeRecaptcha } = useReCaptcha();
  const inputRef = useMask({
    mask: "_ _ _ _ _ _",
    replacement: { _: /\d/ },
  });

  const [otp, setOTP] = useState("");
  const [pass, setPass] = useState("");
  const [conf_pass, setConfPass] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ReactNode>("");
  const [token, setToken] = useState("");
  const [stage, setStage] = useState<"validate" | "change">("validate");

  const router = useRouter();

  const validate_otp = () => {
    if (!/^\d \d \d \d \d \d$/gm.test(otp)) {
      setError("OTP code is invalid.");
      return false;
    }
    return true;
  };

  const validate_pass = () => {
    if (pass != conf_pass) {
      setError(
        "Please make sure the new password and re-entered password match",
      );
      return false;
    }
    return true;
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (stage == "validate") {
      const res = await AuthAction({
        setError,
        setSubmitting,
        submitting,
        validate: validate_otp,
        executeRecaptcha,
        action_path: "/api/auth/forget/validate-otp",
        type: "return",
        recaptcha_name: "otp_validate",
        body: { otp: otp.split(" ").join(""), email: props.email ?? "" },
      });
      if (!res) return;
      if (res.done) {
        setSubmitting(false);
        setToken(res.token);
        setStage("change");
      }
    }
    if (stage == "change") {
      const res = await AuthAction({
        setError,
        setSubmitting,
        submitting,
        validate: validate_pass,
        executeRecaptcha,
        action_path: "/api/auth/forget/change-pass",
        type: "return",
        recaptcha_name: "reset_pass",
        body: {
          otp: otp.split(" ").join(""),
          email: props.email ?? "",
          pass,
          reset_token: token,
        },
      });
      if (!res) return;
      if (res.done) {
        setSubmitting(true);
        router.push("/auth/login");
      }
      if (res.reenter) setStage("validate");
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
            Change Password
          </h1>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            We sent you a password reset OTP code to your Email.
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
          {(() => {
            switch (stage) {
              case "validate":
                return (
                  <>
                    <h2 className="text-lg font-medium">
                      Enter the OTP code for {props.email}
                    </h2>
                    <p className="mb-6 text-sm dark:text-gray-400">
                      Didn&apos;t go to the code.{" "}
                      <Link
                        href={URLWithParams("/auth/forget", [
                          ["email", props.email],
                        ])}
                        className="text-blue-500 underline"
                      >
                        Resend code
                      </Link>
                      .
                    </p>
                    <div>
                      {error != "" && (
                        <div className="mt-[-10px] text-red-500">{error}</div>
                      )}
                    </div>
                    <form
                      className="my-6 flex flex-col gap-5 lg:my-3"
                      onSubmit={submit}
                    >
                      <InputBoxWithRef
                        name="OTP code"
                        onChange={(e) => {
                          setOTP(e.target.value);
                          if (/^\d \d \d \d \d \d$/gm.test(e.target.value)) {
                            e.target.setCustomValidity("");
                          }
                        }}
                        onInvalid={(e) => {
                          (e.target as HTMLInputElement).setCustomValidity(
                            "Invalid OTP code.",
                          );
                        }}
                        placeholder="Enter OTP code"
                        value={otp}
                        autoComplete="one-time-code"
                        inputMode="numeric"
                        type="text"
                        disabled={submitting}
                        pattern="\d\s\d\s\d\s\d\s\d\s\d"
                        ref={inputRef}
                        required
                      />

                      <Button
                        className={`dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-800 ${
                          submitting ? "opacity-60" : "opacity-100"
                        }`}
                      >
                        {submitting ? <Spinner /> : <></>}Submit
                      </Button>
                    </form>
                  </>
                );
              case "change":
                return (
                  <>
                    <h2 className="mb-6 text-lg font-medium">
                      Change password for {props.email}
                    </h2>
                    <div>
                      {error != "" && (
                        <div className="mt-[-10px] text-red-500">{error}</div>
                      )}
                    </div>
                    <form
                      className="my-6 flex flex-col gap-5 lg:my-3"
                      onSubmit={submit}
                    >
                      <input
                        value={props.email}
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="username"
                        readOnly
                        className="invisible absolute"
                      />
                      <InputBox
                        name="Password"
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="New Password"
                        value={pass}
                        autoComplete="new-password"
                        disabled={submitting}
                        type="password"
                      />
                      <InputBox
                        name="Conform Password"
                        onChange={(e) => setConfPass(e.target.value)}
                        placeholder="Conform new Password"
                        value={conf_pass}
                        autoComplete="new-password"
                        type="password"
                        disabled={submitting}
                      />
                      <Button
                        className={`dark:bg-indigo-700 dark:text-white dark:hover:bg-indigo-800 ${
                          submitting ? "opacity-60" : "opacity-100"
                        }`}
                      >
                        {submitting ? <Spinner /> : <></>}Submit
                      </Button>
                    </form>
                  </>
                );
            }
          })()}
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

export default function ChangePassWithCaptcha(props: { email: string }) {
  return (
    <ReCaptchaProvider>
      <Page email={props.email} />
    </ReCaptchaProvider>
  );
}
