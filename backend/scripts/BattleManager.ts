import { Socket } from "socket.io";
import { Character_Plain } from '../src/api/character/content-types/character/character';
import { User_Plain } from "../src/common/schemas-to-ts/User";
import { BlackList } from "./BlackList";
import { Targeting } from "../src/components/mechanic/interfaces/Mechanic";
import { RegisterSkillFunctions } from "./Mechanics";

export type QueuePlayer = {
    userId: number;
    characterId: number;
    socket: Socket;
}

type BattlePlayer = {
    id: number;
    username: string;
    socket: Socket;
    character: CharacterFull;
}

export type TurnData = {
    skillSlot: number;
}

export type CharacterFull = Character_Plain & {
    TakeDamage: (amount: number) => void;
    skills: Array<{
        manacost: number;
        cooldown: number;
        remainingCooldown: number;
        mechanic: Array<{
            damaging?: { damageaamount: number };
            healing?: { healingamount: number };
            targeting: Targeting;
        }>;
    }>;
    mana: number;
    health: number;
}

// class Battle {
//     player1: BattlePlayer;
//     player2: BattlePlayer;
//     isGameOver: boolean = false;

//     constructor(player1: BattlePlayer, player2: BattlePlayer) {
//         this.player1 = player1;
//         this.player2 = player2;
//     }

//     Start() {
//         this.player1.socket.emit("startbattle", {
//             "left": JSON.stringify(this.player1, BlackList),
//             "right": JSON.stringify(this.player2, BlackList)
//         });
//         this.player2.socket.emit("startbattle", {
//             "left": JSON.stringify(this.player2, BlackList),
//             "right": JSON.stringify(this.player1, BlackList)
//         });
//     }

//     // doTurn(mySocket: Socket, turnData: TurnData): { winnerSocketId?: string; loserSocketId?: string } | undefined {
//     //     const me = mySocket === this.player1.socket ? this.player1 : this.player2;
//     //     const opponent = mySocket === this.player1.socket ? this.player2 : this.player1;
    
//     //     const skillToUse = me.character.skills[turnData.skillSlot];
//     //     if (!skillToUse) {
//     //         console.log("Skill is undefined");
//     //         return;
//     //     }
    
//     //     // Check if the skill is on cooldown
//     //     if (skillToUse.remainingCooldown > 0) {
//     //         console.log("Skill is on cooldown");
//     //         return;
//     //     }
    
//     //     skillToUse.mechanic.forEach(mechanic => {
//     //         if (mechanic.damaging) {
//     //             switch (mechanic.targeting) {
//     //                 case Targeting.Aoe:
//     //                     // Implement AOE damage logic here
//     //                     break;
//     //                 case Targeting.Single:
//     //                     opponent.character.TakeDamage(mechanic.damaging.damageaamount);
//     //                     break;
//     //             }
//     //         }
//     //         if (mechanic.healing) {
//     //             me.character.health += mechanic.healing.healingamount; // Adjust healing logic
//     //         }
//     //     });
    
//     //     // Reduce mana and set cooldown
//     //     me.character.mana -= skillToUse.manacost;
//     //     skillToUse.remainingCooldown = skillToUse.cooldown; // Set the cooldown
    
//     //     // Emit the results to both players
//     //     this.emitTurnResult(me, opponent);
    
//     //     // Update cooldowns for the next turn
//     //     this.updateCooldowns();
        
//     //     // Check win/loss conditions
//     //     if (this.player1.character.health <= 0 || this.player2.character.health <= 0) {
//     //         const winner = this.player1.character.health > 0 ? this.player1 : this.player2;
//     //         const loser = this.player1.character.health <= 0 ? this.player1 : this.player2;
//     //         this.endGame(winner, loser);
//     //         return { winnerSocketId: winner.socket.id, loserSocketId: loser.socket.id };
//     //     }
//     //     return;
//     // }

//     doTurn(mySocket: Socket, turnData: TurnData): { winnerSocketId?: string; loserSocketId?: string } | undefined {
//     const me = mySocket === this.player1.socket ? this.player1 : this.player2;
//     const opponent = mySocket === this.player1.socket ? this.player2 : this.player1;

//     const skillToUse = me.character.skills[turnData.skillSlot];
//     if (!skillToUse) {
//         console.log("Skill is undefined");
//         return;
//     }

