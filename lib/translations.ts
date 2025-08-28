export interface Translations {
  // Navigation
  home: string
  schemes: string
  eligibility: string
  applicationStatus: string
  faq: string
  contact: string

  // Home page
  welcomeTitle: string
  welcomeSubtitle: string
  searchPlaceholder: string
  searchButton: string
  featuredSchemes: string
  quickActions: string
  checkEligibility: string
  applyScheme: string
  trackApplication: string
  browseSchemes: string

  // Common actions
  apply: string
  viewDetails: string
  learnMore: string
  submit: string
  cancel: string
  next: string
  previous: string

  // Scheme details
  overview: string
  eligibilityCriteria: string
  benefits: string
  documents: string
  applicationProcess: string
  deadline: string
  beneficiaries: string
  budget: string

  // Footer
  aboutUs: string
  privacyPolicy: string
  termsOfService: string
  helpSupport: string
  contactUs: string
  followUs: string
}

export const translations: Record<string, Translations> = {
  en: {
    // Navigation
    home: "Home",
    schemes: "Schemes",
    eligibility: "Eligibility",
    applicationStatus: "Application Status",
    faq: "FAQ",
    contact: "Contact",

    // Home page
    welcomeTitle: "Welcome to E-Governance Portal",
    welcomeSubtitle: "Discover and apply for government schemes designed for your needs",
    searchPlaceholder: "Search for schemes...",
    searchButton: "Search",
    featuredSchemes: "Featured Schemes",
    quickActions: "Quick Actions",
    checkEligibility: "Check Eligibility",
    applyScheme: "Apply for Scheme",
    trackApplication: "Track Application",
    browseSchemes: "Browse All Schemes",

    // Common actions
    apply: "Apply",
    viewDetails: "View Details",
    learnMore: "Learn More",
    submit: "Submit",
    cancel: "Cancel",
    next: "Next",
    previous: "Previous",

    // Scheme details
    overview: "Overview",
    eligibilityCriteria: "Eligibility Criteria",
    benefits: "Benefits",
    documents: "Documents",
    applicationProcess: "Application Process",
    deadline: "Deadline",
    beneficiaries: "Beneficiaries",
    budget: "Budget",

    // Footer
    aboutUs: "About Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    helpSupport: "Help & Support",
    contactUs: "Contact Us",
    followUs: "Follow Us",
  },
  ta: {
    // Navigation
    home: "முகப்பு",
    schemes: "திட்டங்கள்",
    eligibility: "தகுதி",
    applicationStatus: "விண்ணப்ப நிலை",
    faq: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    contact: "தொடர்பு",

    // Home page
    welcomeTitle: "மின் ஆட்சி போர்ட்டலுக்கு வரவேற்கிறோம்",
    welcomeSubtitle: "உங்கள் தேவைகளுக்காக வடிவமைக்கப்பட்ட அரசு திட்டங்களைக் கண்டறிந்து விண்ணப்பிக்கவும்",
    searchPlaceholder: "திட்டங்களைத் தேடுங்கள்...",
    searchButton: "தேடு",
    featuredSchemes: "சிறப்பு திட்டங்கள்",
    quickActions: "விரைவு செயல்கள்",
    checkEligibility: "தகுதியைச் சரிபார்க்கவும்",
    applyScheme: "திட்டத்திற்கு விண்ணப்பிக்கவும்",
    trackApplication: "விண்ணப்பத்தைக் கண்காணிக்கவும்",
    browseSchemes: "அனைத்து திட்டங்களையும் பார்க்கவும்",

    // Common actions
    apply: "விண்ணப்பிக்கவும்",
    viewDetails: "விவரங்களைப் பார்க்கவும்",
    learnMore: "மேலும் அறிக",
    submit: "சமர்ப்பிக்கவும்",
    cancel: "ரத்து செய்",
    next: "அடுத்து",
    previous: "முந்தைய",

    // Scheme details
    overview: "கண்ணோட்டம்",
    eligibilityCriteria: "தகுதி அளவுகோல்கள்",
    benefits: "நன்மைகள்",
    documents: "ஆவணங்கள்",
    applicationProcess: "விண்ணப்ப செயல்முறை",
    deadline: "கடைசி தேதி",
    beneficiaries: "பயனாளிகள்",
    budget: "பட்ஜெட்",

    // Footer
    aboutUs: "எங்களைப் பற்றி",
    privacyPolicy: "தனியுரிமைக் கொள்கை",
    termsOfService: "சேவை விதிமுறைகள்",
    helpSupport: "உதவி மற்றும் ஆதரவு",
    contactUs: "எங்களைத் தொடர்பு கொள்ளுங்கள்",
    followUs: "எங்களைப் பின்தொடருங்கள்",
  },
}

export function getTranslation(key: keyof Translations, language: string): string {
  return translations[language]?.[key] || translations.en[key] || key
}
