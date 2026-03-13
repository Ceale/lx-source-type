/**
 * @name LX_API_TEST
 * @description 测试洛雪音乐自定义源的API是否完整、且可以正常工作
 * @version 1.0.0
 * @author Ceale
 */

const { EVENT_NAMES, on, send, request, utils, version, env, currentScriptInfo } = globalThis.lx

console.log("正在发送 inited 事件...")
send(EVENT_NAMES.inited, {
    openDevTools: true,
    sources: {
        local: {
            name: "本地测试源",
            type: "music",
            actions: ["musicUrl", "lyric", "pic"],
            qualitys: []
        }
    }
})

console.log("正在发送 inited 事件...")
on(EVENT_NAMES.request, ({ source, action, info }) => {
    log(source, action, info)
})

const log = console.log
log("LX_API_TEST")

log(utils.buffer.from("str", "utf8"))
log(utils.buffer.bufToString("str", "utf8"))
log(utils.buffer.bufToString({ valueOf: () => "114" }, "utf8"))
log(utils.buffer.bufToString(utils.buffer.from("str", "utf8"), "utf8"))

request("http://baidu.com", { body: {} }, (err, res, body) => {
    log(err, res, body)
})