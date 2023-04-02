import React from 'react'
import Products from './Products'
import Graph from './Graph'
import AddCartForm from './AddCartForm'

function Carts({
	carts,
	toggleProductsList,
	deleteHandler,
	displayList,
	addCartHandler,
	handleInputChange,
	products,
	showAddCartForm,
	setShowAddCartForm,
}) {
	return (
		<>
			<h1>Lista koszyków</h1>
			<button onClick={() => setShowAddCartForm(!showAddCartForm)}>Dodaj koszyk</button>

			{showAddCartForm && (
				<AddCartForm addCartHandler={addCartHandler} handleInputChange={handleInputChange} products={products} />
			)}

			<div className='cartsall'>
				{carts.map(cart => (
					<div key={cart.id}>
						<p>Koszyk nr {cart.id}</p>
						<button onClick={() => toggleProductsList(cart.id)}>Zobacz produkty</button>

						<button onClick={() => deleteHandler(cart.id)}>Usuń</button>

						<Products cart={cart} displayList={displayList} />
						{displayList[cart.id] && <Graph products={cart.products} />}
					</div>
				))}
			</div>
		</>
	)
}

export default Carts
