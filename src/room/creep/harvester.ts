/*
 This script handles the code for the harvester class
*/

import { all, filter } from "lodash";


export var roleHarvester = {

    run: function (creep: Creep) {

        if (!creep.room.memory.HarvesterPos1 && !creep.room.memory.HarvesterPos2)
        {
            // sources in the room

            var sources = creep.room.find(FIND_SOURCES_ACTIVE)

            //closest one

            const closestSource = creep.pos.findClosestByRange(sources)

            // harvest it

            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } })
            }

            return
        }

        if (creep.memory.assignedHarvestingPos)
        {
            if (creep.harvest(creep.memory.assignedSource) == ERR_NOT_IN_RANGE)
            {
                creep.moveTo(creep.memory.assignedHarvestingPos)
            }

            return
        }
    }
};


