# DIGITEX Website

A responsive seven-page HTML + Tailwind CSS + vanilla JavaScript website for an embroidery and vector digitizing service.

## Pages
- `index.html` — Home
- `services.html` — Services + FAQ
- `solutions.html` — Bulk, API, white-label, and rush workflow solutions
- `industries.html` — Industry use cases
- `about.html` — Story, values, team, and stats
- `portfolio.html` — Filterable portfolio + lightbox
- `contact.html` — Quote form, file upload UI, contact cards, and map placeholder

## WordPress / Elementor conversion
The HTML contains `EL:SECTION` comments describing the intended native Elementor structure. Rebuild each section with native Containers and widgets: Heading, Text Editor, Button, Icon Box, Icon List, Image, Counter, Testimonial, Form, Social Icons, Accordion, and Google Maps. No HTML widget is required.

Paste `assets/css/customizer.css` into **Appearance → Customize → Additional CSS** and apply the same class names to the Elementor containers/widgets through **Advanced → CSS Classes**. Use Elementor Site Settings for Inter and the main color tokens.

## Important
- The contact form and newsletter/testimonial controls are front-end demonstrations. Replace the form with Elementor Pro Form actions or your preferred form plugin.
- Contact details and prices are sample content and should be updated before launch.
- Font Awesome and Google Fonts load from CDNs. All portfolio artwork is included locally as SVG.

## Rebuild Tailwind
```bash
npm install
npm run build:css
```
