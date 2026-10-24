const fs = require('fs');

const icons = {
  'menu': '<path d="M4 6h16M4 12h16M4 18h16" />',
  'close': '<path d="M18 6L6 18M6 6l12 12" />',
  'arrow-right': '<path d="M5 12h14M12 5l7 7-7 7" />',
  'check': '<polyline points="20 6 9 17 4 12" />',
  'code': '<polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />',
  'layers': '<polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />',
  'layout': '<rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" />',
  'form': '<rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 8h10M7 12h10M7 16h6" />',
  'card': '<rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="7.5" cy="8.5" r="1.5" /><path d="M7 14h10M7 17h6" />',
  'footer': '<rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="15" x2="21" y2="15" /><circle cx="6" cy="18" r="0.75" /><circle cx="9" cy="18" r="0.75" /><circle cx="12" cy="18" r="0.75" />',
  'accessibility': '<circle cx="12" cy="4.5" r="2" /><path d="M5 9h14M12 9v11M8 20l4-4 4 4" />',
  'mobile': '<rect x="6" y="2" width="12" height="20" rx="2" /><line x1="11" y1="18" x2="13" y2="18" /><line x1="10" y1="5" x2="14" y2="5" />',
  'palette': '<circle cx="13.5" cy="6.5" r=".75" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".75" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".75" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12c0 3.6 2 5.3 4 5.3.9 0 1.5-.7 1.5-1.5 0-.8.7-1.5 1.5-1.5h1.8c4.6 0 8.2-3.6 8.2-8.3C19 4.3 15.9 2 12 2z" />',
  'print': '<polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" /><rect x="6" y="14" width="12" height="8" />',
  'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />',
  'external-link': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />'
};

const dirs = ['assets/icons', 'public/assets/icons'];
for (const [name, inner] of Object.entries(icons)) {
  const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  ${inner}
</svg>
`;
  for (const d of dirs) {
    fs.writeFileSync(`${d}/${name}.svg`, content, 'utf8');
  }
}
console.log('Successfully generated all 16 SVG icons in assets/icons and public/assets/icons');
