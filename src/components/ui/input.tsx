import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      data-slot="input"
      ref={ref}
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-zinc-950 placeholder:text-zinc-500/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:file:text-zinc-50 dark:placeholder:text-zinc-400/70",
        "focus-visible:border-zinc-950 focus-visible:ring-[3px] focus-visible:ring-zinc-950/50 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 dark:aria-invalid:border-red-900 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40",
        type === "search" &&
          "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none",
        type === "file" &&
          "p-0 pr-3 text-zinc-500/70 italic file:me-3 file:h-full file:border-0 file:border-r file:border-solid file:border-zinc-200 file:bg-transparent file:px-3 file:text-sm file:font-medium file:text-zinc-950 file:not-italic dark:text-zinc-400/70 dark:file:border-zinc-800 dark:file:text-zinc-50",
        className
      )}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
