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

const listingComponents: { title: string; href: string }[] = [
  {
    title: "Have Cards",
    href: "/listing/have-cards",
  },
  {
    title: "Want Cards",
    href: "/listing/want-cards",
  },
  {
    title: "Info",
    href: "/listing/info",
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
  }
]

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

export default function MyNavigationMenu() {
  return (
    <div className="flex justify-between items-center w-full">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Requests</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-20 gap-1 p-1">
                {requestsComponents.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu className="flex-1 justify-end">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Listing</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-28 gap-1 p-1">
                {listingComponents.map((component) => (
                  <ListItem key={component.title} title={component.title} href={component.href}></ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/trade" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Trade</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/signin" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sign In</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

