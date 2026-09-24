#!/usr/bin/env python3
from pathlib import Path
from urllib.parse import urljoin
from datetime import date
import sys

if len(sys.argv) != 2:
    raise SystemExit('Usage: python tools/make-sitemap.py https://ravindunawanjana.github.io/ai-ready-colombo/')

base = sys.argv[1].strip()
if not base.startswith(('https://', 'http://')):
    raise SystemExit('Use the full published site URL, starting with https://')
if not base.endswith('/'):
    base += '/'

root = Path(__file__).resolve().parents[1]
pages = [
    '',
    'start.html',
    'modules/module-1.html',
    'modules/module-2.html',
    'modules/module-3.html',
    'modules/module-4.html',
    'modules/module-5.html',
    'privacy.html',
    'toolkit.html',
    'final-assessment.html',
    'completion.html',
    'about.html',
    'privacy-notice.html',
    'ai-disclosure.html',
    'site-map.html',
]

today = date.today().isoformat()
urls = '\n'.join(
    f'  <url><loc>{urljoin(base, p)}</loc><lastmod>{today}</lastmod></url>'
    for p in pages
)

xml = f'''<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n{urls}\n</urlset>\n'''
(root / 'sitemap.xml').write_text(xml, encoding='utf-8')
(root / 'robots.txt').write_text(
    f'User-agent: *\nAllow: /\n\nSitemap: {urljoin(base, "sitemap.xml")}\n',
    encoding='utf-8'
)
print('Created sitemap.xml and updated robots.txt for', base)
