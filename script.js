let noticeTimer;
document.querySelectorAll('[data-ticket]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const status = document.getElementById('ticket-status');
    status.textContent = 'Ticket link coming soon.';
    status.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => status.classList.remove('visible'), 4000);
  });
});
