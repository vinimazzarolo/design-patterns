import axios from "axios";

test("deve gerar as faturas pela API", async function() {
    const input = {
        month: 1,
        year: 2023,
        type: "cash"
    };
    const response = await axios.post("http://localhost:3000/generate-invoices", input);
    const output = response.data;
    expect(output.at(0)?.date).toBe("2023-01-05T13:00:00.000Z");
    expect(output.at(0)?.amount).toBe(6000);
});