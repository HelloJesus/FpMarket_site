const overlay = document.querySelector('.overlay')
let popup, form, popupCloseBtn, result
const logInBtn = document.querySelectorAll('#logInBtn')
const signUpBtn = document.querySelectorAll('#signUpBtn')
const inputArray = document.querySelectorAll('input')

// show login form
logInBtn.forEach(btn => {
    btn.addEventListener('click', _ => {
        popup = overlay.querySelector('#logIn')
        popup.classList.add('popup_active')
        overlay.classList.add('overlay_active')
        document.documentElement.style.overflow = 'hidden'
        closeOverlayClick(popup)
        popupClose(popup)
        // show email resert password form
        overlay.querySelector('#forgotPassBtn').addEventListener('click', _ => {
            showEmailResertPass()
            return
        })

        // button form
        popup.querySelector('.button').addEventListener('click', e => {
            form = popup.querySelector('.form')
            errorTag = form.querySelector('.form__pass-error')
            // validate form
            validateForm(form, errorTag, e)
        })
    })
})
// show signUp form
signUpBtn.forEach(btn => {
    btn.addEventListener('click', _ => {
        popup = overlay.querySelector('#signUp')
        popup.classList.add('popup_active')
        overlay.classList.add('overlay_active')
        document.documentElement.style.overflow = 'hidden'
        closeOverlayClick(popup)
        popupClose(popup)
        // add list phones
        selectPhone()

        // button form
        popup.querySelector('.button').addEventListener('click', e => {
            form = popup.querySelector('.form')
            errorTag = form.querySelector('.form__pass-error')
            // validate form
            validateForm(form, errorTag, e)
        })
    })
})


// email resert pass form
const showEmailResertPass = () => {
    popup.classList.remove('popup_active')
    overlay.querySelector('#emailResertPass').classList.add('popup_active')
    const popupEmailResertPass = overlay.querySelector('#emailResertPass')
    document.documentElement.style.overflow = 'hidden'
    closeOverlayClick(popupEmailResertPass)
    popupClose(popupEmailResertPass)

    popupEmailResertPass.querySelector('.button').addEventListener('click', e => {
        // e.preventDefault()
        form = popupEmailResertPass.querySelector('.form')
        errorTag = form.querySelector('.form__pass-error')
        result = validateForm(form, errorTag, e)
        if (result === true) {
            popupEmailResertPass.classList.remove('popup_active')
            showResertPassword()
        }
    })
}

// show resert passwords form
const showResertPassword = () => {
    const popupResertPass = overlay.querySelector('#passwordResert')
    popupResertPass.classList.add('popup_active')
    document.documentElement.style.overflow = 'hidden'
    closeOverlayClick(popupResertPass)
    popupClose(popup)
    popupResertPass.querySelector('.button').addEventListener('click', e => {
        validateForm(form, errorTag, e)
        // show password resert form
    })
}

// close all overlay
const closeOverlayClick = (popup) => {
    document.addEventListener('click', e => {
        if (!e.target.closest('.popup') && !e.target.closest('.button')) {
            popup.classList.remove('popup_active')
            overlay.classList.remove('overlay_active')
            inputArray.forEach(input => {
                input.value = ''
            })
            document.documentElement.style.overflow = 'auto'
        }
    })
}

const popupClose = (popup) => {

    popupCloseBtn = popup.querySelector('#popupClose')
    popupCloseBtn.addEventListener('click', _ => {
        popup.classList.remove('popup_active')
        overlay.classList.remove('overlay_active')
    })
}

const validateForm = (form, errorTag, e) => {
    let inputs = form.querySelectorAll('.form__input')

    inputs.forEach(input => {
        validateInput(form, input, errorTag, e)
    })

}

