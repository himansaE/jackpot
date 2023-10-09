import { inter } from "@/lib/fonts";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className=" my-5">
      <h1 className={`${inter.className} m-10 mb-1 text-2xl font-bold`}>
        Recent Lottery Results
      </h1>
      <div className="flex flex-wrap justify-center">{children}</div>
    </section>
  );
}