//     // Check if the skill is on cooldown
//     if (skillToUse.remainingCooldown > 0) {
//         console.log("Skill is on cooldown");
//         return;
//     }

//     skillToUse.mechanic.forEach(mechanic => {
//         if (mechanic.damaging) {
//             switch (mechanic.targeting) {
//                 case Targeting.Aoe:
//                     // Implement AOE damage logic here
//                     break;
//                 case Targeting.Single:
//                     opponent.character.TakeDamage(mechanic.damaging.damageaamount);
//                     break;
//             }
//         }
//         if (mechanic.healing) {
//             me.character.health += mechanic.healing.healingamount; // Adjust healing logic
//         }
//     });

//     // Reduce mana and set cooldown
//     me.character.mana -= skillToUse.manacost;
//     skillToUse.remainingCooldown = skillToUse.cooldown; // Set the cooldown

//     // Emit the results to both players
//     this.emitTurnResult(me, opponent);

//     // Update cooldowns for the next turn
//     this.updateCooldowns();

//     // Check win/loss conditions
//     this.checkWinLossCondition();

//     if (this.isGameOver) {
//         const winner = this.player1.character.health > 0 ? this.player1 : this.player2;
//         const loser = this.player1.character.health <= 0 ? this.player1 : this.player2;
//         return { winnerSocketId: winner.socket.id, loserSocketId: loser.socket.id };
//     }

//     return;
// }


//     emitTurnResult(me: BattlePlayer, opponent: BattlePlayer) {
//         me.socket.emit("turnresult", {
//             "left": JSON.stringify(me, BlackList),
//             "right": JSON.stringify(opponent, BlackList),
//         });
//         opponent.socket.emit("turnresult", {
//             "left": JSON.stringify(opponent, BlackList),
//             "right": JSON.stringify(me, BlackList),
//         });
//     }

//     endGame(winner: BattlePlayer, loser: BattlePlayer) {
//         this.isGameOver = true;
//         winner.socket.emit("gameover", { "result": "win", "opponent": loser.username });
//         loser.socket.emit("gameover", { "result": "lose", "opponent": winner.username });
//     }

//     updateCooldowns() {
//         this.player1.character.skills.forEach(skill => {
//             if (skill.remainingCooldown > 0) {
//                 skill.remainingCooldown--;
//             }
//         });
    
//         this.player2.character.skills.forEach(skill => {
//             if (skill.remainingCooldown > 0) {
//                 skill.remainingCooldown--;
//             }
//         });
//     }
// }

class Battle {
    player1: BattlePlayer;
    player2: BattlePlayer;
    isGameOver: boolean = false;

    constructor(player1: BattlePlayer, player2: BattlePlayer) {
        this.player1 = player1;
        this.player2 = player2;
    }

    Start() {
        this.player1.socket.emit("startbattle", {
            "left": JSON.stringify(this.player1, BlackList),
            "right": JSON.stringify(this.player2, BlackList)
        });
        this.player2.socket.emit("startbattle", {
            "left": JSON.stringify(this.player2, BlackList),
            "right": JSON.stringify(this.player1, BlackList)
        });
    }

    doTurn(mySocket: Socket, turnData: TurnData): { winnerSocketId?: string; loserSocketId?: string } | undefined {
        const me = mySocket === this.player1.socket ? this.player1 : this.player2;
        const opponent = mySocket === this.player1.socket ? this.player2 : this.player1;

        const skillToUse = me.character.skills[turnData.skillSlot];
        if (!skillToUse) {
            console.log("Skill is undefined");
            return;
        }

        // Check if the skill is on cooldown
        if (skillToUse.remainingCooldown > 0) {
            console.log("Skill is on cooldown");
            return;
        }

        skillToUse.mechanic.forEach(mechanic => {
            if (mechanic.damaging) {
                switch (mechanic.targeting) {
                    case Targeting.Aoe:
                        // Implement AOE damage logic here
                        break;
                    case Targeting.Single:
                        opponent.character.TakeDamage(mechanic.damaging.damageaamount);
                        break;
                }
            }
            if (mechanic.healing) {
                // Implement healing logic here
            }
        });

        // Reduce mana and set cooldown
        me.character.mana -= skillToUse.manacost;
        skillToUse.remainingCooldown = skillToUse.cooldown; // Set the cooldown

        // Emit the results to both players
        this.emitTurnResult(me, opponent);

        // Update cooldowns for the next turn
        this.updateCooldowns();

        // Check win/loss conditions
        this.checkWinLossCondition();

        if (this.isGameOver) {
            const winner = this.player1.character.health > 0 ? this.player1 : this.player2;
            const loser = this.player1.character.health <= 0 ? this.player1 : this.player2;
            return { winnerSocketId: winner.socket.id, loserSocketId: loser.socket.id };
        }

        return;
    }

