import HttpServer from "./HttpServer";
import Usecase from "./Usecase";

export default class MainController {
    constructor(readonly httpServer: HttpServer, readonly usecase: Usecase) {
        httpServer.on("post", "/generate-invoices", async function(params: any, body: any, headers: any) {
            const input = body;
            input.userAgent = headers["user-agent"];
            input.host = headers.host;            
            const output = await usecase.execute(body);
            return output;
        })
    }
}