var giroEsq = false;

function convexHull (points) { 
/* encontrar quais são os índices do ponto superior esquerdo:
   não precisa, porque se houverem dois(ou mais) pontos de menor grau com o eixo x (ou seja, eles formam
   o mesmo angulo), então, eles pertencem a mesma reta e, consequentemente, ao poligono convexo.*/
//var start = 0,
//    end = points.length,
//   pointsHull = points;

//	quickSort(pointsHull, start, end);

}

// https://pt.wikipedia.org/wiki/Exame_de_Graham
// calcula o produto vetorial para determinar se o o giro foi a esquerda ou direita
function prodVetorial( x1, x2, x3, y1, y2, y3) {
    var prod;
	prod = (x2-x1)*(y3-y1)-(y2-y1)*(x3-x1);
    if (prod > 0){
		giroEsq = true;
	}	
 }

// *** SORT FUNCTIONS ************************************************************
// Ordena pelo valor do ângulo formado entre o ponto e o eixo X.
function quickSort(pointsHull, start, end) {
	if (start < end) {
		var pivotPosition = order(pointsHull, start, end);
        quickSort(pointsHull, start, pivotPosition - 1);
        quickSort(pointsHull, pivotPosition + 1, end);
	}
}

function order(pointsHull, start, end) {
	var i = start + 1, f = end;
	var pivot = pointsHull[start];	
	var angle_pivot = Math.atan2(pivot.x, pivot.y);
	
	while (i <= f) {
	var angle_i = Math.atan2(pointsHull[i].x, pointsHull[i].y);
	var angle_f = Math.atan2(pointsHull[f].x, pointsHull[f].y);

		if (angle_i <= angle_pivot ) {
			i++;
		}
		else if (angle_pivot < angle_f){
			f--;
		}
		else {
			var temp = pointsHull[i];
			pointsHull[i] = pointsHull[f];
			pointsHull[f] = temp;
			i++;
			f--;
		}
	}

	pointsHull[start] = pointsHull[f];
	pointsHull[f] = pivot;
	return f;
}

/*** TESTE NO MAIN ***************************************************

//verifica os angulos
	for (var i=0; i < 5; i++){	
		console.log(Math.atan2(points[i].x, points[i].y)); 
	}
	
	console.log("passei");
	
	var myArray = points.slice(0), // para não mexer na memoria
		start = 0,
		end = myArray.length-1;

	quickSort(myArray, start, end);
	
	for (var i=0; i < 5; i++){	
		console.log(Math.atan2(myArray[i].x, myArray[i].y)) // >>> OK, ORDENOU!!!; 
		// RESOLVIDO: MAS, por que ele tá ordenando a array points também???:
		// console.log(Math.atan2(points[i].x, points[i].y)); 
		}
*/