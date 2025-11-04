import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  MapIcon,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import type { SidebarConfig } from "~/lib/sidebar-types";

// Default sidebar configuration used by AppSidebar.
// Layouts can provide their own configs by passing the `config` prop.
export const defaultSidebarConfig: SidebarConfig = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  main: {
    label: "Platform",
    items: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          { title: "History", url: "#" },
          { title: "Starred", url: "#" },
          { title: "Settings", url: "#" },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          { title: "Genesis", url: "#" },
          { title: "Explorer", url: "#" },
          { title: "Quantum", url: "#" },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          { title: "Introduction", url: "#" },
          { title: "Get Started", url: "#" },
          { title: "Tutorials", url: "#" },
          { title: "Changelog", url: "#" },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          { title: "General", url: "#" },
          { title: "Team", url: "#" },
          { title: "Billing", url: "#" },
          { title: "Limits", url: "#" },
        ],
      },
    ],
  },
  projects: {
    label: "Projects",
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: MapIcon,
      },
    ],
  },
};

// Example alternative config for a second layout (e.g., Admin)
export const adminSidebarConfig: SidebarConfig = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  main: {
    label: "Admin Panel",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: PieChart,
      },
      {
        title: "Users",
        url: "/users",
        icon: Bot,
        items: [
          { title: "All Users", url: "/users" },
          { title: "Invite", url: "/users/invite" },
        ],
      },
      {
        title: "Settings",
        url: "/settings",
        icon: Settings2,
      },
    ],
  },
  projects: {
    label: "Organizations",
    projects: [
      {
        name: "Acme Inc",
        url: "/orgs/acme",
        icon: Frame,
      },
    ],
  },
};
