[![Netlify Status](https://api.netlify.com/api/v1/badges/cc10b91a-c014-4c4f-ae8b-a1ac919fff1b/deploy-status)](https://app.netlify.com/sites/shivvtrivedi/deploys)

# Shiv Trivedi

Personal website — [shivvtrivedi.com](https://shivvtrivedi.com). Built with [Eleventy](https://www.11ty.dev/).

## Local dev

```bash
npm install   # also wires up the pre-commit hook via `prepare`
npm start     # http://localhost:8080, live-reloading
npm run build # one-off build into _site/
```

## Pre-commit hook

`npm install` sets `core.hooksPath` to `.githooks/`, which runs
[`.githooks/pre-commit`](./.githooks/pre-commit) before every commit.
The hook validates:

- Frontmatter in `pages/`, `posts/`, `projects/` markdown (opens+closes
  with `---`, no accidental `## key:` markdown-heading corruption).
- `_data/*.json` files parse as valid JSON.

To run manually: `npm run check`. To bypass once: `git commit --no-verify`
(not recommended).
