"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { LoginForm } from "@/components/auth/login-form"
import { StudentDashboard } from "@/components/dashboard/student-dashboard"
import { AdminDashboard } from "@/components/dashboard/admin-dashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()

  // 🔎 GraphQL connection test
  useEffect(() => {
    async function testGraphQL() {
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: "{ __typename }" }),
        })
        const data = await res.json()
        console.log("[GraphQL Test Response]", data)
      } catch (err) {
        console.error("[GraphQL Test Error]", err)
      }
    }
    testGraphQL()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-gradient-dashboard">
        <Card className="w-full max-w-md glass-card border-white/20">
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
            <span className="ml-2 text-white">Loading...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return (
    <div className="min-h-screen bg-background">
      {user.role === "STUDENT" ? (
        <StudentDashboard user={user} />
      ) : (
        <AdminDashboard user={user} />
      )}
    </div>
  )
}
