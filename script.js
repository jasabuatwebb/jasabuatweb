// Mode terang atau gelap
const root = document.documentElement;
const themeBtn = document.getElementById('theme');
const saved = localStorage.getItem('theme');
const startDark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
setTheme(startDark);
themeBtn.addEventListener('click', () => setTheme(root.dataset.theme !== 'dark'));

// Menu mobile
const menu = document.getElementById('menu');
const nav = document.getElementById('nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
});

// Animasi muncul saat di-scroll (termasuk bilah skill)
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      en.target.classList.add('show');
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Menu aktif mengikuti bagian yang sedang dilihat
const links = document.querySelectorAll('nav a');
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) {
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => spy.observe(s));

// Filter portofolio
const buttons = document.querySelectorAll('.filters button');
const works = document.querySelectorAll('.work');
buttons.forEach((btn) => {
  btn.addEventListener('click', () => {
    buttons.forEach((b) => b.setAttribute('aria-pressed', b === btn));
    works.forEach((w) => {
      w.hidden = !(btn.dataset.f === 'all' || w.dataset.c === btn.dataset.f);
    });
  });
});

// Formulir kontak -> WhatsApp
const NOMOR_WA = '628995687843';
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const teks =
    `Halo AZR Webworks, saya ${f.get('nama')}.\n` +
    `Saya ingin membuat: ${f.get('jenis')}.\n` +
    (f.get('pesan') ? `Kebutuhan: ${f.get('pesan')}` : '');
  window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`, '_blank', 'noopener');
});