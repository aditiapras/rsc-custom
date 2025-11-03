// Konfigurasi multi-step form yang sesuai dengan struktur yang digunakan di `form.tsx`
// Catatan: `form.tsx` menentukan nama field secara otomatis dari label (slugify), sehingga properti `name` bersifat opsional.
// Validasi menggunakan objek `validation` (min, max, minLength, maxLength, pattern, dateMin, dateMax, fileMaxSizeMB)
// dan properti `required`. Tidak menggunakan Zod langsung di config ini.

export const formConfig = [
  {
    step_number: 1,
    title: "Sign Up",
    description: "Create a new account",
    layout: { columns: 1 as 1 },
    field: [
      {
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter your email",
        error_message: "Please enter a valid email address",
        colSpan: 1,
      },
      {
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Enter your password",
        error_message: "Please enter a valid password",
        colSpan: 1,
        validation: { minLength: 8 },
      },
    ],
  },
  {
    step_number: 2,
    title: "Profile",
    description: "Tell us more about you",
    layout: { columns: 2 as 2 },
    field: [
      {
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter your full name",
        colSpan: 2,
        validation: { minLength: 2 },
      },
      {
        label: "ID",
        type: "file",
        required: true,
        placeholder: "Upload your ID",
        colSpan: 2,
        validation: { fileMaxSizeMB: 10 },
      },
      {
        label: "Birth Date",
        type: "date",
        required: true,
        placeholder: "Select your birth date",
        colSpan: 1,
      },
      {
        label: "Gender",
        type: "radio",
        required: true,
        colSpan: 1,
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Prefer not to say", value: "na" },
        ],
      },
      {
        label: "Subscribe to newsletter",
        type: "switch",
        required: false,
        colSpan: 2,
      },
      {
        label: "Newsletter Frequency",
        type: "select",
        required: true,
        placeholder: "Select frequency",
        colSpan: 2,
        options: [
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
          { label: "Quarterly", value: "quarterly" },
        ],
        // Catatan: form.tsx belum mendukung visibleIf. Jika ingin conditional visibility,
        // kita bisa menambahkan dukungan ini ke form.tsx nanti.
      },
    ],
  },
  {
    step_number: 3,
    title: "Preferences",
    description: "Choose your interests",
    layout: { columns: 2 as 2 },
    field: [
      {
        label: "Country",
        type: "select",
        required: true,
        placeholder: "Select your country",
        colSpan: 2,
        options: [
          { label: "Indonesia", value: "ID" },
          { label: "Malaysia", value: "MY" },
          { label: "Singapore", value: "SG" },
        ],
      },
      {
        label: "Interests",
        type: "checkbox",
        required: true,
        colSpan: 2,
        description: "Select at least one",
        options: [
          { label: "Technology", value: "tech" },
          { label: "Design", value: "design" },
          { label: "Business", value: "business" },
        ],
        // Catatan: validasi minimal 1 item untuk checkbox array belum didukung di schema bawaan form.tsx.
        // Kita bisa menambahkannya nanti di schemaForField.
      },
      {
        label: "About You",
        type: "textarea",
        required: false,
        placeholder: "Tell us about yourself",
        colSpan: 2,
        validation: { maxLength: 500 },
      },
    ],
  },
]

export default formConfig