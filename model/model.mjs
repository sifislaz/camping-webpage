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

export async function getSpaces(numOfPeople, callback){
    const sqlQuery = `SELECT * FROM "SPACE" WHERE "no_of_people"='${numOfPeople}'`;
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

export async function getReservation(reservationId, callback){
    const sqlQuery = `SELECT * FROM "RESERVATION" WHERE "id" = '${reservationId}'`;
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
export async function getAllReservations(callback){
    const sqlQuery = `SELECT * FROM "RESERVATION"`;
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

export async function deleteSpace(spaceId, callback){
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

export async function getClientsNum(callback){
    const sqlQuery = `SELECT SUM(*) FROM "CLIENT"`;
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
    const sqlQuery = `SELECT SUM(*) FROM "RESERVATION"`;
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
    const sqlQuery = `SELECT firstname, lastname
    FROM "CLIENT"
    GROUP BY "id"
    HAVING "id" = (
        SELECT client_id
        FROM "RESERVATION"
        GROUP BY "client_id"
        HAVING COUNT(client_id)=(
            SELECT MAX("counter")
            FROM(
                SELECT client_id, COUNT(id) AS counter
                FROM "RESERVATION"
                GROUP BY "client_id"
            )
        )
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
    const sqlQuery = `UPDATE "CLIENT" SET "username"='${client.username}', "firstname"='${client.firstname}', "lastname"='${client.lastname}',
                        "email"='${client.email}, "password"='${client.password}', "mobile"='${client.mobile}`;
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



async function getPassword(username, admin=false, callback){
    let sqlQuery;
    if(admin){
        sqlQuery = `SELECT "password" FROM "ADMIN" WHERE "username"='${username}'`;    
    }
    else{
        sqlQuery = `SELECT "password" FROM "CLIENT" WHERE "username"='${username}'`;
    }
    
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