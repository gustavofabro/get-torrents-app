import axios from 'axios'
import cheerio from 'react-native-cheerio'

const config = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0'
    }
}

const googleResultSelector = 'div.rc a'

function getSeeds(query) {
    const url = `https://www.google.com.br/search?q=${query.replace(/ /g, '+')}+download+torrent`

    return axios.get(url, config).then((response) => {
        let urls = []
        const $ = cheerio.load(response.data)

        $(googleResultSelector).each((i, result) => {
            urls.push(result.attribs['href'])
        })

        return urls
    })
}

export default getSeeds
