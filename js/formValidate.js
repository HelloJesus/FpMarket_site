const contactForm = document.querySelector('.contact-form')
const contactFormInputs = contactForm.querySelectorAll('.contact-form__input')
const contactFormBtn = contactForm.querySelector('button')
const contactFormErrorTag = contactForm.querySelector('.form__pass-error')
let value

contactFormBtn.addEventListener('click', (e) => {
    contactFormInputs.forEach(input => {
        checkInput(input, e)
    })
})

const checkInput = (input, e) => {
    value = input.value
    if (input.id === 'contactPhone' && value.length > 0) {
        if (isNaN(value)) {
            contactFormErrorTag.innerText = 'Phone must contains only numbers'
            input.style.border = '1px solid #ffb8b8'
            e.preventDefault()
            return
        } else {
            contactFormErrorTag.innerText = ''
            input.style.border = '1px solid #B8DDFF'
        }
    }
    if (value === '' || value === null) {
        input.style.border = '1px solid #ffb8b8'
        e.preventDefault()
        return
    } else {
        input.style.border = '1px solid #B8DDFF'
    }
}
