"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ArrowRight, Upload, FileText, CheckCircle, AlertCircle, User, Home, CreditCard } from "lucide-react"

interface ApplicationForm {
  // Personal Details
  firstName: string
  lastName: string
  fatherName: string
  dateOfBirth: string
  gender: string
  category: string
  aadhaarNumber: string
  panNumber: string

  // Contact Details
  mobileNumber: string
  email: string
  address: string
  pincode: string
  state: string
  district: string

  // Financial Details
  annualIncome: string
  bankName: string
  accountNumber: string
  ifscCode: string

  // Scheme Specific
  schemeSpecificField1: string
  schemeSpecificField2: string

  // Documents
  uploadedDocuments: { [key: string]: File | null }

  // Declaration
  agreeToTerms: boolean
  declarationSigned: boolean
}

const initialForm: ApplicationForm = {
  firstName: "",
  lastName: "",
  fatherName: "",
  dateOfBirth: "",
  gender: "",
  category: "",
  aadhaarNumber: "",
  panNumber: "",
  mobileNumber: "",
  email: "",
  address: "",
  pincode: "",
  state: "",
  district: "",
  annualIncome: "",
  bankName: "",
  accountNumber: "",
  ifscCode: "",
  schemeSpecificField1: "",
  schemeSpecificField2: "",
  uploadedDocuments: {},
  agreeToTerms: false,
  declarationSigned: false,
}

const requiredDocuments = [
  { key: "aadhaar", label: "Aadhaar Card", required: true },
  { key: "income", label: "Income Certificate", required: true },
  { key: "caste", label: "Caste Certificate", required: false },
  { key: "bank", label: "Bank Passbook", required: true },
  { key: "photo", label: "Passport Size Photo", required: true },
]

