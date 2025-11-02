# Multi Step Form - Troubleshooting & FAQ

Panduan untuk mengatasi masalah umum dan pertanyaan yang sering diajukan tentang komponen Multi Step Form.

## Table of Contents

- [Common Issues](#common-issues)
- [Validation Problems](#validation-problems)
- [Styling Issues](#styling-issues)
- [Performance Issues](#performance-issues)
- [TypeScript Issues](#typescript-issues)
- [FAQ](#faq)
- [Debug Mode](#debug-mode)
- [Getting Help](#getting-help)

## Common Issues

### 1. Form Not Submitting

**Problem**: Form tidak memanggil `onSubmit` handler saat tombol submit diklik.

**Possible Causes & Solutions**:

```tsx
// ❌ Missing onSubmit handler
<MultiStepForm config={config} />

// ✅ Add onSubmit handler
<MultiStepForm 
  config={config} 
  onSubmit={(values) => console.log(values)} 
/>
```

**Check**:
- Pastikan `onSubmit` prop sudah didefinisikan
- Periksa console untuk error JavaScript
- Pastikan semua field required sudah diisi
- Pastikan tidak ada validation error

### 2. Field Values Not Persisting

**Problem**: Nilai field hilang saat berpindah step atau refresh.

**Solution**:

```tsx
// ✅ Use initialValues to set default values
<MultiStepForm
  config={config}
  initialValues={{
    name: "John Doe",
    email: "john@example.com"
  }}
  onSubmit={handleSubmit}
/>
```

**Alternative**: Implement external state management:

```tsx
const [formData, setFormData] = useState({})

const handleSubmit = (values) => {
  setFormData(values)
  // Save to localStorage, database, etc.
}
```

### 3. Custom Field Names Not Working

**Problem**: Field names tidak sesuai yang diharapkan.

**Solution**:

```tsx
// ❌ Auto-generated name might not match expectations
{
  label: "Full Name",
  type: "text"
}
// Generated name: "fullName"

// ✅ Use explicit name
{
  label: "Full Name",
  name: "user_full_name",  // Explicit name
  type: "text"
}
```

### 4. Options Not Showing for Select/Radio/Checkbox

**Problem**: Dropdown atau radio buttons kosong.

**Solution**:

```tsx
// ❌ Missing options
{
  label: "Country",
  type: "select"
}

// ✅ Add options array
{
  label: "Country",
  type: "select",
  options: [
    { label: "Indonesia", value: "ID" },
    { label: "Malaysia", value: "MY" }
  ]
}
```

## Validation Problems

### 1. Required Field Validation Not Working

**Problem**: Field yang required tidak menampilkan error saat kosong.

**Debug Steps**:

```tsx
// Check field configuration
{
  label: "Email",
  type: "email",
  required: true,  // ✅ Make sure this is set
  error_message: "Email is required"  // Optional custom message
}
```

**Common Issues**:
- `required: false` atau tidak ada property `required`
- Field type tidak mendukung validation
- Custom validation override

### 2. Email Validation Not Working

**Problem**: Email format tidak divalidasi dengan benar.

**Solution**:

```tsx
// ✅ Use email type for automatic validation
{
  label: "Email",
  type: "email",  // Built-in email validation
  required: true
}

// ✅ Or add custom pattern
{
  label: "Email",
  type: "text",
  validation: {
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  }
}
```

### 3. Checkbox Array Validation Issues

**Problem**: Checkbox array tidak memvalidasi minimum selection.

**Solution**:

```tsx
// ✅ Checkbox array with required validation
{
  label: "Interests",
  type: "checkbox",
  required: true,  // Requires at least 1 selection
  options: [
    { label: "Technology", value: "tech" },
    { label: "Design", value: "design" }
  ]
}

// ❌ Single checkbox (boolean) - different behavior
{
  label: "Accept Terms",
  type: "checkbox",
  required: true  // Requires checkbox to be checked
  // No options = single checkbox
}
```

### 4. Custom Validation Not Working

**Problem**: Custom validation rules tidak berfungsi.

**Solution**:

```tsx
// ✅ Proper validation configuration
{
  label: "Username",
  type: "text",
  validation: {
    minLength: 3,
    maxLength: 20,
    pattern: "^[a-zA-Z0-9_]+$"
  },
  error_message: "Username must be 3-20 characters, alphanumeric and underscore only"
}
```

**Check**:
- Validation rules sesuai dengan field type
- Pattern regex valid
- Min/max values reasonable

## Styling Issues

### 1. Layout Not Responsive

**Problem**: Form tidak responsive di mobile.

**Solution**:

```tsx
// ✅ Grid layout automatically responsive
{
  step_number: 1,
  title: "Step Title",
  layout: { columns: 2 },  // Desktop: 2 columns, Mobile: 1 column
  field: [
    {
      label: "First Name",
      type: "text",
      colSpan: 1
    }
  ]
}
```

**CSS Override** (if needed):

```css
/* Force single column on small screens */
@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr !important;
  }
  
  .form-field {
    grid-column: 1 !important;
  }
}
```

### 2. Custom Styling Not Applied

**Problem**: Custom CSS class tidak berpengaruh.

**Solution**:

```tsx
// ✅ Add custom className
<MultiStepForm
  config={config}
  className="my-custom-form"
  onSubmit={handleSubmit}
/>
```

```css
/* Use specific selectors */
.my-custom-form .form-step {
  background: #f5f5f5;
}

.my-custom-form .form-field {
  margin-bottom: 1rem;
}
```

### 3. Button Styling Issues

**Problem**: Navigation buttons tidak sesuai design system.

**Solution**:

```css
/* Override button styles */
.multi-step-form .btn-primary {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.multi-step-form .btn-secondary {
  background-color: transparent;
  border-color: var(--border-color);
  color: var(--text-color);
}
```

## Performance Issues

### 1. Slow Rendering with Many Fields

**Problem**: Form lambat saat memiliki banyak field.

**Solutions**:

```tsx
// ✅ Split into more steps
const config = [
  {
    step_number: 1,
    title: "Basic Info",
    field: [
      // 5-10 fields max per step
    ]
  },
  {
    step_number: 2,
    title: "Additional Info", 
    field: [
      // Split remaining fields
    ]
  }
]

// ✅ Use lazy loading for large option lists
{
  label: "City",
  type: "select",
  options: useMemo(() => getCityOptions(), [])  // Memoize expensive operations
}
```

### 2. Memory Leaks

**Problem**: Memory usage terus meningkat.

**Solution**:

```tsx
// ✅ Cleanup in useEffect
useEffect(() => {
  return () => {
    // Cleanup subscriptions, timers, etc.
  }
}, [])

// ✅ Avoid creating new objects in render
const memoizedConfig = useMemo(() => config, [])

<MultiStepForm config={memoizedConfig} />
```

## TypeScript Issues

### 1. Type Errors with Config

**Problem**: TypeScript error pada konfigurasi form.

**Solution**:

```tsx
import type { StepConfig } from '~/components/multi-step-form'

// ✅ Explicit typing
const config: StepConfig[] = [
  {
    step_number: 1,
    title: "Step 1",
    field: [
      {
        label: "Name",
        type: "text" as const,  // Use 'as const' for literal types
        required: true
      }
    ]
  }
]
```

### 2. onSubmit Handler Type Issues

**Problem**: TypeScript error pada submit handler.

**Solution**:

```tsx
// ✅ Proper typing
const handleSubmit = (values: Record<string, unknown>) => {
  // Type assertion if you know the structure
  const typedValues = values as {
    name: string
    email: string
  }
  
  console.log(typedValues.name)
}

// ✅ Or use type guard
const isValidFormData = (values: Record<string, unknown>): values is FormData => {
  return typeof values.name === 'string' && typeof values.email === 'string'
}

const handleSubmit = (values: Record<string, unknown>) => {
  if (isValidFormData(values)) {
    // Now values is typed as FormData
    console.log(values.name)
  }
}
```

## FAQ

### Q: Bagaimana cara menambahkan field type baru?

**A**: Saat ini field types sudah cukup lengkap. Jika butuh custom field, gunakan `text` type dengan validation custom:

```tsx
{
  label: "Custom Field",
  type: "text",
  validation: {
    pattern: "your-custom-regex"
  }
}
```

### Q: Bisakah menggunakan conditional fields?

**A**: Saat ini tidak ada built-in conditional logic. Workaround:

```tsx
const getStepConfig = (userType: string) => {
  const baseFields = [
    { label: "Name", type: "text" }
  ]
  
  if (userType === "business") {
    baseFields.push({ label: "Company", type: "text" })
  }
  
  return baseFields
}
```

### Q: Bagaimana cara mengintegrasikan dengan state management (Redux, Zustand)?

**A**: Gunakan `initialValues` dan `onSubmit`:

```tsx
// With Redux
const formData = useSelector(state => state.form)
const dispatch = useDispatch()

<MultiStepForm
  config={config}
  initialValues={formData}
  onSubmit={(values) => dispatch(updateForm(values))}
/>

// With Zustand
const { formData, updateForm } = useFormStore()

<MultiStepForm
  config={config}
  initialValues={formData}
  onSubmit={updateForm}
/>
```

### Q: Bisakah menggunakan custom validation library (Yup, Joi)?

**A**: Saat ini menggunakan Zod internal. Untuk custom validation, gunakan `validation` config atau implement di `onSubmit`:

```tsx
const handleSubmit = async (values) => {
  // Custom validation
  const schema = Yup.object({
    email: Yup.string().email().required()
  })
  
  try {
    await schema.validate(values)
    // Submit form
  } catch (error) {
    // Handle validation error
  }
}
```

### Q: Bagaimana cara menambahkan progress indicator?

**A**: Progress indicator sudah built-in. Untuk custom styling:

```css
.step-indicator {
  /* Custom progress bar styles */
}

.step-indicator .step-active {
  background-color: var(--primary-color);
}
```

### Q: Bisakah form di-submit tanpa validasi?

**A**: Tidak recommended, tapi bisa dengan menghapus `required` dan `validation`:

```tsx
// ❌ Not recommended - no validation
{
  label: "Optional Field",
  type: "text"
  // No required or validation
}
```

### Q: Bagaimana cara menghandle file upload?

**A**: Gunakan `file` type:

```tsx
{
  label: "Profile Picture",
  type: "file",
  accept: "image/*",
  validation: {
    fileMaxSizeMB: 5
  }
}
```

File akan tersedia di `onSubmit` sebagai `File` object.

## Debug Mode

### Enable Debug Logging

Tambahkan di development:

```tsx
// Add to your component
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Form config:', config)
    console.log('Initial values:', initialValues)
  }
}, [config, initialValues])
```

### Form State Inspection

```tsx
// Add temporary debug handler
const debugSubmit = (values) => {
  console.log('=== FORM DEBUG ===')
  console.log('Values:', values)
  console.log('Value types:', Object.entries(values).map(([k, v]) => [k, typeof v]))
  console.log('==================')
  
  // Your actual submit logic
  handleSubmit(values)
}

<MultiStepForm onSubmit={debugSubmit} />
```

### Browser DevTools

1. **React DevTools**: Inspect component state
2. **Console**: Check for JavaScript errors
3. **Network**: Monitor form submission requests
4. **Elements**: Inspect generated HTML structure

## Getting Help

### Before Asking for Help

1. **Check Console**: Look for JavaScript errors
2. **Verify Config**: Ensure configuration follows the schema
3. **Test Minimal Example**: Create a simple reproduction case
4. **Check Documentation**: Review API reference and examples

### Reporting Issues

When reporting issues, include:

```tsx
// 1. Minimal reproduction case
const config = [
  {
    step_number: 1,
    title: "Test",
    field: [
      {
        label: "Test Field",
        type: "text",
        required: true
      }
    ]
  }
]

// 2. Expected behavior
// 3. Actual behavior
// 4. Browser/environment info
// 5. Console errors (if any)
```

### Community Resources

- **GitHub Issues**: Report bugs and feature requests
- **Documentation**: Complete API reference
- **Examples**: Working code samples
- **TypeScript Definitions**: Full type safety

### Performance Profiling

```tsx
// Add performance monitoring
const handleSubmit = (values) => {
  console.time('Form Submit')
  
  // Your submit logic
  
  console.timeEnd('Form Submit')
}
```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot read property 'map' of undefined" | Missing `options` for select/radio | Add `options` array |
| "Field name already exists" | Duplicate field names | Use unique `name` props |
| "Invalid field type" | Typo in field type | Check `FieldType` union |
| "Validation failed" | Required field empty | Fill required fields |
| "Cannot submit form" | Missing `onSubmit` | Add submit handler |

Remember: Most issues are configuration-related. Double-check your config against the API reference!