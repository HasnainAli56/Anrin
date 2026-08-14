
/* Preloader Fail-Safe Dismiss */
(function() {
  function hidePreloader() {
    var p = document.getElementById('preloader');
    if (p) p.classList.add('done');
  }
  if (document.readyState === 'complete') hidePreloader();
  else {
    window.addEventListener('load', hidePreloader);
    setTimeout(hidePreloader, 400);
  }
})();

/**
 * ANRIN NORDIC — Reusable Header Component (header.js)
 * Single source of truth for header mounting only.
 * Language dropdown clicks are handled by i18n.js (delegation).
 * Mega menu is handled by i18n.js (initGlobalMegaMenu).
 */
(function () {
  'use strict';

  /* ── Detect asset base path from script src ────────────────────────────── */
  function getScriptBase() {
    var cur = document.currentScript;
    if (cur && cur.src) return cur.src.replace(/[^/]+$/, '');
    var tag = document.querySelector('script[src*="header.js"]');
    if (tag && tag.src) return tag.src.replace(/[^/]+$/, '');
    return '';
  }

  var BASE = getScriptBase();

  /* ── Compute relative prefix for nav links ─────────────────────────────── */
  function getPathPrefix() {
    if (!BASE) return '';
    try {
      var scriptDir = new URL(BASE, window.location.href).pathname;
      var pageDir = window.location.pathname.replace(/\/[^/]*$/, '/');
      if (pageDir === scriptDir) return '';
      var pageParts = pageDir.split('/').filter(Boolean);
      var scriptParts = scriptDir.split('/').filter(Boolean);
      var i = 0;
      while (i < pageParts.length && i < scriptParts.length && pageParts[i] === scriptParts[i]) i++;
      var prefix = '';
      for (var j = i; j < pageParts.length; j++) prefix += '../';
      return prefix;
    } catch (e) {
      return window.location.pathname.indexOf('/files') !== -1 ? '../' : '';
    }
  }

  /* ── Inject header.css if not already linked ───────────────────────────── */
  function injectCSS() {
    if (document.querySelector('link[href*="header.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = BASE + 'header.css';
    document.head.appendChild(link);
  }

  /* ── Build header inner HTML ───────────────────────────────────────────── */
  function buildHTML(p) {
    return [
      '<div class="wrap">',
      '  <a href="' + p + 'index.html" class="logo">',
      '    <img src="https://anrin.se/wp-content/uploads/2022/11/ANRIN_Logo_schwarz_2.svg" alt="ANRIN Nordic">',
      '  </a>',
      '  <nav class="main-nav">',
      '    <span class="has-mega" id="productsMegaTrigger"><a href="' + p + 'produkter.html" data-i18n="nav_produkter">Products</a></span>',
      '    <a href="' + p + 'projekt.html" data-i18n="nav_projekt">Projects</a>',
      '    <a href="' + p + 'om-oss.html" data-i18n="nav_omoss">About us</a>',
      '    <a href="' + p + 'nedladdningar.html" data-i18n="nav_nedladdningar">Downloads</a>',
      '    <a href="' + p + 'kontakt.html" data-i18n="nav_kontakt">Contact</a>',
      '  </nav>',
      '  <div class="header-right">',
      '    <button class="icon-btn" id="searchTrigger" type="button" aria-label="Search">',
      '      <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      '    </button>',
      '    <div class="lang-switch notranslate" translate="no">',
      '      <button class="lang-current" type="button">',
      '        <span class="lang-label notranslate" translate="no">EN</span>',
      '        <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>',
      '      </button>',
      '      <div class="lang-menu notranslate" translate="no"></div>',
      '    </div>',
      '    <a class="btn-quote" href="' + p + 'kontakt.html" data-i18n="btn_quote">Request a quote</a>',
      '    <button class="burger" id="burgerBtn" type="button" aria-label="Menu">',
      '      <span></span><span></span><span></span>',
      '    </button>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  /* ── Highlight active nav link ─────────────────────────────────────────── */
  function setActiveLink(header) {
    var file = window.location.pathname.split('/').pop() || 'index.html';
    header.querySelectorAll('nav.main-nav a').forEach(function (a) {
      var hfile = (a.getAttribute('href') || '').split('/').pop();
      var active = hfile && (file === hfile || (file === '' && hfile === 'index.html'));
      a.classList.toggle('active', !!active);
    });
  }

  /* ── Scroll state ──────────────────────────────────────────────────────── */
  function bindScroll(header) {
    function tick() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else if (!header.classList.contains('mega-hover')) {
        header.classList.remove('scrolled');
      }
    }
    window.addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ── Search panel ──────────────────────────────────────────────────────── */
  function bindSearch(header) {
    var btn = header.querySelector('#searchTrigger');
    var panel = document.getElementById('searchPanel') || document.querySelector('.site-search-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
      panel.classList.toggle('active');
      var inp = panel.querySelector('input');
      if (inp && panel.classList.contains('active')) inp.focus();
    });
    var close = panel.querySelector('.search-close');
    if (close) close.addEventListener('click', function () { panel.classList.remove('active'); });
  }

  /* ── Mobile burger: open #mobile-menu if present, else toggle nav ──────── */
  function bindBurger(header) {
    function attachBurgerHandler(forceRebind) {
      var btn = header.querySelector('#burgerBtn');
      if (!btn) return;
      if (btn.dataset.anrinMenuBound === 'true' && !forceRebind) return;

      /* Replace node so duplicate page-level listeners cannot stack on the same button */
      var freshBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(freshBtn, btn);
      btn = freshBtn;
      btn.dataset.anrinMenuBound = 'true';

      var mm = document.getElementById('mobile-menu');
      if (mm) {
        function closeMobileMenu() {
          mm.classList.remove('open');
          document.body.classList.remove('mobile-menu-open');
        }
        function openMobileMenu() {
          mm.classList.add('open');
          document.body.classList.add('mobile-menu-open');
        }
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (mm.classList.contains('open')) closeMobileMenu();
          else openMobileMenu();
        });
        var close = document.getElementById('closeMenu');
        if (close) close.addEventListener('click', closeMobileMenu);
        document.querySelectorAll('#mobile-menu a').forEach(function (link) {
          link.addEventListener('click', closeMobileMenu);
        });
      } else {
        var nav = header.querySelector('nav.main-nav');
        if (nav) btn.addEventListener('click', function () {
          nav.classList.toggle('mobile-open');
          btn.classList.toggle('active');
        });
      }
    }

    attachBurgerHandler(false);
    /* Re-bind after inline page scripts so only one toggle handler remains */
    window.addEventListener('load', function () { attachBurgerHandler(true); });
  }

  
  /* ── Bind Language Switcher ────────────────────────────────────────────── */
  function bindLangSwitcher(header) {
    var langSwitches = document.querySelectorAll('.lang-switch');
    langSwitches.forEach(function (sw) {
      var menu = sw.querySelector('.lang-menu');
      if (menu && (!menu.children || menu.children.length === 0)) {
        menu.innerHTML = [
          '<button type="button" data-lang="en">English (EN)</button>',
          '<button type="button" data-lang="sv">Svenska (SV)</button>',
          '<button type="button" data-lang="fi">Suomi (FI)</button>',
          '<button type="button" data-lang="da">Dansk (DA)</button>',
          '<button type="button" data-lang="no">Norsk (NO)</button>',
          '<button type="button" data-lang="de">Deutsch (DE)</button>'
        ].join('\n');
      }

      var current = sw.querySelector('.lang-current');
      if (current && !current.dataset.bound) {
        current.dataset.bound = 'true';
        current.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          sw.classList.toggle('open');
        });
      }

      sw.querySelectorAll('.lang-menu button').forEach(function (btn) {
        if (!btn.dataset.bound) {
          btn.dataset.bound = 'true';
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            var lang = btn.getAttribute('data-lang');
            if (typeof window.applyLanguage === 'function') {
              window.applyLanguage(lang);
            }
            sw.classList.remove('open');
          });
        }
      });
    });

    document.addEventListener('click', function () {
      document.querySelectorAll('.lang-switch.open').forEach(function (s) {
        s.classList.remove('open');
      });
    });
  }

  /* ── Late mobile fixes (must run after page inline styles) ─────────────── */
  function injectLateMobileFixes() {
    var style = document.getElementById('anrin-late-mobile-fixes');
    if (!style) {
      style = document.createElement('style');
      style.id = 'anrin-late-mobile-fixes';
      document.head.appendChild(style);
    }
    style.textContent = [
      '@media (max-width: 900px) {',
      '  html:has(body .hero), html:has(body section.hero) { background: #000000 !important; }',
      '  body:has(.hero), body:has(section.hero), body:has(.page-hero), body:has(.htec-hero), body:has(.aint-hero-home) {',
      '    padding-top: 0 !important;',
      '    background-color: #000000 !important;',
      '  }',
      '  .hero .wrap.hero-content .hero-meta,',
      '  section.hero .wrap.hero-content .hero-meta,',
      '  .hero .hero-meta,',
      '  .hero-meta {',
      '    display: grid !important;',
      '    grid-template-columns: 1fr 1fr !important;',
      '    grid-template-rows: auto auto !important;',
      '    gap: 24px 20px !important;',
      '    width: 100% !important;',
      '    max-width: 100% !important;',
      '    flex-direction: unset !important;',
      '    justify-content: unset !important;',
      '    align-items: unset !important;',
      '  }',
      '  .hero .wrap.hero-content .hero-meta > div,',
      '  .hero .hero-meta > div,',
      '  .hero-meta > div {',
      '    flex: none !important;',
      '    width: 100% !important;',
      '    max-width: 100% !important;',
      '    min-width: 0 !important;',
      '  }',
      '  .hero .wrap.hero-content .hero-meta > div b,',
      '  .hero .hero-meta > div b,',
      '  .hero-meta > div b {',
      '    white-space: normal !important;',
      '    word-break: normal !important;',
      '    overflow-wrap: normal !important;',
      '    hyphens: none !important;',
      '    font-size: clamp(16px, 4.5vw, 22px) !important;',
      '    line-height: 1.2 !important;',
      '  }',
      '  .hero .wrap.hero-content .hero-meta > div span,',
      '  .hero .hero-meta > div span,',
      '  .hero-meta > div span {',
      '    white-space: normal !important;',
      '    word-break: normal !important;',
      '    overflow-wrap: normal !important;',
      '    font-size: 10px !important;',
      '    line-height: 1.35 !important;',
      '  }',
      '}',
      '@media (max-width: 1100px) {',
      '  #mobile-menu .close-btn, #closeMenu {',
      '    display: none !important;',
      '    visibility: hidden !important;',
      '    pointer-events: none !important;',
      '  }',
      '  body.mobile-menu-open #siteHeader .burger,',
      '  body.mobile-menu-open #burgerBtn {',
      '    display: flex !important;',
      '    visibility: visible !important;',
      '    opacity: 1 !important;',
      '    pointer-events: auto !important;',
      '  }',
      '  body.mobile-menu-open #siteHeader .burger span:nth-child(1),',
      '  body.mobile-menu-open #burgerBtn span:nth-child(1) { transform: translateY(7px) rotate(45deg) !important; }',
      '  body.mobile-menu-open #siteHeader .burger span:nth-child(2),',
      '  body.mobile-menu-open #burgerBtn span:nth-child(2) { opacity: 0 !important; }',
      '  body.mobile-menu-open #siteHeader .burger span:nth-child(3),',
      '  body.mobile-menu-open #burgerBtn span:nth-child(3) { transform: translateY(-7px) rotate(-45deg) !important; }',
      '}'
    ].join('\n');
  }

  /* ── Mount ─────────────────────────────────────────────────────────────── */
  function mount() {
    injectCSS();

    // Kill any leftover hardcoded header elements that script may have missed
    document.querySelectorAll('header:not(#siteHeader)').forEach(function (el) { el.remove(); });

    // Reuse existing #siteHeader or create fresh
    var h = document.getElementById('siteHeader');
    if (!h) {
      h = document.createElement('header');
      h.id = 'siteHeader';
      var root = document.getElementById('header-root');
      if (root) {
        root.parentNode.insertBefore(h, root);
      } else {
        document.body.insertBefore(h, document.body.firstChild);
      }
    }

    h.innerHTML = buildHTML(getPathPrefix());
    setActiveLink(h);
    bindScroll(h);
    bindSearch(h);
    bindBurger(h);
    bindLangSwitcher(h);
    injectLateMobileFixes();

    // Signal i18n.js (which handles lang dropdown + mega menu)
    document.dispatchEvent(new CustomEvent('anrin:header-mounted', { detail: { header: h } }));

    // Apply saved language or auto-load i18n.js if missing
    var lang = 'sv';
try { lang = localStorage.getItem('anrin_lang') || 'sv'; } catch (e) {}
h.querySelectorAll('.lang-label').forEach(function(el) { el.textContent = lang.toUpperCase(); });
    if (typeof window.applyLanguage === 'function') {
      window.applyLanguage(lang);
    } else {
      var i18nScript = document.createElement('script');
      i18nScript.src = getPathPrefix() + 'i18n.js';
      i18nScript.onload = function() {
        if (typeof window.applyLanguage === 'function') window.applyLanguage(lang);
      };
      document.head.appendChild(i18nScript);
    }

    // Auto-mount universal site footer
    if (typeof window.mountSiteFooter !== 'function' && !document.querySelector('script[src*="footer.js"]')) {
      var footerScript = document.createElement('script');
      footerScript.src = getPathPrefix() + 'footer.js';
      document.head.appendChild(footerScript);
    } else if (typeof window.mountSiteFooter === 'function') {
      window.mountSiteFooter();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
  window.addEventListener('load', injectLateMobileFixes);
})();


