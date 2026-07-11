# PrimeTech India — Amazon-Parity Computer & Electronics Storefront 🇮🇳 💻

An ultra-premium, local-first, high-feature-parity e-commerce application modeled after **Amazon India**, designed specifically for **Computer Hardware, Laptops, Custom PC Components, Monitors, Peripherals, and Networking Gear**.

Built with modern web standards (**Vite + React + TypeScript + Vanilla CSS Design System**), PrimeTech India features authentic Indian Currency (`₹` INR) pricing, real-time GST 18% tax calculation formulas, and a complete local-first persistence architecture that requires no external backend database to run and test end-to-end.

---

## 🌟 High-Parity Feature Matrix

### 1. Storefront & Navigation (`/`)
- **Amazon Top Bar (`Navbar.tsx`)**:
  - **Live "Deliver to" PIN Code Modal**: Select from existing Indian delivery locations or input custom Indian PIN codes (e.g. `560095` Bengaluru, `400050` Mumbai, `110001` Delhi).
  - **Department Search Engine**: Real-time auto-suggest search bar with department filtering (`Laptops`, `Components`, `Monitors`, `Peripherals`, `Storage`, `Networking`).
  - **Language & Currency Badge**: Fixed `EN / ₹ INR` indicator for authentic Indian e-commerce parity.
  - **Account & Lists Popover**: Quick links to Orders, Wishlists, and Prime VIP Membership settings.
  - **Cart Button**: Animated shopping cart badge showing live item count and total value.
- **Interactive Mega-Menu (`MegaMenu.tsx`)**: Smooth slide-out navigation drawer categorizing over 25+ detailed hardware items by department, bestsellers, and new releases.
- **Homepage Storefront (`HomePage.tsx`)**:
  - **`HeroCarousel.tsx`**: Rotating promotional banners featuring flagship hardware (e.g. ASUS ROG Zephyrus, RTX 5090 Custom Builds, Samsung Odyssey Curved OLEDs).
  - **`LightningDeals.tsx`**: Limited-time hardware discounts featuring live countdown clocks (`02:14:45`) and stock claim progress bars (`78% Claimed`).
  - **`CategoryGrid.tsx`**: Amazon 4-quadrant feature discovery cards ("Upgrade Your Gaming Setup", "Storage & NVMe SSDs", etc.).
  - **Personalized Recommendations**: "Browsing History" and "Best Sellers in PC Components" horizontal carousels (`ProductCarousel.tsx`).

### 2. Advanced Product Detail Page (`/product/:id`)
- **Hover Magnify Image Gallery (`ImageGallery.tsx`)**: High-resolution image viewer with an interactive magnifying glass zoom box triggered on mouse hover, paired with multi-angle thumbnail selectors.
- **Dynamic Configuration Matrix (`ConfigSelector.tsx`)**:
  - Customize hardware options on the fly: **RAM** (`16GB vs 32GB DDR5`), **Storage** (`1TB vs 2TB NVMe SSD`), and **Keyboard Switches** (`Tactile Red vs Clicky Blue`).
  - **Real-Time Price Delta Formula**: Selecting higher configurations instantly updates the base price, Buy Box subtotal, and cart unit price (`+₹12,000` for 32GB RAM upgrade).
- **Amazon Buy Box (`BuyBox.tsx`)**:
  - Live delivery date estimator calculating standard, express, and priority delivery windows.
  - Stock availability counter and Quantity (`Qty`) dropdown.
  - One-click `Add to Cart`, `Buy Now` direct redirect, and `Add to Wishlist` multi-list selector.
- **Technical Specifications & Side-by-Side Comparison (`SpecsTable.tsx`, `ComparisonTable.tsx`)**:
  - Comprehensive specification matrix covering GPU Architecture, VRAM, Clock Speeds, BIS India standards, and warranty periods.
  - Interactive comparison table contrasting specs and prices across 3 competing hardware models.
