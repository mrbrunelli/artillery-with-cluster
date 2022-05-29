export default class Log {
    constructor(id = "", isoDate = new Date().toISOString(), pid = 0, content = "") {
        this.id = id;
        this.date = isoDate;
        this.pid = pid;
        this.content = content;
    }

    getContent() {
        return `${this.id} - [${this.date}] - [Worker ${this.pid}] - ${this.content}`;
    }
}