/* Global PDF Viewer Modal — Keep PDFs on anrin.vercel.app */
(function() {
  function initPdfModal() {
    if (document.getElementById('pdfViewerModal')) return;

    // Inject modal responsive styles into document head
    if (!document.getElementById('pdf-modal-styles')) {
      var style = document.createElement('style');
      style.id = 'pdf-modal-styles';
      style.textContent = [
        '#pdfViewerModal { position:fixed; inset:0; z-index:999999; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); display:none; align-items:center; justify-content:center; padding:20px; box-sizing:border-box; }',
        '#pdfViewerModal .pdf-dialog { width:100%; max-width:1440px; height:94vh; height:94dvh; background:#111111; border-radius:16px; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 24px 60px rgba(0,0,0,0.6); position:relative; }',
        '#pdfViewerModal .pdf-header { height:54px; min-height:54px; padding:0 20px; background:#111111; color:#ffffff; display:flex; align-items:center; justify-content:space-between; flex-shrink:0; border-bottom:1px solid rgba(255,255,255,0.12); box-sizing:border-box; }',
        '#pdfViewerModal iframe { width:100% !important; height:calc(100% - 54px) !important; flex:1 1 auto !important; min-height:0 !important; border:none !important; background:#525659 !important; display:block !important; }',
        '@media (max-width: 768px) {',
        '  #pdfViewerModal { padding:0 !important; }',
        '  #pdfViewerModal .pdf-dialog { width:100% !important; max-width:100% !important; height:100vh !important; height:100dvh !important; border-radius:0 !important; }',
        '}'
      ].join('\n');
      document.head.appendChild(style);
    }

    var modal = document.createElement('div');
    modal.id = 'pdfViewerModal';

    modal.innerHTML = [
      '<div class="pdf-dialog">',
      '  <div class="pdf-header">',
      '    <div style="display:flex;align-items:center;gap:12px;min-width:0;flex:1;">',
      '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="flex-shrink:0;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      '      <span id="pdfModalTitle" style="font-family:sans-serif;font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:600px;">Document Preview</span>',
      '    </div>',
      '    <div style="display:flex;align-items:center;gap:12px;flex-shrink:0;">',
      '      <button id="pdfModalDownloadBtn" type="button" style="padding:8px 18px;background:rgba(255,255,255,0.18);color:#fff;border:none;border-radius:100px;font-family:sans-serif;font-size:12.5px;font-weight:600;cursor:pointer;transition:background 0.2s, opacity 0.2s;display:inline-flex;align-items:center;gap:6px;">Download PDF</button>',
      '      <button id="pdfModalCloseBtn" style="background:none;border:none;color:#fff;font-size:26px;cursor:pointer;padding:0 8px;line-height:1;">&times;</button>',
      '    </div>',
      '  </div>',
      '  <iframe id="pdfModalFrame" src=""></iframe>',
      '</div>'
    ].join('\n');

    document.body.appendChild(modal);

    var closeBtn = document.getElementById('pdfModalCloseBtn');
    var iframe = document.getElementById('pdfModalFrame');
    var titleEl = document.getElementById('pdfModalTitle');
    var dlBtn = document.getElementById('pdfModalDownloadBtn');
    var currentPdfUrl = '';

    function closeModal() {
      modal.style.display = 'none';
      iframe.src = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    // Helper to trigger direct anchor download without preview modal interception
    function executeFileDownload(downloadUrl, name, isBlob) {
      var a = document.createElement('a');
      a.className = 'bypass-pdf-modal';
      a.setAttribute('data-bypass', 'true');
      a.style.display = 'none';
      a.href = downloadUrl;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        if (a.parentNode) a.parentNode.removeChild(a);
        if (isBlob) URL.revokeObjectURL(downloadUrl);
      }, 1000);
    }

    // Handle Download PDF button click inside the modal
    dlBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();

      var url = currentPdfUrl || dlBtn.getAttribute('data-url');
      if (!url) return;

      var filename = url.split('/').pop().split('?')[0] || 'document.pdf';
      if (!filename.toLowerCase().endsWith('.pdf')) {
        filename += '.pdf';
      }

      var originalText = 'Download PDF';
      dlBtn.textContent = 'Downloading...';
      dlBtn.style.opacity = '0.7';
      dlBtn.style.pointerEvents = 'none';

      function resetBtn() {
        dlBtn.textContent = originalText;
        dlBtn.style.opacity = '1';
        dlBtn.style.pointerEvents = 'auto';
      }

      fetch(url)
        .then(function(res) {
          if (!res.ok) throw new Error('Fetch failed');
          return res.blob();
        })
        .then(function(blob) {
          var blobUrl = URL.createObjectURL(blob);
          executeFileDownload(blobUrl, filename, true);
          setTimeout(resetBtn, 1200);
        })
        .catch(function() {
          executeFileDownload(url, filename, false);
          setTimeout(resetBtn, 1200);
        });
    });

    // Intercept clicks on any link or button with PDF or document download
    document.addEventListener('click', function(e) {
      // Ignore clicks originating inside #pdfViewerModal or on elements marked with bypass
      if (e.target.closest('#pdfViewerModal') || e.target.closest('[data-bypass]') || e.target.closest('.bypass-pdf-modal')) {
        return;
      }

      var link = e.target.closest('a[href*=".pdf"], a[href*="ausschreiben.de"], .dl-trigger, [data-dialog-primary-url]');
      if (!link) return;

      if (link.closest('#pdfViewerModal') || link.hasAttribute('data-bypass') || link.classList.contains('bypass-pdf-modal')) {
        return;
      }

      var url = link.getAttribute('href') || link.getAttribute('data-dialog-primary-url');
      if (!url || url.indexOf('javascript') === 0 || url === '#') return;

      if (url.indexOf('.pdf') !== -1 || url.indexOf('ausschreiben.de') !== -1 || url.indexOf('divio-media.com') !== -1) {
        e.preventDefault();
        e.stopPropagation();

        var title = link.textContent ? link.textContent.trim() : 'Document Preview';
        if (title.length > 50) title = 'Document Preview';
        titleEl.textContent = title;
        currentPdfUrl = url;
        dlBtn.setAttribute('data-url', url);
        var pdfViewerUrl = url;
        if (pdfViewerUrl.indexOf('.pdf') !== -1 && pdfViewerUrl.indexOf('#') === -1) {
          pdfViewerUrl += '#toolbar=0&navpanes=0&view=FitH';
        }
        iframe.src = pdfViewerUrl;
        modal.style.display = 'flex';
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPdfModal);
  } else {
    initPdfModal();
  }
})();


