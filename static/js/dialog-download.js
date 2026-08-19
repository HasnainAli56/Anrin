// dialog-download.js
(() => {
  const dialog = document.getElementById('genericDialog');
  if (!dialog) return;

  const titleEl = dialog.querySelector('#genericDialogTitle');
  const textEl  = dialog.querySelector('#genericDialogText');
  const btnPrimary   = dialog.querySelector('#genericDialogBtnPrimary');
  const btnSecondary = dialog.querySelector('#genericDialogBtnSecondary');
  const closeBtn     = dialog.querySelector('.dlg__close');

  let lastFocused = null;
  let restoreOverflow = '';

  // Utility: Dialog öffnen mit Scroll-Lock + Fokus
  function openDialog() {
    const docEl = document.documentElement;
    restoreOverflow = docEl.style.overflow || '';
    try { dialog.showModal(); } catch { dialog.setAttribute('open', ''); }
    docEl.style.overflow = 'hidden';

    // Fokus auf ersten sichtbaren Button
    (btnPrimary.offsetParent ? btnPrimary : btnSecondary).focus();
  }

  // Utility: Dialog schließen + Fokus zurück
  function closeDialog() {
    const docEl = document.documentElement;
    if (dialog.open) dialog.close();
    docEl.style.overflow = restoreOverflow;
    if (lastFocused) lastFocused.focus();
  }

  // Backdrop-Klick schließt
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const inside = (
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top  && e.clientY <= rect.bottom
    );
    if (!inside) closeDialog();
  });

  // X-Button & ESC schließen
  closeBtn.addEventListener('click', closeDialog);
  dialog.addEventListener('cancel', (e) => { e.preventDefault(); closeDialog(); });

  // Event-Delegation: alle Trigger-Buttons
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.dl-trigger');
    if (!trigger) return;

    e.preventDefault();
    lastFocused = trigger;

    // Daten aus data-* lesen (Fallbacks setzen)
    const title        = trigger.dataset.dialogTitle || 'Hinweis';
    const text         = trigger.dataset.dialogText || '';
    const pLabel       = trigger.dataset.dialogPrimaryLabel || 'OK';
    const sLabel       = trigger.dataset.dialogSecondaryLabel || 'Abbrechen';
    const pUrl         = (trigger.dataset.dialogPrimaryUrl || '').trim();
    const sUrl         = (trigger.dataset.dialogSecondaryUrl || '').trim();
    const target       = trigger.dataset.dialogTarget || '_blank'; // optional

    // Inhalte setzen
    titleEl.textContent = title;
    textEl.textContent  = text;

    // Buttons konfigurieren (Label + Sichtbarkeit + Handler)
    const showPrimary   = !!pUrl;
    const showSecondary = !!sUrl;

   (btnPrimary.querySelector('.rl-btn__text') || btnPrimary).textContent = pLabel;
   (btnSecondary.querySelector('.rl-btn__text') || btnSecondary).textContent = sLabel;

    // Sichtbarkeit je nach vorhandenen URLs
    btnPrimary.style.display   = showPrimary ? '' : 'none';
    btnSecondary.style.display = showSecondary ? '' : 'none';

    // Alte Handler entfernen, neue setzen
    btnPrimary.replaceWith(btnPrimary.cloneNode(true));
    btnSecondary.replaceWith(btnSecondary.cloneNode(true));

    const btnPrimaryNew   = dialog.querySelector('#genericDialogBtnPrimary');
    const btnSecondaryNew = dialog.querySelector('#genericDialogBtnSecondary');

    const openAndClose = (url) => {
      if (!url) return;
      // Popup-Blocker-sicher (direkt in Klick-Handler)
      window.open(url, target, 'noopener');
      closeDialog();
    };

    if (showPrimary)   btnPrimaryNew.addEventListener('click', () => openAndClose(pUrl));
    if (showSecondary) btnSecondaryNew.addEventListener('click', () => openAndClose(sUrl));

    // Sonderfall: nur eine URL vorhanden -> optional direkt öffnen statt Dialog
    const directOpen = trigger.dataset.dialogDirectOpen === 'true';
    if (directOpen && (showPrimary ^ showSecondary)) {
      openAndClose(showPrimary ? pUrl : sUrl);
      return;
    }

    openDialog();
  });
})();