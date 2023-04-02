import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../CSS/App.css'
import Carts from './Carts'

function Home() {
	const [carts, setCarts] = useState([])
	const [displayList, setDisplayList] = useState({})
	const [showAddCartForm, setShowAddCartForm] = useState(false)
	const [products, setProducts] = useState(Array(5).fill({ title: '', total: '', discountedPrice: '' }))

	const fetchData = async () => {
		axios
			.get('https://dummyjson.com/carts')
			.then(res => {
				console.log(res)
				setCarts(res.data.carts)
			})
			.catch(err => {
				console.log(err)
			})
	}

	const toggleProductsList = cartId => {
		setDisplayList(prevState => ({
			...prevState,
			[cartId]: !prevState[cartId],
		}))
	}

	const handleInputChange = (index, field, value) => {
		const newProducts = [...products]
		newProducts[index] = { ...newProducts[index], [field]: value }
		setProducts(newProducts)
	}

	const addCartHandler = e => {
		e.preventDefault()
		const newCartId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1
		const newCart = {
			id: newCartId,
			products,
		}

		setCarts([...carts, newCart])
		setShowAddCartForm(false)
		setProducts(Array(5).fill({ title: '', total: '', discountedPrice: '' }))
	}

	const deleteHandler = async id => {
		const cartExistsInAPI = id <= 20

		if (cartExistsInAPI) {
			try {
				const response = await fetch(`https://dummyjson.com/carts/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				if (response.ok) {
					setCarts(carts.filter(item => item.id !== id))
					console.log('Dane usunięte pomyślnie')
				} else {
					console.error('Błąd podczas usuwania danych')
				}
			} catch (error) {
				console.error('Wystąpił błąd:', error)
			}
		} else {
			setCarts(carts.filter(item => item.id !== id))
			console.log('Dane usunięte pomyślnie')
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<Carts
			carts={carts}
			toggleProductsList={toggleProductsList}
			deleteHandler={deleteHandler}
			displayList={displayList}
			addCartHandler={addCartHandler}
			handleInputChange={handleInputChange}
			products={products}
			showAddCartForm={showAddCartForm}
			setShowAddCartForm={setShowAddCartForm}
		/>
	)
}

export default Home
