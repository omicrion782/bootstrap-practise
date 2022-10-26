

// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import {mainPageLocation, blogPageLocation} from "./modules/window-location.js";


// JS для главной страницы
if (document.querySelector('html').dataset.page == "1") {
window.onload = function () {


if (isMobile.any()) {
    document.body.classList.add("_touch");
} else {
    document.body.classList.add("_pc");
}










//////////////////////// back from blog func

if (window.location.search.search('opendiv=') && window.location.search ) {

    let go = window.location.search.split('=')[1];

    const headerBodyOffsetHeight = document.querySelector('.header__body').offsetHeight;
    const to = document.querySelector('.'+`${go}`).offsetTop - headerBodyOffsetHeight;

     window.scrollTo({
        top: to,
        behavior: "smooth",
    });

    history.replaceState({}, document.title, "."); // красивое
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

 if (targetElement.classList.contains('menu__link')) {
const headerBodyOffsetHeight = document.querySelector('.header__body').offsetHeight;
    if (targetElement.dataset.go === 'home') {
        window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    } else {
    const to = document.querySelector('.'+`${targetElement.dataset.go}`).offsetTop - headerBodyOffsetHeight;
     window.scrollTo({
        top: to,
        behavior: "smooth",
    });
    }
    e.preventDefault();
 }

    if (targetElement.classList.contains('load-news-button')){
        getNews(targetElement)
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




////// HEADER MARKS 

// установка опций для наблюдателя с учётом ширины экрана выполняется в setOptionsHeaderMarks

var optionsHeaderMarks = {}
// настройки срабатывания intersection observer
function setOptionsHeaderMarks (e) {
        if (window.innerWidth < 768) { //mobile
            optionsHeaderMarks = {
                rootMargin: "-24% 0px -74% 0px",
                threshold: 0.001
            }
        }
        if (window.innerWidth < 992 && window.innerWidth > 768) { //tablet
            optionsHeaderMarks = {
                rootMargin: "-24% 0px -73% 0px",
                threshold: 0.001
            }
        }
        if (window.innerWidth > 992) { //pc
            optionsHeaderMarks = {
                rootMargin: "-25% 0px -70% 0px",
                threshold: 0.001
            }
        }

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
const navItems = Array.from(document.querySelector('.menu__list').children);

pageItems.forEach((item)=>{
    headerMarksObserver.observe(item);
})


//////////////// LOAD NEWS CARDS



async function getNews(button){
    if (!button.classList.contains('_hold')){
        button.classList.add('_hold');
        const file = "../../json/news.json";
        
        let response = await fetch(file, {
            method: "GET",
        });

         if (response.ok){
            const result = await response.json()
            .then(function (data) {
                return data
            }); 
            loadNews(result);
            button.classList.remove('_hold');
            button.remove();

         } else {
            alert ('Ошибка')
         }
    }
}

function loadNews (data) {
    const newsItems = document.querySelector('.load-news');

    for (let index = 0; index < data.news.length; index++) {
        const item = data.news[index];
        // console.log(item);

        if (item.base){
            continue
        }

        let nid = item.nid;
        let url = `${blogPageLocation}` + '?opendiv=' + `${nid}`;
        let title = item.title;
        let text = item.text;
        let date = item.date;
        let image = './img' + '/news/' + `${item.image}`;


        let newsTemplateStart = ``;
        nid % 2 ? newsTemplateStart += `<div class="load-news__card _odd-reverse">` : newsTemplateStart += `<div class="load-news__card">`;
        let newsTemplateEnd = `</div>`;

        let newsTemplateImageStart = `<a href="${url}" class="load-news__item -ibg">`
        let newsTemplateImageContent = `<img src="${image}" alt="">`;
        let newsTemplateImageEnd = `</a>`;

        let newsTemplateTextStart = `<div class="load-news__item _text">`;
        let newsTemplateTextContent = `
        <div class="load-news__item-title">${title}
			<div class="line"></div>
		</div>
		<div class="load-news__item-text">${text}
		</div>
		<div class="load-news__item-date">${date}</div>
        `;
        let newsTemplateTextEnd = `</div>`;


        let newsTemplate = '';
        newsTemplate += newsTemplateStart;
        newsTemplate += newsTemplateImageStart;
        newsTemplate += newsTemplateImageContent
        newsTemplate += newsTemplateImageEnd
        newsTemplate += newsTemplateTextStart
        newsTemplate += newsTemplateTextContent
        newsTemplate += newsTemplateTextEnd
        newsTemplate += newsTemplateEnd

        newsItems.insertAdjacentHTML("beforeend", newsTemplate)
}
}











// console.log(example);



// if (regexp.replace(example)){
//     console.log('nice');
// }
















// testa


let example = '<img src="@img/news/n3.png" alt="">';
let regexp = /^<img.*src.*>$/;
let regexp2 = /src/

if (regexp.test(example)) {
    let result = example.replace(regexp2,'data-src');
    console.log(result);


}

















}
}

