"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { ArrowLeft, Edit, Play, Pause, Users, Clock, CheckCircle, Trophy } from "lucide-react"

interface TestDetailsViewProps {
  testId: string
}

interface TestDetails {
  id: string
  title: string
  description: string
  status: "draft" | "active" | "completed" | "archived"
  totalQuestions: number
  totalSections: number
  duration: number
  studentsEnrolled: number
  completedAttempts: number
  averageScore: number
  createdAt: Date
  scheduledAt?: Date
  publishedResults: boolean
  sections: {
    id: string
    title: string
    questionCount: number
    timeLimit?: number
  }[]
  recentAttempts: {
    id: string
    studentName: string
    studentEmail: string
    score: number
    completedAt: Date
    duration: number
  }[]
  topPerformers: {
    studentName: string
    studentEmail: string
    score: number
    rank: number
  }[]
}

export function TestDetailsView({ testId }: TestDetailsViewProps) {
  const router = useRouter()
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL query
  useEffect(() => {
    const mockTestDetails: TestDetails = {
      id: testId,
      title: "Mathematics Final Exam",
      description: "Comprehensive test covering algebra, geometry, and calculus",
      status: "active",
      totalQuestions: 50,
      totalSections: 3,
      duration: 120,
      studentsEnrolled: 45,
      completedAttempts: 32,
      averageScore: 78,
      createdAt: new Date("2024-01-01"),
      scheduledAt: new Date("2024-01-15T10:00:00"),
      publishedResults: false,
      sections: [
        { id: "1", title: "Algebra", questionCount: 20, timeLimit: 45 },
        { id: "2", title: "Geometry", questionCount: 20, timeLimit: 45 },
        { id: "3", title: "Calculus", questionCount: 10, timeLimit: 30 },
      ],
      recentAttempts: [
        {
          id: "1",
          studentName: "Alice Johnson",
          studentEmail: "alice@example.com",
          score: 95,
          completedAt: new Date("2024-01-10T14:30:00"),
          duration: 110,
        },
        {
          id: "2",
          studentName: "Bob Smith",
          studentEmail: "bob@example.com",
          score: 82,
          completedAt: new Date("2024-01-10T15:15:00"),
          duration: 118,
        },
        {
          id: "3",
          studentName: "Carol Davis",
          studentEmail: "carol@example.com",
          score: 76,
          completedAt: new Date("2024-01-10T16:00:00"),
          duration: 120,
        },
      ],
      topPerformers: [
        { studentName: "Alice Johnson", studentEmail: "alice@example.com", score: 95, rank: 1 },
        { studentName: "David Wilson", studentEmail: "david@example.com", score: 88, rank: 2 },
        { studentName: "Eva Brown", studentEmail: "eva@example.com", score: 85, rank: 3 },
      ],
    }

    setTimeout(() => {
      setTestDetails(mockTestDetails)
      setLoading(false)
    }, 1000)
  }, [testId])

  const getStatusBadge = (status: TestDetails["status"]) => {
    switch (status) {
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>
      case "archived":
        return <Badge variant="outline">Archived</Badge>
      default:
        return null
    }
  }

  const handleToggleStatus = () => {
    if (!testDetails) return
    const newStatus = testDetails.status === "active" ? "draft" : "active"
    // TODO: Implement status toggle
    console.log("Toggling status to:", newStatus)
  }

  const handlePublishResults = () => {
    if (!testDetails) return
    // TODO: Implement publish results
    console.log("Publishing results for test:", testId)
    setTestDetails((prev) => (prev ? { ...prev, publishedResults: true } : null))
  }

  if (loading || !testDetails) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 bg-muted rounded"></div>
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
              <Button variant="ghost" size="sm" onClick={() => router.push("/admin/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-foreground">{testDetails.title}</h1>
                  {getStatusBadge(testDetails.status)}
                </div>
                <p className="text-sm text-muted-foreground">{testDetails.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => router.push(`/admin/test/${testId}/edit`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Test
              </Button>
              <Button variant="outline" onClick={handleToggleStatus}>
                {testDetails.status === "active" ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Activate
                  </>
                )}
              </Button>
              {testDetails.status === "completed" && !testDetails.publishedResults && (
                <Button onClick={handlePublishResults}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Publish Results
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{testDetails.studentsEnrolled}</p>
                  <p className="text-sm text-muted-foreground">Students Enrolled</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{testDetails.completedAttempts}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{testDetails.averageScore}%</p>
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
                  <p className="text-2xl font-bold text-foreground">{testDetails.duration}</p>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="attempts">Recent Attempts</TabsTrigger>
            <TabsTrigger value="leaderboard">Top Performers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Test Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Questions</span>
                    <span className="font-medium">{testDetails.totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Sections</span>
                    <span className="font-medium">{testDetails.totalSections}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="font-medium">{testDetails.duration} minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Created</span>
                    <span className="font-medium">{testDetails.createdAt.toLocaleDateString()}</span>
                  </div>
                  {testDetails.scheduledAt && (
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Scheduled</span>
                      <span className="font-medium">{testDetails.scheduledAt.toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Results</span>
                    <Badge variant={testDetails.publishedResults ? "default" : "secondary"}>
                      {testDetails.publishedResults ? "Published" : "Not Published"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Completion Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completion Rate</span>
                      <span className="font-medium">
                        {Math.round((testDetails.completedAttempts / testDetails.studentsEnrolled) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(testDetails.completedAttempts / testDetails.studentsEnrolled) * 100}
                      className="h-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{testDetails.completedAttempts}</p>
                      <p className="text-sm text-muted-foreground">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">
                        {testDetails.studentsEnrolled - testDetails.completedAttempts}
                      </p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {testDetails.sections.map((section, index) => (
                <Card key={section.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">
                          Section {index + 1}: {section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {section.questionCount} questions
                          {section.timeLimit && ` • ${section.timeLimit} minutes`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{section.questionCount} questions</Badge>
                        {section.timeLimit && <Badge variant="outline">{section.timeLimit} min</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attempts" className="space-y-4">
            <div className="space-y-4">
              {testDetails.recentAttempts.map((attempt) => (
                <Card key={attempt.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            <AvatarInitials name={attempt.studentName} />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{attempt.studentName}</p>
                          <p className="text-sm text-muted-foreground">{attempt.studentEmail}</p>
                          <p className="text-xs text-muted-foreground">
                            Completed: {attempt.completedAt.toLocaleDateString()} • Duration: {attempt.duration} minutes
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{attempt.score}%</p>
                        <Badge
                          variant={attempt.score >= 80 ? "default" : "secondary"}
                          className={attempt.score >= 80 ? "bg-green-100 text-green-800" : ""}
                        >
                          {attempt.score >= 80 ? "Pass" : "Fail"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <div className="space-y-4">
              {testDetails.topPerformers.map((performer) => (
                <Card key={`${performer.rank}-${performer.studentEmail}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                          {performer.rank}
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            <AvatarInitials name={performer.studentName} />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{performer.studentName}</p>
                          <p className="text-sm text-muted-foreground">{performer.studentEmail}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{performer.score}%</p>
                        <Badge className="bg-green-100 text-green-800">Rank #{performer.rank}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
