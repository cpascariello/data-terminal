import {
  Server,
  Cpu,
  Database,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { FadeIn, GlowLine } from "@/atoms";
import {
  DataTable,
  ProcessCard,
  Section,
  SectionHeading,
  StatCard,
  TerminalCard,
  TerminalPrompt,
  TerminalTabs,
  TerminalWindow,
} from "@/molecules";

export function DataDisplayTab() {
  return (
    <>
      {/* Terminal Cards */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Components composed from atoms with layout and behavior.">
          Molecules
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TerminalCard tag="SVC:COMPUTE" label="cluster_01">
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Edge Computing
                </h3>
                <p className="mt-2 text-sm text-foreground/50">
                  Distributed compute nodes processing data at the network edge
                  with sub-millisecond latency.
                </p>
              </div>
            </TerminalCard>

            <TerminalCard tag="SVC:STORAGE" label="vault_07">
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Data Vault
                </h3>
                <p className="mt-2 text-sm text-foreground/50">
                  Encrypted distributed storage with automatic replication
                  across three geographic zones.
                </p>
              </div>
            </TerminalCard>

            <TerminalCard tag="SVC:NETWORK" label="mesh_03">
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-foreground">
                  Neural Mesh
                </h3>
                <p className="mt-2 text-sm text-foreground/50">
                  Self-healing network fabric with adaptive routing and
                  zero-trust authentication at every hop.
                </p>
              </div>
            </TerminalCard>
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* Stats Section */}
      <Section spacing="lg" glow>
        <SectionHeading subtitle="System telemetry and performance metrics.">
          System Stats
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard to={99.97} suffix="%" decimals={2} label="UPTIME_SCORE" />
            <StatCard to={847} suffix="ms" label="AVG_RESPONSE_TIME" />
            <StatCard to={12} suffix="M+" label="REQUESTS_DAILY" />
            <StatCard to={256} label="ACTIVE_NODES" />
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* Process Cards */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Active system processes and their current state.">
          Processes
        </SectionHeading>

        <FadeIn>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <ProcessCard
              pid="001"
              title="Data Ingestion"
              description="Real-time data pipeline processing streaming events from distributed sensors and APIs."
              icon={<Database size={24} />}
            />
            <ProcessCard
              pid="002"
              title="Compute Engine"
              description="Parallel processing engine for running analytical workloads across the cluster."
              icon={<Cpu size={24} />}
            />
            <ProcessCard
              pid="003"
              title="Security Monitor"
              description="Continuous threat detection and automated response across all network endpoints."
              icon={<Shield size={24} />}
            />
            <ProcessCard
              pid="004"
              title="Edge Relay"
              description="Low-latency relay nodes for distributing processed data to edge consumers."
              icon={<Zap size={24} />}
            />
            <ProcessCard
              pid="005"
              title="API Gateway"
              description="Unified entry point handling authentication, rate limiting, and request routing."
              icon={<Globe size={24} />}
            />
            <ProcessCard
              pid="006"
              title="Cluster Manager"
              description="Orchestration layer managing node health, scaling, and workload distribution."
              icon={<Server size={24} />}
            />
          </div>
        </FadeIn>
      </Section>

      <GlowLine />

      {/* Boot Sequence */}
      <Section spacing="lg">
        <SectionHeading subtitle="System initialization and startup sequence.">
          Boot Sequence
        </SectionHeading>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TerminalWindow
            label="step_1"
            command="init --system-check"
            output={[
              "checking hardware...",
              "memory: 256GB OK",
              "cpu: 64 cores OK",
              "network: 10Gbps OK",
            ]}
          />
          <TerminalWindow
            label="step_2"
            command="load --config production"
            output={[
              "loading config...",
              "environment: production",
              "region: us-east-1",
              "cluster: primary",
            ]}
          />
          <TerminalWindow
            label="step_3"
            command="connect --mesh all"
            output={[
              "connecting to mesh...",
              "nodes discovered: 256",
              "handshake: complete",
              "status: ONLINE",
            ]}
          />
        </div>
      </Section>

      <GlowLine />

      {/* Terminal Tabs */}
      <Section spacing="lg" dotGrid>
        <SectionHeading subtitle="Tabbed content with glitch transitions.">
          Terminal Tabs
        </SectionHeading>

        <div className="mt-12">
          <TerminalTabs
            tabs={[
              {
                label: "LOGS",
                content: (
                  <div className="space-y-1 font-display text-sm text-foreground/60">
                    <div>[00:12:34] Connection established</div>
                    <div>[00:12:35] Authenticating...</div>
                    <div>[00:12:35] Session initialized</div>
                    <div>[00:12:36] Ready for input</div>
                  </div>
                ),
              },
              {
                label: "METRICS",
                content: (
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard to={99.9} suffix="%" decimals={1} label="UPTIME" />
                    <StatCard to={42} suffix="ms" label="LATENCY" />
                  </div>
                ),
              },
              {
                label: "CONFIG",
                content: (
                  <div className="space-y-1 font-display text-sm text-foreground/60">
                    <div>region: us-east-1</div>
                    <div>cluster: production</div>
                    <div>replicas: 3</div>
                    <div>auto_scale: true</div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Section>

      <GlowLine />

      {/* Data Table */}
      <Section spacing="lg">
        <SectionHeading subtitle="Sortable data grid for system records.">
          Data Table
        </SectionHeading>

        <div className="mt-12">
          <DataTable
            columns={[
              { key: "pid", label: "PID", sortable: true },
              { key: "name", label: "Process", sortable: true },
              { key: "cpu", label: "CPU %", sortable: true },
              { key: "status", label: "Status" },
            ]}
            rows={[
              { pid: "001", name: "data-ingestion", cpu: "12.4", status: "running" },
              { pid: "002", name: "compute-engine", cpu: "45.2", status: "running" },
              { pid: "003", name: "security-monitor", cpu: "3.1", status: "idle" },
              { pid: "004", name: "edge-relay", cpu: "28.7", status: "running" },
              { pid: "005", name: "api-gateway", cpu: "8.9", status: "running" },
            ]}
          />
        </div>
      </Section>

      <GlowLine />

      {/* Terminal Prompt */}
      <Section spacing="lg">
        <SectionHeading subtitle="Terminal prompt for CTA displays.">
          Terminal Prompt
        </SectionHeading>
        <div className="mt-12 max-w-xl">
          <TerminalPrompt command="npx create-data-terminal my-project" />
        </div>
      </Section>
    </>
  );
}
