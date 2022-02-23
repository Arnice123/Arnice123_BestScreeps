/*
 * This code is here to automatically place roads so the travel will allways be optimized
*/

import { Interface } from "readline";
import { Position } from "source-map";

// function that will be called every 10 tics in order to find missing paths

export function FindEmptySites(room: Room, spawn: StructureSpawn) {

    // if there isn't a path to the sources make one

    if (!room.memory.path1&& !room.memory.path2) {

        // new path

        var path1 = spawn.pos.findPathTo(Game.flags.SOURCE1.pos)
        var path2 = spawn.pos.findPathTo(Game.flags.SOURCE2.pos)

        // adding to memory

        room.memory.path1 = path1
        room.memory.path2 = path2
    }
    else {

        // if there is in memory make create it

        var path1 = room.memory.path1
        var path2 = room.memory.path2
    }

    // construction sites

    const constructSitesLength = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: FIND_MY_CONSTRUCTION_SITES }
    })

    //if there are to many construction sites dont try

    if (constructSitesLength.length == 100) { return }

    // Getting the room terrain

    var terrain = room.getTerrain()

    // used for placing container
    let i = 0

    // for each position in the path there should be a road

    for (var position in path1) {

        // increasing i

        i++

        // if this is the end of the path place a container

        if (i == path1.length) {

            // place container one the position

            const placeConstructionSiteResult = room.createConstructionSite(path1[position].x, path1[position].y, STRUCTURE_CONTAINER)

            // log in case I want to debug

            console.log(placeConstructionSiteResult)
            continue
        }

        // making a path

        switch (terrain.get(path1[position].x, path1[position].y)) {

            // if there is floor or a swamp place a road on that position

            case TERRAIN_MASK_SWAMP:

                const placeConstructionSiteResult11 = room.createConstructionSite(path1[position].x, path1[position].y, STRUCTURE_ROAD)

                console.log(placeConstructionSiteResult11)
                break

            case 0:
                const placeConstructionSiteResult12 = room.createConstructionSite(path1[position].x, path1[position].y, STRUCTURE_ROAD)

                console.log(placeConstructionSiteResult12)
                break

        }
    }

    i = 0
    //same thing as previous

    for (var position in path2) {

        i++

        if (i == path2.length) {

            const placeConstructionSiteResult20 = room.createConstructionSite(path2[position].x, path2[position].y, STRUCTURE_CONTAINER)

            console.log(placeConstructionSiteResult20)
            continue
        }

        switch (terrain.get(path2[position].x, path2[position].y)) {

            case TERRAIN_MASK_SWAMP:

                const placeConstructionSiteResult21 = room.createConstructionSite(path2[position].x, path2[position].y, STRUCTURE_ROAD)

                console.log(placeConstructionSiteResult21)
                break
            case 0:

                const placeConstructionSiteResult22 = room.createConstructionSite(path2[position].x, path2[position].y, STRUCTURE_ROAD)

                console.log(placeConstructionSiteResult22)
                break

        }
    }


}

