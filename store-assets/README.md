# TrackWarranty store assets — "Vault" release

Everything here is generated from the design canvas and ready to upload.

## Google Play (`google-play/`)

| File | Play Console slot | Size |
|---|---|---|
| `app-icon-512.png` | App icon | 512×512 |
| `feature-graphic-1024x500.png` | Feature graphic | 1024×500 |
| `screenshot-1.png` … `screenshot-4.png` | Phone screenshots, **in this order** | 1080×1920 |

Order matters: most visitors never scroll past the first 2–3 screenshots.
1. Never miss a warranty again (vault + expiry nudge)
2. Snap the bill. We fill the rest. (2-tap add)
3. Get pinged before cover ends (reminders)
4. Works offline. Lives on your phone. (trust + privacy)

## App icons (`app-icons/`)

Already copied into `receiptkeeper/frontend/assets/images/`:
`icon.png` (1024, lime background), `adaptive-icon.png` (transparent foreground — set `android.adaptiveIcon.backgroundColor` to `#D4FF3A`), `notification-icon.png` (white silhouette), `splash-icon.png`.

## Listing copy

The title, short and full description, what's new, Hindi listing and data-safety notes are in [play-listing.md](play-listing.md).
