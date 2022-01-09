import { createClient } from '../client';

export const checkAnyWaiting = async (reportId: number) => {
	const client = await createClient();

	const data = await client.query(`SELECT Id FROM waitforapprove WHERE reportid=${reportId}`);

	return data.rowCount > 0;
};
