(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const data = window.COEI_CONTENT;
  if (!data) return;
  const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const safeLink = (value) => {
    try {
      const url = new URL(value, window.location.href);
      return ['http:', 'https:', 'file:'].includes(url.protocol) ? escape(value) : '';
    } catch { return ''; }
  };

  const nav = document.querySelector('.primary-nav');
  const menu = document.querySelector('.menu-toggle');
  const closeMenu = () => { nav.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });
  window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

  const tabs = document.querySelector('#program-tabs');
  const panels = document.querySelector('#program-panels');
  tabs.setAttribute('role', 'tablist');
  tabs.innerHTML = data.program.map((day, index) => `<button type="button" role="tab" id="tab-${escape(day.id)}" aria-controls="panel-${escape(day.id)}" aria-selected="${index === 0}" tabindex="${index === 0 ? '0' : '-1'}" class="program-tab"><span class="tab-day">${escape(day.weekday)}</span><span class="tab-date">${escape(day.date)}</span><span class="tab-title">${escape(day.title)}</span></button>`).join('');
  panels.innerHTML = data.program.map((day, index) => `<section role="tabpanel" tabindex="0" id="panel-${escape(day.id)}" aria-labelledby="tab-${escape(day.id)}" class="program-panel" ${index ? 'hidden' : ''}><h3>${escape(day.weekday)}, ${escape(day.date)} — ${escape(day.title)}</h3><table class="agenda" aria-label="${escape(day.date)} agenda"><thead><tr><th scope="col">Time · UTC+3</th><th scope="col">Session</th></tr></thead><tbody>${day.sessions.map(([time, title]) => `<tr><td><time>${escape(time)}</time></td><td><span class="session-title">${escape(title)}</span></td></tr>`).join('')}</tbody></table></section>`).join('');
  const tabButtons = [...tabs.querySelectorAll('[role="tab"]')];
  const activateTab = (nextIndex, focus = false) => {
    tabButtons.forEach((button, index) => {
      const active = index === nextIndex;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      document.getElementById(button.getAttribute('aria-controls')).hidden = !active;
    });
    if (focus) tabButtons[nextIndex].focus();
  };
  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(index));
    button.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabButtons.length;
      if (event.key === 'ArrowLeft') next = (index - 1 + tabButtons.length) % tabButtons.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabButtons.length - 1;
      if (next !== undefined) { event.preventDefault(); activateTab(next, true); }
    });
  });

  const organizerGroups = new Map();
  data.organizers.forEach((person) => {
    const role = person.role || 'Organizing Committee';
    if (!organizerGroups.has(role)) organizerGroups.set(role, []);
    organizerGroups.get(role).push(person);
  });
  document.querySelector('#organizer-grid').innerHTML = [...organizerGroups].map(([role, people]) => `<div class="organizer-role-group"><h3 class="organizer-role-heading">${escape(role)}</h3><div class="organizer-role-grid">${people.map((person) => `<article class="person-card"><h4>${person.title ? `${escape(person.title)} ` : ''}${escape(person.name)}</h4><p class="person-affiliation">${escape(person.affiliation)}</p></article>`).join('')}</div></div>`).join('');

  if (data.speakers?.length) {
    document.querySelector('#speaker-content').innerHTML = `<div class="speaker-grid">${data.speakers.map((person) => `<article class="speaker-card">${person.photo ? `<img class="speaker-photo" src="${safeLink(person.photo)}" alt="Portrait of ${escape(person.name)}" width="96" height="112" loading="lazy">` : ''}<div class="speaker-info"><h3>${escape(person.name)}</h3>${person.affiliation ? `<p>${escape(person.affiliation)}</p>` : ''}</div></article>`).join('')}</div>`;
  } else if (data.keynoteSpeakers.length || data.invitedSpeakers.length) {
    const renderGroup = (label, speakers) => speakers.length ? `<div class="speaker-list"><h3>${label}</h3>${speakers.map((person) => `<article>${person.photo ? `<img src="${safeLink(person.photo)}" alt="Portrait of ${escape(person.name)}" width="90" height="90" loading="lazy">` : ''}<h3>${escape(person.name)}</h3><p>${escape(person.affiliation)}</p>${person.title ? `<h4>${escape(person.title)}</h4>` : ''}${person.abstract ? `<p>${escape(person.abstract)}</p>` : ''}</article>`).join('')}</div>` : `<div><h3>${label}</h3><p>To be announced.</p></div>`;
    document.querySelector('#speaker-content').innerHTML = renderGroup('Keynote speakers', data.keynoteSpeakers) + renderGroup('Invited speakers', data.invitedSpeakers);
  }

  if ('IntersectionObserver' in window) {
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    links.forEach((link) => { const target = document.querySelector(link.hash); if (target) observer.observe(target); });
  }
})();
