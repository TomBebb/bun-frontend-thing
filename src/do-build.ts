import { ServeConfig, getBuildConfig } from "./conf";

export default async function doBuild(conf: ServeConfig) {
    const buildConf = getBuildConfig(conf)

    console.log(buildConf)
    await Bun.build(buildConf)
}