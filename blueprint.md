
# Project Blueprint

## Overview

This project is a modern and professional website for a company specializing in low-current systems. The website will showcase the company's services, highlight its expertise, and provide clear calls to action for potential clients.

## Design and Features

### Version 2.0 (Current)

*   **Color Palette:** A bold, vibrant, and futuristic color scheme. The design uses a deep space-blue background (`#0C0C1D`), with electric blue (`#007BFF`) and bright cyan (`#00F2FF`) as primary and accent colors, creating a high-tech and energetic feel.
*   **Typography:** The 'Poppins' font is used for its clean, modern, and highly readable characteristics, perfect for a tech-focused company.
*   **Layout:** A responsive and visually balanced layout that works seamlessly on both desktop and mobile devices.
*   **Visual Effects:**
    *   **Noise Texture:** A subtle noise texture is applied to the main background to add a premium, tactile feel.
    *   **Gradients:** Buttons and other key elements feature vibrant linear gradients.
    *   **Glow Effects:** Soft, deep shadows and colored glows are used to create a sense of depth and make interactive elements pop.
    *   **Glassmorphism:** The header and cards use a frosted glass effect to appear modern and float above the content.
*   **Components:** Header, Hero, Features, About, Contact, Footer.

### Current Addition: Estimate Calculator

*   **Feature:** An interactive, multi-step form to provide users with a preliminary cost estimate for low-current system installations.
*   **Logic:** The form will gather user requirements and use a Server Action to query the Gemini API for a cost breakdown.
*   **Design:** The calculator will be styled to match the site's futuristic aesthetic, using glassmorphism, gradient accents, and glowing interactive elements.

## Current Plan

1.  **Create `EstimateCalculator.tsx` component:** Develop the UI for the multi-step form.
2.  **Integrate into `page.tsx`:** Add the new calculator section to the main page.
3.  **Style the component:** Add styles to `app/globals.css` for the calculator's appearance and responsiveness.
4.  **Implement Server Action:** Create the backend logic in `app/actions.ts` to process form data and communicate with the Gemini API (to be done after UI is complete).
