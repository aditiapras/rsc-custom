import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { createSlateEditor } from "platejs";
import { PlateStatic } from "platejs/static";
import { BaseEditorKit } from "~/components/rich-text-editor/editor-base-kit";
import type { Route } from "./+types/preview";

export async function loader() {
  const data = await fetchQuery(api.documents.getDocumentById, {
    id: "j57djddhqmfps63v38g25057p17tta50" as Id<"documents">,
  });
  return data;
}

export default function PreviewPage({ loaderData }: Route.ComponentProps) {
  const editor = createSlateEditor({
    plugins: BaseEditorKit,
    value: loaderData?.content,
  });
  return (
    <div className="mx-auto w-full max-w-5xl">
      <PlateStatic editor={editor} />
    </div>
  );
}
