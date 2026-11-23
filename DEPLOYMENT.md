# Putting the site live

The site is set up to publish through GitHub Pages. Every push to `main` rebuilds it, and it also rebuilds once a day so scheduled posts appear on their date.

Three things have to exist first: the domain, a GitHub repository, and DNS records connecting the two.

## 1. Register the domain

Register `thecoffeecarts.com` with any registrar (Cloudflare, Namecheap, Squarespace Domains and so on). As of 22 November 2026 it was unregistered.

## 2. Push the code to GitHub

Create a repository and push this folder to it:

```bash
gh repo create thecoffeecarts --public --source=. --push
```

GitHub Pages is free for public repositories. A private repository needs a paid GitHub plan to use Pages.

## 3. Turn on GitHub Pages

1. On GitHub, open the repository and go to **Settings → Pages**.
2. Under **Source**, choose **GitHub Actions**.
3. Open the **Actions** tab and wait for "Deploy to GitHub Pages" to finish (about two minutes).

## 4. Connect the domain

At your domain registrar, add these DNS records:

| Type  | Name | Value                  |
| ----- | ---- | ---------------------- |
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | `<your-username>.github.io` |

Then in **Settings → Pages → Custom domain**, enter `thecoffeecarts.com`, save, and tick **Enforce HTTPS** once the certificate is issued. DNS changes can take up to a day to spread.

Until the domain is connected, preview the site on your own computer with `npm run dev`. The GitHub address (`<your-username>.github.io/thecoffeecarts/`) will not display correctly, because the site expects to live at the root of its own domain.

## How publishing works afterwards

The workflow in `.github/workflows/deploy.yml` runs:

1. on every push to `main`,
2. every day at midnight UTC, so posts with a future date go live on that date,
3. whenever you press **Run workflow** in the Actions tab.

## If something goes wrong

- **Workflow not running:** in **Settings → Actions → General**, allow actions; in **Settings → Pages**, check the source is "GitHub Actions".
- **Build failing:** open the failed run in the Actions tab and read the log. Running `npm run build` on your own computer shows the same error.
- **Domain shows a GitHub 404:** the custom domain is not saved in **Settings → Pages**, or the DNS records have not spread yet.
