"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  studentId: string
  studentName: string
  studentEmail: string
  score: number
  completedAt: Date
  testId: string
  testTitle: string
}

interface Test {
  id: string
  title: string
}

export function AdminLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [tests, setTests] = useState<Test[]>([])
  const [selectedTest, setSelectedTest] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL queries
  useEffect(() => {
    const mockTests: Test[] = [
      { id: "1", title: "Mathematics Final Exam" },
      { id: "2", title: "Physics Midterm" },
      { id: "3", title: "Chemistry Quiz" },
      { id: "4", title: "Biology Assessment" },
    ]

    const mockLeaderboard: LeaderboardEntry[] = [
      {
        rank: 1,
        studentId: "s1",
        studentName: "Alice Johnson",
        studentEmail: "alice@example.com",
        score: 95,
        completedAt: new Date("2024-01-10T14:30:00"),
        testId: "1",
        testTitle: "Mathematics Final Exam",
      },
      {
        rank: 2,
        studentId: "s2",
        studentName: "Bob Smith",
        studentEmail: "bob@example.com",
        score: 92,
        completedAt: new Date("2024-01-10T15:15:00"),
        testId: "1",
        testTitle: "Mathematics Final Exam",
      },
      {
        rank: 3,
        studentId: "s3",
        studentName: "Carol Davis",
        studentEmail: "carol@example.com",
        score: 90,
        completedAt: new Date("2024-01-10T16:00:00"),
        testId: "1",
        testTitle: "Mathematics Final Exam",
      },
      {
        rank: 4,
        studentId: "s4",
        studentName: "David Wilson",
        studentEmail: "david@example.com",
        score: 88,
        completedAt: new Date("2024-01-10T14:45:00"),
        testId: "1",
        testTitle: "Mathematics Final Exam",
      },
      {
        rank: 5,
        studentId: "s5",
        studentName: "Eva Brown",
        studentEmail: "eva@example.com",
        score: 85,
        completedAt: new Date("2024-01-10T15:30:00"),
        testId: "1",
        testTitle: "Mathematics Final Exam",
      },
      {
        rank: 1,
        studentId: "s2",
        studentName: "Bob Smith",
        studentEmail: "bob@example.com",
        score: 94,
        completedAt: new Date("2024-01-08T11:30:00"),
        testId: "2",
        testTitle: "Physics Midterm",
      },
      {
        rank: 2,
        studentId: "s1",
        studentName: "Alice Johnson",
        studentEmail: "alice@example.com",
        score: 91,
        completedAt: new Date("2024-01-08T12:15:00"),
        testId: "2",
        testTitle: "Physics Midterm",
      },
    ]

    setTimeout(() => {
      setTests(mockTests)
      setLeaderboard(mockLeaderboard)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredLeaderboard =
    selectedTest === "all" ? leaderboard : leaderboard.filter((entry) => entry.testId === selectedTest)

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-medium">
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
      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-muted rounded w-1/3"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold glass-text">Leaderboard</h2>
          <p className="glass-text-muted">View top performers across all tests</p>
        </div>
        <div className="w-64">
          <Select value={selectedTest} onValueChange={setSelectedTest}>
            <SelectTrigger className="enhanced-card border-slate-600/50">
              <SelectValue placeholder="Select test" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tests</SelectItem>
              {tests.map((test) => (
                <SelectItem key={test.id} value={test.id}>
                  {test.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Top 3 Performers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredLeaderboard.slice(0, 3).map((entry) => (
          <Card key={`${entry.testId}-${entry.studentId}`} className="enhanced-card hover-lift text-center">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">{getRankIcon(entry.rank)}</div>
              <Avatar className="h-16 w-16 mx-auto mb-4">
                <AvatarFallback>
                  <AvatarInitials name={entry.studentName} />
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold text-lg mb-1 analytics-text-primary">{entry.studentName}</h3>
              <p className="text-sm analytics-text-muted mb-2">{entry.studentEmail}</p>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-2xl font-bold text-emerald-400 drop-shadow-lg">{entry.score}%</span>
                {getScoreBadge(entry.score)}
              </div>
              {selectedTest !== "all" && (
                <p className="text-xs analytics-text-muted">Completed: {entry.completedAt.toLocaleDateString()}</p>
              )}
              {selectedTest === "all" && <p className="text-xs analytics-text-muted">{entry.testTitle}</p>}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Leaderboard */}
      <Card className="enhanced-card">
        <CardHeader>
          <CardTitle className="glass-text">Complete Rankings</CardTitle>
          <CardDescription className="glass-text-muted">
            {selectedTest === "all"
              ? "All test results across the platform"
              : `Results for ${tests.find((t) => t.id === selectedTest)?.title}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLeaderboard.map((entry, index) => (
              <div
                key={`${entry.testId}-${entry.studentId}-${index}`}
                className="flex items-center justify-between p-4 rounded-lg border border-slate-600/50 hover:bg-slate-700/30 hover:border-slate-500/70 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  {getRankIcon(entry.rank)}
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      <AvatarInitials name={entry.studentName} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium analytics-text-primary">{entry.studentName}</p>
                    <p className="text-sm analytics-text-muted">{entry.studentEmail}</p>
                    {selectedTest === "all" && <p className="text-xs analytics-text-muted">{entry.testTitle}</p>}
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-emerald-400 drop-shadow-lg">{entry.score}%</span>
                    {getScoreBadge(entry.score)}
                  </div>
                  <p className="text-xs analytics-text-muted">{entry.completedAt.toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredLeaderboard.length === 0 && (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium glass-text mb-2">No Results Yet</h3>
              <p className="glass-text-muted">
                {selectedTest === "all" ? "No test results available yet." : "No results for this test yet."}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
