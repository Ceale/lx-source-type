import Zlib from "node:zlib"
import Crypto from "node:crypto"

/**
 * LX Music 自定义源 API 类型定义
 */
export declare namespace LX {
    export type Quality = "128k" | "320k" | "flac" | "flac24bit"
    export type NetAction = "musicUrl" | "lyric" | "pic"
    export type SupportPlatform = "kw" | "kg" | "tx" | "wy" | "mg" | "local"

    export interface MusicInfo {
        name: string
        singer: string
        source: SupportPlatform
        songmid: string
        interval: string
        albumName: string
        img: string
        [key: string]: any
    }

    export interface LyricResult {
        lyric: string
        tlyric?: string | null
        rlyric?: string | null
        lxlyric?: string | null
    }

    export interface MRequestOptions {
        /** 默认为 Get */
        method?: string
        headers?: Record<string, string>
        body?: any
        form?: Record<string, any>
        formData?: Record<string, any>
        timeout?: number
    }

    export interface MRequestResponse {
        statusCode: number
        statusMessage: string
        headers: Record<string, string>
        bytes?: number,
        raw?: Uint8Array,
        body: any
    }

    export interface SourceInfo {
        name: string
        type: "music"
        actions: NetAction[]
        qualitys: Quality[]
    }

    export interface InitedPayload {
        sources: Partial<Record<SupportPlatform, SourceInfo>>
        openDevTools?: boolean
    }

    export interface UpdateAlertPayload {
        log: string
        updateUrl?: string
    }

    export interface ERequestParams {
        source: SupportPlatform
        action: NetAction
        info: {
            type?:  Quality | null
            musicInfo: MusicInfo
        }
    }
    
    export type ERequestResult = string | {
        lyric: string,
        tlyric: string | null
        rlyric: string | null
        lxlyric: string | null
    }

    export interface EVENT_NAMES {
        inited: "inited"
        request: "request"
        updateAlert: "updateAlert"
    }

    export interface Utils {
        buffer: {
            from: typeof Buffer.from
            bufToString(buffer: WithImplicitCoercion<ArrayLike<number> | string>, format: BufferEncoding): string
        }
        crypto: {
            aesEncrypt(buffer: BinaryLike, mode: string, key: string, iv: string): Buffer
            rsaEncrypt(buffer: any, key: string): Buffer
            randomBytes(size: number): Uint8Array
            /** 返回 hex 字符串 */
            md5(str: string): string
        }
        zlib: {
            inflate(buffer: Zlib.InputType): Promise<NonSharedBuffer>
            deflate(buffer: Zlib.InputType): Promise<NonSharedBuffer>
        }
    }

    /** 当前脚本信息 */
    export interface ScriptInfo {
        name: string
        description: string
        version: string
        author: string
        homepage: string
        rawScript: string
    }

    export interface API {
        /** API 版本号 */
        version: "2.0.0"
        /** 运行环境 */
        env: "desktop" | "mobile"
        currentScriptInfo: ScriptInfo
        /** 常量事件名 */
        EVENT_NAMES: EVENT_NAMES
        /** 注册事件监听 */
        on(eventName: EVENT_NAMES["request"], handler: (params: ERequestParams) => Promise<ERequestResult>): void
        /** 发送事件 */
        send(eventName: EVENT_NAMES["inited"], data: InitedPayload): void
        send(eventName: EVENT_NAMES["updateAlert"], data: UpdateAlertPayload): void
        /** HTTP 请求方法 */
        request(
            url: string,
            options: MRequestOptions,
            callback: (err: Error | null, resp: MRequestResponse, body: any) => void
        ): () => void

        /** 工具方法 */
        utils: LX.Utils
    }
}