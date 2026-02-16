"use client";

import { useState } from "react";
import {
  DataStream,
  FadeIn,
  GlowLine,
  HudLabel,
  ProgressBar,
  Skeleton,
} from "@/atoms";
import {
  Accordion,
  Alert,
  Modal,
  Section,
  SectionHeading,
  Tooltip,
} from "@/molecules";
import { useToast } from "@/providers/toast-provider";
import { Button } from "@/molecules/button";

function ToastDemo() {
  const { addToast } = useToast();

  return (
    <div className="flex flex-wrap gap-3">
      <Button
        size="sm"
        variant="primary"
        onClick={() =>
          addToast({ message: "Process completed successfully.", variant: "success" })
        }
      >
        Success
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          addToast({ message: "New deployment queued.", variant: "info" })
        }
      >
        Info
      </Button>
      <Button
        size="sm"
        variant="secondary"
        onClick={() =>
          addToast({ message: "Memory usage at 92%.", variant: "warning" })
        }
      >
        Warning
      </Button>
      <Button
        size="sm"
        variant="danger"
        onClick={() =>
          addToast({ message: "Connection lost to node_042.", variant: "error" })
        }
      >
        Error
      </Button>
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="SYS:CONFIRM"
        size="sm"
      >
        <p className="font-display text-sm text-foreground/80">
          Are you sure you want to purge the cache? This action cannot be undone.
        </p>
        <div className="mt-6 flex gap-3">
          <Button size="sm" variant="danger" onClick={() => setOpen(false)}>
            Confirm Purge
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}

const accordionItems = [
  {
    id: "1",
    title: "What protocols are supported?",
    children: (
      <span>
        The terminal supports TCP/IP, UDP, WebSocket, and custom binary
        protocols over TLS 1.3. Legacy protocols can be enabled via config.
      </span>
    ),
  },
  {
    id: "2",
    title: "How do I configure multi-node sync?",
    children: (
      <span>
        Set the SYNC_NODES environment variable with a comma-separated list
        of node addresses. The system uses CRDT-based eventual consistency.
      </span>
    ),
  },
  {
    id: "3",
    title: "What are the resource requirements?",
    children: (
      <span>
        Minimum 2 CPU cores, 4GB RAM, 20GB storage per node. Recommended:
        4 cores, 8GB RAM for production workloads.
      </span>
    ),
  },
];

export function FeedbackTab() {
  return (
    <>
      {/* Alerts */}
      <Section spacing="lg">
        <SectionHeading subtitle="System messages and feedback indicators.">
          Alerts
        </SectionHeading>

        <div className="mt-12 space-y-4">
          <Alert variant="info">
            System update available. Run &apos;update --latest&apos; to
            install.
          </Alert>
          <Alert variant="success">
            Deployment complete. All 256 nodes reporting healthy.
          </Alert>
          <Alert variant="warning">
            Memory usage at 87%. Consider scaling compute resources.
          </Alert>
          <Alert variant="error" dismissible>
            Connection to node_042 lost. Automatic failover initiated.
          </Alert>
        </div>
      </Section>

      <GlowLine />

      {/* Toast Notifications */}
      <Section spacing="lg">
        <SectionHeading subtitle="Auto-dismissing notification toasts with variant styles.">
          Toast Notifications
        </SectionHeading>

        <div className="mt-12">
          <ToastDemo />
        </div>
      </Section>

      <GlowLine />

      {/* Modal */}
      <Section spacing="lg">
        <SectionHeading subtitle="Dialog overlay with focus trap and terminal chrome.">
          Modal
        </SectionHeading>

        <div className="mt-12">
          <ModalDemo />
        </div>
      </Section>

      <GlowLine />

      {/* Accordion */}
      <Section spacing="lg">
        <SectionHeading subtitle="Collapsible content sections for FAQ-style layouts.">
          Accordion
        </SectionHeading>

        <div className="mt-12 max-w-xl">
          <Accordion items={accordionItems} />
        </div>
      </Section>

      <GlowLine />

      {/* Tooltip */}
      <Section spacing="lg">
        <SectionHeading subtitle="Hover and focus tooltips with directional positioning.">
          Tooltip
        </SectionHeading>

        <div className="mt-12 flex flex-wrap gap-6">
          <Tooltip content="TOP TOOLTIP" position="top">
            <Button size="sm" variant="secondary">Hover Top</Button>
          </Tooltip>
          <Tooltip content="BOTTOM TOOLTIP" position="bottom">
            <Button size="sm" variant="secondary">Hover Bottom</Button>
          </Tooltip>
          <Tooltip content="LEFT TOOLTIP" position="left">
            <Button size="sm" variant="secondary">Hover Left</Button>
          </Tooltip>
          <Tooltip content="RIGHT TOOLTIP" position="right">
            <Button size="sm" variant="secondary">Hover Right</Button>
          </Tooltip>
        </div>
      </Section>

      <GlowLine />

      {/* Skeleton */}
      <Section spacing="lg">
        <SectionHeading subtitle="Loading placeholder components with scan animation.">
          Skeleton
        </SectionHeading>

        <div className="mt-12 max-w-xl space-y-8">
          <FadeIn>
            <div className="space-y-3">
              <HudLabel>TEXT_LINES</HudLabel>
              <Skeleton variant="text" lines={3} />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3">
              <HudLabel>HEADING</HudLabel>
              <Skeleton variant="heading" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex gap-4">
              <div className="space-y-3">
                <HudLabel>AVATAR</HudLabel>
                <Skeleton variant="circle" />
              </div>
              <div className="flex-1 space-y-3">
                <HudLabel>CARD</HudLabel>
                <Skeleton variant="card" />
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      <GlowLine />

      {/* Progress */}
      <Section spacing="lg">
        <SectionHeading subtitle="Determinate and indeterminate progress indicators.">
          Progress
        </SectionHeading>

        <div className="mt-12 max-w-xl space-y-8">
          <FadeIn>
            <div className="space-y-3">
              <HudLabel>DETERMINATE</HudLabel>
              <ProgressBar value={72} />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="space-y-3">
              <HudLabel>INDETERMINATE</HudLabel>
              <ProgressBar indeterminate />
            </div>
          </FadeIn>
        </div>
      </Section>

      <GlowLine />

      {/* Data Stream */}
      <Section spacing="lg">
        <SectionHeading subtitle="Scrolling hex data visualization.">
          Data Stream
        </SectionHeading>

        <div className="mt-12">
          <div className="relative h-48 overflow-hidden border border-border">
            <DataStream columns={6} speed="fast" className="h-full" />
          </div>
        </div>
      </Section>
    </>
  );
}
