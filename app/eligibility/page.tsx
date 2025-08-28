"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  User,
  Home,
  Briefcase,
  Heart,
} from "lucide-react"

interface EligibilityForm {
  age: string
  gender: string
  category: string
  annualIncome: string
  state: string
  district: string
  occupation: string
  education: string
  maritalStatus: string
  hasAadhaar: boolean
  hasBankAccount: boolean
  hasRationCard: boolean
  isFirstTimeApplicant: boolean
  ownsPuccaHouse: boolean
  landOwnership: string
}

interface SchemeResult {
  id: number
  title: string
  category: string
  eligibilityScore: number
  status: "eligible" | "not-eligible" | "partially-eligible"
  matchedCriteria: string[]
  missingCriteria: string[]
  benefits: string[]
}

const initialForm: EligibilityForm = {
  age: "",
  gender: "",
  category: "",
  annualIncome: "",
  state: "",
  district: "",
  occupation: "",
  education: "",
  maritalStatus: "",
  hasAadhaar: false,
  hasBankAccount: false,
  hasRationCard: false,
  isFirstTimeApplicant: false,
  ownsPuccaHouse: false,
  landOwnership: "",
}

const states = [
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Delhi",
  "Gujarat",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Punjab",
  "Tamil Nadu",
  "Uttar Pradesh",
  "West Bengal",
]

const categories = ["General", "OBC", "SC", "ST", "EWS"]
const occupations = [
  "Student",
  "Unemployed",
  "Farmer",
  "Self-Employed",
  "Private Employee",
  "Government Employee",
  "Retired",
]
const educationLevels = ["Below 10th", "10th Pass", "12th Pass", "Graduate", "Post Graduate", "Professional Degree"]

