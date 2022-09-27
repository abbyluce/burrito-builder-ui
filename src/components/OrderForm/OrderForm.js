import React, { Component } from 'react';
import { postNewOrder } from '../../apiCalls';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      err: ''
    };
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
  })
  }

  handleIngredientChange = e => {
    e.preventDefault()
    this.state.ingredients.push(e.target.value)
    this.setState({ingredients: this.state.ingredients})
  }  

  handleSubmit = e => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      ...this.state
  }
  if (newOrder.ingredients.length >= 1 && newOrder.name !== '') {
    postNewOrder(newOrder)
    .then(setTimeout(1000))
    .then(this.props.addOrder())
    .then(this.clearInputs())
    .catch(err => console.error('Error fetching:', err));
  } else if (newOrder.name==='') {
    alert("Please include a name for the order!")
  } else if (newOrder.ingredients < 1)
    alert("Please choose at least one ingredient!")
  }


  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} value={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