/* Global Product & Document Router — Keep ALL Navigation on anrin.vercel.app */
(function() {
  var PRODUCT_MAP = {
    'ke-100': 'anrin-product-ke100.html',
    'ke100': 'anrin-product-ke100.html',
    'sf-100': 'anrin-product-sf100.html',
    'sf100': 'anrin-product-sf100.html',
    'z-100': 'anrin-product-z100.html',
    'z100': 'anrin-product-z100.html',
    'self-100': 'anrin-product-self100.html',
    'self100': 'anrin-product-self100.html',
    'comb': 'anrin-product-comb.html',
    'kammrinne': 'anrin-product-comb.html',
    'footscrapers': 'anrin-product-footscrapers.html',
    'schuhabstreifer': 'anrin-product-footscrapers.html',
    'sand-collector': 'anrin-product-sand-collector.html',
    'sandfang': 'anrin-product-sand-collector.html',
    'sport': 'anrin-product-sport.html'
  };

  document.addEventListener('click', function(e) {
    var a = e.target.closest('a');
    if (!a) return;

    var href = a.getAttribute('href') || '';
    if (!href || href.indexOf('javascript') === 0 || href === '#') return;

    // Remove target="_blank" from product links to keep on same site
    if (a.getAttribute('target') === '_blank' && href.indexOf('.pdf') === -1) {
      a.removeAttribute('target');
    }

    // Intercept external domain links to products or pages
    if (href.indexOf('anrin.com') !== -1 || href.indexOf('divio-media.com') !== -1 || href.indexOf('hydrotec.se') !== -1) {
      var lower = href.toLowerCase();

      // If PDF, let PDF Viewer modal intercept
      if (lower.indexOf('.pdf') !== -1 || lower.indexOf('ausschreiben.de') !== -1) {
        return;
      }

      // Check product keywords
      for (var key in PRODUCT_MAP) {
        if (lower.indexOf(key) !== -1) {
          e.preventDefault();
          window.location.href = PRODUCT_MAP[key];
          return;
        }
      }

      // Default fallback: redirect to local produkter.html instead of leaving domain
      if (href.indexOf('http') === 0) {
        e.preventDefault();
        window.location.href = 'produkter.html';
      }
    }
  }, true);
})();


