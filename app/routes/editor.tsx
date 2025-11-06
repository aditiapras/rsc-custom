import { api } from "convex/_generated/api";
import { useMutation } from "convex/react";
import { Toaster, toast } from "sonner";
import { useEditor } from "~/components/rich-text-editor/editor-kit";
import { PlateEditor } from "~/components/rich-text-editor/plate-editor";

function SaveButton() {
  const editor = useEditor();
  const save = useMutation(api.documents.saveDocument);

  async function handleSave() {
    const content = editor.children;
    const title = "Untitled";
    try {
      const id = await save({ title, content });
      toast.success("Dokumen berhasil disimpan", { description: `ID: ${id}` });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan";
      toast.error("Terjadi kesalahan saat menyimpan", { description: message });
    }
  }

  return (
    <div className="flex w-full items-center justify-end gap-2 p-2">
      <button
        className="inline-flex h-9 items-center rounded-md bg-primary px-3 font-medium text-primary-foreground text-sm shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleSave}
        type="button"
      >
        Simpan
      </button>
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-screen w-full">
      <PlateEditor>
        <SaveButton />
      </PlateEditor>
      <Toaster />
    </div>
  );
}
