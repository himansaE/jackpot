"use client";
import { DotLottiePlayer } from "@dotlottie/react-player";
interface LottieProps {
  src: string;
  height?: string;
  width?: string;
}

export const Lottie = (props: LottieProps) => {
  return (
    <DotLottiePlayer
      src={props.src}
      autoplay
      className="h-64 w-64"
      loop
      style={{
        height: `${props.height ?? 300}px`,
        width: `${props.width ?? 300}px`,
        zIndex: -1
      }}
    />
  );
};