- **Community Reviews & Q&A (`ReviewsAndQnA.tsx`)**:
  - **Rating Breakdown Histogram**: 5-star to 1-star percentage distribution bars.
  - **Feature Ratings**: Sub-scores for Gaming (`4.8/5`), Value for Money (`4.6/5`), Performance (`4.9/5`), and Build Quality (`4.7/5`).
  - **Interactive Community Q&A**: Search inside questions, view upvoted answers from hardware enthusiasts, and submit new questions via the `Ask a Question` modal.

### 3. Shopping Cart & Drawer (`/cart`)
- **Slide-Out Cart Drawer (`CartDrawer.tsx`)**: Instant sidebar confirmation when items are added, accompanied by a dynamic **Free Express Shipping Progress Bar** (`Add ₹1,499 more for FREE Prime Express Delivery`).
- **Comprehensive Cart Page (`CartPage.tsx`)**:
  - Itemized hardware list displaying selected custom configurations.
  - Quantity controls (`+ / -`) and instant removal.
  - **Save for Later Queue (`SavedForLater.tsx`)**: Move items out of the active cart for future purchase without losing selected configurations.
  - **Coupon Discount Engine**: Apply promotional codes (`TECHPRO10` for 10% instant discount, `PRIME2026` for 20% discount) with live subtotal/GST adjustments.

### 4. Multi-Step Indian Checkout Simulation (`/checkout`)
- **Step 1: Delivery Address (`AddressStep.tsx`)**: Choose from saved Indian addresses or add a new delivery target with full street, city, state (`Karnataka`, `Maharashtra`, etc.), PIN code, and mobile number validation.
- **Step 2: Shipping Method (`ShippingStep.tsx`)**:
  - **FREE Standard Delivery** (`3-5 Business Days across India`)
  - **FREE Prime One-Day Express** (`Guaranteed Next-Day by 9 PM`)
  - **Same-Day Priority Drone Delivery** (`₹199 — Delivery within 4 hours in Bengaluru/Mumbai/Delhi NCR`)
- **Step 3: Payment Simulation (`PaymentStep.tsx`)**:
  - **UPI / QR Code**: Enter a UPI ID (`name@okaxis`, `9876543210@paytm`) or simulate scanning an interactive QR code.
  - **Credit / Debit Cards**: RuPay, Visa, and Mastercard simulation with 16-digit card and CVV validation.
  - **Net Banking**: Instant integration options for major Indian banks (HDFC Bank, SBI, ICICI Bank, Axis Bank, Kotak Mahindra).
  - **Cash on Delivery (COD)**: Available for orders under ₹50,000.

### 5. Orders History & Live Package Tracking (`/orders`)
- Chronological order history displaying unique Indian order tracking IDs (`ORD-IND-84920-2026`), item breakdown, and delivery addresses.
- **Interactive Package Tracker Modal (`PackageTrackerModal.tsx`)**:
  - Step-by-step status timeline: `Order Placed` ➔ `Payment Verified` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`.
  - **`Simulate Next Status` Button**: Allows developers and testers to click through and simulate real-time package progression locally without needing an external cron server!

### 6. Wishlists & Account Center (`/wishlist`, `/account`)
- **Hardware Wishlist Manager (`WishlistPage.tsx`)**:
  - Create multiple custom hardware lists (e.g. `My Dream PC Build`, `Streaming Studio Setup`).
  - Toggle list privacy settings (`Private 🔒` vs `Shared 🌐`).
  - Move single items or `Add All to Cart` with one click.
- **Account Dashboard (`AccountPage.tsx`)**:
  - Overview of PrimeTech VIP status (`FREE One-Day Delivery across India, priority RTX 5090 restocks`).
  - Quick action cards for Orders, Wishlists, Addresses, Security credentials, and Priority Support Hub (`1800-419-2026 Toll Free 24x7`).

---

## 🏗️ Architecture & Local-First Storage (`localStorage`)

To fulfill the **local-first** mandate while maintaining persistence across browser reloads, all application state is stored locally inside your browser using strictly isolated `primetech_` prefixed keys:

| LocalStorage Key | Description | Data Structure |
| :--- | :--- | :--- |
| `primetech_user_profile` | User identity & Prime membership status (`isPrimeMember`, email, name). | JSON Object |
| `primetech_addresses` | Saved Indian delivery addresses (`Home`, `Work`, `Office`). | JSON Array of `Address` objects |
| `primetech_cart` | Active shopping cart items including selected custom RAM/Storage configurations and unit prices. | JSON Array of `CartItem` objects |
| `primetech_saved_for_later` | Items deferred from the cart to be purchased later. | JSON Array of `SavedForLaterItem` objects |
| `primetech_wishlists` | User-created custom lists and their item items. | JSON Array of `Wishlist` objects |
| `primetech_active_wishlist_id` | ID of the currently selected active wishlist. | String ID |
| `primetech_orders` | Complete history of placed orders and their live tracking timeline events. | JSON Array of `Order` objects |

*Note: Clearing your browser's local storage or running `localStorage.clear()` in the DevTools console will reset the application back to its default seeded Indian hardware state (`PRODUCTS`, `INITIAL_ADDRESSES`).*

---

## ⚡ Quick Start & Available Commands

Make sure you have [Node.js](https://nodejs.org/) (v18+) installed on your Windows, Mac, or Linux machine.

### 1. Installation
Navigate into the project workspace and install dependencies (if not already installed):
```bash
cd "g:/Amazon Like app"
npm install
```

### 2. Running the Development Server (`npm run dev`)
To start the live Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to the local URL displayed in the terminal (by default: **`http://localhost:5173`**).

