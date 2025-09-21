import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Mock authentication - replace with real authentication logic
    if (email && password) {
      // Mock user data
      const mockUser = {
        id: "1",
        email: email,
        name: email.split("@")[0].charAt(0).toUpperCase() + email.split("@")[0].slice(1),
        role: email.includes("admin") ? "ADMIN" : "STUDENT",
      }

      return NextResponse.json({
        success: true,
        user: mockUser,
      })
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
