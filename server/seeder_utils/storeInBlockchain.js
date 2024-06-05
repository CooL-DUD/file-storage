import {Blockchain} from "./blockchain.js";
import {Block} from "./block.js";

export function storeInBlockchain(data, prevHash) {
    const fsChain = new Blockchain();
    return fsChain.addBlock(new Block(Date.now().toString(), data), prevHash);
}