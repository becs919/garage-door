const $garageButton = $('#garage-button')

const fetchItems = () => {
  fetch('/api/v1/items')
  .then(response => response.json())
  .then(items => {
    appendItems(items)
    appendCount(items)
  })
  .catch(error => console.error(error))
}

const fetchItemById = (id) => {
  fetch(`/api/v1/items/${id}`)
  .then(response => response.json())
  .then(items => {
    console.log(items)
    appendIndvItem(items)
    appendChangeCleanliness(items)
  })
  .catch(error => console.error(error))
}

const fetchItemsABC = () => {
  fetch('/api/v1/items/asc')
  .then(response => response.json())
  .then(items => {
    appendItems(items)
    appendCount(items)
  })
  .catch(error => console.error(error))
}

const fetchItemsDate = () => {
  fetch('/api/v1/items/date')
  .then(response => response.json())
  .then(items => {
    appendItems(items)
    appendCount(items)
  })
  .catch(error => console.error(error))
}

const fetchItemsCleanliness = () => {
  fetch('/api/v1/items/cleanliness')
  .then(response => response.json())
  .then(items => {
    appendItems(items)
    appendCount(items)
  })
  .catch(error => console.error(error))
}

const postItem = (name, reason, cleanliness) => {
  fetch('/api/v1/items', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({ name, reason, cleanliness })
  })
  .then(() => {
    fetchItems()
  })
  .catch(error => console.error(error))
}

const closeGarage = () => {
  $garageButton.addClass('closed').text('Open Garage')
  $garageButton.removeClass('open')
  hideBecauseClosed()
  clearBecauseEmpty()
}

const hideBecauseClosed = () => {
  $('.add-new').hide()
  $('#garage-count').hide()
  $('h3').hide()
  $('.sorting').hide()
  $('#indv-item').hide()
}

const clearBecauseEmpty = () => {
  $('#error').text('')
  $('#garage-items').empty()
}

const openGarage = () => {
  $garageButton.removeClass('closed')
  $garageButton.addClass('open').text('Close Garage')
  showBecauseOpen()
  fetchItems()
}

const showBecauseOpen = () => {
  $('h3').css('display', 'flex')
  $('.sorting').css('display', 'flex')
  $('.add-new').css('display', 'flex')
  $('#garage-count').show()
  $('#indv-item').css('display', 'flex')
}

const appendItems = (items) => {
  $('#garage-items').html('')

  let itemFragments = document.createDocumentFragment()

  items.forEach(item => {
    let itemElement = document.createElement('li')

    let name = document.createElement('p')
    name.innerText = item.name
    name.classList.add('name')
    name.dataset.itemId = item.id

    let cleanliness = document.createElement('p')
    cleanliness.innerText = item.cleanliness
    cleanliness.classList.add('cleanliness-rating')

    itemElement.appendChild(name)
    itemElement.appendChild(cleanliness)
    itemFragments.appendChild(itemElement)
  })

  $('#garage-items').append(itemFragments)
}

const appendIndvItem = (items) => {
  $('#indv-item').html('')

  let indvItemFrag = document.createDocumentFragment()

  items.forEach(item => {
    let indvItemElement = document.createElement('li')

    let name = document.createElement('p')
    name.innerText = item.name
    name.classList.add('name-indv')
    name.dataset.itemId = item.id

    let reason = document.createElement('p')
    reason.innerText = `Reason: ${item.reason}`
    reason.classList.add('reason-indv')
    reason.dataset.itemId = item.id

    let cleanliness = document.createElement('p')
    cleanliness.innerText = `Cleanliness: ${item.cleanliness}`
    cleanliness.classList.add('cleanliness-rating-indv')

    indvItemElement.appendChild(name)
    indvItemElement.appendChild(reason)
    indvItemElement.appendChild(cleanliness)
    indvItemFrag.appendChild(indvItemElement)
  })

  $('#indv-item').append(indvItemFrag)
}

const appendCount = (items) => {
  let count = 0
  let sparkling = 0
  let dusty = 0
  let rancid = 0

  items.forEach(item => {
    count++

    if (item.cleanliness === 'Sparkling') {
      return sparkling++
    } else if (item.cleanliness === 'Dusty') {
      return dusty++
    } else if (item.cleanliness === 'Rancid') {
      return rancid++
    }
  })
  renderCount(count, sparkling, dusty, rancid)
}

const renderCount = (count, sparkling, dusty, rancid) => {
  $('.total-items').text(`Total Items: ${count}`)
  $('.total-sparkling').text(`Sparkling: ${sparkling}`)
  $('.total-dusty').text(`Dusty: ${dusty}`)
  $('.total-rancid').text(`Rancid: ${rancid}`)
}

const clearForm = () => {
  $('.name-input').val('')
  $('.reason-input').val('')
}

$(document).ready(() => {
  closeGarage()
})

$garageButton.on('click', event => {
  if ($garageButton.hasClass('closed')) {
    openGarage()
  } else if ($garageButton.hasClass('open')) {
    closeGarage()
  }
})

$('.save-item').on('click', event => {
  const $name = $('.name-input').val()
  const $reason = $('.reason-input').val()
  const $cleanliness = $('#cleanliness option:selected').text()

  if ($name.length <= 0) {
    console.log('no lanem')
    $('#error').text('Error: No Name')
  } else if ($reason.length <= 0) {
    $('#error').text('Error: No Reason')
  } else {
    $('#error').text('')
    postItem($name, $reason, $cleanliness)
    clearForm()
  }
})

$('.order-button').on('click', event => {
  fetchItemsABC()
})

$('.date-button').on('click', event => {
  fetchItemsDate()
})

$('.cleanliness-button').on('click', event => {
  fetchItemsCleanliness()
})

$('#garage-items').on('click', '.name', event => {
  let id = event.target.dataset.itemId
  fetchItemById(id)
})

const appendChangeCleanliness = (items) => {
  $('#indv-item').append(
    `<label id="cleanliness-change" for="cleanliness">
      <select>
        <option value="Sparkling">Sparkling</option>
        <option value="Dusty">Dusty</option>
        <option value="Rancid">Rancid</option>
      </select>
    </label>
    <input type="submit" value="Update"class="change-cleanliness"/>`
  )
}
