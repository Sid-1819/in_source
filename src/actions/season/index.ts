import { sql } from "drizzle-orm/sql";
import { db } from "~/server/db";

export async function getSeasonNameById(season_id: number) {

    const seasonName = await db.execute(sql`
        SELECT s.season_name FROM "in-source_season" s WHERE s.season_id = ${season_id};
    `);

    return seasonName.rows as unknown as Season[];
}