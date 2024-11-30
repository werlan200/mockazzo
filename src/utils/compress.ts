import pako from "pako";

export function compressJSON(jsonObject: any) {
  // Convert JSON to a string
  const jsonString = JSON.stringify(jsonObject);

  // Compress the string into a Uint8Array
  const compressed = pako.deflate(jsonString);

  // Convert the Uint8Array to a Base64 string
  return btoa(String.fromCharCode(...compressed));
}

export function decompressJSON(encodedString: string) {
  // Convert the Base64 string back to a Uint8Array
  const compressed = Uint8Array.from(atob(encodedString), (char) =>
    char.charCodeAt(0)
  );

  // Decompress the Uint8Array to get the original string
  const jsonString = pako.inflate(compressed, { to: "string" });

  // Parse the string back to JSON
  return JSON.parse(jsonString);
}

export function copyStringToClipboard(copyText: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(copyText)
      .then(() => {
        console.log("Base64 string copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy the Base64 string:", err);
      });
  } else {
    console.error("Clipboard API not supported in this browser.");
  }
}

export async function readClipboard() {
  try {
    const clipboardContent = await navigator.clipboard.readText();
    return clipboardContent;
  } catch (error) {
    console.log(error);
  }
}
