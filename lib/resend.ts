import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailProps = {
  to: string[];
  react: JSX.Element;
  subject: string;
};

export const sendEmail = async (props: SendEmailProps) => {
  try {
    await resend.emails.send({
      from: "Jackpot <onboarding@resend.dev>",
      to: props.to,
      subject: props.subject,
      react: props.react,
    });
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return false;
};
