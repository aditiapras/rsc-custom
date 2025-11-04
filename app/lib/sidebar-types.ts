import type { LucideIcon } from "lucide-react"

// Sidebar configuration types to enable reusable, config-driven sidebars across layouts

export type NavSubItem = {
  title: string
  url: string
}

export type NavItem = {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: NavSubItem[]
}

export type ProjectItem = {
  name: string
  url: string
  icon: LucideIcon
}

export type UserSummary = {
  name: string
  email: string
  avatar?: string
}

export type TeamSummary = {
  name: string
  logo: LucideIcon
  plan: string
}

export type SidebarGroupMain = {
  label: string
  items: NavItem[]
}

export type SidebarGroupProjects = {
  label: string
  projects: ProjectItem[]
}

export type SidebarConfig = {
  user: UserSummary
  teams: TeamSummary[]
  main: SidebarGroupMain
  projects: SidebarGroupProjects
}