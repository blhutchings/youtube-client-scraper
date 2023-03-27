import { RecursivePartial } from "./RecursivePartial.js"

// This was created by taking the initial data out of Chrome/111.0.0.0 and transforming it
export type YouTubeConfig = RecursivePartial<{
    GAPI_LOCALE: string;
    INNERTUBE_API_KEY: string
    INNERTUBE_CONTEXT: {
        client: {
            hl: string
            gl: string
            remoteHost: string
            deviceMake: string
            deviceModel: string
            visitorData: string
            userAgent: string
            clientName: string
            clientVersion: string
            osName: string
            osVersion: string
            originalUrl: string
            platform: string
            clientFormFactor: string
            configInfo: {
                appInstallData: string
            }
            userInterfaceTheme: string
            timeZone: string
            browserName: string
            browserVersion: string
            acceptHeader: string
            deviceExperimentId: string
        }
        user: {
            lockedSafetyMode: boolean
        }
        request: {
            useSsl: boolean
        }
        clickTracking: {
            clickTrackingParams: string
        }
    }
    INNERTUBE_CONTEXT_CLIENT_NAME: number,
    INNERTUBE_CONTEXT_CLIENT_VERSION: string,
    LOGGED_IN: boolean,
}>
