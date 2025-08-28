import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Building,
  CheckCircle,
  Clock,
  FileText,
  ArrowLeft,
  Download,
  ExternalLink,
} from "lucide-react"

// Mock data - in real app this would come from API/database
const getSchemeById = (id: string) => {
  const schemes = {
    "1": {
      id: 1,
      title: "Pradhan Mantri Awas Yojana",
      description:
        "Housing for all - providing affordable housing to urban and rural poor with subsidized loans and grants",
      category: "Housing",
      ministry: "Ministry of Housing and Urban Affairs",
      beneficiaries: "2.5M+",
      budget: "₹48,000 Cr",
      deadline: "2024-03-31",
      location: "Pan India",
      status: "Active",
      featured: true,
      tags: ["Housing", "Subsidy", "Loan"],
      eligibility: [
        "Below Poverty Line families",
        "First-time home buyer",
        "Annual household income less than ₹18 Lakh",
        "Should not own a pucca house anywhere in India",
        "Adult member of the family should not have availed central assistance",
      ],
      benefits: [
        "Interest subsidy up to ₹2.67 lakh",
        "Loan amount up to ₹12 lakh",
        "Carpet area: 30 sq.m. for EWS and 60 sq.m. for LIG",
        "Additional subsidy for women ownership",
        "Credit linked subsidy for 20 years",
      ],
      documents: [
        "Aadhaar Card",
        "Income Certificate",
        "Caste Certificate (if applicable)",
        "Bank Account Details",
        "Property Documents",
        "Passport Size Photographs",
      ],
      applicationProcess: [
        "Visit the official PMAY website or nearest Common Service Center",
        "Fill the online application form with required details",
        "Upload necessary documents",
        "Submit the application and note down the application number",
        "Track application status online",
        "Attend verification process if selected",
      ],
      timeline: "Applications are processed within 30-45 days of submission",
      contactInfo: {
        helpline: "1800-11-6446",
        email: "pmay-helpdesk@gov.in",
        website: "https://pmaymis.gov.in",
      },
    },
  }
  return schemes[id as keyof typeof schemes] || null
}

export default function SchemeDetailsPage({ params }: { params: { id: string } }) {
  const scheme = getSchemeById(params.id)

  if (!scheme) {
    return (
      <div className="container px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Scheme Not Found</h1>
        <p className="text-muted-foreground mb-8">The scheme you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/schemes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schemes
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link href="/schemes" className="hover:text-primary">
          Schemes
        </Link>
        <span>/</span>
        <span className="text-foreground">{scheme.title}</span>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <Button variant="ghost" asChild className="p-0 h-auto">
          <Link href="/schemes">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Schemes
          </Link>
        </Button>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{scheme.category}</Badge>
            <Badge variant="outline" className="text-green-600 border-green-200">
              {scheme.status}
            </Badge>
            {scheme.featured && (
              <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold text-balance">{scheme.title}</h1>
          <p className="text-xl text-muted-foreground text-balance">{scheme.description}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{scheme.beneficiaries}</p>
              <p className="text-sm text-muted-foreground">Beneficiaries</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{scheme.budget}</p>
              <p className="text-sm text-muted-foreground">Budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Calendar className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{new Date(scheme.deadline).toLocaleDateString()}</p>
              <p className="text-sm text-muted-foreground">Deadline</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <MapPin className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{scheme.location}</p>
              <p className="text-sm text-muted-foreground">Coverage</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href={`/schemes/${scheme.id}/apply`}>Apply Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/eligibility">
              <CheckCircle className="h-4 w-4 mr-2" />
              Check Eligibility
            </Link>
          </Button>
          <Button size="lg" variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Download Brochure
          </Button>
        </div>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="process">Process</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheme Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Implementing Ministry</p>
                      <p className="text-sm text-muted-foreground">{scheme.ministry}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Processing Time</p>
                      <p className="text-sm text-muted-foreground">{scheme.timeline}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-2">Scheme Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {scheme.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="font-medium">Helpline</p>
                  <p className="text-sm text-muted-foreground">{scheme.contactInfo.helpline}</p>
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{scheme.contactInfo.email}</p>
                </div>
                <div>
                  <p className="font-medium">Website</p>
                  <Button variant="link" className="p-0 h-auto text-sm" asChild>
                    <Link href={scheme.contactInfo.website} target="_blank">
                      Visit Official Website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="eligibility" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Eligibility Criteria</CardTitle>
              <CardDescription>Check if you meet the following requirements to apply for this scheme</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {scheme.eligibility.map((criteria, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-6" />
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/eligibility">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Check Your Eligibility
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/schemes/${scheme.id}/apply`}>Proceed to Apply</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Scheme Benefits</CardTitle>
              <CardDescription>Here are the key benefits you can receive under this scheme</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {scheme.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Required Documents</CardTitle>
              <CardDescription>Prepare these documents before starting your application</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {scheme.documents.map((document, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span>{document}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-6" />
              <p className="text-sm text-muted-foreground">
                Note: All documents should be self-attested copies. Original documents may be required for verification.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Application Process</CardTitle>
              <CardDescription>Follow these steps to complete your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheme.applicationProcess.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p>{step}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href={`/schemes/${scheme.id}/apply`}>Start Application</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/application-status">
                    <Clock className="h-4 w-4 mr-2" />
                    Track Existing Application
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
