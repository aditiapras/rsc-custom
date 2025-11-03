/**
 * Components Index
 *
 * File ini mengexport semua komponen yang tersedia
 * untuk memudahkan import di file lain.
 */

// UI Components (re-export dari folder ui)
export { Button } from "~/components/ui/button";
export { Calendar } from "~/components/ui/calendar";
export { Checkbox } from "~/components/ui/checkbox";
export {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
export { Input } from "~/components/ui/input";
export { Label } from "~/components/ui/label";
export {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
export { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
export { Switch } from "~/components/ui/switch";
export { Textarea } from "~/components/ui/textarea";
export type {
  FieldConfig,
  MultiStepFormProps,
  Option,
  StepConfig,
} from "./multi-step-form";
// Multi Step Form Component
export { MultiStepForm } from "./multi-step-form";

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
