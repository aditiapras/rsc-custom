/**
 * Components Index
 * 
 * File ini mengexport semua komponen yang tersedia
 * untuk memudahkan import di file lain.
 */

// Multi Step Form Component
export { MultiStepForm } from './multi-step-form'
export type { 
  MultiStepFormProps,
  StepConfig,
  FieldConfig,
  Option
} from './multi-step-form'

// UI Components (re-export dari folder ui)
export { Button } from './ui/button'
export { Input } from './ui/input'
export { Textarea } from './ui/textarea'
export { Label } from './ui/label'
export { Checkbox } from './ui/checkbox'
export { Switch } from './ui/switch'
export { Calendar } from './ui/calendar'
export { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from './ui/select'
export {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
export {
  Popover,
  PopoverContent,
  PopoverTrigger
} from './ui/popover'
export {
  RadioGroup,
  RadioGroupItem
} from './ui/radio-group'

/**
 * Usage Examples:
 * 
 * // Import komponen utama
 * import { MultiStepForm } from '~/components'
 * 
 * // Import dengan types
 * import { MultiStepForm, type StepConfig } from '~/components'
 * 
 * // Import UI components
 * import { Button, Input } from '~/components'
 */