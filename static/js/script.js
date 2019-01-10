/* global fetch */

const currentCategory = document.getElementsByClassName('text')[0].textContent.toLowerCase()

function fetchArticles () {
  fetch('/getarticles')
    .then(res => res.json())
    .then(articles => renderArticleDots(articles))
    .catch(err => console.error(err))
}

function renderArticleDots (articles) {
  articles.sort(function (a, b) {
    let c = a.date.split('-').reverse()
    let d = b.date.split('-').reverse()
    return new Date(c) - new Date(d)
  })

  articles.forEach(article => {
    const articleSelector = document.getElementById('article-selector')

    let a = document.createElement('a')
    a.setAttribute('href', `/article/${article.id}`)
    a.setAttribute('class', `category-${article.category.split(' ').join('-')}`)
    a.innerHTML = createSvg(article)
    articleSelector.appendChild(a)
  })
  biggerBubbles()
}

function createSvg (article) {
  let svg = `<svg version="1.1" id="circle-${article.id}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 1080 1080" style="enable-background:new 0 0 1080 1080;" xml:space="preserve" class="category-circle">`
  svg += `<g>`
  svg += `<circle class="${article.category.split(' ').join('-')}" cx="540.5" cy="540.5" r="536.5"/>`
  svg += `</g>`
  svg += `</svg>`

  return svg
}

function biggerBubbles () {
  // Make main bubble biggest
  let id = window.location.href.split('/').splice(-1)[0]
  let currentBubble = document.getElementById(`circle-${id}`)
  currentBubble.classList.remove('category-circle')
  currentBubble.classList.add('category-circle-large')

  // Make current category bubbles bigger
  let currentCategoryElements = document.getElementsByClassName(`category-${currentCategory}`)

  for (let i = 0; i < currentCategoryElements.length; i++) {
    currentCategoryElements[i].childNodes[0].classList.remove('category-circle')
    currentCategoryElements[i].childNodes[0].classList.add('category-circle-medium')
  }
}

function backgroundColor () {
  document.getElementsByTagName('main')[0].classList.add(`${currentCategory}-background`)
}

function textColor () {
  let titles = document.getElementsByClassName('article-title')
  console.log(titles)
  for (let i = 0; i < titles.length; i++) {
    titles[i].classList.add(currentCategory)
    titles[i].style.backgroundColor = 'transparent'
  }
}

function init () {
  fetchArticles()
  backgroundColor()
  textColor()
}

init()
