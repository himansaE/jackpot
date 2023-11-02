export const URLWithParams = (path: string, params: [string, string][]) => {
  const url = new URL(process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "");
  url.pathname = path;
  params.forEach((i) => {
    url.searchParams.set(i[0], i[1]);
  });
  return url;
};
