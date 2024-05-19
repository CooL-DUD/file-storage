import {Block} from "~/server/core/block.js";
import {Blockchain} from "~/server/core/blockchain.js";

export default defineEventHandler(async () => {

    const JeChain = new Blockchain();
    JeChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }));
    console.log('blockchain', JeChain.chain);

    return {
        blockchain: JeChain.chain
    }
})