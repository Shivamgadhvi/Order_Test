# ShivAnkita's — order screen

A simple phone-friendly ordering screen for the stall. Customer browses and builds a cart, you confirm the order (cash on pickup), and it gets added to today's order log so you can track what to deliver.

## What it does

- Browse the menu by category (matches your printed menu)
- Add items, adjust quantity, add an ice cream scoop (+₹30) where offered
- Name and phone are optional — customers can skip them
- Confirm order → get an order number
- "Today's orders" log (clipboard icon, top right) shows every order placed today, with a running total, so you can check off what's been delivered
- The log automatically starts fresh each new day, or you can clear it manually anytime

## Running it locally (to preview or test changes)

You'll need [Node.js](https://nodejs.org) installed (any recent version).

```bash
npm install
npm run dev
```

This opens the app at `http://localhost:5173` — open it on your phone too by visiting your computer's local IP address on the same WiFi (Vite will print that URL in the terminal).

## Editing your menu

Everything about your menu — item names, taglines, prices, categories, and whether ice cream is offered — lives in one file:

```
src/data/menuItems.js
```

Edit that file, save, and the app updates. No other code needs to change.

## Adding photos later

1. Save a photo into `public/images/`, e.g. `public/images/classic-brownie.jpg`
2. In `src/data/menuItems.js`, set that item's `image` field to `/images/classic-brownie.jpg`

Items without a photo automatically show a category icon instead, so you can add photos gradually.

## Publishing to GitHub Pages (free hosting)

1. Create a new repository on GitHub, e.g. named `shivankitas-pos`.
2. Push this project to it:
   ```bash
   git init
   git add .
   git commit -m "Initial POS app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/shivankitas-pos.git
   git push -u origin main
   ```
3. On GitHub, go to your repo → **Settings → Pages** → under "Build and deployment", set **Source** to **GitHub Actions**.
4. That's it — the included workflow (`.github/workflows/deploy.yml`) will automatically build and publish the site every time you push to `main`. Check the **Actions** tab for progress.
5. Your site will be live at:
   ```
   https://YOUR-USERNAME.github.io/shivankitas-pos/
   ```

**Important:** if you name your GitHub repo something other than `shivankitas-pos`, open `vite.config.js` and change the `base` value to match your repo name exactly (e.g. `/my-repo-name/`), or the site will load with broken styling.

## A note on the order log

The log is stored in the browser's local storage on whatever phone/device you're using to run the app — it isn't sent anywhere or shared between devices. If you always take orders from the same phone, this works well as your daily record. If you switch devices, each device will have its own separate log.
