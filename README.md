# CHIRAATH Catalog — Guide

A simple catalog site for CHIRAATH boutique. Products are managed as `.md` files. No coding needed for day-to-day updates.

---

## How to Add or Update a Product

Each product is a `.md` file inside `src/products/`. The filename should match the product code (e.g. `CHR-160.md`).

### Full example file

```
---
date: 2026-04-04
code: CHR-160
title: Banarasi Silk Saree
category: Saree
color: Royal Blue with gold zari
price: 2200
offer_price: 1900
in_stock: true
stock_count: 3
hidden: false
images:
  - /images/CHR-160.jpeg
  - /images/CHR-160-2.jpeg
video: https://youtube.com/shorts/xxxxx
---
```

### All fields explained

| Field | Required | What it does |
|---|---|---|
| `date` | Yes | Date added. Products within 14 days get a **New** badge automatically. Format: `YYYY-MM-DD` |
| `code` | Yes | Unique product code e.g. `CHR-160` |
| `title` | Yes | Product name shown on the card and page |
| `category` | Yes | Either `Saree` or `Salwar` |
| `color` | No | Color description shown on product page |
| `price` | Yes | Original price in ₹ (numbers only, no ₹ symbol) |
| `offer_price` | No | Discounted price. If set, original price shows with strikethrough |
| `in_stock` | Yes | `true` or `false`. Set to `false` to show Out of Stock badge |
| `stock_count` | No | Number of pieces left. Shows **"Only X left"** badge when set to 5 or below |
| `hidden` | Yes | `true` hides the product from the catalog without deleting it |
| `images` | Yes | List of image paths. First image is the main card image. Add more for gallery |
| `video` | No | YouTube or any video URL. Shows a "Watch Product Video" button on the page |

### Adding images

1. Copy the image file into `src/images/`
2. Add the path to the `images` list in the `.md` file like: `- /images/CHR-160.jpeg`

---

## Key Files — What Each One Does

```
src/
├── products/          → One .md file per product
├── images/            → All product and cover images
├── admin/
│   └── config.yml     → CMS field definitions (online editor at /admin/)
├── _includes/
│   ├── catalog.njk    → Product grid, search, filters, badges, promise bar
│   ├── product.njk    → Individual product detail page layout
│   ├── base.njk       → HTML head tags (SEO, OG image) for catalog pages
│   └── black-footer.njk → The dark footer shown on all pages
├── _data/
│   └── site.json      → Site-wide settings (URL, cover image, OG image)
├── index.njk          → Homepage (All products)
├── sarees.njk         → Sarees-only page
├── salwars.njk        → Salwars-only page
└── 404.njk            → Page shown when a URL doesn't exist
```

---

## Which File to Edit for What

This is the most important section. Most updates only touch `.md` files. Only touch template files when changing the site's design or structure.

### ✅ No coding needed — just edit `.md` files

| What you want to do | File to edit |
|---|---|
| Add a new product | Create new file in `src/products/` |
| Update price, stock, color | Edit the product's `.md` file |
| Mark as sold out | Set `in_stock: false` in the `.md` file |
| Hide a product | Set `hidden: true` in the `.md` file |
| Add more images to a product | Add image paths to `images:` in the `.md` file |

### 🖼️ Images only

| What you want to do | File to edit |
|---|---|
| Change the homepage cover photo | Replace `src/images/cover.jpg` (keep same filename) |
| Add a product image | Copy image to `src/images/`, add path in the `.md` file |

### ⚙️ Site settings (non-coding edits)

| What you want to do | File to edit |
|---|---|
| Change the site's cover or OG image | `src/_data/site.json` |
| Change WhatsApp number | `src/_includes/catalog.njk` and `src/_includes/product.njk` (search for the number) |
| Change email address | `src/_includes/black-footer.njk` |
| Change Instagram handle | `src/_includes/black-footer.njk` |
| Change delivery promise bar text | `src/_includes/catalog.njk` (search for "promise-bar") |
| Change footer tagline or copyright | `src/_includes/black-footer.njk` (bottom of file) |

### 🛠️ Template files — only touch when changing design/structure

| File | When to edit |
|---|---|
| `src/_includes/catalog.njk` | Change how the grid, cards, search, or badges look |
| `src/_includes/product.njk` | Change the product detail page layout |
| `src/_includes/base.njk` | Change SEO tags, page title format, favicon |
| `src/_includes/black-footer.njk` | Change footer layout, policies, contact links |
| `src/index.njk` | Change homepage pagination or layout |
| `src/sarees.njk` | Change Sarees page pagination or layout |
| `src/salwars.njk` | Change Salwars page pagination or layout |
| `src/404.njk` | Change the "page not found" design |
| `src/admin/config.yml` | Add or rename a field in the CMS editor |
| `.eleventy.js` | Change how the site is built (advanced) |

> **Rule of thumb:** If it's about a specific product → edit the `.md` file.
> If it's about how the whole site looks or behaves → edit a template file.

---

## Running Locally (Test Before Pushing)

### First time only — install dependencies
```bash
npm install
```

### Start local server
```bash
npm start
```
Then open **http://localhost:8080** in your browser.
The site auto-refreshes when you save any file.

### Stop the local server
Press `Ctrl + C` in the terminal.

---

## Git — Save and Publish Changes

Run these three commands in order:

```bash
# 1. Stage your changes
git add .

# 2. Save with a message describing what you did
git commit -m "add CHR-160 Banarasi Silk Saree"

# 3. Push to publish (Netlify deploys automatically)
git push
```

Netlify usually deploys within 1–2 minutes after pushing.

---

## Common Tasks — Quick Reference

**Add a new product**
→ Create a new `.md` file in `src/products/`, copy a working file as a template, fill in the fields.

**Mark as sold out**
→ Open the product's `.md` file, change `in_stock: true` to `in_stock: false`.

**Show low stock badge**
→ Add `stock_count: 3` (or any number 1–5) to the product's `.md` file.

**Hide a product without deleting**
→ Change `hidden: false` to `hidden: true`.

**Add a discount**
→ Keep the original `price`, add `offer_price: 1800`. Both will show on the card.

**Remove a discount**
→ Delete the `offer_price` line from the `.md` file.

**Change the cover image**
→ Replace `src/images/cover.jpg` with a new image (keep the same filename).
