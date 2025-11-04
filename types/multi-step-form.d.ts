/**
 * Type definitions untuk Multi Step Form Component
 *
 * File ini berisi semua interface dan type yang digunakan
 * oleh komponen MultiStepForm untuk memudahkan development
 * dan memberikan IntelliSense yang baik.
 */

export interface Option {
  /** Text yang ditampilkan kepada user */
  label: string;
  /** Value yang akan disimpan saat option dipilih */
  value: string;
}

export type FieldType =
  | "text" // Input teks standar
  | "password" // Input password (tersembunyi)
  | "email" // Input email dengan validasi format
  | "number" // Input numerik
  | "textarea" // Text area untuk teks panjang
  | "select" // Dropdown selection
  | "radio" // Radio button group
  | "checkbox" // Single checkbox atau checkbox array
  | "switch" // Toggle switch
  | "date" // Date picker
  | "file"; // File upload

export interface ValidationConfig {
  /** Nilai minimum (untuk number) */
  min?: number;
  /** Nilai maksimum (untuk number) */
  max?: number;
  /** Panjang minimum (untuk text/textarea) */
  minLength?: number;
  /** Panjang maksimum (untuk text/textarea) */
  maxLength?: number;
  /** Regex pattern untuk validasi custom */
  pattern?: string;
  /** Tanggal minimum (untuk date) */
  dateMin?: string | Date;
  /** Tanggal maksimum (untuk date) */
  dateMax?: string | Date;
  /** Ukuran file maksimum dalam MB (untuk file) */
  fileMaxSizeMB?: number;
}

export interface FieldConfig {
  /** Label field yang ditampilkan */
  label: string;
  /** Tipe field */
  type: FieldType;
  /** Placeholder text */
  placeholder?: string;
  /** Apakah field wajib diisi */
  required?: boolean;
  /** Custom error message */
  error_message?: string;
  /** Options untuk select/radio/checkbox */
  options?: Option[];
  /** Custom field name (auto-generated dari label jika tidak disediakan) */
  name?: string;
  /** Column span dalam grid layout (1-3) */
  colSpan?: 1 | 2 | 3;
  /** File accept attribute (untuk file type) */
  accept?: string;
  /** Konfigurasi validasi */
  validation?: ValidationConfig;
  /** Deskripsi tambahan untuk field */
  description?: string;
}

export interface StepConfig {
  /** Nomor step (1, 2, 3, ...) */
  step_number: number;
  /** Judul step */
  title: string;
  /** Deskripsi step (opsional) */
  description?: string;
  /** Array field dalam step ini */
  field: FieldConfig[];
  /** Konfigurasi layout */
  layout?: {
    /** Jumlah kolom dalam grid (1-3) */
    columns?: 1 | 2 | 3;
  };
}

export interface MultiStepFormProps {
  /** Konfigurasi form */
  config: StepConfig[];
  /** Nilai awal form */
  initialValues?: Record<string, unknown>;
  /** Handler saat form disubmit */
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
  /** CSS class tambahan */
  className?: string;
}

/**
 * Utility types untuk form values
 */

/** Type untuk single form value */
export type FormValue =
  | string
  | number
  | boolean
  | Date
  | File
  | string[]
  | undefined;

/** Type untuk form values object */
export type FormValues = Record<string, FormValue>;

/** Type untuk form errors */
export type FormErrors = Record<string, string | undefined>;

/**
 * Helper types untuk field-specific configurations
 */

/** Configuration untuk text-based fields */
export interface TextFieldConfig extends Omit<FieldConfig, "type"> {
  type: "text" | "password" | "email" | "textarea";
  validation?: Pick<ValidationConfig, "minLength" | "maxLength" | "pattern">;
}

/** Configuration untuk number fields */
export interface NumberFieldConfig extends Omit<FieldConfig, "type"> {
  type: "number";
  validation?: Pick<ValidationConfig, "min" | "max">;
}

/** Configuration untuk select/radio fields */
export interface SelectFieldConfig extends Omit<FieldConfig, "type"> {
  type: "select" | "radio";
  options: Option[]; // Required untuk select/radio
}

/** Configuration untuk checkbox fields */
export interface CheckboxFieldConfig extends Omit<FieldConfig, "type"> {
  type: "checkbox";
  options?: Option[]; // Optional - jika ada, maka checkbox array
}

/** Configuration untuk date fields */
export interface DateFieldConfig extends Omit<FieldConfig, "type"> {
  type: "date";
  validation?: Pick<ValidationConfig, "dateMin" | "dateMax">;
}

/** Configuration untuk file fields */
export interface FileFieldConfig extends Omit<FieldConfig, "type"> {
  type: "file";
  accept?: string;
  validation?: Pick<ValidationConfig, "fileMaxSizeMB">;
}

/** Configuration untuk switch fields */
export interface SwitchFieldConfig extends Omit<FieldConfig, "type"> {
  type: "switch";
}

/**
 * Event handler types
 */

/** Handler untuk perubahan step */
export type StepChangeHandler = (
  currentStep: number,
  totalSteps: number
) => void;

/** Handler untuk perubahan field value */
export type FieldChangeHandler = (fieldName: string, value: FormValue) => void;

/** Handler untuk validasi field */
export type FieldValidationHandler = (
  fieldName: string,
  isValid: boolean,
  error?: string
) => void;

/**
 * Constants
 */

/** Maximum number of steps allowed */
export const MAX_STEPS = 10;

/** Maximum number of columns in grid */
export const MAX_COLUMNS = 3;

/** Default file size limit in MB */
export const DEFAULT_FILE_SIZE_LIMIT = 10;

/**
 * Utility functions types
 */

/** Function untuk generate field name dari label */
export type SlugifyFunction = (input: string) => string;

/** Function untuk validasi field */
export type FieldValidatorFunction = (
  field: FieldConfig,
  value: FormValue
) => string | undefined;

/** Function untuk format display value */
export type ValueFormatterFunction = (
  value: FormValue,
  field: FieldConfig
) => string;
