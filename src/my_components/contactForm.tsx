"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  })

  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: false,
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ ...status, submitting: true })

    try {
      const response = await fetch("https://formspree.io/f/mnnpgbpg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          category: formData.category,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New contact form submission: ${formData.category}`,
        }),
      })

      if (response.ok) {
        setStatus({
          submitted: true,
          submitting: false,
          error: false,
          message: "Thank you! Your message has been sent successfully.",
        })
        setFormData({
          name: "",
          email: "",
          category: "",
          message: "",
        })
      } else {
        const data = await response.json()
        throw new Error(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        error: true,
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto bg-white border-black shadow-md">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-black">Contact Us</CardTitle>
        <CardDescription className="text-gray-600">
          Fill out the form below to send us a message. We'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white text-black pt-6">
        {status.submitted ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Success!</AlertTitle>
            <AlertDescription className="text-green-700">{status.message}</AlertDescription>
          </Alert>
        ) : status.error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{status.message}</AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-black font-medium">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="border-gray-300 focus:border-gray-500 bg-white text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your-email@example.com"
                required
                className="border-gray-300 focus:border-gray-500 bg-white text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="text-black font-medium">
                Category
              </Label>
              <Select value={formData.category} onValueChange={handleSelectChange} required>
                <SelectTrigger id="category" className="border-gray-300 focus:border-gray-500 bg-white text-black">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black border-gray-300">
                  <SelectItem value="Feedback" className="hover:bg-gray-100 transition-colors">
                    Feedback
                  </SelectItem>
                  <SelectItem value="Suggestions" className="hover:bg-gray-100 transition-colors">
                    Suggestions
                  </SelectItem>
                  <SelectItem value="Bugs/Issues" className="hover:bg-gray-100 transition-colors">
                    Bugs/Issues
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-black font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                className="min-h-[120px] border-gray-300 focus:border-gray-500 bg-white text-black"
                required
              />
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-end bg-white border-t border-gray-200 pt-4">
        {!status.submitted && (
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={status.submitting}
            className="bg-black hover:bg-gray-800 text-white transition-colors"
          >
            {status.submitting ? "Sending..." : "Send Message"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

