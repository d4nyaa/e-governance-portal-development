"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Users, Calendar, MapPin, ArrowRight, Star } from "lucide-react"

// Mock data for schemes
const schemes = [
  {
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
    eligibility: ["Below Poverty Line", "First-time home buyer", "Annual income < ₹18 Lakh"],
  },
  {
    id: 2,
    title: "Digital India Initiative",
    description:
      "Transforming India into a digitally empowered society and knowledge economy through digital infrastructure",
    category: "Technology",
    ministry: "Ministry of Electronics & IT",
    beneficiaries: "50M+",
    budget: "₹1,13,000 Cr",
    deadline: "2025-12-31",
    location: "Pan India",
    status: "Active",
    featured: true,
    tags: ["Digital", "Infrastructure", "Technology"],
    eligibility: ["Indian Citizen", "Age 18-65", "Basic digital literacy"],
  },
  {
    id: 3,
    title: "Skill India Mission",
    description:
      "Empowering youth with industry-relevant skills for better employment opportunities and entrepreneurship",
    category: "Education",
    ministry: "Ministry of Skill Development",
    beneficiaries: "10M+",
    budget: "₹12,000 Cr",
    deadline: "2024-06-30",
    location: "Pan India",
    status: "Active",
    featured: false,
    tags: ["Skills", "Training", "Employment"],
    eligibility: ["Age 15-45", "Indian Citizen", "Unemployed/Underemployed"],
  },
  {
    id: 4,
    title: "PM Kisan Samman Nidhi",
    description: "Direct income support to small and marginal farmers across the country for agricultural expenses",
    category: "Agriculture",
    ministry: "Ministry of Agriculture",
    beneficiaries: "12M+",
    budget: "₹75,000 Cr",
    deadline: "2024-12-31",
    location: "Pan India",
    status: "Active",
    featured: true,
    tags: ["Agriculture", "Income Support", "Farmers"],
    eligibility: ["Small/Marginal Farmer", "Land ownership", "Aadhaar linked bank account"],
  },
  {
    id: 5,
    title: "Ayushman Bharat",
    description: "National Health Protection Scheme providing health insurance coverage to vulnerable families",
    category: "Healthcare",
    ministry: "Ministry of Health",
    beneficiaries: "50M+",
    budget: "₹6,400 Cr",
    deadline: "2025-03-31",
    location: "Pan India",
    status: "Active",
    featured: false,
    tags: ["Healthcare", "Insurance", "Medical"],
    eligibility: ["SECC Database", "Below Poverty Line", "Vulnerable families"],
  },
  {
    id: 6,
    title: "Startup India",
    description: "Building a strong ecosystem for nurturing innovation and startups in the country",
    category: "Business",
    ministry: "Ministry of Commerce",
    beneficiaries: "100K+",
    budget: "₹10,000 Cr",
    deadline: "2024-09-30",
    location: "Pan India",
    status: "Active",
    featured: false,
    tags: ["Startup", "Innovation", "Business"],
    eligibility: ["Indian Entity", "Innovative Business", "Age < 10 years"],
  },
]

const categories = ["All", "Housing", "Technology", "Education", "Agriculture", "Healthcare", "Business"]
const statuses = ["All", "Active", "Upcoming", "Closed"]

export default function SchemesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [activeTab, setActiveTab] = useState("all")

  const formatDate = useMemo(() => {
    return (dateString: string) => {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    }
  }, [])

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory
    const matchesStatus = selectedStatus === "All" || scheme.status === selectedStatus
    const matchesTab = activeTab === "all" || (activeTab === "featured" && scheme.featured)

    return matchesSearch && matchesCategory && matchesStatus && matchesTab
  })

  return (
    <div className="container px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">Government Schemes</Badge>
        </div>
        <h1 className="text-4xl font-bold text-balance">Browse Government Schemes</h1>
        <p className="text-xl text-muted-foreground text-balance max-w-3xl">
          Discover government schemes designed to support citizens across various sectors. Find the right scheme for
          your needs and apply online.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schemes by name, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Schemes ({schemes.length})</TabsTrigger>
            <TabsTrigger value="featured">
              <Star className="h-4 w-4 mr-1" />
              Featured ({schemes.filter((s) => s.featured).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredSchemes.length} of {schemes.length} schemes
        </p>
        {(searchTerm || selectedCategory !== "All" || selectedStatus !== "All") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
              setSelectedStatus("All")
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="group hover:shadow-lg transition-all duration-200 h-full flex flex-col">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <Badge variant="secondary">{scheme.category}</Badge>
                <div className="flex items-center space-x-1">
                  {scheme.featured && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {scheme.status}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                {scheme.title}
              </CardTitle>
              <CardDescription className="line-clamp-3">{scheme.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{scheme.beneficiaries} beneficiaries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: {formatDate(scheme.deadline)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{scheme.location}</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Budget: {scheme.budget}</p>
                <p className="text-sm text-muted-foreground">{scheme.ministry}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {scheme.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-auto pt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                  <Link href={`/schemes/${scheme.id}`}>View Details</Link>
                </Button>
                <Button size="sm" className="flex-1" asChild>
                  <Link href={`/schemes/${scheme.id}/apply`}>
                    Apply Now
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-muted">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <h3 className="text-lg font-semibold">No schemes found</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Try adjusting your search terms or filters to find the schemes you're looking for.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory("All")
              setSelectedStatus("All")
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More (for future pagination) */}
      {filteredSchemes.length > 0 && (
        <div className="text-center pt-8">
          <Button variant="outline" size="lg">
            Load More Schemes
          </Button>
        </div>
      )}
    </div>
  )
}
