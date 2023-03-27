

interface SecondaryResultsContinuationRequestBody {
    context: {
        client: Record<string, any>;
        user: {
            lockedSafetyMode: false
        }
    }
    continuation: string
}