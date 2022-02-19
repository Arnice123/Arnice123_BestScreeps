// Repairer role

import { generalFuncs } from "international/generalFuncs"

export var roleRepairer = {

    // repair damaged structures
    run: function (creep: Creep) {

        if (creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false
            creep.say('🔄 harvest')
        }
        if (!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
            creep.memory.repairing = true
            creep.say('🛠️ repairing')
        }

        if (creep.memory.repairing) {
            generalFuncs.repairStructures(creep)
        }
        else {
            // harvest energy from dropped energy

            generalFuncs.findEnergy(creep)
        }
    }
}
