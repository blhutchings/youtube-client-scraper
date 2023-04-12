
/*
//https://api.ssllabs.com/api/v3/getClients
export class UserAgentTLSMatcher {
    userAgents: string[] = []
    suiteNames: string[][] = []

    constructor(clients: ClientType[]) {
        clients.forEach((client) => {
            if (!client.userAgent) return
            if (!client.suiteNames) return
            this.userAgents.push(client.userAgent)
            this.suiteNames.push(client.suiteNames)
        })
    }

    getCipherSuites(ua: string, similarityCutoff: number = 0) {
        const ratings = stringSimilarity.findBestMatch(ua, this.userAgents)
        if (ratings.bestMatch.rating < similarityCutoff) return undefined
        return this.suiteNames[ratings.bestMatchIndex].join(':')
    }
}
*/