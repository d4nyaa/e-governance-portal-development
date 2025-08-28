"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accessibility, Type, Volume2, Contrast, ZoomIn, ZoomOut, RotateCcw, X } from "lucide-react"

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [screenReader, setScreenReader] = useState(false)

  useEffect(() => {
    // Apply font size changes
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    // Apply high contrast mode
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  const increaseFontSize = () => {
    if (fontSize < 150) {
      setFontSize(fontSize + 10)
    }
  }

  const decreaseFontSize = () => {
    if (fontSize > 80) {
      setFontSize(fontSize - 10)
    }
  }

  const resetSettings = () => {
    setFontSize(100)
    setHighContrast(false)
    setScreenReader(false)
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-IN"
      speechSynthesis.speak(utterance)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg"
        size="sm"
        aria-label="Open accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 shadow-lg">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Accessibility className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Accessibility Options</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} aria-label="Close accessibility panel">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Font Size Controls */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Type className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Text Size</span>
          </div>
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={decreaseFontSize}
              disabled={fontSize <= 80}
              aria-label="Decrease font size"
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{fontSize}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={increaseFontSize}
              disabled={fontSize >= 150}
              aria-label="Increase font size"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* High Contrast */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Contrast className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">High Contrast</span>
            </div>
            <Button
              variant={highContrast ? "default" : "outline"}
              size="sm"
              onClick={() => setHighContrast(!highContrast)}
              aria-label={highContrast ? "Disable high contrast" : "Enable high contrast"}
            >
              {highContrast ? "ON" : "OFF"}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Screen Reader */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Screen Reader</span>
            </div>
            <Button
              variant={screenReader ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setScreenReader(!screenReader)
                if (!screenReader) {
                  speakText("Screen reader enabled. Navigate through the page using tab key.")
                }
              }}
              aria-label={screenReader ? "Disable screen reader" : "Enable screen reader"}
            >
              {screenReader ? "ON" : "OFF"}
            </Button>
          </div>
        </div>

        <Separator />

        {/* Reset Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={resetSettings}
          className="w-full bg-transparent"
          aria-label="Reset all accessibility settings"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset Settings
        </Button>

        {/* Keyboard Navigation Help */}
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <strong>Keyboard Navigation:</strong>
          </p>
          <p>• Tab: Navigate forward</p>
          <p>• Shift+Tab: Navigate backward</p>
          <p>• Enter/Space: Activate buttons</p>
          <p>• Esc: Close dialogs</p>
        </div>
      </CardContent>
    </Card>
  )
}
