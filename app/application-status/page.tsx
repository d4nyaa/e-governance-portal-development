"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Download,
  Eye,
  Calendar,
  User,
  Phone,
  Mail,
  RefreshCw,
} from "lucide-react"

interface Application {
  id: string
  schemeName: string
  schemeCategory: string
  submittedDate: string
  lastUpdated: string
  status: "submitted" | "under-review" | "approved" | "rejected" | "pending-documents"
  currentStep: number
  totalSteps: number
  applicantName: string
  applicationAmount?: string
  rejectionReason?: string
  nextAction?: string
  documents: {
    name: string
    status: "uploaded" | "verified" | "rejected"
    uploadDate: string
  }[]
  timeline: {
    step: string
    status: "completed" | "current" | "pending"
    date?: string
    description: string
  }[]
}

const mockApplications: Application[] = [
  {
    id: "PMAY20241201",
    schemeName: "Pradhan Mantri Awas Yojana",
    schemeCategory: "Housing",
    submittedDate: "2024-12-01",
    lastUpdated: "2024-12-15",
    status: "under-review",
    currentStep: 3,
    totalSteps: 5,
    applicantName: "John Doe",
    applicationAmount: "₹2,67,000",
    nextAction: "Document verification in progress",
    documents: [
      { name: "Aadhaar Card", status: "verified", uploadDate: "2024-12-01" },
      { name: "Income Certificate", status: "verified", uploadDate: "2024-12-01" },
      { name: "Bank Passbook", status: "uploaded", uploadDate: "2024-12-01" },
      { name: "Passport Photo", status: "verified", uploadDate: "2024-12-01" },
    ],
    timeline: [
      {
        step: "Application Submitted",
        status: "completed",
        date: "2024-12-01",
        description: "Your application has been successfully submitted",
      },
      {
        step: "Initial Review",
        status: "completed",
        date: "2024-12-05",
        description: "Application passed initial eligibility check",
      },
      {
        step: "Document Verification",
        status: "current",
        description: "Documents are being verified by the concerned authority",
      },
      {
        step: "Final Approval",
        status: "pending",
        description: "Final approval from the sanctioning authority",
      },
      {
        step: "Benefit Disbursement",
        status: "pending",
        description: "Subsidy amount will be credited to your account",
      },
    ],
  },
  {
    id: "SKILL20241115",
    schemeName: "Skill India Mission",
    schemeCategory: "Education",
    submittedDate: "2024-11-15",
    lastUpdated: "2024-12-10",
    status: "approved",
    currentStep: 5,
    totalSteps: 5,
    applicantName: "Jane Smith",
    nextAction: "Training will commence from January 2025",
    documents: [
      { name: "Aadhaar Card", status: "verified", uploadDate: "2024-11-15" },
      { name: "Educational Certificate", status: "verified", uploadDate: "2024-11-15" },
      { name: "Passport Photo", status: "verified", uploadDate: "2024-11-15" },
    ],
    timeline: [
      {
        step: "Application Submitted",
        status: "completed",
        date: "2024-11-15",
        description: "Your application has been successfully submitted",
      },
      {
        step: "Eligibility Check",
        status: "completed",
        date: "2024-11-20",
        description: "Eligibility criteria verified successfully",
      },
      {
        step: "Document Verification",
        status: "completed",
        date: "2024-11-25",
        description: "All documents verified and approved",
      },
      {
        step: "Training Center Allocation",
        status: "completed",
        date: "2024-12-05",
        description: "Training center assigned based on your location",
      },
      {
        step: "Enrollment Confirmation",
        status: "completed",
        date: "2024-12-10",
        description: "Enrollment confirmed for January 2025 batch",
      },
    ],
  },
]

