import fs from 'fs';
import { cwd } from 'process';
import path from 'path';

import { createClient } from './client'

type Query = {
    name: string;
}

export const applyMigrations = async () => {
    const client = await createClient();
    const appliedMigrations = await client.query<Query>('SELECT name FROM migrations');
    const appliedMigrationNames = appliedMigrations.rows.map(x => x.name);
    
    const folderPath = path.join(cwd(), 'migrations');
    const migrations = fs.readdirSync(folderPath);

    migrations.sort().forEach(async migrationToApply => {
        const migrationName = migrationToApply.split('.')[0];
        
        if (!appliedMigrationNames.includes(migrationName)) {
            const content: string = fs.readFileSync(path.join(folderPath, migrationToApply)).toString('utf-8');
            console.log(`executing ${content}`);

            await client.query(content);
            await client.query(`INSERT INTO migrations(name) VALUES (${migrationName})`);
        }
    })
}