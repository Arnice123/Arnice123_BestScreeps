/*
    This script will be used to automate the placement of extensions
*/


export function ExtensionPlace(room: Room, spawn: StructureSpawn)
{
    const rect : Rectangle = {
        x1: -25,
        y1: -25,
        x2: 25,
        y2: 25,
    }

    findPositionsInsideRect(rect)

    const possibleExtensionPlacement = room.memory.NonWallPositions
    


    function findPositionsInsideRect(rect: Rectangle) {
        // the array that will contain all of the availible positions

        var availiblePositions = []

        // loop through each position

        for (let x = rect.x1; x <= rect.x2; x++) {
            for (let y = rect.y1; y <= rect.y2; y++) {

                let pos = new RoomPosition(x, y, room.name)

                if (pos.lookFor(LOOK_TERRAIN)[0] != "wall") {
                    continue
                }
                availiblePositions.push(pos)


            }
        }

        // return all of the availible positions
        room.memory.NonWallPositions = availiblePositions

    }
}
