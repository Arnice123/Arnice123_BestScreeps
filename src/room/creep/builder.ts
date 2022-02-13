/*
    This code does the stuff for the builder
*/

import { generalFuncs } from "international/generalFuncs"


export var roleBuilder = {

    run: function (creep: Creep) {

        // if they have no energy start the getting energy function

        if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {

            creep.memory.building = false
            creep.say('🔄 Gib Energy')
        }

        // if they are full on energy start building

        if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true
            creep.say('🚧 build')
        }

        if (creep.memory.building) {

            // all the construction sites

            const constructionSite: ConstructionSite | null = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

            // if there are sites build them

            if (constructionSite != null) {

                // build

                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
        }
        else {

            // get energy
            
            generalFuncs.findEnergy(creep)
        }
    }
}




