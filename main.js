const diCaprioBirthYear = 1974;
const age = function(year) { return year - diCaprioBirthYear}
const today = new Date().getFullYear()
const ageToday = age(today)

const baseyearAxisX = 1998 // check web saved how to plot axis with years and bar chart labeled by year 
const minageAxisY = 18 //  gap age from 18 to 45
const maxageAxisY = 45

const width = 800
const height = 600
const margin = {
    top: 20,
    bottom: 40,
    left: 20,
    right: 20
}
// Bloque 1: declarar el svg (const svg y elementGroup (1 append g, id, elementGroup - luego transform y translate))
const svg = d3.select("#chart").append("svg").attr('id', "svg").attr("width", width).attr("height", height)
const elementGroup = svg.append("g").attr('id', "elementGroup")
  .attr("transform", `translate(${margin.left + 10}, ${margin.top})`)

// definir escala (x = edad chicas (scaleBand), y = edad DC (scaleLinear) (el dominio es la edad > 
// y es la que marca el límite superior de los datos; eje y = 0 hasta edad DC))
var x = d3.scaleBand().range([0, width - margin.left - margin.right])
var y = d3.scaleLinear().range([height - margin.top - margin.left, 0])

// definir ejes
const axisGroup = svg.append('g').attr('id', "axisGroup")
const xAxisGroup = svg.append('g').attr('id', "xAxisGroup")
  .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
const yAxisGroup = svg.append('g').attr('id', "yAxisGroup")
  .attr('transform', `translate(${margin.top})`) // la y solo tendría que ser margin.top hecho

const xAxis = d3.axisBottom().scale(x)
const yAxis = d3.axisLeft().scale(y)

// Bloque 2 : data call
var scaleX = d3.scaleLinear().range([0, width - margin.left - margin.right]) // tutorialteacher create scales in D3.js + saved video
var scaleY = d3.scaleLinear().range([height - margin.top - margin.bottom, 0])
// aquí estás definiendo la escala otra vez, pero no la estás usando estas dos líneas de te sobran. 

d3.csv('data.csv').then(data=>{
  data.map(d=> {
    d.year = +d.year
    d.age = +d.age
  })

  x.domain(data.map(d=>d.year)) // cambiar este dominio por d.year, porque nos interesa tener años en el eje x hecho hecho
  y.domain([minageAxisY, maxageAxisY]) // idealmente con código, pero ok!

  xAxisGroup.call(xAxis)
  yAxisGroup.call(yAxis)

// DATA BINDING: tutorial teacher Data Binding to DOM in d3
var bars = elementGroup.selectAll("rect").data(data)

bars.enter().append("rect")
  .attr("height", d => height - margin.top - margin.bottom - ageToday) // esta altura de barra no está bien calculada
  .attr("y", d => y(d.age)) 
  .attr("x", d => x(d.year)) // esto hay que cambiarlo por d.year si cambiamos el dominio hecho hecho
  .attr("width", x.bandwidth()/2) // no hace falta dividirlo por la mitad :)

// console.log(datos2)
})






