import { AbstractSqliteQueryRunner } from "../sqlite-abstract/AbstractSqliteQueryRunner";
import { CapacitorDriver } from "./CapacitorDriver";
import { ObjectLiteral } from "../..";
/**
 * Runs queries on a single sqlite database connection.
 */
export declare class CapacitorQueryRunner extends AbstractSqliteQueryRunner {
    /**
     * Database driver used by connection.
     */
    driver: CapacitorDriver;
    constructor(driver: CapacitorDriver);
    executeSet(set: {
        statement: string;
        values?: any[];
    }[]): Promise<any>;
    /**
     * Executes a given SQL query.
     */
    query(query: string, parameters?: any[]): Promise<any>;
    /**
     * Parametrizes given object of values. Used to create column=value queries.
     */
    protected parametrize(objectLiteral: ObjectLiteral): string[];
}
