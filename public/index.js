const $garageButton = $('#garage-button')
const $garageItems = $('#garage-items')
const $garageCount = $('#garage-count')
const $totalItems = $('.total-items')
const $totalSparkling = $('.total-sparkling')
const $totalDusty = $('.total-dusty')
const $totalRancid = $('.total-rancid')
const $addNew= $('.add-new')

const fetchItems = () => {
  fetch('/api/v1/items')
  .then(response => response.json())
  .then(items => {
    appendItems(items);
    appendCount(items);
  })
  .catch(error => console.error(error))
};

const fetchItemsABC = () => {
  fetch('/api/v1/items/asc')
  .then(response => response.json())
  .then(items => {
    appendItems(items);
    appendCount(items);
  })
  .catch(error => console.error(error))
};

const fetchItemsDate = () => {
  fetch('/api/v1/items/date')
  .then(response => response.json())
  .then(items => {
    appendItems(items);
    appendCount(items);
  })
  .catch(error => console.error(error))
};

const fetchItemsCleanliness = () => {
  fetch('/api/v1/items/cleanliness')
  .then(response => response.json())
  .then(items => {
    appendItems(items);
    appendCount(items);
  })
  .catch(error => console.error(error))
};

const postItem = (name, reason, cleanliness) => {
  fetch('/api/v1/items', {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: JSON.stringify({ name, reason, cleanliness })
  })
  .then(() => {
    fetchItems();
  })
  .catch(error => console.error(error))
};

const closeGarage = () => {
  $('.sorting').hide();
  $('#error').text('')
  $addNew.hide();
  $garageCount.hide();
  $garageButton.removeClass('open');
  $garageButton.addClass('closed').text('Open Garage');
  $garageItems.empty();
}

const openGarage = () => {
  $('.sorting').show();
  $addNew.show();
  $garageCount.show();
  $garageButton.removeClass('closed');
  $garageButton.addClass('open').text('Close Garage');
  fetchItems();
}

const appendItems = (items) => {
  $garageItems.html('');

  let itemFragments = document.createDocumentFragment();

  items.forEach(item => {
    let itemElement = document.createElement('li');

    let name = document.createElement('p');
    name.innerText = item.name;
    name.dataset.itemId = item.id;

    itemElement.appendChild(name);
    itemFragments.appendChild(itemElement);
  });

  $garageItems.append(itemFragments);
};

const appendCount = (items) => {
  let count = 0;
  let sparkling = 0;
  let dusty = 0;
  let rancid = 0;

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

  $totalItems.text(`Total Items: ${count}`)
  $totalSparkling.text(`Sparkling: ${sparkling}`)
  $totalDusty.text(`Dusty: ${dusty}`)
  $totalRancid.text(`Rancid: ${rancid}`)
};

const clearForm = () => {
  const $name = $('.name-input').val('')
  const $reason = $('.reason-input').val('')
};

$(document).ready( () => {
  closeGarage();
});

$garageButton.on('click', event => {
  if ($garageButton.hasClass('closed')) {
    openGarage();
  } else if ($garageButton.hasClass('open')) {
    closeGarage();
  }
});

$('.save-item').on('click', event => {
  const $name = $('.name-input').val()
  const $reason = $('.reason-input').val()
  const $cleanliness = $('#cleanliness option:selected' ).text()

  if ($name.length <= 0) {
    console.log('no lanem');
    $('#error').text('Error: No Name')
  } else if ( $reason.length <= 0) {
    $('#error').text('Error: No Reason')
  } else {
    $('#error').text('')
    postItem($name, $reason, $cleanliness)
    clearForm();
  }
});

$('.order-button').on('click', event => {
  // janky - need to fix. ABC all new but not seeded data
  fetchItemsABC();
})

$('.date-button').on('click', event => {
  // janky - need to fix. ABC all new but not seeded data
  fetchItemsDate();
})

$('.cleanliness-button').on('click', event => {
  // janky - need to fix. ABC all new but not seeded data
  fetchItemsCleanliness();
})
