"use client"

import { useParams } from "next/navigation"
import { TestDetailsView } from "@/components/admin/test-details-view"

export default function TestDetailsPage() {
  const params = useParams()
  const testId = params.testId as string

  return <TestDetailsView testId={testId} />
}
