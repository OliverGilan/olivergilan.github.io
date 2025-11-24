import { Rss } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
}

export const Header = ({ currentPath = '/' }: HeaderProps) => {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/blog', label: 'Blog' },
    { href: '/stream', label: 'Stream' },
    { href: '/blogroll', label: 'Blogroll' },
    { href: '/books', label: 'Books' },
    { href: '/rss.xml', label: 'RSS', icon: Rss },
  ];

  return (
    <header className="border-b border-gray-200 mb-8">
      <nav className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
            Oliver Gilan
          </a>
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.href;
              
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {Icon && <Icon size={16} />}
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};
