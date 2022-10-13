

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

document.addEventListener('click', documentAction)

function documentAction (e) {

    const targetElement = e.target;



////// MENU-BURGER //////
    if (window.innerWidth < 768) {
        if (targetElement.closest(".icon-menu")) {
            targetElement.closest(".icon-menu").classList.toggle('_active');
            document.querySelector('.header__menu').classList.toggle('_active')
        }
    }


////// NAVIGATION //////

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
    

    contactForm.addEventListener("submit", sendMail);
    
    async function sendMail (e) {
        e.preventDefault()

        let error = formValidate(contactForm)

        let formData = new FormData(contactForm)
        console.log(formData);

        if (error === 0) {
            contactForm.classList.add('_sending');
            let response = await fetch('../../files/sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok){
                let result = await response.json();
                console.log(result.message);
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












































}


