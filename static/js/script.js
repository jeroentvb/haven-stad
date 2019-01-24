/* global XMLHttpRequest, localStorage */

const currentCategory = document.getElementsByClassName('text')[0].textContent.toLowerCase()
const keyWords = [
  'Rijkswaterstaat', 'Nederlandse spoor', 'speelvoorzieningen', 'veiligheidsraad', 'veiligheidseisen', 'veilige', 'veilig', 'sigaretten', 'gezichten', 'Amsterdamse traditie', 'bevolkingssamenstelling', 'Verenigde Naties', 'stimuleert', 'medische', 'dossier', 'nascheiden', 'gescheiden', 'scheiding', 'scheiden', 'prijsstijgingen', 'gladde oppervlakken', 'kleinschalige ', 'traditionele', 'sportparken', 'openbare', 'opwekken', 'productiedoelstelling', 'groene omgeving', 'groengebieden', 'gezondheidsmaatregelen', 'Wereldgezondheidsorganisatie', 'Volksgezondheid', 'huishoudelijk', 'ongezondste', 'ongezonder', 'ongezond', 'snackbarvrije', 'snackbars', 'snackbar', 'gezondheidsschade', 'gezondheid', 'gezondere', 'gezonder', 'gezonde', 'gezond', 'fietsinfrastructuur', 'waardestijging', 'waardeverhoging', 'fietsbrug', 'snorfietsen', 'kwaliteit', 'huizenprijzen', 'recyclebare ', 'niet-recyclebaar', 'stimuleren', 'huurprijzen', 'huurprijsstijging', 'huurwoningen', 'zwaarlijvigheid', 'wandelen', 'wandelpromenade', 'verbeteren', 'woningprijzen', 'subsidies', 'huurappartementen', 'woningcorporaties', 'rookvrije-', 'rookvrije', 'primaire', 'schoolpleinen', 'oplossing', 'dorp', 'kwartaalcijfers', 'cijfers', 'bouwrijpe grond', 'woningzoekers', 'woningtypen', 'woningmarkt', 'woningbouw', 'woningen', 'woning', 'bruggen', 'oplaadpunten', 'milieubeeld', 'ontwikkelingen', 'ontwikkeling', 'ontwikkeld ', 'stimuleren', 'uitstootvrije', 'uitstootvrij', 'overlast', 'luierrecyclingfabriek', 'infrastructuur', 'bestemmingsplannen', 'hoofdstad', 'ambiances', 'luchtverontreiniging', 'luchtkwaliteit', 'milieuzones', 'milieuzone', 'zones', 'zone', 'obesitas', 'overgewicht', 'stoffen', 'Grondstoffen', 'grondstoffen', 'grondstof', 'stikstofdioxide', 'elementen', 'burgemeester', 'culturele', 'cultuur', 'koopwoningen', 'duurzaamheidsdoelen', 'duurzaamheid', 'duurzame', 'duurzaam', 'warmte- en koudevoorzieningen', 'Spaarndammerbuurt', 'Spaarndammertunnel', 'bewust', 'verkeersinfrastructuur', 'autoverkeer', 'mobiliteitsingrepen', 'mobiliteit', 'bereikbaarheid', 'sportvoorzieningen', 'sporten', 'leefbaarheid', 'waterstoffabriek', 'waterkering', 'water', 'De Bewegende Stad', 'uitstoot', 'Olympische Winterspelen', 'bewegen', 'capaciteitskrapte', 'scheepvaart', 'innovatiekracht', 'plint', 'binnenstedelijke', 'beweging', 'voeding', 'windmolens', 'materialen', 'zonnepanelen', 'leefomgevingskwaliteit', 'leefomgeving', 'laad-/losactiviteiten', 'ov-ponten', 'elektriciteit', 'Zelfrijdende', 'toekomstbeeld', 'transformatiestrategie', 'gemeenteraad', 'gemeenten', 'OV-bereikbaarheid', 'parkeerplekken', 'parkeergarage', 'parkeervergunningen', 'milieucontouren', 'milieucategorieën', 'milieuclub', 'Fitbit', 'investeringen', 'kantoren', 'CO2-besparing', 'CO2-uitstoot', 'windenergie', 'NS-watertappunt', 'Nederlandse Spoorwegen', 'watertappunten', 'plastic', 'flesjes', 'hoge dichtheid', 'zonne-energie', 'inflatie', 'Westerpark', 'CBS', 'metronetwerk', 'metrolijn', 'evenementen', 'bedrijven', 'Noord-Zuidlijn', 'hergebruiken', 'recycling', 'circulaire', 'rust', 'bedrijfsruimte', 'vacatures', 'werkgelegenheid', 'werkruimtes', 'hoge dichtheden', 'karakteristieken', 'mix', 'hoogstedelijk gebied', 'pontverbindingen', 'onderzoekscijfers', 'Pontsteigergarage', 'Pontsteiger', 'Femke Halsema', 'ondernemers', 'zonbescherming', 'recreatiegebieden', 'recreatieve voorzieningen', 'voorzieningen', 'afval', 'hittestress', 'Hittestress', 'Hitteplan', 'hitte', 'elektrische', 'personenauto ', 'autowegen', 'auto’s', 'auto', 'dieselvoertuigen', 'diesel'
]
const hoverDate = document.getElementById('hover-date')
const articleSelector = document.getElementById('article-selector')
const months = [
  'januari',
  'februari',
  'maart',
  'april',
  'mei',
  'juni',
  'juli',
  'augustus',
  'september',
  'oktober',
  'november',
  'december'
]

