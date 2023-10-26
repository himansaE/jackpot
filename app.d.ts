/// <reference types="lucia" />
declare namespace Lucia {
  export type Auth = import("./app/api/auth/lucia").Auth;
  export type DatabaseUserAttributes = {
    id?: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    phoneValidated?: boolean;
    emailValidated?: boolean;
    image?: String?;
    acc_bal: number;
    providers: string[];
  };
  export type Session = {
    user: User;
    sessionId: string;
    activePeriodExpiresAt: Date;
    idlePeriodExpiresAt: Date;
    state: "idle" | "active";
    fresh: boolean;
  };
  export type User = {
    userId: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    phoneValidated?: boolean;
    emailValidated?: boolean;
    image?: string;
    acc_bal: number;
  };
  type Key = Readonly<{
    userId: string;
    providerId: string;
    providerUserId: string;
    passwordDefined: boolean;
  }>;
  type DatabaseSessionAttributes = {};
}
