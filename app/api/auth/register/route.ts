import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    if (email && password && name) {
      // Mock user data
      const mockUser = {
        id: Math.random().toString(36).substr(2, 9),
        email: email,
        name: name,
        role: "STUDENT",
      }

      return NextResponse.json({
        success: true,
        user: mockUser,
      })
    }

    return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