export default function EligibilityPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState<EligibilityForm>(initialForm)
  const [results, setResults] = useState<SchemeResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const updateForm = (field: keyof EligibilityForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const resetForm = () => {
    setForm(initialForm)
    setCurrentStep(1)
    setResults([])
    setShowResults(false)
  }

  const checkEligibility = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock eligibility results based on form data
    const mockResults: SchemeResult[] = [
      {
        id: 1,
        title: "Pradhan Mantri Awas Yojana",
        category: "Housing",
        eligibilityScore: Number.parseInt(form.annualIncome) < 1800000 && !form.ownsPuccaHouse ? 95 : 20,
        status: Number.parseInt(form.annualIncome) < 1800000 && !form.ownsPuccaHouse ? "eligible" : "not-eligible",
        matchedCriteria:
          Number.parseInt(form.annualIncome) < 1800000 && !form.ownsPuccaHouse
            ? ["Income criteria met", "First-time home buyer", "Has Aadhaar", "Has bank account"]
            : ["Has Aadhaar"],
        missingCriteria:
          Number.parseInt(form.annualIncome) < 1800000 && !form.ownsPuccaHouse
            ? []
            : ["Income too high", "Already owns pucca house"],
        benefits: ["Interest subsidy up to ₹2.67 lakh", "Loan amount up to ₹12 lakh", "Additional subsidy for women"],
      },
      {
        id: 2,
        title: "PM Kisan Samman Nidhi",
        category: "Agriculture",
        eligibilityScore: form.occupation === "Farmer" ? 90 : 0,
        status: form.occupation === "Farmer" ? "eligible" : "not-eligible",
        matchedCriteria: form.occupation === "Farmer" ? ["Farmer occupation", "Has Aadhaar", "Has bank account"] : [],
        missingCriteria: form.occupation === "Farmer" ? [] : ["Not a farmer"],
        benefits: ["₹6,000 per year", "Direct bank transfer", "Three installments"],
      },
      {
        id: 3,
        title: "Skill India Mission",
        category: "Education",
        eligibilityScore:
          Number.parseInt(form.age) >= 15 && Number.parseInt(form.age) <= 45 && form.occupation === "Unemployed"
            ? 85
            : 30,
        status:
          Number.parseInt(form.age) >= 15 && Number.parseInt(form.age) <= 45 && form.occupation === "Unemployed"
            ? "eligible"
            : "partially-eligible",
        matchedCriteria:
          Number.parseInt(form.age) >= 15 && Number.parseInt(form.age) <= 45
            ? ["Age criteria met", "Has Aadhaar"]
            : ["Has Aadhaar"],
        missingCriteria:
          Number.parseInt(form.age) >= 15 && Number.parseInt(form.age) <= 45 && form.occupation === "Unemployed"
            ? []
            : form.occupation !== "Unemployed"
              ? ["Currently employed"]
              : ["Age not in range"],
        benefits: ["Free skill training", "Certification", "Job placement assistance"],
      },
      {
        id: 4,
        title: "Ayushman Bharat",
        category: "Healthcare",
        eligibilityScore: Number.parseInt(form.annualIncome) < 500000 ? 80 : 25,
        status: Number.parseInt(form.annualIncome) < 500000 ? "eligible" : "not-eligible",
        matchedCriteria:
          Number.parseInt(form.annualIncome) < 500000
            ? ["Income criteria met", "Has Aadhaar", "Has ration card"]
            : ["Has Aadhaar"],
        missingCriteria: Number.parseInt(form.annualIncome) < 500000 ? [] : ["Income too high"],
        benefits: ["₹5 lakh health insurance", "Cashless treatment", "Pre and post hospitalization"],
      },
    ]

    setResults(mockResults)
    setIsLoading(false)
    setShowResults(true)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
              <CardDescription>Tell us about yourself to check scheme eligibility</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={form.age}
                    onChange={(e) => updateForm("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <RadioGroup value={form.gender} onValueChange={(value) => updateForm("gender", value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={form.category} onValueChange={(value) => updateForm("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select value={form.maritalStatus} onValueChange={(value) => updateForm("maritalStatus", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Household Income (₹) *</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  placeholder="Enter annual income in rupees"
                  value={form.annualIncome}
                  onChange={(e) => updateForm("annualIncome", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        )

      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Location & Address</span>
              </CardTitle>
              <CardDescription>Your location helps us find relevant schemes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={form.state} onValueChange={(value) => updateForm("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    placeholder="Enter your district"
                    value={form.district}
                    onChange={(e) => updateForm("district", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Property Ownership</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="ownsPuccaHouse"
                      checked={form.ownsPuccaHouse}
                      onCheckedChange={(checked) => updateForm("ownsPuccaHouse", checked)}
                    />
                    <Label htmlFor="ownsPuccaHouse">I own a pucca (permanent) house</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="landOwnership">Land Ownership</Label>
                <Select value={form.landOwnership} onValueChange={(value) => updateForm("landOwnership", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select land ownership status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No land ownership</SelectItem>
                    <SelectItem value="marginal">Marginal farmer (&lt; 2.5 acres)</SelectItem>
                    <SelectItem value="small">Small farmer (2.5 - 5 acres)</SelectItem>
                    <SelectItem value="large">Large farmer (&gt; 5 acres)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Occupation & Education</span>
              </CardTitle>
              <CardDescription>Your professional and educational background</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupation">Current Occupation *</Label>
                  <Select value={form.occupation} onValueChange={(value) => updateForm("occupation", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select occupation" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupations.map((occupation) => (
                        <SelectItem key={occupation} value={occupation}>
                          {occupation}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education">Education Level</Label>
                  <Select value={form.education} onValueChange={(value) => updateForm("education", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 4:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5" />
                <span>Documents & Verification</span>
              </CardTitle>
              <CardDescription>Confirm your document availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Available Documents</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasAadhaar"
                      checked={form.hasAadhaar}
                      onCheckedChange={(checked) => updateForm("hasAadhaar", checked)}
                    />
                    <Label htmlFor="hasAadhaar">Aadhaar Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasBankAccount"
                      checked={form.hasBankAccount}
                      onCheckedChange={(checked) => updateForm("hasBankAccount", checked)}
                    />
                    <Label htmlFor="hasBankAccount">Bank Account</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasRationCard"
                      checked={form.hasRationCard}
                      onCheckedChange={(checked) => updateForm("hasRationCard", checked)}
                    />
                    <Label htmlFor="hasRationCard">Ration Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isFirstTimeApplicant"
                      checked={form.isFirstTimeApplicant}
                      onCheckedChange={(checked) => updateForm("isFirstTimeApplicant", checked)}
                    />
                    <Label htmlFor="isFirstTimeApplicant">First-time applicant for government schemes</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  if (showResults) {
    return (
      <div className="container px-4 py-8 space-y-8">
        <div className="space-y-4">
          <Badge variant="secondary">Eligibility Results</Badge>
          <h1 className="text-4xl font-bold">Your Scheme Eligibility</h1>
          <p className="text-xl text-muted-foreground">
            Based on your information, here are the schemes you may be eligible for
          </p>
        </div>

        <div className="grid gap-6">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{result.category}</Badge>
                      {result.status === "eligible" && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Eligible
                        </Badge>
                      )}
                      {result.status === "partially-eligible" && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Partially Eligible
                        </Badge>
                      )}
                      {result.status === "not-eligible" && (
                        <Badge variant="outline" className="text-red-600 border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Not Eligible
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{result.title}</CardTitle>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{result.eligibilityScore}%</div>
                    <div className="text-sm text-muted-foreground">Match Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700">Matched Criteria</h4>
                    <ul className="space-y-1">
                      {result.matchedCriteria.map((criteria, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          <span>{criteria}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {result.missingCriteria.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-red-700">Missing Criteria</h4>
                      <ul className="space-y-1">
                        {result.missingCriteria.map((criteria, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <XCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <span>{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Benefits</h4>
                  <ul className="space-y-1">
                    {result.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <ArrowRight className="h-4 w-4 text-primary flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button asChild disabled={result.status === "not-eligible"}>
                    <Link href={`/schemes/${result.id}`}>View Details</Link>
                  </Button>
                  {result.status === "eligible" && (
                    <Button variant="outline" asChild>
                      <Link href={`/schemes/${result.id}/apply`}>Apply Now</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" onClick={resetForm}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Check Again
          </Button>
          <Button asChild>
            <Link href="/schemes">Browse All Schemes</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary">Eligibility Checker</Badge>
        <h1 className="text-4xl font-bold">Check Your Eligibility</h1>
        <p className="text-xl text-muted-foreground">
          Answer a few questions to find government schemes you may be eligible for
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStep} of {totalSteps}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Form Steps */}
      <div className="max-w-2xl mx-auto">
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && (!form.age || !form.gender || !form.category || !form.annualIncome)) ||
                (currentStep === 2 && !form.state)
              }
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={checkEligibility} disabled={isLoading}>
              {isLoading ? "Checking..." : "Check Eligibility"}
              {!isLoading && <CheckCircle className="h-4 w-4 ml-2" />}
            </Button>
          )}
        </div>
      </div>

      {/* Help Section */}
      <Card className="max-w-2xl mx-auto bg-muted/30">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">Need Help?</p>
              <p className="text-sm text-muted-foreground">
                All information provided is kept confidential and used only for eligibility checking. For assistance,
                contact our helpline at 1800-XXX-XXXX.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
