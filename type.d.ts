import type { WithImplicitCoercion } from "node:buffer"
import type { BinaryLike } from "node:crypto"
import type Zlib from "node:zlib"

/**
 * LX Music 自定义源 API 类型定义
 */
export declare namespace LX {
    export type SupportPlatform = "kw" | "kg" | "tx" | "wy" | "mg" | "local"
    export type NetAction = "musicUrl" | "lyric" | "pic"
    export type Quality = "128k" | "320k" | "flac" | "flac24bit"

    /** 当前脚本信息 */
    export interface ScriptInfo {
        name: string
        description: string
        version: string
        author: string
        homepage: string
        rawScript: string
    }

    export interface EVENT_NAMES {
        inited: "inited"
        request: "request"
        updateAlert: "updateAlert"
    }

    export interface MusicInfo {
        name: string
        singer: string
        interval: string

        source: SupportPlatform
        songmid: string

        img: string
        albumName: string

        /** 仅限酷狗 */
        hash?: string
        /** 仅限咪咕 */
        copyrightId?: string
        
        [key: string]: any
    }

    export interface ProviderParams {
        source: SupportPlatform
        action: NetAction
        info: {
            type?:  Quality | null
            musicInfo: MusicInfo
        }
    }

    export interface LyricResult {
        lyric: string
        tlyric?: string | null
        rlyric?: string | null
        lxlyric?: string | null
    }
    
    export type ProviderResult = string | LyricResult

    export interface Provider {
        (params: ProviderParams): Promise<ProviderResult>
    }

    export interface OnEvent {
        (eventName: EVENT_NAMES["request"], handler: Provider): Promise<void>
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

    export interface SendEvent {
        (eventName: EVENT_NAMES["inited"], data: InitedPayload): Promise<void>
        (eventName: EVENT_NAMES["updateAlert"], data: UpdateAlertPayload): Promise<void>
    }

    export interface RequestOptions {
        /** 默认为 Get */
        method?: string
        headers?: Record<string, string>
        body?: any
        form?: Record<string, any>
        formData?: Record<string, any>
        timeout?: number
    }

    export interface RequestResponse {
        statusCode: number
        statusMessage: string
        headers: Record<string, string | string[] | undefined>
        bytes?: number,
        raw?: Uint8Array,
        body: any
    }

    export interface RequestCallback {
        (err: any, resp: RequestResponse | null, body: any): void
    }

    export interface Request {
        (
            url: string,
            options: RequestOptions,
            callback: RequestCallback
        ): () => void
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

    export interface API {
        /** API 版本号 */
        version: "2.0.0"
        /** 运行环境 */
        env: "desktop" | "mobile"
        currentScriptInfo: ScriptInfo
        /** 常量事件名 */
        EVENT_NAMES: EVENT_NAMES
        /** 注册事件监听 */
        on: OnEvent
        /** 发送事件 */
        send: SendEvent
        /** HTTP 请求方法 */
        request: Request
        /** 工具方法 */
        utils: Utils
    }
}