import Usecase from "../usecase/Usecase";

export default class LoggerDecorator implements Usecase {
    constructor(readonly usecase: Usecase) {}

    async execute(input: any): Promise<any> {
        console.log(input.userAgent);
        return await this.usecase.execute(input);
    }
}