    checkWinLossCondition() {
        console.log("player1 health:"+this.player1.character.health);
        console.log("player2 health:"+this.player2.character.health);
        if (this.player1.character.health <= 0) {
            this.endGame(this.player2, this.player1);
        } else if (this.player2.character.health <= 0) {
            this.endGame(this.player1, this.player2);
        }
    }

    endGame(winner: BattlePlayer, loser: BattlePlayer) {
        this.isGameOver = true;
        console.log("SomeOne Win");
        // winner.socket.emit("gameover", { "result": "win", "opponent": loser.username });
        // loser.socket.emit("gameover", { "result": "lose", "opponent": winner.username });
        winner.socket.emit("gameover", JSON.stringify({ result: "win", opponent: loser.username }));
        loser.socket.emit("gameover", JSON.stringify({ result: "lose", opponent: winner.username }));
      //  console.log(JSON.stringify({ result: "win", opponent: loser.username }));

        // Additional logic like updating the database with win/loss records
    }

    updateCooldowns() {
        this.player1.character.skills.forEach(skill => {
            if (skill.remainingCooldown > 0) {
                skill.remainingCooldown--;
            }
        });

        this.player2.character.skills.forEach(skill => {
            if (skill.remainingCooldown > 0) {
                skill.remainingCooldown--;
            }
        });
    }

    emitTurnResult(me: BattlePlayer, opponent: BattlePlayer) {
        me.socket.emit("turnresult", {
            "left": JSON.stringify(me, BlackList),
            "right": JSON.stringify(opponent, BlackList),
        });
        opponent.socket.emit("turnresult", {
            "left": JSON.stringify(opponent, BlackList),
            "right": JSON.stringify(me, BlackList),
        });
    }
}


export let SocketToBattleSet = new Map<Socket, Battle>();
let queue: QueuePlayer[] = [];

export const addToQueue = async (player: QueuePlayer) => {
    if (queue.length > 0) {
        const opponent = queue.shift() as QueuePlayer;

        // Check if the player and opponent are the same person
        if (player.userId === opponent.userId) {
            console.log('Cannot join a battle with yourself');
            queue.push(opponent);  // Put the opponent back into the queue
            return;
        }

        const player1FromStrapi: User_Plain = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: { id: player.userId }
        });

        const player2FromStrapi: User_Plain = await strapi.db.query("plugin::users-permissions.user").findOne({
            where: { id: opponent.userId }
        });

        const player1Character = await strapi.entityService.findOne("api::character.character", player.characterId, {
            populate: ["skills", "skills.mechanic", "skills.mechanic.damaging", "skills.mechanic.healing"] as any  // Use type assertion here
        }) as CharacterFull;

        const player2Character = await strapi.entityService.findOne("api::character.character", opponent.characterId, {
            populate: ["skills", "skills.mechanic", "skills.mechanic.damaging", "skills.mechanic.healing"] as any  // Use type assertion here
        }) as CharacterFull;

        const player1: BattlePlayer = {
            id: player.userId,
            username: player1FromStrapi.username,
            socket: player.socket,
            character: player1Character
        };

        const player2: BattlePlayer = {
            id: opponent.userId,
            username: player2FromStrapi.username,
            socket: opponent.socket,
            character: player2Character
        };

        const battle = new Battle(player1, player2);

        RegisterSkillFunctions(player1.character);
        RegisterSkillFunctions(player2.character);

        SocketToBattleSet.set(player.socket, battle);
        SocketToBattleSet.set(opponent.socket, battle);
        battle.Start(); // Start the battle
    } else {
        queue.push(player);
    }
}
