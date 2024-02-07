import { BuildConfig, Transpiler, } from "bun";
import html, { BunPluginHTMLOptions } from "bun-plugin-html"
import { existsSync } from "fs"
import path from "path"

export interface ServeConfig extends Omit<BuildConfig, 'entrypoints'> {
    indexPath?: string
    port?: number
    html?: BunPluginHTMLOptions
}

export function defineConfig(conf: ServeConfig): ServeConfig {
    return conf
}
export function getIndexPath(conf: ServeConfig): string {
    return conf.indexPath ?? "index.html"
}
export function getPort(conf: ServeConfig): number {
    return conf.port ?? 3000
}
export function getBuildConfig(conf: ServeConfig): BuildConfig {
    return {
        ...conf,
        outdir: "dist",
        entrypoints: [
            getIndexPath(conf)
        ],
        plugins: [
            html(conf.html ?? { plugins: conf.plugins })
        ]
    }
}
const exts = [".ts", ".js"]
export async function loadConfig(): Promise<ServeConfig> {
    const paths = exts.map(ext =>  path.join(process.cwd(), "bun.config"+ext))
    
    const  loadPath = paths.find(existsSync)

    if (!loadPath)
        throw new Error("No bun.config.ts/js file found!")


    console.log({loadPath})
        const conf: ServeConfig = await import(loadPath)
        console.log(conf)
        return conf
}