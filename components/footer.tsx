import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
                <span className="text-sm font-bold">eG</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-primary">eGov Portal</span>
                <span className="text-xs text-muted-foreground">Government of India</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your gateway to government schemes and services. Empowering citizens with easy access to benefits and
              opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/schemes"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Schemes
              </Link>
              <Link
                href="/eligibility"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Check Eligibility
              </Link>
              <Link
                href="/application-status"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Track Application
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help & FAQ
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <div className="space-y-2">
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@egov.gov.in</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>
                  Ministry of Electronics & IT
                  <br />
                  New Delhi, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Government of India. All rights reserved. | Last updated: December 2024
          </p>
        </div>
      </div>
    </footer>
  )
}
