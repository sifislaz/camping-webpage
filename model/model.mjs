import pg from "pg"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config();

const pool = new pg.Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }
});

async function connect(){
    try{
        const client = await pool.connect();
        return client;
    }
    catch(e){
        console.log(`Connection failure ${e}`);
    }
}

export async function getReservation(reservationId, callback){
    const sqlQuery = `SELECT * FROM "RESERVATION" WHERE "id" = '${reservationId}' limit 1`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows[0])
    }
    catch(err){
        callback(err, null);
    }
}

export async function insertReservation(reservation, callback){
    const sqlQuery = `INSERT INTO "RESERVATION" ("checkin", "checkout", "situation", "no_of_people", "client_id", "reservation_date")
                    VALUES ('${reservation.checkin}',
                            '${reservation.checkout}',
                            '${reservation.situation}',
                            '${reservation.no_of_people}',
                            '${reservation.client_id}',
                            '${reservation.reservation_date}')`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        console.log(res.rows);
        callback(null, res.rows)
    }
    catch(err){
        callback(err, null);
    }
}

export async function getLastReservationId(callback){
    const sqlQuery = `SELECT "id" FROM "RESERVATION" ORDER BY "id" DESC LIMIT 1`;

    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        console.log(res.rows[0]);
        callback(null, res.rows[0])
    }
    catch(err){
        callback(err, null);
    }
}

export async function cancelBooking(bookingId, callback){
    getReservation(bookingId, async (err,result)=>{
        if(result === undefined){
            callback("Booking doesn't exist", null);
        }
        else{
            const sqlQuery = `UPDATE "RESERVATION" SET "situation" = 'CANCELLED' WHERE "id" = '${bookingId}'`;
            try{
                const client = await connect();
                const res = await client.query(sqlQuery);
                client.release();
                callback(null, res.rows[0]);
            }
            catch(err){
                console.log(err);
                callback(err, null);
            }
        }
    })
}

export async function deleteSpaceReservation(bookingId, callback){
    const sqlQuery = `DELETE FROM "RESERVES" WHERE "reservation_id"='${bookingId}'`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        console.log(res.rows[0]);
        callback(null, res.rows[0])
    }
    catch(err){
        callback(err, null);
    }
}

export async function reservedSpace(reservation, callback){
    const sqlQuery = `INSERT INTO "RESERVES" VALUES('${reservation.reservation_id}', '${reservation.space_id}', '${reservation.checkin}', '${reservation.checkout}')`
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        console.log(res.rows[0]);
        callback(null, res.rows[0])
    }
    catch(err){
        callback(err, null);
    }
}


export async function getAllReservations(callback){
    const sqlQuery = `SELECT "R"."id", "C"."lastname", "R"."no_of_people", "S"."space_id", "R"."checkin", "R"."checkout"
    FROM "RESERVATION" AS "R" JOIN "CLIENT" AS "C" ON "R"."client_id"="C"."id" JOIN "RESERVES" AS "S" ON "S"."reservation_id"="R"."id" ORDER BY "R"."id"`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows)
    }
    catch(err){
        callback(err, null);
    }
}

export async function getUserReservations(clientId, callback){
    const sqlQuery = `SELECT * FROM "RESERVATION" WHERE "client_id" = '${clientId}' ORDER BY "reservation_date"`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows)
    }
    catch(err){
        callback(err, null);
    }
}



export async function getClientsNum(callback){
    const sqlQuery = `SELECT COUNT(*) FROM "CLIENT"`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}

export async function getReservationNum(callback){
    const sqlQuery = `SELECT COUNT(*) FROM "RESERVATION"`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}

export async function getBestClient(callback){
    const sqlQuery = `SELECT "firstname", "lastname"
    FROM public."CLIENT"
    GROUP BY "id"
    HAVING "id" = (
        SELECT "client_id"
        FROM public."RESERVATION"
        GROUP BY "client_id"
        HAVING COUNT("client_id")=(
            SELECT MAX("counter")
            FROM(
                SELECT "client_id", COUNT("id") AS "counter"
                FROM public."RESERVATION"
                GROUP BY "client_id"
            ) AS "maximum"
        )
        limit 1
    )`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}

export async function updateClient(client, callback){
    const sqlQuery = `UPDATE "CLIENT" SET "firstname"='${client.firstname}', "lastname"='${client.lastname}',
                        "email"='${client.email}', "password"='${client.password}', "mobile"='${client.mobile}' WHERE "id" = '${client.id}'`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}

