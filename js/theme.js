const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  const isDark = theme === 'dark';

  document.documentElement.dataset.theme = theme;

  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute(
      'aria-label',
      isDark ? 'Switch to light theme' : 'Switch to dark theme'
    );
  }
}

applyTheme(savedTheme || 'light');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.dataset.theme;
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}