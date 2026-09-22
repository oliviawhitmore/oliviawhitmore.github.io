const chapterData = {
  paris: {
    place: 'Paris, France',
    date: 'Dates to confirm',
    marker: 'P',
    title: 'An international education in the city that shaped me.',
    copy: 'I studied at the American School of Paris, École Jeannine Manuel Paris, and The American University of Paris. French roots and international classrooms taught me to listen closely, adapt quickly, and work across different perspectives.',
    tags: ['International perspective', 'Adaptability', 'Curiosity']
  },
  sourcea: {
    place: 'Paris, France',
    date: 'Before 2022 · Exact dates to confirm',
    marker: '42',
    title: 'Building Sourcea from an idea into a 42-store business.',
    copy: 'I founded and scaled Sourcea across prominent city locations before the pandemic forced a difficult restructuring. The experience sharpened how I think about growth, operating discipline, people, and risk.',
    tags: ['Founder experience', 'Retail operations', 'Commercial judgment']
  },
  us: {
    place: 'United States',
    date: 'August 2022',
    marker: 'US',
    title: 'Starting again in a market I had only visited before.',
    copy: 'I relocated to the United States through the EB-5 program in August 2022. Living here was very different from business travel. I treated the move as a doorway into a larger market—not the beginning of my professional life.',
    tags: ['Market transition', 'Cultural fluency', 'Rebuilding systems']
  },
  now: {
    place: 'United States',
    date: 'Current chapter',
    marker: 'N',
    title: 'Preparing projects, evaluating opportunities, and connecting people.',
    copy: 'My current work centers on early project preparation, opportunity evaluation, and thoughtful talent coordination—helping experienced people reach the conversations where their judgment can create value.',
    tags: ['Project preparation', 'Opportunity evaluation', 'Talent coordination']
  }
};

const chapterTabs = [...document.querySelectorAll('.chapter-tab')];
const panel = document.getElementById('chapter-panel');
const panelPlace = document.getElementById('chapter-place');
const panelDate = document.getElementById('chapter-date');
const panelMarker = document.getElementById('chapter-marker');
const panelTitle = document.getElementById('chapter-title');
const panelCopy = document.getElementById('chapter-copy');
const panelTags = document.getElementById('chapter-tags');

function activateChapter(tab) {
  const data = chapterData[tab.dataset.key];
  if (!data) return;
  chapterTabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
  panel.setAttribute('aria-labelledby', tab.id);
  panelPlace.textContent = data.place;
  panelDate.textContent = data.date;
  panelMarker.textContent = data.marker;
  panelTitle.textContent = data.title;
  panelCopy.textContent = data.copy;
  panelTags.replaceChildren(...data.tags.map((tag) => {
    const span = document.createElement('span');
    span.textContent = tag;
    return span;
  }));
}

chapterTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateChapter(tab));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % chapterTabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + chapterTabs.length) % chapterTabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = chapterTabs.length - 1;
    chapterTabs[next].focus();
    activateChapter(chapterTabs[next]);
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('in-view'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const progressBar = document.getElementById('scroll-progress-bar');
function updateProgress() {
  const available = document.documentElement.scrollHeight - window.innerHeight;
  const percent = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 0;
  progressBar.style.width = `${percent}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const dialog = document.getElementById('photo-dialog');
const dialogImage = document.getElementById('dialog-image');
document.querySelectorAll('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    dialogImage.src = button.dataset.photo;
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
