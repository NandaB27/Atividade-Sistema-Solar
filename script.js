


/*1. Consuma a API: Utilize o endpoint /bodies para obter uma lista de
corpos celestes. Armazene esses dados em um array para futuras
operações.*/
/*2. Filtre os Planetas: Use o método filter para criar um novo array contendo apenas planetas.*/
const planetas = []
const sistemasolar = []

getBodies()
async function getBodies() {
    const result = await axios.get('https://api.le-systeme-solaire.net/rest/bodies')
    sistemasolar.push(...result.data.bodies)
    exercicio2()
    exercicio3()
    exercicio4()
    exercicio5()
    exercicio6()
    exercicio7()
    exercicio8()
    exercicio9()
    exercicio10()
    exercicio12()
    exercicio13()
    exercicio14()
    exercicio15()
    exercicio16()
    exercicio17()
    exercicio18()
    exercicio19()
}
console.log(planetas)

function exercicio2 () {
    const filtro = sistemasolar.filter(planeta => planeta.isPlanet === true)
    planetas.push(...filtro)
}

function exercicio3 () {
    const terra = planetas.find(planeta => planeta.englishName === "Earth")
    console.log(terra)
}
/*4. Verifique Condições com some: Use o método some para verificar se algum planeta no array filtrado não tem luas.*/

function exercicio4 () {
    const luas = planetas.some(planeta => planeta.moons === null)
    console.log(luas)
}

/*5. Transforme os Dados com map: Use o método map para criar um novo array contendo apenas os nomes dos planetas.*/

function exercicio5 () {
    const nomes = planetas.map(planeta => planeta.name)
    console.log(nomes)
}

/*Classificação por Tamanho: Use os métodos map e sort para criar um novo array que contenha os nomes dos planetas, ordenados pelo seu tamanho (raio).*/

function exercicio6 () {
    const raio = planetas.sort((a, b) => a.equaRadius - b.equaRadius)
    const tamanho = raio.map(planeta => planeta.name)
    console.log(tamanho)
}

/*7. Informações Concatenadas: Use o método join para criar uma string que contenha os nomes de todos os planetas do array, separados por vírgulas.*/

function exercicio7 () {
    const planeta = planetas.map(planeta => planeta.name)
    const stringConcatenada = planeta.join(', ')
    console.log(stringConcatenada)
}

/*8. Sistema Solar Compacto: Use os métodos para pegar os 5 menores planetas e calcular a massa total desses planetas.*/
function exercicio8() {
    const raio = planetas.sort((a, b)  => a.equaRadius - b.equaRadius)
    const Soma = raio.slice(0, 5).reduce((acc, curr) => {
        return acc + curr.mass.massValue
    }, 0);
      console.log(Soma.toFixed(4));
}

/*9. Luas e Desidade: verifique se algum planeta tem mais de 2 luas e, em caso afirmativo, listar todos os planetas entre eles que tem densidade maior que 1*/

function exercicio9 () {
    const planeta = planetas.filter(planeta => Array.isArray(planeta.moons) && planeta.moons.length > 2 && planeta.density > 1)
     console.log(planeta)
 }

/*10. Ordem de descobrimento: Encontre e imprima na tela todos nomes dos astros e suas respectivas datas de descoberta (os que tiverem), ordenando-os do mais recente ao mais antigo.*/

function exercicio10 () {
    const data = sistemasolar.filter(planeta => planeta.discoveryDate !== "")
    const planeta = data.sort((a, b) => a.discoveryDate - b.discoveryDate)
    console.log(planeta)
}
/*11. Encontrando Astro: Faça uma função que recebe um nome, e retorna a distancia, a massa, gravidade e densidade*/

function exercicio11 () {
    const nomeEmIngles = prompt('Digite o nome do astro em inglês')
    const encontrarAstro = sistemasolar.find(sistemasolar => sistemasolar.englishName === nomeEmIngles)
     const distancia = (encontrarAstro.perihelion + encontrarAstro.aphelion)/2
     console.log(`Nome: ${encontrarAstro.englishName} Distância: ${distancia} Massa: ${encontrarAstro.mass.massValue} Gravidade: ${encontrarAstro.gravity} Densidade: ${encontrarAstro.density}`)
 }
/*12. Filtro de Temperatura: econtre os planetas que tem uma temperatura de 8 a 30 graus celsius. Cuidado que o AvgTemp está na escala Kelvin. Ordene-os do mais frio ao mais quente.*/
function exercicio12() {
    const converter = planetas.map((planeta) => {
        const conversao = planeta.avgTemp - 273.1;
        return { name: planeta.name, temperature: conversao };
    });

    const filtrarTemperatura = converter.filter(planeta => planeta.temperature >= 8 && planeta.temperature <= 30);

    const ordenar = filtrarTemperatura.sort((a, b) => {
        return a.temperature - b.temperature;
    });

    console.log(ordenar);
}

