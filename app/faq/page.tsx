"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, HelpCircle, Phone, Mail, MessageCircle, ExternalLink } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  tags: string[]
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I check my eligibility for government schemes?",
    answer:
      "You can check your eligibility by using our Eligibility Checker tool. Simply provide your personal, financial, and demographic information, and the system will show you all schemes you may be eligible for along with eligibility scores and requirements.",
    category: "General",
    tags: ["eligibility", "schemes", "checker"],
  },
  {
    id: "2",
    question: "What documents are required for scheme applications?",
    answer:
      "Common documents include Aadhaar Card, Income Certificate, Caste Certificate (if applicable), Bank Account details, Passport size photographs, and scheme-specific documents. The exact requirements vary by scheme and are listed on each scheme's detail page.",
    category: "General",
    tags: ["documents", "application", "requirements"],
  },
  {
    id: "3",
    question: "How long does it take to process an application?",
    answer:
      "Processing times vary by scheme. Most applications are processed within 30-45 days of submission. You can track your application status using your Application ID on the Track Application page.",
    category: "General",
    tags: ["processing", "time", "application"],
  },
  {
    id: "4",
    question: "Can I apply for multiple schemes simultaneously?",
    answer:
      "Yes, you can apply for multiple schemes as long as you meet the eligibility criteria for each. However, some schemes may have restrictions on concurrent applications, which will be mentioned in the scheme guidelines.",
    category: "General",
    tags: ["multiple", "schemes", "application"],
  },
  {
    id: "5",
    question: "What is the income limit for Pradhan Mantri Awas Yojana?",
    answer:
      "For PMAY, the annual household income should be less than ₹18 lakh for the Economically Weaker Section (EWS) and Low Income Group (LIG) categories. The exact limits may vary based on the component (Urban/Rural) and are updated periodically.",
    category: "Housing",
    tags: ["pmay", "income", "limit", "housing"],
  },
  {
    id: "6",
    question: "How do I track my PMAY application status?",
    answer:
      "You can track your PMAY application by entering your Application ID on the Track Application page. You'll see detailed progress including document verification status, approval stages, and expected timeline.",
    category: "Housing",
    tags: ["pmay", "tracking", "status"],
  },
  {
    id: "7",
    question: "What training programs are available under Skill India?",
    answer:
      "Skill India offers training in various sectors including IT, Healthcare, Automotive, Construction, Beauty & Wellness, Tourism & Hospitality, and many more. Training duration ranges from 3 months to 1 year depending on the course.",
    category: "Education",
    tags: ["skill india", "training", "programs"],
  },
  {
    id: "8",
    question: "Is there any fee for Skill India training programs?",
    answer:
      "Most Skill India training programs are provided free of cost to eligible candidates. Some advanced courses may have nominal fees, but financial assistance is available for economically disadvantaged candidates.",
    category: "Education",
    tags: ["skill india", "fee", "cost"],
  },
  {
    id: "9",
    question: "Who is eligible for PM Kisan Samman Nidhi?",
    answer:
      "Small and marginal farmers with cultivable land up to 2 hectares are eligible. The scheme provides ₹6,000 per year in three installments directly to the farmer's bank account. Land ownership documents and Aadhaar are required.",
    category: "Agriculture",
    tags: ["pm kisan", "eligibility", "farmers"],
  },
  {
    id: "10",
    question: "How is the PM Kisan amount disbursed?",
    answer:
      "The ₹6,000 annual amount is disbursed in three equal installments of ₹2,000 each, directly to the beneficiary's bank account through Direct Benefit Transfer (DBT). Payments are made in April-July, August-November, and December-March periods.",
    category: "Agriculture",
    tags: ["pm kisan", "disbursement", "payment"],
  },
  {
    id: "11",
    question: "What is covered under Ayushman Bharat scheme?",
    answer:
      "Ayushman Bharat provides health insurance coverage up to ₹5 lakh per family per year. It covers hospitalization expenses, pre and post-hospitalization charges, and treatment for serious illnesses. Over 1,400 medical packages are covered.",
    category: "Healthcare",
    tags: ["ayushman bharat", "coverage", "health insurance"],
  },
  {
    id: "12",
    question: "How do I get an Ayushman Bharat card?",
    answer:
      "If your family is eligible (based on SECC database), you can get your card from the nearest Common Service Center (CSC) or empaneled hospital. You need to provide Aadhaar and other identity documents for verification.",
    category: "Healthcare",
    tags: ["ayushman bharat", "card", "enrollment"],
  },
  {
    id: "13",
    question: "My application was rejected. What should I do?",
    answer:
      "If your application is rejected, you'll receive the reason via SMS/email. You can appeal the decision by contacting the concerned department or reapply after addressing the rejection reasons. Check the specific scheme guidelines for appeal procedures.",
    category: "Technical",
    tags: ["rejection", "appeal", "reapply"],
  },
  {
    id: "14",
    question: "I forgot my Application ID. How can I retrieve it?",
    answer:
      "Your Application ID is sent to your registered mobile number and email when you submit an application. You can also retrieve it by contacting the helpline with your Aadhaar number and other details for verification.",
    category: "Technical",
    tags: ["application id", "forgot", "retrieve"],
  },
  {
    id: "15",
    question: "Can I edit my application after submission?",
    answer:
      "Once submitted, applications cannot be edited online. However, you can contact the concerned department or visit the nearest office to request corrections. Some schemes allow document resubmission during the verification process.",
    category: "Technical",
    tags: ["edit", "application", "modification"],
  },
]

const categories = ["All", "General", "Housing", "Education", "Agriculture", "Healthcare", "Technical"]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="container px-4 py-8 space-y-8">
      <div className="space-y-4">
        <Badge variant="secondary">Help & Support</Badge>
        <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Find answers to common questions about government schemes, applications, and services
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQs by question, answer, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredFAQs.length} of {faqs.length} questions
        </p>
        {(searchTerm || selectedCategory !== "All") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-4xl mx-auto">
        {filteredFAQs.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="font-medium">{faq.question}</p>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-8 pb-4">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {faq.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <h3 className="text-lg font-semibold">No questions found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your search terms or browse different categories to find the information you need.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
              }}
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>Contact Support</span>
            </CardTitle>
            <CardDescription>Get direct help from our support team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Helpline</p>
                  <p className="text-sm text-muted-foreground">1800-XXX-XXXX (Toll Free)</p>
                  <p className="text-xs text-muted-foreground">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@egov.gov.in</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available Mon-Fri, 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
            <CardDescription>Access commonly needed resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/schemes">
                <ExternalLink className="h-4 w-4 mr-2" />
                Browse All Schemes
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/eligibility">
                <ExternalLink className="h-4 w-4 mr-2" />
                Check Eligibility
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/application-status">
                <ExternalLink className="h-4 w-4 mr-2" />
                Track Application
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <ExternalLink className="h-4 w-4 mr-2" />
              Download User Manual
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Still Need Help */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 text-center space-y-4">
          <h3 className="text-xl font-semibold">Still need help?</h3>
          <p className="opacity-90">
            Can't find the answer you're looking for? Our support team is here to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <Phone className="h-4 w-4 mr-2" />
              Call Support
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
