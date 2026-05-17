# AI-Assisted Development Logs

*These logs document the AI-assisted development process used to build the Soundscape Spotify analyzer. I used an AI coding assistant primarily for tackling API edge cases and library integrations.*

---

## 1. Setting up Spotify OAuth with NextAuth

**My Prompt:**
> I'm building a Spotify analyzer using Next.js 16 App Router and next-auth. I need to fetch the user's top tracks, but `useSession()` only gives me their name and email. How do I get the Spotify access token so I can make API requests to the Spotify Web API?

**AI Response:**
> By default, NextAuth doesn't expose the provider's access token to the client for security reasons. To pass the Spotify access token to your session, you need to use the `jwt` and `session` callbacks in your `NextAuthOptions`.
> 
> Here's how you can configure `app/api/auth/[...nextauth]/route.ts`:
> 
> ```typescript
> export const authOptions: NextAuthOptions = {
>   providers: [
>     SpotifyProvider({
>       clientId: process.env.SPOTIFY_CLIENT_ID!,
>       clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
>       authorization: { params: { scope: 'user-top-read' } },
>     }),
>   ],
>   callbacks: {
>     async jwt({ token, account }) {
>       if (account) {
>         token.accessToken = account.access_token;
>       }
>       return token;
>     },
>     async session({ session, token }) {
>       session.accessToken = token.accessToken;
>       return session;
>     },
>   },
> };
> ```
> Then, in your server API routes, you can call `getServerSession(authOptions)` and extract `session.accessToken` to query the Spotify API!

---

## 2. Handling Spotify API Restrictions (403 Errors)

**My Prompt:**
> I'm trying to fetch the audio features for the top tracks using the `/v1/audio-features` endpoint, but I'm consistently getting a 403 Forbidden error, even though my token works for fetching the top tracks. What's going on?

**AI Response:**
> Spotify recently (late 2024) restricted access to the `/audio-features` endpoint for applications in Development Mode. Only approved Production apps or specific legacy apps have access to this endpoint now. 
> 
> If you are building a demo or assignment, the best way to handle this is to fail gracefully so the rest of your app still works. You can catch the 403 status code and return an empty array or mock data:
> 
> ```typescript
> export async function fetchAudioFeatures(accessToken: string, trackIds: string[]) {
>   const res = await fetch(`https://api.spotify.com/v1/audio-features?ids=${trackIds.join(",")}`, {
>     headers: { Authorization: `Bearer ${accessToken}` }
>   });
>   
>   // Catch the restricted endpoint error
>   if (res.status === 403) return { audio_features: [] };
>   if (!res.ok) throw new Error(`Spotify API error: ${res.status}`);
>   
>   return res.json();
> }
> ```

---

## 3. Exporting React Components as Images

**My Prompt:**
> I have a `PersonalityCard` React component that displays the user's music archetype and top artists. I want users to be able to download this entire component as a PNG image to share on social media. What's the best library for this in a Next.js app?

**AI Response:**
> The most popular and reliable library for converting DOM elements to images is `html2canvas`. Since you are rendering album art from Spotify, you need to be careful about Cross-Origin Resource Sharing (CORS).
> 
> 1. Install the library: `npm install html2canvas`
> 2. Ensure all `<img>` tags loading external URLs (like Spotify album art) have the `crossOrigin="anonymous"` attribute.
> 3. Use it in an async handler:
> 
> ```tsx
> const handleExport = async () => {
>   if (!cardRef.current) return;
>   
>   const html2canvas = (await import("html2canvas")).default;
>   const canvas = await html2canvas(cardRef.current, {
>     backgroundColor: "#080810", // Match your app's background
>     scale: 2, // Higher resolution for export
>     useCORS: true, // Critical for Spotify images
>   });
>   
>   const link = document.createElement("a");
>   link.download = "my-personality.png";
>   link.href = canvas.toDataURL("image/png");
>   link.click();
> };
> ```

---

## 4. Gracefully Handling Expired Tokens (401 Errors)

**My Prompt:**
> My Spotify session expires after exactly an hour. When I try to refresh the dashboard, the backend throws a 401 Unauthorized error. I don't have time to implement a full refresh token rotation cycle right now. How can I handle this gracefully on the frontend?

**AI Response:**
> If you don't want to implement token rotation, the best approach is to explicitly detect the 401 error and instruct the user to sign out and log back in. 
> 
> **Backend (`app/api/analysis/route.ts`):**
> When your fetch function throws an error, check if it's a 401. If it is, return a specific error message.
> ```typescript
> } catch (err) {
>   if (err instanceof Error && err.message.includes("401")) {
>     return NextResponse.json(
>       { error: "Your Spotify session expired. Please sign out and connect again." }, 
>       { status: 401 }
>     );
>   }
>   return NextResponse.json({ error: "Failed to fetch Spotify data" }, { status: 500 });
> }
> ```
> 
> **Frontend (`app/dashboard/page.tsx`):**
> If your fetch logic catches this error, simply display `error.message` in the UI next to a "Sign Out" button, so the user has a clear path to fix the issue.
