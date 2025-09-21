"use client"

import { useParams } from "next/navigation"
import { TestResultsView } from "@/components/results/test-results-view"

export default function TestResultsPage() {
  const params = useParams()
  const testId = params.testId as string

  return <TestResultsView testId={testId} />
}
