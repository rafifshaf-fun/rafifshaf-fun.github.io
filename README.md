# Rafif Shafwan — Personal Website

**AI/ML Engineer · Data Scientist · Full-Stack Developer** · Garut, Indonesia · [rafifshaf.fun](https://rafifshaf.fun)

---

## About This Site

This is my personal portfolio and technical blog — a static site built with plain HTML, CSS, and JavaScript, deployed on GitHub Pages.

### What's Here

- **Home** — Hero, featured case studies, live RAG chatbot demo
- **About** — My story, work history, philosophy, and what I'm looking for
- **Projects** — Architecture case studies (the thinking behind the code)
- **Blog** — Technical deep dives on ML engineering and MLOps
- **Uses** — My full stack: languages, tools, frameworks, hardware
- **Open Source** — Merged contributions to projects I don't own
- **Contact** — How to reach me

### Bilingual (EN / ID)

Every page ships in English and Indonesian. There are two mechanisms:

| Page type | Mechanism |
|---|---|
| Top-level pages (`about`, `uses`, `opensource`, `contact`) | Inline `data-i18n` attributes + `TRANSLATIONS_ID` in `assets/js/i18n.js`. The language toggle swaps text in place. |
| Articles (blog posts, project case studies) | Separate `*-id.html` files. These carry `data-article="true"` on `<body>`, which makes the toggle redirect to the matching language file. |

When adding a new article, create both the English and the `-id.html` version, and add `hreflang` alternates for SEO.

### Key Design Decisions

| Concern | Choice |
|---|---|
| **Stack** | Plain HTML/CSS/JS — zero dependencies, deploys instantly |
| **Styling** | Custom CSS with an editorial light theme (papery, print-like) |
| **i18n** | Inline `data-i18n` for pages, separate `-id.html` files for articles |
| **Diagrams** | Mermaid.js (renders architecture diagrams in-browser) |
| **Fonts** | Inter + JetBrains Mono (Google Fonts) |
| **Deployment** | GitHub Pages via GitHub Actions (push to main → auto-deploy) |
| **Analytics** | None yet — considering Plausible (privacy-first) |

### The NDA Reality

Most of my best work is under non-disclosure agreements with enterprise clients. The case studies on this site explain the **engineering thinking** behind each system — the architecture, the hard problems, and what I'd do differently.

Look for the 🔒 **Enterprise NDA** badge on projects that had confidential production versions.

---

## Local Development

```bash
# Just open index.html in a browser — no build step needed
# Or use any static file server:
python -m http.server 8000
# Then visit http://localhost:8000
```

---

## Structure

```
.
├── index.html                          # Home page
├── about.html                          # About me + work history
├── uses.html                           # Tools & stack
├── opensource.html                     # Open source contributions
├── contact.html                        # Contact info
├── 404.html                            # Custom 404
├── projects/
│   ├── index.html                      # Projects listing
│   ├── sovereign-ledger.html           # Case study (+ -id.html)
│   ├── indonesian-stock-mlops.html     # Case study (+ -id.html)
│   ├── multi-stage-cv.html             # Case study (+ -id.html)
│   ├── cv-rag-chatbot.html             # Case study (+ -id.html)
│   ├── multi-agent-rag.html            # Case study (+ -id.html)
│   ├── magic-chess.html                # Case study (+ -id.html)
│   └── makmur-grosir.html              # Case study (EN only)
├── blog/
│   ├── index.html                      # Blog listing
│   ├── why-i-measure-my-rag.html       # (+ -id.html)
│   ├── detect-then-classify.html       # (+ -id.html)
│   └── mlops-without-burnout.html      # (+ -id.html)
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── js/i18n.js                      # EN ↔ ID translations
│   ├── images/
│   └── file/                           # CV PDFs (EN + ID)
├── .github/workflows/deploy.yml
├── CNAME                              # rafifshaf.fun
└── README.md
```

---

## Adding a New Translation Key

1. Add `data-i18n="my-key"` to the element (English text stays in the HTML as the default).
2. Add `'my-key': 'Teks Indonesia',` to `TRANSLATIONS_ID` in `assets/js/i18n.js`.
3. Add `data-i18n` to the nav copy in **all** HTML files if it's a nav item.

Missing keys are safe — `i18n.apply()` leaves the English HTML untouched when a key is absent.

---

## License

© 2026 Rafif Shafwan. All rights reserved.
