import { paginationElement, ulElem } from "../main.js"
import { updateLoadingState } from "./utils.js"

const filter = async (data, pagination, sortByOption) => {
    const filter = document.querySelector('form.filter')
    const timeToSearchGame = 0 // Seconds
    let findFilterGamesTimeoutID = 0


    const fetchData = async (formatedUrl) => {
        try {
            const response = await fetch(formatedUrl)
            const data = await response.json()

            if (data.status === 0) {
                //TODO: Clear the filter
                ulElem.innerHTML = `<p class="game-not-found">No games found with the given filters</p>`
                //TODO: Show error message to the user on the client
                throw new Error('No games found with the given filters')
            }

            return data

        } catch (err) {
            console.error(err)
            return
        }
    }

    const findFilterGames = () => {
        return setTimeout(async () => {
            let url = `/filter?sort-by=${sortByOption}`
            paginationElement.innerHTML = ''
            ulElem.innerHTML = ''
            let tags = []
            let genres = ''

            // Check for filters on the form()
            for (const input of filter) {
                const checked = input.checked
                if (checked) {
                    const { value, name } = input
                    if (name === 'platform') {
                        url += `&platform=${value}`
                    } else if (name === 'genre') {
                        tags.push(value)
                    }
                }
            }

            if (tags) {
                // Format tags for query string
                genres = tags.join('.')
                // Add genres to url
                url += `&tag=${genres}`
            }

            if ((Array.isArray(tags) && tags.length > 0) || genres) {
                // Fetch games data
                const games = await fetchData(url)
                pagination(games)
            } else {
                pagination(data)
            }
            url = `/filter?sort-by=${sortByOption}`
        }, timeToSearchGame * 1000)
    }

    filter.addEventListener('change', async (e) => {
        e.preventDefault()
        updateLoadingState(true)

        clearTimeout(findFilterGamesTimeoutID)
        findFilterGamesTimeoutID = findFilterGames()

        updateLoadingState(false)
    })
}
export default filter