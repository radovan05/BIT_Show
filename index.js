const wrapper= document.querySelector('.wrapper');


const ALL_SHOWS_TV_MAZE_API = 'https://api.tvmaze.com/shows'

function getShows(){
    fetch(ALL_SHOWS_TV_MAZE_API).then(res => res.json()).then(data => makeCards(data)).catch(er => console.log(er))
}
function makeCards(data){
    for(let i=0; i < data.length; i++){
        for(let j =i ; j < data.length; j++){ 
            if(data[i].rating.average < data[j].rating.average){
                let pom = data[i];
                data[i]=data[j]
                data[j]=pom;
              
            }
        }
    }
    for(let  i= 0; i <50 ;i++){
        defineCard(data[i])
    }

    // data.forEach(el => {
    //     defineCard(el);
    // });
}
function defineCard(show){
   
    const div= document.createElement('div');
    const img= document.createElement('img');
    const p= document.createElement('p');

    img.src = show.image.medium; 
    p.textContent = show.name; 
    div.append(img,p);
   
    wrapper.append(div);
    div.addEventListener('click',()=>{
        // window.localStorage.removeItem('showInfo')
        window.localStorage.setItem('showInfo',JSON.stringify(show));
        if(window.location.pathname === '/'  || window.location.pathname === '/index.html'){
            window.location.pathname = "./infoPage/info.html";
        }
        else{ 
            window.location.pathname = '/BIT_Show/infoPage/info.html'
        }
        
    })
    
    

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
        if(window.location.pathname === '/'  || window.location.pathname === '/index.html'){
            window.location.pathname = "./infoPage/info.html";
        }
        else{ 
            window.location.pathname = '/BIT_Show/infoPage/info.html'
        }
    })
    
}

function debounce(timeout = 300){
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { getOptions(search.value); }, timeout);
    };
  }
const search = document.querySelector('.search');

search.addEventListener('focus',()=>{
    document.addEventListener('keyup',

        debounce(400)
       
    )
})

search.addEventListener('focusout',()=>{
    setTimeout(()=>{
       const box= document.querySelector('.result');
    box.innerHTML='';
    search.value='';  
    },500)
   
})



window.addEventListener('load',()=>{
    getShows();
})
