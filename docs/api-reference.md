# Multi Step Form - API Reference

Dokumentasi lengkap untuk semua interface, types, dan props yang tersedia di komponen Multi Step Form.

## Table of Contents

- [Core Interfaces](#core-interfaces)
- [Props Reference](#props-reference)
- [Field Types](#field-types)
- [Validation Rules](#validation-rules)
- [Event Handlers](#event-handlers)
- [Utility Functions](#utility-functions)
- [Examples](#examples)

## Core Interfaces

### MultiStepFormProps

Props utama untuk komponen MultiStepForm.

```tsx
interface MultiStepFormProps {
  config: StepConfig[]
  initialValues?: Record<string, unknown>
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>
  className?: string
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `config` | `StepConfig[]` | ✅ | Array konfigurasi step form |
| `initialValues` | `Record<string, unknown>` | ❌ | Nilai awal untuk field form |
| `onSubmit` | `(values) => void \| Promise<void>` | ❌ | Handler saat form disubmit |
| `className` | `string` | ❌ | CSS class tambahan |

### StepConfig

Konfigurasi untuk setiap step dalam form.

```tsx
interface StepConfig {
  step_number: number
  title: string
  description?: string
  field: FieldConfig[]
  layout?: {
    columns?: 1 | 2 | 3
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `step_number` | `number` | ✅ | Nomor urut step (1, 2, 3, ...) |
| `title` | `string` | ✅ | Judul step |
| `description` | `string` | ❌ | Deskripsi step |
| `field` | `FieldConfig[]` | ✅ | Array field dalam step |
| `layout.columns` | `1 \| 2 \| 3` | ❌ | Jumlah kolom grid (default: 1) |

### FieldConfig

Konfigurasi untuk setiap field dalam form.

```tsx
interface FieldConfig {
  label: string
  type: FieldType
  placeholder?: string
  required?: boolean
  error_message?: string
  options?: Option[]
  name?: string
  colSpan?: 1 | 2 | 3
  accept?: string
  validation?: ValidationConfig
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | ✅ | Label field |
| `type` | `FieldType` | ✅ | Tipe field (lihat [Field Types](#field-types)) |
| `placeholder` | `string` | ❌ | Placeholder text |
| `required` | `boolean` | ❌ | Field wajib diisi (default: false) |
| `error_message` | `string` | ❌ | Custom error message |
| `options` | `Option[]` | ❌ | Options untuk select/radio/checkbox |
| `name` | `string` | ❌ | Custom field name (auto-generated jika tidak ada) |
| `colSpan` | `1 \| 2 \| 3` | ❌ | Column span dalam grid |
| `accept` | `string` | ❌ | File accept attribute (untuk file type) |
| `validation` | `ValidationConfig` | ❌ | Aturan validasi tambahan |

### Option

Interface untuk options dalam select, radio, dan checkbox.

```tsx
interface Option {
  label: string
  value: string
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `label` | `string` | ✅ | Text yang ditampilkan |
| `value` | `string` | ✅ | Value yang disimpan |

### ValidationConfig

Konfigurasi validasi untuk field.

```tsx
interface ValidationConfig {
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: string
  dateMin?: string | Date
  dateMax?: string | Date
  fileMaxSizeMB?: number
}
```

| Property | Type | Description | Applicable To |
|----------|------|-------------|---------------|
| `min` | `number` | Nilai minimum | `number` |
| `max` | `number` | Nilai maksimum | `number` |
| `minLength` | `number` | Panjang minimum | `text`, `password`, `email`, `textarea` |
| `maxLength` | `number` | Panjang maksimum | `text`, `password`, `email`, `textarea` |
| `pattern` | `string` | Regex pattern | `text`, `password`, `email` |
| `dateMin` | `string \| Date` | Tanggal minimum | `date` |
| `dateMax` | `string \| Date` | Tanggal maksimum | `date` |
| `fileMaxSizeMB` | `number` | Ukuran file max (MB) | `file` |

## Field Types

### FieldType Union

```tsx
type FieldType = 
  | "text"
  | "password"
  | "email"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "switch"
  | "date"
  | "file"
```

### Field Type Details

| Type | HTML Element | Validation | Options Required | Description |
|------|--------------|------------|------------------|-------------|
| `text` | `<input type="text">` | ✅ | ❌ | Input teks standar |
| `password` | `<input type="password">` | ✅ | ❌ | Input password tersembunyi |
| `email` | `<input type="email">` | ✅ | ❌ | Input email dengan validasi format |
| `number` | `<input type="number">` | ✅ | ❌ | Input numerik |
| `textarea` | `<textarea>` | ✅ | ❌ | Text area untuk teks panjang |
| `select` | `<select>` | ❌ | ✅ | Dropdown selection |
| `radio` | `<input type="radio">` | ❌ | ✅ | Radio button group |
| `checkbox` | `<input type="checkbox">` | ✅* | ❌* | Single checkbox atau array |
| `switch` | Custom toggle | ❌ | ❌ | Toggle switch |
| `date` | Date picker | ✅ | ❌ | Date picker component |
| `file` | `<input type="file">` | ✅ | ❌ | File upload |

*Checkbox: Jika `options` disediakan, menjadi checkbox array dengan validasi minimum selection.

## Validation Rules

### Built-in Validations

#### Text-based Fields (`text`, `password`, `email`, `textarea`)

```tsx
{
  validation: {
    minLength: 2,           // Minimum 2 karakter
    maxLength: 100,         // Maximum 100 karakter
    pattern: "^[A-Za-z]+$"  // Hanya huruf
  }
}
```

#### Number Fields

```tsx
{
  validation: {
    min: 0,     // Minimum value
    max: 100    // Maximum value
  }
}
```

#### Date Fields

```tsx
{
  validation: {
    dateMin: "2020-01-01",        // String format
    dateMax: new Date()           // Date object
  }
}
```

#### File Fields

```tsx
{
  accept: "image/*",              // File types
  validation: {
    fileMaxSizeMB: 5              // Max 5MB
  }
}
```

#### Checkbox Arrays

```tsx
{
  type: "checkbox",
  required: true,                 // Minimum 1 selection required
  options: [
    { label: "Option 1", value: "opt1" },
    { label: "Option 2", value: "opt2" }
  ]
}
```

### Custom Error Messages

```tsx
{
  label: "Email",
  type: "email",
  required: true,
  error_message: "Please enter a valid email address"
}
```

## Event Handlers

### onSubmit Handler

```tsx
const handleSubmit = (values: Record<string, unknown>) => {
  // values berisi semua field values dengan key = field name
  console.log(values)
  
  // Example values:
  // {
  //   fullName: "John Doe",
  //   email: "john@example.com",
  //   interests: ["tech", "design"],
  //   newsletter: true
  // }
}

<MultiStepForm
  config={config}
  onSubmit={handleSubmit}
/>
```

### Async Submit Handler

```tsx
const handleAsyncSubmit = async (values: Record<string, unknown>) => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    
    if (response.ok) {
      alert('Form submitted successfully!')
    }
  } catch (error) {
    console.error('Submit error:', error)
  }
}
```

## Utility Functions

### Field Name Generation

Field names are automatically generated from labels using a slugify function:

```tsx
// Examples:
"Full Name" → "fullName"
"Email Address" → "emailAddress"
"Date of Birth" → "dateOfBirth"
"Phone Number (Optional)" → "phoneNumberOptional"
```

### Custom Field Names

```tsx
{
  label: "Full Name",
  name: "custom_name",  // Override auto-generated name
  type: "text"
}
```

## Layout System

### Grid Columns

```tsx
{
  step_number: 1,
  title: "Step Title",
  layout: { columns: 2 },  // 2-column grid
  field: [
    {
      label: "First Name",
      type: "text",
      colSpan: 1  // Takes 1 column
    },
    {
      label: "Last Name", 
      type: "text",
      colSpan: 1  // Takes 1 column
    },
    {
      label: "Bio",
      type: "textarea",
      colSpan: 2  // Takes full width (2 columns)
    }
  ]
}
```

### Responsive Behavior

- **Mobile**: Always single column
- **Tablet & Desktop**: Respects `columns` setting
- **Column Span**: Automatically adjusts to available columns

## Examples

### Basic Form

```tsx
const basicConfig: StepConfig[] = [
  {
    step_number: 1,
    title: "Basic Info",
    field: [
      {
        label: "Name",
        type: "text",
        required: true
      },
      {
        label: "Email",
        type: "email",
        required: true
      }
    ]
  }
]
```

### Advanced Form with Validation

```tsx
const advancedConfig: StepConfig[] = [
  {
    step_number: 1,
    title: "Registration",
    layout: { columns: 2 },
    field: [
      {
        label: "Username",
        type: "text",
        required: true,
        colSpan: 1,
        validation: {
          minLength: 3,
          maxLength: 20,
          pattern: "^[a-zA-Z0-9_]+$"
        },
        error_message: "Username must be 3-20 characters, letters, numbers, and underscores only"
      },
      {
        label: "Password",
        type: "password",
        required: true,
        colSpan: 1,
        validation: {
          minLength: 8
        }
      },
      {
        label: "Birth Date",
        type: "date",
        required: true,
        colSpan: 1,
        validation: {
          dateMax: new Date(),
          dateMin: new Date("1900-01-01")
        }
      },
      {
        label: "Country",
        type: "select",
        required: true,
        colSpan: 1,
        options: [
          { label: "Indonesia", value: "ID" },
          { label: "Malaysia", value: "MY" }
        ]
      }
    ]
  }
]
```

### Form with Initial Values

```tsx
<MultiStepForm
  config={config}
  initialValues={{
    name: "John Doe",
    email: "john@example.com",
    country: "ID"
  }}
  onSubmit={handleSubmit}
/>
```

## Type Safety

### Using with TypeScript

```tsx
import { MultiStepForm, type StepConfig, type FieldConfig } from '~/components/multi-step-form'

// Type-safe configuration
const config: StepConfig[] = [
  // Configuration here will be type-checked
]

// Type-safe submit handler
const handleSubmit = (values: Record<string, unknown>) => {
  // You can cast to specific types if needed
  const typedValues = values as {
    name: string
    email: string
    age: number
  }
}
```

### Custom Type Definitions

```tsx
// Define your own form data type
interface MyFormData {
  personalInfo: {
    name: string
    email: string
  }
  preferences: {
    newsletter: boolean
    interests: string[]
  }
}

const handleSubmit = (values: Record<string, unknown>) => {
  const formData = values as unknown as MyFormData
  // Now you have full type safety
}
```

## Error Handling

### Validation Errors

Validation errors are automatically displayed below each field. You can customize error messages:

```tsx
{
  label: "Email",
  type: "email",
  required: true,
  error_message: "Please enter a valid email address"
}
```

### Form Submission Errors

```tsx
const handleSubmit = async (values: Record<string, unknown>) => {
  try {
    await submitForm(values)
  } catch (error) {
    // Handle submission errors
    alert('Failed to submit form. Please try again.')
  }
}
```

## Performance Considerations

### Large Forms

For forms with many steps or fields:

1. **Lazy Loading**: Consider code-splitting large forms
2. **Virtualization**: For very long option lists
3. **Debouncing**: Built-in for validation
4. **Memoization**: Form fields are automatically memoized

### Memory Usage

- Form state is managed efficiently with React Hook Form
- Only current step fields are rendered
- Previous step data is preserved in form state

## Browser Support

- **Modern Browsers**: Full support (Chrome 90+, Firefox 88+, Safari 14+)
- **IE11**: Not supported (uses modern JavaScript features)
- **Mobile**: Full support on iOS Safari and Android Chrome

## Accessibility

### Built-in Features

- ✅ **Keyboard Navigation**: Tab through fields, Enter to submit
- ✅ **Screen Reader Support**: Proper ARIA labels and descriptions
- ✅ **Focus Management**: Automatic focus on validation errors
- ✅ **High Contrast**: Works with high contrast mode
- ✅ **Required Field Indicators**: Visual (*) and screen reader announcements

### WCAG Compliance

The component follows WCAG 2.1 AA guidelines:

- Color contrast ratios meet requirements
- All interactive elements are keyboard accessible
- Form validation provides clear feedback
- Error messages are associated with form fields