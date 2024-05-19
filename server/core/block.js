import {hashMessage} from "~/server/utils/hashMessage.ts";

export class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = async () => await this.getHash();
        this.prevHash = ""; // хеш предыдущего блока
        this.nonce = 0;
    }

    // Наша хеш-функция.
    getHash() {
        return hashMessage(this.prevHash + this.timestamp + JSON.stringify(this.data));
    }

    async mine(difficulty) {
        // Тут запускается цикл, работающий до тех пор, пока хеш не будет начинаться со строки
        // 0...000 длины <difficulty>.
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            // Инкрементируем nonce, что позволяет получить совершенно новый хеш.
            this.nonce++;
            // Пересчитываем хеш блока с учётом нового значения nonce.
            this.hash = this.getHash();
        }
    }
}

