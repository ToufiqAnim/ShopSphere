"use client";

import { useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const categories = [
  {
    name: "Clothing",
    href: "/category/clothing",
    featured: ["T-shirts", "Hoodies", "Pants"],
  },
  {
    name: "Electronics",
    href: "/category/electronics",
    featured: ["Phones", "Laptops", "Accessories"],
  },
  {
    name: "Home",
    href: "/category/home",
    featured: ["Furniture", "Decor", "Kitchen"],
  },
  { name: "Sale", href: "/sale", featured: [] },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu and logo */}
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open mobile menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-6 mt-6">
                  <Link href="/" className="text-xl font-bold">
                    ShopSphere
                  </Link>
                  {categories.map((category) => (
                    <div key={category.name} className="space-y-3">
                      <Link
                        href={category.href}
                        className="text-lg font-medium hover:text-primary"
                      >
                        {category.name}
                      </Link>
                      {category.featured.length > 0 && (
                        <ul className="ml-4 space-y-2">
                          {category.featured.map((item) => (
                            <li key={item}>
                              <Link
                                href={`${category.href}/${item.toLowerCase()}`}
                                className="text-sm text-muted-foreground hover:text-primary"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <Link
                      href="/account"
                      className="flex items-center gap-2 text-sm"
                    >
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                    <Link
                      href="/cart"
                      className="flex items-center gap-2 text-sm mt-4"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Cart
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="ml-4 md:ml-0">
              <span className="text-xl font-bold">ShopSphere</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <NavigationMenu>
              <NavigationMenuList>
                {categories.map((category) => (
                  <NavigationMenuItem key={category.name}>
                    {category.featured.length > 0 ? (
                      <>
                        <NavigationMenuTrigger>
                          {category.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="grid w-[400px] gap-3 p-4">
                            <div>
                              <Link
                                href={category.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">
                                  Shop all {category.name}
                                </div>
                              </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              {category.featured.map((item) => (
                                <Link
                                  key={item}
                                  href={`${category.href}/${item.toLowerCase()}`}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {item}
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link href={category.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {category.name}
                        </NavigationMenuLink>
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search and account */}
          <div className="flex items-center gap-2">
            <Form
              className="flex items-center gap-2 max-w-lg mx-auto"
              action="/search"
            >
              <Input
                type="search"
                name="query"
                placeholder="Search products..."
                className="flex-1 hidden"
                autoFocus
                aria-label="Search products"
              />
            </Form>

            <Link href="/account" className="hidden md:block">
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/cart">
              <Button variant="ghost" size="icon" aria-label="Shopping cart">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
