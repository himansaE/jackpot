"use client";
import { EmailOTPComponent } from "@/components/emails/otp";

export default function Home() {
  return (
    <div>
      <EmailOTPComponent
        email="himansa.2403@gmail.com"
        otp="232232"
        url="/app/auth/forget"
        name="Himansa Eshan"
      />
    </div>
  );
}
