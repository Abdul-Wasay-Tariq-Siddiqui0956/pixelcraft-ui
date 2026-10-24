/**
 * PixelCraft UI — Component Live Color & Responsive Preview Engine
 * Allows users to customize the color of any component/template preview independently
 * without changing the rest of the website. Updates live preview & code in real-time.
 * Also provides interactive viewport switching (Desktop / Tablet / Mobile)
 * and dual HTML / CSS tabs with instant code copying for all components.
 */

(function () {
  'use strict';

  var COMPONENT_PRESET_COLORS = [
    { name: 'Teal / Cyan', hex: '#06B6D4' },
    { name: 'Electric Blue', hex: '#2563EB' },
    { name: 'Electric Violet', hex: '#6C5CE7' },
    { name: 'Emerald Mint', hex: '#10B981' },
    { name: 'Sunset Rose', hex: '#F43F5E' },
    { name: 'Royal Amber', hex: '#F59E0B' },
    { name: 'Deep Purple', hex: '#8B5CF6' },
    { name: 'Slate Dark', hex: '#1E293B' }
  ];

  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    var num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  function adjustBrightness(hex, percent) {
    var rgb = hexToRgb(hex);
    var factor = 1 + (percent / 100);
    var r = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
    var g = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
    var b = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
    return rgbToHex(r, g, b);
  }

  // Generates dedicated, clean CSS if a showcase only provides HTML
  function generateFallbackCss(showcase, primaryColor) {
    var id = (showcase.id || '').toLowerCase();
    var text = (showcase.innerText || '').toLowerCase();
    var col = primaryColor || '#2563EB';

    if (id.includes('navbar') || text.includes('navbar') || text.includes('navigation')) {
      return `/* PixelCraft UI — Navbar Component Styles */
:root {
  --primary: ${col};
  --primary-hover: ${adjustBrightness(col, -15)};
  --bg-surface: #FFFFFF;
  --text-main: #0F172A;
  --text-muted: #64748B;
  --border-color: #E2E8F0;
}

.pv-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 1.5rem;
  background-color: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 10px;
}

.pv-navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--text-main);
  text-decoration: none;
}

.pv-navbar__menu {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pv-navbar__link {
  padding: 0.45rem 0.85rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.pv-navbar__link:hover {
  color: var(--text-main);
  background-color: #F1F5F9;
}

.pv-navbar__link--active,
.pv-navbar__link[aria-current="page"] {
  color: var(--primary) !important;
  background-color: rgba(37, 99, 235, 0.08) !important;
  font-weight: 600;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .pv-navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .pv-navbar__menu {
    flex-wrap: wrap;
    width: 100%;
  }
}`;
    }

    if (id.includes('footer') || text.includes('footer') || text.includes('copyright')) {
      return `/* PixelCraft UI — Footer Component Styles */
:root {
  --primary: ${col};
  --surface: #FFFFFF;
  --text: #0F172A;
  --text-muted: #64748B;
  --border: #E2E8F0;
}

.site-footer,
.pv-footer {
  padding: 3rem 1.5rem 1.5rem;
  background-color: var(--surface);
  border-top: 1px solid var(--border);
}

.footer-top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.footer-heading {
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.footer-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: var(--primary);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}`;
    }

    if (id.includes('login') || id.includes('auth') || id.includes('form') || text.includes('password') || text.includes('sign in')) {
      return `/* PixelCraft UI — Authentication & Form Styles */
:root {
  --primary: ${col};
  --primary-hover: ${adjustBrightness(col, -15)};
  --surface: #FFFFFF;
  --text: #0F172A;
  --text-muted: #64748B;
  --border: #CBD5E1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 0.95rem;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  background-color: var(--surface);
  color: var(--text);
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3.5px rgba(37, 99, 235, 0.18);
  outline: none;
}

.btn-primary {
  width: 100%;
  padding: 0.8rem 1.25rem;
  background-color: var(--primary);
  color: #FFFFFF;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background-color: var(--primary-hover);
  transform: translateY(-1px);
}`;
    }

    // Default template styles
    return `/* PixelCraft UI — Template Styles */
:root {
  --primary: ${col};
  --primary-600: ${adjustBrightness(col, -15)};
  --surface: #FFFFFF;
  --text: #0F172A;
  --text-muted: #64748B;
  --border: #E2E8F0;
}

.pv-btn--primary,
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  background-color: var(--primary);
  color: #FFFFFF;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 8px;
  border: none;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pv-btn--primary:hover,
.btn-primary:hover {
  background-color: var(--primary-600);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .btn-primary {
    width: 100%;
  }
}`;
  }

  function initComponentCustomizers() {
    var showcases = document.querySelectorAll('.component-showcase');
    if (!showcases || showcases.length === 0) return;

    showcases.forEach(function (showcase, index) {
      var previewStage = showcase.querySelector('.preview-stage, .pv-frame');
      if (!previewStage) return;

      // Avoid double initialization of toolbar
      if (showcase.querySelector('.pv-customizer-toolbar')) return;

      // Determine initial color for this component
      var defaultColor = '#2563EB';
      var textContent = (showcase.innerText || '').toLowerCase();
      var showcaseId = (showcase.id || '').toLowerCase();

      if (showcaseId.includes('saas') || textContent.includes('cloudflow') || showcaseId.includes('ai') || showcaseId.includes('terminal')) {
        defaultColor = '#06B6D4'; // Cyan
      } else if (showcaseId.includes('minimal') || showcaseId.includes('ecommerce') || textContent.includes('store')) {
        defaultColor = '#F43F5E'; // Rose
      } else if (showcaseId.includes('portfolio') || showcaseId.includes('services') || showcaseId.includes('healthcare') || showcaseId.includes('clinic')) {
        defaultColor = '#10B981'; // Emerald
      } else if (showcaseId.includes('fintech') || showcaseId.includes('crypto') || showcaseId.includes('split')) {
        defaultColor = '#6C5CE7'; // Violet
      } else if (showcaseId.includes('agency') || showcaseId.includes('consultant') || showcaseId.includes('glass')) {
        defaultColor = '#8B5CF6'; // Purple
      } else if (showcaseId.includes('fitness') || showcaseId.includes('restaurant') || showcaseId.includes('amber')) {
        defaultColor = '#F59E0B'; // Amber
      }

      var currentColor = defaultColor;

      // 1. Build Customizer Toolbar HTML
      var toolbar = document.createElement('div');
      toolbar.className = 'pv-customizer-toolbar';

      var swatchesHtml = COMPONENT_PRESET_COLORS.map(function (c) {
        var isAct = c.hex.toLowerCase() === defaultColor.toLowerCase();
        return '<button type="button" class="pv-cct-dot ' + (isAct ? 'is-active' : '') + '" data-pv-color="' + c.hex + '" style="background-color: ' + c.hex + ';" title="' + c.name + ' (' + c.hex + ')"></button>';
      }).join('');

      toolbar.innerHTML = `
        <div class="pv-cct-left">
          <span class="pv-cct-icon">🎨</span>
          <span class="pv-cct-title">Live Color:</span>
          <span class="pv-cct-hex">${defaultColor}</span>
        </div>
        <div class="pv-cct-right">
          <div class="pv-cct-swatches" aria-label="Preset color swatches">
            ${swatchesHtml}
          </div>
          <label class="pv-cct-picker" title="Pick ANY custom color from color wheel">
            <span class="pv-cct-picker-color-sample" style="background-color: ${defaultColor};"></span>
            <input type="color" class="pv-cct-input" value="${defaultColor}" />
            <span>Custom Color</span>
          </label>
          <div class="pv-viewport-switcher" title="Test responsive screen width">
            <button type="button" class="pv-vp-btn is-active" data-vp="desktop" title="Full Desktop View">🖥️ Full</button>
            <button type="button" class="pv-vp-btn" data-vp="tablet" title="Tablet View (768px)">📱 Tablet</button>
            <button type="button" class="pv-vp-btn" data-vp="mobile" title="Mobile View (375px)">📱 Mobile</button>
          </div>
          <button type="button" class="pv-cct-reset" title="Reset to original component color">↺ Reset</button>
        </div>
      `;

      // Insert toolbar right before preview-stage
      previewStage.parentNode.insertBefore(toolbar, previewStage);

      // 2. Setup Responsive Viewport Buttons
      var vpBtns = toolbar.querySelectorAll('.pv-vp-btn');
      vpBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          vpBtns.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');

          var vp = btn.getAttribute('data-vp');
          if (vp === 'mobile') {
            previewStage.style.maxWidth = '375px';
            previewStage.style.margin = '0 auto';
            previewStage.style.overflowX = 'auto';
            previewStage.setAttribute('data-viewport-mode', 'mobile');
          } else if (vp === 'tablet') {
            previewStage.style.maxWidth = '768px';
            previewStage.style.margin = '0 auto';
            previewStage.style.overflowX = 'auto';
            previewStage.setAttribute('data-viewport-mode', 'tablet');
          } else {
            previewStage.style.maxWidth = '100%';
            previewStage.style.margin = '0';
            previewStage.style.overflowX = 'visible';
            previewStage.removeAttribute('data-viewport-mode');
          }
        });
      });

      // 3. Setup Code Tabs (HTML & CSS) and Copy Button
      var codeSection = showcase.querySelector('.showcase-code-section');
      if (codeSection) {
        var codeHeader = codeSection.querySelector('.code-tabs-header');
        if (codeHeader) {
          var panels = codeSection.querySelectorAll('.code-tab-panel');

          // If no separate panels exist, dynamically create HTML and CSS panels!
          if (panels.length === 0) {
            var existingPre = codeSection.querySelector('pre');
            if (existingPre) {
              var htmlCode = existingPre.innerText;
              var cssCode = generateFallbackCss(showcase, currentColor);

              var htmlPanel = document.createElement('div');
              htmlPanel.className = 'code-tab-panel is-active';
              htmlPanel.setAttribute('data-tab', 'html');
              htmlPanel.appendChild(existingPre.cloneNode(true));

              var cssPanel = document.createElement('div');
              cssPanel.className = 'code-tab-panel';
              cssPanel.setAttribute('data-tab', 'css');
              cssPanel.innerHTML = '<pre class="code-block" tabindex="0"><code>' +
                cssCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') +
                '</code></pre>';

              existingPre.parentNode.removeChild(existingPre);
              codeSection.appendChild(htmlPanel);
              codeSection.appendChild(cssPanel);

              // Inject tab nav buttons in header
              var existingTag = codeHeader.querySelector('.code-language-tag');
              if (existingTag) existingTag.remove();

              var navDiv = document.createElement('div');
              navDiv.className = 'code-tabs-nav';
              navDiv.innerHTML = `
                <button type="button" class="code-tab-btn is-active" data-tab-type="html">📄 HTML</button>
                <button type="button" class="code-tab-btn" data-tab-type="css">🎨 CSS</button>
              `;
              codeHeader.insertBefore(navDiv, codeHeader.firstChild);
            }
          }

          // Wire Tab Switching
          var tabBtns = codeHeader.querySelectorAll('.code-tab-btn');
          tabBtns.forEach(function (tBtn) {
            tBtn.addEventListener('click', function (e) {
              e.preventDefault();
              tabBtns.forEach(function (b) { b.classList.remove('is-active'); });
              tBtn.classList.add('is-active');

              var target = tBtn.getAttribute('data-tab-target');
              var tabType = tBtn.getAttribute('data-tab-type');

              if (target) {
                var allPanels = codeSection.querySelectorAll('.code-tab-panel');
                allPanels.forEach(function (p) {
                  if (p.id === target) {
                    p.classList.add('is-active');
                  } else {
                    p.classList.remove('is-active');
                  }
                });
              } else if (tabType) {
                var pPanels = codeSection.querySelectorAll('.code-tab-panel');
                pPanels.forEach(function (p) {
                  if (p.getAttribute('data-tab') === tabType) {
                    p.classList.add('is-active');
                  } else {
                    p.classList.remove('is-active');
                  }
                });
              }
            });
          });

          // Wire Copy Button
          if (!codeHeader.querySelector('.btn-copy-code')) {
            var copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'btn-copy-code';
            copyBtn.innerHTML = `<span>📋</span> <span>Copy Code</span>`;
            copyBtn.addEventListener('click', function () {
              var activePanel = codeSection.querySelector('.code-tab-panel.is-active') || codeSection.querySelector('pre');
              var textToCopy = activePanel ? activePanel.innerText : '';

              if (currentColor.toLowerCase() !== defaultColor.toLowerCase() && !textToCopy.includes(currentColor)) {
                var colorHeader = `/* Customized Component Palette */\n:root {\n  --primary: ${currentColor};\n  --accent: ${currentColor};\n}\n\n`;
                textToCopy = colorHeader + textToCopy;
              }

              navigator.clipboard.writeText(textToCopy).then(function () {
                copyBtn.classList.add('is-copied');
                copyBtn.innerHTML = `<span>✓</span> <span>Copied!</span>`;
                setTimeout(function () {
                  copyBtn.classList.remove('is-copied');
                  copyBtn.innerHTML = `<span>📋</span> <span>Copy Code</span>`;
                }, 2000);
              }).catch(function () {
                copyBtn.innerHTML = `<span>✓</span> <span>Select code to copy</span>`;
              });
            });
            codeHeader.appendChild(copyBtn);
          }
        }
      }

      // 4. Apply color function specifically to THIS component preview
      function applyComponentColor(hex) {
        if (!hex || !/^#[0-9A-Fa-f]{3,6}$/.test(hex)) return;
        currentColor = hex.toUpperCase();

        var rgb = hexToRgb(hex);
        var darker = adjustBrightness(hex, -18);
        var lighter = adjustBrightness(hex, 18);
        var tint = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.12)';

        // A. Set scoped CSS variables strictly on THIS previewStage
        previewStage.style.setProperty('--primary', hex);
        previewStage.style.setProperty('--primary-600', darker);
        previewStage.style.setProperty('--primary-hover', darker);
        previewStage.style.setProperty('--accent', hex);
        previewStage.style.setProperty('--lavender', lighter);
        previewStage.style.setProperty('--lavender-50', tint);
        previewStage.style.setProperty('--primary-light', tint);
        previewStage.style.setProperty('--focus', hex);

        // B. Update primary buttons inside this preview
        previewStage.querySelectorAll('.pv-btn--primary, .btn-primary, button[type="submit"]').forEach(function (btn) {
          btn.style.setProperty('background-color', hex, 'important');
          btn.style.setProperty('border-color', darker, 'important');
          btn.style.setProperty('color', '#FFFFFF', 'important');
        });

        // C. Update active links inside this preview
        previewStage.querySelectorAll('.pv-navbar__link--active, a[aria-current="page"]').forEach(function (link) {
          link.style.setProperty('color', hex, 'important');
          link.style.setProperty('background-color', tint, 'important');
        });

        // D. Update brand icon marks ONLY (never the brand text!)
        previewStage.querySelectorAll('.pv-navbar__brand, .brand-link, .nav-brand').forEach(function (brand) {
          var spans = brand.querySelectorAll('span');
          if (spans.length > 1) {
            // First span is the icon/badge (e.g., [S], [M], [A], [D])
            spans[0].style.setProperty('background-color', hex, 'important');
            spans[0].style.setProperty('background', hex, 'important');
            spans[0].style.setProperty('color', '#FFFFFF', 'important');

            // All subsequent spans are brand text name: MUST BE TRANSPARENT
            for (var i = 1; i < spans.length; i++) {
              spans[i].style.removeProperty('background-color');
              spans[i].style.removeProperty('background');
              spans[i].style.setProperty('background', 'transparent', 'important');
              spans[i].style.setProperty('background-color', 'transparent', 'important');
            }
          } else if (spans.length === 1) {
            if (spans[0].classList.contains('brand-dot') || spans[0].classList.contains('brand-icon') || spans[0].classList.contains('brand-logo-mark')) {
              spans[0].style.setProperty('background-color', hex, 'important');
              spans[0].style.setProperty('background', hex, 'important');
            } else {
              spans[0].style.setProperty('background', 'transparent', 'important');
              spans[0].style.setProperty('background-color', 'transparent', 'important');
            }
          }
        });

        previewStage.querySelectorAll('.brand-icon, .brand-dot, .brand-logo-mark').forEach(function (el) {
          el.style.setProperty('background-color', hex, 'important');
          el.style.setProperty('background', hex, 'important');
        });

        // Ensure brand text is strictly transparent
        previewStage.querySelectorAll('.brand-name, .pv-navbar__brand > span:last-child').forEach(function (txt) {
          if (txt.parentElement && txt.parentElement.querySelectorAll('span').length > 1) {
            txt.style.setProperty('background', 'transparent', 'important');
            txt.style.setProperty('background-color', 'transparent', 'important');
          }
        });

        // E. Update toolbar UI elements
        var hexSpan = toolbar.querySelector('.pv-cct-hex');
        if (hexSpan) hexSpan.textContent = currentColor;

        var sample = toolbar.querySelector('.pv-cct-picker-color-sample');
        if (sample) sample.style.backgroundColor = currentColor;

        var colorInput = toolbar.querySelector('.pv-cct-input');
        if (colorInput && colorInput.value.toLowerCase() !== hex.toLowerCase()) {
          colorInput.value = hex;
        }

        toolbar.querySelectorAll('.pv-cct-dot').forEach(function (dot) {
          var dotColor = dot.getAttribute('data-pv-color');
          if (dotColor && dotColor.toLowerCase() === hex.toLowerCase()) {
            dot.classList.add('is-active');
          } else {
            dot.classList.remove('is-active');
          }
        });
      }

      // Initial apply
      applyComponentColor(defaultColor);

      // 5. Wire Toolbar Swatch Buttons
      toolbar.querySelectorAll('.pv-cct-dot').forEach(function (dot) {
        dot.addEventListener('click', function (e) {
          e.preventDefault();
          var col = dot.getAttribute('data-pv-color');
          if (col) applyComponentColor(col);
        });
      });

      // 6. Wire Custom Color Picker Input
      var customInput = toolbar.querySelector('.pv-cct-input');
      if (customInput) {
        customInput.addEventListener('input', function (e) {
          applyComponentColor(e.target.value);
        });
        customInput.addEventListener('change', function (e) {
          applyComponentColor(e.target.value);
        });
      }

      // 7. Wire Reset Button
      var resetBtn = toolbar.querySelector('.pv-cct-reset');
      if (resetBtn) {
        resetBtn.addEventListener('click', function (e) {
          e.preventDefault();
          applyComponentColor(defaultColor);
        });
      }
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComponentCustomizers);
  } else {
    initComponentCustomizers();
  }

  window.PixelCraftComponentCustomizer = {
    init: initComponentCustomizers
  };
})();
