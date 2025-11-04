"use client";

import type * as React from "react";

import { NavMain } from "~/components/sidebar/nav-main";
import { NavProjects } from "~/components/sidebar/nav-projects";
import { NavUser } from "~/components/sidebar/nav-user";
import { TeamSwitcher } from "~/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { defaultSidebarConfig } from "~/lib/sidebar-config";
import type { SidebarConfig } from "~/lib/sidebar-types";

export type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  config?: SidebarConfig;
};

export function AppSidebar({
  config = defaultSidebarConfig,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={config.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={config.main.items} label={config.main.label} />
        <NavProjects
          label={config.projects.label}
          projects={config.projects.projects}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={{ ...config.user, avatar: config.user.avatar ?? "" }} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
