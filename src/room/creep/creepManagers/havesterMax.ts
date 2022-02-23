/*
    this code will loop around the sources and find out what the max harvester count it
*/

export function FindMaxHarv(room: Room)
{
    if (!room.memory.HarvesterPos1 && !room.memory.HarvesterPos2)
    {
        const Sources: Source[] = room.find(FIND_SOURCES)

        const rect1: Rectangle = {
            x1: Sources[0].pos.x - 1,
            y1: Sources[0].pos.y - 1,
            x2: Sources[0].pos.x + 1,
            y2: Sources[0].pos.y + 1
        }

        const rect2: Rectangle = {
            x1: Sources[1].pos.x - 1,
            y1: Sources[1].pos.y - 1,
            x2: Sources[1].pos.x + 1,
            y2: Sources[1].pos.y + 1
        }

        room.memory.HarvesterPos1 = findPositionsInsideRect(rect1)
        room.memory.HarvesterPos2 = findPositionsInsideRect(rect2)
        return
    }

    function findPositionsInsideRect(rect: Rectangle) : RoomPosition[] {

        // the array that will contain all of the availible positions

        var availiblePositions: RoomPosition[]

        // loop through each position

        for (let x = rect.x1; x <= rect.x2; x++) {
            for (let y = rect.y1; y <= rect.y2; y++) {
                const terrain = room.getTerrain()
                if (terrain.get(x,y) == 0 || terrain.get(x,y) == 2 && terrain.get(x,y) != 1)
                {
                    const tempPos: RoomPosition = new RoomPosition(x, y, room.name)
                    availiblePositions.push(tempPos)
                }
            }
        }

        // return all of the availible positions

        return availiblePositions
    }
}
