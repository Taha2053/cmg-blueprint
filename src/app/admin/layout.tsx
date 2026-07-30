'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Newspaper,
  Briefcase,
  Users,
  Mail,
  FileText,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'News', href: '/admin/news', icon: Newspaper },
  { label: 'Articles', href: '/admin/articles', icon: FileText },
  { label: 'Careers', href: '/admin/careers', icon: Briefcase },
  { label: 'Subscribers', href: '/admin/subscribers', icon: Users },
  { label: 'Messages', href: '/admin/messages', icon: Mail },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-dark flex">
      <aside className="w-64 bg-card border-r border-card-border flex flex-col shrink-0">
        <div className="p-6 border-b border-card-border">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="text-white text-xs font-bold">MG</span>
            </div>
            <div className="flex flex-col">
              <span className="text-text-primary text-sm font-bold tracking-wide">MG & ASSOCIÉS</span>
              <span className="text-text-muted text-[9px] tracking-wider">ADMIN</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200',
                  isActive
                    ? 'bg-accent/10 text-accent border-l-2 border-accent'
                    : 'text-text-muted hover:text-text-primary hover:bg-card-border/50',
                )}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-card-border">
          <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-3 px-4 py-3 text-sm text-text-muted hover:text-text-primary transition-colors w-full"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
