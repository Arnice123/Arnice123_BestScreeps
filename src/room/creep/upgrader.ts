import { generalFuncs } from "international/generalFuncs";

export var roleUpgrader = {


    run: function (creep: Creep) {


        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 I vant de energy');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            generalFuncs.upgradeController(creep)
        }
        else {
            generalFuncs.findEnergy(creep)
        }
    }
};

