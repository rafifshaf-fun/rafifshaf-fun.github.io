# Rafif Shafwan — Personal Website

**ML Engineer & AI Consultant** · Garut, Indonesia · [rafifshaf-fun.github.io](https://rafifshaf-fun.github.io)

---

## About This Site

This is my personal portfolio and technical blog — a static site built with plain HTML, CSS, and JavaScript, deployed on GitHub Pages.

### What's Here

- **Home** — Hero, featured case studies, live RAG chatbot demo
- **About** — My story, philosophy, and what I'm looking for
- **Projects** — Architecture case studies (the thinking behind the code)
- **Blog** — Technical deep dives on ML engineering and MLOps
- **Uses** — My full stack: languages, tools, frameworks, hardware
- **Contact** — How to reach me

### Key Design Decisions

| Concern | Choice |
|---|---|
| **Stack** | Plain HTML/CSS/JS — zero dependencies, deploys instantly |
| **Styling** | Custom CSS with a dark theme (matches my GitHub vibe) |
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
├── about.html                          # About me
├── uses.html                           # Tools & stack
├── contact.html                        # Contact form & info
├── 404.html                            # Custom 404
├── projects/
│   ├── index.html                      # Projects listing
│   ├── sovereign-ledger.html           # Case study
│   ├── indonesian-stock-mlops.html     # Case study
│   ├── multi-stage-cv.html             # Case study
│   ├── cv-rag-chatbot.html             # Case study
│   └── magic-chess.html                # Case study
├── blog/
│   ├── index.html                      # Blog listing
│   ├── why-i-measure-my-rag.html
│   ├── detect-then-classify.html
│   └── mlops-without-burnout.html
├── assets/
│   ├── css/style.css
│   └── js/main.js
├── .github/workflows/deploy.yml
├── CNAME                              # For custom domain
└── README.md
```

---

## License

© 2024 Rafif Shafwan. All rights reserved.
