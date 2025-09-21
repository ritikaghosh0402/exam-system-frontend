"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { ArrowLeft, Trophy, Clock, Target, CheckCircle, XCircle, Award, Share2, Download } from "lucide-react"

interface TestResultsViewProps {
  testId: string
}

interface QuestionResult {
  questionId: string
  questionText: string
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
  points: number
  maxPoints: number
  timeTaken: number
}

interface SectionResult {
  sectionId: string
  sectionTitle: string
  score: number
  maxScore: number
  timeTaken: number
  timeLimit?: number
  questions: QuestionResult[]
}

interface TestResult {
  id: string
  testId: string
  testTitle: string
  studentId: string
  studentName: string
  totalScore: number
  maxScore: number
  percentage: number
  rank: number
  totalParticipants: number
  timeTaken: number
  timeLimit: number
  completedAt: Date
  sections: SectionResult[]
  flaggedQuestions: string[]
  tabSwitchCount: number
}

interface TopPerformer {
  rank: number
  studentName: string
  score: number
  percentage: number
}

export function TestResultsView({ testId }: TestResultsViewProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [result, setResult] = useState<TestResult | null>(null)
  const [topPerformers, setTopPerformers] = useState<TopPerformer[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL query
  useEffect(() => {
    const mockResult: TestResult = {
      id: "result-1",
      testId: testId,
      testTitle: "Mathematics Final Exam",
      studentId: user?.id || "student-1",
      studentName: user?.name || "John Doe",
      totalScore: 42,
      maxScore: 50,
      percentage: 84,
      rank: 3,
      totalParticipants: 45,
      timeTaken: 105, // minutes
      timeLimit: 120,
      completedAt: new Date("2024-01-15T12:30:00"),
      flaggedQuestions: ["q1", "q5"],
      tabSwitchCount: 2,
      sections: [
        {
          sectionId: "algebra",
          sectionTitle: "Algebra",
          score: 18,
          maxScore: 20,
          timeTaken: 40,
          timeLimit: 45,
          questions: [
            {
              questionId: "q1",
              questionText: "What is the value of x in the equation 2x + 5 = 15?",
              selectedAnswer: "x = 5",
              correctAnswer: "x = 5",
              isCorrect: true,
              points: 1,
              maxPoints: 1,
              timeTaken: 2,
            },
            {
              questionId: "q2",
              questionText: "Simplify: (x + 3)(x - 2)",
              selectedAnswer: "x² - x + 6",
              correctAnswer: "x² + x - 6",
              isCorrect: false,
              points: 0,
              maxPoints: 1,
              timeTaken: 3,
            },
          ],
        },
        {
          sectionId: "geometry",
          sectionTitle: "Geometry",
          score: 16,
          maxScore: 20,
          timeTaken: 42,
          timeLimit: 45,
          questions: [
            {
              questionId: "q3",
              questionText: "What is the area of a circle with radius 5 units?",
              selectedAnswer: "25π",
              correctAnswer: "25π",
              isCorrect: true,
              points: 1,
              maxPoints: 1,
              timeTaken: 2,
            },
          ],
        },
        {
          sectionId: "calculus",
          sectionTitle: "Calculus",
          score: 8,
          maxScore: 10,
          timeTaken: 23,
          timeLimit: 30,
          questions: [
            {
              questionId: "q4",
              questionText: "What is the derivative of x²?",
              selectedAnswer: "2x",
              correctAnswer: "2x",
              isCorrect: true,
              points: 1,
              maxPoints: 1,
              timeTaken: 1,
            },
          ],
        },
      ],
    }

    const mockTopPerformers: TopPerformer[] = [
      { rank: 1, studentName: "Alice Johnson", score: 48, percentage: 96 },
      { rank: 2, studentName: "Bob Smith", score: 46, percentage: 92 },
      { rank: 3, studentName: user?.name || "John Doe", score: 42, percentage: 84 },
      { rank: 4, studentName: "Carol Davis", score: 40, percentage: 80 },
      { rank: 5, studentName: "David Wilson", score: 38, percentage: 76 },
    ]

    setTimeout(() => {
      setResult(mockResult)
      setTopPerformers(mockTopPerformers)
      setLoading(false)
    }, 1000)
  }, [testId, user])

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 80) return "text-blue-600"
    if (percentage >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getGradeBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (percentage >= 80) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
    if (percentage >= 70) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>
  }

  const handleShareResults = () => {
    // TODO: Implement share functionality
    console.log("Sharing results")
  }

  const handleDownloadCertificate = () => {
    // TODO: Implement certificate download
    console.log("Downloading certificate")
  }

  const handleViewLeaderboard = () => {
    router.push(`/leaderboard/${testId}`)
  }

  if (loading || !result) {
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
              <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Test Results</h1>
                <p className="text-sm text-muted-foreground">{result.testTitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleShareResults}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              {result.percentage >= 70 && (
                <Button variant="outline" size="sm" onClick={handleDownloadCertificate}>
                  <Download className="h-4 w-4 mr-2" />
                  Certificate
                </Button>
              )}
              <Button size="sm" onClick={handleViewLeaderboard}>
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Result Summary */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Trophy className={`h-12 w-12 ${getGradeColor(result.percentage)}`} />
                <div>
                  <h2 className="text-4xl font-bold text-foreground">
                    {result.totalScore}/{result.maxScore}
                  </h2>
                  <p className={`text-2xl font-semibold ${getGradeColor(result.percentage)}`}>{result.percentage}%</p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4">
                {getGradeBadge(result.percentage)}
                <Badge variant="outline">
                  Rank #{result.rank} of {result.totalParticipants}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Completed on {result.completedAt.toLocaleDateString()} at {result.completedAt.toLocaleTimeString()}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.percentage}%</p>
                  <p className="text-sm text-muted-foreground">Score</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">#{result.rank}</p>
                  <p className="text-sm text-muted-foreground">Rank</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.timeTaken}m</p>
                  <p className="text-sm text-muted-foreground">Time Taken</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-foreground">{result.totalScore}</p>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sections">Section Analysis</TabsTrigger>
            <TabsTrigger value="questions">Question Review</TabsTrigger>
            <TabsTrigger value="ranking">Top Performers</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>Your performance across different sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.sections.map((section) => (
                    <div key={section.sectionId}>
                      <div className="flex justify-between text-sm mb-2">
                        <span>{section.sectionTitle}</span>
                        <span className="font-medium">
                          {section.score}/{section.maxScore} ({Math.round((section.score / section.maxScore) * 100)}%)
                        </span>
                      </div>
                      <Progress value={(section.score / section.maxScore) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Test Statistics</CardTitle>
                  <CardDescription>Additional information about your attempt</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Time Efficiency</span>
                    <span className="font-medium">
                      {Math.round((result.timeTaken / result.timeLimit) * 100)}% of time used
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Questions Flagged</span>
                    <span className="font-medium">{result.flaggedQuestions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Tab Switches</span>
                    <span className="font-medium">{result.tabSwitchCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                    <span className="font-medium">{result.percentage}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sections" className="space-y-4">
            {result.sections.map((section) => (
              <Card key={section.sectionId}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{section.sectionTitle}</CardTitle>
                      <CardDescription>
                        {section.score}/{section.maxScore} points • {section.timeTaken} minutes
                      </CardDescription>
                    </div>
                    <Badge
                      variant={section.score / section.maxScore >= 0.8 ? "default" : "secondary"}
                      className={section.score / section.maxScore >= 0.8 ? "bg-green-100 text-green-800" : ""}
                    >
                      {Math.round((section.score / section.maxScore) * 100)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={(section.score / section.maxScore) * 100} className="h-3" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Questions:</span>
                        <span className="ml-2 font-medium">{section.questions.length}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Correct:</span>
                        <span className="ml-2 font-medium">{section.questions.filter((q) => q.isCorrect).length}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Time Used:</span>
                        <span className="ml-2 font-medium">{section.timeTaken}m</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Avg Time/Q:</span>
                        <span className="ml-2 font-medium">
                          {Math.round(section.timeTaken / section.questions.length)}m
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            {result.sections.map((section) => (
              <div key={section.sectionId} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.sectionTitle}</h3>
                {section.questions.map((question, index) => (
                  <Card key={question.questionId}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-medium">Question {index + 1}</span>
                              {result.flaggedQuestions.includes(question.questionId) && (
                                <Badge variant="outline" className="text-xs">
                                  Flagged
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {question.timeTaken}m
                              </Badge>
                            </div>
                            <p className="text-sm mb-3">{question.questionText}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {question.isCorrect ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                            <span className="text-sm font-medium">
                              {question.points}/{question.maxPoints}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Your Answer:</span>
                            <p
                              className={`mt-1 p-2 rounded ${
                                question.isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                              }`}
                            >
                              {question.selectedAnswer}
                            </p>
                          </div>
                          {!question.isCorrect && (
                            <div>
                              <span className="text-muted-foreground">Correct Answer:</span>
                              <p className="mt-1 p-2 rounded bg-green-50 text-green-800">{question.correctAnswer}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="ranking" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>See how you rank among all participants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topPerformers.map((performer) => (
                    <div
                      key={performer.rank}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        performer.studentName === result.studentName ? "bg-primary/10 border border-primary/20" : ""
                      }`}
                    >
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
                          <p
                            className={`font-medium ${performer.studentName === result.studentName ? "text-primary" : ""}`}
                          >
                            {performer.studentName}
                            {performer.studentName === result.studentName && " (You)"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {performer.score}/{result.maxScore} points
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">{performer.percentage}%</p>
                        {performer.rank <= 3 && (
                          <div className="flex justify-end">
                            {performer.rank === 1 && <Trophy className="h-4 w-4 text-yellow-500" />}
                            {performer.rank === 2 && <Award className="h-4 w-4 text-gray-400" />}
                            {performer.rank === 3 && <Award className="h-4 w-4 text-amber-600" />}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
