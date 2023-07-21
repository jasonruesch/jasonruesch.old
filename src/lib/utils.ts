export const isActive = (path: string, pathname: string): boolean => {
  return (
    (path === '/' && pathname === '/') ||
    (path !== '/' && pathname.startsWith(path))
  );
};

// Generate random easter egg ID for each user
export const getEasterEggId = () => {
  let easterEggId = localStorage.getItem('easterEggId');
  if (!easterEggId) {
    easterEggId = Math.random().toString(36).slice(2);
    localStorage.setItem('easterEggId', easterEggId);
  }

  return easterEggId;
};

export const easterEggId = getEasterEggId();
