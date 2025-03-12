"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getAuth } from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { app } from "../../../../firebase/firebaseConfig"

const auth = getAuth();
const db = getFirestore(app)

const formSchema = z.object({
    friendCode: z
    .string()
    .regex(/^(\d{4}-){3}\d{4}$|^\d{16}$/, {
        message: "Friend code must be in the format ####-####-####-#### or ################",
    }),
    discord: z.string().length(18, {
        message: "Your ID should be 18 digits long."
    }).regex(/^\d+$/, {
        message: "Your ID should contain only numbers.",
    }).optional(),
    listingNote: z
        .string()
        .max(500, {
        message: "Note cannot exceed 500 characters.",
        })
        .optional(),
})

export default function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        friendCode: "",
        discord: "",
        listingNote: "",
    },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const user = auth.currentUser;
        if (user) {
            const tsRef = doc(db, 'users', user.uid);
            await setDoc(tsRef, { 
                friendCode: values.friendCode,
                discord: values.discord,
                note: values.listingNote
            }, { merge: true })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <FormDescription>(Optional) This note will be displayed on your listing and trade requests. Max 500 characters.</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}