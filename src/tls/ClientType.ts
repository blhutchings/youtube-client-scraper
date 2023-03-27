import UAParser from 'ua-parser-js';

export interface ClientType {
    id: number,
    name: string
    version: string
    hexHandshakeBytes: string,
    handshakeFormat: string,
    lowestProtocol: number,
    highestProtocol: number,
    userAgent: string,
    isGrade0: boolean,
    maxDhBits: number,
    abortsOnUnrecognizedName: boolean,
    maxRsaBits: number,
    minDhBits: number,
    requiresSha2: boolean,
    minRsaBits: number,
    minEcdsaBits: number,
    suiteIds: number[],
    suiteNames: string[],
    supportsSni: boolean,
    supportsCompression: boolean,
    supportsStapling: boolean,
    supportsTickets: boolean,
    supportsRi: boolean,
    signatureAlgorithms: [],
    ellipticCurves: number[],
    supportsNpn: boolean,
    npnProtocols: string[],
    alpnProtocols: string[]
}

export interface ParsedUserAgent {
    userAgentParsed: UAParser.IResult
}
