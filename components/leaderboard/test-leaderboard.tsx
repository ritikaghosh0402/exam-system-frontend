"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Trophy, Medal, Award, ArrowLeft, Clock, Target, Users, TrendingUp } from "lucide-react"

interface TestLeaderboardProps {
  testId: string
}

interface TestLeaderboardEntry {
  rank: number
  studentId: string
  studentName: string
  studentEmail: string
  score: number
  percentage: number
  timeTaken: number
  completedAt: Date
}

interface TestInfo {
  id: string
  title: string
  description: string
  totalQuestions: number
  maxScore: number
  timeLimit: number
  participantCount: number
  averageScore: number
  completionRate: number
}

export function TestLeaderboard({ testId }: TestLeaderboardProps) {
  const router = useRouter()
  const [leaderboard, setLeaderboard] = useState<TestLeaderboardEntry[]>([])
  const [testInfo, setTestInfo] = useState<TestInfo | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL queries
  useEffect(() => {
    const mockTestInfo: TestInfo = {
      id: testId,
      title: "Mathematics Final Exam",
      description: "Comprehensive test covering algebra, geometry, and calculus",
      totalQuestions: 50,
      maxScore: 50,
      timeLimit: 120,
      participantCount: 45,
      averageScore: 78,
      completionRate: 89,
    }

    const mockLeaderboard: TestLeaderboardEntry[] = [
      {
        rank: 1,
        studentId: "s1",
        studentName: "Alice Johnson",
        studentEmail: "alice@example.com",
        score: 48,
        percentage: 96,
        timeTaken: 105,
        completedAt: new Date("2024-01-15T10:30:00"),
      },
      {
        rank: 2,
        studentId: "s2",
        studentName: "Bob Smith",
        studentEmail: "bob@example.com",
        score: 46,
        percentage: 92,
        timeTaken: 110,
        completedAt: new Date("2024-01-15T11:15:00"),
      },
      {
        rank: 3,
        studentId: "s3",
        studentName: "Carol Davis",
        studentEmail: "carol@example.com",
        score: 45,
        percentage: 90,
        timeTaken: 115,
        completedAt: new Date("2024-01-15T12:00:00"),
      },
      {
        rank: 4,
        studentId: "s4",
        studentName: "David Wilson",
        studentEmail: "david@example.com",
        score: 44,
        percentage: 88,
        timeTaken: 108,
        completedAt: new Date("2024-01-15T13:30:00"),
      },
      {
        rank: 5,
        studentId: "s5",
        studentName: "Eva Brown",
        studentEmail: "eva@example.com",
        score: 42,
        percentage: 84,
        timeTaken: 118,
        completedAt: new Date("2024-01-15T14:15:00"),
      },
      {
        rank: 6,
        studentId: "s6",
        studentName: "Frank Miller",
        studentEmail: "frank@example.com",
        score: 41,
        percentage: 82,
        timeTaken: 112,
        completedAt: new Date("2024-01-15T15:00:00"),
      },
      {
        rank: 7,
        studentId: "s7",
        studentName: "Grace Lee",
        studentEmail: "grace@example.com",
        score: 40,
        percentage: 80,
        timeTaken: 120,
        completedAt: new Date("2024-01-15T16:30:00"),
      },
      {
        rank: 8,
        studentId: "s8",
        studentName: "Henry Chen",
        studentEmail: "henry@example.com",
        score: 39,
        percentage: 78,
        timeTaken: 119,
        completedAt: new Date("2024-01-15T17:15:00"),
      },
    ]

    setTimeout(() => {
      setTestInfo(mockTestInfo)
      setLeaderboard(mockLeaderboard)
      setLoading(false)
    }, 1000)
  }, [testId])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return (
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-sm font-medium">
            {rank}
          </div>
        )
    }
  }

  const getScoreBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (percentage >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
    if (percentage >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
  }

  if (loading || !testInfo) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.push("/leaderboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Global Leaderboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{testInfo.title}</h1>
                <p className="text-sm text-muted-foreground">Test Leaderboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Test Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{testInfo.participantCount}</p>
                  <p className="text-sm text-muted-foreground">Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{testInfo.averageScore}%</p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{testInfo.timeLimit}m</p>
                  <p className="text-sm text-muted-foreground">Time Limit</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{testInfo.completionRate}%</p>
                  <p className="text-sm text-muted-foreground">Completion Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Test Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Test Overview</CardTitle>
            <CardDescription>{testInfo.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Questions</span>
                  <span className="font-medium">{testInfo.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Maximum Score</span>
                  <span className="font-medium">{testInfo.maxScore} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Time Limit</span>
                  <span className="font-medium">{testInfo.timeLimit} minutes</span>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Completion Rate</span>
                    <span className="font-medium">{testInfo.completionRate}%</span>
                  </div>
                  <Progress value={testInfo.completionRate} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Average Performance</span>
                    <span className="font-medium">{testInfo.averageScore}%</span>
                  </div>
                  <Progress value={testInfo.averageScore} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top 3 Performers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboard.slice(0, 3).map((entry) => (
            <Card key={entry.studentId} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{getRankIcon(entry.rank)}</div>
                <Avatar className="h-16 w-16 mx-auto mb-4">
                  <AvatarFallback>
                    <AvatarInitials name={entry.studentName} />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{entry.studentName}</h3>
                <p className="text-sm text-muted-foreground mb-3">{entry.studentEmail}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-2xl font-bold text-primary">{entry.percentage}%</span>
                    {getScoreBadge(entry.percentage)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.score}/{testInfo.maxScore} points • {entry.timeTaken}m
                  </p>
                  <p className="text-xs text-muted-foreground">Completed: {entry.completedAt.toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Complete Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Rankings</CardTitle>
            <CardDescription>All participants ranked by performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.studentId}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getRankIcon(entry.rank)}
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        <AvatarInitials name={entry.studentName} />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-lg">{entry.studentName}</p>
                      <p className="text-sm text-muted-foreground">{entry.studentEmail}</p>
                      <p className="text-xs text-muted-foreground">
                        Completed: {entry.completedAt.toLocaleDateString()} at {entry.completedAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{entry.percentage}%</span>
                      {getScoreBadge(entry.percentage)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {entry.score}/{testInfo.maxScore} points
                    </p>
                    <p className="text-xs text-muted-foreground">Time: {entry.timeTaken} minutes</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
