const $garageButton = $('#garage-button')
const $garageItems = $('#garage-items')
const $garageCount = $('#garage-count')
const $totalItems = $('.total-items')
const $totalSparkling = $('.total-sparkling')
const $totalDusty = $('.total-dusty')
const $totalRancid = $('.total-rancid')

const fetchItems = () => {
  fetch('/api/v1/items')
  .then(response => response.json())
  .then(items => {
    appendItems(items);
    appendCount(items);
  })
  .catch(error => console.log(error))
};

const closeGarage = () => {
  $garageButton.removeClass('open');
  $garageButton.addClass('closed').text('Open Garage');
  $garageItems.empty();
}

const openGarage = () => {
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

    let reason = document.createElement('p');
    reason.innerText = item.reason;

    let cleanliness = document.createElement('p');
    cleanliness.innerText = item.cleanliness;

    itemElement.appendChild(name);
    itemElement.appendChild(reason);
    itemElement.appendChild(cleanliness);
    itemFragments.appendChild(itemElement);
  });

  $garageItems.append(itemFragments);
};

const appendCount = (items) => {
  // $garageCount.empty();

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
}

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
