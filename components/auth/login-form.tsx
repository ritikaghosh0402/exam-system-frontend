"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "./auth-provider"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, BookOpen } from "lucide-react"

import type { UserRole } from "./auth-provider"

export function LoginForm() {
  const { login, register, loginWithGoogle, loading } = useAuth()

  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    role: "STUDENT" as UserRole,
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await login(loginData.email, loginData.password)
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await register(
        registerData.email,
        registerData.password,
        registerData.name,
        "STUDENT"
      )
    } catch (err) {
      setError("Registration failed. Please try again.")
    }
  }

  const handleGoogleLogin = async () => {
    setError("")
    try {
      await loginWithGoogle()
    } catch (err) {
      setError("Google login failed. Please try again.")
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 login-page"
      style={{
        background:
          "linear-gradient(-45deg, #1e293b, #334155, #0f172a, #1e40af)",
        backgroundSize: "400% 400%",
        animation: "gradient 15s ease infinite",
      }}
    >
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <div className="p-2 rounded-full bg-slate-800/80 backdrop-blur-sm border border-white/20">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              ExamSystem
            </h1>
          </div>
          <p className="text-white drop-shadow-md">
            Modern online testing platform
          </p>
        </div>

        {/* Card */}
        <Card className="backdrop-blur-xl bg-slate-800/90 border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-white">Welcome</CardTitle>
            <CardDescription className="text-center text-slate-200">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Tabs */}
              <TabsList className="grid w-full grid-cols-2 bg-slate-700/80 border border-white/20">
                <TabsTrigger
                  value="login"
                  className="text-slate-200 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="text-slate-200 data-[state=active]:bg-slate-600 data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                      className="bg-slate-700/80 border-white/30 text-white placeholder:text-slate-300 focus:border-white/50 focus:ring-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                      className="bg-slate-700/80 border-white/30 text-white placeholder:text-slate-300 focus:border-white/50 focus:ring-white/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    variant="gradient"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/30" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-800/90 px-2 text-slate-200">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Login */}
                <Button
                  type="button"
                  className="w-full bg-slate-600 border-white/30 text-white hover:bg-slate-500 group shadow-lg border"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg
                    className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={registerData.name}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, name: e.target.value })
                      }
                      required
                      className="bg-slate-700/80 border-white/30 text-white placeholder:text-slate-300 focus:border-white/50 focus:ring-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                      className="bg-slate-700/80 border-white/30 text-white placeholder:text-slate-300 focus:border-white/50 focus:ring-white/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-white">
                      Password
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      required
                      className="bg-slate-700/80 border-white/30 text-white placeholder:text-slate-300 focus:border-white/50 focus:ring-white/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    variant="gradient"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Student Account"
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Error Message */}
            {error && (
              <Alert className="mt-4 bg-red-900/80 border-red-400/50">
                <AlertDescription className="text-white">
                  {error}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Optional admin portal button */}
        {/*
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => (window.location.href = "/admin-portal")}
            className="text-slate-300 hover:text-white hover:bg-white/10 text-sm"
          >
            🔐 Admin Portal Access
          </Button>
        </div>
        */}
      </div>
    </div>
  )
}
