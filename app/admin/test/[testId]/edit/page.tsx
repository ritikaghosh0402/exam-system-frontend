"use client"

import { useParams } from "next/navigation"
import { TestEditForm } from "@/components/admin/test-edit-form"

export default function EditTestPage() {
  const params = useParams()
  const testId = params.testId as string

  return <TestEditForm testId={testId} />
}
