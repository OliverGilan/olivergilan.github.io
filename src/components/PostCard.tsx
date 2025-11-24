interface PostCardProps {
  title: string;
  slug: string;
  date: Date;
  description?: string | null | undefined;
  href: string;
}

export const PostCard = ({ title, date, description, href }: PostCardProps) => {
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="border-b border-gray-200 pb-6 mb-6 last:border-b-0">
      <a href={href} className="group">
        <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
          {title}
        </h2>
      </a>
      <time className="text-sm text-gray-500 mb-2 block">{formattedDate}</time>
      {description && (
        <p className="text-gray-700 leading-relaxed">{description}</p>
      )}
    </article>
  );
};
