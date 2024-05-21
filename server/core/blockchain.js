import {Block} from "~/server/core/block.js";

export class Blockchain {
    constructor() {
        // Создаём первичный блок
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
    }

    getLastBlock() {
        return this.chain[this.chain.length - 1];
    }

     addBlock(block, prevHash) {
        block.prevHash = prevHash;
        block.hash = block.getHash();
        block.mine(this.difficulty);
        this.chain.push(block);
        return block
    }

    isValid() {
        // Перед перебором цепочки блоков нужно установить i в 1, так как до первичного блока никаких блоков нет. В результате мы начинаем со второго блока.
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            // Проверка
            if (currentBlock.hash !== currentBlock.getHash() || prevBlock.hash !== currentBlock.prevHash) {
                return false;
            }
        }

        return true;
    }
}