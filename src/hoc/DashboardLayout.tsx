import { type ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import PageLoading from "../components/page-loading";
import { Link, Navigate } from "react-router";
import React from "react";
import { Button } from "../components/ui/button";
import { UserCircle } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthState } from "../states/auth-state/use-auth-state";

interface DashboardLayoutProps {
  children: ReactNode;
  breadcrumbItems?: { label: string; href?: string; isCurrent?: boolean }[];
}

export default function DashboardLayout({
  children,
  breadcrumbItems,
}: DashboardLayoutProps) {
  const { state, userLogout } = useAuthState();

  if (state.loading) {
    return <PageLoading />;
  }

  if (!state.user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      const result = await signOut(auth);
      console.log("🚀 ~ handleLogout ~ result:", result);
      userLogout();
      // navigate("/login");
      // Optionally, clear any app state or context here
      // window.location.href = "/login"; // or use navigate("/login") if using react-router
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally, show an error message to the user
    }
  };

  // Ensure that the breadcrumbItems prop is optional

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb className="flex-grow">
            <BreadcrumbList>
              {breadcrumbItems?.map((item, idx) =>
                item.isCurrent ? (
                  <BreadcrumbItem
                    key={idx + item.label}
                    className="hidden md:block"
                  >
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <React.Fragment key={idx + item.label}>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href={item.href || "#"}>
                        {item.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </React.Fragment>
                )
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size={"icon"} className="ml-auto">
                <UserCircle className="size-6 text-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/my-account">My Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
