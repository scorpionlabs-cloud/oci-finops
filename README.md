# OCI FinOps Dashboard

React-based **OCI FinOps dashboard** with:

- Dark / Light theme toggle
- Filters (service, region, compartment, env tag, date range)
- Charts (cost by service, cost over time, cost by region)
- Usage table
- **CSV upload** for OCI Cost Analysis exports
- Hosted on GitHub Pages

## Live Demo

https://scorpionlabs-cloud.github.io/oci-finops/

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the app and pushes `dist/` to the `gh-pages` branch, which GitHub Pages serves at:

https://username.github.io/yourreponame/

## CSV Upload

Use the **"Upload OCI Cost CSV"** box at the top to upload an OCI Cost Analysis CSV export.  
The dashboard parses the CSV in the browser using PapaParse and updates:

- Filters
- Charts
- Summary cards
- Table

You can fork this repo and adapt the CSV mapping to your specific OCI export format.

## Sample OCI Cost CSV

A sample CSV file is included for testing:

```
src/data/sample-oci-cost.csv
```

You can upload it using the CSV Upload box in the dashboard.

## Theme Support

Click the theme toggle button in the header to switch between **Light** and **Dark** modes.  
Your choice is saved in `localStorage` and defaults to your system preference on first load.
