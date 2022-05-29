import Log from "./Log.js";
import LogRepository from "./LogRepository.js";
import GenerateUUIDService from "./GenerateUUIDService.js";

export default class SaveLog {
    constructor(logRepository = new LogRepository(), generateUUIDService = new GenerateUUIDService()) {
        this.logRepository = logRepository;
        this.generateUUIDService = generateUUIDService;
    }

    async execute(pid, content) {
        const id = this.generateUUIDService.generate();
        const log = new Log(id, new Date().toISOString(), pid, content);
        await this.logRepository.save(log.getContent());
        return id;
    }
}
