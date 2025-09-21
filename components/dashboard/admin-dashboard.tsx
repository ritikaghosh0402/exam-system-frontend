"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { BookOpen, LogOut, Plus, Users, FileText, Settings, Target, BarChart3 } from "lucide-react"
import { AdminTestList } from "@/components/admin/admin-test-list"
import { AdminLeaderboard } from "@/components/admin/admin-leaderboard"
import { AdminAnalytics } from "@/components/admin/admin-analytics"

interface AdminDashboardProps {
  user: any
}

interface DashboardStats {
  totalTests: number
  activeTests: number
  totalStudents: number
  completedAttempts: number
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const { logout } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalTests: 0,
    activeTests: 0,
    totalStudents: 0,
    completedAttempts: 0,
  })
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL queries
  useEffect(() => {
    const mockStats: DashboardStats = {
      totalTests: 12,
      activeTests: 5,
      totalStudents: 156,
      completedAttempts: 342,
    }

    setTimeout(() => {
      setStats(mockStats)
      setLoading(false)
    }, 1000)
  }, [])

  const handleCreateTest = () => {
    window.location.href = "/admin/create-test"
  }

  return (
    <div className="min-h-screen dashboard-bg animated-gradient-dashboard">
      {/* Header */}
      <header className="border-b enhanced-card backdrop-blur-xl bg-white/5 border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full gradient-bg-emerald shadow-lg hover-lift">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold glass-text">ExamSystem</h1>
                <p className="text-sm glass-text-muted">Admin Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={handleCreateTest} variant="gradient" className="button-glow pulse-glow">
                <Plus className="h-4 w-4 mr-2" />
                Create Test
              </Button>
              <div className="flex items-center space-x-2">
                <Avatar className="h-10 w-10 ring-2 ring-white/30 hover-lift">
                  <AvatarFallback className="gradient-bg-emerald text-white">
                    <AvatarInitials name={user.name} />
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium glass-text">{user.name}</p>
                  <p className="text-xs glass-text-muted">{user.email}</p>
                </div>
              </div>
              <Button variant="glass" size="sm" onClick={logout} className="button-glow">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="enhanced-card hover-lift float-animation gradient-bg-blue text-white border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{stats.totalTests}</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Total Tests</p>
                </div>
                <FileText className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="enhanced-card hover-lift float-animation gradient-bg-emerald text-white border-0 shadow-2xl"
            style={{ animationDelay: "0.5s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{stats.activeTests}</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Active Tests</p>
                </div>
                <Target className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="enhanced-card hover-lift float-animation gradient-bg-purple text-white border-0 shadow-2xl"
            style={{ animationDelay: "1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{stats.totalStudents}</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Total Students</p>
                </div>
                <Users className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="enhanced-card hover-lift float-animation gradient-bg-pink text-white border-0 shadow-2xl"
            style={{ animationDelay: "1.5s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{stats.completedAttempts}</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Completed Attempts</p>
                </div>
                <BarChart3 className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="tests" className="space-y-6">
          <TabsList className="enhanced-tabs grid w-full grid-cols-4">
            <TabsTrigger value="tests" className="enhanced-tab-trigger">
              Tests
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="enhanced-tab-trigger">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="analytics" className="enhanced-tab-trigger">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="enhanced-tab-trigger">
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests">
            <AdminTestList />
          </TabsContent>

          <TabsContent value="leaderboard">
            <AdminLeaderboard />
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="enhanced-card">
              <CardHeader>
                <CardTitle className="glass-text">System Settings</CardTitle>
                <CardDescription className="glass-text-muted">
                  Configure system-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="enhanced-card hover-lift gradient-bg-blue/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Settings className="h-6 w-6 text-blue-400" />
                        <h3 className="font-medium glass-text">Test Security</h3>
                      </div>
                      <p className="text-sm glass-text-muted mb-4">Configure security settings for test taking</p>
                      <Button variant="glass" size="sm" className="button-glow">
                        Configure
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="enhanced-card hover-lift gradient-bg-emerald/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Users className="h-6 w-6 text-emerald-400" />
                        <h3 className="font-medium glass-text">User Management</h3>
                      </div>
                      <p className="text-sm glass-text-muted mb-4">Manage student and admin accounts</p>
                      <Button variant="glass" size="sm" className="button-glow">
                        Manage Users
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="enhanced-card hover-lift gradient-bg-purple/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Settings className="h-6 w-6 text-purple-400" />
                        <h3 className="font-medium glass-text">Notifications</h3>
                      </div>
                      <p className="text-sm glass-text-muted mb-4">Configure email and system notifications</p>
                      <Button variant="glass" size="sm" className="button-glow">
                        Configure
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="enhanced-card hover-lift gradient-bg-pink/20">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <FileText className="h-6 w-6 text-pink-400" />
                        <h3 className="font-medium glass-text">Backup & Export</h3>
                      </div>
                      <p className="text-sm glass-text-muted mb-4">Export test data and manage backups</p>
                      <Button variant="glass" size="sm" className="button-glow">
                        Export Data
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
