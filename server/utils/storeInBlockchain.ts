import {Blockchain} from "~/server/core/blockchain";
import {Block} from "~/server/core/block";

export function storeInBlockchain(data: any) {
    const fsChain = new Blockchain();
    return fsChain.addBlock(new Block(Date.now().toString(), data));
}