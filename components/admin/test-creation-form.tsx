"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Trash2, Clock, FileText, Settings, Save, ArrowLeft, AlertCircle, Edit3 } from "lucide-react"

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  points: number
}

interface Section {
  id: string
  title: string
  description: string
  timeLimit?: number
  questions: Question[]
}

interface TestData {
  title: string
  description: string
  instructions: string[]
  globalTimeLimit?: number
  useGlobalTime: boolean
  sections: Section[]
}

export function TestCreationForm() {
  const router = useRouter()
  const [testData, setTestData] = useState<TestData>({
    title: "",
    description: "",
    instructions: ["Read each question carefully before selecting your answer"],
    globalTimeLimit: 60,
    useGlobalTime: true,
    sections: [
      {
        id: "section-1",
        title: "Section 1",
        description: "",
        questions: [],
      },
    ],
  })
  const [activeSection, setActiveSection] = useState(0)
  const [saving, setSaving] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const addSection = () => {
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: `Section ${testData.sections.length + 1}`,
      description: "",
      questions: [],
    }
    setTestData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }))
    setActiveSection(testData.sections.length)
  }

  const removeSection = (sectionIndex: number) => {
    if (testData.sections.length === 1) return

    setTestData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, index) => index !== sectionIndex),
    }))

    if (activeSection >= sectionIndex && activeSection > 0) {
      setActiveSection(activeSection - 1)
    }
  }

  const updateSection = (sectionIndex: number, updates: Partial<Section>) => {
    setTestData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, index) => (index === sectionIndex ? { ...section, ...updates } : section)),
    }))
  }

  const addQuestion = (sectionIndex: number) => {
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      text: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      points: 1,
    }

    updateSection(sectionIndex, {
      questions: [...testData.sections[sectionIndex].questions, newQuestion],
    })
  }

  const updateQuestion = (sectionIndex: number, questionIndex: number, updates: Partial<Question>) => {
    const updatedQuestions = testData.sections[sectionIndex].questions.map((question, index) =>
      index === questionIndex ? { ...question, ...updates } : question,
    )
    updateSection(sectionIndex, { questions: updatedQuestions })
  }

  const removeQuestion = (sectionIndex: number, questionIndex: number) => {
    const updatedQuestions = testData.sections[sectionIndex].questions.filter((_, index) => index !== questionIndex)
    updateSection(sectionIndex, { questions: updatedQuestions })
  }

  const addInstruction = () => {
    setTestData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }))
  }

  const updateInstruction = (index: number, value: string) => {
    setTestData((prev) => ({
      ...prev,
      instructions: prev.instructions.map((instruction, i) => (i === index ? value : instruction)),
    }))
  }

  const removeInstruction = (index: number) => {
    if (testData.instructions.length === 1) return
    setTestData((prev) => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index),
    }))
  }

  const validateTest = (): string[] => {
    const errors: string[] = []

    if (!testData.title.trim()) errors.push("Test title is required")
    if (!testData.description.trim()) errors.push("Test description is required")
    if (testData.sections.length === 0) errors.push("At least one section is required")

    testData.sections.forEach((section, sectionIndex) => {
      if (!section.title.trim()) errors.push(`Section ${sectionIndex + 1} title is required`)
      if (section.questions.length === 0) errors.push(`Section ${sectionIndex + 1} must have at least one question`)

      section.questions.forEach((question, questionIndex) => {
        if (!question.text.trim())
          errors.push(`Question ${questionIndex + 1} in Section ${sectionIndex + 1} text is required`)
        if (question.options.some((option) => !option.trim())) {
          errors.push(`Question ${questionIndex + 1} in Section ${sectionIndex + 1} has empty options`)
        }
      })
    })

    return errors
  }

  const handleSave = async (isDraft = false) => {
    const validationErrors = validateTest()
    if (!isDraft && validationErrors.length > 0) {
      setErrors(validationErrors)
      return
    }

    setSaving(true)
    setErrors([])

    try {
      // TODO: Save to GraphQL API
      console.log("Saving test:", { ...testData, status: isDraft ? "draft" : "active" })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      router.push("/admin/dashboard")
    } catch (error) {
      setErrors(["Failed to save test. Please try again."])
    } finally {
      setSaving(false)
    }
  }

  const totalQuestions = testData.sections.reduce((sum, section) => sum + section.questions.length, 0)
  const totalTime = testData.useGlobalTime
    ? testData.globalTimeLimit
    : testData.sections.reduce((sum, section) => sum + (section.timeLimit || 0), 0)

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
                <h1 className="text-2xl font-bold text-foreground">Create New Test</h1>
                <p className="text-sm text-muted-foreground">Design and configure your test</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => handleSave(true)} disabled={saving}>
                Save as Draft
              </Button>
              <Button onClick={() => handleSave(false)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save & Publish"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Errors */}
        {errors.length > 0 && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <div key={index}>• {error}</div>
                ))}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Test Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{testData.sections.length}</p>
              <p className="text-sm text-muted-foreground">Sections</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Edit3 className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Questions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{totalTime || 0}</p>
              <p className="text-sm text-muted-foreground">Minutes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Settings className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{testData.useGlobalTime ? "Global" : "Section"}</p>
              <p className="text-sm text-muted-foreground">Timing</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="sections">Sections</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Information</CardTitle>
                <CardDescription>Basic details about your test</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Test Title</Label>
                  <Input
                    id="title"
                    value={testData.title}
                    onChange={(e) => setTestData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter test title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={testData.description}
                    onChange={(e) => setTestData((prev) => ({ ...prev, description: e.target.value }))}
                    placeholder="Enter test description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Instructions</Label>
                  {testData.instructions.map((instruction, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={instruction}
                        onChange={(e) => updateInstruction(index, e.target.value)}
                        placeholder="Enter instruction"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeInstruction(index)}
                        disabled={testData.instructions.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" onClick={addInstruction}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Instruction
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sections" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Test Sections</h2>
                <p className="text-muted-foreground">Organize your test into sections</p>
              </div>
              <Button onClick={addSection}>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>

            <div className="space-y-4">
              {testData.sections.map((section, index) => (
                <Card key={section.id} className={activeSection === index ? "ring-2 ring-primary" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">Section {index + 1}</CardTitle>
                        <CardDescription>{section.questions.length} questions</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{section.questions.length} questions</Badge>
                        {!testData.useGlobalTime && section.timeLimit && (
                          <Badge variant="outline">{section.timeLimit} min</Badge>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => setActiveSection(index)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSection(index)}
                          disabled={testData.sections.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Section Title</Label>
                      <Input
                        value={section.title}
                        onChange={(e) => updateSection(index, { title: e.target.value })}
                        placeholder="Enter section title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Section Description</Label>
                      <Textarea
                        value={section.description}
                        onChange={(e) => updateSection(index, { description: e.target.value })}
                        placeholder="Enter section description (optional)"
                        rows={2}
                      />
                    </div>
                    {!testData.useGlobalTime && (
                      <div className="space-y-2">
                        <Label>Time Limit (minutes)</Label>
                        <Input
                          type="number"
                          value={section.timeLimit || ""}
                          onChange={(e) =>
                            updateSection(index, { timeLimit: Number.parseInt(e.target.value) || undefined })
                          }
                          placeholder="Enter time limit"
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Questions</h2>
                <p className="text-muted-foreground">
                  Section: {testData.sections[activeSection]?.title || "No section selected"}
                </p>
              </div>
              <Button onClick={() => addQuestion(activeSection)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Question
              </Button>
            </div>

            {testData.sections[activeSection]?.questions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Edit3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Questions Yet</h3>
                  <p className="text-muted-foreground mb-4">Add your first question to get started.</p>
                  <Button onClick={() => addQuestion(activeSection)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Question
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {testData.sections[activeSection]?.questions.map((question, questionIndex) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                        <Button variant="ghost" size="sm" onClick={() => removeQuestion(activeSection, questionIndex)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question Text</Label>
                        <Textarea
                          value={question.text}
                          onChange={(e) => updateQuestion(activeSection, questionIndex, { text: e.target.value })}
                          placeholder="Enter your question"
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Answer Options</Label>
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center space-x-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                checked={question.correctAnswer === optionIndex}
                                onChange={() =>
                                  updateQuestion(activeSection, questionIndex, { correctAnswer: optionIndex })
                                }
                                className="text-primary"
                              />
                              <span className="text-sm font-medium">Option {optionIndex + 1}</span>
                            </div>
                            <Input
                              value={option}
                              onChange={(e) => {
                                const newOptions = [...question.options]
                                newOptions[optionIndex] = e.target.value
                                updateQuestion(activeSection, questionIndex, { options: newOptions })
                              }}
                              placeholder={`Enter option ${optionIndex + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <Label>Points</Label>
                        <Input
                          type="number"
                          value={question.points}
                          onChange={(e) =>
                            updateQuestion(activeSection, questionIndex, {
                              points: Number.parseInt(e.target.value) || 1,
                            })
                          }
                          min="1"
                          className="w-24"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Settings</CardTitle>
                <CardDescription>Configure timing and other test parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Use Global Time Limit</Label>
                    <p className="text-sm text-muted-foreground">
                      Apply a single time limit for the entire test instead of per-section timing
                    </p>
                  </div>
                  <Switch
                    checked={testData.useGlobalTime}
                    onCheckedChange={(checked) => setTestData((prev) => ({ ...prev, useGlobalTime: checked }))}
                  />
                </div>

                {testData.useGlobalTime && (
                  <div className="space-y-2">
                    <Label>Global Time Limit (minutes)</Label>
                    <Input
                      type="number"
                      value={testData.globalTimeLimit || ""}
                      onChange={(e) =>
                        setTestData((prev) => ({
                          ...prev,
                          globalTimeLimit: Number.parseInt(e.target.value) || undefined,
                        }))
                      }
                      placeholder="Enter time limit in minutes"
                      className="w-48"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
