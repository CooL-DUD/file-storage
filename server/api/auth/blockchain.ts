import {Block} from "~/server/core/block.js";
import {Blockchain} from "~/server/core/blockchain.js";
import {hashMessage} from "~/server/utils/hashMessage";

export default defineEventHandler(async () => {

    const JeChain = new Blockchain();
    JeChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }));
    console.log('blockchain', hashMessage('123'));

    return {
        blockchain: JeChain.chain,
        data: hashMessage('123')
    }
})