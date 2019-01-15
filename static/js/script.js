/* global fetch */

const currentCategory = document.getElementsByClassName('text')[0].textContent.toLowerCase()
const keyWords = [
  'veilig',
  'veilige',
  'gezondheid',
  'gezond',
  'gezonde',
  'stimuleren',
  'woning',
  'woningen',
  'woningmarkt',
  'woningbouw',
  'ontwikkelen',
  'ontwikkeling',
  'ontwikkeld ',
  'stimuleren',
  'uitstootvrij',
  'luchtkwaliteit',
  'infrastructuur',
  'hoofdstad',
  'luchtverontreiniging',
  'gezondheidsschade',
  'milieuzones',
  'stikstofdioxide',
  'elementen',
  'cultuur',
  'duurzame',
  'duurzaam',
  'duurzaamheid',
  'warmte- en koudevoorzieningen',
  'Spaarndammertunnel',
  'autoverkeer',
  'mobiliteit',
  'bereikbaarheid',
  'sportvoorzieningen',
  'De Bewegende Stad',
  'uitstoot',
  'scheepvaart',
  'plint',
  'duurzaamheidsdoelen',
  'windmolens',
  'zonnepanelen',
  'elektriciteit',
  'Zelfrijdende',
  'toekomstbeeld',
  'transformatiestrategie',
  'gemeenteraad',
  'verkeersinfrastructuur',
  'kantoren',
  'metronetwerk',
  'Noord-Zuidlijn',
  'recycling',
  'circulaire',
  'bedrijfsruimte',
  'werkruimtes',
  'mix',
  'hoogstedelijk gebied',
  '2040',
  'Pontsteiger',
  'ondernemers'
]

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
    a.setAttribute('class', `link category-${article.category.split(' ').join('-')}`)
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
  let id = window.location.href.split('/').splice(-1)[0] ? window.location.href.split('/').splice(-1)[0] : 1
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
  for (let i = 1; i < titles.length; i++) {
    titles[i].classList.add(currentCategory)
    titles[i].style.backgroundColor = 'transparent'
  }

  let bodyText = document.getElementsByClassName('body-text')
  for (let i = 0; i < bodyText.length; i++) {
    bodyText[i].classList.add(currentCategory)
  }
}

function highLightWords (array) {
  let text = {
    article: document.getElementsByClassName('body-text')[0],
    havenstad: document.getElementsByClassName('body-text')[1]
  }
  array.forEach(word => {
    checkText(text.article, word)
    checkText(text.havenstad, word)
  })
}

function checkText (text, word) {
  if (text.textContent.indexOf(word) !== -1) {
    // console.log(word)
    text.innerHTML = text.innerHTML.replace(word, `<span class="${currentCategory} highlight">${word}</span>`)
  }
}

function init () {
  fetchArticles()
  backgroundColor()
  textColor()
  highLightWords(keyWords)
}

init()
