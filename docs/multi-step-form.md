# Multi Step Form Component

Komponen Multi Step Form yang fleksibel dan dapat dikustomisasi untuk React dengan TypeScript, menggunakan React Hook Form dan Zod untuk validasi.

## Features

- ✅ Multi-step navigation dengan progress indicator
- ✅ Validasi real-time menggunakan Zod
- ✅ Berbagai tipe field yang didukung
- ✅ Layout responsif dengan grid system
- ✅ Konfigurasi berbasis JSON
- ✅ TypeScript support penuh
- ✅ Accessible dan user-friendly

## Supported Field Types

| Type | Description | Validation Support |
|------|-------------|-------------------|
| `text` | Input teks standar | min, max, minLength, maxLength, pattern |
| `password` | Input password (tersembunyi) | min, max, minLength, maxLength, pattern |
| `email` | Input email dengan validasi format | minLength, maxLength, pattern |
| `number` | Input numerik | min, max |
| `textarea` | Text area untuk teks panjang | minLength, maxLength |
| `select` | Dropdown selection | - |
| `radio` | Radio button group | - |
| `checkbox` | Single checkbox atau checkbox array | - |
| `switch` | Toggle switch | - |
| `date` | Date picker | dateMin, dateMax |
| `file` | File upload | fileMaxSizeMB, accept |

## Installation & Setup

### 1. Dependencies

Pastikan dependencies berikut sudah terinstall:

```bash
npm install react-hook-form @hookform/resolvers zod
npm install @radix-ui/react-popover @radix-ui/react-calendar
npm install lucide-react
```

### 2. UI Components

Komponen ini menggunakan shadcn/ui components. Pastikan components berikut sudah terinstall:

```bash
npx shadcn-ui@latest add button input textarea select checkbox switch radio-group calendar popover form label separator
```

## Basic Usage

### 1. Import Component

```tsx
import { MultiStepForm } from "~/components/multi-step-form"
import type { StepConfig } from "~/components/multi-step-form"
```

### 2. Create Configuration

```tsx
const formConfig: StepConfig[] = [
  {
    step_number: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
    layout: { columns: 2 },
    field: [
      {
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter your full name",
        colSpan: 2,
        validation: { minLength: 2 }
      },
      {
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        colSpan: 1
      },
      {
        label: "Phone",
        type: "text",
        required: false,
        placeholder: "Enter your phone number",
        colSpan: 1
      }
    ]
  },
  {
    step_number: 2,
    title: "Preferences",
    description: "Choose your preferences",
    layout: { columns: 1 },
    field: [
      {
        label: "Interests",
        type: "checkbox",
        required: true,
        colSpan: 1,
        options: [
          { label: "Technology", value: "tech" },
          { label: "Design", value: "design" },
          { label: "Business", value: "business" }
        ]
      }
    ]
  }
]
```

### 3. Use Component

```tsx
export default function MyForm() {
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted:", values)
    // Handle form submission
  }

  return (
    <MultiStepForm
      config={formConfig}
      onSubmit={handleSubmit}
      initialValues={{
        fullName: "John Doe", // Optional initial values
        email: "john@example.com"
      }}
    />
  )
}
```

## Configuration Reference

### StepConfig Interface

```tsx
interface StepConfig {
  step_number: number        // Step number (1, 2, 3, ...)
  title: string             // Step title
  description?: string      // Optional step description
  field: FieldConfig[]      // Array of fields in this step
  layout?: {
    columns?: 1 | 2 | 3     // Grid columns (default: 1)
  }
}
```

### FieldConfig Interface

```tsx
interface FieldConfig {
  label: string             // Field label
  type: FieldType          // Field type (see supported types)
  placeholder?: string     // Placeholder text
  required?: boolean       // Is field required (default: false)
  error_message?: string   // Custom error message
  options?: Option[]       // Options for select/radio/checkbox
  name?: string           // Custom field name (auto-generated if not provided)
  colSpan?: 1 | 2 | 3     // Column span in grid
  accept?: string         // File accept attribute (for file type)
  validation?: ValidationConfig
}
```

### ValidationConfig Interface

