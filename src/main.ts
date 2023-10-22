import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";
import Mediator from "./infra/mediator/Mediator";
import JsonPresenter from "./infra/presenter/JsonPresenter";
import SendEmail from "./application/usecase/SendEmail";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const mediator = new Mediator();
const sendMail = new SendEmail();
mediator.on('InvoicesGenerated', async function(data: any) {
    await sendMail.execute(data);
});
const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository, new JsonPresenter(), mediator));
const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);
