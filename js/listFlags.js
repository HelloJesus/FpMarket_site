const toggler = document.querySelector('.lang-toggler')
const togglerMobile = document.querySelector('.lang-toggler-mobile')
let togglerRow, flagList
const flagListItems = document.querySelectorAll('.lang__item')
const flagImgs = document.querySelectorAll('.lang__img')
const langTags = document.querySelectorAll('[localLng]')
const langPlaceholders = document.querySelectorAll('[localLngPlaceholder]')


toggler.addEventListener('click', _ => {
    togglerRow = toggler.querySelector('.lang__row')
    rowRotate(toggler, togglerRow)
    addCloseListFlags('lang-toggler', toggler, togglerRow)
})

if (togglerMobile) {
    togglerMobile.addEventListener('click', _ => {
        togglerRow = togglerMobile.querySelector('.lang__row')
        rowRotate(togglerMobile, togglerRow)
        addCloseListFlags('lang-toggler-mobile', togglerMobile, togglerRow)
    })
}

const addCloseListFlags = (classListToggler, toggler, togglerRow) => {
    document.addEventListener('click', e => {
        if (e.target.classList.contains(classListToggler) || e.target.classList.contains('lang__img') || e.target.classList.contains('lang__row')) return
        if (document.querySelector('.lang__list_active')) {
            if (!e.target.closest('.lang__list')) {
                console.log(1)
                rowRotate(toggler, togglerRow)
            }
        }
    })
}

flagListItems.forEach(item => {
    item.addEventListener('click', _ => {
        addFlag(item)
    })
})

const rowRotate = (toggler, togglerRow) => {
    flagList = toggler.querySelector('.lang__list')
    if (togglerRow.classList.contains('lang__row_active')) {
        togglerRow.classList.remove('lang__row_active')
        flagList.classList.remove('lang__list_active')
    } else {
        togglerRow.classList.add('lang__row_active')
        flagList.classList.add('lang__list_active')
    }
}


const addFlag = (item) => {
    let result
    let lang
    let localLnag
    if (item) localLnag = item.getAttribute("data-google-lang")
    if (item !== undefined) {
        flagImgs.forEach(flagImg => {
            let newFlagSrc = (flagImg.src).replace(flagImg.dataset.flag, item.dataset.flag)
            flagImg.src = newFlagSrc
            flagImg.dataset.flag = item.dataset.flag
        })

    } else {
        if (document.querySelector('[indexFlag]')) {
            flagImgs.forEach(flagImg => {
                lang = getCodeForFlags()
                result = `${lang}Flag`
                resultLink = `./images/main/${lang}Flag.svg`
                flagImg.src = resultLink
                flagImg.dataset.flag = result
            })
        } else {
            flagImgs.forEach(flagImg => {
                lang = getCodeForFlags()
                result = `${lang}Flag`
                resultLink = `../images/main/${lang}Flag.svg`
                flagImg.src = resultLink
                flagImg.dataset.flag = result
            })
        }
    }
    if (lang === undefined || lang === null) {
        lang = localLnag
    }
    
    if (lang !== 'de' || document.querySelector('[googletranslate]')) {
        let valueKey
        langTags.forEach(item => {
            valueKey = item.getAttribute('localLng')
            if (item.hasAttribute('localLngLong')){
                document.querySelector('[localLnglong]').innerHTML = clientAgreentTextEn
            }
            if (item && valueKey !== '') {
                item.innerText = langArr[valueKey]['en']
            }
        })
        langPlaceholders.forEach(item => {
            valueKey = item.getAttribute('localLngPlaceholder')
            item.placeholder = langArr[valueKey]['en'];
        })
        return
    } else {
        googleTranslateConfig.lang = 'de'
    }

    langTags.forEach(item => {
        valueKey = item.getAttribute('localLng')
        if (item.hasAttribute('localLngLong')){
            document.querySelector('[localLnglong]').innerHTML = clientAgreentTextDe
        }
        if (item && valueKey!== '') {
            item.innerText = langArr[valueKey]['de']

        }
    })
    langPlaceholders.forEach(item => {
        valueKey = item.getAttribute('localLngPlaceholder')
        item.placeholder = langArr[valueKey]['de'];
    })

}

addFlag()

function getCodeForFlags() {
    let lang =
        Cookies.get("googtrans") != undefined && Cookies.get("googtrans") != "null"
            ? Cookies.get("googtrans")
            : 'de';
    return lang.match(/(?!^\/)[^\/]*$/gm)[0];
}
