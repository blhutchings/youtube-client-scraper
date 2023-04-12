import fs from "fs";

// Used to remove ipv4 like strings to make sure I don't dox myself
const ipRE = new RegExp(/(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/, 'gim')
const regexes = [ipRE]

async function PIISubsitution(file, recursive = true) {
    const fileStat = await fs.promises.lstat(file)
    if (fileStat.isDirectory()) {
        if(recursive) {
            let fileNames = (await fs.promises.readdir(file)).filter(item => !/(^|\/)\.[^/.]/g.test(item)) // Ignore hidden files
            fileNames.forEach(async (innerFile) => await PIISubsitution(`${file}\\${innerFile}`));
        }
    } else {
        replacePII(file)
    }
}

async function replacePII(file) {
    let contents = (await fs.promises.readFile(file)).toString()
    regexes.forEach(re => (contents = contents.replace(re, "[REDACTED]")))
    await fs.promises.writeFile(file, contents)
}


PIISubsitution(".\\reference-data");
