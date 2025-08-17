import { useContext, type ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthContext } from "../states/app-state/auth-context";
import PageLoading from "../components/page-loading";
import { Navigate } from "react-router";
import React from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  breadcrumbItems?: { label: string; href?: string; isCurrent?: boolean }[];
}

export default function DashboardLayout({
  children,
  breadcrumbItems,
}: DashboardLayoutProps) {
  const state = useContext(AuthContext);

  if (state.loading) {
    return <PageLoading />;
  }

  if (!state.user) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

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
          <Breadcrumb>
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
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
