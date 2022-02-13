/*
This code will manage what the tower does
*/

// allies

const allyList: string[] = ['MarvinTMB', 'Bango88']

export function TowerStuff(room: Room, tower: StructureTower) {

    // all enemy creeps in my room other than my allies

    var hostiles = room.find(FIND_HOSTILE_CREEPS, { filter: (creep) => !allyList.includes(creep.owner.username) })

    // if there are enemies attack

    if (hostiles.length > 0) {

        Attack(hostiles, tower)

    }

    // all damaged structures minus ramparts and walls

    const damagedStructures = room.find(FIND_STRUCTURES, {
        filter: (structure) => structure.hits < structure.hitsMax * 0.8 && structure.structureType != STRUCTURE_RAMPART && structure.structureType != STRUCTURE_WALL
    })

    // if there are damaged structues heal them

    if (damagedStructures.length > 0) {

        Repair(damagedStructures, tower)

    }
}

function Repair(damagedStructures: AnyStructure[], tower: StructureTower) {

    // temporary initizalizing

    let mostDamagedStructure = damagedStructures[0]

    // filters out all the non damaged ones

    for (var structure in damagedStructures) {

        // if the new one has less hp use this one

        if (mostDamagedStructure.hits > damagedStructures[structure].hits) {

            mostDamagedStructure = damagedStructures[structure]

        }
    }

    // fix the tower

    tower.repair(mostDamagedStructure)
}

function Attack(hostiles: Creep[], tower: StructureTower) {

    // just attack

    tower.attack(hostiles[0]);

}
