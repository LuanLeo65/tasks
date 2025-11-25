export class ReqParamNotFoundError extends Error {
    param: string;
    constructor(param: string, message: string) {
        super(message);
        this.param = param;
    }
    }