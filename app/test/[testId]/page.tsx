"use client"

import { useParams } from "next/navigation"
import { TestTakingInterface } from "@/components/test/test-taking-interface"

export default function TestPage() {
  const params = useParams()
  const testId = params.testId as string

  return <TestTakingInterface testId={testId} />
}
