const Animations = {
  slideableLinks: () => {
    const slideableLinks = document.querySelectorAll('.slideable')

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
  },
  navbarHighlight: () => {
    const navbar = document.querySelector('.nav-container')
    const navLinks = document.querySelectorAll('.highlightable')
    const sections = {
      ".projects": null,
      ".skills": null,
      ".about": null
    }

    window.addEventListener('scroll', e => {
      const scrollTop = window.scrollY

      // get top of sections (doing in scroll in case of resizing)
      Object.keys(sections).forEach(sectionClass => {
        const section = document.querySelector(sectionClass)
        sections[sectionClass] = section.offsetTop
      })

      // add navbar scroll class if not at top
      if (scrollTop !== 0) {
        if (!navbar.classList.contains('scroll')) {
          navbar.classList.add('scroll')
        }
      } else {
        if (navbar.classList.contains('scroll')) {
          navbar.classList.remove('scroll')
        }
      }

      // check which section window is in and apply active to nav link
      if (scrollTop >= sections[".projects"]) {
        navLinks.forEach(link => link.classList.remove('active'))
        navLinks[2].classList.add('active')
      } else if (scrollTop >= sections[".skills"]) {
        navLinks.forEach(link => link.classList.remove('active'))
        navLinks[1].classList.add('active')
      } else if (scrollTop >= sections[".about"]) {
        navLinks.forEach(link => link.classList.remove('active'))
        navLinks[0].classList.add('active')
      } else {
        navLinks.forEach(link => link.classList.remove('active'))
      }
    })
  },
}

document.addEventListener('DOMContentLoaded', () => {
  Animations.slideableLinks()
  Animations.navbarHighlight()
})
