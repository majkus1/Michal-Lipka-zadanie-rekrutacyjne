import React from 'react'

function Products({ cart, displayList }) {
	return (
		<ul
			className='productslist'
			style={{
				display: displayList[cart.id] ? 'block' : 'none',
			}}>
			{cart.products?.map(product => (
				<li key={product.id}>
					{product.title} - cena: {product.total} zł,{' '}
					<strong>cena po rabacie: {product.discountedPrice} zł</strong>
				</li>
			))}
		</ul>
	)
}

export default Products
