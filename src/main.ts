// These are global type declarations


import { PixelMake } from "international/pixelMarket"
import { roomFuctions } from "room/roomManager"


declare global {
    /*
      Example types, expand on these or remove them and add your own.
      Note: Values, properties defined here do no fully *exist* by this type definiton alone.
            You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)
      Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
      Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
    */
    // Memory extension samples
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
}

export const loop = function () {

    roomFuctions()

    PixelMake()

    // This is the main loop
}
