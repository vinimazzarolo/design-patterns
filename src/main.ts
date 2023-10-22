import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ContractDatabaseRepository from "./infra/repository/ContractDatabaseRepository";
import GenerateInvoices from "./application/usecase/GenerateInvoices";
import LoggerDecorator from "./application/decorator/LoggerDecorator";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import MainController from "./infra/http/MainController";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository));
const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);
