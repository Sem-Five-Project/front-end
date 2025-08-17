import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Search,
  User,
  Calendar,
  BookOpen,
  Star,
  CreditCard,
  MessageCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();

  const studentItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Find Tutors',
      href: '/find-tutors',
      icon: Search,
    },
    {
      title: 'My Bookings',
      href: '/bookings',
      icon: Calendar,
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: MessageCircle,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: User,
    },
  ];

  const tutorItems: SidebarItem[] = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'My Classes',
      href: '/classes',
      icon: BookOpen,
    },
    {
      title: 'Schedule',
      href: '/schedule',
      icon: Calendar,
    },
    {
      title: 'Reviews',
      href: '/reviews',
      icon: Star,
    },
    {
      title: 'Earnings',
      href: '/earnings',
      icon: CreditCard,
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: MessageCircle,
    },
    {
      title: 'Profile',
      href: '/profile',
      icon: User,
    },
  ];

  const items = user?.userType === 'tutor' ? tutorItems : studentItems;

  return (
    <div className="hidden md:flex h-full w-64 flex-col fixed left-0 top-16 border-r bg-background">
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-1 px-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                router.pathname === item.href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.title}
              {item.badge && (
                <span className="ml-auto inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};