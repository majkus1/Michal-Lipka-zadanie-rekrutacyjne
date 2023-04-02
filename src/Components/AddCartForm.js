import React from 'react'

function AddCartForm({ addCartHandler, handleInputChange, products }) {
	return (
		<form onSubmit={addCartHandler}>
			{products.map((product, index) => (
				<div key={index} className='prodform'>
					<label>
						Nazwa produktu {index + 1}:
						<input
							type='text'
							value={product.title}
							onChange={e => handleInputChange(index, 'title', e.target.value)}
							required
						/>
					</label>
					<label>
						Cena:
						<input
							type='number'
							value={product.total}
							onChange={e => handleInputChange(index, 'total', e.target.value)}
							required
						/>
					</label>
					<label>
						Cena po rabacie:
						<input
							type='number'
							value={product.discountedPrice}
							onChange={e => handleInputChange(index, 'discountedPrice', e.target.value)}
							required
						/>
					</label>
				</div>
			))}
			<div className='add'>
				<button className='addbtn' type='submit'>
					Dodaj koszyk z produktami
				</button>
			</div>
		</form>
	)
}

export default AddCartForm
