"use client";
import Link from "next/link";

export const FormErrorText = (errors: string[], link: [string, string]) => {
  return (
    <div>
      {errors.map((i, n) => (
        <div key={`${i}${n}`}>{i}</div>
      ))}
      {link ? (
        <Link className="text-sm text-blue-500 underline" href={link[1]}>
          {link[0]}
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};
