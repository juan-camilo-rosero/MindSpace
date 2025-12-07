import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Smile, Clock, Settings } from 'lucide-react';
import clsx from 'clsx';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      clsx(
        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
        isActive
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
      )
    }
  >
    <Icon size={20} />
    <span>{label}</span>
  </NavLink>
);

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col p-6">
        <div className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-gray-800">MindSpace</span>
        </div>

        <nav className="space-y-1 flex-1">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/tasks" icon={CheckSquare} label="Tasks" />
          <NavItem to="/mood" icon={Smile} label="Mood Tracker" />
          <NavItem to="/focus" icon={Clock} label="Focus Timer" />
        </nav>

        <div className="pt-4 border-t border-gray-100">
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Mobile Header (visible only on small screens) */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-gray-100 p-4 z-10 flex items-center justify-between">
         <span className="text-lg font-bold text-gray-800">MindSpace</span>
         {/* Mobile menu toggle would go here */}
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="container mx-auto px-4 py-8 md:p-8 max-w-6xl">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around p-3 z-10">
          <NavLink to="/" className={({isActive}) => clsx("p-2 rounded-lg", isActive ? "text-primary" : "text-gray-400")}>
            <LayoutDashboard size={24} />
          </NavLink>
          <NavLink to="/tasks" className={({isActive}) => clsx("p-2 rounded-lg", isActive ? "text-primary" : "text-gray-400")}>
            <CheckSquare size={24} />
          </NavLink>
          <NavLink to="/mood" className={({isActive}) => clsx("p-2 rounded-lg", isActive ? "text-primary" : "text-gray-400")}>
            <Smile size={24} />
          </NavLink>
          <NavLink to="/focus" className={({isActive}) => clsx("p-2 rounded-lg", isActive ? "text-primary" : "text-gray-400")}>
            <Clock size={24} />
          </NavLink>
      </nav>
    </div>
  );
}
