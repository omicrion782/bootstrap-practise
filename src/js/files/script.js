

// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";


window.onload = function () {

if (isMobile.any()) {
    document.body.classList.add("_touch");
} else {
    document.body.classList.add("_pc");
}


////// DOCUMENT CLICK ACTION //////

document.addEventListener('click', documentAction)
function documentAction (e) {
    const targetElement = e.target;

////// MENU-BURGER
    if (window.innerWidth < 768) {
        if (targetElement.closest(".icon-menu")) {
            targetElement.closest(".icon-menu").classList.toggle('_active');
            document.querySelector('.header__menu').classList.toggle('_active')
        }
    }


////// NAVIGATION

    if (targetElement.closest('.menu__list')){
        
        if(targetElement.classList.contains('menu__link-home')){
            window.scrollTo({
                top:0,
                behavior: "smooth",
            });
        }

        const headerBodyOffsetHeight = document.querySelector('.header__body').offsetHeight;

        if(targetElement.classList.contains('menu__link-services')){
            const offsetTopServices = document.querySelector('.page__services').offsetTop - headerBodyOffsetHeight;
            window.scrollTo({
                top:offsetTopServices,
                behavior: "smooth",
            });
        }

        if(targetElement.classList.contains('menu__link-about-us')){
            const offsetTopAboutUs = document.querySelector('.page__about-us').offsetTop - headerBodyOffsetHeight;
            window.scrollTo({
                top:offsetTopAboutUs,
                behavior: "smooth",
            });
        }

        if(targetElement.classList.contains('menu__link-news')){
            const offsetTopNews = document.querySelector('.page__news').offsetTop - headerBodyOffsetHeight;
            window.scrollTo({
                top:offsetTopNews,
                behavior: "smooth",
            });
        }

        if(targetElement.classList.contains('menu__link-contact-us')){
            const offsetTopContactUs = document.querySelector('.page__contact-us').offsetTop - headerBodyOffsetHeight;
            window.scrollTo({
                top:offsetTopContactUs,
                behavior: "smooth",
            });
        }
        
        e.preventDefault();
    }

}





////// FORM //////

    const contactForm = document.forms.contactForm;
    if (contactForm) {
        contactForm.addEventListener("submit", sendMail);
    }
    async function sendMail (e) {
        e.preventDefault()

        let error = formValidate(contactForm)

        let formData = new FormData(contactForm)

        if (error === 0) {
            contactForm.classList.add('_sending');
            let response = await fetch('../../files/sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                // contactForm.reset();
                contactForm.classList.remove('_sending');
            } else {
                console.log('response error');
                contactForm.classList.remove('_sending');
            }
        } else {
        }
    }

    function formValidate (form) {
        let error = 0;
        
        for (let i = 0; i < form.length; i++) {
            let input = form[i];
            formRemoveError(form[i]);

            if (input.name === "name" || input.name === "subject" || input.name === "message"){
                if (!input.value){
                    formAddError(input);
                    error++;
                }
            }

            if (input.name === "name" || input.name === "subject"){
                if (/[0-9]/.test(input.value)){
                    formAddError(input);
                    error++;
                }
            }

            if (input.name === "email"){
                var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                if (!(input.value) || !(reg.test(input.value))){
                    formAddError(input);
                    error++;
                } 
            }

        }
        return error
    }


function formAddError (input) {
    if (!input.classList.contains('_error')){
        input.classList.add('_error')
    }
}

function formRemoveError (input) {
    if (input.classList.contains('_error')){
        input.classList.remove('_error')
    }
}



////// HEADER //////



////// INTERSECTION //////

////// HEADER
const headerTrigger = document.querySelector('.header__intersection-trigger');
const headerElement = document.querySelector('.header__wrapper');

let optionsHeader = {
    rootMargin: '0px',
    threshold: 1
}


const interCb = function (entries, observer) {
	if(entries[0].isIntersecting && window.innerWidth > 768 ){
        if (headerElement.classList.contains('_scroll')) {headerElement.classList.remove('_scroll')}
    } else {
        document.querySelector('.header__wrapper').classList.add("_scroll")
    }
}

const headerObserver = new IntersectionObserver(interCb , optionsHeader);

headerObserver.observe(headerTrigger);








////// WINDOW RESIZING ACTION //////




window.onresize = resizeActions;
    function resizeActions (e) {

    setOptionsHeaderMarks();

}




////// HEADER MARKS добавить в обработчик resize позже

// установка опций для наблюдателя с учётом ширины экрана выполняется в resizeActions

var optionsHeaderMarks = {}
// настройки срабатывания intersection observer
function setOptionsHeaderMarks (e) {
        if (window.innerWidth < 768) { //mobile
            optionsHeaderMarks = {
                rootMargin: "-24% 0px -74% 1px",
                threshold: 0.001
            }
        }
        if (window.innerWidth < 992 && window.innerWidth > 768) { //tablet
            optionsHeaderMarks = {
                rootMargin: "-24% 0px -73% 2px",
                threshold: 0.01
            }
        }
        if (window.innerWidth > 992) { //pc
            optionsHeaderMarks = {
                rootMargin: "-25% 0px -70% 3px",
                threshold: 0.01
            }
        }
        // console.log(optionsHeaderMarks);
}

setOptionsHeaderMarks();

const interHeaderMarksCb = function (entries, observer) {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            navItems.forEach(item => {
                item.classList.remove('nav-intersecting')
            })
            let index = pageItems.indexOf(entry.target);
            navItems[index].classList.add('nav-intersecting')
        }
    });
}

const headerMarksObserver = new IntersectionObserver(interHeaderMarksCb , optionsHeaderMarks);

const pageItems = Array.from(document.querySelectorAll('.nav-intersection-item'));
const navItems = Array.from(document.querySelector('.menu__list').children)

pageItems.forEach((item)=>{
    headerMarksObserver.observe(item);
})


















}


