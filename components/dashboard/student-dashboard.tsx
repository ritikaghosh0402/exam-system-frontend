"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { BookOpen, Clock, Trophy, LogOut, Play, CheckCircle, AlertCircle, Calendar, Target } from "lucide-react"

interface Test {
  id: string
  title: string
  description: string
  duration: number // in minutes
  totalQuestions: number
  status: "available" | "completed" | "in-progress"
  score?: number
  maxScore?: number
  scheduledAt?: Date
  completedAt?: Date
}

interface StudentDashboardProps {
  user: any
}

export function StudentDashboard({ user }: StudentDashboardProps) {
  const { logout } = useAuth()
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL queries
  useEffect(() => {
    const mockTests: Test[] = [
      {
        id: "1",
        title: "Mathematics Final Exam",
        description: "Comprehensive test covering algebra, geometry, and calculus",
        duration: 120,
        totalQuestions: 50,
        status: "available",
        scheduledAt: new Date("2024-01-15T10:00:00"),
      },
      {
        id: "2",
        title: "Physics Midterm",
        description: "Mechanics, thermodynamics, and electromagnetism",
        duration: 90,
        totalQuestions: 40,
        status: "completed",
        score: 85,
        maxScore: 100,
        completedAt: new Date("2024-01-10T14:30:00"),
      },
      {
        id: "3",
        title: "Chemistry Quiz",
        description: "Organic chemistry fundamentals",
        duration: 45,
        totalQuestions: 25,
        status: "available",
        scheduledAt: new Date("2024-01-20T09:00:00"),
      },
      {
        id: "4",
        title: "Biology Assessment",
        description: "Cell biology and genetics",
        duration: 60,
        totalQuestions: 30,
        status: "completed",
        score: 92,
        maxScore: 100,
        completedAt: new Date("2024-01-08T11:00:00"),
      },
    ]

    setTimeout(() => {
      setTests(mockTests)
      setLoading(false)
    }, 1000)
  }, [])

  const availableTests = tests.filter((test) => test.status === "available")
  const completedTests = tests.filter((test) => test.status === "completed")
  const averageScore =
    completedTests.length > 0
      ? Math.round(completedTests.reduce((sum, test) => sum + (test.score || 0), 0) / completedTests.length)
      : 0

  const getStatusBadge = (status: Test["status"]) => {
    switch (status) {
      case "available":
        return (
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
            Available
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
            In Progress
          </Badge>
        )
      default:
        return null
    }
  }

  const handleStartTest = (testId: string) => {
    window.location.href = `/test/${testId}`
  }

  const handleViewResult = (testId: string) => {
    window.location.href = `/results/${testId}`
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
                <p className="text-sm glass-text-muted">Student Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="gradient"
                size="sm"
                onClick={() => (window.location.href = "/leaderboard")}
                className="button-glow"
              >
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
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
          <Card className="enhanced-card hover-lift float-animation gradient-bg-cyan text-white border-0 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{availableTests.length}</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Available Tests</p>
                </div>
                <Target className="h-8 w-8 text-white/80" />
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
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{completedTests.length}</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Completed Tests</p>
                </div>
                <CheckCircle className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="enhanced-card hover-lift float-animation gradient-bg-orange text-white border-0 shadow-2xl"
            style={{ animationDelay: "1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">{averageScore}%</p>
                  <p className="text-sm text-white/90 drop-shadow-md">Average Score</p>
                </div>
                <Trophy className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>

          <Card
            className="enhanced-card hover-lift float-animation gradient-bg-purple text-white border-0 shadow-2xl"
            style={{ animationDelay: "1.5s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-white drop-shadow-lg">
                    {tests.reduce((sum, test) => sum + test.duration, 0)}
                  </p>
                  <p className="text-sm text-white/90 drop-shadow-md">Total Minutes</p>
                </div>
                <Clock className="h-8 w-8 text-white/80" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="enhanced-tabs grid w-full grid-cols-3">
            <TabsTrigger value="available" className="enhanced-tab-trigger">
              Available Tests
            </TabsTrigger>
            <TabsTrigger value="completed" className="enhanced-tab-trigger">
              Completed Tests
            </TabsTrigger>
            <TabsTrigger value="results" className="enhanced-tab-trigger">
              Results & Rankings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {availableTests.map((test, index) => (
                <Card
                  key={test.id}
                  className="enhanced-card hover-lift float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg glass-text">{test.title}</CardTitle>
                        <CardDescription className="glass-text-muted">{test.description}</CardDescription>
                      </div>
                      {getStatusBadge(test.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="analytics-text-secondary">{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-purple-400" />
                        <span className="analytics-text-secondary">{test.totalQuestions} questions</span>
                      </div>
                      {test.scheduledAt && (
                        <div className="flex items-center space-x-2 col-span-2">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span className="analytics-text-secondary">
                            Scheduled: {test.scheduledAt.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button
                      className="w-full button-glow pulse-glow"
                      variant="gradient"
                      onClick={() => handleStartTest(test.id)}
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Start Test
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {availableTests.length === 0 && (
              <Card className="enhanced-card">
                <CardContent className="text-center py-12">
                  <Target className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2 glass-text">No Available Tests</h3>
                  <p className="glass-text-muted">Check back later for new tests.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Completed Tests Tab */}
          <TabsContent value="completed" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {completedTests.map((test, index) => (
                <Card
                  key={test.id}
                  className="enhanced-card hover-lift float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg glass-text">{test.title}</CardTitle>
                        <CardDescription className="glass-text-muted">{test.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(test.status)}
                        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30">
                          {test.score}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-400" />
                        <span className="analytics-text-secondary">{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4 text-purple-400" />
                        <span className="analytics-text-secondary">{test.totalQuestions} questions</span>
                      </div>
                      {test.completedAt && (
                        <div className="flex items-center space-x-2 col-span-2">
                          <Calendar className="h-4 w-4 text-emerald-400" />
                          <span className="analytics-text-secondary">
                            Completed: {test.completedAt.toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button className="w-full button-glow" variant="glass" onClick={() => handleViewResult(test.id)}>
                      View Result
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {completedTests.length === 0 && (
              <Card className="enhanced-card">
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium mb-2 glass-text">No Completed Tests</h3>
                  <p className="glass-text-muted">You haven't completed any tests yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Results & Rankings Tab */}
          <TabsContent value="results" className="space-y-4">
            <Card className="enhanced-card">
              <CardContent className="text-center py-12">
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2 glass-text">Results & Rankings</h3>
                <p className="glass-text-muted">Your detailed results and rankings will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
