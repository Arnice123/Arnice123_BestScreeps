/*
This code will manage what the tower does
*/

const allyList: string[] = ['MarvinTMB', 'Bango88']

export function TowerStuff(room: Room, tower: StructureTower) {

    var hostiles = room.find(FIND_HOSTILE_CREEPS, { filter: (creep) => !allyList.includes(creep.owner.username) });
    if (hostiles.length > 0) {
        Attack(hostiles, tower, room)
    }

    const damagedStructures = room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax * 0.8 && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL
    })

    if (damagedStructures.length > 0) {
        Repair(damagedStructures, tower)
    }
}

function Repair(damagedStructures: AnyStructure[], tower: StructureTower) {
    let mostDamagedStructure = damagedStructures[0]
    for (var structure in damagedStructures) {
        if (mostDamagedStructure.hits > damagedStructures[structure].hits) {
            mostDamagedStructure = damagedStructures[structure]
        }
    }
    tower.repair(mostDamagedStructure)
}

function Attack(hostiles: Creep[], tower: StructureTower, room: Room) {
    tower.attack(hostiles[0]);

}
