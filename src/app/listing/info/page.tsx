"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../../../../firebase/firebaseConfig"
import { useContext, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { UserContext } from "../../../../contexts/UserContext"
import { CheckCircle } from "lucide-react"

const db = getFirestore(app)

const formSchema = z.object({
  friendCode: z.string().regex(/^(\d{4}-){3}\d{4}$|^\d{16}$/, {
    message: "Friend code must be in the format ####-####-####-#### or ################",
  }),
  discord: z
    .string()
    .length(18, {
      message: "Your ID should be 18 digits long.",
    })
    .regex(/^\d+$/, {
      message: "Your ID should contain only numbers.",
    })
    .optional(),
  listingNote: z
    .string()
    .max(500, {
      message: "Note cannot exceed 500 characters.",
    })
    .optional(),
})

export default function ProfileForm() {
  const { user } = useContext(UserContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      friendCode: "",
      discord: "",
      listingNote: "",
    },
  })

  useEffect(() => {
    if (user) {
      const infoRef = doc(db, "users", user.uid)
      const fetchInfo = async () => {
        setIsLoading(true)
        try {
          const docSnap = await getDoc(infoRef)
          if (docSnap.exists()) {
            const info = docSnap.data()
            form.reset({
              friendCode: info.friendCode || "",
              discord: info.discord || "",
              listingNote: info.note || "",
            })
          }
        } catch (error) {
          console.error("Error fetching user data:", error)
        } finally {
          setIsLoading(false)
        }
      }
      fetchInfo()
    }
  }, [user, form])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (user) {
      setIsSubmitting(true)
      setSubmitSuccess(false)
      try {
        const tsRef = doc(db, "users", user.uid)
        await setDoc(
          tsRef,
          {
            friendCode: values.friendCode,
            discord: values.discord,
            note: values.listingNote,
          },
          { merge: true },
        )
        setSubmitSuccess(true)
      } catch (error) {
        console.error("Error updating profile:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (user) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-10 w-fit mx-auto">
          <FormField
            control={form.control}
            name="friendCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Friend Code</FormLabel>
                <FormControl>
                  <Input placeholder="####-####-####-####" {...field} />
                </FormControl>
                <FormDescription>Your in-game friend ID.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discord"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discord ID</FormLabel>
                <FormControl>
                  <Input placeholder="##################" {...field} />
                </FormControl>
                <FormDescription>(Optional) Your 18-digit user ID.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="listingNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea placeholder="Other socials, trade details, etc..." className="min-h-[120px]" {...field} />
                </FormControl>
                <FormDescription>
                  (Optional) This note will be displayed on your listing and trade requests. Max 500 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-2">
            <Button type="submit" disabled={isSubmitting || isLoading} className="w-full">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {submitSuccess && (
              <div className="text-green-500 text-center font-medium flex items-center justify-center gap-1.5">
                <CheckCircle className="h-4 w-4" />
                Info submitted successfully!
              </div>
            )}
          </div>
        </form>
      </Form>
    )
  }

  return (
    <Card className="p-5 pr-20 pl-20 w-fit mx-auto mt-20">
      <h1 className="justify-self-center text-4xl mt-10 font-mono">Not signed in.</h1>
      <p className="justify-self-center text-s font-mono italic text-gray-500 mt-5 mb-10">
        Please sign in to edit your listing information
      </p>
    </Card>
  )
}