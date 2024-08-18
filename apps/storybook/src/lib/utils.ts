import * as React from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Forward ref with type inference.
// Based on https://www.totaltypescript.com/forwardref-with-generic-components#the-solution.
export function fixedForwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
): (props: P & React.RefAttributes<T>) => React.ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return React.forwardRef(render) as any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type InferTuple<T extends ReadonlyArray<any>> = [...T]
