const apiUrl="https://api.jikan.moe/v4"

const searchText=document.querySelector("#searchText");
const searchResult=document.querySelector("#searchResult");

searchText.addEventListener("keyup",function(){
    if(this.value.length>3){
        getAnimes(this.value)
    }else{
        searchResult.innerHTML='';
        displayImage.style.display="none";
    }
})
async function getAnimes(query){
    const res=await fetch(`${apiUrl}/anime?q=${query}`)
    const animes=await res.json()
    // console.log(animes.data);
    if(animes.data.length>0){
        searchResult.style.display="block";
        searchResult.innerHTML='';
        animes.data.map(anime=>{
            searchResult.innerHTML +=`<li class="singleAnime" data-image="${anime.images.jpg.image_url}">
                <a href="${anime.url}" target="_blank">${anime.title}</a>
            </li>`;
        })

        const singleAnime=Array.from(document.querySelectorAll(".singleAnime"))
        const displayImage=document.querySelector("#displayImage");
        singleAnime.map(singleAnime=>{
            singleAnime.addEventListener("mouseenter",function(){
                displayImage.style.display="block";
                displayImage.innerHTML =`<img src="${this.dataset.image}" />`
            })
            singleAnime.addEventListener("mouseout",function(){
                displayImage.style.display="none";
            })
            // singleAnime.addEventListener("click",function(){
            //     displayImage.style.display="none";
            // })
        })
        
    }
    
    
}

const topTvAnime=document.querySelector("#topTvAnime");
async function getTopAnime(){
    const res=await fetch(`${apiUrl}/top/anime`);
    const topAnimes=await res.json();
    console.log(topTvAnime.data);
    // topAnime.innerHTML =``;
    topAnimes.data.map(topAnime=>{
        topTvAnime.innerHTML +=`<div class="col-lg-3 col-md-6">
        <div class="item">
        <div class="thumb">
            <a href="${topAnime.url}">
                <img src="${topAnime.images.jpg.image_url}" alt="">
            </a>
            <span class="price">${topAnime.score}</span>
        </div>
        <div class="down-content">
            <span class="category">${topAnime.source}</span>
            <h4>${topAnime.title}</h4>
        </div>
        </div>
    </div>`;
    })

}
getTopAnime()

const upcomimgSeries=document.querySelector("#upcomimgSeries");
async function getUpcomingSeries(){
    const res=await fetch(`${apiUrl}/seasons/upcoming`);
    const upcomimgSerieses=await res.json();
    // console.log(topTvAnime.data);
    // topAnime.innerHTML =``;
    upcomimgSerieses.data.map(item=>{
        upcomimgSeries.innerHTML +=`<div class="col-lg-2 col-md-6 col-sm-6">
        <div class="item">
        <div class="thumb">
            <a href="${item.url}">
                <img src="${item.images.jpg.image_url}" alt="">
            </a>
        </div>
        <div class="down-content">
            <span class="category">${item.source}</span>
            <h4>${item.title.substring(0,20)}</h4>
        </div>
        </div>
    </div>`;
    })

}
getUpcomingSeries()

const randomcharactar=document.querySelector("#randomcharactar");
async function getRandoCharactar(){
    const res=await fetch(`${apiUrl}/random/characters`);
    const RCD=await res.json();
    randomcharactar.innerHTML =`
    <img src="${RCD.data.images.jpg.image_url}" alt="">
    <span class="price">${RCD.data.favorites}</span>
    <span class="offer">${RCD.data.name}</span>`;
}
getRandoCharactar()