import { createClient } from '../client';

export const removeUserReports = async (userId: string) => {
	const client = await createClient();

	await client.query(`UPDATE reports SET resolved=TRUE WHERE badguy='${userId}' AND resolved=FALSE`);
};
