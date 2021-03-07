const puppeteer = require('puppeteer');
const fs = require('fs');

//[x]- Criar backend para se conectar ao instagram.
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://instagram.com/wonderful_places');

    // O evaluate espera uma função como argumento. E Toda essa função será executada no Browser :)...
    const imgList = await page.evaluate(() => {
        //[x]-Pegar todas as imagens que estão no post alvo-(DOM).
        const nodeList = document.querySelectorAll('article img');
        //[x]-Transforma o Node-LIst em array.
        const imgArray = [...nodeList];
        //[x]-Transformar os node's(elementos Html's) em objetos JS.
        const imgList = imgArray.map(img => {
            return {
                src: img.src
            }
        })
        //[x]-Extrair a função para o backend(localhost), pois ela estará rodando no browser alvo.
        return imgList;
    });

    //[x]-Guardar os dados em um arquivo(Json) local.
    fs.writeFile('instagram.json', JSON.stringify(imgList, null, 2), err => {
        if (err) throw new ERROR('Something went wrong!');
        console.log('Well done!');
    });

    await browser.close();
})();