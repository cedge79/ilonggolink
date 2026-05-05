export function toast({ title, description, variant }: { title: string; description?: string; variant?: string }) {
  if (typeof window !== "undefined" && window.alert) {
    if (variant === "destructive") {
      console.error(`${title}: ${description || ""}`)
    }
  }
}
