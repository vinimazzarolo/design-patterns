import GenerateInvoices from "../src/GenerateInvoices";

test("deve gerar as notas fiscais por regime de caixa", async function() {
    const generateInvoices = new GenerateInvoices();
    const input = {
        month: 1,
        year: 2023,
        type: "cash"
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2023-01-05");
    expect(output.at(0)?.amount).toBe(6000);
});

test("deve gerar as notas fiscais por regime de competência", async function() {
    const generateInvoices = new GenerateInvoices();
    const input = {
        month: 1,
        year: 2023,
        type: "accrual"
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2023-01-01");
    expect(output.at(0)?.amount).toBe(500);
});

test("deve gerar as notas fiscais por regime de competência", async function() {
    const generateInvoices = new GenerateInvoices();
    const input = {
        month: 2,
        year: 2023,
        type: "accrual"
    };
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2023-02-01");
    expect(output.at(0)?.amount).toBe(500);
});
