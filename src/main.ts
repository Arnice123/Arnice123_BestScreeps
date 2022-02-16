// These are global type declarations

import { PixelMake } from "international/pixelMarket"
import { roomFuctions } from "room/roomManager"


declare global {

    interface Memory {
        chosenBuildEnergy: Id<Resource<ResourceConstant>>
        chosenBuildContainer: Id<StructureContainer>
    }

    interface RoomMemory {
        chosenBuildID: Id<ConstructionSite>
        spawnContainerID: Id<StructureContainer>

        path1: PathStep[]
        path2: PathStep[]

        spawnContainerPosition: RoomPosition

        roomController: StructureController

        NonWallPositions: RoomPosition[]
        ExtensionPositions: RoomPosition[]
    }

    interface CreepMemory {
        role: string
        building?: boolean
        hauling?: boolean
        repairing?: boolean
        upgrading?: boolean
        harvesting?: boolean
    }

    // Syntax for adding proprties to `global` (ex "global.log")
    namespace NodeJS {
        interface Global {

        }
    }

    interface Rectangle {
        x1: number
        y1: number
        x2: number
        y2: number
    }
}

export const loop = function () {

    roomFuctions()

    PixelMake()

    // This is the main loop
}
