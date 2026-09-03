"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-zinc-200 shadow-xs transition-shadow outline-none focus-visible:border-zinc-950 focus-visible:ring-[3px] focus-visible:ring-zinc-950/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500 aria-invalid:ring-red-500/20 data-[state=checked]:border-zinc-900 data-[state=checked]:bg-zinc-900 data-[state=checked]:text-zinc-50 dark:aria-invalid:ring-red-500/40 dark:border-zinc-800 dark:focus-visible:border-zinc-300 dark:focus-visible:ring-zinc-300/50 dark:aria-invalid:border-red-900 dark:aria-invalid:ring-red-900/20 dark:data-[state=checked]:border-zinc-50 dark:data-[state=checked]:bg-zinc-50 dark:data-[state=checked]:text-zinc-900 dark:dark:aria-invalid:ring-red-900/40",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current"
      >
        {props.checked === "indeterminate" ? (
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.75 4.5C0.75 4.08579 1.08579 3.75 1.5 3.75H7.5C7.91421 3.75 8.25 4.08579 8.25 4.5C8.25 4.91421 7.91421 5.25 7.5 5.25H1.5C1.08579 5.25 0.75 4.91421 0.75 4.5Z"
            />
          </svg>
        ) : (
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="currentcolor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.53547 0.62293C8.88226 0.849446 8.97976 1.3142 8.75325 1.66099L4.5083 8.1599C4.38833 8.34356 4.19397 8.4655 3.9764 8.49358C3.75883 8.52167 3.53987 8.45309 3.3772 8.30591L0.616113 5.80777C0.308959 5.52987 0.285246 5.05559 0.563148 4.74844C0.84105 4.44128 1.31533 4.41757 1.62249 4.69547L3.73256 6.60459L7.49741 0.840706C7.72393 0.493916 8.18868 0.396414 8.53547 0.62293Z"
            />
          </svg>
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
