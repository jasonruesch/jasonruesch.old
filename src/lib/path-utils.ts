// Generate random easter egg path

export const getEasterEggPath = () => {
  let easterEggPath = localStorage.getItem('easterEggPath');
  if (!easterEggPath) {
    easterEggPath = `/easter-egg-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('easterEggPath', easterEggPath);
  }

  return easterEggPath;
};

export const easterEggPath = getEasterEggPath();
