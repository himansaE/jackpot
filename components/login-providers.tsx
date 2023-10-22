import Center from "./ui/center";
import { ProviderButton } from "./ui/provider-button";

export const LoginProviders = (props: { type: "up" | "in" }) => {
  return (
    <div>
      <Center className="flex flex-col gap-5">
        <ProviderButton
          name="Google"
          type={props.type}
          icon="/static/images/g_logo.svg"
          link="/api/auth/google"
        />
        <ProviderButton
          name="Apple"
          type={props.type}
          icon="/static/images/apple_logo.svg"
          link="/api/auth/facebook"
        />
      </Center>
    </div>
  );
};
