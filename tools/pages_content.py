# Content for the guide, comparison and brands landing pages built by build_pages.py.
# Keep claims factual and hedged: link to official sources, say "check your local law".

UPDATED = '2026-10-09'
B = 'https://trackwarranty.app'

GUIDES = ('Guides', f'{B}/guides/')
BRANDS = ('For brands', f'{B}/brands.html')

PAGES = [
    # ---------------------------------------------------------------- hub
    {
        'slug': 'guides/',
        'crumb': 'Guides',
        'title': 'Warranty guides: receipts, claims, extended warranty | TrackWarranty',
        'h1': 'Warranty guides',
        'desc': 'Plain-English guides to warranties: do you need a receipt to claim, warranty vs guarantee, how to check warranty by serial number, extended warranty and how to file a claim.',
        'tldr': 'Short, practical answers to the warranty questions people ask most. Each guide starts with the answer, then the detail.',
        'body': '''
<section class="terms-section guide-list">
  <a class="guide-card" href="/guides/do-i-need-receipt-for-warranty-claim.html"><b>Do I need a receipt for a warranty claim?</b><span>What counts as proof of purchase, and what to do if you lost the bill.</span></a>
  <a class="guide-card" href="/guides/how-to-claim-warranty.html"><b>How to claim a warranty, step by step</b><span>Who to contact, what to send, and how to avoid rejection.</span></a>
  <a class="guide-card" href="/guides/check-warranty-by-serial-number.html"><b>How to check warranty by serial number</b><span>Where to find the serial and the official lookup pages for major brands.</span></a>
  <a class="guide-card" href="/guides/warranty-vs-guarantee.html"><b>Warranty vs guarantee</b><span>The difference, and your legal rights in India, the UK, the EU and the US.</span></a>
  <a class="guide-card" href="/guides/is-extended-warranty-worth-it.html"><b>Is an extended warranty worth it?</b><span>A 5-question checklist before you pay for extra cover.</span></a>
  <a class="guide-card" href="/best-warranty-tracker-apps.html"><b>Best warranty tracker apps (2026)</b><span>An honest comparison of apps that store bills and remind you before warranties expire.</span></a>
</section>''',
        'related': [],
    },

    # ---------------------------------------------------------------- receipt
    {
        'slug': 'guides/do-i-need-receipt-for-warranty-claim.html',
        'crumbs': [GUIDES], 'crumb': 'Receipt for warranty claim',
        'title': 'Do I need a receipt for a warranty claim? (and what if I lost it)',
        'h1': 'Do I need a receipt for a warranty claim?',
        'desc': 'Usually yes: most brands ask for proof of purchase to confirm the purchase date. Here is what counts as proof, and how to claim if you lost the bill.',
        'tldr': 'Usually, yes. Most manufacturers ask for <b>proof of purchase</b> (a bill, invoice or receipt) because it shows <b>when</b> and <b>where</b> you bought the product, which decides whether it is still under warranty. If you lost it, a digital copy, an online order confirmation, a bank or card statement, or warranty registration records often work instead.',
        'body': '''
<section class="terms-section">
  <h2>Why brands ask for a receipt</h2>
  <p>A warranty runs for a fixed period from the date of purchase. The receipt is the simplest evidence of that date, the seller, and that the product was bought new from an authorised channel. Without it, a service centre may fall back to the manufacturing date printed in the serial number, which is earlier and can make the product look out of warranty.</p>
</section>
<section class="terms-section">
  <h2>What usually counts as proof of purchase</h2>
  <ul>
    <li>The original bill, tax invoice or receipt (paper or PDF)</li>
    <li>An online order confirmation or invoice from the marketplace or store</li>
    <li>A photo or scan of the bill, if it is clear and shows the date, seller and product</li>
    <li>A bank, card or UPI statement showing the payment (often accepted alongside other proof)</li>
    <li>A warranty registration confirmation from the brand, or a stamped warranty card</li>
  </ul>
  <p>Exact rules differ by brand and country, so check the warranty card or the brand's support page.</p>
</section>
<section class="terms-section">
  <h2>Lost the receipt? Try this</h2>
  <ol>
    <li><b>Search your email</b> for the order confirmation or e-invoice.</li>
    <li><b>Check your account</b> on the store or marketplace website; most keep order history and let you download invoices.</li>
    <li><b>Ask the store</b> for a duplicate bill. Many shops can reprint it from their billing system if you give the date and phone number.</li>
    <li><b>Find the payment</b> in your bank, card or UPI statement.</li>
    <li><b>Check product registration.</b> If you registered the product with the brand, its records may be enough.</li>
  </ol>
</section>
<section class="terms-section">
  <h2>Thermal receipts fade</h2>
  <p>Many shop receipts are printed on thermal paper, which can fade until the text is unreadable, sometimes within months. Photograph or scan important bills the day you buy, and keep the copy somewhere you will find it later. TrackWarranty does this for you: snap the bill, and the app keeps a clear copy with the product, store, date and warranty end date.</p>
</section>''',
        'faq': [
            ('Can I claim warranty without a bill?', 'Sometimes. Many brands accept an online invoice, a duplicate bill from the store, a bank or card statement, or product registration records. Some may use the manufacturing date instead, which can shorten your cover.'),
            ('Is a photo of the receipt valid for a warranty claim?', 'Usually, if it is clear and shows the purchase date, seller and product. Check the brand\'s warranty terms to be sure.'),
            ('How long should I keep receipts for warranty?', 'At least until the warranty (and any extended warranty) ends. For expensive items, keep them for as long as you own the product.'),
        ],
        'related': [('guides/how-to-claim-warranty.html', 'How to claim a warranty'), ('guides/check-warranty-by-serial-number.html', 'Check warranty by serial number')],
    },

    # ---------------------------------------------------------------- how to claim
    {
        'slug': 'guides/how-to-claim-warranty.html',
        'crumbs': [GUIDES], 'crumb': 'How to claim warranty',
        'title': 'How to claim a warranty: step-by-step guide | TrackWarranty',
        'h1': 'How to claim a warranty, step by step',
        'desc': 'A practical checklist for warranty claims: confirm cover, gather proof of purchase and serial number, contact the right party, and track your claim.',
        'tldr': 'Check the product is still in warranty, gather the <b>bill</b>, <b>serial number</b> and <b>photos of the fault</b>, then contact the <b>brand\'s official support</b> (or the seller, if they handle claims). Keep the ticket number and follow up in writing.',
        'body': '''
<section class="terms-section">
  <h2>1. Confirm you are still covered</h2>
  <p>Find the purchase date on your bill and the warranty length on the warranty card or product page. Many brands also let you check cover online with the serial number (<a href="/guides/check-warranty-by-serial-number.html">how to check</a>). Note that some parts, such as a compressor or a battery, can have a different warranty period from the rest of the product.</p>
</section>
<section class="terms-section">
  <h2>2. Gather what they will ask for</h2>
  <ul>
    <li>Proof of purchase: bill, invoice or order confirmation</li>
    <li>Model and serial number (on a label, in settings, or on the box)</li>
    <li>Clear photos or a short video of the fault</li>
    <li>Your address and a phone number for a technician visit or pickup</li>
  </ul>
</section>
<section class="terms-section">
  <h2>3. Contact the right party</h2>
  <p>Use the brand's official support website, app, phone line or authorised service centre. Some products, especially those bought from large retailers or marketplaces, are serviced through the seller. Avoid unauthorised repair shops while the product is in warranty, because third-party repairs can void cover.</p>
</section>
<section class="terms-section">
  <h2>4. Describe the fault clearly</h2>
  <p>Say what happens, when it started, and what you have already tried. Stick to facts. Do not open the product yourself.</p>
</section>
<section class="terms-section">
  <h2>5. Keep records and follow up</h2>
  <p>Note the complaint or ticket number, the date, and who you spoke to. Follow up by email so there is a written trail. If a claim is wrongly refused, escalate to the brand's grievance or nodal officer, then to your local consumer protection body.</p>
</section>''',
        'faq': [
            ('Who do I contact for a warranty claim, the store or the brand?', 'Usually the brand\'s official support or authorised service centre. Some sellers handle claims themselves, so check the warranty card or invoice.'),
            ('What can void a warranty?', 'Common reasons include physical or liquid damage, unauthorised repairs or modifications, and using the product outside its intended purpose. The exact list is in the warranty terms.'),
            ('Can a warranty claim be refused?', 'Yes, if the fault is not covered or the product is out of warranty. If you believe the refusal is wrong, ask for the reason in writing and escalate.'),
        ],
        'related': [('guides/do-i-need-receipt-for-warranty-claim.html', 'Do I need a receipt?'), ('guides/warranty-vs-guarantee.html', 'Warranty vs guarantee')],
    },

    # ---------------------------------------------------------------- serial number
    {
        'slug': 'guides/check-warranty-by-serial-number.html',
        'crumbs': [GUIDES], 'crumb': 'Check warranty by serial number',
        'title': 'How to check warranty by serial number (Apple, Dell, HP, Samsung and more)',
        'h1': 'How to check warranty by serial number',
        'desc': 'Find your product\'s serial number and check warranty status on the brand\'s official site. Links and tips for Apple, Dell, HP, Lenovo, Samsung and others.',
        'tldr': 'Find the <b>serial number</b> (on the product label, in Settings or "About", or on the box), then enter it on the <b>brand\'s official warranty or support page</b>. Online lookups show the brand\'s records, which may start from the manufacturing or shipping date, so keep your bill in case the date needs correcting.',
        'body': '''
<section class="terms-section">
  <h2>Where to find the serial number</h2>
  <ul>
    <li><b>Phones and tablets:</b> Settings → About (Android: About phone; iPhone: General → About)</li>
    <li><b>Laptops:</b> a label on the underside, the BIOS screen, or the brand's support app</li>
    <li><b>TVs, ACs, fridges, washing machines:</b> a sticker on the back or side panel, and on the box</li>
    <li><b>Headphones and small electronics:</b> inside the case lid, on the band, or on the box</li>
  </ul>
</section>
<section class="terms-section">
  <h2>Official warranty lookup pages</h2>
  <ul>
    <li><b>Apple:</b> <a href="https://checkcoverage.apple.com" rel="nofollow noopener">checkcoverage.apple.com</a></li>
    <li><b>Dell:</b> <a href="https://www.dell.com/support" rel="nofollow noopener">dell.com/support</a> → enter the Service Tag</li>
    <li><b>HP:</b> <a href="https://support.hp.com/checkwarranty" rel="nofollow noopener">support.hp.com/checkwarranty</a></li>
    <li><b>Lenovo, Samsung, LG, Sony, Xiaomi and others:</b> go to the brand's support site for your country and look for "warranty check" or "warranty status". Many also offer it in their support app.</li>
  </ul>
  <p>Only enter serial numbers on official brand websites.</p>
</section>
<section class="terms-section">
  <h2>If the online date looks wrong</h2>
  <p>Lookups often start the warranty from when the product was made or shipped, not when you bought it. If the result shows less cover than you expect, contact the brand with your bill; most will update the start date to your purchase date.</p>
</section>''',
        'faq': [
            ('Can I check warranty without the bill?', 'Yes, many brands show warranty status from the serial number alone. But to claim, or to correct the start date, you will usually need proof of purchase.'),
            ('Why does the warranty checker show an earlier date than my purchase?', 'Brand records often use the manufacturing or shipping date. Share your invoice with the brand to update it to the purchase date.'),
        ],
        'related': [('guides/do-i-need-receipt-for-warranty-claim.html', 'Do I need a receipt?'), ('guides/how-to-claim-warranty.html', 'How to claim a warranty')],
    },

    # ---------------------------------------------------------------- warranty vs guarantee
    {
        'slug': 'guides/warranty-vs-guarantee.html',
        'crumbs': [GUIDES], 'crumb': 'Warranty vs guarantee',
        'title': 'Warranty vs guarantee: what\'s the difference? (India, UK, EU, US)',
        'h1': 'Warranty vs guarantee: what\'s the difference?',
        'desc': 'The difference between a warranty and a guarantee, how the words are used in India, the UK, the EU and the US, and the legal rights you have regardless.',
        'tldr': 'In everyday use, a <b>warranty</b> is a promise to <b>repair</b> (or sometimes replace) a faulty product for a set period, and a <b>guarantee</b> is often a promise to <b>replace or refund</b>. The meaning varies by country and seller, so read the terms. In most countries you also have <b>legal consumer rights</b> that apply on top of any warranty or guarantee.',
        'body': '''
<section class="terms-section">
  <h2>At a glance</h2>
  <div class="table-wrap"><table class="prog-table" style="min-width:520px">
    <thead><tr><th></th><th>Warranty</th><th>Guarantee</th></tr></thead>
    <tbody>
      <tr><td><b>Usual promise</b></td><td>Repair, sometimes replacement</td><td>Replacement or refund</td></tr>
      <tr><td><b>Cost</b></td><td>Included; extended warranties are paid</td><td>Usually included</td></tr>
      <tr><td><b>Typical length</b></td><td>Often 1–2 years for electronics</td><td>Often shorter, or a fixed promise</td></tr>
      <tr><td><b>Paperwork</b></td><td>Bill and often a warranty card or registration</td><td>Bill</td></tr>
    </tbody>
  </table></div>
</section>
<section class="terms-section">
  <h2>How it works in different countries</h2>
  <h3>India</h3>
  <p>Shops and brands commonly use "guarantee" for replacement and "warranty" for repair. Separately, the Consumer Protection Act, 2019 protects you against defective goods and unfair trade practices, and you can file complaints through the National Consumer Helpline or e-Daakhil.</p>
  <h3>United Kingdom</h3>
  <p>A manufacturer's "guarantee" is usually free and a "warranty" is often a paid extra. Your statutory rights under the Consumer Rights Act 2015 apply either way.</p>
  <h3>European Union</h3>
  <p>Sellers must provide a minimum two-year legal guarantee of conformity. A brand's own "commercial guarantee" is extra and cannot reduce those rights.</p>
  <h3>United States</h3>
  <p>The Magnuson-Moss Warranty Act sets rules for written warranties on consumer products, including labelling them "full" or "limited". Implied warranties under state law may also apply.</p>
  <p class="muted">This is general information, not legal advice. Check your local consumer authority for details.</p>
</section>''',
        'faq': [
            ('Is a guarantee better than a warranty?', 'Not always. It depends on the actual terms: what is covered, for how long, and whether you get a repair, replacement or refund.'),
            ('Do I have rights after the warranty ends?', 'Often yes. In many countries consumer law protects you against products that are faulty or not as described, even outside the brand\'s warranty period.'),
        ],
        'related': [('guides/is-extended-warranty-worth-it.html', 'Is an extended warranty worth it?'), ('guides/how-to-claim-warranty.html', 'How to claim a warranty')],
    },

    # ---------------------------------------------------------------- extended warranty
    {
        'slug': 'guides/is-extended-warranty-worth-it.html',
        'crumbs': [GUIDES], 'crumb': 'Is extended warranty worth it?',
        'title': 'Is an extended warranty worth it? A 5-question checklist',
        'h1': 'Is an extended warranty worth it?',
        'desc': 'What an extended warranty is, what it usually covers, and five questions to decide whether it is worth buying for a phone, laptop, TV or appliance.',
        'tldr': 'An <b>extended warranty</b> adds cover after the manufacturer\'s warranty ends. It can be worth it for <b>expensive products with costly repairs</b> (such as AC compressors, TV panels or laptop boards) if the price is a small share of the repair cost and the terms are clear. For cheap items, or cover you already have, it usually is not.',
        'body': '''
<section class="terms-section">
  <h2>What an extended warranty usually covers</h2>
  <p>Most extended warranties cover the same manufacturing faults as the original warranty, for one to three more years. They usually do not cover accidental or liquid damage, theft, or wear and tear unless you buy a separate protection plan. They may be sold by the brand, the retailer or a third-party company.</p>
</section>
<section class="terms-section">
  <h2>Five questions before you buy</h2>
  <ol>
    <li><b>What does a typical repair cost?</b> Compare it with the plan's price.</li>
    <li><b>Do you already have cover?</b> Some credit cards, home insurance policies or brand promotions add extra warranty.</li>
    <li><b>Who honours the claim?</b> The brand, the store or a third party, and is there a service network where you live?</li>
    <li><b>What is excluded?</b> Look for deductibles, claim limits and parts that are not covered.</li>
    <li><b>When does it start?</b> Some plans start after the original warranty ends; others overlap with it.</li>
  </ol>
</section>
<section class="terms-section">
  <h2>Don't let it lapse unused</h2>
  <p>People often pay for extended cover and forget they have it. Save the plan alongside the original bill and set a reminder before it ends. TrackWarranty lets you add both and nudges you 30, 7 and 1 day before each one expires.</p>
</section>''',
        'faq': [
            ('Is extended warranty worth it for phones?', 'Often only if it includes accidental damage, since that is the most common phone repair. Check what the plan actually covers.'),
            ('Is extended warranty worth it for ACs and refrigerators?', 'It can be, because compressor and board repairs are expensive. Check whether the compressor already has a longer manufacturer warranty.'),
        ],
        'related': [('guides/warranty-vs-guarantee.html', 'Warranty vs guarantee'), ('best-warranty-tracker-apps.html', 'Best warranty tracker apps')],
    },

    # ---------------------------------------------------------------- comparison
    {
        'slug': 'best-warranty-tracker-apps.html',
        'crumb': 'Best warranty tracker apps',
        'title': 'Best warranty tracker apps in 2026 (honest comparison) | TrackWarranty',
        'h1': 'Best warranty tracker apps in 2026',
        'desc': 'An honest comparison of apps that store bills and receipts and remind you before warranties expire: TrackWarranty, MrReceipt, Warranty Keeper, Warranty Book, HoldMyBill and more.',
        'tldr': 'If you want <b>warranty reminders with offline storage and no sign-up</b>, try TrackWarranty. If you mainly want a <b>receipts and deals</b> app, MrReceipt is the most established. Warranty Keeper and Warranty Book are simple, focused warranty apps, and HoldMyBill suits people who want to manage household assets more broadly.',
        'body': '''
<section class="terms-section">
  <p class="muted">We make TrackWarranty, so we're not neutral. This page sticks to what each app says about itself on its store listing or website as of October 2026. Features change, so check the listing before you choose.</p>
  <div class="table-wrap"><table class="prog-table" style="min-width:680px">
    <thead><tr><th>App</th><th>Platforms</th><th>Focus</th><th>Good for</th></tr></thead>
    <tbody>
      <tr><td><b>TrackWarranty</b></td><td>Android (iOS coming)</td><td>Warranty vault: bills, expiry reminders, claim kit, works offline</td><td>Getting reminded before cover ends, without an account</td></tr>
      <tr><td><b>MrReceipt</b></td><td>Android, iOS</td><td>Receipts, deals, expenses and product info</td><td>Receipts and shopping deals in one app</td></tr>
      <tr><td><b>Warranty Keeper</b></td><td>Android</td><td>Store warranties in the cloud</td><td>A simple warranty list with cloud backup</td></tr>
      <tr><td><b>Warranty Book</b></td><td>Android, iOS</td><td>Warranty bills and purchase receipts; seller and support contacts</td><td>Indian households tracking bills</td></tr>
      <tr><td><b>HoldMyBill</b></td><td>Web, mobile</td><td>Asset lifecycle for everyday products</td><td>Managing household assets more broadly</td></tr>
      <tr><td><b>Google Drive / Photos folder</b></td><td>Any</td><td>DIY storage</td><td>Free storage, but no reminders or expiry dates</td></tr>
    </tbody>
  </table></div>
</section>
<section class="terms-section">
  <h2>What to look for in a warranty tracker</h2>
  <ul>
    <li><b>Fast capture:</b> snap a bill and have the details filled in for you.</li>
    <li><b>Reminders before expiry,</b> not just storage.</li>
    <li><b>Works offline</b> and keeps a copy on your phone, so it opens when you need it.</li>
    <li><b>Easy claims:</b> invoice, serial and dates ready to share.</li>
    <li><b>Export and privacy:</b> you can get your data out, and it isn't used for ads.</li>
    <li><b>Any currency and country,</b> if you buy across borders.</li>
  </ul>
</section>
<section class="terms-section">
  <h2>Why we built TrackWarranty</h2>
  <p>Most people don't lose warranties because they lack storage. They lose them because nobody reminds them in time. TrackWarranty is built around the reminder and the claim: add a bill in seconds, get nudged 30, 7 and 1 day before cover ends, and send a ready-made claim kit in one tap. It saves to your phone first, so it works offline and without signing up.</p>
</section>''',
        'faq': [
            ('What is the best app to keep track of warranties?', 'It depends on what you need. For reminders before expiry with offline storage and no sign-up, TrackWarranty. For receipts plus shopping deals, MrReceipt. For a simple cloud list, Warranty Keeper.'),
            ('Is there a free warranty tracker app?', 'Yes. TrackWarranty is free on Android, and several others have free versions.'),
            ('Can I just keep receipts in Google Drive?', 'You can, but you won\'t get reminders before warranties end, and searching scanned bills is slow. A warranty tracker adds expiry dates, reminders and claim details.'),
        ],
        'related': [('guides/', 'All warranty guides'), ('guides/do-i-need-receipt-for-warranty-claim.html', 'Do I need a receipt?')],
        'extra_schema': {
            '@context': 'https://schema.org', '@type': 'ItemList', 'name': 'Warranty tracker apps compared',
            'itemListElement': [{'@type': 'ListItem', 'position': i + 1, 'name': n} for i, n in enumerate(
                ['TrackWarranty', 'MrReceipt', 'Warranty Keeper', 'Warranty Book', 'HoldMyBill'])],
        },
    },

    # ---------------------------------------------------------------- B2B: QR registration
    {
        'slug': 'brands/qr-product-registration.html',
        'crumbs': [BRANDS], 'crumb': 'QR product registration', 'b2b': True,
        'title': 'QR code product registration & digital warranty cards for brands | TrackWarranty',
        'h1': 'QR code product registration and digital warranty cards',
        'desc': 'Replace paper warranty cards with a QR code on the box. Owners register in 30 seconds; brands get verified owner, serial, seller and purchase-date data, even when a distributor made the sale.',
        'tldr': 'Print a <b>QR code on the box or product</b>. The owner scans it, snaps the invoice, and gets an <b>instant digital warranty</b>. You get a <b>verified owner record</b> with serial number, seller and purchase date, which you can use for claims, warranty programs, recalls and offers.',
        'body': '''
<section class="terms-section">
  <h2>Why paper warranty cards fail</h2>
  <p>Paper cards and long registration forms feel like homework, so most buyers skip them. Brands selling through distributors, dealers and marketplaces then never learn who owns their products. Industry surveys suggest only a small share of consumers always register products, while far more do it when offered a quick mobile option.</p>
</section>
<section class="terms-section">
  <h2>How QR registration works</h2>
  <ol>
    <li><b>Generate codes:</b> one per SKU, or one per unit for serial-level tracking.</li>
    <li><b>Print them</b> on packaging, the manual, a sticker, or the device itself.</li>
    <li><b>Owner scans:</b> a branded page opens with no app needed. They confirm the product and snap the invoice.</li>
    <li><b>Instant digital warranty:</b> stored in the owner's TrackWarranty vault, with a reminder before it ends.</li>
    <li><b>You get the data:</b> owner contact (with consent), serial, seller and purchase date, in one console and via API.</li>
  </ol>
</section>
<section class="terms-section">
  <h2>What brands do with it</h2>
  <ul>
    <li>Validate claims against serial and real purchase date</li>
    <li>Launch and sell <a href="/brands.html#programs">extended warranty and protection programs</a></li>
    <li>Reach exact owners for recalls, firmware updates and care tips</li>
    <li>See sell-through by distributor, region and SKU</li>
  </ul>
</section>''',
        'faq': [
            ('Does the customer need to install an app to register?', 'No. The QR opens a branded web page. Owners can also save the warranty to the TrackWarranty app if they want reminders.'),
            ('Can we use one QR per product or per unit?', 'Both. Per-SKU codes are simplest to print; per-unit codes link each registration to a serial number.'),
            ('Is customer data shared with consent?', 'Registration asks for marketing consent separately from the warranty itself, so owners choose what they share with the brand.'),
        ],
        'related': [('brands.html', 'TrackWarranty for Brands'), ('brands.html#programs', 'Warranty program launch and tracking')],
        'extra_schema': {
            '@context': 'https://schema.org', '@type': 'Service', 'name': 'QR product registration and digital warranty cards',
            'serviceType': 'Product registration and warranty management', 'provider': {'@type': 'Organization', 'name': 'TrackWarranty', 'url': f'{B}/'},
            'areaServed': 'Worldwide', 'url': f'{B}/brands/qr-product-registration.html',
        },
    },
]
