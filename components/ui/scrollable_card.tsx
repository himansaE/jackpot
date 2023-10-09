"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect, ReactNode } from "react";

interface ScrollableCardProps {
  children: ReactNode;
}
export const ScrollableCard = (props: ScrollableCardProps) => {
  const [hide_left, setLeftHide] = useState(true);
  const [hide_right, setRightHide] = useState(true);

  const ref = useRef<SVGSVGElement>(null);

  const scrollEvent = () => {
    if (!ref.current?.parentElement) return;

    setRightHide(
      ref.current.parentElement.scrollLeft >=
        ref.current.parentElement.scrollWidth - document.body.offsetWidth
    );
    setLeftHide(ref.current.parentElement.scrollLeft <= 10);
  };
  const scrollBy = (left: boolean) => {
    if (!ref.current?.parentElement) return null;
    ref.current.parentElement.scrollBy({
      left: ref.current.parentElement.scrollLeft * (left ? 1 : -1),
      top: 0,
    });
  };

  useEffect(() => {
    if (ref.current) {
      scrollEvent();
      ref.current.parentElement?.addEventListener("scroll", scrollEvent);
      return scrollEvent;
    }
  }, []);

  return (
    <>
      <ChevronLeft
        className={`bg-[#7d7dbd99] absolute left-3 top-[50%] translate-y-[-50%] h-9 w-9 flex justify-center items-center rounded-full p-1.5 transition-all backdrop-blur-md cursor-pointer ${
          hide_left ? "scale-0" : "scale-100"
        }`}
        ref={ref}
        onClick={() => scrollBy(false)}
      />
      <ChevronRight
        className={`bg-[#7d7dbd99] absolute right-3 top-[50%] translate-y-[-50%] h-9 w-9 flex justify-center items-center rounded-full p-1.5 transition-all backdrop-blur-md cursor-pointer ${
          hide_right ? "scale-0" : "scale-100"
        }`}
        onClick={() => scrollBy(true)}
      />
      {props.children}
    </>
  );
};
