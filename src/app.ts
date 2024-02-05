import { config } from "dotenv";
config();

import { Server } from "./presentation/server";
import { AppRoutes } from './presentation/routes';

(
    async () => {
        main();
    }
)()

async function main() {

    const server = new Server({ port: 8080, routes: AppRoutes.routes })
    server.start()
}