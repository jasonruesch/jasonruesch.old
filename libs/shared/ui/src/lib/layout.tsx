import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

export function Layout({ children }: { children?: ReactNode }) {
  return (
    <div className="h-full flex min-h-screen flex-col">
      <header className="flex justify-center p-4">
        <nav className="flex gap-4 items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-cyan-500 dark:text-cyan-400' : ''
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-cyan-500 dark:text-cyan-400' : ''
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'text-cyan-500 dark:text-cyan-400' : ''
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? 'text-cyan-500 dark:text-cyan-400' : ''
            }
          >
            Projects
          </NavLink>
          <NavLink
            to="/privacy"
            className={({ isActive }) =>
              isActive ? 'text-cyan-500 dark:text-cyan-400' : ''
            }
          >
            Privacy
          </NavLink>
        </nav>
      </header>

      <main className="flex-1 px-4">{children}</main>

      <footer className="text-center p-4">
        Copyright &copy; {new Date().getFullYear()} Jason Ruesch. All rights
        reserved.
      </footer>
    </div>
  );
}

export default Layout;
