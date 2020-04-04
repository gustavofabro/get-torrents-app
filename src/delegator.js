import seedExtract from './seed_extract'
//import magnetExtract from './magnet_extract'

function extractSeeds(data) {
    return seedExtract.extractSeeds(data)
}

// function extractMagnet(query) {
//     return magnetExtract.extractMagnet(query)
// }

export default {
    extractTorrents(data) {
        return extractSeeds(data)
        //.then(extractMagnet)
    }
}