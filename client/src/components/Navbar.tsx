
import { useState } from "react"
import { Menu, Package, Search, Bell, X  } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link } from "react-router-dom"

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
              <Link to="/">
              <Package className="h-5 w-5 text-white" />
              </Link>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Smart Inventory
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Management System</p>
            </div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent sm:hidden">
              Inventory
            </h1>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden flex-1 max-w-md mx-8 md:flex">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <Input
              placeholder="Search inventory..."
              className="pl-12 pr-4 h-10 bg-white/60 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-xl shadow-sm"
            />
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center space-x-3 md:flex">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-xl hover:bg-purple-50 transition-all duration-200"
          >
            <Bell className="h-4 w-4 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-600 border-0 shadow-lg">
              3
            </Badge>
          </Button>
          <div className="px-4 py-2 hover:bg-slate-700 rounded transition-colors">
  <Link to="/simulate" className="text-black hover:text-white font-medium">
    Simulate
  </Link>
</div>
<div className="px-4 py-2 hover:bg-slate-700 rounded transition-colors">
  <Link to="/allproducts" className="text-black hover:text-white font-medium">
    Products
  </Link>
</div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-purple-50 transition-all duration-200"
              >
                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white/95 backdrop-blur-md border-white/20 shadow-xl rounded-xl"
            >
              <DropdownMenuLabel className="text-gray-700">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="hover:bg-purple-50 rounded-lg mx-1 text-gray-700">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-50 rounded-lg mx-1 text-gray-700">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-purple-50 rounded-lg mx-1 text-gray-700">
                <HelpCircle className="mr-2 h-4 w-4" />
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="hover:bg-red-50 rounded-lg mx-1 text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center space-x-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="h-10 w-10 rounded-xl hover:bg-purple-50 transition-all duration-200"
          >
            {isSearchOpen ? <X className="h-4 w-4 text-gray-600" /> : <Search className="h-4 w-4 text-gray-600" />}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-xl hover:bg-purple-50 transition-all duration-200"
              >
                <Menu className="h-4 w-4 text-gray-600" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 border-l border-white/20"
            >
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Header */}
                <div className="flex items-center space-x-3 pb-6 border-b border-white/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg">
                    <Package className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800">Smart Inventory</h2>
                    <p className="text-sm text-gray-600">Management System</p>
                    
                  </div>
                  
                </div>

                {/* Mobile Menu Items */}
                <div className="space-y-3">
                  <Link to="/simulate">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 rounded-xl hover:bg-white/60 backdrop-blur-sm transition-all duration-200 text-gray-700"
                  >
                    <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg mr-3">
                      
                    </div>
                    Simulate
                  </Button>
                  </Link>
                  <Link to="/allproducts">
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 rounded-xl hover:bg-white/60 backdrop-blur-sm transition-all duration-200 text-gray-700"
                  >
                    <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg mr-3">
                      
                    </div>
                    Products
                  </Button>
                  </Link>
                </div>
              

                {/* Mobile Logout */}
                {/* <div className="pt-6 border-t border-white/30">
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl bg-white/60 backdrop-blur-sm border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="border-t border-white/20 bg-white/60 backdrop-blur-md px-4 py-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <Input
              placeholder="Search inventory..."
              className="pl-12 pr-4 h-10 bg-white/80 backdrop-blur-sm border-purple-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-200 rounded-xl shadow-sm"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
