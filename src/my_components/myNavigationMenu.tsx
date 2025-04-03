"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import GoogleButton from "../../firebase/googleButton"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState, useEffect } from "react"

const listingComponents: { title: string; href: string }[] = [
  {
    title: "Profile",
    href: "/listing/info",
  },
  {
    title: "Have Cards",
    href: "/listing/have-cards",
  },
  {
    title: "Want Cards",
    href: "/listing/want-cards",
  },
]

const requestsComponents: { title: string; href: string }[] = [
  {
    title: "Inbox",
    href: "/requests/inbox",
  },
  {
    title: "Sent",
    href: "/requests/sent",
  },
]

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-2 sm:p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-xs sm:text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-xs sm:text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

// Mobile navigation component
function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <nav className="flex flex-col gap-4 mt-8">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-sm font-medium px-2 py-1 rounded-md hover:bg-accent"
          >
            Home
          </Link>

          <div>
            <h4 className="font-medium mb-1 px-2">Requests</h4>
            <ul className="pl-4 space-y-1">
              {requestsComponents.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm px-2 py-1 block rounded-md hover:bg-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/trade"
            onClick={() => setOpen(false)}
            className="text-sm font-medium px-2 py-1 rounded-md hover:bg-accent"
          >
            Trade
          </Link>

          <div>
            <h4 className="font-medium mb-1 px-2">My Listing</h4>
            <ul className="pl-4 space-y-1">
              {listingComponents.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-sm px-2 py-1 block rounded-md hover:bg-accent"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default function MyNavigationMenu() {
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex justify-between items-center w-full p-1 sm:p-2">
      {/* Left section - Home on desktop, hamburger on mobile */}
      <div className="flex items-center">
        <MobileNav />
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-xs sm:text-sm md:text-base")}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Middle section - hidden on mobile, visible on md screens and up */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
                Requests
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[100px] sm:w-[120px] gap-1 p-1">
                  {requestsComponents.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/trade" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2",
                  )}
                >
                  Trade
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
                My Listing
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-[120px] sm:w-[140px] gap-1 p-1">
                  {listingComponents.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Right section - GoogleButton */}
      <div className="flex">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <GoogleButton />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}