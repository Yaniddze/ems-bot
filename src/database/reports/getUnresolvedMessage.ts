import { createClient } from "../client"
import { Report } from "./types";

type Query = Pick<Report, 'messageid'>;

export const getUnresolvedMessage = async (userId: string) => {
    const client = await createClient();

    const found = await client.query<Query>(`SELECT messageid FROM reports WHERE badguy='${userId}' AND resolved=FALSE`);

    return found.rows[0]?.messageid || '';
}