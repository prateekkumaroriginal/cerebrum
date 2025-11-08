"use client";

import {
  CreditCardIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  StarIcon
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useHasActiveSubscription } from "@/features/subscriptions/hooks/use-subscription";
import { useQueryClient } from "@tanstack/react-query";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows"
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials"
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions"
      }
    ]
  }
]

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { hasActiveSubscription, isLoading } = useHasActiveSubscription();
  const queryClient = useQueryClient();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                prefetch
                className="h-10 px-4 gap-x-4"
              >
                <Image
                  src="/logos/logo.svg"
                  alt="Cerebrum Logo"
                  height={30}
                  width={30}
                />
                <span className="font-semibold">Cerebrum</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      className="gap-x-4 h-10 px-4"
                      asChild
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4 align-middle" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {!hasActiveSubscription && !isLoading && (
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Upgrade to Pro"
                className="gap-x-4 h-10 px-4"
                onClick={() => authClient.checkout({ slug: "cerebrum-pro" })}
              >
                <StarIcon className="size-4" />
                <span>Upgrade to Pro</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-4"
              onClick={() => authClient.customer.portal()}
            >
              <CreditCardIcon className="size-4" />
              <span>Billing Portal</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="gap-x-4 h-10 px-4"
              onClick={() => authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                    queryClient.invalidateQueries();
                  }
                }
              })}
            >
              <LogOutIcon className="size-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;