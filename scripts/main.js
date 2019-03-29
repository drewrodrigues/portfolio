document.addEventListener("DOMContentLoaded", () => {
  const slideableLinks = document.querySelectorAll(".slideable")
  slideableLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()

      let sectionId = e.currentTarget.getAttribute('href')
      let section = document.querySelector(sectionId)
      let sectionY = section.offsetTop
      let moveOffset
      let lastPosition = window.scrollY

      moveOffset = (window.scrollY > sectionY ? -15 : 15)

      let interval = setInterval(() => {
        window.scroll(0, window.scrollY + moveOffset)

        if (moveOffset > 0) { // go down
          if (lastPosition === window.scrollY) clearInterval(interval)
          if (window.scrollY >= sectionY) {
            clearInterval(interval)
          }
          lastPosition = window.scrollY
        } else { // go up
          if (window.scrollY <= sectionY) {
            clearInterval(interval)
          }
        }
      }, 1)
    })
  })
})