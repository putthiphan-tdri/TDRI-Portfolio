# TDRI Portfolio App

This folder contains the separate TDRI portfolio app so it does not share files with the subscription management app.

Canonical working copy: `/Users/putthiphanhirunyatrakul/Documents/New project/TDRI Portfolio App`

## Reliable Access

Double-click `START HERE - TDRI Portfolio.command` in this folder.

That file starts a local server from this exact folder and opens the portfolio in your browser. Keep the Terminal window open while using the app. If the usual port is busy, it automatically chooses the next available port.

The app uses a dedicated browser storage key, `tdri-researcher-portfolio-canonical-v2`, so older experimental localhost sessions do not hide restored portfolio sections.

## Source of truth

The live portfolio content source of truth is the external browser you use to edit the page.

That means:

- Edit portfolio content in your external browser.
- Treat the Codex browser as a preview/testing browser unless you intentionally want a separate test copy.
- `data/portfolio-seed.json` is a codebase backup/default seed, not the live external-browser save.
- If you want Codex to update the seed later, export the JSON from the external browser and share that file/path.

## Folder roles

- `index.html`: app entry page.
- `src/`: app behavior and styling.
- `data/portfolio-seed.json`: fallback starter data and backup seed.
- `server.js`: experimental shared-save server, currently not part of the normal workflow.
