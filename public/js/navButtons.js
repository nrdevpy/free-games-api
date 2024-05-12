import fetchData from './fetchData.js'
import { updatePageBlur, updateActiveButton } from './utils.js'
import { paginationElement } from '../main.js'

// Update games category
const navButtons = () => {
    const buttons = document.querySelectorAll('.btn')
    buttons.forEach(button => {
        button.addEventListener('click', e => {
            const thisBtn = e.target
            const menu = document.querySelector('.menu')
            const bodyClass = document.body.classList

            menu.classList.remove('opened')
            bodyClass.remove('no-scroll')

            if (thisBtn.classList.contains('active')) return
            
            const tag = thisBtn.dataset.tag
            const activeNavButton = document.querySelector('.btn.active')

            updateActiveButton(activeNavButton, thisBtn)

            paginationElement.innerHTML = ''
            search.value = ''
            fetchData(tag)
            updatePageBlur()
            globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        })
    })
}

export default navButtons