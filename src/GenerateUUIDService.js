import crypto from "node:crypto";

export default class GenerateUUIDService {
    generate() {
        return crypto.randomUUID();
    }
}
