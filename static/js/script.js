/* global $ */

const dateSlider = $('#date-slider')
const amount = $('#amount')
const month = {
  min: $('#min-month'),
  max: $('#max-month')
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

function newDate (dateString) {
  return new Date(dateString).getTime() / 1000
}

function changeDate (event, ui) {
  let firstDate = new Date(ui.values[0] * 1000)
  let secondDate = new Date(ui.values[ 1 ] * 1000)

  amount.val(firstDate.toDateString() + ' - ' + secondDate.toDateString())

  month.min.text(months[firstDate.getMonth()])
  month.max.text(months[secondDate.getMonth()])
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
  amount.val((new Date(dateSlider.slider('values', 0) * 1000).toDateString()) + ' - ' + (new Date(dateSlider.slider('values', 1) * 1000)).toDateString())
}

function init () {
  console.log('Init!')
  createSlider()
}

init()
