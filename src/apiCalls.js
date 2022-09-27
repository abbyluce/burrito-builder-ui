export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postNewOrder = (newOrder) => {
  return fetch("http://localhost:3001/api/v1/orders", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: newOrder.name, ingredients: newOrder.ingredients})
  })
  .then(response => {
    if (!response.ok) {
      throw Error("Error posting data")
    } else {
    return response.json()
    }
  })
}
