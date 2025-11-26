import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export const GET = (context: APIContext) =>
  rss({
    title: "Oliver Gilan",
    description: "Personal blog and thoughts by Oliver Gilan",
    site: context.site!,
    items: [],
    customData: `<language>en-us</language>`,
  });
