function getData(show){
    if(show?.name){const name =document.querySelector('.name');
    name.textContent = show.name;}
    if(show?.image?.original){
        const img= document.querySelector('img');
    img.src = show.image.original;
}

    if(show?.name){
    const nameGet =document.querySelector('.namee');
    nameGet.textContent = `Name: ${show.name}.`;}
    if(show?.rating?.average){
    const rating =document.querySelector('.rating');
    rating.textContent = `Rating: ${show.rating.average}☆.`;
    }
    if(show?.network?.name && show?.network?.country?.name){
        const madeBy =document.querySelector('.madeBy');
    madeBy.textContent = `Made by: ${show.network.name}, ${show.network.country.name}.`;
    }
    
    if(show?.language)
    {const language =document.querySelector('.language');
    language.textContent = `Language: ${show.language}.`;}

    if(show?.genres){const genres =document.querySelector('.genres');
    let str=show.genres[0];
    for(let i =1 ; i < show.genres.length;i++){
        str+=`, ${show.genres[i]}`
    }
    genres.textContent = `Genres: ${str}.`;}

    if(show?.averageRuntime)
    {const avgEpTime =document.querySelector('.avg-ep-runtime');
    avgEpTime.textContent = `Average time of an episode: ${show.averageRuntime}.`;}
    if(show?.summary)
    {const summary =document.querySelector('.summary');
    summary.innerHTML = `${show.summary}`;}
}
let id; 
//character list
const box =document.querySelector('.list-char');
function makeCharacter(data){
    data.forEach(el => {
         const div = document.createElement('div');
         const img = document.createElement('img');
         const name= document.createElement('p');
         const date= document.createElement('p');
         const living= document.createElement('p');
         const div2 = document.createElement('div');
         img.src= el.person.image.medium;
         name.textContent= `${el.person.name}/${el.character.name}`
         date.textContent=`Born: ${el.person.birthday}`
         living.textContent= `From: ${el.person.country.name}`
         div2.append(name,date,living);
         div.append(img,div2)
         box.append(div);

    });
}
function getOptions(string){ 
    const SEARCH_API=`https://api.tvmaze.com/search/shows?q=${string}`
    fetch(SEARCH_API).then(res => res.json()).then(data => makeOptions(data)).catch(er => console.log(er))
}


function makeOptions(data){
    const box= document.querySelector('.result');
    box.innerHTML='';
    
    data.forEach(el => {
        
       defineOptions(el)
    });
}
function defineOptions(show){
    const box= document.querySelector('.result');
    const text= document.createElement('div');
    text.textContent = show.show.name;
    box.append(text);
    text.addEventListener('click',()=>{
        // console.log(show)
        // window.localStorage.removeItem('showInfo')
        window.localStorage.setItem('showInfo',JSON.stringify(show.show));
         window.location.pathname = "./infoPage/info.html";
    })
    
}


const search = document.querySelector('.search');

search.addEventListener('focus',()=>{
    document.addEventListener('keyup',()=>{
        getOptions(search.value);
       
    })
})

function getCharacters(){
    const API_CHARACTERS = `https://api.tvmaze.com/shows/${id}/cast`
    fetch(API_CHARACTERS).then(res => res.json()).then(data => makeCharacter(data)).catch(er => console.log(er))

}



const listOfCharacters= document.querySelector('.character-list');
const textInListOfCharacters = document.querySelector('.character-list > p')
listOfCharacters.addEventListener('click',()=>{
    if(box.innerHTML!==''){
        box.innerHTML='';
        textInListOfCharacters.textContent='~Cast list >';
    }else { 
        textInListOfCharacters.textContent='~Cast list v';
       getCharacters(); 
    }
    
})


//aka-s list

const box1 =document.querySelector('.lsit-akas');
function makeAka(data){
    data.forEach(el => {
         const div = document.createElement('div');
      
         const name= document.createElement('p');
      
         const living= document.createElement('p');
      
        
         name.textContent= `Name: ${el.name}`
       
         living.textContent= `From: ${el.country.name}`
        
         div.append(name,living)
         box1.append(div);

    });
}

function getAka(){
    const API_AKA = `https://api.tvmaze.com/shows/${id}/akas`
    fetch(API_AKA).then(res => res.json()).then(data => makeAka(data)).catch(er => console.log(er))

}



const akaOfCharacters= document.querySelector('.akas-list');
const textInAkaOfCharacters = document.querySelector('.akas-list > p')
akaOfCharacters.addEventListener('click',()=>{
    if(box1.innerHTML!==''){
        box1.innerHTML='';
        textInAkaOfCharacters.textContent='~AKA\'s list >';
    }else { 
        textInAkaOfCharacters.textContent='~AKA\'s list v';
        getAka(); 
    }
    
})

//ep list


const box2 =document.querySelector('.list-ep');
function makeEp(data){
    data.forEach(el => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        // const name= document.createElement('p');
        const date= document.createElement('p');
        const living= document.createElement('p');
        const div2 = document.createElement('div');
        img.src= el.image.medium;
        // name.textContent= `Episode name: ${el.name}`
        date.textContent=`S: ${el.season}, E: ${el.number}`
        if(el.rating.average){
            living.textContent= `Rating: ${el.rating.average}`
        }else{
            living.textContent= `Rating: Not Rated!`
        }
        
        div2.append(date,living);
        div.append(img,div2)
        box2.append(div);

    });
}

function getEp(){
    const API_AKA = `https://api.tvmaze.com/shows/${id}/episodes`
    fetch(API_AKA).then(res => res.json()).then(data => makeEp(data)).catch(er => console.log(er))

}



const epOfCharacters= document.querySelector('.ep-list');
const textInEpOfCharacters = document.querySelector('.ep-list > p')
epOfCharacters.addEventListener('click',()=>{
    if(box2.innerHTML!==''){
        box2.innerHTML='';
        textInEpOfCharacters.textContent='~Episodes list >';
    }else { 
        textInEpOfCharacters.textContent='~Episodes list v';
        getEp(); 
    }
    
})

document.querySelector('.title').addEventListener('click',()=>{
    window.location.pathname = "../index.html";
})

window.addEventListener('load',()=>{
    let data = JSON.parse(window.localStorage.getItem('showInfo'));
    id = data.id;
    getData(data);

})