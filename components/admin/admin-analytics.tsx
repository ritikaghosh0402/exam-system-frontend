"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Clock, Target, AlertTriangle } from "lucide-react"

interface AnalyticsData {
  testPerformance: {
    testId: string
    testTitle: string
    averageScore: number
    completionRate: number
    totalAttempts: number
    passRate: number
  }[]
  studentEngagement: {
    totalActiveStudents: number
    averageTestsPerStudent: number
    completionTrend: number
  }
  systemMetrics: {
    totalTestTime: number
    averageTestDuration: number
    flaggedAttempts: number
    technicalIssues: number
  }
}

export function AdminAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data - replace with actual GraphQL queries
  useEffect(() => {
    const mockAnalytics: AnalyticsData = {
      testPerformance: [
        {
          testId: "1",
          testTitle: "Mathematics Final Exam",
          averageScore: 78,
          completionRate: 89,
          totalAttempts: 45,
          passRate: 82,
        },
        {
          testId: "2",
          testTitle: "Physics Midterm",
          averageScore: 85,
          completionRate: 95,
          totalAttempts: 38,
          passRate: 92,
        },
        {
          testId: "3",
          testTitle: "Chemistry Quiz",
          averageScore: 72,
          completionRate: 78,
          totalAttempts: 32,
          passRate: 75,
        },
        {
          testId: "4",
          testTitle: "Biology Assessment",
          averageScore: 88,
          completionRate: 92,
          totalAttempts: 52,
          passRate: 94,
        },
      ],
      studentEngagement: {
        totalActiveStudents: 156,
        averageTestsPerStudent: 2.8,
        completionTrend: 12,
      },
      systemMetrics: {
        totalTestTime: 15420, // in minutes
        averageTestDuration: 85,
        flaggedAttempts: 7,
        technicalIssues: 3,
      },
    }

    setTimeout(() => {
      setAnalytics(mockAnalytics)
      setLoading(false)
    }, 1000)
  }, [])

  const getPerformanceBadge = (score: number) => {
    if (score >= 85) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
    if (score >= 75) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
    if (score >= 65) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>
    return <Badge className="bg-red-100 text-red-800">Needs Attention</Badge>
  }

  if (loading || !analytics) {
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
      <div>
        <h2 className="text-2xl font-bold glass-text">Analytics Dashboard</h2>
        <p className="glass-text-muted">Comprehensive insights into test performance and student engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="analytics-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6 text-emerald-400" />
              <div>
                <p className="text-2xl font-bold analytics-text-primary">
                  {analytics.studentEngagement.totalActiveStudents}
                </p>
                <p className="text-sm analytics-text-secondary">Active Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="analytics-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Target className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-2xl font-bold analytics-text-primary">
                  {Math.round(
                    analytics.testPerformance.reduce((sum, test) => sum + test.averageScore, 0) /
                      analytics.testPerformance.length,
                  )}
                  %
                </p>
                <p className="text-sm analytics-text-secondary">Overall Average</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="analytics-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-6 w-6 text-purple-400" />
              <div>
                <p className="text-2xl font-bold analytics-text-primary">
                  {analytics.systemMetrics.averageTestDuration}m
                </p>
                <p className="text-sm analytics-text-secondary">Avg Duration</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="analytics-card hover-lift">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-pink-400" />
              <div>
                <p className="text-2xl font-bold analytics-text-primary">
                  +{analytics.studentEngagement.completionTrend}%
                </p>
                <p className="text-sm analytics-text-secondary">Completion Trend</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="analytics-card">
        <CardHeader>
          <CardTitle className="analytics-text-primary">Test Performance Analysis</CardTitle>
          <CardDescription className="analytics-text-muted">
            Detailed breakdown of each test's performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analytics.testPerformance.map((test) => (
              <div key={test.testId} className="performance-card hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg analytics-text-primary">{test.testTitle}</h3>
                    <p className="text-sm analytics-text-muted">{test.totalAttempts} total attempts</p>
                  </div>
                  {getPerformanceBadge(test.averageScore)}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="analytics-text-secondary">Average Score</span>
                      <span className="font-medium analytics-text-primary">{test.averageScore}%</span>
                    </div>
                    <Progress value={test.averageScore} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="analytics-text-secondary">Completion Rate</span>
                      <span className="font-medium analytics-text-primary">{test.completionRate}%</span>
                    </div>
                    <Progress value={test.completionRate} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="analytics-text-secondary">Pass Rate</span>
                      <span className="font-medium analytics-text-primary">{test.passRate}%</span>
                    </div>
                    <Progress value={test.passRate} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="analytics-card">
          <CardHeader>
            <CardTitle className="analytics-text-primary">Student Engagement</CardTitle>
            <CardDescription className="analytics-text-muted">
              Overview of student participation and activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm analytics-text-secondary">Average Tests per Student</span>
              <span className="font-medium analytics-text-primary">
                {analytics.studentEngagement.averageTestsPerStudent}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm analytics-text-secondary">Completion Trend</span>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
                <span className="font-medium text-emerald-400">+{analytics.studentEngagement.completionTrend}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm analytics-text-secondary">Active Students</span>
              <span className="font-medium analytics-text-primary">
                {analytics.studentEngagement.totalActiveStudents}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="analytics-card">
          <CardHeader>
            <CardTitle className="analytics-text-primary">System Health</CardTitle>
            <CardDescription className="analytics-text-muted">Technical metrics and security alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm analytics-text-secondary">Total Test Time</span>
              <span className="font-medium analytics-text-primary">
                {Math.round(analytics.systemMetrics.totalTestTime / 60)} hours
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm analytics-text-secondary">Flagged Attempts</span>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                <span className="font-medium text-yellow-400">{analytics.systemMetrics.flaggedAttempts}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm analytics-text-secondary">Technical Issues</span>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="font-medium text-red-400">{analytics.systemMetrics.technicalIssues}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