### 3. Building for Production (`npm run build`)
To verify all TypeScript types (`tsc -b`) and bundle the application into an optimized production build (`dist/`):
```bash
npm run build
```
This command ensures **zero TypeScript compilation errors** or syntax mismatches (`verbatimModuleSyntax: true` verified).

### 4. Previewing the Production Bundle (`npm run preview`)
To locally serve and test the compiled `dist/` production bundle:
```bash
npm run preview
```

### 5. Code Linting (`npm run lint`)
To run static analysis and linting via Oxlint:
```bash
npm run lint
```

---

## 📁 Project Directory Structure

```text
g:/Amazon Like app/
├── index.html                      # Entry HTML with Google Fonts (Inter, JetBrains Mono)
├── package.json                    # Dependencies and scripts (dev, build, lint, preview)
├── tsconfig.json                   # TypeScript configuration with verbatimModuleSyntax
├── vite.config.ts                  # Vite bundler configuration
├── src/
│   ├── App.tsx                     # Master router & context provider hierarchy
│   ├── index.css                   # PrimeTech India Design System (Obsidian/Charcoal variables, animations)
│   ├── main.tsx                    # React DOM root render
│   ├── types/
│   │   └── index.ts                # TypeScript definitions (Product, ConfigOption, Order, Address, CartItem)
│   ├── utils/
│   │   └── formatters.ts           # Indian Currency (₹ INR) formatters using Intl.NumberFormat('en-IN')
│   ├── data/
│   │   ├── products.ts             # Rich seed database of 25+ detailed PC hardware items & Q&As
│   │   └── categories.ts           # Department taxonomy, initial addresses, and available coupons
│   ├── context/
│   │   ├── AuthContext.tsx         # User identity, Prime status, and address book state
│   │   ├── CartContext.tsx         # Cart calculations (subtotal, GST 18%, discounts, Save for Later)
│   │   ├── WishlistContext.tsx     # Custom hardware lists and move-to-cart operations
│   │   └── OrderContext.tsx        # Order generation and simulated delivery tracking timeline
│   ├── components/
│   │   ├── common/                 # Reusable UI primitives (StarRating, Badge, PriceDisplay)
│   │   ├── layout/                 # Navbar, MegaMenu, Footer
│   │   ├── home/                   # HeroCarousel, LightningDeals, CategoryGrid, ProductCarousel
│   │   ├── search/                 # FilterSidebar, SortAndBar
│   │   ├── product/                # ImageGallery, ConfigSelector, BuyBox, SpecsTable, ReviewsAndQnA
│   │   ├── cart/                   # CartDrawer, CartItemCard
│   │   └── orders/                 # PackageTrackerModal (Live interactive lifecycle simulation)
│   └── pages/
│       ├── HomePage.tsx            # Storefront landing page (`/`)
│       ├── SearchPage.tsx          # Multi-faceted search & filter catalog (`/search`)
│       ├── ProductDetailPage.tsx   # Comprehensive hardware detail view (`/product/:id`)
│       ├── CartPage.tsx            # Full shopping cart & coupon manager (`/cart`)
│       ├── CheckoutPage.tsx        # 3-Step Indian address, shipping & payment checkout (`/checkout`)
│       ├── OrdersPage.tsx          # Order history and package tracker (`/orders`)
│       ├── WishlistPage.tsx        # Hardware build & wishlist organizer (`/wishlist`)
│       └── AccountPage.tsx         # User profile & Indian address book (`/account`)
```

