const baseUrl = "http://localhost:3001";

// Reusable function to check the response
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Reusable function for making requests
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

// API methods
function getItems() {
  return request(`${baseUrl}/items`);
}

function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
}

function deleteItem(itemId) {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
  });
}

export { getItems, addItem, deleteItem, checkResponse };
