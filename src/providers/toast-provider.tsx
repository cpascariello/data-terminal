"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ToastVariant = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

type ToastInput = Omit<Toast, "id" | "duration"> & { duration?: number };

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: ToastInput) => void;
  removeToast: (id: string) => void;
}

const MAX_TOASTS = 5;

export const ToastContext = createContext<ToastContextValue | null>(
  null,
);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (incoming: ToastInput) => {
      const id = crypto.randomUUID();
      const toast: Toast = {
        id,
        message: incoming.message,
        variant: incoming.variant ?? "info",
        duration: incoming.duration ?? 5000,
      };

      setToasts((prev) => {
        const next = [toast, ...prev];
        return next.slice(0, MAX_TOASTS);
      });
    },
    [],
  );

  return (
    <ToastContext value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
