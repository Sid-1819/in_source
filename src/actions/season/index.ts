"use server";

import { sql } from "drizzle-orm/sql";
import { db } from "~/server/db";
import { Season } from "~/types/season";

export async function getSeasonNameById(season_id: string) {

    const seasonName = await db.execute(sql`
        SELECT s.season_name FROM "season_tbl" s WHERE s.season_id = ${season_id};
    `);

    return seasonName.rows as unknown as Season[];
}