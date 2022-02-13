

interface GeneralFuncs {
    findEnergy(creep: Creep): void
}


export const generalFuncs: Partial<GeneralFuncs> = {}

// this function will find the closest energy in the area in either a container or dropped energy

generalFuncs.findEnergy = function findEnergy(creep) {

    // getting all of the energy on the ground

    const droppedEnergy = creep.room.find(FIND_DROPPED_RESOURCES, {
        filter: resource => resource.resourceType == RESOURCE_ENERGY
    })

    // getting the containers in the room

    var containers = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => { structure.structureType == STRUCTURE_CONTAINER && structure.id != creep.room.memory.spawnContainerID && structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0}
    })

    // if there isn't any energy harvest it

    if (droppedEnergy.length == 0 && containers.length == 0) {

        // checking to see if there are any harvesters so if there is one then you can expect energy soon

        for (var name in Game.creeps) {

            var creep = Game.creeps[name];

            // return if there are harvesters

            if (creep.memory.role == 'harvester') {
                return
            }
        }

        // sources in the room

        var sources = creep.room.find(FIND_SOURCES)

        // closest source

        const closestSource = creep.pos.findClosestByRange(sources)

        // harvest it

        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE)
        {
            creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } })
        }

    }

    // closest energy in the area

    const closestdroppedEnergy = creep.pos.findClosestByRange(droppedEnergy)

    // closest container with energy

    const closestContainer = creep.pos.findClosestByRange(containers)

    // if there is a container take energy from it

    if (closestContainer != null)
    {

        // take the energy

        if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {

            creep.moveTo(closestContainer)

        }

        // return once done

        return
    }

    // if there isn't a container take from this

    if (closestdroppedEnergy != null)
    {

        // pick up the energy

        if (creep.pickup(closestdroppedEnergy) == ERR_NOT_IN_RANGE) {
            creep.moveTo(closestdroppedEnergy)
        }

        // return so no other functions run

        return
    }

    // if there are both containers and energy get closet

    if (closestContainer != null && closestdroppedEnergy != null)
    {
        const path1 = creep.pos.findPathTo(closestdroppedEnergy.pos)
        const path2 = creep.pos.findPathTo(closestContainer.pos)

        if (path1.length > path2.length) {
            if (creep.pickup(closestdroppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestdroppedEnergy)
            }
        }
        else {
            if (creep.withdraw(closestContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestContainer)
            }
        }
    }


}
