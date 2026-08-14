/* ===================== Universal Site Footer Module ===================== */
(function () {
  'use strict';

  function getPathPrefix() {
    return window.location.pathname.includes('/files') ? '../' : '';
  }

  function injectCSS() {
    if (document.getElementById('siteFooterCSS')) return;
    var link = document.createElement('link');
    link.id = 'siteFooterCSS';
    link.rel = 'stylesheet';
    link.href = getPathPrefix() + 'footer.css';
    document.head.appendChild(link);
  }

  function buildHTML(p) {
    return `
    <div class="site-footer-inner">
      <div class="site-footer-grid">
        <div class="footer-col brand-col">
          <div class="footer-logo">
            <a href="${p}index.html">
              <img src="https://anrin.se/wp-content/uploads/2022/11/ANRIN_Logo_schwarz_2.svg" alt="ANRIN Nordic">
            </a>
          </div>
          <p class="footer-sub" data-i18n="footer_desc">Leading Water — complete surface-water solutions, delivered faster than anywhere else in the Nordics since 2017.</p>
        </div>

        <div class="footer-col">
          <h5 data-i18n="footer_produkter">PRODUCTS</h5>
          <ul class="footer-links">
            <li><a href="${p}produkter.html">ANRIN</a></li>
            <li><a href="${p}hydrotec-betackningar.html">HYDROTEC</a></li>
            <li><a href="${p}stainless-team.html">Stainless Team</a></li>
            <li><a href="${p}produkter.html#enviroguard">ENVIROguard</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5 data-i18n="footer_foretag">COMPANY</h5>
          <ul class="footer-links">
            <li><a href="${p}om-oss.html" data-i18n="nav_omoss">About us</a></li>
            <li><a href="${p}projekt.html" data-i18n="nav_projekt">Projects</a></li>
            <li><a href="${p}nedladdningar.html" data-i18n="nav_nedladdningar">Downloads</a></li>
            <li><a href="${p}kontakt.html" data-i18n="nav_kontakt">Contact</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h5 data-i18n="footer_kontakt">CONTACT</h5>
          <div class="footer-contact-info sweden-branch">
            <p>Mysingsvägen 1<br>SE-149 41 NYNÄSHAMN</p>
            <p><a href="tel:+46102099209">+46 (0)10-209 9 209</a></p>
            <p><a href="mailto:info@anrin.se">info@anrin.se</a></p>
          </div>
          <div class="footer-contact-info finland-branch" style="display:none;">
            <p>Öglan 7B 10<br>FI-02700 GRANKULLA<br>FINLAND</p>
            <p><a href="tel:+358451855020">+358 45 185 5020</a></p>
            <p><a href="mailto:info@anrin.fi">info@anrin.fi</a></p>
          </div>
        </div>
      </div>

      <div class="site-footer-bottom">
        <div class="footer-copyright" data-i18n="footer_rights">© 2026 ANRIN Nordic — All rights reserved.</div>
        <div class="footer-legal-links">
          <a href="${p}terms-and-conditions.html" data-i18n="legal_terms">Terms & Conditions</a>
          <a href="${p}cookie-policy.html" data-i18n="legal_cookies">Cookies</a>
          <a href="${p}privacy-policy.html" data-i18n="legal_privacy">Privacy Policy</a>
          <a href="${p}copyright.html" data-i18n="legal_copyright">Copyright</a>
        </div>
      </div>
    </div>
    <button id="scrollToTopBtn" class="scroll-top-btn" type="button" aria-label="Scroll to top">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
    `;
  }

  function bindScrollToTop(footer) {
    var btn = footer.querySelector('#scrollToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function mount() {
    injectCSS();

    // Kill any existing hardcoded old footers on page
    document.querySelectorAll('footer:not(#siteFooter), .site-footer:not(#siteFooter)').forEach(function (el) {
      el.remove();
    });

    var f = document.getElementById('siteFooter');
    if (!f) {
      f = document.createElement('footer');
      f.id = 'siteFooter';
      f.className = 'site-footer';
      document.body.appendChild(f);
    }

    f.innerHTML = buildHTML(getPathPrefix());
    bindScrollToTop(f);

    // Apply language if i18n is loaded
    if (typeof window.applyLanguage === 'function') {
      var lang = 'sv';
      try { lang = localStorage.getItem('anrin_lang') || 'sv'; } catch (e) {}
      window.applyLanguage(lang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }

  window.mountSiteFooter = mount;
})();
