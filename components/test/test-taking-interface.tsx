"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Clock, AlertTriangle, ChevronLeft, ChevronRight, Flag, X } from "lucide-react"

interface Question {
  id: string
  text: string
  options: string[]
  sectionId: string
}

interface Section {
  id: string
  title: string
  timeLimit?: number // in minutes
  questions: Question[]
}

interface TestData {
  id: string
  title: string
  description: string
  sections: Section[]
  globalTimeLimit?: number // in minutes
  instructions: string[]
}

interface TestTakingInterfaceProps {
  testId: string
}

export function TestTakingInterface({ testId }: TestTakingInterfaceProps) {
  const router = useRouter()
  const [testData, setTestData] = useState<TestData | null>(null)
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set())
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [sectionTimeRemaining, setSectionTimeRemaining] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [testStarted, setTestStarted] = useState(false)
  const [tabSwitchWarnings, setTabSwitchWarnings] = useState(0)
  const [showWarning, setShowWarning] = useState(false)

  // Mock test data - replace with actual GraphQL query
  useEffect(() => {
    const mockTestData: TestData = {
      id: testId,
      title: "Mathematics Final Exam",
      description: "Comprehensive test covering algebra, geometry, and calculus",
      globalTimeLimit: 120,
      instructions: [
        "Read each question carefully before selecting your answer",
        "You can navigate between questions using the navigation buttons",
        "Flag questions you want to review later",
        "The test must be completed in fullscreen mode",
        "Tab switching is prohibited and will result in warnings",
        "Submit your test before time runs out",
      ],
      sections: [
        {
          id: "algebra",
          title: "Algebra",
          timeLimit: 45,
          questions: [
            {
              id: "q1",
              text: "What is the value of x in the equation 2x + 5 = 15?",
              options: ["x = 5", "x = 10", "x = 7.5", "x = 2.5"],
              sectionId: "algebra",
            },
            {
              id: "q2",
              text: "Simplify: (x + 3)(x - 2)",
              options: ["x² + x - 6", "x² - x + 6", "x² + 5x - 6", "x² - 5x + 6"],
              sectionId: "algebra",
            },
          ],
        },
        {
          id: "geometry",
          title: "Geometry",
          timeLimit: 45,
          questions: [
            {
              id: "q3",
              text: "What is the area of a circle with radius 5 units?",
              options: ["25π", "10π", "5π", "50π"],
              sectionId: "geometry",
            },
            {
              id: "q4",
              text: "In a right triangle, if one angle is 30°, what is the other acute angle?",
              options: ["60°", "45°", "90°", "120°"],
              sectionId: "geometry",
            },
          ],
        },
        {
          id: "calculus",
          title: "Calculus",
          timeLimit: 30,
          questions: [
            {
              id: "q5",
              text: "What is the derivative of x²?",
              options: ["2x", "x", "2", "x²"],
              sectionId: "calculus",
            },
          ],
        },
      ],
    }

    setTestData(mockTestData)
    if (mockTestData.globalTimeLimit) {
      setTimeRemaining(mockTestData.globalTimeLimit * 60) // Convert to seconds
    }
    if (mockTestData.sections[0].timeLimit) {
      setSectionTimeRemaining(mockTestData.sections[0].timeLimit * 60)
    }
  }, [testId])

  // Fullscreen management
  const enterFullscreen = useCallback(() => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    }
  }, [])

  const exitFullscreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Tab switching detection
  useEffect(() => {
    if (!testStarted) return

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchWarnings((prev) => prev + 1)
        setShowWarning(true)
        setTimeout(() => setShowWarning(false), 5000)
      }
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ""
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [testStarted])

  // Timer management
  useEffect(() => {
    if (!testStarted || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStarted, timeRemaining])

  // Section timer management
  useEffect(() => {
    if (!testStarted || !testData?.sections[currentSectionIndex]?.timeLimit) return

    const timer = setInterval(() => {
      setSectionTimeRemaining((prev) => {
        if (prev <= 1) {
          handleNextSection()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStarted, currentSectionIndex])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  const handleStartTest = () => {
    enterFullscreen()
    setShowInstructions(false)
    setTestStarted(true)
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleFlagQuestion = (questionId: string) => {
    setFlaggedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleNextQuestion = () => {
    const currentSection = testData?.sections[currentSectionIndex]
    if (!currentSection) return

    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else {
      handleNextSection()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    } else if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1)
      const prevSection = testData?.sections[currentSectionIndex - 1]
      if (prevSection) {
        setCurrentQuestionIndex(prevSection.questions.length - 1)
        if (prevSection.timeLimit) {
          setSectionTimeRemaining(prevSection.timeLimit * 60)
        }
      }
    }
  }

  const handleNextSection = () => {
    if (!testData) return

    if (currentSectionIndex < testData.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1)
      setCurrentQuestionIndex(0)
      const nextSection = testData.sections[currentSectionIndex + 1]
      if (nextSection?.timeLimit) {
        setSectionTimeRemaining(nextSection.timeLimit * 60)
      }
    } else {
      handleSubmitTest()
    }
  }

  const handleSubmitTest = () => {
    // TODO: Submit answers to GraphQL API
    console.log("Submitting test with answers:", answers)
    exitFullscreen()
    router.push("/dashboard")
  }

  const handleExitTest = () => {
    if (confirm("Are you sure you want to exit the test? Your progress will be lost.")) {
      exitFullscreen()
      router.push("/dashboard")
    }
  }

  if (!testData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading test...</p>
        </div>
      </div>
    )
  }

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">{testData.title}</CardTitle>
              <p className="text-center text-muted-foreground">{testData.description}</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Test Instructions</h3>
                <ul className="space-y-2">
                  {testData.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {testData.sections.reduce((sum, section) => sum + section.questions.length, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Questions</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">{testData.sections.length}</p>
                  <p className="text-sm text-muted-foreground">Sections</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold text-primary">
                    {testData.globalTimeLimit ||
                      testData.sections.reduce((sum, section) => sum + (section.timeLimit || 0), 0)}{" "}
                    min
                  </p>
                  <p className="text-sm text-muted-foreground">Time Limit</p>
                </div>
              </div>

              {tabSwitchWarnings > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Warning: You have {tabSwitchWarnings} tab switch warning(s). Multiple violations may result in test
                    termination.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-center space-x-4">
                <Button variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button onClick={handleStartTest} className="px-8">
                  Start Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const currentSection = testData.sections[currentSectionIndex]
  const currentQuestion = currentSection?.questions[currentQuestionIndex]
  const totalQuestions = testData.sections.reduce((sum, section) => sum + section.questions.length, 0)
  const currentQuestionNumber =
    testData.sections.slice(0, currentSectionIndex).reduce((sum, section) => sum + section.questions.length, 0) +
    currentQuestionIndex +
    1

  return (
    <div className="min-h-screen bg-background">
      {/* Warning overlay */}
      {showWarning && (
        <div className="fixed inset-0 bg-red-500/90 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center max-w-md">
            <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-500 mb-2">Warning!</h2>
            <p className="text-gray-700 mb-4">
              Tab switching is prohibited during the test. This is warning #{tabSwitchWarnings}.
            </p>
            <p className="text-sm text-gray-600">Multiple violations may result in test termination.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">{testData.title}</h1>
            <Badge variant="secondary">
              Section {currentSectionIndex + 1}: {currentSection?.title}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            {/* Section Timer */}
            {currentSection?.timeLimit && (
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={sectionTimeRemaining < 300 ? "text-red-500 font-bold" : ""}>
                  Section: {formatTime(sectionTimeRemaining)}
                </span>
              </div>
            )}

            {/* Global Timer */}
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className={timeRemaining < 600 ? "text-red-500 font-bold" : ""}>
                Total: {formatTime(timeRemaining)}
              </span>
            </div>

            <Button variant="outline" size="sm" onClick={handleExitTest}>
              <X className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              Question {currentQuestionNumber} of {totalQuestions}
            </span>
            <span>{Math.round((currentQuestionNumber / totalQuestions) * 100)}% Complete</span>
          </div>
          <Progress value={(currentQuestionNumber / totalQuestions) * 100} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">Question {currentQuestionNumber}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => currentQuestion && handleFlagQuestion(currentQuestion.id)}
                  className={flaggedQuestions.has(currentQuestion?.id || "") ? "bg-yellow-100" : ""}
                >
                  <Flag className="h-4 w-4 mr-2" />
                  {flaggedQuestions.has(currentQuestion?.id || "") ? "Flagged" : "Flag"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg leading-relaxed">{currentQuestion?.text}</p>

              <RadioGroup
                value={answers[currentQuestion?.id || ""] || ""}
                onValueChange={(value) => currentQuestion && handleAnswerChange(currentQuestion.id, value)}
              >
                {currentQuestion?.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted">
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {currentQuestionIndex === currentSection.questions.length - 1 &&
              currentSectionIndex === testData.sections.length - 1 ? (
                <Button onClick={handleSubmitTest} className="bg-green-600 hover:bg-green-700">
                  Submit Test
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
