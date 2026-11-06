# Robocon Live Scoreboard: setup guide

A live scoreboard website for Robocon, hosted by TIPS Kochi School. It runs on its own: viewers and the TV need no login. Only admins sign in, with Google.

**It's already set up and live:**
- Website: https://oonnosfjsjfie.github.io/robocon/
- Firebase project: `robocon-tips` (Firestore in asia-south1, Google sign-in on, rules published)
- Owners: ajay21022010@gmail.com and ej15132@tipsglobeducate.com. Owners add and remove other admins from **Admin → Manage admins**. The admin panel is hidden from everyone else; staff sign in with the small "Staff sign-in" link at the bottom of the page.

The setup steps below are kept for reference, in case you ever need to rebuild it.

**Files**
- `index.html`: the whole website
- `firebase-config.js`: your Firebase keys and the admin email list
- `firestore.rules`: the database security rules (only admins can edit)

**Pages**
- `#board`: overview of all categories. Click a category for its full leaderboard.
- `#tv`: TV display. It cycles through every category. Use `#tv-race`, `#tv-build`, `#tv-soccer-jr` or `#tv-soccer-sr` to show only one category.
- `#admin`: score entry. You must sign in with an admin Google account.

**Try it first:** open `index.html` in a browser. Until you connect Firebase, it runs in **demo mode** with sample teams saved only on that computer.

---

## Step 1: Create a free Firebase project (about 5 minutes)

1. Go to https://console.firebase.google.com and sign in with your Google account.
2. Click **Create a project**. Name it something like `robocon-tips`. You can switch Google Analytics off.
3. In the left menu, open **Build → Firestore Database** and click **Create database**.
   - Location: **asia-south1 (Mumbai)**
   - Start in **production mode**
4. Open the **Rules** tab. Delete everything, paste the contents of `firestore.rules`, and click **Publish**.
5. In the left menu, open **Build → Authentication** and click **Get started**. Under **Sign-in method**, enable **Google** and save.

The free "Spark" plan is enough for this event.

## Step 2: Connect the website to Firebase

1. In Firebase, click the gear icon, then **Project settings**.
2. Under **Your apps**, click the **</>** (Web) icon. Give it a name and click **Register app**. You don't need Firebase Hosting.
3. Firebase shows a `firebaseConfig = { ... }` block. Copy the six values (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`) into `firebase-config.js`, replacing each `PASTE_HERE`.

These keys are safe to put on a public website. The security rules are what protect your data.

## Step 3: Add your admins

Admins are listed in **two** places. Keep both lists the same, all lowercase:

1. `firebase-config.js` → `window.OWNER_EMAILS`. This list shows or hides the admin page.
2. Firebase → Firestore → **Rules**. Edit the email list in `isAdmin()` and click **Publish**. This list is what actually blocks anyone else from editing.

```
request.auth.token.email.lower() in [
  'ajay21022010@gmail.com',
  'teacher1@gmail.com',
  'volunteer2@gmail.com'
];
```

## Step 4: Put the website online for free (GitHub Pages)

1. Go to https://github.com/new and create a **public** repository, for example `robocon`.
2. Click **uploading an existing file**. Drag in `index.html` and `firebase-config.js`, then **Commit**.
3. In the repository, open **Settings → Pages**. Under Branch, choose **main** and **/(root)**, then **Save**.
4. After a minute your site is live at `https://YOUR-USERNAME.github.io/robocon/`.
5. Back in Firebase, open **Authentication → Settings → Authorized domains**. Click **Add domain** and enter `YOUR-USERNAME.github.io`. Without this, Google sign-in on the admin page won't work.

Another option is Netlify: go to https://app.netlify.com/drop and drag the folder in. Add the Netlify address to Authorized domains in the same way.

## Step 5: On event day

- **TV:** open `https://YOUR-USERNAME.github.io/robocon/#tv` and click **Go fullscreen** (or press F11). It updates by itself, and reloads every 30 minutes as a safety net.
- **Admins:** open `.../#admin` on a phone or laptop, sign in with Google, pick the category, enter the scores, and click **Save**.
- **Audience:** share `.../#board`, or make a QR code of it.

---

## How each category is scored

| Category | Admin enters | Ranking |
|---|---|---|
| Robo Race | Attempt 1, Attempt 2 (e.g. `1 min 20 sec`), penalties | Best attempt + seconds per penalty. Lowest time wins. Seconds per penalty is set on the admin page (default 5). |
| Build Your Robot | Judges' score, penalty points | Score minus penalty points. Highest wins. |
| Robo Soccer Junior / Senior | Won, drawn, lost, goals for, goals against, penalty points | 3 points per win, 1 per draw, minus penalty points. Ties are split by goal difference, then goals scored. |

If your event rules differ (for example, Build Your Robot has several judging criteria, or soccer is a knockout), the categories are defined near the top of the script in `index.html` (`CATS`), and the scoring is in `compute()`.

## Troubleshooting

- **"Not allowed" when saving:** the email isn't in the Firestore rules list, or the new rules weren't published.
- **Google sign-in popup fails:** your website's domain is missing from Authentication → Authorized domains.
- **Stuck on "Connecting…":** check the internet connection, and check that the six values in `firebase-config.js` are correct.
