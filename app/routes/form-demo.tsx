
import type { Route } from "./+types/form-demo"
import { MultiStepForm } from "../components/multi-step-form"
import { formConfig } from "~/lib/form-config"

export const meta: Route.MetaFunction = () => [{ title: "Multi Step Form Demo" }]

export default function FormDemo() {
  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="text-2xl font-semibold mb-4">Multi Step Form (Demo)</h1>
      <p className="text-sm text-muted-foreground mb-6">
        Contoh implementasi komponen MultiStepForm menggunakan konfigurasi dari app/lib/form-config.ts.
      </p>
      <MultiStepForm
        config={formConfig as any}
        onSubmit={(values) => {
          console.log("Submitted values:", values)
          alert("Form submitted! Cek console untuk data.")
        }}
      />
      <section className="mt-10">
        <h2 className="text-xl font-medium mb-2">Props yang bisa dikustomisasi</h2>
        <ul className="list-disc pl-6 text-sm">
          <li>config: StepConfig[] (struktur sesuai form.tsx)</li>
          <li>onSubmit(values): fungsi untuk menangani submit</li>
          <li>initialValues: nilai awal untuk seluruh field (opsional)</li>
          <li>className: class tambahan untuk wrapper form</li>
        </ul>
      </section>
    </div>
  )
}

/*
TypeScript interface untuk config file berada di: app/lib/form-types.ts

FieldConfig utama:
- name, label, type, required, placeholder, description, errorMessage
- colSpan: untuk layout grid
- options: untuk select/radio/checkbox (bisa array atau function untuk dynamic options)
- validation: zod schema kustom per field
- visibleIf(values): fungsi untuk menampilkan/menyembunyikan field berdasarkan nilai sebelumnya
- inputProps: tambahan props untuk komponen input

Best practices aksesibilitas:
- Komponen menggunakan ARIA attributes dari shadcn form primitives
- Navigasi tombol Previous/Next memiliki aria-label
- Progress indicator menggunakan role=list dan aria-current untuk step aktif
*/