import { roleHarvester } from "../harvester";
import { roleHauler } from "room/creep/hauler"
import { roleRepairer } from "room/creep/repairer"
import { SpawnInCreep } from "room/creep/spawning/spawningRequest"
import { roleUpgrader } from "room/creep/upgrader"
import { roleBuilder } from "../builder";

/*
    To run all creep related functions
*/
export function creepRun(room: Room, spawn: StructureSpawn)
{
    // displaying what type of creep is spawning

    if (Game.spawns['Arnice123'].spawning) {

        // the creep that is spawning in

        var spawningCreep = Game.creeps[Game.spawns['Arnice123'].spawning.name]

        // display the text

        Game.spawns['Arnice123'].room.visual.text( '🛠️' + spawningCreep.memory.role, Game.spawns['Arnice123'].pos.x + 1,
            Game.spawns['Arnice123'].pos.y, { align: 'left', opacity: 0.8 });
    }

    // for each creep

    for (var name in Game.creeps) {

        // getting the creeps

        var creep = Game.creeps[name];

        // run the specific role based off of the memory role

        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }

        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }

        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }

        if (creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }

        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }

    }

    // clear them from memory once they die

    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name]
            console.log('Clearing non-existing creep memory:', name)
        }
    }

    // spawn in creeps

    SpawnInCreep(room, spawn)
}
