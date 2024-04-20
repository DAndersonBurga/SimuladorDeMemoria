const dividirEnBloques = (array: Array<Memoria>) => {
    let bloques: Memoria[][] = [];
    let bloque: Memoria[] =[]

    for (let index = 0; index <= array.length; index++) {
      bloque.push(array[index]);

      if(index != 0 && (index+1) % 25 === 0) {
        
        bloques.push(bloque);
        bloque = [];
      }
    }


    return bloques;
}


export {
    dividirEnBloques
}