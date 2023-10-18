import Contract from "./Contract";
import ContractRepository from "./ContractRepository";
import DatabaseConnection from "./DatabaseConnection";
import Payment from "./Payment";

export default class ContractDatabaseRepository implements ContractRepository {
    constructor(readonly connection: DatabaseConnection) { }

    async list(): Promise<Contract[]> {
        const contracts: Contract[] = [];
        const contractsData = await this.connection.query("SELECT * FROM contracts", []);
        for (const contractData of contractsData) {
            const contract = new Contract(contractData.id_contract, contractData.description, parseFloat(contractData.amount), contractData.periods, contractData.date);
            const paymentsData = await this.connection.query("select * from payments where id_contract = $1", [contract.idContract]);
            for (const paymentData of paymentsData) {
                contract.addPayment(new Payment(paymentData.id_payment, paymentData.date, parseFloat(paymentData.amount)));
            }
            contracts.push(contract);
        }
        return contracts;
    }
}