---

## 🧪 Step-by-Step Walkthrough Guide for Testers

1. **Explore the Storefront (`/`)**:
   - Check out the **Lightning Deals** countdown timer and click on **"Deliver to"** in the top Navbar to switch your Indian city or enter PIN code `560095`.
   - Open the **All (Mega-Menu)** button on the top left to slide out the 6 hardware departments.
2. **Search & Filter Hardware (`/search`)**:
   - Type `"RTX"` or `"ASUS"` into the search box or select the `Components` category.
   - Use the dual-handle INR price range slider on the left sidebar (`FilterSidebar.tsx`) to filter by budget (e.g. ₹50,000 to ₹2,00,000) or check the **In Stock Only** and **Prime Delivery Only** checkboxes.
3. **Customize a Product (`/product/:id`)**:
   - Click on the **ASUS ROG Zephyrus G16** or **NVIDIA GeForce RTX 4080 Super**.
   - Hover over the product images to see the **magnifying zoom box in action**.
   - Under **Configuration Options**, change the RAM from `16GB DDR5` to `32GB DDR5 (+₹12,000)` and watch the main price (`₹1,49,990` ➔ `₹1,61,990`) update instantly across the Buy Box!
4. **Test Cart & Coupon Engine (`/cart`)**:
   - Click **Add to Cart** and observe the slide-out **Cart Drawer** indicating free express shipping progress.
   - Navigate to **View Full Cart (`/cart`)** and enter coupon code **`TECHPRO10`** into the discount box. Watch 10% get deducted from your total along with exact GST breakdown.
5. **Complete 3-Step Indian Checkout (`/checkout`)**:
   - Click **Proceed to Checkout**.
   - **Step 1**: Select your saved Indian address (or add a new address with PIN code `400050` Mumbai). Click *Use this address*.
   - **Step 2**: Select **Same-Day Priority Drone Delivery (₹199)** or **FREE Prime Express Delivery**. Click *Continue to Payment*.
   - **Step 3**: Choose **UPI / QR Code** and enter `rahul@okaxis` (or select Credit Card / Net Banking / COD). Click **Place Your Indian Order & Pay**.
6. **Simulate Live Package Tracking (`/orders`)**:
   - After order placement, you will be automatically redirected to your **Your Orders (`/orders`)** dashboard.
   - Click **Track Package** on your newly created order (`ORD-IND-...`).
   - Inside the interactive tracking modal, click **`⚡ Simulate Next Status`**. Watch the status advance in real-time (`Order Placed` ➔ `Payment Verified` ➔ `Shipped` ➔ `Out for Delivery` ➔ `Delivered`) with updated timestamps and Indian warehouse locations (`Bengaluru Hub`, `Mumbai Sort Facility`)!
7. **Manage Dream Builds (`/wishlist`)**:
   - Go to **Your Wishlists (`/wishlist`)**, click **Create New Wishlist**, name it `"My RTX 5090 Dream Build"`, and move items directly from your cart or product pages into your custom list.

---

## 💡 Support & License
Built by **PrimeTech India** Engineering for advanced agentic coding demonstrations.  
For technical support or inquiries, reference the Indian priority toll-free helpline simulated inside your Account Dashboard: `1800-419-2026`.
