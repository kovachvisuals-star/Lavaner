// Copy existing publicly served Lovable media into this repository before hosting migration.
// Does not require Lovable credits or credentials. Fails closed if any file is unavailable.
import { readdir, readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("site");
const origins = [
  "https://lavaner.ee",
  "https://id-preview--32dfadb2-874c-4711-82f9-a9d0ae85f1c3.lovable.app",
];
const binaryPublicFiles = [
  "apple-touch-icon.png", "favicon-48x48.png", "favicon-96x96.png",
  "favicon.ico", "favicon.png", "icon-192.png", "icon-512.png",
  "lavaner-logo-exact.webp",
];
async function recurse(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const result = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) result.push(...await recurse(p));
    else if (e.isFile() && e.name.endsWith(".asset.json")) result.push(p);
  }
  return result;
}
function matchesMagic(bytes, name) {
  const s = name.toLowerCase();
  if (s.endsWith(".jpg") || s.endsWith(".jpeg"))
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (s.endsWith(".png"))
    return bytes.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"));
  if (s.endsWith(".webp"))
    return bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP";
  if (s.endsWith(".ico"))
    return bytes[0] === 0 && bytes[1] === 0 && (bytes[2] === 1 || bytes[2] === 2);
  if (s.endsWith(".mp4"))
    return bytes.toString("ascii", 4, 8) === "ftyp";
  return false;
}
async function fetchMedia(remotePath, expectedSize = null, validationPath = remotePath) {
  let latest = "";
  for (const origin of origins) {
    try {
      const response = await fetch(origin + remotePath, { signal: AbortSignal.timeout(20000) });
      if (!response.ok) throw Error("HTTP " + response.status);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!matchesMagic(bytes, validationPath)) throw Error("incorrect binary format (possibly HTML)");
      if (expectedSize != null && bytes.length !== expectedSize)
        throw Error("size mismatch expected " + expectedSize + " got " + bytes.length);
      return bytes;
    } catch (e) { latest = String(e); }
  }
  throw Error("Unable to retrieve " + remotePath + ": " + latest);
}
const descriptors = await recurse(path.join(root, "src/assets"));
const jobs = [];
for (const filename of descriptors) {
  const info = JSON.parse(await readFile(filename, "utf8"));
  if (typeof info.url !== "string" || !info.url.startsWith("/__l5e/assets-v1/"))
    throw Error("Unexpected asset path in " + filename);
  jobs.push({ remotePath: info.url, outputPath: path.join(root, "public", info.url), expectedSize: info.size, validationPath: info.content_type === "image/jpeg" ? info.url + ".jpg" : info.url });
}
for (const name of binaryPublicFiles)
  jobs.push({ remotePath: "/" + name, outputPath: path.join(root, "public", name), expectedSize: null });
console.log("Public media files to archive:", jobs.length);
let next = 0, failures = [];
await Promise.all(Array.from({ length: 5 }, async () => {
  while (next < jobs.length) {
    const job = jobs[next++];
    try {
      const bytes = await fetchMedia(job.remotePath, job.expectedSize, job.validationPath);
      await mkdir(path.dirname(job.outputPath), { recursive: true });
      await writeFile(job.outputPath, bytes);
      console.log("OK", job.remotePath, bytes.length);
    } catch (e) { failures.push(String(e)); console.error(String(e)); }
  }
}));
if (failures.length) {
  console.error("Media archive incomplete:", failures.length, "files failed; refusing to commit incomplete copy.");
  process.exitCode = 1;
} else {
  console.log("All public assets archived and validated:", jobs.length);
}
