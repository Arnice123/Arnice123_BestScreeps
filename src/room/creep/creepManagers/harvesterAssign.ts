/*
This file will be used to assign the position and source to harvesters
*/

export function AssignHarvesters(room:Room)
{


    let unassignedHarv: Creep[]
    let assignedHarv: Creep[]
    for (var name in Game.creeps) {

        // getting the creeps

        var creep = Game.creeps[name]

        // run the specific role based off of the memory role

        if (creep.memory.role == 'harvester') {
            if (!creep.memory.assignedHarvestingPos)
            {
                unassignedHarv.push(creep)
            }
            else{
                assignedHarv.push(creep)
            }
        }
    }

    for (var spot in room.memory.HarvesterPos1)
    {
        for (var name in assignedHarv)
        {
            if (room.memory.HarvesterPos1[spot] == assignedHarv[name].memory.assignedHarvestingPos)
            {
                return
            }
        }

        unassignedHarv[0].memory.assignedHarvestingPos = room.memory.HarvesterPos1[spot]
        assignedHarv.push(unassignedHarv[0])
        unassignedHarv.shift

    }

    for (var spot in room.memory.HarvesterPos2)
    {
        for (var name in assignedHarv)
        {
            if (room.memory.HarvesterPos2[spot] == assignedHarv[name].memory.assignedHarvestingPos)
            {
                return
            }
        }

        unassignedHarv[0].memory.assignedHarvestingPos = room.memory.HarvesterPos2[spot]
        assignedHarv.push(unassignedHarv[0])
        unassignedHarv.shift

    }



}
