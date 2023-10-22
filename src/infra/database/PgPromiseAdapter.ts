import pgp from "pg-promise";
import DatabaseConnection from "./DatabaseConnection";

export default class PgPromiseAdapter implements DatabaseConnection {
    connection: any;

    constructor() {
        this.connection = pgp()({ host: "localhost", port: 5432, user: "postgres", password: "postgres" });
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    close(): Promise<void> {
        return this.connection.$pool.end();
    }

}