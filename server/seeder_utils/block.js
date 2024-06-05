import {hashMessage} from "./hashMessage.js";

export class Block {
    constructor(timestamp = "", data = []) {
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    }

    getHash() {
        return hashMessage(this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce);
    }

    mine(difficulty) {
        while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        }
    }
}

