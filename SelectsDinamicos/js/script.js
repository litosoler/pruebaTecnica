//objetos que manejan la informacion
var selectsInfo = {
	productosComida:["Frutas","Cereales"],
	productosRopa:["Camisas","Pantalones"],
	marcasCamisas:["Camisa 1","Camisa 2", "Camisa 3"],
	marcasPantalones:["Pantalon 1","Pantalon 2", "Pantalon 3"],
	marcasFrutas:["Fruta 1","Fruta 2", "Fruta 3"],
	marcasCereales:["Cereal 1","Cereal 2", "Cereal 3"]
};

//este contiene los datos en pares ordenados para todas las frutas ejem frutas[0] para fruta 1
var datos = {
	frutas : [
		[['Enero',200],['Febrero', 150],['Marzo', 250],['Abril', 300]],
		[['Enero',250],['Febrero', 100],['Marzo', 225],['Abril', 150]],
		[['Enero',150],['Febrero', 100],['Marzo', 125],['Abril', 200]]
		], 
	cereales: [
		[['Enero',200],['Febrero', 150],['Marzo', 250],['Abril', 300]],
		[['Enero',250],['Febrero', 100],['Marzo', 225],['Abril', 150]],
		[['Enero',150],['Febrero', 100],['Marzo', 125],['Abril', 200]]
		],
	camisas: [
		[['Enero',200],['Febrero', 150],['Marzo', 250],['Abril', 300]],
		[['Enero',250],['Febrero', 100],['Marzo', 225],['Abril', 150]],
		[['Enero',150],['Febrero', 100],['Marzo', 125],['Abril', 200]]
		],
	pantalones: [
		[['Enero',200],['Febrero', 150],['Marzo', 250],['Abril', 300]],
		[['Enero',250],['Febrero', 100],['Marzo', 225],['Abril', 150]],
		[['Enero',150],['Febrero', 100],['Marzo', 125],['Abril', 200]]
		] 
};

var datosGrafico =  {
	chart: {
		type: 'column'
	},
	title: {
		text: 'Sales By Month:'
	},
	xAxis: {
		categories: [],
		crosshair: true
	},
	yAxis: {
		min: 0,
		title: {
			text: 'Ventas'
		}
	},
	tooltip: {
		headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		'<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
		footerFormat: '</table>',
		shared: true,
		useHTML: true
	},
	plotOptions: {
		column: {
			pointPadding: 0.2,
			borderWidth: 0
		}
	},
	series: [{
		name: 'Ventas',
		data: []
		}]
};


//funciones que modifican el DOM
function rellenarProductos(productos){
	var html ;
	for (var i = 0; i < productos.length; i++) {
		html += "<option value='" + productos[i] +"'>"+productos[i]+"</option>\n"
	}
	var identificador = $('#productos');
	modificarDom(identificador,html);

}
function rellenarMarcas(marcas){
	var html ;
	for (var i = 0; i < marcas.length; i++) {
		html += "<option value='" + i +"'>"+marcas[i]+"</option>\n"
	}
	var identificador = $('#marcas');
	modificarDom(identificador,html);

}


function modificarDom(identificador, html){
	identificador.html(html);
}


//funciones que Manejan el DOM
//Cuando la pagina este lista
categoriaSeleccionada(); 


function categoriaSeleccionada(){
	var categoriaSeleccionada = $("#categorias").val();
	if (categoriaSeleccionada == "comida"){
		rellenarProductos(selectsInfo.productosComida);
		rellenarMarcas(selectsInfo.marcasFrutas);
		modificarDatosGrafico();

	}else{
		rellenarProductos(selectsInfo.productosRopa);
		rellenarMarcas(selectsInfo.marcasCamisas);
		modificarDatosGrafico();
	}
}

function productoSeleccionado(){
	var comidas = selectsInfo.productosComida;
	var ropas = selectsInfo.productosRopa;
	var productoSeleccionado = $("#productos").val();
	for (var i = 0; i < comidas.length; i++) {
		if (productoSeleccionado == comidas[i] || productoSeleccionado == ropas[i]){
			rellenarMarcas(selectsInfo["marcas"+productoSeleccionado]);
			modificarDatosGrafico();
			break;
		}

	}	
}

function modificarDatosGrafico(){
	var productoActivo = $("#productos").val();
	var marcaSeleccionada = $("#marcas").val();
	productoActivo = productoActivo.toLowerCase();
	

	var datosMarca = datos[productoActivo];
	datosMarca = datosMarca[marcaSeleccionada];

	var categorias = [];
	var valores = [];

	for (var i = 0; i < datosMarca.length; i++) {
		var parOrdenado = datosMarca[i];

		categorias.push(parOrdenado[0]);
		valores.push(parOrdenado[1]); 
	}

	datosGrafico.xAxis.categories = categorias;
	datosGrafico.series[0].data = valores;
	dibujarGrafico();
}


//highcharts charts
// Create the chart
function dibujarGrafico(){
Highcharts.chart('container', datosGrafico);
}