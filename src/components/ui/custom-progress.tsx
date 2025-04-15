
import * as React from "react"

import { cn } from "@/lib/utils"

export interface CustomProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  indicatorClassName?: string
}

const CustomProgress = React.forwardRef<HTMLDivElement, CustomProgressProps>(
  ({ className, value, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = value != null ? Math.min(Math.max(value, 0), max) * (100 / max) : null

    return (
      <div
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
          className
        )}
        {...props}
      >
        {percentage != null && (
          <div
            className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
            style={{ transform: `translateX(-${100 - percentage}%)` }}
          />
        )}
      </div>
    )
  }
)
CustomProgress.displayName = "CustomProgress"

export { CustomProgress }
