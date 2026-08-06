
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
      '    <a class="btn-quote" href="' + p + 'kontakt.html" data-i18n="btn_quote">Begär offert</a>',
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
    var btn = header.querySelector('#burgerBtn');
    if (!btn) return;
    var mm = document.getElementById('mobile-menu');
    if (mm) {
      btn.addEventListener('click', function () {
        mm.classList.add('open');
        document.body.classList.add('mobile-menu-open');
      });
      var close = document.getElementById('closeMenu');
      if (close) close.addEventListener('click', function () {
        mm.classList.remove('open');
        document.body.classList.remove('mobile-menu-open');
      });
    } else {
      var nav = header.querySelector('nav.main-nav');
      if (nav) btn.addEventListener('click', function () {
        nav.classList.toggle('mobile-open');
        btn.classList.toggle('active');
      });
    }
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

    // Signal i18n.js (which handles lang dropdown + mega menu)
    document.dispatchEvent(new CustomEvent('anrin:header-mounted', { detail: { header: h } }));

    // Apply saved language if i18n.js applyLanguage is already ready
    if (typeof window.applyLanguage === 'function') {
      var lang = 'en';
      try { lang = localStorage.getItem('anrin_lang') || 'en'; } catch (e) {}
      window.applyLanguage(lang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();


/* Global PDF Viewer Modal — Keep PDFs on anrin.vercel.app */
(function() {
  function initPdfModal() {
    if (document.getElementById('pdfViewerModal')) return;

    var modal = document.createElement('div');
    modal.id = 'pdfViewerModal';
    modal.style.cssText = 'position:fixed;inset:0;z-index:999999;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:none;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
    
    modal.innerHTML = [
      '<div style="width:100%;max-width:1100px;height:90vh;background:#ffffff;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 24px 60px rgba(0,0,0,0.5);">',
      '  <div style="padding:16px 24px;background:#111111;color:#ffffff;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">',
      '    <div style="display:flex;align-items:center;gap:12px;">',
      '      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>',
      '      <span id="pdfModalTitle" style="font-family:sans-serif;font-size:15px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:600px;">Document Preview</span>',
      '    </div>',
      '    <div style="display:flex;align-items:center;gap:12px;">',
      '      <a id="pdfModalDownloadBtn" href="" download target="_blank" style="padding:8px 18px;background:rgba(255,255,255,0.18);color:#fff;border-radius:100px;font-family:sans-serif;font-size:12.5px;font-weight:600;text-decoration:none;transition:background 0.2s;">Download PDF</a>',
      '      <button id="pdfModalCloseBtn" style="background:none;border:none;color:#fff;font-size:26px;cursor:pointer;padding:0 8px;line-height:1;">&times;</button>',
      '    </div>',
      '  </div>',
      '  <iframe id="pdfModalFrame" src="" style="width:100%;height:100%;border:none;background:#f5f5f5;"></iframe>',
      '</div>'
    ].join('\n');

    document.body.appendChild(modal);

    var closeBtn = document.getElementById('pdfModalCloseBtn');
    var iframe = document.getElementById('pdfModalFrame');
    var titleEl = document.getElementById('pdfModalTitle');
    var dlBtn = document.getElementById('pdfModalDownloadBtn');

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

    // Intercept clicks on any link or button with PDF or document download
    document.addEventListener('click', function(e) {
      var link = e.target.closest('a[href*=".pdf"], a[href*="ausschreiben.de"], .dl-trigger, [data-dialog-primary-url]');
      if (!link) return;

      var url = link.getAttribute('href') || link.getAttribute('data-dialog-primary-url');
      if (!url || url.indexOf('javascript') === 0 || url === '#') return;

      if (url.indexOf('.pdf') !== -1 || url.indexOf('ausschreiben.de') !== -1 || url.indexOf('divio-media.com') !== -1) {
        e.preventDefault();
        e.stopPropagation();

        var title = link.textContent ? link.textContent.trim() : 'Document Preview';
        if (title.length > 50) title = 'Document Preview';
        titleEl.textContent = title;
        dlBtn.href = url;
        iframe.src = url;
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


/* Global Robust Interceptor for ALL anrin.com & external links to keep users on anrin.vercel.app */
(function() {
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href]');
    if (!a) return;

    var href = a.getAttribute('href') || '';
    if (!href || href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0) return;

    var lower = href.toLowerCase();
    
    // Intercept any link pointing to anrin.com, anrin.se, or external domain
    if (lower.indexOf('anrin.com') !== -1 || lower.indexOf('anrin.se') !== -1) {
      e.preventDefault();
      e.stopPropagation();

      if (lower.indexOf('reference') !== -1 || lower.indexOf('projekt') !== -1) {
        window.location.href = 'projekt.html';
      } else if (lower.indexOf('news') !== -1 || lower.indexOf('nyheter') !== -1) {
        window.location.href = 'anrin-int-news.html';
      } else if (lower.indexOf('faq') !== -1) {
        window.location.href = 'anrin-int-faq.html';
      } else if (lower.indexOf('download') !== -1 || lower.indexOf('nedladdningar') !== -1) {
        window.location.href = 'nedladdningar.html';
      } else if (lower.indexOf('contact') !== -1 || lower.indexOf('kontakt') !== -1) {
        window.location.href = 'kontakt.html';
      } else if (lower.indexOf('about') !== -1 || lower.indexOf('om-oss') !== -1) {
        window.location.href = 'om-oss.html';
      } else if (lower.indexOf('sf') !== -1) {
        window.location.href = 'anrin-page-2.html';
      } else if (lower.indexOf('z-') !== -1) {
        window.location.href = 'anrin-page-3.html';
      } else if (lower.indexOf('self') !== -1) {
        window.location.href = 'anrin-page-4.html';
      } else if (lower.indexOf('sport') !== -1) {
        window.location.href = 'anrin-page-10.html';
      } else if (lower.indexOf('produkter') !== -1 || lower.indexOf('channel') !== -1) {
        window.location.href = 'produkter.html';
      } else {
        window.location.href = 'anrin-page-1.html';
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








/* Router for Product Pages — Every product card opens its own exact rich static page */
(function() {
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a.card-item, .card-item a, .product-card a, a.view-product, .view-product-btn, .quicklink-card');
    var card = e.target.closest('.card-item, .product-card, .sku-card, div[data-product]');
    
    if (!link && !card) return;

    var targetEl = card || link;
    var titleEl = targetEl.querySelector('h3, h4, .product-title, .title, strong');
    var imgEl = targetEl.querySelector('img');

    var title = titleEl ? titleEl.textContent.trim() : (imgEl ? imgEl.alt : '');
    if (!title || title.length < 2) return;

    var lower = title.toLowerCase();

    // Map exact product names to their specific static HTML pages
    var pageMap = [
      { key: 'ke-100 ktl', page: 'anrin-page-1.html' },
      { key: 'ke-100', page: 'anrin-page-1.html' },
      { key: 'sf-100', page: 'anrin-page-2.html' },
      { key: 'z-100', page: 'anrin-page-3.html' },
      { key: 'self-100', page: 'anrin-page-4.html' },
      { key: 'self-200', page: 'anrin-page-5.html' },
      { key: 'self pp', page: 'anrin-page-6.html' },
      { key: 'pp evo', page: 'anrin-page-6.html' },
      { key: 'fotskrapa', page: 'anrin-page-7.html' },
      { key: 'schuhabstreifer', page: 'anrin-page-7.html' },
      { key: 'boot scraper', page: 'anrin-page-7.html' },
      { key: 'gårdsbrunn', page: 'anrin-page-8.html' },
      { key: 'yard sump', page: 'anrin-page-8.html' },
      { key: 'comb', page: 'anrin-page-9.html' },
      { key: 'kammrinne', page: 'anrin-page-9.html' },
      { key: 'sport 125 a', page: 'anrin-page-10.html' },
      { key: 'sport 125 e', page: 'anrin-page-11.html' },
      { key: 'sport 125 c1', page: 'anrin-page-12.html' },
      { key: 'sport 125 r', page: 'anrin-page-13.html' },
      { key: 'sport 125 c5', page: 'anrin-page-14.html' },
      { key: 'sport 125', page: 'anrin-page-15.html' },
      { key: 'sport', page: 'anrin-page-10.html' },
      { key: 'ke-150', page: 'anrin-page-16.html' },
      { key: 'ke-200', page: 'anrin-page-17.html' },
      { key: 'ke-300', page: 'anrin-page-18.html' },
      { key: 'sf-150', page: 'anrin-page-19.html' },
      { key: 'sf-200', page: 'anrin-page-20.html' },
      { key: 'sf-300', page: 'anrin-page-21.html' },
      { key: 'z-150', page: 'anrin-page-22.html' },
      { key: 'kf-100', page: 'anrin-page-23.html' },
      { key: 'kc-100', page: 'anrin-page-24.html' }
    ];

    for (var i = 0; i < pageMap.length; i++) {
      if (lower.indexOf(pageMap[i].key) !== -1) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = pageMap[i].page;
        return;
      }
    }
  }, true);
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
