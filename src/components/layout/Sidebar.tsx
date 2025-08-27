import React from 'react';
import { useSidebar } from '@/components/ui/sidebar';

interface DashboardSidebarProps {
  userRole?: string;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userRole }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <button onClick={toggleSidebar} className="mt-2 text-sm">
          Toggle Sidebar
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li>
            <a href="/dashboard" className="block p-2 hover:bg-gray-700">
              Homee
            </a>
          </li>
          {userRole === 'STUDENT' && (
            <>
              <li>
                <a href="/dashboard/student/profile" className="block p-2 hover:bg-gray-700">
                  Profile
                </a>
              </li>
              <li>
                <a href="/dashboard/student/find-tutor" className="block p-2 hover:bg-gray-700">
                  Find Tutor
                </a>
              </li>
            </>
          )}
          {userRole === 'TUTOR' && (
            <>
              <li>
                <a href="/dashboard/tutor/profile" className="block p-2 hover:bg-gray-700">
                  Profile
                </a>
              </li>
              <li>
                <a href="/dashboard/tutor/view-classes" className="block p-2 hover:bg-gray-700">
                  View Classes
                </a>
              </li>
            </>
          )}
          {userRole === 'ADMIN' && (
            <>
              <li>
                <a href="/dashboard/admin/users" className="block p-2 hover:bg-gray-700">
                  User Management
                </a>
              </li>
              <li>
                <a href="/dashboard/admin/tutor-applications" className="block p-2 hover:bg-gray-700">
                  Tutor Applications
                </a>
              </li>
              <li>
                <a href="/dashboard/admin/analytics" className="block p-2 hover:bg-gray-700">
                  System Analytics
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
