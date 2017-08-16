const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyB46XLeP661wCAXHx40uUCFZg0iBYPQoQA'
})

const execDistanceMatrix = (origins, destinations, waypoints = []) => {
    return new Promise((resolve, reject) => {
        googleMapsClient.distanceMatrix({
            origins: origins,
            destinations: destinations,
            language: 'CHINESE (TRADITIONAL)',
            mode: 'driving',
            units: 'metric'
        }, (err, response) => {
            if (err) {
                reject(err)
            } else {
                destinations.forEach((d, i) => {
                    if (response.json.rows[0].elements[i].status !== "OK") {
                        reject(`${origins[0]} to ${d} ${response.json.rows[0].elements[i].status}`)
                    }
                    waypoints.push({
                        origins: origins[0],
                        destination: d,
                        distance: response.json.rows[0].elements[i].distance.value,
                        duration: response.json.rows[0].elements[i].duration.value,
                    })
                })
                resolve(waypoints)
            }
        })
    })
}

const cal = (addresses, list = []) => {
    return new Promise((resolve, reject) => {
        execDistanceMatrix([addresses.shift()], addresses).then(response => {
            list.push.apply(list, response)
            if (addresses.length === 1) {
                resolve(list)
            } else {
                cal(addresses, list).then(() => resolve(list))
            }
        }).catch(err => {
            reject(err)
        })
    })
}

const distanceMatrix = (event, callback) => {
    const addresses = event.data.addresses
    if (!addresses) {
        callback(new Error('data addresses does not provide!'))
    } {
        cal(addresses).then((list) => {
            console.log(list)
            callback()
        }).catch(err => {
            callback(new Error(err))
        })
    }
}

const handleOutput = (waypoints) => {
    output = []
    output.push("origins\tdestination\tdistance\tduration")
    waypoints.forEach((w, i) => {
        output.push(`${w.origins}\t${w.destination}\t${w.distance}\t${w.duration}`)
    })
    return output.join('\n')
}

const handlePOST = (req, res) => {
    const addresses = req.body.addresses
    if (!addresses) {
        res.status(404).send(`addresses not found`)
    } else {
        cal(addresses).then((list) => {
            res.status(200).send(handleOutput(list))
        }).catch(err => {
            res.status(500).send(err)
        })
    }
}

const distanceMatrixHttp = (req, res) => {
    switch (req.method) {
        case 'POST':
            handlePOST(req, res);
            break
        default:
            res.status(405).send({ error: 'POST support only!' })
            break
    }
}

module.exports = {
    distanceMatrix: distanceMatrix,
    distanceMatrixHttp: distanceMatrixHttp,
}