import { GithubIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/olivergilan',
    icon: GithubIcon,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/oliver-gilan/',
    icon: LinkedinIcon,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/olivergilan',
    icon: TwitterIcon,
  },
];

export const SocialLinks = () => {
  return (
    <div className="flex items-center gap-4">
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label={social.name}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
};
