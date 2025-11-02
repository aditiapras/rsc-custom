import type { ZodTypeAny } from "zod"

// Field types supported by the renderer
export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "switch"
  | "textarea"
  | "file"

export type Option = {
  label: string
  value: string
  disabled?: boolean
}

export type VisibilityPredicate<TValues = Record<string, unknown>> = (
  values: TValues
) => boolean

// Configuration for a single field in a step
export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  required?: boolean
  placeholder?: string
  description?: string
  errorMessage?: string
  // Grid column span for layout in a CSS grid
  colSpan?: number
  // Options for select / radio / checkbox groups
  options?: Option[] | ((values: Record<string, unknown>) => Option[])
  // Custom validation per field (optional). If provided, this overrides default mapping.
  validation?: ZodTypeAny
  // Show/hide field based on current form values
  visibleIf?: VisibilityPredicate
  // Map of extra props to pass to underlying input component (size, min, max, etc.)
  inputProps?: Record<string, unknown>
}

export interface StepConfig {
  stepNumber: number
  title: string
  description?: string
  columns?: number
  formFields: FieldConfig[]
}

export type MultiStepFormConfig = StepConfig[]

// Props for the reusable MultiStepForm component
export interface MultiStepFormProps<TValues extends Record<string, unknown> = Record<string, unknown>> {
  config: MultiStepFormConfig
  onSubmit?: (values: TValues) => void | Promise<void>
  defaultValues?: Partial<TValues>
  className?: string
  styles?: {
    container?: string
    progress?: string
    grid?: string
    nav?: string
    fieldItem?: string
  }
  // Override built-in field renderers by type
  components?: Partial<Record<FieldType, React.ComponentType<any>>>
  // Called when the step changes
  onStepChange?: (stepIndex: number) => void
  // Whether to show step indicator at the top (default: true)
  showProgress?: boolean
}

// Helper type for values produced by the config
export type FormValuesFromConfig<TConfig extends MultiStepFormConfig> = {
  [K in TConfig[number]["formFields"][number] as K["name"]]: unknown
}