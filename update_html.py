import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'(<img src="assets/images/cards/project-.*?") style="[^"]+"(>)', r'\1\2', content)
content = re.sub(r'<div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba\(0,0,0,0\.4\); z-index: 1;"></div>\s*', '', content)
content = content.replace('id="competencies" class="section bg-surface"', 'id="competencies" class="section bg-alt"')
content = content.replace('stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>', 'stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>')
content = content.replace('btn btn-outline btn-small btn-full">Xem mẫu', 'btn btn-outline btn-small">Xem mẫu')
content = content.replace('assets/images/cards/project-app-desktop-quan-l.png', 'assets/images/cards/project-app-desktop-quan-ly.png')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
