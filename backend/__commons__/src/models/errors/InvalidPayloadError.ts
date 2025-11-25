export class InvalidPayloadError extends Error {
    constructor(message: string) {
        super(message);
    }
}