/*13. Separando Planetas. Faça uma função que retorna um objeto, separando todos os astros pelo seu tipo. bodyType */

function exercicio13() {
    const planetasSeparados = sistemasolar.reduce((agrupado, planeta) => {
        const tipo = planeta.bodyType

        if (!agrupado[tipo]) {
            agrupado[tipo] = []
        }

        agrupado[tipo].push(planeta)

        return agrupado
    }, {})

    console.log(planetasSeparados)
}
/*14. Ordenação Complexa: Use sort e slice para ordenar os astros primeiro por tipo e depois por tamanho, pegando os 3 maiores de cada tipo.*/
function exercicio14() {
    const planetasSeparados = sistemasolar.reduce((agrupado, planeta) => {
        const tipo = planeta.bodyType

        if (!agrupado[tipo]) {
            agrupado[tipo] = []
        }

        agrupado[tipo].push(planeta)

        return agrupado
    }, {})

    console.log(planetasSeparados);


    for (const tipo in planetasSeparados) {
        planetasSeparados[tipo].sort((a, b) => b.size - a.size);
        planetasSeparados[tipo] = planetasSeparados[tipo].slice(0, 3);
    }

    console.log(planetasSeparados);
}


/*15. Encontrando planetas orbitados. Encontre todos os planetas que são orbitados por pelo menos um corpo celeste. Imprima na tela o nome do planeta e seus orbitadores.*/

function exercicio15() {
    const planetasComLuas = planetas.filter(planeta => Array.isArray(planeta.moons) && planeta.moons.length > 0);

    planetasComLuas.forEach(planeta => {
        const luas = planeta.moons.map(moon => moon.moon);
        console.log(`Planeta: ${planeta.englishName}, Luas: ${luas.join(', ')}`);
    });
}
/*16. Média da Massa dos Planetas: Use o método reduce para calcular a média da massa de todos os planetas e imprimir o resultado.*/
function exercicio16() {
    const totalMass = planetas.reduce((acumulador, planeta) => acumulador + planeta.mass.massValue, 0)
    
    const mediaMass = totalMass / planetas.length

    console.log(`Média da massa dos planetas: ${mediaMass.toFixed(2)} unidades de massa.`)
}

/*17. Calcule a distância entre Saturno e Plutão. Utilize o perihelion e o aphelion para calcular a menor distância possível entre os planetas*/
function exercicio17() {
    const saturno = sistemasolar.find(planeta => planeta.englishName === 'Saturn');
    const plutao = sistemasolar.find(planeta => planeta.englishName === 'Pluto');

        const distanciaMinima = plutao.perihelion - saturno.aphelion;
        console.log(`A menor distância possível entre Saturno e Plutão é aproximadamente ${distanciaMinima} unidades astronômicas.`);
}

/*18. Planetas com Luas: liste todos os planetas que têm uma ou mais luas. Imprima na tela o planeta, e quantas luas ele tem.*/
function exercicio18() {
    const planetasComLuas = planetas.filter(planeta => Array.isArray(planeta.moons) && planeta.moons.length > 0);

    planetasComLuas.forEach(planeta => {
        const luas = planeta.moons.map(moon => moon.moon);
        console.log(`Planeta: ${planeta.englishName}, Luas: ${luas.length}`);
    });
}
/*19. O Desafio Final em Manipulação de Dados e Cálculos 
Análise Estatística do Sistema Solar: Utilize os métodos para realizar uma análise estatística completa dos planetas do sistema solar. 
- Crie um novo array que contém apenas planetas (excluindo luas, asteroides, etc.). 
- Crie um novo array que contém apenas as massas dos planetas. - Ordene o array de massas em ordem crescente. 
- Calcule a mediana das massas dos planetas. A mediana é o valor do meio em um conjunto de dados ordenado. Se o conjunto tem um número ímpar de observações, a mediana é o valor do meio. Se o conjunto tem um número par de observações, a mediana é a média dos dois valores do meio. 
- Encontrar Planeta Mais Próximo da Mediana: encontre o planeta cuja massa é mais próxima da mediana calculada.*/

function exercicio19() {
    console.log(planetas)
    const massas = planetas.map(planeta => planeta.mass.massValue)
    const massas1 = massas.sort((a,b) => a - b)
    console.log(massas1)

    let mediana;
    if (massas.length % 2 == 0) {
        const x = massas.length / 2;
        const y = x - 1;
        mediana = (massas[x] + massas[y]) / 2;

    } else {
        mediana = massas[Math.floor(massas.length / 2)];
    }

    console.log(mediana)

    let valormaisproximo = Number.MAX_SAFE_INTEGER;
    let index;
    massas.forEach((massa, i) => {
        const valor = Math.abs(massa - mediana);
        if (valor < valormaisproximo) {
            valormaisproximo = valor
            index = i;
        }
    });

    const valormaisproximoMassa = planetas.find(planet => planet.mass.massValue === massas[index]); 
    console.log(19, valormaisproximoMassa)
}