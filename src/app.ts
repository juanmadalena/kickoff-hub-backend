import { config } from "dotenv";
config();

import { Server } from "./presentation/server";
import { AppRoutes } from './presentation/routes';
import { envs } from "./config";

(
    async () => {
        main();
    }
)()

async function main() {
    // Start the API server
    const server = new Server({ port: envs.PORT, routes: AppRoutes.routes })
    server.start()

}