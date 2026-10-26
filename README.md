# Luminary Steps · 2-minute interest quiz

A mobile-first career-interest quiz for Class 9–12 students. 12 quick taps (RIASEC model), then a scroll-drawn constellation of careers, stream cards and a "What if you wanted something different?" explorer.

No build step, no dependencies, no backend. Nothing is saved; the result lives in the page link (`#g=…&s=…&a=…`).

## Run locally (VS Code)
1. Open this folder in VS Code.
2. Install the **Live Server** extension, right-click `index.html` → **Open with Live Server**.
   (Or just double-click `index.html`; it also works from `file://`.)

## Files
- `index.html` — page shell
- `style.css` — all styling and animations
- `script.js` — questions, careers, scoring, screens

## Push to GitHub
```bash
git init
git add .
git commit -m "Luminary Steps quiz prototype"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```
Free hosting: repo **Settings → Pages → Deploy from branch → main / (root)**.

## Notes
- Scoring: each code scores 2–10; ties go to the stronger single answer, then the fixed order R, I, A, S, E, C.
- Careers marked "Needs PCM / PCB / Commerce" are stream-gated; please verify against your Stream Matrix.
- Credits: RIASEC model; careers cross-checked against O*NET (US Dept. of Labor, CC BY 4.0).