/* Dedicated Grate Specification Modal — Opens Grate Details cleanly on anrin.vercel.app */
(function() {
  function initGrateModal() {
    if (document.getElementById('grateSpecModal')) return;

    var modal = document.createElement('div');
    modal.id = 'grateSpecModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';

    modal.innerHTML = [
      '<div style="width:100%;max-width:850px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.5);display:flex;flex-direction:column;">',
      '  <div style="padding:20px 28px;background:#111111;color:#ffffff;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">',
      '    <div style="display:flex;align-items:center;gap:12px;">',
      '      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/></svg>',
      '      <span id="grateModalTitle" style="font-family:sans-serif;font-size:17px;font-weight:700;">Matching Grate Specification</span>',
      '    </div>',
      '    <button id="grateModalCloseBtn" style="background:none;border:none;color:#fff;font-size:28px;cursor:pointer;padding:0 8px;line-height:1;">&times;</button>',
      '  </div>',
      '  <div style="padding:32px;display:flex;flex-direction:row;gap:32px;align-items:center;flex-wrap:wrap;overflow-y:auto;max-height:75vh;">',
      '    <div style="flex:1 1 300px;text-align:center;background:#fafafa;padding:24px;border-radius:12px;border:1px solid #eee;">',
      '      <img id="grateModalImg" src="" alt="Grate Image" style="max-width:100%;height:auto;max-height:260px;object-fit:contain;">',
      '    </div>',
      '    <div style="flex:1 1 320px;display:flex;flex-direction:column;gap:14px;">',
      '      <h3 id="grateModalName" style="font-family:sans-serif;font-size:22px;font-weight:800;color:#111;margin:0;">Grate Name</h3>',
      '      <div style="display:inline-block;padding:4px 12px;background:#111;color:#fff;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;align-self:flex-start;" id="grateModalTag">ANRIN Grate Option</div>',
      '      <p id="grateModalDesc" style="font-family:sans-serif;font-size:14.5px;color:#555;line-height:1.6;margin:0;">High-strength drainage grating designed for ANRIN channel systems with certified load resistance and premium finish.</p>',
      '      <div style="margin-top:12px;padding-top:16px;border-top:1px solid #eee;display:flex;gap:12px;">',
      '        <a href="kontakt.html" style="padding:12px 24px;background:#000000;color:#ffffff;border-radius:100px;font-weight:700;font-size:13px;text-decoration:none;display:inline-block;text-align:center;">Request Quote for this Grate</a>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(modal);

    var closeBtn = document.getElementById('grateModalCloseBtn');
    var modalImg = document.getElementById('grateModalImg');
    var modalName = document.getElementById('grateModalName');
    var modalDesc = document.getElementById('grateModalDesc');

    function closeModal() {
      modal.style.display = 'none';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    // Intercept clicks on VIEW PRODUCT buttons inside matching grates / tab contents
    document.addEventListener('click', function(e) {
      var viewBtn = e.target.closest('.perfect-fit-product .rl-btn, .perfect-fit-product a, #tab-content-2 a');
      if (!viewBtn) return;

      var card = viewBtn.closest('.perfect-fit-product, .product-detail');
      if (!card) return;

      // Extract image & text from card
      var img = card.querySelector('img');
      var descEl = card.querySelector('.desc, .product-name, h4, .product-title');
      var titleText = descEl ? descEl.textContent.trim() : (img ? img.alt : 'ANRIN Matching Grate');
      
      if (!titleText || titleText.length < 3) titleText = 'ANRIN Matching Grate';

      // Clean up titleText
      titleText = titleText.replace(/Load class:[\s\S]*/i, '').trim();

      if (img && img.src) {
        e.preventDefault();
        e.stopPropagation();

        modalImg.src = img.src;
        modalName.textContent = titleText;
        modalDesc.textContent = titleText + ' — high-performance drainage grate option engineered specifically for ANRIN channel systems with precision load class rating.';
        modal.style.display = 'flex';
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGrateModal);
  } else {
    initGrateModal();
  }
})();


/* Remove right-side floating sidebar elements from DOM */
(function() {
  function removeFloaters() {
    var floaters = document.querySelectorAll('.floating-actions, .side-nav, .quick-nav, .right-nav, .floating-buttons, .floating-widget, aside.side-nav, aside.floating-actions, div[class*="floating-action"]');
    floaters.forEach(function(el) { el.remove(); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', removeFloaters);
  } else {
    removeFloaters();
  }
  window.addEventListener('load', removeFloaters);
})();


/* Direct Navigation to Full Grate Detail Page (anrin-grate-detail.html) instead of small modal popup */
(function() {
  document.addEventListener('click', function(e) {
    var grateLink = e.target.closest('a[href*="grate-designs"], #tab-content-2 a, .tab-content-2 a, .rost-design a');
    var grateCard = e.target.closest('#tab-content-2 .card-item, #tab-content-2 .perfect-fit-product, #tab-content-2 .product-detail, .rost-design-detail');
    
    if (!grateLink && !grateCard) return;

    var container = grateCard || (grateLink ? grateLink.closest('.card-item, .perfect-fit-product, .product-detail, div') : null);
    
    var img = container ? container.querySelector('img') : null;
    var titleEl = container ? container.querySelector('h3, h4, .desc, .product-name, .product-title, strong') : null;

    var titleText = titleEl ? titleEl.textContent.trim() : (img ? img.alt : 'Slotted grating OvalGrip Design');
    titleText = titleText.replace(/Load class:[\s\S]*/i, '').trim();

    var imgSrc = img ? img.src : 'https://anrinweb-live-fa1d6c11d583492a82fc40531-59ce514.divio-media.com/filer_public_thumbnails/filer_public/5a/e1/5ae1fcf7-7f8a-48c3-b72d-fb7085030861/ke_100_oval_grip_3.png__800x0_subsampling-2.png';

    if (titleText) {
      e.preventDefault();
      e.stopPropagation();

      localStorage.setItem('selected_grate_title', titleText);
      localStorage.setItem('selected_grate_img', imgSrc);

      window.location.href = 'anrin-grate-detail.html?title=' + encodeURIComponent(titleText) + '&img=' + encodeURIComponent(imgSrc);
    }
  }, true);
})();
