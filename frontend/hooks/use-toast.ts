// hooks/use-toast.ts

import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | string;
  duration?: number;
};

export function useToast() {
  function toast(options: ToastOptions) {
    sonnerToast[options.variant === "destructive" ? "error" : "message"](
      options.title || "",
      {
        description: options.description,
        duration: options.duration || 3000,
      }
    );
  }

  return { toast };
}
