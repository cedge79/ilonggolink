const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Get commit count
const count = execSync("git rev-list --count HEAD", { encoding: "utf8" }).trim();

// Read package.json
const pkgPath = path.join(__dirname, "..", "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

// Update patch version to commit count
const [major, minor] = pkg.version.split(".");
pkg.version = `${major}.${minor}.${count}`;

// Write back
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

console.log(`Version updated to ${pkg.version}`);
