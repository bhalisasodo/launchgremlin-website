import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { getSeoDataForPage } from '../../utils/seoData';

export default function Breadcrumbs({ pageKey, onSelectTab }) {
  const pageData = getSeoDataForPage(pageKey);
  if (!pageData || !pageData.breadcrumbs || pageData.breadcrumbs.length <= 1) {
    return null;
  }

  const handleClick = (e, itemPath) => {
    e.preventDefault();
    if (!onSelectTab) return;
    
    if (itemPath === '/') {
      onSelectTab('home');
    } else {
      const tabName = itemPath.replace('/', '');
      onSelectTab(tabName);
    }
  };

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className="max-w-7xl mx-auto px-4 sm:px-6 pt-3 sm:pt-4 pb-1 overflow-hidden"
    >
      <ol className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono text-zinc-400 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
        {pageData.breadcrumbs.map((crumb, index) => {
          const isLast = index === pageData.breadcrumbs.length - 1;
          const relativePath = crumb.item.replace('https://launchgremlin.com', '') || '/';

          return (
            <li key={crumb.item} className="flex items-center gap-1.5 shrink-0">
              {index > 0 && <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />}
              
              {isLast ? (
                <span
                  aria-current="page"
                  className="text-emerald-400 font-semibold truncate max-w-[220px] sm:max-w-none"
                >
                  {crumb.name}
                </span>
              ) : (
                <a
                  href={relativePath}
                  onClick={(e) => handleClick(e, relativePath)}
                  className="hover:text-white transition-colors flex items-center gap-1 text-zinc-400"
                >
                  {index === 0 && <Home className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                  <span>{crumb.name}</span>
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
