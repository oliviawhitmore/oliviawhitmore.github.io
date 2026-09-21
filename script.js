
    const stages = {
      paris: {
        kicker: 'Paris, France', status: 'Dates to confirm',
        title: 'Learning across cultures, in the city that shaped me.',
        copy: 'Born in Paris, I studied at the American School of Paris, École Jeannine Manuel Paris, and The American University of Paris. That combination of French roots and international classrooms shaped how I listen, adapt, and work across different perspectives.',
        tags: ['International perspective', 'Adaptability', 'Curiosity']
      },
      sourcea: {
        kicker: 'Founder · Paris', status: 'Founding year to confirm',
        title: 'Building Sourcea — and learning the full weight of ownership.',
        copy: 'I founded the fashion brand Sourcea in Paris and grew it to a peak of 42 stores across prominent city locations. When the pandemic closed every store while rent and payroll continued, I carried the business as long as possible before seeking bankruptcy protection. It remains one of my clearest lessons in responsibility, resilience, and timing.',
        tags: ['Entrepreneurship', 'Retail operations', 'Decision-making under pressure']
      },
      usa: {
        kicker: 'United States', status: 'Documented · August 2022',
        title: 'Starting again in a market I had only visited before.',
        copy: 'I relocated to the United States through the EB-5 program in August 2022. Living here was very different from business travel: language in real meetings, commercial culture, banking, housing, transportation, and healthcare all required new fluency. I treated the move as a doorway into a larger market, not the beginning of my professional life.',
        tags: ['Market transition', 'Cultural fluency', 'Rebuilding systems']
      },
      now: {
        kicker: 'Current work', status: 'Public brand details pending',
        title: 'Preparing the platform, evaluating opportunities, connecting people.',
        copy: 'Today I support the preparation and forward movement of a long-term project. My work centers on evaluating opportunities, coordinating early-stage activity, and introducing experienced professionals to the appropriate project leaders. The permanent public brand and detailed project materials will be added only after they are finalized.',
        tags: ['Project preparation', 'Opportunity evaluation', 'Talent coordination']
      }
    };

    const typingPhrases = ['Founder.', 'Opportunity evaluator.', 'Project connector.', 'Building the next chapter.'];
    const typingEl = document.getElementById('typing');
    let phraseIndex = 0, charIndex = typingPhrases[0].length, deleting = true;
    function typeLoop() {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { typingEl.textContent = typingPhrases[0]; return; }
      const phrase = typingPhrases[phraseIndex];
      charIndex += deleting ? -1 : 1;
      typingEl.textContent = phrase.slice(0, charIndex);
      let delay = deleting ? 42 : 72;
      if (!deleting && charIndex === phrase.length) { deleting = true; delay = 1450; }
      else if (deleting && charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % typingPhrases.length; delay = 360; }
      setTimeout(typeLoop, delay);
    }
    setTimeout(typeLoop, 1100);

    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    function renderStage(key, scroll = false) {
      const data = stages[key];
      document.querySelectorAll('.timeline-tab').forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.stage === key)));
      const panel = document.getElementById('timeline-panel');
      panel.animate([{opacity:.45, transform:'translateY(7px)'},{opacity:1, transform:'translateY(0)'}], {duration:320, easing:'ease-out'});
      document.getElementById('stage-kicker').textContent = data.kicker;
      document.getElementById('stage-status').textContent = data.status;
      document.getElementById('stage-title').textContent = data.title;
      document.getElementById('stage-copy').textContent = data.copy;
      document.getElementById('stage-tags').innerHTML = data.tags.map(tag => `<span class="rounded-full bg-white/[.055] px-3 py-2 text-[11px] text-white/62">${tag}</span>`).join('');
      if (scroll) document.getElementById('journey').scrollIntoView({behavior:'smooth', block:'start'});
    }
    document.querySelectorAll('.timeline-tab').forEach(tab => tab.addEventListener('click', () => renderStage(tab.dataset.stage)));
    document.querySelectorAll('[data-jump]').forEach(card => card.addEventListener('click', () => renderStage(card.dataset.jump, true)));

    document.querySelectorAll('[data-magnetic]').forEach(button => {
      button.addEventListener('mousemove', event => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * .12}px, ${y * .12}px)`;
      });
      button.addEventListener('mouseleave', () => button.style.transform = 'translate(0,0)');
    });

    const modal = document.getElementById('photo-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = () => { modal.hidden = true; document.body.style.overflow = ''; };
    document.querySelectorAll('[data-photo-src]').forEach(photo => photo.addEventListener('click', () => {
      modalImage.src = photo.querySelector('img').src; modalImage.alt = photo.dataset.alt; modal.hidden = false; document.body.style.overflow = 'hidden'; document.getElementById('modal-close').focus();
    }));
    document.getElementById('modal-close').addEventListener('click', closeModal);
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });

    const toast = document.getElementById('toast');
    document.getElementById('intro-form').addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('visitor-name').value.trim();
      const context = document.getElementById('visitor-context').value;
      const message = document.getElementById('visitor-message').value.trim();
      const subject = encodeURIComponent(`${context}${name ? ` — ${name}` : ''}`);
      const body = encodeURIComponent(`${name ? `Hello Olivia,\n\nMy name is ${name}. ` : 'Hello Olivia,\n\n'}${message || 'I would like to connect.'}\n\nBest,\n${name}`);
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
      window.location.href = `mailto:oliviawhitmore2026@outlook.com?subject=${subject}&body=${body}`;
    });
