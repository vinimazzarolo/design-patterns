import PgPromiseAdapter from "./PgPromiseAdapter";
import ContractDatabaseRepository from "./ContractDatabaseRepository";
import GenerateInvoices from "./GenerateInvoices";
import LoggerDecorator from "./LoggerDecorator";
import ExpressAdapter from "./ExpressAdapter";
import MainController from "./MainController";

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const generateInvoices = new LoggerDecorator(new GenerateInvoices(contractRepository));
const httpServer = new ExpressAdapter();
new MainController(httpServer, generateInvoices);
httpServer.listen(3000);
