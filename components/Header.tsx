"use client";

import { useState } from "react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ShoppingCart, User, Search, X, Package } from "lucide-react";
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
import Form from "next/form";
import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
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
  const { user } = useUser();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false); /* 
  const handleCreatePasskey = async () => {
    const response = await user?.createPasskey();
    console.log(response);
    try {
    } catch (error) {
      console.log("Error:", JSON.stringify(error, null, 2));
    }
  }; */
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
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

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Form action="/search">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  name="query"
                  placeholder="Search products..."
                  className="w-full pl-9"
                  aria-label="Search products"
                />
              </Form>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Icon & Overlay */}
            <div className="md:hidden">
              {mobileSearchOpen ? (
                <div className="fixed inset-0 top-16 bg-white z-10 px-4 py-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Form action="/search">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="text"
                          name="query"
                          placeholder="Search products..."
                          className="w-full pl-9"
                          autoFocus
                          aria-label="Search products"
                        />
                      </Form>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileSearchOpen(false)}
                      aria-label="Close search"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileSearchOpen(true)}
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>

            <ClerkLoaded>
              <SignedIn>
                <Button variant="ghost" size="sm">
                  <Link
                    href="/orders"
                    className="flex-1 relative flex justify-center sm:justify-start
                sm:flex-none items—center space-x-2 bg-blue-500
                hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    <Package className="h-5 w-5" />
                    <span>My Orders</span>
                  </Link>
                </Button>
              </SignedIn>
            </ClerkLoaded>
            <ClerkLoaded>
              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <div className="hidden sm:block text-xs">
                    <p className="text-gray-400">Welcome Back</p>
                    <p className="font-bold">{user.fullName}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <SignInButton mode="modal" />
                  <Button variant="ghost" aria-label="user cart">
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              )}
              {/*        {user?.passkeys.length === 0 && (
                <button
                  onClick={handleCreatePasskey}
                  className="bg-white hover:bg-blue-700 hover:text-white text-blue-500  py-2 px-4 rounded border-blue-300 border"
                >
                  create a passkey
                </button>
              )} */}
            </ClerkLoaded>
            <Link href="/cart">
              <Button variant="ghost" aria-label="Shopping cart">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
