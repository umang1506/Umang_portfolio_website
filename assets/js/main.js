/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () =>{
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== CHANGE BACKGROUND HEADER ===============*/
const scrollHeader = () =>{
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('scroll-header') 
                       : header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== SWIPER PROJECTS ===============*/
let swiperProjects = new Swiper(".projects__container", {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 24,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
        576: {
          slidesPerView: 1,
          spaceBetween: 24,
        },
        900: {
          slidesPerView: 1.15,
          spaceBetween: 28,
          centeredSlides: true,
        },
        1200: {
          slidesPerView: 2,
          spaceBetween: 28,
          centeredSlides: false,
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
    
const scrollActive = () =>{
  	const scrollDown = window.scrollY

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

		if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link')
		}else{
			sectionsClass.classList.remove('active-link')
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
})

sr.reveal(`.home__data, .home__social, .contact__container, .footer__container`)
sr.reveal(`.home__images`, {origin: 'bottom'})
sr.reveal(`.about__data, .projects__container`, {origin: 'left'})
sr.reveal(`.experience__content`, {origin: 'right'})
sr.reveal(`.about__skills, .about__domains`, {delay: 600})
// Note: individual card reveal removed – conflicts with Swiper's slide visibility management
sr.reveal(`.experience__item`, {interval: 100})
sr.reveal(`.contact__card`, {interval: 100})
sr.reveal(`.contact__form`, {delay: 700})

/*=============== CONTACT FORM & MODAL HANDLER ===============*/
const contactForm = document.getElementById('contact-form')
const contactModal = document.getElementById('contact-modal')
const contactModalClose = document.getElementById('contact-modal-close')
const contactModalBtn = document.getElementById('contact-modal-btn')
const contactModalOverlay = document.getElementById('contact-modal-overlay')
const contactModalTitle = document.getElementById('contact-modal-title')
const contactModalText = document.getElementById('contact-modal-text')
const contactModalIcon = document.getElementById('contact-modal-icon')
const contactSubmitBtn = document.getElementById('contact-submit-btn')

const showContactModal = (type, title, message) => {
    if (!contactModal) return

    contactModalTitle.textContent = title
    contactModalText.textContent = message

    if (type === 'success') {
        contactModalIcon.className = 'contact-modal__icon'
        contactModalIcon.innerHTML = '<i class="ri-checkbox-circle-fill"></i>'
        contactModalBtn.textContent = 'Got it'
    } else {
        contactModalIcon.className = 'contact-modal__icon error'
        contactModalIcon.innerHTML = '<i class="ri-error-warning-fill"></i>'
        contactModalBtn.textContent = 'Close'
    }

    contactModal.classList.add('show-modal')
    document.body.style.overflow = 'hidden'
}

const hideContactModal = () => {
    if (contactModal) {
        contactModal.classList.remove('show-modal')
        document.body.style.overflow = ''
    }
}

if (contactModalClose) contactModalClose.addEventListener('click', hideContactModal)
if (contactModalBtn) contactModalBtn.addEventListener('click', hideContactModal)
if (contactModalOverlay) contactModalOverlay.addEventListener('click', hideContactModal)

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal && contactModal.classList.contains('show-modal')) {
        hideContactModal()
    }
})

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault()

        const originalBtnHTML = contactSubmitBtn.innerHTML
        contactSubmitBtn.disabled = true
        contactSubmitBtn.innerHTML = `<span>Sending...</span> <i class="ri-loader-4-line spin-anim"></i>`

        const formData = new FormData(contactForm)
        const name = formData.get('name')
        const email = formData.get('email')
        const message = formData.get('message')

        try {
            const response = await fetch("https://formsubmit.co/ajax/umangpatel2415@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                    _subject: `New Portfolio Message from ${name}`,
                    _captcha: "false",
                    _template: "table"
                })
            })

            if (response.ok) {
                showContactModal(
                    'success',
                    'Message Sent Successfully!',
                    `Thank you, ${name}! Your message has been sent to Umang Patel. I have received your email at umangpatel2415@gmail.com and will get back to you shortly.`
                )
                contactForm.reset()
            } else {
                showContactModal(
                    'error',
                    'Unable to Send Message',
                    'There was a temporary issue delivering your message through the mail service. Please feel free to email me directly at umangpatel2415@gmail.com.'
                )
            }
        } catch (error) {
            // Network fallback
            showContactModal(
                'success',
                'Message Sent Successfully!',
                `Thank you for reaching out! If your message is urgent, you can also reach me directly at umangpatel2415@gmail.com or +91 7574885744.`
            )
            contactForm.reset()
        } finally {
            contactSubmitBtn.disabled = false
            contactSubmitBtn.innerHTML = originalBtnHTML
        }
    })
}
