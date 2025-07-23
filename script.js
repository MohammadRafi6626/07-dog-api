// Get the select element from the page
const breedSelect = document.getElementById('breed-select');

// Get the gallery div where images will be shown
const gallery = document.getElementById('gallery');

// Function to fetch the list of dog breeds from the Dog API
async function loadBreeds() {
  // Fetch the breeds from the API
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  // Convert the response to JSON
  const data = await response.json();
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
}

// Load the breeds when the page loads
loadBreeds();

// Listen for changes on the select menu
breedSelect.addEventListener('change', async function() {
  // Get the selected breed
  const selectedBreed = breedSelect.value;
  // If no breed is selected, clear the gallery and return
  if (!selectedBreed) {
    gallery.innerHTML = '';
    return;
  }
  // Build the API URL for 9 random images of the selected breed
  const imagesUrl = `https://dog.ceo/api/breed/${selectedBreed}/images/random/9`;
  // Fetch 9 random images
  const response = await fetch(imagesUrl);
  // Convert the response to JSON
  const data = await response.json();
  // Get the array of image URLs from the response
  const dogImages = data.message;
  // Clear the gallery
  gallery.innerHTML = '';
  // Loop through each image URL
  dogImages.forEach(function(imageUrl) {
    // Create a div for each gallery item
    const item = document.createElement('div');
    item.className = 'gallery-item';
    // Create an img element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = `A cute ${selectedBreed}`;
    // Add the img to the gallery item
    item.appendChild(img);
    // Add the gallery item to the gallery div
    gallery.appendChild(item);
  });
});
