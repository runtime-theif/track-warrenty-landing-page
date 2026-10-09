#!/usr/bin/env python3
"""Builds the static guide / comparison / brands content pages from pages_content.py.

Run from the repo root:  python3 tools/build_pages.py
Pages share the site header/footer, site.css, Article + BreadcrumbList (+ FAQPage) schema.
"""
import html, json, os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from pages_content import PAGES, UPDATED  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://trackwarranty.app'
PLAY = 'https://play.google.com/store/apps/details?id=app.trackwarranty'
ZIG = ('<svg viewBox="0 0 100 100" aria-hidden="true"{s}><path d="M22 8h56a10 10 0 0110 10v56L69 92 50 74 31 92 12 74V18A10 10 0 0122 8z" '
       'fill="#101114" stroke="#101114" stroke-width="4" stroke-linejoin="round"/><path d="M32 40l12 12 24-24" fill="none" stroke="#D4FF3A" '
       'stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>')


def ld(obj):
    return '<script type="application/ld+json">\n' + json.dumps(obj, ensure_ascii=False, indent=2) + '\n</script>'


def page(p):
    url = f"{BASE}/{p['slug']}"
    crumbs = [('Home', f'{BASE}/')] + p.get('crumbs', []) + [(p['crumb'], url)]
    schema = [
        {
            '@context': 'https://schema.org', '@type': 'Article', 'headline': p['h1'],
            'description': p['desc'], 'url': url, 'datePublished': UPDATED, 'dateModified': UPDATED,
            'inLanguage': 'en', 'image': f'{BASE}/preview.png',
            'author': {'@type': 'Organization', 'name': 'TrackWarranty', 'url': f'{BASE}/'},
            'publisher': {'@type': 'Organization', 'name': 'TrackWarranty', 'logo': {'@type': 'ImageObject', 'url': f'{BASE}/assets/brand/logo-512.png'}},
        },
        {
            '@context': 'https://schema.org', '@type': 'BreadcrumbList',
            'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': n, 'item': u} for i, (n, u) in enumerate(crumbs)],
        },
    ]
    if p.get('faq'):
        schema.append({
            '@context': 'https://schema.org', '@type': 'FAQPage',
            'mainEntity': [{'@type': 'Question', 'name': q, 'acceptedAnswer': {'@type': 'Answer', 'text': a}} for q, a in p['faq']],
        })
    if p.get('extra_schema'):
        schema.append(p['extra_schema'])

    crumb_html = ' / '.join(
        [f'<a href="/">Home</a>'] + [f'<a href="{u.replace(BASE, "")}">{html.escape(n)}</a>' for n, u in p.get('crumbs', [])]
        + [f'<span aria-current="page">{html.escape(p["crumb"])}</span>'])

    faq_html = ''
    if p.get('faq'):
        faq_html = '<section class="terms-section"><h2>Quick answers</h2>' + ''.join(
            f'<details class="qa"><summary>{html.escape(q)}</summary><p>{html.escape(a)}</p></details>' for q, a in p['faq']) + '</section>'

    related = ''.join(f'<a class="rel" href="/{s}">{html.escape(t)} →</a>' for s, t in p.get('related', []))
    is_b2b = p.get('b2b')
    cta = (
        f'''<div class="guide-cta band-ink"><div><b>Run warranty programs for your brand</b><span>QR registration, program launch and tracking, claims and owner data.</span></div>
        <a class="btn btn-volt" href="/brands.html#demo">Book a demo</a></div>''' if is_b2b else
        f'''<div class="guide-cta band-ink"><div><b>Keep every bill and warranty in one place</b><span>TrackWarranty is free, works offline and reminds you before cover ends.</span></div>
        <a class="btn btn-volt" href="{PLAY}" data-track="play_guide">Get it on Google Play</a></div>''')

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-BJLWPKL409"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){{dataLayer.push(arguments);}}
    gtag('js', new Date());
    gtag('config', 'G-BJLWPKL409');
    </script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#F3F2EC">
    <title>{html.escape(p['title'])}</title>
    <meta name="description" content="{html.escape(p['desc'])}">
    <meta property="og:title" content="{html.escape(p['title'])}">
    <meta property="og:description" content="{html.escape(p['desc'])}">
    <meta property="og:image" content="{BASE}/preview.png">
    <meta property="og:url" content="{url}">
    <meta property="og:type" content="article">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="canonical" href="{url}">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="apple-touch-icon" href="/assets/brand/apple-touch-icon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700..800&family=Geist:wght@400..700&family=Geist+Mono:wght@400..500&display=swap">
    <link rel="stylesheet" href="/site.css">
    {chr(10).join('    ' + ld(s) for s in schema)}
</head>
<body>
<header class="site-header">
    <nav class="nav wrap" aria-label="Main">
        <a href="/" class="brand" aria-label="TrackWarranty home">{ZIG.format(s='')}<span class="wordmark">trackwarranty</span></a>
        <div class="nav-links">
            <a href="/#how">How it works</a>
            <a href="/guides/">Guides</a>
            <a href="/best-warranty-tracker-apps.html">Compare apps</a>
            <a href="/privacy.html">Privacy</a>
        </div>
        <a href="/brands.html" class="btn btn-outline">For brands →</a>
        <a href="/#get" class="btn btn-ink">Get the app</a>
    </nav>
</header>
<main class="legal wrap">
    <nav aria-label="Breadcrumb" class="crumbs">{crumb_html}</nav>
    <article class="legal-body guide">
        <h1>{html.escape(p['h1'])}</h1>
        <p class="last-updated">Updated {UPDATED}</p>
        <p class="tldr"><b>Short answer:</b> {p['tldr']}</p>
        {p['body']}
        {faq_html}
        {cta}
        <div class="related">{related}</div>
    </article>
</main>
<footer class="site-footer">
    <div class="wrap footer-grid">
        <div style="max-width:320px;gap:12px">
            <span class="brand">{ZIG.format(s=' style="width:30px;height:30px"')}<span class="wordmark">trackwarranty</span></span>
            <span class="muted">The warranty vault for every home, everywhere.</span>
        </div>
        <div><b>Product</b><a href="/#how">How it works</a><a href="/#features">Features</a><a href="/best-warranty-tracker-apps.html">Compare apps</a></div>
        <div><b>Guides</b><a href="/guides/">All guides</a><a href="/guides/do-i-need-receipt-for-warranty-claim.html">Receipts &amp; claims</a><a href="/guides/check-warranty-by-serial-number.html">Check warranty</a></div>
        <div><b>Company</b><a href="/brands.html">For brands</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a></div>
        <div><b>Support</b><a href="tel:+916207466460">+91 62074 66460</a><a href="mailto:vidya@repliantai.com">vidya@repliantai.com</a></div>
    </div>
    <div class="wrap footer-legal">© <span data-year>2026</span> TrackWarranty</div>
</footer>
<script src="/site.js" defer></script>
</body>
</html>
'''


def main():
    for p in PAGES:
        out = os.path.join(ROOT, p['slug'] if not p['slug'].endswith('/') else p['slug'] + 'index.html')
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, 'w') as f:
            f.write(page(p))
        print('wrote', os.path.relpath(out, ROOT))


if __name__ == '__main__':
    main()
