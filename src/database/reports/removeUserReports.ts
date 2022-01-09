import { createClient } from "../client"

export const removeUserReports = async (userId: string) => {
    const client = await createClient();

    console.log(userId);
    
    await client.query(`DELETE FROM reports WHERE badguy='${userId}' AND resolved=FALSE`);
}