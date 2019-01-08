/* global $ */

function elById (el) {
  return document.getElementById(el)
}

const dateSlider = $('#date-slider')
const month = {
  min: $('#min-month'),
  max: $('#max-month')
}
const sliderText = {
  left: $('#month-left'),
  right: $('#month-right')
}
const months = [
  'Januari',
  'Februari',
  'Maart',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Augustus',
  'September',
  'Oktober',
  'November',
  'December'
]
const filters = [
  elById('veiligheid'),
  elById('duurzaamheid'),
  elById('leven'),
  elById('mobiliteit'),
  elById('wonen')
]

function newDate (dateString) {
  return new Date(dateString).getTime() / 1000
}

function changeDate (event, ui) {
  let firstDate = new Date(ui.values[0] * 1000)
  let secondDate = new Date(ui.values[ 1 ] * 1000)

  month.min.text(months[firstDate.getMonth()])
  month.max.text(months[secondDate.getMonth()])
  sliderText.left.text(months[firstDate.getMonth()])
  // slidetText.left.css('transform', `translateX()`)
  sliderText.right.text(months[secondDate.getMonth()])
  console.log(event, ui.values[0], ui.values[1])
}

function createSlider () {
  dateSlider.slider({
    range: true,
    min: newDate('01 January, 2018 00:0:00'),
    max: newDate('December 31, 2018 00:0:00'),
    step: 1,
    values: [ newDate('Februari 01, 2018 00:0:00'), newDate('October 31, 2018 00:0:00') ],
    slide: changeDate
  })
}

function initFilters () {
  filters.forEach(filter => {
    filter.addEventListener('change', event => {
      let el = {
        id: event.target.id,
        checked: event.target.checked
      }
      let articles = document.getElementsByClassName(el.id)

      if (el.checked) {
        for (let i = 0; i < articles.length; i++) {
          articles[i].classList.remove('hidden')
        }
      } else {
        for (let i = 0; i < articles.length; i++) {
          articles[i].classList.add('hidden')
        }
      }
    })
  })
}

function init () {
  console.log('Init!')
  createSlider()
  initFilters()
}

init()
