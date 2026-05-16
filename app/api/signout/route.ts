import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const cookieStore = await cookies()
  
  // Clear all next-auth cookies
  const nextAuthCookies = [
    "next-auth.session-token",
    "next-auth.csrf-token", 
    "next-auth.callback-url",
    "__Secure-next-auth.session-token",
    "__Secure-next-auth.csrf-token",
    "__Host-next-auth.csrf-token",
  ]
  
  const response = NextResponse.redirect(
    new URL("/", process.env.NEXTAUTH_URL ?? "http://127.0.0.1:3004")
  )
  
  for (const name of nextAuthCookies) {
    response.cookies.set(name, "", { expires: new Date(0), path: "/" })
  }
  
  return response
}
