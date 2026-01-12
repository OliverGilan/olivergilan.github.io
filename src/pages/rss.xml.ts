import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection, render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as getMdxRenderer } from "@astrojs/mdx";

export const GET = async (context: APIContext) => {
  const posts = await getCollection("blog", ({ data }) => !!data.date_published);

  const resolveThumbnailUrl = (thumbnail?: string | null) => {
    if (!thumbnail) return null;
    if (thumbnail.startsWith("http")) return thumbnail;
    const normalized = thumbnail.replace(/^\//, "");
    const path = normalized.startsWith("images/") ? normalized : `images/${normalized}`;
    return new URL(path, context.site).toString();
  };

  const getThumbnailMimeType = (thumbnail?: string | null) => {
    if (!thumbnail) return null;
    const extension = thumbnail.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "png":
        return "image/png";
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "webp":
        return "image/webp";
      case "gif":
        return "image/gif";
      default:
        return "image/*";
    }
  };

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date_published!).getTime() - new Date(a.data.date_published!).getTime()
  );

  // Set up container for rendering MDX content
  const renderers = await loadRenderers([getMdxRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const items = await Promise.all(
    sortedPosts.map(async (post) => {
      const { Content } = await render(post);
      const content = await container.renderToString(Content);

      const thumbnailUrl = resolveThumbnailUrl(post.data.thumbnail);
      const thumbnailMimeType = getThumbnailMimeType(post.data.thumbnail);

      return {
        title: post.data.title,
        pubDate: post.data.date_published!,
        description: post.data.description ?? "",
        link: `/${post.data.slug}/`,
        content,
        customData: thumbnailUrl
          ? `<media:content url="${thumbnailUrl}" medium="image" type="${thumbnailMimeType}" />
<media:thumbnail url="${thumbnailUrl}" />
<enclosure url="${thumbnailUrl}" type="${thumbnailMimeType}" length="0" />`
          : undefined,
      };
    })
  );

  return rss({
    title: "Oliver Gilan",
    description: "Personal blog and thoughts by Oliver Gilan",
    site: context.site!,
    items,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
    },
    customData: `<language>en-us</language>
<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml"/>
<image>
  <url>${context.site}images/baby_lion.png</url>
  <title>Oliver Gilan</title>
  <link>${context.site}</link>
</image>`,
  });
};
