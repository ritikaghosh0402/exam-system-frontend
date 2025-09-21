import { type NextRequest, NextResponse } from "next/server"

// Mock admin credentials - in production, this should be in a secure database
const ADMIN_CREDENTIALS = {
  email: "admin@examsystem.com",
  password: "admin123", // In production, this should be hashed
  adminKey: "EXAMSYS_ADMIN_2024",
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, adminKey } = await request.json()

    // Validate admin key
    if (adminKey !== ADMIN_CREDENTIALS.adminKey) {
      return NextResponse.json({ message: "Invalid admin access key" }, { status: 401 })
    }

    // Validate admin credentials
    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json({ message: "Invalid admin credentials" }, { status: 401 })
    }

    // Return admin user data
    const adminUser = {
      id: "admin-001",
      email: ADMIN_CREDENTIALS.email,
      name: "System Administrator",
      role: "ADMIN",
    }

    return NextResponse.json({
      message: "Admin login successful",
      user: adminUser,
    })
  } catch (error) {
    console.error("Admin login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
