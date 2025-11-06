import * as React from "react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import type { Id } from "convex/_generated/dataModel";

export type UploadedFile = {
  name: string;
  size: number;
  type: string;
  url: string;
  storageId?: Id<"_storage">;
  fileId?: Id<"files">;
};

interface UseUploadFileProps {
  onUploadComplete?: (file: UploadedFile) => void;
  onUploadError?: (error: unknown) => void;
}

export function useUploadFile({
  onUploadComplete,
  onUploadError,
}: UseUploadFileProps = {}) {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile>();
  const [uploadingFile, setUploadingFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  const generateUploadUrl = useMutation(api.storage.generateUploadUrl);
  const saveUploadedFile = useMutation(api.storage.saveUploadedFile);

  async function uploadConvex(file: File) {
    setIsUploading(true);
    setUploadingFile(file);

    // Simulate progress in client while uploading (fetch tidak expose progress)
    let progressInterval: number | undefined;
    const startProgressSimulation = () => {
      const start = Date.now();
      progressInterval = window.setInterval(() => {
        // Naik perlahan hingga 90% selama ~1.5s, sisanya saat selesai
        const elapsed = Date.now() - start;
        const approx = Math.min(90, Math.floor((elapsed / 1500) * 90));
        setProgress(approx);
      }, 100);
    };

    try {
      startProgressSimulation();

      const uploadUrl = await generateUploadUrl();

      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });

      if (!res.ok) {
        throw new Error(`Upload gagal: ${res.status} ${res.statusText}`);
      }

      const json = (await res.json()) as { storageId: Id<"_storage"> };

      const saved = await saveUploadedFile({
        storageId: json.storageId,
        name: file.name,
        type: file.type,
        size: file.size,
      });

      const fileData: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: saved.url,
        storageId: json.storageId,
        fileId: saved.id as Id<"files">,
      };

      setProgress(100);
      setUploadedFile(fileData);
      onUploadComplete?.(fileData);

      return fileData;
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      onUploadError?.(error);
      throw error;
    } finally {
      if (progressInterval) window.clearInterval(progressInterval);
      setTimeout(() => setProgress(0), 300);
      setIsUploading(false);
      setUploadingFile(undefined);
    }
  }

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile: uploadConvex,
    uploadingFile,
  };
}

export function getErrorMessage(err: unknown) {
  const unknownError = "Terjadi kesalahan, silakan coba lagi.";

  if (err instanceof Error) {
    return err.message;
  }
  if (
    typeof err === "object" &&
    err !== null &&
    "toString" in (err as Record<string, unknown>)
  ) {
    return String(err);
  }
  return unknownError;
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
