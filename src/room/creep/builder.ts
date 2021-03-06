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

         // all the construction sites

         const constructionSite: ConstructionSite | undefined = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)

        if (creep.memory.building) {

            // if there are sites build them

            if (constructionSite) {

                // build

                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite, { visualizePathStyle: { stroke: '#ffffff' } })
                }
            }
            else{
                generalFuncs.repairStructures(creep)
            }
        }
        else {

            // get energy

            generalFuncs.findEnergy(creep)
        }
    }
}




