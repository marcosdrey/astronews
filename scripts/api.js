const url = "https://api.spaceflightnewsapi.net/v4/articles/"
const inputNav = document.querySelector("#navigation__input")
const form = document.querySelector('#navigation__form')
const section = document.querySelector('.news-block')
const artigos = await getApi()

async function getApi() {
    try {
        const itens = await fetch(url)
        const artigos = await itens.json()
        return artigos
    } catch(error) {
        section.innerHTML = `<p>Something went wrong while trying to get the data. Error: ${error}</p>`
    }

}

async function putOnScreen() {
    try {
        await artigos.results.forEach(artigo => {
            cardArticleShow(artigo)
        })
    } catch(e) {
        section.innerHTML = `<p>Something went wrong. Not possible to load content. Error: ${e}</p>`
    }
    
}

putOnScreen()

function converterData(data) {
    const dataFormatada = data.slice(0, 10)
    return dataFormatada
}

form.addEventListener('submit', async function(e) {
    e.preventDefault()
    section.innerHTML = ""
    try {
        await artigos.results.map(artigo => {
            if(artigo.title.toLowerCase().includes(inputNav.value.toLowerCase())){
                cardArticleShow(artigo)
            }
        })
        await artigos.results.map(artigo => {
            if(artigo.summary.toLowerCase().includes(inputNav.value.toLowerCase())){
                if(!articleAlreadyExists(artigo))
                cardArticleShow(artigo)
            }
        })
    } catch(error) {
        section.innerHTML = `<p>Something went wrong while trying to get the data. Error: ${error}</p>`
    }
    
})

function cardArticleShow(artigo) {
    
        const article = document.createElement('article')
        article.className = "card-article"
        article.innerHTML = `
        <h4 class="card-article-news-site">${artigo.news_site}</h4>
        <div class="divisor-title-and-publish">
            <h3 class="card-article-news-title">${artigo.title}</h3>
            <span class=card-article-news-date>Published: ${converterData(artigo.published_at)}</span>
        </div>
        <div class="divisor-description-and-image">
            <div class="box-news-description">
                <p>${artigo.summary}</p>
            </div>
            <div class="box-news-image">
               <img src="${artigo.image_url}" alt="Imagem de capa da notícia">
            </div>
        </div>
        <span class="divisor-external-news"><a href="${artigo.url}" target="_blank" rel="external" class="external-news-link"> See This New! </a></span>`
        section.appendChild(article)
}

function articleAlreadyExists(artigo) {
    const cards = [...document.querySelectorAll('.card-article')]
    let exists = false
    cards.every(i => {
        const site = i.querySelector('.card-article-news-site').textContent
        const title = i.querySelector('.card-article-news-title').textContent
        if (title != artigo.title && site != artigo.news_site) {
            exists = false
            return true;
        } else {
            exists = true
            return false;
        }
    })
    return exists
}

