/**
 * Manually include this script in head, which is injected by next-themes in #root to avoid flickering
 * The script injected by next-themes isn't working for some reason
 */

try {
  document.documentElement.classList.remove('light', 'dark');

  const theme = localStorage.getItem('theme');

  if (!theme || theme === 'system') {
    const query = '(prefers-color-scheme: dark)';
    const match = window.matchMedia(query);

    if (match.matches || match.media !== query) {
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.style.colorScheme = 'light';
      document.documentElement.classList.add('light');
    }
  } else if (theme) {
    document.documentElement.classList.add(theme || '');
  }

  if (theme === 'light' || theme === 'dark') {
    document.documentElement.style.colorScheme = theme;
  }
} catch (e) {
  console.error(e);
}