```tsx
interface ValidationConfig {
  min?: number              // Minimum value (for number)
  max?: number              // Maximum value (for number)
  minLength?: number        // Minimum length (for text)
  maxLength?: number        // Maximum length (for text)
  pattern?: string          // Regex pattern
  dateMin?: string | Date   // Minimum date
  dateMax?: string | Date   // Maximum date
  fileMaxSizeMB?: number    // Maximum file size in MB
}
```

### Option Interface

```tsx
interface Option {
  label: string    // Display text
  value: string    // Value
}
```

## Advanced Examples

### Complex Multi-Step Form

```tsx
const advancedConfig: StepConfig[] = [
  {
    step_number: 1,
    title: "Account Setup",
    description: "Create your account",
    layout: { columns: 1 },
    field: [
      {
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email address",
        validation: { 
          pattern: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$" 
        }
      },
      {
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Create a strong password",
        validation: { minLength: 8 }
      },
      {
        label: "Confirm Password",
        type: "password",
        required: true,
        placeholder: "Confirm your password"
      }
    ]
  },
  {
    step_number: 2,
    title: "Personal Details",
    description: "Tell us more about you",
    layout: { columns: 2 },
    field: [
      {
        label: "First Name",
        type: "text",
        required: true,
        colSpan: 1,
        validation: { minLength: 2 }
      },
      {
        label: "Last Name",
        type: "text",
        required: true,
        colSpan: 1,
        validation: { minLength: 2 }
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
        label: "Gender",
        type: "radio",
        required: true,
        colSpan: 1,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" }
        ]
      },
      {
        label: "Bio",
        type: "textarea",
        required: false,
        colSpan: 2,
        placeholder: "Tell us about yourself",
        validation: { maxLength: 500 }
      }
    ]
  },
  {
    step_number: 3,
    title: "Preferences",
    description: "Customize your experience",
    layout: { columns: 2 },
    field: [
      {
        label: "Country",
        type: "select",
        required: true,
        colSpan: 1,
        placeholder: "Select your country",
        options: [
          { label: "Indonesia", value: "ID" },
          { label: "Malaysia", value: "MY" },
          { label: "Singapore", value: "SG" }
        ]
      },
      {
        label: "Language",
        type: "select",
        required: true,
        colSpan: 1,
        placeholder: "Select your language",
        options: [
          { label: "English", value: "en" },
          { label: "Bahasa Indonesia", value: "id" },
          { label: "Bahasa Malaysia", value: "ms" }
        ]
      },
      {
        label: "Interests",
        type: "checkbox",
        required: true,
        colSpan: 2,
        options: [
          { label: "Technology", value: "tech" },
          { label: "Design", value: "design" },
          { label: "Business", value: "business" },
          { label: "Marketing", value: "marketing" }
        ]
      },
      {
        label: "Newsletter",
        type: "switch",
        required: false,
        colSpan: 2
      },
      {
        label: "Profile Picture",
        type: "file",
        required: false,
        colSpan: 2,
        accept: "image/*",
        validation: { fileMaxSizeMB: 5 }
      }
    ]
  }
]
```

## Props Reference

### MultiStepFormProps

```tsx
interface MultiStepFormProps {
  config: StepConfig[]                                    // Form configuration
  initialValues?: Record<string, unknown>                 // Initial form values
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>  // Submit handler
  className?: string                                      // Additional CSS classes
}
```

## Field Naming Convention

Field names are automatically generated from labels using a slugify function:
- "Full Name" → "fullName"
- "Email Address" → "emailAddress"
- "Date of Birth" → "dateOfBirth"

You can override this by providing a custom `name` property in the field configuration.

## Validation Behavior

- **Real-time validation**: Fields are validated as user types
- **Step validation**: All fields in current step must be valid before proceeding
- **Required fields**: Marked with red asterisk (*) and prevent form progression
- **Custom error messages**: Use `error_message` property for custom validation messages

## Styling & Customization

The component uses Tailwind CSS classes and can be customized by:

1. **CSS Classes**: Pass `className` prop to the component
2. **Theme**: Customize shadcn/ui theme colors
3. **Layout**: Use `layout.columns` and `colSpan` for responsive layouts

## Best Practices

1. **Keep steps logical**: Group related fields together
2. **Use appropriate field types**: Choose the right input type for better UX
3. **Provide clear labels**: Use descriptive labels and placeholders
4. **Validate appropriately**: Don't over-validate, focus on essential validations
5. **Test thoroughly**: Test all field types and validation scenarios

