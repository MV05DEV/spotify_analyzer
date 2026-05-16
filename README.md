# Soundscape: Music Personality Analyzer

## Overview
I built **Soundscape**, a Spotify-Wrapped style music personality analyzer. It uses Next.js 16, React 19, and Tailwind CSS. 

The application integrates with the Spotify API via `next-auth` to fetch a user's top tracks and artists. Based on this data and Spotify's audio features, it generates:
- **Genre DNA**: A visual chart of listening landscape across genres.
- **Mood Spectrum**: An analysis of energy, happiness, and danceability.
- **Listener Archetypes**: A classification of the user into 10 distinct archetypes (e.g., "The Sonic Explorer").
- **Top Artists & Tracks**: Visualized with a 30-second audio preview.
- **Exportable Card**: A beautifully designed "Personality Card" that can be exported as an image (using `html2canvas`) and shared on social media.
- **Demo Mode**: For judges and users who do not have a Spotify account, providing them with a seamless preview of the experience using mock data.

## Loom Walkthrough
> **[Insert Your Loom Link Here]**

## Issues I Ran Into & How I Solved Them
1. **Spotify API 403 / Endpoint Deprecations**: During development, I realized that Spotify recently restricted the `/audio-features` endpoint for development apps. To solve this, I added graceful fallback logic that sets audio features to empty or mock arrays when a 403 is encountered, ensuring the app doesn't crash and the core functionality remains intact.
2. **Expired Access Tokens (401 Error)**: By default, the `next-auth` Spotify provider doesn't rotate tokens. Access tokens expire after 1 hour. I solved this by catching the 401 error explicitly in the API route (`/api/analysis/route.ts`) and returning a clear message to the user: "Your Spotify session expired. Please sign out and connect again."
3. **html2canvas Cross-Origin Issues**: When rendering Spotify images on the canvas for export, it failed due to CORS. I solved this by ensuring images are loaded with `crossOrigin="anonymous"` and configuring `html2canvas` to use `useCORS: true`.

## What I'd Improve With More Time (Reflection)
- **Token Refresh / Rotation**: Rather than prompting the user to sign out and sign back in when their Spotify token expires, I would implement automatic token rotation using the `refresh_token` in the `next-auth` JWT callbacks.
- **Supabase Integration for Persistence**: Currently, the analysis is fetched on the fly. I would persist the generated user profiles and analysis results to the local Supabase database to allow users to view their history and compare how their tastes change over time.
- **Mobile Responsiveness**: I focused on a desktop-first design with premium animations (glassmorphism, floating orbs). With more time, I would ensure the layout adapts perfectly for mobile users, especially for the exportable share card.
- **Testing Coverage**: I would add Playwright or Cypress for end-to-end testing, particularly for the Spotify OAuth flow and the image export functionality.
