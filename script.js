// Get the select element from the page
const breedSelect = document.getElementById('breed-select');

// Get the gallery div where images will be shown
const gallery = document.getElementById('gallery');

// Fetch the list of dog breeds from the Dog API
fetch('https://dog.ceo/api/breeds/list/all')
  .then(function(response) {
    // Convert the response to JSON
    return response.json();
  })
  .then(function(data) {
    // The breeds are in data.message as an object
    const breeds = Object.keys(data.message);
    // Loop through each breed and add it as an option
    breeds.forEach(function(breed) {
      // Create a new option element
      const option = document.createElement('option');
      // Set the value and text of the option
      option.value = breed;
      option.textContent = breed;
      // Add the option to the select menu
      breedSelect.appendChild(option);
    });
  });

// Listen for changes on the select menu
breedSelect.addEventListener('change', function() {
  // Get the selected breed
  const selectedBreed = breedSelect.value;
  // If no breed is selected, clear the gallery and return
  if (!selectedBreed) {
    gallery.innerHTML = '';
    return;
  }
  // Build the API URL for a random image of the selected breed
  const imageUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random`;
  // Fetch the random image
  fetch(imageUrl)
    .then(function(response) {
      // Convert the response to JSON
      return response.json();
    })
    .then(function(data) {
      // Get the image URL from the response
      const dogImage = data.message;
      // Clear the gallery
      gallery.innerHTML = '';
      // Create an img element
      const img = document.createElement('img');
      img.src = dogImage;
      img.alt = `A cute ${selectedBreed}`;
      img.className = 'dog-image';
      // Add the image to the gallery
      gallery.appendChild(img);
    });
});
