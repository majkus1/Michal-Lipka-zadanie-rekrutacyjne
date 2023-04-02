import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

function Graph({ products }) {
	const generateChartData = products => {
		const labels = products.map(product => product.title)
		const discountedPrices = products.map(product => product.discountedPrice)
		const prices = products.map(product => product.total)

		return {
			labels,
			datasets: [
				{
					label: 'Cena po rabacie',
					data: discountedPrices,
					backgroundColor: 'rgba(75, 192, 192, 0.6)',
					borderColor: 'rgba(255, 99, 132, 1)',
					fill: false,
					tension: 0.0,
				},
				{
					label: 'Cena',
					data: prices,
					backgroundColor: 'rgba(255, 99, 132, 0.6)',
					borderColor: 'rgba(75, 192, 192, 1)',
					fill: false,
					tension: 0.0,
				},
			],
		}
	}

	const customLegend = {
		id: 'customLegend',
		afterDraw: (chart, args, options) => {
			const { _metasets, ctx } = chart
			ctx.save()
			_metasets.forEach(meta => {
				console.log(meta.data[meta.data.length - 1].y)

				ctx.font = 'bolder 12px Arial'
				ctx.textBaseline = 'middle'
				ctx.fillStyle = meta._dataset.borderColor
				ctx.fillText(meta._dataset.label, meta.data[meta.data.length - 1].x + 6, meta.data[meta.data.length - 1].y)
			})
		},
	}

	const config = {
		options: {
			indexAxis: 'x',
			layout: {
				padding: {
					right: 100,
				},
			},
			plugins: {
				legend: {
					display: false,
				},
			},
			// responsive: true,
			maintainAspectRatio: false,
			scales: {
				y: {
					beginAtZero: true,
				},
			},
		},
		plugins: [customLegend],
	}

	return (
		<div className='chart-container'>
			<Line data={generateChartData(products)} options={config.options} plugins={config.plugins} />
		</div>
	)
}

export default Graph
