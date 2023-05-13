import fs from "fs"
const dir = "./lib"

fs.rmSync(dir, { recursive: true, force: true });