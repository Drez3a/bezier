function convexHull (points) { 

   /* pontos testados:
   points = [{x: 40, y: 40}, {x: 300, y: 50}, {x: 225, y: 125}, {x: 350, y: 250}, {x:
			100, y: 150}],
   */
   
var ind = 0,
		position = [],
		ancor = points[0];
		hull = [];

	for (var i=0; i<points.length; i++){
		position[i] = {
			angle: Math.atan2(points[i].x, points[i].y),
			point: points[i]
		}
		
		if(ancor.y > points[i].y) {
			ind = i;
			ancor = points[i];
		}
	}
		
	position.sort(function(prev, next) {
	  return prev.angle - next.angle; 
	});
	
	hull.push(ancor);
	hull.push(position[0].point);
//	position.push(ancor); // pra fechar o ciclo -DUVIDA: next(ABAIXO) DÁ INDEFINIDO QUANDO FAÇO ISSO ????????????????????
		
	position.splice(ind, 1); // retira ancor
	
	var prev = hull[0],
		topo = hull[1],
		next,
		giroEsq = false,
		x1, x2, x3, y1, y2, y3,
		j = 2;
	
	// ainda vou ver a quantidade de loops
	// ainda vou ver a logica ...
	// DUVIDA: O PRODUTO VETORIAL ESTÁ DANDO NEGATIVO PARA PONTOS QUE EU SEI Q SERIA POSITIVO??????????????????
	for (var i=1; i<position.length; i++) {		
		next = position[i].point;
				
		x1 = prev.x;
		x2 = topo.x;
		x3 = next.x;
		y1 = prev.y;
		y2 = topo.y;
		y3 = next.y;
		
		prodVetorial(x1, x2, x3, y1, y2, y3);
		
		if(giroEsq) {
			//o indice de hull é sempre um a mais que position:
			// hull[i+1] = position[i].point;
			hull.push(next);	//ainda vou ver quando tiro ou boto em hull	
			prev = hull[j-1];
			topo = hull[j];
			j++;
		} else {
			topo = next;
		}
					
		console.log(giroEsq);
	}
		
	// calcula o produto vetorial para determinar se o o giro foi a esquerda ou direita
function prodVetorial( x1, x2, x3, y1, y2, y3) {
	var prod;
    prod = (x2-x1)*(y3-y1)-(y2-y1)*(x3-x1);
	console.log(prod);
    if (prod > 0){
		giroEsq = true;
	}	
 }
