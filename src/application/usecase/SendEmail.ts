export default class SendEmail {
    constructor() {}
    
    async execute(input: any): Promise<void> {
        console.log('sending email...');
        console.log(input);
    }
}