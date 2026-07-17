// Scroll animation observer — wires up IntersectionObserver + MutationObserver
// outside React lifecycle. Imported in main.tsx only for the portfolio route
// (not admin). The MutationObserver catches React-rendered elements after data
// fetch; a WeakSet prevents double-queuing; the 120ms setTimeout ensures the
// browser paints the hidden state before the observer fires.

const queued = new WeakSet<Element>();

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' },
);

function schedule(el: Element) {
  if (queued.has(el)) return;
  queued.add(el);
  // Delay so the browser paints the hidden state before the observer fires
  setTimeout(() => io.observe(el), 120);
}

function scanAndQueue() {
  document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(schedule);
}

const mo = new MutationObserver(scanAndQueue);
mo.observe(document.body, { childList: true, subtree: true });
scanAndQueue();

export {};