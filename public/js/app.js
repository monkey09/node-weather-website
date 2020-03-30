const form = document.querySelector('form')
const input = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  let address = input.value
  fetch(`/weather?address=${address}`)
  .then(response => response.json())
  .then(json => {
    if (json[0].error) {
      messageOne.textContent = json[0].error
    } else {
      messageOne.textContent = json[0].location
      messageTwo.textContent = json[0].forecast
    }
  })
})
