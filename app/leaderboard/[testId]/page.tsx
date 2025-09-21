"use client"

import { useParams } from "next/navigation"
import { TestLeaderboard } from "@/components/leaderboard/test-leaderboard"

export default function TestLeaderboardPage() {
  const params = useParams()
  const testId = params.testId as string

  return <TestLeaderboard testId={testId} />
}
