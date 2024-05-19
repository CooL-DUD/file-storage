import {Block} from "~/server/core/block.js";
import {Blockchain} from "~/server/core/blockchain.js";

const JeChain = new Blockchain();
// Добавим новый блок
JeChain.addBlock(new Block(Date.now().toString(), { from: "John", to: "Bob", amount: 100 }));
// (Это - всего лишь интересный эксперимент, для создания настоящей криптовалюты обычно нужно сделать намного больше, чем сделали мы).

// Вывод обновлённого блокчейна
console.log(JeChain.chain);