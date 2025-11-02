/**
 * Contoh penggunaan sederhana Multi Step Form
 * 
 * File ini menunjukkan cara menggunakan komponen MultiStepForm
 * dengan konfigurasi yang minimal dan mudah dipahami.
 */

import { MultiStepForm, type StepConfig } from "~/components/multi-step-form"

// Konfigurasi form sederhana dengan 2 step
const simpleFormConfig: StepConfig[] = [
  {
    step_number: 1,
    title: "Informasi Dasar",
    description: "Masukkan informasi dasar Anda",
    layout: { columns: 1 },
    field: [
      {
        label: "Nama Lengkap",
        type: "text",
        required: true,
        placeholder: "Masukkan nama lengkap Anda",
        validation: { minLength: 2 }
      },
      {
        label: "Email",
        type: "email",
        required: true,
        placeholder: "contoh@email.com"
      },
      {
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Minimal 8 karakter",
        validation: { minLength: 8 }
      }
    ]
  },
  {
    step_number: 2,
    title: "Preferensi",
    description: "Pilih preferensi Anda",
    layout: { columns: 2 },
    field: [
      {
        label: "Negara",
        type: "select",
        required: true,
        placeholder: "Pilih negara",
        colSpan: 1,
        options: [
          { label: "Indonesia", value: "ID" },
          { label: "Malaysia", value: "MY" },
          { label: "Singapura", value: "SG" }
        ]
      },
      {
        label: "Jenis Kelamin",
        type: "radio",
        required: true,
        colSpan: 1,
        options: [
          { label: "Laki-laki", value: "male" },
          { label: "Perempuan", value: "female" }
        ]
      },
      {
        label: "Minat",
        type: "checkbox",
        required: true,
        colSpan: 2,
        options: [
          { label: "Teknologi", value: "tech" },
          { label: "Desain", value: "design" },
          { label: "Bisnis", value: "business" }
        ]
      },
      {
        label: "Berlangganan Newsletter",
        type: "switch",
        required: false,
        colSpan: 2
      }
    ]
  }
]

export default function SimpleFormExample() {
  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("Form submitted with values:", values)
    
    // Contoh data yang akan diterima:
    // {
    //   namaLengkap: "John Doe",
    //   email: "john@example.com",
    //   password: "mypassword123",
    //   negara: "ID",
    //   jenisKelamin: "male",
    //   minat: ["tech", "design"],
    //   berlanggananNewsletter: true
    // }
    
    alert("Form berhasil disubmit! Cek console untuk melihat data.")
  }

  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-3xl font-bold mb-2">Contoh Form Sederhana</h1>
      <p className="text-muted-foreground mb-8">
        Ini adalah contoh penggunaan MultiStepForm dengan konfigurasi sederhana.
      </p>
      
      <MultiStepForm
        config={simpleFormConfig}
        onSubmit={handleSubmit}
        initialValues={{
          // Opsional: nilai awal untuk form
          namaLengkap: "",
          email: ""
        }}
        className="bg-card p-6 rounded-lg border"
      />
      
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold mb-2">Tips:</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Field dengan tanda (*) wajib diisi</li>
          <li>• Form akan memvalidasi input secara real-time</li>
          <li>• Tombol "Next" hanya aktif jika semua field valid</li>
          <li>• Data form akan ditampilkan di console saat submit</li>
        </ul>
      </div>
    </div>
  )
}

/**
 * Cara menggunakan contoh ini:
 * 
 * 1. Import komponen ini ke dalam route atau page
 * 2. Render komponen SimpleFormExample
 * 3. Test form dengan mengisi semua field
 * 4. Lihat hasil di console browser
 * 
 * Untuk kustomisasi lebih lanjut, lihat:
 * - docs/multi-step-form.md untuk dokumentasi lengkap
 * - app/lib/form-config.ts untuk contoh konfigurasi kompleks
 */