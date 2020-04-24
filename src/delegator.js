import seedExtract from './seed_extract'
import magnetExtract from './magnet_extract'

export default {
    extractTorrents(data) {
        return seedExtract(data)
            .then((data) => {
                return magnetExtract(data)
            })
    }
}