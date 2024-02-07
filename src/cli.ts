import { loadConfig } from "./conf"
import doBuild from "./do-build"
import fs from "fs/promises"
import path from "path"
console.log(process.argv)
const conf = await loadConfig()
const actualArgs = process.argv.filter(a => !a.endsWith('bun') && !a.endsWith("cli.ts"))

const cmd = actualArgs[0]
switch(cmd) {
    case "build":
        await doBuild(conf)
        break;
    case "dev":

        Bun.serve({

                async fetch(req) {
                    let path = new URL(req.url).pathname;
                    console.log('load path', path)
                    if (path === "/")
                        path = '/index.html'
                    const file = Bun.file('dist/' + path);
                    return new Response(file);
            },
            port: 3000
        })
        await doBuild(conf)

        /*
        for await (const change of fs.watch("./",  {
            recursive: true,
        })) {
            
            console.log(change)

            if (change.filename.startsWith("dist/"))

                continue
            await doBuild(conf)
        }
        */
        break;

    default: 
    throw new Error("Unrecognised command:" +cmd)
}