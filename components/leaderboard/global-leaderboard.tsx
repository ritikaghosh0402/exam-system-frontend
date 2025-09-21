"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, TrendingUp, ArrowLeft, Calendar, Users } from "lucide-react"

interface GlobalLeaderboardEntry {
  rank: number
  studentId: string
  studentName: string
  studentEmail: string
  totalTests: number
  averageScore: number
  totalPoints: number
  lastActive: Date
}

interface TestSummary {
  id: string
  title: string
  participantCount: number
  averageScore: number
}

export function GlobalLeaderboard() {
  const router = useRouter()
  const [leaderboard, setLeaderboard] = useState<GlobalLeaderboardEntry[]>([])
  const [tests, setTests] = useState<TestSummary[]>([])
  const [timeFilter, setTimeFilter] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL queries
  useEffect(() => {
    const mockTests: TestSummary[] = [
      { id: "1", title: "Mathematics Final Exam", participantCount: 45, averageScore: 78 },
      { id: "2", title: "Physics Midterm", participantCount: 38, averageScore: 85 },
      { id: "3", title: "Chemistry Quiz", participantCount: 32, averageScore: 72 },
      { id: "4", title: "Biology Assessment", participantCount: 52, averageScore: 88 },
    ]

    const mockLeaderboard: GlobalLeaderboardEntry[] = [
      {
        rank: 1,
        studentId: "s1",
        studentName: "Alice Johnson",
        studentEmail: "alice@example.com",
        totalTests: 4,
        averageScore: 94,
        totalPoints: 376,
        lastActive: new Date("2024-01-15T10:30:00"),
      },
      {
        rank: 2,
        studentId: "s2",
        studentName: "Bob Smith",
        studentEmail: "bob@example.com",
        totalTests: 4,
        averageScore: 89,
        totalPoints: 356,
        lastActive: new Date("2024-01-14T15:20:00"),
      },
      {
        rank: 3,
        studentId: "s3",
        studentName: "Carol Davis",
        studentEmail: "carol@example.com",
        totalTests: 3,
        averageScore: 87,
        totalPoints: 261,
        lastActive: new Date("2024-01-13T12:45:00"),
      },
      {
        rank: 4,
        studentId: "s4",
        studentName: "David Wilson",
        studentEmail: "david@example.com",
        totalTests: 4,
        averageScore: 85,
        totalPoints: 340,
        lastActive: new Date("2024-01-12T09:15:00"),
      },
      {
        rank: 5,
        studentId: "s5",
        studentName: "Eva Brown",
        studentEmail: "eva@example.com",
        totalTests: 3,
        averageScore: 83,
        totalPoints: 249,
        lastActive: new Date("2024-01-11T16:30:00"),
      },
      {
        rank: 6,
        studentId: "s6",
        studentName: "Frank Miller",
        studentEmail: "frank@example.com",
        totalTests: 2,
        averageScore: 82,
        totalPoints: 164,
        lastActive: new Date("2024-01-10T14:20:00"),
      },
      {
        rank: 7,
        studentId: "s7",
        studentName: "Grace Lee",
        studentEmail: "grace@example.com",
        totalTests: 4,
        averageScore: 81,
        totalPoints: 324,
        lastActive: new Date("2024-01-09T11:10:00"),
      },
      {
        rank: 8,
        studentId: "s8",
        studentName: "Henry Chen",
        studentEmail: "henry@example.com",
        totalTests: 3,
        averageScore: 79,
        totalPoints: 237,
        lastActive: new Date("2024-01-08T13:45:00"),
      },
    ]

    setTimeout(() => {
      setTests(mockTests)
      setLeaderboard(mockLeaderboard)
      setLoading(false)
    }, 1000)
  }, [])

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

  const getScoreBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (score >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
    if (score >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
  }

  if (loading) {
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
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Global Leaderboard</h1>
                <p className="text-sm text-muted-foreground">Top performers across all tests</p>
              </div>
            </div>
            <div className="w-48">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Time period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{leaderboard.length}</p>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {Math.round(leaderboard.reduce((sum, entry) => sum + entry.averageScore, 0) / leaderboard.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Platform Average</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{tests.length}</p>
                  <p className="text-sm text-muted-foreground">Active Tests</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {tests.reduce((sum, test) => sum + test.participantCount, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Attempts</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Performers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {leaderboard.slice(0, 3).map((entry) => (
            <Card key={entry.studentId} className="text-center">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">{getRankIcon(entry.rank)}</div>
                <Avatar className="h-20 w-20 mx-auto mb-4">
                  <AvatarFallback>
                    <AvatarInitials name={entry.studentName} />
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-xl mb-2">{entry.studentName}</h3>
                <p className="text-sm text-muted-foreground mb-3">{entry.studentEmail}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-primary">{entry.averageScore}%</span>
                    {getScoreBadge(entry.averageScore)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {entry.totalTests} tests • {entry.totalPoints} total points
                  </p>
                  <p className="text-xs text-muted-foreground">Last active: {entry.lastActive.toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Complete Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Rankings</CardTitle>
            <CardDescription>All students ranked by overall performance</CardDescription>
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
                        {entry.totalTests} tests completed • Last active: {entry.lastActive.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold">{entry.averageScore}%</span>
                      {getScoreBadge(entry.averageScore)}
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.totalPoints} total points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Test Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test Performance Summary</CardTitle>
            <CardDescription>Overview of all available tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.map((test) => (
                <div key={test.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{test.title}</h3>
                    <Button variant="outline" size="sm" onClick={() => router.push(`/leaderboard/${test.id}`)}>
                      View Rankings
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Participants:</span>
                      <span className="ml-2 font-medium">{test.participantCount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Average:</span>
                      <span className="ml-2 font-medium">{test.averageScore}%</span>
                    </div>
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
