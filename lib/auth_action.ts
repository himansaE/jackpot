import React, { ReactNode, SetStateAction } from "react";

type AuthActionProps = {
  submitting: boolean;
  setSubmitting: (value: SetStateAction<boolean>) => void;
  setError: (value: SetStateAction<ReactNode>) => void;
  validate: () => boolean;
  recaptcha_name: string;
  body: { [key: string]: string };
  executeRecaptcha: (action: string) => Promise<string>;
  action_path: string;
};
export const AuthAction = async ({
  setError,
  setSubmitting,
  submitting,
  validate,
  executeRecaptcha,
  action_path,
  body,
  recaptcha_name,
}: AuthActionProps) => {
  if (submitting) return;
  setSubmitting(true);
  setError("");

  if (!validate()) return setSubmitting(false);
  let token;
  try {
    token = await executeRecaptcha(recaptcha_name);
  } catch (err) {}

  if (token == undefined) {
    setSubmitting(false);
    return setError("Recaptcha has not been loaded. Try reload the page.");
  }
  try {
    const res = await fetch(action_path, {
      method: "POST",
      body: JSON.stringify({
        token,
        ...body,
      }),
    }).then((r) => r.json());

    if (res.done) {
      return window.location.assign("/dashboard");
    } else
      setError(
        (res.errors as string[]).map((i, n) =>
          React.createElement("div", { key: n }, i),
        ),
      );
  } catch {}
  setSubmitting(false);
};
