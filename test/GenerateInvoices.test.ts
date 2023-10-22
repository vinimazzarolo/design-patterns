import ContractDatabaseRepository from "../src/infra/repository/ContractDatabaseRepository";
import ContractRepository from "../src/application/repository/ContractRepository";
import CsvPresenter from "../src/infra/presenter/CsvPresenter";
import DatabaseConnection from "../src/infra/database/DatabaseConnection";
import GenerateInvoices from "../src/application/usecase/GenerateInvoices";
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;
let contractRepository: ContractRepository;

beforeEach(async function() {
    /*
    const contractRepository: ContractRepository = {
        async list(): Promise<any> {
            return [
                {
                    idContract: "",
                    description: "",
                    periods: 12,
                    amount: "6000",
                    date: new Date("2023-01-01T10:00:00"),
                    payments: [
                        {
                            idPayment: "",
                            idContract: "",
                            amount: "6000",
                            date: new Date("2023-01-05T10:00:00")
                        }
                    ]
                }
            ]
        },
    };
    */
    
    connection = new PgPromiseAdapter();
    contractRepository = new ContractDatabaseRepository(connection);
    generateInvoices = new GenerateInvoices(contractRepository);
});

test("deve gerar as notas fiscais por regime de caixa", async function() {
    const input = {
        month: 1,
        year: 2023,
        type: "cash"
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual(new Date("2023-01-05T13:00:00.000Z"));
    expect(output.at(0)?.amount).toBe(6000);
});

test("deve gerar as notas fiscais por regime de competência", async function() {
    const input = {
        month: 1,
        year: 2023,
        type: "accrual"
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual(new Date("2023-01-01T13:00:00.000Z"));
    expect(output.at(0)?.amount).toBe(500);
});

test("deve gerar as notas fiscais por regime de competência", async function() {
    const input = {
        month: 2,
        year: 2023,
        type: "accrual"
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toEqual(new Date("2023-02-01T13:00:00.000Z"));
    expect(output.at(0)?.amount).toBe(500);
});

test("deve gerar as notas fiscais por regime de competência por CSV", async function() {
    const input = {
        month: 1,
        year: 2023,
        type: "accrual"
    };
    const presenter = new CsvPresenter();
    const generateInvoices = new GenerateInvoices(new ContractDatabaseRepository(connection), presenter);
    const output = await generateInvoices.execute(input);
    expect(output).toBe("2023-01-01;500");
});

afterEach(async() => {
    connection.close();
});
