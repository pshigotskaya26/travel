let sliderNavPrev = document.querySelector('.slider__nav_prev');
let sliderNavNext = document.querySelector('.slider__nav_next');
let sliderContent = document.querySelector('.slider__content');
let elementsSliderContent = document.querySelectorAll('.slider__item');
let stepSlider = document.querySelectorAll('.slider__item')[1].offsetWidth;
let direction;
let leftSliderContent = sliderContent.offsetLeft;

window.addEventListener('resize',function(){
    location.reload();  
});

const createAttribute = () => {
    for (let j = 0; j < elementsSliderContent.length; j++) {
        elementsSliderContent[j].setAttribute('data-id', j);
    }
};

const createIndicatorsItem = () => {
    let containerIndicators = document.querySelector('.indicators');
    let indicatorsItem = document.querySelector('.indicators__item');
    for (let k = 1; k < elementsSliderContent.length; k++) {
        let cloneItem = indicatorsItem.cloneNode(true);
        containerIndicators.appendChild(cloneItem);
    }
};

const setActiveClassToIndicator = () => {
    let elementsIndicators = document.querySelectorAll('.indicators__item');
    for (let l = 0; l < elementsIndicators.length; l++) {
        elementsIndicators[l].classList.remove('indicators__item_active');
    }

    let arrsliderItem = document.querySelectorAll('.slider__item');
    let widthWindow = window.innerWidth;

    if (widthWindow <= 390) {
        let valueDataId = +arrsliderItem[0].dataset.id;
        elementsIndicators[valueDataId].classList.add('indicators__item_active');
    }
    else {
        let valueDataId = +arrsliderItem[1].dataset.id;
        elementsIndicators[valueDataId].classList.add('indicators__item_active');
    }
    
};

createAttribute();
createIndicatorsItem();
setActiveClassToIndicator();

const createCloneElem = () => {
    let parent = document.querySelector('.slider__content');
    if (direction === -1) {
        let firstElem = document.querySelectorAll(".slider__item")[0];
        let clone = firstElem.cloneNode(true);
        parent.appendChild(clone);
    }
    else {
        let elements = document.querySelectorAll(".slider__item");
        let lastElem = elements[elements.length - 1];
        clone = lastElem.cloneNode(true);
        parent.prepend(clone);
    }
};

const deleteElem = () => {
    let arrSliderItem = document.querySelectorAll('.slider__item');
    let elemSliderContent = document.querySelector('.slider__content');
    if (direction === -1) {
        elemSliderContent.removeChild(arrSliderItem[0]);
    }
    else {
        elemSliderContent.removeChild(arrSliderItem[arrSliderItem.length - 1]);
    }
};

const animateSlides = () => {
    

    if (direction === -1) {
        sliderContent.style.left = leftSliderContent + (-stepSlider) +'px';
    } 
    else {
        sliderContent.style.left = leftSliderContent + 'px';
    }
};

sliderNavNext.addEventListener('click', function() {
    direction = -1;
    createCloneElem();
    setTimeout(function() {
        sliderContent.style.transition ='1s all ease-in-out';
        animateSlides();
    });
});

sliderNavPrev.addEventListener('click', function() {
    direction = 1;
    sliderContent.style.transition ='none';
    sliderContent.style.left = leftSliderContent + (-stepSlider) +'px';
    createCloneElem();
    setTimeout(function() {
        sliderContent.style.transition ='1s all ease-in-out';
    });
    setTimeout(function() {
        sliderContent.style.transition ='1s all ease-in-out';
        animateSlides();
    });
});

sliderContent.addEventListener('transitionend', function() {
    if (direction === -1) {
        deleteElem();
        sliderContent.style.transition ='none';
        
        sliderContent.style.left = leftSliderContent + 'px';
        setTimeout(function() {
            sliderContent.style.transition ='1s all ease-in-out';
        });
    }
    else {
        deleteElem();
    }
    setActiveClassToIndicator();
});





