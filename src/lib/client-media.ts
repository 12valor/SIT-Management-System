"use client";

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function fileToOptimizedDataUrl(
  file: File,
  options: { maxWidth?: number; maxHeight?: number; quality?: number } = {}
) {
  if (!file.type.startsWith("image/")) {
    return readFileAsDataUrl(file);
  }

  const maxWidth = options.maxWidth ?? 1200;
  const maxHeight = options.maxHeight ?? 1200;
  const quality = options.quality ?? 0.72;
  const sourceUrl = URL.createObjectURL(file);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed to load image for processing"));
      img.src = sourceUrl;
    });

    const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
    const width = Math.max(1, Math.round(image.width * scale));
    const height = Math.max(1, Math.round(image.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) return readFileAsDataUrl(file);

    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/webp", quality);
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}
