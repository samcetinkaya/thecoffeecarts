# How the site is hosted

The site is published by GitHub Pages from this repository, [samcetinkaya/thecoffeecarts](https://github.com/samcetinkaya/thecoffeecarts), with `thecoffeecarts.com` set as its custom domain.

The repository is public because GitHub Pages on a free GitHub plan only works for public repositories.

## How publishing works

The workflow in `.github/workflows/deploy.yml` rebuilds and publishes the site:

1. on every push to `main`,
2. every day at midnight UTC, so posts with a future date go live on that date,
3. whenever you press **Run workflow** under **Actions → Deploy to GitHub Pages**.

A publish takes about two minutes.

## DNS records (GoDaddy)

The domain is registered at GoDaddy. In GoDaddy, open **Domain → DNS → DNS Records** and make the records match this table. Delete the existing "Parked" `A` record first.

| Type  | Name | Value                     |
| ----- | ---- | ------------------------- |
| A     | @    | 185.199.108.153           |
| A     | @    | 185.199.109.153           |
| A     | @    | 185.199.110.153           |
| A     | @    | 185.199.111.153           |
| CNAME | www  | samcetinkaya.github.io    |

DNS changes usually show up within the hour and can take up to a day.

## Turn on HTTPS

Once the DNS records are in place, GitHub issues a certificate on its own. When **Settings → Pages** stops showing a DNS warning, tick **Enforce HTTPS**.

## If something goes wrong

- **Site shows a GoDaddy parking page:** the old "Parked" `A` record is still there, or the change has not spread yet.
- **Site shows a GitHub 404:** check **Settings → Pages → Custom domain** still says `thecoffeecarts.com`.
- **A new post is missing:** check its `date` is not in the future, then look at the latest run in the **Actions** tab.
- **Build failing:** open the failed run in the **Actions** tab and read the log. Running `npm run build` on your own computer shows the same error.

The address `samcetinkaya.github.io/thecoffeecarts/` redirects to the custom domain, so use `npm run dev` to preview changes before they are pushed.