export default function ApplicationStatusPage() {
  const [searchId, setSearchId] = useState("")
  const [searchedApplication, setSearchedApplication] = useState<Application | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState("")

  const handleSearch = async () => {
    if (!searchId.trim()) {
      setSearchError("Please enter an application ID")
      return
    }

    setIsSearching(true)
    setSearchError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const found = mockApplications.find((app) => app.id.toLowerCase() === searchId.toLowerCase())
    if (found) {
      setSearchedApplication(found)
      setSearchError("")
    } else {
      setSearchedApplication(null)
      setSearchError("Application not found. Please check your application ID and try again.")
    }

    setIsSearching(false)
  }

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "under-review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      case "pending-documents":
        return "bg-orange-100 text-orange-800 border-orange-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return <FileText className="h-4 w-4" />
      case "under-review":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      case "pending-documents":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const formatStatus = (status: Application["status"]) => {
    switch (status) {
      case "submitted":
        return "Submitted"
      case "under-review":
        return "Under Review"
      case "approved":
        return "Approved"
      case "rejected":
        return "Rejected"
      case "pending-documents":
        return "Pending Documents"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary">Application Status</Badge>
        <h1 className="text-4xl font-bold">Track Your Application</h1>
        <p className="text-xl text-muted-foreground">
          Enter your application ID to check the status and track progress of your government scheme applications
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search Application</span>
          </CardTitle>
          <CardDescription>Enter your application ID to track status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="applicationId">Application ID</Label>
              <Input
                id="applicationId"
                placeholder="Enter your application ID (e.g., PMAY20241201)"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </div>

          {searchError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Application Details */}
      {searchedApplication && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{searchedApplication.schemeCategory}</Badge>
                  <Badge className={getStatusColor(searchedApplication.status)}>
                    {getStatusIcon(searchedApplication.status)}
                    <span className="ml-1">{formatStatus(searchedApplication.status)}</span>
                  </Badge>
                </div>
                <CardTitle className="text-2xl">{searchedApplication.schemeName}</CardTitle>
                <CardDescription>Application ID: {searchedApplication.id}</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Progress</p>
                <p className="text-2xl font-bold text-primary">
                  {Math.round((searchedApplication.currentStep / searchedApplication.totalSteps) * 100)}%
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Step {searchedApplication.currentStep} of {searchedApplication.totalSteps}
                </span>
                <span>Last updated: {new Date(searchedApplication.lastUpdated).toLocaleDateString()}</span>
              </div>
              <Progress
                value={(searchedApplication.currentStep / searchedApplication.totalSteps) * 100}
                className="h-2"
              />
            </div>

            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Applicant</p>
                  <p className="text-sm text-muted-foreground">{searchedApplication.applicantName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Submitted</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(searchedApplication.submittedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {searchedApplication.applicationAmount && (
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Amount</p>
                    <p className="text-sm text-muted-foreground">{searchedApplication.applicationAmount}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Next Action */}
            {searchedApplication.nextAction && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Next Action:</strong> {searchedApplication.nextAction}
                </AlertDescription>
              </Alert>
            )}

            {/* Detailed Information */}
            <Tabs defaultValue="timeline" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-4">
                <div className="space-y-4">
                  {searchedApplication.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${
                            item.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : item.status === "current"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          {item.status === "completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : item.status === "current" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-current" />
                          )}
                        </div>
                        {index < searchedApplication.timeline.length - 1 && <div className="h-8 w-px bg-border mt-2" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{item.step}</p>
                          {item.date && <p className="text-sm text-muted-foreground">{item.date}</p>}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-3">
                  {searchedApplication.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          className={
                            doc.status === "verified"
                              ? "bg-green-100 text-green-800 border-green-200"
                              : doc.status === "uploaded"
                                ? "bg-blue-100 text-blue-800 border-blue-200"
                                : "bg-red-100 text-red-800 border-red-200"
                          }
                        >
                          {doc.status === "verified" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {doc.status === "uploaded" && <Clock className="h-3 w-3 mr-1" />}
                          {doc.status === "rejected" && <AlertCircle className="h-3 w-3 mr-1" />}
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold">Need Help?</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Helpline: 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Email: support@egov.gov.in</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">Quick Actions</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/schemes">Browse Schemes</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/faq">View FAQ</Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
