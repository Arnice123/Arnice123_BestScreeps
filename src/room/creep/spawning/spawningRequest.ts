/* This code is to find out how many parts a creep should have for their select role */

export function SpawnInCreep(room: Room, spawn: StructureSpawn) {

    // Getting the amount of creeps in the room

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester')
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader')
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer')
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder')
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler')
    let constructionSites = room.find(FIND_CONSTRUCTION_SITES);

    // getting how much energy is available

    const spawnEnergyAvailable = room.energyAvailable

    // creating a creep body that has default parts, extra parts and a maximun amount of parts

    interface BodyOpts {
        defaultParts: BodyPartConstant[]
        extraParts: BodyPartConstant[]
        tier: number
    }

    // if the amount of creeps for each role is less than 2 spawn in a new one

    if (harvesters.length < 2) {
        SpawnInHarvester(spawnEnergyAvailable)
    }

    if (upgraders.length < 4) {
        SpawnInUpgrader(spawnEnergyAvailable)
    }

    if (haulers.length < 3) {
        SpawnInHauler(spawnEnergyAvailable)
    }

    if (constructionSites != null && builders.length < 3) {
        SpawnInBuilder(spawnEnergyAvailable)
    }

    if (repairers.length < 2) {
        SpawnInRepairer(spawnEnergyAvailable)
    }


    // function to spawn in harvesters

    function SpawnInHarvester(energy: number) {

        // if there isn't enough energy to spawn it in return

        if (energy < 300) {
            return
        }

        // get the amount of parts that it can create

        var numberOfParts = Math.floor((energy - 300) / 100)

        // creating the body

        let body: BodyPartConstant[] = [MOVE, WORK, WORK]

        // adding a work part for each part there is

        for (let i = 0; i < numberOfParts; i++) {
            body.push(WORK);
        }

        // spawning in the creep
        var newName = 'Harvester(T' + numberOfParts + ')' + Game.time
        spawn.spawnCreep(body, newName, { memory: { role: 'harvester' } })
        console.log('Spawning new: ' + newName)
    }

    function SpawnInUpgrader(energy: number) {

        if (energy < 300) {
            return
        }

        // creating the body

        let body: BodyOpts = {
            defaultParts: [MOVE, CARRY, WORK],
            extraParts: [],
            tier: 0
        }

        var energytogive = energy - 300

        while (energytogive > 49) {
            if (energytogive >= 100) {
                body.extraParts.push(WORK)
                body.tier += 1
                energytogive = energytogive - 100
            }

            if (energytogive >= 50) {
                body.extraParts.push(CARRY)
                body.tier += 1
                energytogive = energytogive - 50
            }

            if (energytogive >= 100) {
                body.extraParts.push(WORK)
                body.tier += 1
                energytogive = energytogive - 100
            }

            if (energytogive >= 50) {
                body.extraParts.push(MOVE)
                body.tier += 1
                energytogive = energytogive - 50
            }

        }

        // dividing the amount of parts amoung them

        // creating a new body
        var newBody: BodyPartConstant[] = []

        for (var i in body.defaultParts) {
            newBody.push(body.defaultParts[i])
        }

        for (var i in body.extraParts) {
            newBody.push(body.extraParts[i])
        }

        //spawing in Upgrader
        var newName = 'Upgrader(T' + body.tier + ')' + Game.time
        spawn.spawnCreep(newBody, newName, { memory: { role: 'upgrader' } })
        console.log('Spawning new: ' + newName)
        return
    }

    function SpawnInBuilder(energy: number) {
        if (energy < 300) {
            return
        }

        let body: BodyOpts = {
            defaultParts: [MOVE, CARRY, WORK],
            extraParts: [],
            tier: 0
        }

        var energytogive = energy - 300

        while (energytogive > 49) {
            if (energytogive >= 100) {
                body.extraParts.push(WORK)
                body.tier += 1
                energytogive = energytogive - 100
            }

            if (energytogive >= 50) {
                body.extraParts.push(CARRY)
                body.tier += 1
                energytogive = energytogive - 50
            }

            if (energytogive >= 150) {
                body.extraParts.push(WORK)
                body.tier += 1
                energytogive = energytogive - 100
            }

            if (energytogive >= 50) {
                body.extraParts.push(MOVE)
                body.tier += 1
                energytogive = energytogive - 50
            }

        }

        // dividing the amount of parts amoung them

        // creating a new body
        var newBody: BodyPartConstant[] = []

        for (var i in body.defaultParts) {
            newBody.push(body.defaultParts[i])
        }

        for (var i in body.extraParts) {
            newBody.push(body.extraParts[i])
        }

        //spawing in Upgrader
        var newName = 'Builder(T' + body.tier + ')' + Game.time
        spawn.spawnCreep(newBody, newName, { memory: { role: 'builder' } })
        console.log('Spawning new: ' + newName)
        return
    }

    function SpawnInHauler(energy: number) {
        if (energy < 300) {
            return
        }

        // create a balanced body as big as possible with the given energy

        var numberOfParts = Math.floor((energy - 300) / 50)

        let body: BodyPartConstant[] = [MOVE, CARRY, CARRY]

        for (let i = 0; i < numberOfParts - 1; i++) {
            body.push(CARRY);
        }

        var newName = 'Hauler(T' + (numberOfParts + 3) + ')' + Game.time
        spawn.spawnCreep(body, newName, { memory: { role: 'hauler' } })
        console.log('Spawning new: ' + newName)
        return
    }

    function SpawnInRepairer(energy: number) {

        if (energy < 400) {
            return
        }


        let body: BodyOpts = {
            defaultParts: [MOVE, CARRY, WORK],
            extraParts: [],
            tier: 0
        }

        var energytogive = energy - 400

        while (energytogive > 49) {
            if (energytogive >= 100) {
                body.extraParts.push(WORK)
                body.tier += 1
                energytogive = energytogive - 100
            }

            if (energytogive >= 50) {
                body.extraParts.push(CARRY)
                body.tier += 1
                energytogive = energytogive - 50
            }

            if (energytogive >= 150) {
                body.extraParts.push(WORK)
                body.tier += 1
                energytogive = energytogive - 100
            }

            if (energytogive >= 50) {
                body.extraParts.push(MOVE)
                body.tier += 1
                energytogive = energytogive - 50
            }

        }

        // dividing the amount of parts amoung them

        // creating a new body
        var newBody: BodyPartConstant[] = []

        for (var i in body.defaultParts) {
            newBody.push(body.defaultParts[i])
        }

        for (var i in body.extraParts) {
            newBody.push(body.extraParts[i])
        }

        //spawing in Upgrader
        var newName = 'Repairer(T' + body.tier + ')' + Game.time
        spawn.spawnCreep(newBody, newName, { memory: { role: 'repairer' } })
        return
    }

}
