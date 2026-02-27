# Hair by Megan Essig - Website Specification

## Project Overview
- **Project Name**: Hair by Megan Essig - Salon Website
- **Type**: Single-page responsive website with booking integration
- **Core Functionality**: Showcase salon services, photo gallery, and embedded appointment booking
- **Target Users**: Potential clients seeking hair services in Orlando, FL area

---

## UI/UX Specification

### Layout Structure

**Sections (top to bottom):**
1. **Navigation** - Fixed top nav with logo, nav links, mobile hamburger menu
2. **Hero** - Full-width hero with salon tagline and CTA button
3. **About** - Brief salon intro with featured image
4. **Services** - Detailed service descriptions with pricing
5. **Gallery** - Masonry-style photo gallery with lightbox
6. **Book Now** - Embedded Square appointment widget
7. **Contact** - Location, hours, contact info
8. **Footer** - Social links, copyright

**Responsive Breakpoints:**
- Mobile: < 768px (single column, hamburger nav)
- Tablet: 768px - 1024px (2 columns where applicable)
- Desktop: > 1024px (full layout, 3-4 column gallery)

### Visual Design

**Color Palette:**
- Primary: `#1a1a1a` (Rich Black - backgrounds, text)
- Secondary: `#f5f0e8` (Warm Cream - backgrounds)
- Accent: `#c9a87c` (Champagne Gold - buttons, highlights)
- Accent Hover: `#b8956a` (Darker Gold)
- Text Primary: `#1a1a1a`
- Text Light: `#ffffff`
- Text Muted: `#666666`

**Typography:**
- Headings: "Cormorant Garamond", serif (elegant, editorial feel)
- Body: "DM Sans", sans-serif (clean, readable)
- Hero Title: 56px desktop / 36px mobile
- Section Titles: 42px desktop / 28px mobile
- Body Text: 16px
- Small Text: 14px

**Spacing System:**
- Section Padding: 100px vertical desktop / 60px mobile
- Container Max Width: 1200px
- Grid Gap: 24px
- Component Padding: 24px

**Visual Effects:**
- Subtle box shadows on cards: `0 4px 20px rgba(0,0,0,0.08)`
- Smooth hover transitions: 0.3s ease
- Gallery images: subtle scale on hover (1.02)
- Buttons: slight lift on hover with shadow increase

### Components

**Navigation:**
- Logo (text-based: "Hair by Megan Essig")
- Nav links: Home, Services, Gallery, Book Now, Contact
- Mobile: Hamburger icon → slide-in menu

**Hero Section:**
- Full viewport height minus nav
- Background: Subtle gradient overlay on neutral tone
- Headline: "Where Beauty Becomes an Experience"
- Subheadline: "Orlando's Premier Hair Studio"
- CTA Button: "Book Your Appointment"

**Service Cards:**
- Icon or decorative element
- Service name
- Price
- Brief description
- Hover: subtle lift effect

**Gallery:**
- Masonry layout with varying image heights
- Click to open lightbox modal
- Admin can add images by adding to /assets folder and updating gallery array in JS
- Simple CMS: Just add image files and update the JS array

**Booking Widget:**
- Square Appointments embed
- "Book Now" opens modal or scrolls to booking section
- Client receives confirmation email from Square
- Salon receives notification from Square

**Contact Section:**
- Address: 1235 N. Orange Ave. St 201, Orlando, FL 32804
- Phone: 407-927-1927
- Email: meganessig1@gmail.com
- Hours: By Appointment
- Embedded Google Map (placeholder)

---

## Functionality Specification

### Core Features

1. **Responsive Navigation**
   - Smooth scroll to sections on click
   - Mobile menu toggle
   - Sticky header on scroll

2. **Photo Gallery**
   - Masonry grid layout
   - Lightbox modal on click
   - Navigation arrows in lightbox
   - Close on escape or click outside

3. **Appointment Booking**
   - Embedded Square widget
   - Opens in-page (no redirect for basic flow)
   - Confirmation emails to client and salon

4. **Service Listings**
   - Clear pricing display
   - Expandable descriptions on mobile if needed

5. **SEO Setup**
   - Meta title and description
   - Open Graph tags
   - Local business JSON-LD schema
   - Semantic HTML structure

### User Interactions
- Smooth scroll navigation
- Hover effects on all interactive elements
- Gallery lightbox with keyboard navigation (arrow keys, escape)
- Form validation on contact (if applicable)

### Edge Cases
- Images fail to load: show placeholder
- Square widget fails: show fallback contact for booking
- Mobile landscape: adjust hero height

---

## Acceptance Criteria

1. ✅ Site loads without errors on all breakpoints
2. ✅ Navigation works on mobile and desktop
3. ✅ Gallery displays all 28 images in masonry layout
4. ✅ Lightbox opens and navigates correctly
5. ✅ Square booking widget loads and is functional
6. ✅ All service prices match the pricing page
7. ✅ Contact information is accurate and complete
8. ✅ SEO meta tags are present
9. ✅ Local business schema is valid JSON-LD
10. ✅ Page passes basic accessibility checks (semantic HTML, alt tags)

---

## Technical Implementation

- **Single HTML file** with embedded CSS and JS for simplicity
- **No build tools required** - just open in browser
- **Gallery CMS**: Add images to /assets folder, update gallery array in JavaScript
- **Booking**: Square Appointments embed (Megan already uses Square)
- **CDN Resources**: Google Fonts, no other external dependencies
