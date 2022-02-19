/*
 This script handles the code for the harvester class
*/

import { all, filter } from "lodash";


export var roleHarvester = {

    run: function (creep: Creep) {

        // sources in the room

        var sources = creep.room.find(FIND_SOURCES_ACTIVE)

        //closest one

        const closestSource = creep.pos.findClosestByRange(sources)

        // harvest it

        if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE)
        creep.moveTo(closestSource, { visualizePathStyle: { stroke: '#ffaa00' } })
    }
};


