/*
    this coded will check to see if you need to place a container
*/



export function CheckIfContainerIsNeeded(room: Room): boolean {

    // place a container if there isn't a spawn container in memory

    const spawnContainer = Game.getObjectById(room.memory.spawnContainerID)

    if (!spawnContainer) {
        return true
    }

    return false

}

