import { generalFuncs } from "international/generalFuncs";

export var roleUpgrader = {


    run: function (creep: Creep) {
        const myHardcodedRoomName = "E29N11";
        const room = Game.rooms[myHardcodedRoomName]

        if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 I vant de energy');
        }
        if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('⚡ upgrade');
        }

        if (creep.memory.upgrading) {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
        else {
            generalFuncs.findEnergy(creep)
        }
    }
};

