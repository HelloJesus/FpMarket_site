const wrap = document.querySelector('.embla')
const viewport = wrap.querySelector('.embla__viewport')
const prevBtn = wrap.querySelector('.embla__button--prev')
const nextBtn = wrap.querySelector('.embla__button--next')
const embla = EmblaCarousel(viewport, {
    loop: true,
    dragable: true,
    slidesToScroll: 5,
    align: "center",
        breakpoints: {
            '(max-width: 1280px)': { slidesToScroll: 4 },
            '(max-width: 1080px)': { slidesToScroll: 3 },
            '(max-width: 750px)': { slidesToScroll: 2 },
            '(max-width: 550px)': { slidesToScroll: 1 }
    }
})

const setupPrevNextBtns = (prevBtn, nextBtn, embla) => {
    prevBtn.addEventListener('click', embla.scrollPrev, false)
    nextBtn.addEventListener('click', embla.scrollNext, false)
}

const disablePrevNextButtons = (prevBtn, nextBtn, embla) => {
    return () => {
        if (embla.canScrollPrev()) prevBtn.removeAttribute('disabled')
        else prevBtn.setAttribute('disabled', 'disabled')

        if (embla.canScrollPrev()) nextBtn.removeAttribute('disabled')
        else nextBtn.setAttribute('disabled', 'disabled')
    }
}

const disablePrevAndNextButtons = disablePrevNextButtons(prevBtn, nextBtn, embla)
setupPrevNextBtns(prevBtn, nextBtn, embla)

embla.on('select', disablePrevAndNextButtons)
embla.on('init', disablePrevAndNextButtons)
