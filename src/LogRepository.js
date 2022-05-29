import path from "node:path";
import fs from "node:fs/promises";

export default class LogRepository {
    path = path.resolve("logs.txt");

    async save(content = "") {
        await fs.appendFile(this.path, `${content}\n`);
    }

    async count() {
        const output = await fs.readFile(this.path);
        return output.toString().split("\n").length;
    }

    async clear() {
        await fs.truncate(this.path, 0);
    }
}