export default function ApplicationPage({ params }: { params: { id: string } }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [form, setForm] = useState<ApplicationForm>(initialForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [applicationSubmitted, setApplicationSubmitted] = useState(false)
  const [applicationId, setApplicationId] = useState("")

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const updateForm = (field: keyof ApplicationForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (documentKey: string, file: File | null) => {
    setForm((prev) => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [documentKey]: file,
      },
    }))
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

  const submitApplication = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate mock application ID
    const mockApplicationId = `PMAY${Date.now().toString().slice(-8)}`
    setApplicationId(mockApplicationId)
    setApplicationSubmitted(true)
    setIsSubmitting(false)
  }

  if (applicationSubmitted) {
    return (
      <div className="container px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-green-100">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-green-700">Application Submitted Successfully!</h1>
            <p className="text-lg text-muted-foreground">Your application has been received and is being processed.</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Application ID</p>
                <p className="text-2xl font-bold text-primary">{applicationId}</p>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Scheme:</strong> Pradhan Mantri Awas Yojana
                </p>
                <p>
                  <strong>Submitted on:</strong> {new Date().toLocaleDateString()}
                </p>
                <p>
                  <strong>Expected processing time:</strong> 30-45 days
                </p>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Please save your Application ID for future reference. You will receive SMS and email updates on your
              registered contact details.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/application-status">Track Application Status</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/schemes">Browse More Schemes</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Personal Details</span>
              </CardTitle>
              <CardDescription>Enter your basic personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={(e) => updateForm("firstName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={(e) => updateForm("lastName", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name *</Label>
                <Input
                  id="fatherName"
                  placeholder="Enter father's name"
                  value={form.fatherName}
                  onChange={(e) => updateForm("fatherName", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(e) => updateForm("dateOfBirth", e.target.value)}
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
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="obc">OBC</SelectItem>
                      <SelectItem value="sc">SC</SelectItem>
                      <SelectItem value="st">ST</SelectItem>
                      <SelectItem value="ews">EWS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="aadhaarNumber">Aadhaar Number *</Label>
                  <Input
                    id="aadhaarNumber"
                    placeholder="Enter 12-digit Aadhaar number"
                    value={form.aadhaarNumber}
                    onChange={(e) => updateForm("aadhaarNumber", e.target.value)}
                  />
                </div>
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
                <span>Contact & Address</span>
              </CardTitle>
              <CardDescription>Provide your contact details and address</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mobileNumber">Mobile Number *</Label>
                  <Input
                    id="mobileNumber"
                    placeholder="Enter 10-digit mobile number"
                    value={form.mobileNumber}
                    onChange={(e) => updateForm("mobileNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email address"
                    value={form.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Complete Address *</Label>
                <Textarea
                  id="address"
                  placeholder="Enter your complete address"
                  value={form.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode *</Label>
                  <Input
                    id="pincode"
                    placeholder="Enter pincode"
                    value={form.pincode}
                    onChange={(e) => updateForm("pincode", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Select value={form.state} onValueChange={(value) => updateForm("state", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">District *</Label>
                  <Input
                    id="district"
                    placeholder="Enter district"
                    value={form.district}
                    onChange={(e) => updateForm("district", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )

      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5" />
                <span>Financial Details</span>
              </CardTitle>
              <CardDescription>Enter your income and bank account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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

              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name *</Label>
                <Input
                  id="bankName"
                  placeholder="Enter bank name"
                  value={form.bankName}
                  onChange={(e) => updateForm("bankName", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number *</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter account number"
                    value={form.accountNumber}
                    onChange={(e) => updateForm("accountNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ifscCode">IFSC Code *</Label>
                  <Input
                    id="ifscCode"
                    placeholder="Enter IFSC code"
                    value={form.ifscCode}
                    onChange={(e) => updateForm("ifscCode", e.target.value)}
                  />
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
                <Upload className="h-5 w-5" />
                <span>Document Upload</span>
              </CardTitle>
              <CardDescription>Upload required documents (PDF, JPG, PNG - Max 2MB each)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {requiredDocuments.map((doc) => (
                <div key={doc.key} className="space-y-2">
                  <Label htmlFor={doc.key}>
                    {doc.label} {doc.required && "*"}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id={doc.key}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                      className="flex-1"
                    />
                    {form.uploadedDocuments[doc.key] && <CheckCircle className="h-5 w-5 text-green-600" />}
                  </div>
                </div>
              ))}

              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Ensure all documents are clear and readable. Supported formats: PDF, JPG, PNG (Max 2MB each)
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )

      case 5:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Review & Declaration</span>
              </CardTitle>
              <CardDescription>Review your application and provide declaration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Application Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p>
                      <strong>Name:</strong> {form.firstName} {form.lastName}
                    </p>
                    <p>
                      <strong>Father's Name:</strong> {form.fatherName}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> {form.dateOfBirth}
                    </p>
                    <p>
                      <strong>Gender:</strong> {form.gender}
                    </p>
                    <p>
                      <strong>Category:</strong> {form.category}
                    </p>
                  </div>
                  <div>
                    <p>
                      <strong>Mobile:</strong> {form.mobileNumber}
                    </p>
                    <p>
                      <strong>Email:</strong> {form.email}
                    </p>
                    <p>
                      <strong>State:</strong> {form.state}
                    </p>
                    <p>
                      <strong>Annual Income:</strong> ₹{form.annualIncome}
                    </p>
                    <p>
                      <strong>Bank:</strong> {form.bankName}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Declaration</h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="agreeToTerms"
                      checked={form.agreeToTerms}
                      onCheckedChange={(checked) => updateForm("agreeToTerms", checked)}
                    />
                    <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                      I agree to the terms and conditions and privacy policy of the scheme
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="declarationSigned"
                      checked={form.declarationSigned}
                      onCheckedChange={(checked) => updateForm("declarationSigned", checked)}
                    />
                    <Label htmlFor="declarationSigned" className="text-sm leading-relaxed">
                      I hereby declare that all the information provided is true and correct to the best of my knowledge
                    </Label>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Providing false information may lead to rejection of application and legal action.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Link href="/schemes" className="hover:text-primary">
            Schemes
          </Link>
          <span>/</span>
          <Link href={`/schemes/${params.id}`} className="hover:text-primary">
            Pradhan Mantri Awas Yojana
          </Link>
          <span>/</span>
          <span className="text-foreground">Apply</span>
        </div>

        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link href={`/schemes/${params.id}`}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Scheme Details
          </Link>
        </Button>

        <div className="space-y-2">
          <Badge variant="secondary">Application Form</Badge>
          <h1 className="text-4xl font-bold">Apply for Pradhan Mantri Awas Yojana</h1>
          <p className="text-xl text-muted-foreground">
            Complete the application form to apply for housing subsidy benefits
          </p>
        </div>
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
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={submitApplication}
              disabled={isSubmitting || !form.agreeToTerms || !form.declarationSigned}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              {!isSubmitting && <CheckCircle className="h-4 w-4 ml-2" />}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
