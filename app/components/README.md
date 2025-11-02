# Components

Koleksi komponen React yang dapat digunakan kembali untuk aplikasi ini.

## Multi Step Form

Komponen form multi-langkah yang fleksibel dengan validasi real-time.

### Quick Start

```tsx
import { MultiStepForm } from "./multi-step-form"

const config = [
  {
    step_number: 1,
    title: "Step 1",
    field: [
      {
        label: "Name",
        type: "text",
        required: true
      }
    ]
  }
]

<MultiStepForm 
  config={config} 
  onSubmit={(data) => console.log(data)} 
/>
```

### Supported Field Types

- `text` - Input teks
- `password` - Input password
- `email` - Input email dengan validasi
- `number` - Input numerik
- `textarea` - Text area
- `select` - Dropdown
- `radio` - Radio buttons
- `checkbox` - Checkbox (single atau array)
- `switch` - Toggle switch
- `date` - Date picker
- `file` - File upload

### Features

- ✅ Validasi real-time dengan Zod
- ✅ Progress indicator
- ✅ Responsive grid layout
- ✅ TypeScript support
- ✅ Accessible
- ✅ Customizable styling

### Documentation

Lihat dokumentasi lengkap di [docs/multi-step-form.md](../../docs/multi-step-form.md)

### Example Usage

Contoh penggunaan dapat dilihat di:
- `app/routes/form-demo.tsx` - Demo implementasi
- `app/lib/form-config.ts` - Contoh konfigurasi

## UI Components

Folder `ui/` berisi komponen UI dasar yang digunakan oleh komponen lain, sebagian besar dari shadcn/ui.

### Available Components

- Button
- Input
- Textarea
- Select
- Checkbox
- Switch
- Radio Group
- Calendar
- Popover
- Form components
- Dan lainnya...

## Development

### Adding New Components

1. Buat file komponen baru di folder ini
2. Export komponen dari file
3. Tambahkan TypeScript interfaces jika diperlukan
4. Buat dokumentasi jika komponen kompleks
5. Tambahkan contoh penggunaan

### Best Practices

1. Gunakan TypeScript untuk type safety
2. Ikuti naming convention yang konsisten
3. Buat komponen yang reusable
4. Tambahkan prop validation
5. Dokumentasikan props dan usage
6. Test komponen sebelum commit

### Testing

Untuk test komponen:

```bash
# Run development server
npm run dev

# Visit form demo
http://localhost:5173/form-demo
```