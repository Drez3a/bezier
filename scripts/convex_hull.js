	var ind = 0,
		position = [],
		ancor = points[0];
		hull = [];

	for (var i=0; i<points.length; i++){
		position[i] = {
			// os valores dos angulos estão estranhos
			angle: Math.atan2(points[i].x, points[i].y),
			point: points[i]
		}
		
		if(ancor.y > points[i].y) {
			ind = i;
			ancor = points[i];
		}
	}
		
	/*position.sort(function(prev, next) {
	  return prev.angle - next.angle; 
	});*/
	
	hull.push(ancor); // j = 0
		
	/* era pra retirar ancor e colocar no final	-------------------------------------------------------
	-DUVIDA: ele insere porque o tamanho aumenta, mas o objeto fica indefinido,
	 AFETANDO next(ABAIXO).
	*/
	position.push(ancor); // pra fechar o ciclo 	
	position.splice(ind, 1); 
	
	// j=1
	hull.push(position[0].point); // para inicializar topo e não dar estouro na pilha
	
	var prev = hull[0],
	//	topo,
		topo = hull[1],
		next,
		giroEsq,
		x1, x2, x3, y1, y2, y3,
		j = 1; 
			
	for (var i=1; i<position.length; i++) {
		
		// isso é porque não estou conseguindo inserir "position.push(ancor); // pra fechar o ciclo"
		if (i!=4){
			next = position[i].point; // a conta seria apenas essa
		} else {
			next = points[0];
		}
			
		x1 = prev.x;
		x2 = topo.x;
		x3 = next.x;
		y1 = prev.y;
		y2 = topo.y;
		y3 = next.y;
							
		prodVetorial(x1, x2, x3, y1, y2, y3);
		
		if(giroEsq) {
			
			hull.push(next);
			j++;			
			prev = hull[j-1];
			topo = hull[j];
			
		} else {
			hull.pop(); // retira topo da pilha
			j--;
			prev = hull[j-1];
			topo = hull[j];
			i--;
		}
						
		console.log(giroEsq);
			
	}

//	console.log(hull);
	
	// calcula o produto vetorial para determinar se o o giro foi a esquerda ou direita
function prodVetorial( x1, x2, x3, y1, y2, y3) {
	giroEsq = false;
	var prod;
	prod = (x2-x1)*(y3-y1)-(y2-y1)*(x3-x1);

    if (prod > 0){
		giroEsq = true;
	}	
 }
	
