#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");
const pkg = require("../package.json");

const SKILLS = [
  "start",
  "design-details",
  "design-details-animation",
  "design-details-layout",
  "design-details-copy",
  "design-details-typography",
  "design-details-color",
  "design-details-accessibility",
  "design-details-analytics",
];

const skillsDir = path.join(__dirname, "..", "skills");
const targetDir = path.join(os.homedir(), ".claude", "skills");

fs.mkdirSync(targetDir, { recursive: true });

let installed = [];
let skipped = [];

for (const skill of SKILLS) {
  const src = path.join(skillsDir, skill);
  const dest = path.join(targetDir, skill);

  if (!fs.existsSync(src)) {
    continue;
  }

  if (fs.existsSync(dest)) {
    const stat = fs.lstatSync(dest);
    if (stat.isSymbolicLink() && fs.readlinkSync(dest) === src) {
      skipped.push(skill);
      continue;
    }
    fs.renameSync(dest, `${dest}.bak`);
    console.log(`  ↩  Backed up existing ${skill} → ${skill}.bak`);
  }

  fs.symlinkSync(src, dest);
  installed.push(skill);
}

const banner = installed.length
  ? `\n✦ design-details v${pkg.version} installed`
  : `\n✦ design-details v${pkg.version} — already up to date`;

console.log(banner);

if (installed.length) {
  console.log(`  Skills linked: ${installed.join(", ")}`);
}
if (skipped.length && !installed.length) {
  console.log(`  No changes needed.`);
}
console.log(`  See CHANGELOG.md for what changed: https://github.com/GeorgeTurp/design-details/blob/main/CHANGELOG.md\n`);
