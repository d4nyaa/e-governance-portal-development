"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, FileText, CheckCircle, Clock, Users, Award, Shield, Zap } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HomePageContent() {
  const { t } = useLanguage()

  const featuredSchemes = [
    {
      id: 1,
      title: "Pradhan Mantri Awas Yojana",
      description: "Housing for all - providing affordable housing to urban and rural poor",
      category: "Housing",
      beneficiaries: "2.5M+",
      status: "Active",
    },
    {
      id: 2,
      title: "Digital India Initiative",
      description: "Transforming India into a digitally empowered society and knowledge economy",
      category: "Technology",
      beneficiaries: "50M+",
      status: "Active",
    },
    {
      id: 3,
      title: "Skill India Mission",
      description: "Empowering youth with industry-relevant skills for better employment opportunities",
      category: "Education",
      beneficiaries: "10M+",
      status: "Active",
    },
  ]

  const quickActions = [
    {
      icon: Search,
      title: t("browseSchemes"),
      description: "Browse and search through available government schemes",
      href: "/schemes",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: CheckCircle,
      title: t("checkEligibility"),
      description: "Verify your eligibility for various schemes instantly",
      href: "/eligibility",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: FileText,
      title: t("applyScheme"),
      description: "Submit applications for schemes you're eligible for",
      href: "/schemes",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Clock,
      title: t("trackApplication"),
      description: "Monitor the progress of your submitted applications",
      href: "/application-status",
      color: "bg-orange-50 text-orange-600",
    },
  ]

  const stats = [
    { label: "Active Schemes", value: "500+", icon: Award },
    { label: t("beneficiaries"), value: "100M+", icon: Users },
    { label: "Applications Processed", value: "50M+", icon: FileText },
    { label: "Success Rate", value: "95%", icon: Shield },
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              <Zap className="h-3 w-3 mr-1" />
              Government of India
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">{t("welcomeTitle")}</h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">{t("welcomeSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/schemes">
                  <Search className="h-4 w-4 mr-2" />
                  {t("browseSchemes")}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/eligibility">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t("checkEligibility")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center">
                  <div className="p-3 rounded-full bg-primary/10">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">{t("quickActions")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started with these essential services to access government schemes and benefits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
                <Link href={action.href}>
                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-4">
                      <div className={`p-4 rounded-full ${action.color}`}>
                        <action.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{action.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription>{action.description}</CardDescription>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="py-8 bg-muted/30">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">{t("featuredSchemes")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover popular government schemes that are making a difference in citizens' lives
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSchemes.map((scheme) => (
              <Card key={scheme.id} className="group hover:shadow-lg transition-all duration-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{scheme.category}</Badge>
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      {scheme.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{scheme.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription>{scheme.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {scheme.beneficiaries} {t("beneficiaries")}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/schemes/${scheme.id}`}>{t("learnMore")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/schemes">View All {t("schemes")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl opacity-90">
              Join millions of citizens who have benefited from government schemes. Check your eligibility and apply
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/eligibility">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {t("checkEligibility")} Now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/application-status">
                  <Clock className="h-4 w-4 mr-2" />
                  {t("trackApplication")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