export async function getClientByUsername(username, callback){
    const sqlQuery = `SELECT "id", "username", "password" FROM "CLIENT" WHERE "username" = '${username}' LIMIT 1`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows[0]);
    }
    catch(err){
        callback(err,null);
    }
}

export async function getClientById(id, callback){
    const sqlQuery = `SELECT * FROM "CLIENT" WHERE "id" = '${id}' LIMIT 1`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err,null);
    }
}

export async function getAdminByUsername(username, callback){
    const sqlQuery = `SELECT * FROM "ADMIN" WHERE "username"= '${username}' LIMIT 1`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows[0]);
    }
    catch(err){
        callback(err,null);
    }
}

export async function insertClient(cl, callback){
    getClientByUsername(cl.username, async(err,userId)=>{
        if(userId !== undefined){
            callback(null, null, {message:"User exists"})
        }
        else{
            try{
                const client = await connect();
                const hashPass = await bcrypt.hash(cl.password, 10);
                const sqlQuery = `INSERT INTO "CLIENT"("username", "password", "email", "firstname", "lastname", "mobile")
                                VALUES ('${cl.username}','${hashPass}','${cl.email}', '${cl.firstname}', '${cl.lastname}', '${cl.mobile}')`;
                const res = await client.query(sqlQuery);
                client.release();
                callback(null, res);
            }
            catch(err){
                callback(err,null);
            }
        }
    })
}


export async function getSpacesByPeople(details, callback){

    const sqlQuery = `SELECT * FROM "SPACE" WHERE "id" in (
        SELECT "id" FROM "SPACE" EXCEPT
        (
        SELECT "id" FROM "SPACE" AS "S" JOIN "RESERVES" AS "R" ON "S"."id" = "space_id"
        WHERE ('${details.checkin}' BETWEEN "R"."checkin" AND "R"."checkout") OR ('${details.checkout}' BETWEEN "R"."checkin" AND "R"."checkout")
        )
    ) AND "no_of_people" = '${details.nop}' ORDER BY "id"`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows)
    }
    catch(err){
        console.log(err);
        callback(err, null);
    }
}

export async function getSpaceFromId(spaceId, callback){
    const sqlQuery = `SELECT * FROM "SPACE" WHERE "id"='${spaceId};`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows)
    }
    catch(err){
        callback(err, null);
    }
}

export async function getSpaceFromBooking(bookingId, callback){
    const sqlQuery = `SELECT "R"."id", "R"."checkin", "R"."checkout", "R"."no_of_people", "S"."no_of_people" AS "space_capacity", "S"."location"
                    FROM "RESERVATION" AS "R" JOIN "RESERVES" ON "R"."id" = "reservation_id" JOIN "SPACE" AS "S" ON "S"."id" = "space_id"
                    WHERE "R"."id" = '${bookingId}'`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        console.log(res.rows);
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}

export async function insertSpace(space, callback){
    const sqlQuery = `INSERT INTO "SPACE"("location","no_of_people","admin_id") VALUES(
                   ${space.location}, ${space.noOfPeople}, ${space.adminId})`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}

export async function deleteSpace(spaceId, callback){
    getSpaceFromId(spaceId, async (err,result)=>{
        if(result === undefined){
            callback("Space doesn't exist", null);
        }
        else{
            const sqlQuery = `DELETE FROM "SPACE" WHERE "id" = '${spaceId}'`;
            try{
                const client = await connect();
                const res = await client.query(sqlQuery);
                client.release();
                callback(null, res.rows);
            }
            catch(err){
                callback(err, null);
            }
        }
    });
    
}

export async function getSpaces(callback){
    const sqlQuery = `SELECT "S"."id", "S"."location", "S"."no_of_people", "R"."checkin", "R"."checkout" FROM "SPACE" AS "S" LEFT OUTER JOIN "RESERVES" AS "R" ON "S"."id"="R"."space_id" ORDER BY "S"."id"`;
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}

export async function updateReservation(info, callback){
    
    const sqlQuery = `UPDATE "RESERVATION" SET "no_of_people"='${info.nop}', "checkin"='${info.checkin}', "checkout"='${info.checkout}' WHERE "id"='${info.reservation_id}'`
    try{
        const client = await connect();
        const res = await client.query(sqlQuery);
        client.release();
        callback(null, res.rows);
    }
    catch(err){
        callback(err, null);
    }
}
