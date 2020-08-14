const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Abaixo garipagem de qualquer instagram apenas mude a ultima parte da URL
  await page.goto("https://www.instagram.com/southamericamemes");

  const imgList = await page.evaluate(() => {
    // toda essa função sera executada no browser por baixo dos panos
    // vamos pegar todas as imagens que estão na parte de postagem
    const nodeList = document.querySelectorAll("article img");
    // transformar o NodeList em array
    const imgArray = [...nodeList];
    // transformar os nodes (Elementos html) em object em js
    const listImg = imgArray.map(({ src }) => ({
      src,
    }));

    return listImg;
    // colocar para fora da função
  });

  // Escrever os dados em um arquivo local
  fs.writeFile("instagram.json", JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error("Não foi possivel fazer conversão!");

    console.log("Está concluido sua garipagem!");
  });

  await browser.close();
})();
