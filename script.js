let noticeTimer;
document.querySelectorAll('[data-instagram]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const status = document.getElementById('ticket-status');
    status.textContent = 'Instagram coming soon.';
    status.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => status.classList.remove('visible'), 4000);
  });
});

const bioDialog = document.querySelector('.cast-dialog');
let previousOverflow = '';
document.querySelectorAll('.cast-photo-button, .creative-bio-button').forEach(button => {
  button.addEventListener('click', () => {
    const portrait = button.querySelector('img');
    const modalPortrait = bioDialog.querySelector('.bio-portrait');
    const portraitSource = portrait?.src || button.dataset.portrait;
    const name = button.dataset.name || portrait?.alt || button.textContent.trim();
    modalPortrait.hidden = !portraitSource;
    bioDialog.classList.toggle('without-portrait', !portraitSource);
    bioDialog.classList.toggle('creative-dialog', button.classList.contains('creative-bio-button'));
    if (portraitSource) {
      modalPortrait.src = portraitSource;
      modalPortrait.alt = name;
    } else {
      modalPortrait.removeAttribute('src');
      modalPortrait.alt = '';
    }
    const role = document.getElementById(`cast-bio-${button.dataset.bio}`).dataset.role;
    bioDialog.querySelector('h2').textContent = name + (role ? ` (${role})` : '');
    bioDialog.querySelector('.bio-text').replaceChildren(document.getElementById(`cast-bio-${button.dataset.bio}`).content.cloneNode(true));
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    bioDialog.showModal();
    bioDialog.scrollTop = 0;
  });
});
bioDialog.querySelector('.bio-close').addEventListener('click', () => bioDialog.close());
bioDialog.addEventListener('click', event => {
  const r = bioDialog.getBoundingClientRect();
  if(event.target === bioDialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) bioDialog.close();
});
bioDialog.addEventListener('close', () => {document.body.style.overflow = previousOverflow;});
