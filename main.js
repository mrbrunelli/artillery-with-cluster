import cluster from "node:cluster";
import os from "node:os";
import process from "node:process";
import express from "express";
import { ClearLogsController, CountLogsController, SaveLogController } from "./src/LogController.js";

const getFactorialWithBlockingOperation = (n = 100) =>
    (n === 1 ? n : n * getFactorialWithBlockingOperation(n - 1)).toString();

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running.`);

    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died!`);
        cluster.fork();
    });
} else {
    const app = express();
    app.use(express.json());

    app.get("/logs/count", async (req, res) => {
        const countLogsController = new CountLogsController();
        const output = await countLogsController.handle();

        console.log(output);

        return res.status(output.statusCode).json(output.body);
    });

    app.post("/logs", async (req, res) => {
        const factorial = getFactorialWithBlockingOperation();

        const saveLogController = new SaveLogController();
        const output = await saveLogController.handle({ pid: process.pid, content: factorial });

        console.log(output);

        return res.status(output.statusCode).json(output.body);
    });

    app.post("/logs/clear", async (req, res) => {
        const clearLogsController = new ClearLogsController();
        const output = await clearLogsController.handle();

        console.log(output);

        return res.status(output.statusCode).json(output.body);
    });

    app.listen(3000, () => {
        console.log(`Worker ${process.pid} started.`);
    });
}
