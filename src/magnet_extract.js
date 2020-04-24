import axios from 'axios'
import cheerio from 'react-native-cheerio'
import validator from 'validator'
import decodeUriComponent from 'decode-uri-component'

let config = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0'
    },
    timeout: 5000
}

function extractMagnet(urls) {
    console.log('Extracting magnets links...')

    function getMagnetLinks(url) {
        return axios(url, config).then((response) => {
            let links = []
            console.log(`Extracting from ${url}`)
            const $ = cheerio.load(response.data)

            $('a[href^="magnet:"]').each((i, elem) => {
                let link = elem.attribs['href']

                if (isValidMagnetLink(link)) {
                    links.push(link)
                }
            })
           
            return links
        }).catch(() => {
            return []
        })
    }

    function validUrls(item) {
        return validator.isURL(item)
    }

    function mountPromises(urls) {
         return urls.filter(validUrls).map(url => {
            return getMagnetLinks(url)
        })
    }

    return Promise.all(mountPromises(urls))
        .then((data) => {
           return { 
               urls: data.length ? getMagnetDto(data) : [] 
            }
        })
}

function getMagnetDto(googleMagnetRes) {
    return googleMagnetRes.flat().map((link) => {
        return {
            uri: link,
            name: extractTorrentNameFromLink(link)
        }
    })
}

function extractTorrentNameFromLink(link) {
    let dnF = link.substring(link.indexOf('dn=')+3)

    name = dnF.substring(3, dnF.indexOf('&'))

    return decodeUriComponent(name) || link
}

function isValidMagnetLink(link) {
    return link.startsWith('magnet:')
}

export default extractMagnet