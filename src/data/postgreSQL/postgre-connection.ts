import { envs } from '../../config'


const postgreSQLConnection = async () => {
     try {
        
        const { Pool } = await import('pg')
        const pool = new Pool({
            host: envs.DB_HOST,
            port: envs.DB_PORT,
            user: envs.DB_USER,
            password: envs.DB_PASSWORD,
            database: envs.DB_DATABASE,
            max: envs.DB_MAX_CONNECTIONS,
            idleTimeoutMillis: envs.DB_IDLE_TIMEOUT,
            connectionTimeoutMillis: envs.DB_CONNECTION_TIMEOUT,
            ssl: {
                rejectUnauthorized: false
            }
        })
        const client = await pool.connect()

        return client

     } catch (error: any) {
        throw new Error(error)
     }
    
}

export const dbConnection = postgreSQLConnection()