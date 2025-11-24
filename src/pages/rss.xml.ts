import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });
  
  const stream = await getCollection('stream', ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  const allPosts = [...blog, ...stream].sort((a, b) => 
    b.data.date.getTime() - a.data.date.getTime()
  );

  return rss({
    title: 'Oliver Gilan',
    description: 'Personal blog and thoughts on technology, engineering, and life',
    site: context.site || 'https://olivergilan.com',
    items: allPosts.map((post) => {
      const section = blog.includes(post as any) ? 'blog' : 'stream';
      
      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || '',
        link: `/${section}/${post.slug}/`,
      };
    }),
    customData: '<language>en-us</language>',
  });
}
