"use client";

import { GlowLine } from "@/atoms";
import { Navbar, Section, SectionHeading, Sidebar } from "@/molecules";
import {
  LayoutDashboard,
  Monitor,
  Activity,
  FileText,
  Settings,
  Database,
  Cpu,
  Shield,
  Terminal,
} from "lucide-react";
import type { NavItem } from "@/types/nav";

const NAVBAR_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard" },
  {
    id: "systems",
    label: "Systems",
    children: [
      { id: "sys-compute", label: "Compute", icon: <Cpu size={14} /> },
      { id: "sys-database", label: "Database", icon: <Database size={14} /> },
      { id: "sys-network", label: "Network", icon: <Shield size={14} /> },
    ],
  },
  { id: "reports", label: "Reports" },
  { id: "settings", label: "Settings" },
];

const SIDEBAR_ITEMS: NavItem[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  {
    id: "monitoring",
    label: "Monitoring",
    icon: <Monitor size={18} />,
    children: [
      { id: "mon-metrics", label: "Metrics", icon: <Activity size={14} /> },
      { id: "mon-logs", label: "Logs", icon: <FileText size={14} /> },
      { id: "mon-alerts", label: "Alerts", icon: <Shield size={14} /> },
    ],
  },
  { id: "terminal", label: "Terminal", icon: <Terminal size={18} /> },
  { id: "config", label: "Config", icon: <Settings size={18} /> },
];

export function NavigationTab() {
  return (
    <>
      {/* Navbar demo */}
      <Section spacing="lg">
        <SectionHeading subtitle="Horizontal navigation with dropdown menus.">
          Navbar
        </SectionHeading>

        <div className="mt-12 overflow-hidden border border-border">
          <Navbar
            items={NAVBAR_ITEMS}
            defaultActiveId="dashboard"
            logo={
              <span className="font-display text-sm tracking-wider text-accent">
                SYSTEM_CTRL
              </span>
            }
            actions={
              <span className="font-display text-[10px] tracking-wider text-foreground/30">
                v2.4.1
              </span>
            }
          />
        </div>
      </Section>

      <GlowLine />

      {/* Sidebar demo */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Vertical navigation with collapsible icon rail.">
          Sidebar
        </SectionHeading>

        <div className="mt-12 flex gap-8">
          {/* Expanded sidebar */}
          <div className="h-[420px] overflow-hidden border border-border">
            <Sidebar
              items={SIDEBAR_ITEMS}
              defaultActiveId="overview"
              header={{
                logo: (
                  <span className="font-display text-sm tracking-wider text-accent">
                    DATA_TERM
                  </span>
                ),
                collapsedLogo: (
                  <span className="font-display text-xs text-accent">DT</span>
                ),
              }}
            />
          </div>

          {/* Collapsed sidebar */}
          <div className="h-[420px] overflow-hidden border border-border">
            <Sidebar
              items={SIDEBAR_ITEMS}
              defaultActiveId="overview"
              defaultCollapsed
              header={{
                logo: (
                  <span className="font-display text-sm tracking-wider text-accent">
                    DATA_TERM
                  </span>
                ),
                collapsedLogo: (
                  <span className="font-display text-xs text-accent">DT</span>
                ),
              }}
            />
          </div>
        </div>
      </Section>
    </>
  );
}
