import { flsModules } from "./modules.js";
import {mainPageLocation, blogPageLocation} from "./modules/window-location.js";


if (document.querySelector('html').dataset.page !== "1") {
window.onload = function () {

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

////// BLOG CLICK ACTION //////

document.addEventListener('click', documentAction)
function documentAction (e) {
    const targetElement = e.target;

////// MENU-BURGER
    if (window.innerWidth < 768) {
        if (targetElement.closest(".icon-menu")) {
            targetElement.closest(".icon-menu").classList.toggle('_active');
            document.querySelector('.header__menu').classList.toggle('_active');
        }
    }

}




let navItems = Array.from(document.querySelector('.menu__list').children);
navItems = navItems.map(item => item.firstElementChild);
navItems.forEach(item => {
    item.setAttribute('href', `${mainPageLocation}` + "?opendiv=" + `${item.dataset.go}`);
})



console.log(window.location.search);


// формирование новости

if (window.location.search.search('opendiv=') && window.location.search ) {

    let index = window.location.search.split('=')[1]

    // console.log(create);

    loadBlog(index)


    // history.replaceState({}, document.title, "."); // красивое
}


async function loadBlog (index) {

    const file = "../../json/news.json";

    let response = await fetch(file, {
            method: "GET",
        });

    if (response.ok){
        let data = await response.json();
        // .then(function(data) { return data})
        createBlog(data, index)
    }
}


function createBlog (data, index) {
    let item = data.news.filter(item => {
        return item.nid == index
    });
    item = item[0];


    console.log(item);

    let blogImage = document.querySelector('.picture__image');
    blogImage.innerHTML = `<img src="img/news/${item.image}" alt="">`

    let blogImageText = document.querySelector('.picture__title');
    blogImageText.innerHTML = item.title

    let blogIssue = document.querySelector('.issue__description');
    blogIssue.innerHTML = item.blogIssue

    let blogSolutionTitle = document.querySelector('.solution__title');
    blogSolutionTitle.innerHTML = item.blogSolutionTitle

    let blogSolutionText = document.querySelector('.solution__text');
    blogSolutionText.innerHTML = item.blogSolutionText

}


















}
};