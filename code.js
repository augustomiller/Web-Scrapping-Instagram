const puppeteer = require('puppeteer');
const fs = require('fs');

/**
 * [x]-Backend terá a função de se conectar a um endereço alvo(instagram)
 *     e pegar todas as imagens exibidas na primeira sessão de posts.
*/
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://instagram.com/wonderful_places');


    /**
     * A Função evaluate espera uma função como argumento. E Toda essa função será executada no Browser :)...
     * [x]-Pegar todas as imagens dentro da tag article que estão no post alvo - (DOM).
     * [x]-Transforma o Node-LIst em array.
     * [x]-Transformar os node's(elementos Html's) em objetos JS.
     * [x]-Extrair a função para o backend(localhost), pois ela estará rodando no browser alvo (return imgList).
    */
    const returnImgList = await page.evaluate(() => {
        const nodeList = document.querySelectorAll('article img');
        const imgArray = [...nodeList];
        const imgList = imgArray.map(img => {
            return {
                src: img.src
            }
        })
        return imgList;
    });

    /**
     * [x]-Guardar os dados em um arquivo local que será do tipo Json.(utilizando o Módulo File-System do NodeJS)
     * [x]-Verifica se há algum erro para ser disparado.
    */
    fs.writeFile('instagram.json', JSON.stringify(returnImgList, null, 2), err => {
        if (err) throw new ERROR('Something went wrong!');
        console.log('Well done!');
    });

    await browser.close();
})();