function fetchArticles () {
  request('/getarticles')
    .then(articles => renderArticleDots(articles))
    .catch(err => console.error(err))
}

function request (url) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest()

    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        resolve(JSON.parse(req.responseText))
      } else if (req.status === 404) {
        reject(new Error('The server responded with 404, not found'))
      }
    }
    req.open('GET', url, true)
    req.send()
  })
}

function renderArticleDots (articles) {
  articles.sort(function (a, b) {
    let c = a.date.split('-').reverse()
    let d = b.date.split('-').reverse()
    return new Date(c) - new Date(d)
  })

  articles.forEach(article => {
    let a = document.createElement('a')
    a.setAttribute('href', `/article/${article.id}`)
    a.setAttribute('class', `link category-${article.category.split(' ').join('-')}`)
    a.setAttribute('data-date', article.date)
    a.innerHTML = createSvg(article)
    articleSelector.appendChild(a)

    a.addEventListener('mouseover', e => {
      let date = a.dataset.date
      let position = getOffset(a)

      if (a.childNodes[0].classList.contains('category-circle')) {
        hoverDate.style.top = `${position.top + 30}px`
        hoverDate.style.left = `${position.left - 45}px`
      }
      if (a.childNodes[0].classList.contains('category-circle-medium')) {
        hoverDate.style.top = `${position.top + 40}px`
        hoverDate.style.left = `${position.left - 42}px`
      }
      if (a.childNodes[0].classList.contains('category-circle-large')) {
        hoverDate.style.top = `${position.top + 70}px`
        hoverDate.style.left = `${position.left - 25}px`
      }
      hoverDate.style.display = 'block'
      let day = date.split('-')[0]
      let month = date.split('-')[1]
      let year = date.split('-')[2]
      hoverDate.textContent = `${day} ${months[month - 1]} ${year}`
    })
    a.addEventListener('mouseout', e => {
      hoverDate.style.display = 'none'
    })
  })
  biggerBubbles()
}

function createSvg (article) {
  let svg = `<svg version='1.1' id='circle-${article.id}' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px'
  viewBox='0 0 1080 1080' style='enable-background:new 0 0 1080 1080;' xml:space='preserve' class='category-circle'>`
  svg += `<g>`
  svg += `<circle class='${article.category.split(' ').join('-')}' cx='540.5' cy='540.5' r='536.5'/>`
  svg += `</g>`
  svg += `</svg>`

  return svg
}

function biggerBubbles () {
  // Make main bubble biggest
  let id = window.location.href.split('/').splice(-1)[0] ? window.location.href.split('/').splice(-1)[0] : 10
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
  // document.getElementsByTagName('main')[0].classList.add(`${currentCategory}-background`)
  document.body.classList.add(`${currentCategory}-background`)
  // document.getElementsByTagName('article')[1].classList.add(`${currentCategory}-background`)
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
    text.innerHTML = text.innerHTML.replace(word, `<span class='${currentCategory} highlight'>${word}</span>`)
  }
}

function getOffset (el) {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  }
}

function hint () {
  let windowWidth = window.innerWidth
  let hint = document.getElementById('hint-overlay')
  if (localStorage.getItem('shownHint') !== 'true' && windowWidth <= 1000) {
    hint.style.display = 'block'
    articleSelector.style.top = '50vh'
    articleSelector.style.bottom = 'auto'
    articleSelector.style.position = 'fixed'
    localStorage.setItem('shownHint', 'true')
  }

  document.getElementById('understood').addEventListener('click', () => {
    hint.style.display = 'none'
    articleSelector.style.top = ''
    articleSelector.style.bottom = ''
    articleSelector.style.position = ''
  })
}

function init () {
  fetchArticles()
  backgroundColor()
  textColor()
  highLightWords(keyWords)
  if (document.getElementById('understood')) {
    hint()
  }
}

init()
