import { createClient } from "../client";
import { Report } from "./types";

export const addReport = async (report: Omit<Report, 'id'| 'resolved'>) => {
    const keys = Object.keys(report);
    const values = keys.map(key => "'" + report[key] + "'");
    let query = `INSERT INTO reports(${keys.join(', ')}, resolved) VALUES (${values.join(', ')}, FALSE)`;
    const client = await createClient();

    await client.query(query);
}