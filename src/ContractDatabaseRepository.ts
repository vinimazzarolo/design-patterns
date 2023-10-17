import pgp from "pg-promise";
import ContractRepository from "./ContractRepository";

export default class ContractDatabaseRepository implements ContractRepository {
    async list(): Promise<any> {
        const connection = pgp()({ host: "localhost", port: 5432, user: "postgres", password: "postgres" });
        const contracts = await connection.query("SELECT * FROM contracts", []);
        for (const contract of contracts) {
            contract.payments = await connection.query("select * from payments where id_contract = $1", [contract.id_contract]);
        }
        await connection.$pool.end();
        return contracts;
    }
}