const validateInput = (form, input, errorTag, e) => {
    let value = input.value
    let errorsPass = []

    if (input.name === 'password' && value !== '') {
        if (value.length < 8) {
            setError(input, errorTag, 'Passwords must be 8 symbols', e)
            return
        }
        if (value === (value).toLowerCase()) {
            errorsPass.push(' a capital letter')
        }
        if (!((value).match(/[!@#$%^&*()]/))) {
            if (errorsPass.length > 0) {
                errorsPass.push(', special symbols')
            } else {
                errorsPass.push(' special symbols')
            }
        }
        if (errorsPass.length > 0) {
            let errorText = 'Passwords must contain '
            errorsPass.forEach(item => {
                errorText += item
            })
            setError(input, errorTag, errorText, e)
            return
        }
        if (value !== (form.querySelector('input[name="passwordConfirm"]')).value) {
            setError(input, errorTag, 'Passwords do not match', e)
            return
        }
        if (errorTag && (errorTag.innerText).length > 0) {
            errorTag.innerText = ''
            input.style.border = '1px solid #B8DDFF'
            form.querySelector('input[name="passwordConfirm"]').style.border = '1px solid #B8DDFF'
        }
    } if (value === '' || value === null) {
        input.style.border = '1px solid #ffb8b8'
        e.preventDefault()
        return
    } else {
        if (input.id === 'inputPhone') {
            form.querySelector('#phone').value = form.querySelector('#textPhone').textContent + input.value
        }
        input.style.border = '1px solid #B8DDFF'
        return true
    }
}

const setError = (input, errorTag, text, e) => {
    if (errorTag !== undefined || errorTag !== null) {
        errorTag.innerText = text
        input.style.border = '1px solid #ffb8b8'
        e.preventDefault()
    }
}


const selectPhone = () => {
    const select = document.querySelector('.form__select')
    const selectArrow = document.querySelector('.form__select-phone-arrow')
    const selectList = document.querySelector('.form__list')
    const textPhone = select.querySelector('#textPhone')
    const inputPhone = document.querySelector('#phone')

    const numbers = ["+213", "+376", "+244", "+1264", "+1268", "+54", "+374", "+297", "+61", "+43", "+994", "+1242", "+973", "+880", "+1246", "+375", "+32", "+501", "+229", "+1441", "+975", "+591", "+387", "+267", "+55", "+673", "+359", "+226", "+257", "+855", "+237", "+238", "+1345", "+236", "+56", "+86", "+57", "+269", "+242", "+682", "+506", "+385", "+53", "+90392", "+357", "+42", "+45", "+253", "+1809", "+1809", "+593", "+20", "+503", "+240", "+291", "+372", "+251", "+500", "+298", "+679", "+358", "+33", "+594", "+689", "+241", "+220", "+7880", "+49", "+233", "+350", "+30", "+299", "+1473", "+590", "+671", "+502", "+224", "+245", "+592", "+509", "+504", "+852", "+36", "+354", "+91", "+62", "+98", "+964", "+353", "+972", "+39", "+1876", "+81", "+962", "+254", "+686", "+850", "+82", "+965", "+996", "+856", "+371", "+961", "+266", "+231", "+218", "+417", "+370", "+352", "+853", "+389", "+261", "+265", "+60", "+960", "+223", "+356", "+692", "+596", "+222", "+269", "+52", "+691", "+373", "+377", "+976", "+1664", "+212", "+258", "+95", "+264", "+674", "+977", "+31", "+687", "+64", "+505", "+227", "+234", "+683", "+672", "+670", "+47", "+968", "+680", "+507", "+675", "+595", "+51", "+63", "+48", "+351", "+1787", "+974", "+262", "+40", "+250", "+378", "+239", "+966", "+221", "+381", "+248", "+232", "+65", "+421", "+386", "+677", "+252", "+27", "+34", "+94", "+290", "+1869", "+1758", "+249", "+597", "+268", "+46", "+41", "+963", "+886", "+66", "+228", "+676", "+1868", "+216", "+90", "+993", "+1649", "+688", "+256", "+44", "+380", "+971", "+598", "+1", "+7", "+678", "+379", "+58", "+84", "+1284", "+1340", "+681", "+969", "+967", "+260", "+263"]
    let liTag

    numbers.sort((a, b) => {
        return a - b
    })
    numbers.forEach(item => {
        if (liTag === undefined) {
            liTag = `<li class="form__list-item" data-number="${item}">${item}</li>`
            return
        }
        liTag += `<li class="form__list-item" data-number="${item}">${item}</li>`
    })

    selectList.insertAdjacentHTML('beforeend', liTag)

    select.addEventListener('click', _ => {
        selectArrow.classList.toggle('form__select-phone-arrow_active')
        selectList.classList.toggle('form__list_active')
    })

    selectList.addEventListener('click', e => {
        if (e.target.closest('.form__list-item')) {

            if (((e.target.closest('.form__list-item')).innerText).length > 2) {
                textPhone.style.marginRight = '15px'
            } else {
                textPhone.style.marginRight = '0px'
            }
            textPhone.innerText = e.target.dataset.number
            inputPhone.value = e.target.dataset.number
        }
    })
}


const passImgActions = document.querySelectorAll('.form__pass-img')
passImgActions.forEach(item => {
    item.addEventListener('click', e => {
        if (item.getAttribute('id') === 'hidePass') {
            item.style.visibility = 'hidden'
            item.parentNode.querySelector('#showPass').style.visibility = 'visible'
        } else if (item.getAttribute('id') === 'showPass') {
            item.style.visibility = 'hidden'
            item.parentNode.querySelector('#hidePass').style.visibility = 'visible'
        }
            
    })
})

        