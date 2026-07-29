import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
const SKIP = new Set(["icons", "og", "event"]);
const out = {};
async function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (!SKIP.has(e.name)) await walk(f); continue; }
    if (!/\.(jpg|jpeg|png)$/i.test(e.name) || /-\d+w\./.test(e.name)) continue;
    try { const m = await sharp(f).metadata();
      out["/" + path.relative("public", f).split(path.sep).join("/")] = { width: m.width, height: m.height };
    } catch {}
  }
}
await walk("public");
fs.writeFileSync("public/image-manifest.json", JSON.stringify(out, null, 2));
console.log("manifest entries:", Object.keys(out).length);
