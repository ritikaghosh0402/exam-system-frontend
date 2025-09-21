"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Clock,
  Users,
  FileText,
  Play,
  Pause,
  CheckCircle,
} from "lucide-react"

interface Test {
  id: string
  title: string
  description: string
  status: "draft" | "active" | "completed" | "archived"
  totalQuestions: number
  duration: number
  studentsEnrolled: number
  completedAttempts: number
  createdAt: Date
  scheduledAt?: Date
  publishedResults: boolean
}

export function AdminTestList() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL queries
  useEffect(() => {
    const mockTests: Test[] = [
      {
        id: "1",
        title: "Mathematics Final Exam",
        description: "Comprehensive test covering algebra, geometry, and calculus",
        status: "active",
        totalQuestions: 50,
        duration: 120,
        studentsEnrolled: 45,
        completedAttempts: 32,
        createdAt: new Date("2024-01-01"),
        scheduledAt: new Date("2024-01-15T10:00:00"),
        publishedResults: false,
      },
      {
        id: "2",
        title: "Physics Midterm",
        description: "Mechanics, thermodynamics, and electromagnetism",
        status: "completed",
        totalQuestions: 40,
        duration: 90,
        studentsEnrolled: 38,
        completedAttempts: 38,
        createdAt: new Date("2023-12-15"),
        scheduledAt: new Date("2024-01-10T14:30:00"),
        publishedResults: true,
      },
      {
        id: "3",
        title: "Chemistry Quiz",
        description: "Organic chemistry fundamentals",
        status: "draft",
        totalQuestions: 25,
        duration: 45,
        studentsEnrolled: 0,
        completedAttempts: 0,
        createdAt: new Date("2024-01-05"),
        publishedResults: false,
      },
      {
        id: "4",
        title: "Biology Assessment",
        description: "Cell biology and genetics",
        status: "active",
        totalQuestions: 30,
        duration: 60,
        studentsEnrolled: 52,
        completedAttempts: 28,
        createdAt: new Date("2023-12-20"),
        scheduledAt: new Date("2024-01-08T11:00:00"),
        publishedResults: false,
      },
    ]

    setTimeout(() => {
      setTests(mockTests)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: Test["status"]) => {
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

  const handleViewTest = (testId: string) => {
    window.location.href = `/admin/test/${testId}`
  }

  const handleEditTest = (testId: string) => {
    window.location.href = `/admin/test/${testId}/edit`
  }

  const handleDeleteTest = (testId: string) => {
    if (confirm("Are you sure you want to delete this test? This action cannot be undone.")) {
      // TODO: Implement delete functionality
      console.log("Deleting test:", testId)
    }
  }

  const handlePublishResults = (testId: string) => {
    if (confirm("Are you sure you want to publish the results for this test?")) {
      // TODO: Implement publish results functionality
      console.log("Publishing results for test:", testId)
      setTests((prev) => prev.map((test) => (test.id === testId ? { ...test, publishedResults: true } : test)))
    }
  }

  const handleToggleTestStatus = (testId: string, currentStatus: Test["status"]) => {
    const newStatus = currentStatus === "active" ? "draft" : "active"
    // TODO: Implement status toggle functionality
    console.log("Toggling test status:", testId, newStatus)
    setTests((prev) => prev.map((test) => (test.id === testId ? { ...test, status: newStatus } : test)))
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-muted rounded w-1/3"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold glass-text">Test Management</h2>
          <p className="glass-text-muted">Create, manage, and monitor your tests</p>
        </div>
        <Button onClick={() => (window.location.href = "/admin/create-test")} className="button-glow">
          <FileText className="h-4 w-4 mr-2" />
          Create New Test
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="enhanced-card hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg glass-text">{test.title}</CardTitle>
                  <CardDescription className="glass-text-muted">{test.description}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(test.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewTest(test.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditTest(test.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Test
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleToggleTestStatus(test.id, test.status)}>
                        {test.status === "active" ? (
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
                      </DropdownMenuItem>
                      {test.status === "completed" && !test.publishedResults && (
                        <DropdownMenuItem onClick={() => handlePublishResults(test.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Publish Results
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem onClick={() => handleDeleteTest(test.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-slate-400" />
                  <span className="analytics-text-secondary">{test.totalQuestions} questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <span className="analytics-text-secondary">{test.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-slate-400" />
                  <span className="analytics-text-secondary">{test.studentsEnrolled} enrolled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-slate-400" />
                  <span className="analytics-text-secondary">{test.completedAttempts} completed</span>
                </div>
                {test.scheduledAt && (
                  <div className="flex items-center space-x-2 col-span-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="analytics-text-secondary">Scheduled: {test.scheduledAt.toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 col-span-2">
                  <span className="analytics-text-muted">Results:</span>
                  <Badge variant={test.publishedResults ? "default" : "secondary"}>
                    {test.publishedResults ? "Published" : "Not Published"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tests.length === 0 && (
        <Card className="enhanced-card">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium glass-text mb-2">No Tests Created</h3>
            <p className="glass-text-muted mb-4">Get started by creating your first test.</p>
            <Button onClick={() => (window.location.href = "/admin/create-test")} className="button-glow">
              Create Test
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
