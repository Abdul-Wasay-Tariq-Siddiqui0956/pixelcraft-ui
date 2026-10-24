/**
 * PixelCraft UI — Clean Theme & Navigation System
 * Lightweight Dark/Light Mode handler with localStorage persistence.
 * Dynamic Color Engine, Global Theme Customizer Modal, and
 * Mobile Navigation Drawer controller with Outside Click, Backdrop, Touch & Escape handling.
 */

(function () {
  'use strict';

  var STORAGE_KEY_MODE = 'pixelcraft_theme_mode';
  var STORAGE_KEY_COLOR = 'pixelcraft_theme_color';
  var DEFAULT_MODE = 'light';
  var DEFAULT_COLOR = '#6C5CE7';

  var PRESET_PALETTES = [
    { name: 'Violet (Default)', hex: '#6C5CE7' },
    { name: 'Ocean Blue', hex: '#2563EB' },
    { name: 'Emerald Mint', hex: '#10B981' },
    { name: 'Sunset Rose', hex: '#F43F5E' },
    { name: 'Royal Amber', hex: '#F59E0B' },
    { name: 'Cyber Cyan', hex: '#06B6D4' },
    { name: 'Deep Purple', hex: '#8B5CF6' },
    { name: 'Coral Peach', hex: '#FF6B6B' }
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

  function adjustBrightness(hex, percent) {
    var rgb = hexToRgb(hex);
    var factor = 1 + (percent / 100);
    var r = Math.min(255, Math.max(0, Math.round(rgb.r * factor)));
    var g = Math.min(255, Math.max(0, Math.round(rgb.g * factor)));
    var b = Math.min(255, Math.max(0, Math.round(rgb.b * factor)));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }

  var ThemeEngine = {
    currentMode: DEFAULT_MODE,
    currentColor: DEFAULT_COLOR,

    init: function () {
      // 1. Detect and apply theme mode (Dark / Light)
      try {
        var savedMode = localStorage.getItem(STORAGE_KEY_MODE);
        if (savedMode === 'dark' || savedMode === 'light') {
          this.currentMode = savedMode;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          this.currentMode = 'dark';
        }
      } catch (e) {}

      // 2. Detect and apply saved brand color
      try {
        var savedColor = localStorage.getItem(STORAGE_KEY_COLOR);
        if (savedColor && /^#[0-9A-Fa-f]{6}$/.test(savedColor)) {
          this.currentColor = savedColor.toUpperCase();
        }
      } catch (e) {}

      this.applyMode(this.currentMode, false);
      this.applyColor(this.currentColor, false);

      var self = this;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
          self.setupUI();
          self.setupMobileNav();
          self.setupThemePickerModal();
          self.setupTemplateFeatures();
        });
      } else {
        self.setupUI();
        self.setupMobileNav();
        self.setupThemePickerModal();
        self.setupTemplateFeatures();
      }
    },

    applyMode: function (mode, save) {
      this.currentMode = mode;
      var root = document.documentElement;
      var isDark = mode === 'dark';
      if (isDark) {
        root.setAttribute('data-theme', 'dark');
        root.classList.add('dark');
      } else {
        root.setAttribute('data-theme', 'light');
        root.classList.remove('dark');
      }

      if (save !== false) {
        try {
          localStorage.setItem(STORAGE_KEY_MODE, mode);
        } catch (e) {}
      }

      this.updateUIIcons();
      this.updateLogos(isDark);
      this.updateNavIcons(isDark);
      this.updateDashboardElements();
    },

    applyColor: function (hex, save) {
      if (!hex || !/^#[0-9A-Fa-f]{3,6}$/.test(hex)) return;
      this.currentColor = hex.toUpperCase();

      var rgb = hexToRgb(this.currentColor);
      var darker = adjustBrightness(this.currentColor, -15);
      var lighter = adjustBrightness(this.currentColor, 25);
      var tint50 = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.14)';
      var rgbStr = rgb.r + ', ' + rgb.g + ', ' + rgb.b;

      var root = document.documentElement;
      root.style.setProperty('--primary', this.currentColor);
      root.style.setProperty('--primary-600', darker);
      root.style.setProperty('--primary-hover', darker);
      root.style.setProperty('--primary-rgb', rgbStr);
      root.style.setProperty('--lavender', lighter);
      root.style.setProperty('--lavender-50', tint50);
      root.style.setProperty('--primary-light', tint50);
      root.style.setProperty('--focus', this.currentColor);

      if (save !== false) {
        try {
          localStorage.setItem(STORAGE_KEY_COLOR, this.currentColor);
        } catch (e) {}
      }

      // Update color dots and swatches across UI
      document.querySelectorAll('.theme-dot').forEach(function (el) {
        el.style.backgroundColor = hex;
      });

      document.querySelectorAll('.theme-hex-value').forEach(function (el) {
        el.textContent = hex;
      });

      document.querySelectorAll('.dash-color-pill-btn').forEach(function (btn) {
        var preset = btn.getAttribute('data-theme-preset');
        if (preset && preset.toUpperCase() === hex.toUpperCase()) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      var dashInput = document.getElementById('dashCustomColorInput');
      if (dashInput) dashInput.value = this.currentColor;
    },

    resetPageDefault: function () {
      this.applyColor(DEFAULT_COLOR, true);
      this.showToast('Reset brand color to default violet');
    },

    updateLogos: function (isDark) {
      document.querySelectorAll('.brand-logo-img').forEach(function (img) {
        if (img.closest('.site-footer')) return; // Footer logo stays dark mode
        var src = img.getAttribute('src') || '';
        if (isDark) {
          if (src.indexOf('logo-dark.svg') === -1 && src.indexOf('logo.svg') !== -1) {
            img.setAttribute('src', src.replace('logo.svg', 'logo-dark.svg'));
          }
        } else {
          if (src.indexOf('logo-dark.svg') !== -1) {
            img.setAttribute('src', src.replace('logo-dark.svg', 'logo.svg'));
          }
        }
      });
    },

    updateNavIcons: function (isDark) {
      document.querySelectorAll('details.mobile-nav-toggle').forEach(function (details) {
        var img = details.querySelector('summary img');
        if (!img) return;
        var isOpen = details.open;
        if (isOpen) {
          img.setAttribute('src', isDark ? 'assets/icons/close-dark.svg' : 'assets/icons/close.svg');
        } else {
          img.setAttribute('src', isDark ? 'assets/icons/menu-dark.svg' : 'assets/icons/menu.svg');
        }
      });
    },

    toggleMode: function () {
      var nextMode = this.currentMode === 'dark' ? 'light' : 'dark';
      this.applyMode(nextMode, true);
      this.showToast(nextMode === 'dark' ? '🌙 Dark Mode Activated' : '☀️ Light Mode Activated');
    },

    updateUIIcons: function () {
      var isDark = this.currentMode === 'dark';
      document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
        var icon = btn.querySelector('.theme-toggle-icon');
        if (icon) {
          icon.textContent = isDark ? '☀️' : '🌙';
        }
        var text = btn.querySelector('.theme-toggle-text');
        if (text) {
          text.textContent = isDark ? 'Light' : 'Dark';
        }
        btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
        btn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      });
    },

    updateDashboardElements: function () {
      var isDark = this.currentMode === 'dark';
      var dashModeLabel = document.getElementById('dash-mode-label');
      if (dashModeLabel) {
        dashModeLabel.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
      }
      var hexValues = document.querySelectorAll('.theme-hex-value');
      var self = this;
      hexValues.forEach(function (el) {
        el.textContent = self.currentColor;
      });
    },

    setupUI: function () {
      var self = this;
      this.updateLogos(this.currentMode === 'dark');
      this.updateNavIcons(this.currentMode === 'dark');

      // 1. Theme toggle buttons
      document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
        if (!btn._modeWired) {
          btn._modeWired = true;
          btn.addEventListener('click', function (e) {
            e.preventDefault();
            self.toggleMode();
          });
        }
      });
      this.updateUIIcons();
      this.updateDashboardElements();

      // 2. Preset color buttons in Dashboard
      document.querySelectorAll('.dash-color-pill-btn[data-theme-preset]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          var hex = btn.getAttribute('data-theme-preset');
          if (hex) {
            self.applyColor(hex, true);
            self.showToast('Brand color updated to ' + hex);
          }
        });
      });

      // 3. Custom color input on Dashboard
      var dashColorInput = document.getElementById('dashCustomColorInput');
      if (dashColorInput) {
        dashColorInput.value = this.currentColor;
        dashColorInput.addEventListener('input', function (e) {
          self.applyColor(e.target.value, true);
        });
      }

      var dashResetBtn = document.getElementById('btnResetThemeDash');
      if (dashResetBtn) {
        dashResetBtn.addEventListener('click', function (e) {
          e.preventDefault();
          self.resetPageDefault();
        });
      }
    },

    setupMobileNav: function () {
      var self = this;
      // Backdrop element to dim background and capture outside clicks/taps
      var backdrop = document.querySelector('.mobile-nav-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'mobile-nav-backdrop';
        backdrop.setAttribute('aria-hidden', 'true');
        document.body.appendChild(backdrop);
      }

      function updateNavIcon(details) {
        var img = details.querySelector('summary img');
        if (!img) return;
        var isDark = self.currentMode === 'dark';
        if (details.open) {
          img.setAttribute('src', isDark ? 'assets/icons/close-dark.svg' : 'assets/icons/close.svg');
        } else {
          img.setAttribute('src', isDark ? 'assets/icons/menu-dark.svg' : 'assets/icons/menu.svg');
        }
      }

      function updateBackdrop() {
        var anyOpen = !!document.querySelector('details.mobile-nav-toggle[open]');
        if (anyOpen) {
          backdrop.classList.add('active');
        } else {
          backdrop.classList.remove('active');
        }
      }

      function closeAllNavs() {
        var openToggles = document.querySelectorAll('details.mobile-nav-toggle[open]');
        if (openToggles.length) {
          openToggles.forEach(function (details) {
            details.removeAttribute('open');
            updateNavIcon(details);
          });
          updateBackdrop();
        }
      }

      // 1. Close when clicking or tapping on the backdrop
      backdrop.addEventListener('click', function (e) {
        e.preventDefault();
        closeAllNavs();
      });
      backdrop.addEventListener('touchstart', function () {
        closeAllNavs();
      }, { passive: true });

      // 2. Track toggle events on all details.mobile-nav-toggle elements
      document.querySelectorAll('details.mobile-nav-toggle').forEach(function (details) {
        if (!details._navWired) {
          details._navWired = true;
          details.addEventListener('toggle', function () {
            updateNavIcon(details);
            updateBackdrop();
          });
        }
      });

      // 3. Global click handler: close when clicking anywhere outside the details element
      document.addEventListener('click', function (e) {
        var openToggles = document.querySelectorAll('details.mobile-nav-toggle[open]');
        if (!openToggles.length) return;

        openToggles.forEach(function (details) {
          var summary = details.querySelector('summary');
          if (summary && summary.contains(e.target)) {
            return;
          }

          var link = e.target.closest('a');
          if (link && details.contains(link)) {
            details.removeAttribute('open');
            updateNavIcon(details);
            return;
          }

          if (!details.contains(e.target)) {
            details.removeAttribute('open');
            updateNavIcon(details);
          }
        });
        updateBackdrop();
      });

      // 4. Global touchstart listener for immediate response on mobile devices
      document.addEventListener('touchstart', function (e) {
        var openToggles = document.querySelectorAll('details.mobile-nav-toggle[open]');
        if (!openToggles.length) return;

        openToggles.forEach(function (details) {
          var summary = details.querySelector('summary');
          if (summary && summary.contains(e.target)) {
            return;
          }
          if (!details.contains(e.target)) {
            details.removeAttribute('open');
            updateNavIcon(details);
          }
        });
        updateBackdrop();
      }, { passive: true });

      // 5. Escape key closes mobile nav
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
          closeAllNavs();
        }
      });
    },

    setupThemePickerModal: function () {
      var self = this;

      // Create modal elements in DOM once
      var modalOverlay = document.getElementById('pixelcraft-theme-modal');
      if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'pixelcraft-theme-modal';
        modalOverlay.className = 'theme-customizer-modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-label', 'Theme and Color Customizer');

        var swatchesMarkup = PRESET_PALETTES.map(function (c) {
          return '<button type="button" class="theme-modal-swatch" data-color="' + c.hex + '" title="' + c.name + '" style="background-color: ' + c.hex + ';"></button>';
        }).join('');

        modalOverlay.innerHTML = `
          <div class="theme-modal-card">
            <div class="theme-modal-header">
              <div class="theme-modal-title">
                <span>🎨</span>
                <span>Theme &amp; Appearance Studio</span>
              </div>
              <button type="button" class="theme-modal-close" aria-label="Close customizer">&times;</button>
            </div>
            <div class="theme-modal-body">
              <div class="theme-modal-section">
                <div class="theme-modal-section-title">Color Scheme</div>
                <div class="theme-modal-mode-buttons">
                  <button type="button" class="theme-modal-mode-btn" data-set-mode="light">
                    <span>☀️</span> <span>Light Mode</span>
                  </button>
                  <button type="button" class="theme-modal-mode-btn" data-set-mode="dark">
                    <span>🌙</span> <span>Dark Mode</span>
                  </button>
                </div>
              </div>

              <div class="theme-modal-section">
                <div class="theme-modal-section-title">Brand Color Palette</div>
                <div class="theme-modal-swatches">
                  ${swatchesMarkup}
                </div>
              </div>

              <div class="theme-modal-section">
                <div class="theme-modal-section-title">Custom Brand Color Wheel</div>
                <div class="theme-modal-custom-picker">
                  <input type="color" id="themeModalColorPicker" value="${self.currentColor}" />
                  <div>
                    <strong class="theme-modal-hex-preview">${self.currentColor}</strong>
                    <div style="font-size: 11px; color: var(--text-muted);">Pick any color to theme buttons, borders, and accents</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="theme-modal-footer">
              <button type="button" class="btn btn-secondary btn-sm" id="themeModalResetBtn">↺ Reset Default</button>
              <button type="button" class="btn btn-primary btn-sm theme-modal-done-btn">Done</button>
            </div>
          </div>
        `;

        document.body.appendChild(modalOverlay);

        // Close logic
        function closeModal() {
          modalOverlay.classList.remove('is-active');
        }

        modalOverlay.querySelector('.theme-modal-close').addEventListener('click', closeModal);
        modalOverlay.querySelector('.theme-modal-done-btn').addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', function (e) {
          if (e.target === modalOverlay) closeModal();
        });
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
            closeModal();
          }
        });

        // Mode switch buttons inside modal
        modalOverlay.querySelectorAll('[data-set-mode]').forEach(function (btn) {
          btn.addEventListener('click', function () {
            var targetMode = btn.getAttribute('data-set-mode');
            self.applyMode(targetMode, true);
            updateModalUI();
          });
        });

        // Swatches
        modalOverlay.querySelectorAll('.theme-modal-swatch').forEach(function (swatch) {
          swatch.addEventListener('click', function () {
            var col = swatch.getAttribute('data-color');
            if (col) {
              self.applyColor(col, true);
              updateModalUI();
            }
          });
        });

        // Custom color input
        var customInput = modalOverlay.querySelector('#themeModalColorPicker');
        if (customInput) {
          customInput.addEventListener('input', function (e) {
            self.applyColor(e.target.value, true);
            updateModalUI();
          });
        }

        // Reset button
        var resetBtn = modalOverlay.querySelector('#themeModalResetBtn');
        if (resetBtn) {
          resetBtn.addEventListener('click', function () {
            self.resetPageDefault();
            updateModalUI();
          });
        }
      }

      function updateModalUI() {
        if (!modalOverlay) return;
        var isDark = self.currentMode === 'dark';
        modalOverlay.querySelectorAll('[data-set-mode]').forEach(function (b) {
          if (b.getAttribute('data-set-mode') === (isDark ? 'dark' : 'light')) {
            b.classList.add('is-active');
          } else {
            b.classList.remove('is-active');
          }
        });

        modalOverlay.querySelectorAll('.theme-modal-swatch').forEach(function (s) {
          var c = s.getAttribute('data-color') || '';
          if (c.toUpperCase() === self.currentColor.toUpperCase()) {
            s.classList.add('is-active');
          } else {
            s.classList.remove('is-active');
          }
        });

        var hexPreview = modalOverlay.querySelector('.theme-modal-hex-preview');
        if (hexPreview) hexPreview.textContent = self.currentColor;
        var cInput = modalOverlay.querySelector('#themeModalColorPicker');
        if (cInput) cInput.value = self.currentColor;
      }

      // Wire all trigger buttons with [data-theme-picker-open]
      document.addEventListener('click', function (e) {
        var trigger = e.target.closest('[data-theme-picker-open]');
        if (!trigger) return;
        e.preventDefault();
        updateModalUI();
        modalOverlay.classList.add('is-active');
      });
    },

    showToast: function (message) {
      var toast = document.querySelector('.pixelcraft-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.className = 'pixelcraft-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
      }
      toast.innerHTML = '<span>✨</span> <span>' + message + '</span>';
      toast.classList.add('is-visible');
      if (this._toastTimer) clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(function () {
        toast.classList.remove('is-visible');
      }, 2600);
    },

    setupTemplateFeatures: function () {
      var self = this;

      // 1. One-click Copy Code / Copy Template buttons
      document.addEventListener('click', function (e) {
        var copyBtn = e.target.closest('[data-copy-template], [data-copy-code], .code-copy-btn');
        if (!copyBtn) return;
        e.preventDefault();

        var textToCopy = '';
        var targetId = copyBtn.getAttribute('data-copy-template') || copyBtn.getAttribute('data-copy-code');

        if (targetId) {
          var targetEl = document.getElementById(targetId) || document.querySelector(targetId);
          if (targetEl) {
            var pre = targetEl.querySelector('pre');
            if (pre) {
              textToCopy = pre.innerText;
            } else {
              textToCopy = targetEl.innerText || targetEl.textContent;
            }
          }
        } else {
          var showcase = copyBtn.closest('.component-showcase') || copyBtn.closest('.template-browser-frame') || copyBtn.closest('article');
          if (showcase) {
            var pre = showcase.querySelector('pre');
            if (pre) textToCopy = pre.innerText;
          }
        }

        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(function () {
            self.showToast('Template Code Copied to Clipboard!');
            var origText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            setTimeout(function () {
              copyBtn.textContent = origText;
            }, 2000);
          }).catch(function () {
            self.showToast('Code Selected (Press Ctrl+C to Copy)');
          });
        }
      });

      // 2. Interactive Template Category Filter Tabs on Home & Templates
      var filterTabs = document.querySelectorAll('.filter-tab-pill[data-filter]');
      if (filterTabs.length) {
        filterTabs.forEach(function (tab) {
          tab.addEventListener('click', function (e) {
            e.preventDefault();
            var filter = tab.getAttribute('data-filter');
            filterTabs.forEach(function (t) { t.classList.remove('is-active'); });
            tab.classList.add('is-active');

            var items = document.querySelectorAll('[data-template-category]');
            items.forEach(function (item) {
              var cat = item.getAttribute('data-template-category') || '';
              if (filter === 'all' || cat.includes(filter)) {
                item.style.display = '';
                item.style.opacity = '1';
              } else {
                item.style.display = 'none';
                item.style.opacity = '0';
              }
            });
          });
        });
      }
    }
  };

  ThemeEngine.init();
  window.PixelCraftTheme = ThemeEngine;
})();