## Troubleshooting

### Common Issues

1. **Validation not working**: Ensure `required: true` is set and validation rules are correct
2. **Checkbox arrays not validating**: Make sure to provide `options` array for checkbox arrays
3. **Date picker issues**: Check date format and min/max constraints
4. **File upload problems**: Verify `accept` attribute and file size limits

### Debug Tips

1. Check browser console for validation errors
2. Use React DevTools to inspect form state
3. Verify field names are generated correctly
4. Test with different initial values

## Migration Guide

If migrating from an older version:

1. Update field type from `"text"` to `"password"` for password fields
2. Checkbox arrays now require `options` array
3. Validation config moved to `validation` object
4. Field names are auto-generated (remove manual `name` if using labels)

## Contributing

When contributing to this component:

1. Add tests for new field types
2. Update TypeScript interfaces
3. Maintain backward compatibility
4. Update documentation

## 📚 Dokumentasi Lanjutan

### Dokumentasi Lengkap

- **[API Reference](./api-reference.md)** - Dokumentasi lengkap semua interface, props, dan types
- **[Troubleshooting & FAQ](./troubleshooting.md)** - Panduan mengatasi masalah umum dan pertanyaan yang sering diajukan
- **[Migration Guide](./migration-guide.md)** - Panduan migrasi antar versi
- **[Examples](../examples/)** - Contoh implementasi berbagai use case

### Quick Links

| Dokumentasi | Deskripsi | Target Audience |
|-------------|-----------|------------------|
| [Multi Step Form](./multi-step-form.md) | Dokumentasi utama dan panduan penggunaan | Semua developer |
| [API Reference](./api-reference.md) | Referensi lengkap API dan types | Developer yang butuh detail teknis |
| [Troubleshooting](./troubleshooting.md) | Solusi masalah umum dan FAQ | Developer yang mengalami masalah |
| [Migration Guide](./migration-guide.md) | Panduan upgrade antar versi | Developer yang upgrade |
| [Simple Example](../examples/simple-form.tsx) | Contoh implementasi sederhana | Developer pemula |

### Struktur Dokumentasi

```
docs/
├── multi-step-form.md      # Dokumentasi utama
├── api-reference.md        # Referensi API lengkap
├── troubleshooting.md      # Troubleshooting & FAQ
└── migration-guide.md      # Panduan migrasi

examples/
├── simple-form.tsx         # Contoh sederhana
└── advanced-form.tsx       # Contoh lanjutan (coming soon)

app/components/
├── multi-step-form.tsx     # Komponen utama
├── multi-step-form.d.ts    # Type definitions
└── index.ts                # Export file
```

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

### Cara Berkontribusi

1. **Fork repository**
2. **Buat feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit perubahan** (`git commit -m 'Add amazing feature'`)
4. **Push ke branch** (`git push origin feature/amazing-feature`)
5. **Buat Pull Request**

### Guidelines Kontribusi

- **Code Style**: Ikuti existing code style dan conventions
- **Testing**: Pastikan semua tests pass
- **Documentation**: Update dokumentasi jika diperlukan
- **TypeScript**: Maintain type safety
- **Accessibility**: Pastikan fitur accessible

### Areas yang Butuh Kontribusi

- [ ] **Advanced Examples**: Contoh penggunaan lanjutan
- [ ] **Custom Field Types**: Dukungan field type tambahan
- [ ] **Conditional Logic**: Conditional fields berdasarkan input lain
- [ ] **Internationalization**: Dukungan multi-bahasa
- [ ] **Theme System**: System theming yang lebih fleksibel
- [ ] **Performance**: Optimasi untuk form besar
- [ ] **Testing**: Unit tests dan integration tests
- [ ] **Documentation**: Perbaikan dan penambahan dokumentasi

## 📄 Lisensi

MIT License - lihat file LICENSE untuk detail lengkap.

---

## 🔗 Related Resources

### Component Dependencies

- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icons

### Similar Components

- **React Hook Form** - Lower level form management
- **Formik** - Alternative form library
- **React Final Form** - Another form solution

### Learning Resources

- [React Hook Form Documentation](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Happy coding! 🚀**