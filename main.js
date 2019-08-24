
const takeInfo=(artistInfo)=>{
  
    const artistName = artistInfo[0]["result"]["primary_artist"]["name"];

    console.log(artistInfo);
  
    const fullTitle = artistInfo.map(title => title["result"]["full_title"])
    
    const artistImageUrl = artistInfo[0]["result"]["primary_artist"]["image_url"];

    const textSongUrl = artistInfo.map(textUrl => textUrl["result"]["url"]);

    return {
        "name": artistName,
        "fullTitle": fullTitle,
        "artistImageUrl": artistImageUrl,
        "textSongUrl": textSongUrl,
    }
}


const addArtistName=(date)=>{
     const h2Artist = document.createElement("h2")
     const artistNode = document.createTextNode(date);
     h2Artist.appendChild(artistNode);
     return h2Artist
}

const addArtistImage=(date)=>{
    const imageArtist = document.createElement("img");
    imageArtist.id = "artist_photo";
    imageArtist.src = date["artistImageUrl"];
    
    return imageArtist

};


const addSongs=(date)=>{
   console.log(date["fullTitle"]);
    const section=document.getElementsByClassName("result-box")
    const allPindex=[];
    for (index in date["fullTitle"]){
        const pIndex=document.createElement('p');
        pIndex.className="index";
        const nodeP = document.createTextNode(parseInt(index) + 1);
        pIndex.appendChild(nodeP);
        allPindex.push(pIndex);
        // console.log(pIndex);
    }
    const allPtitle = date["fullTitle"].map(title=>{
        const pIndex = document.createElement('p');
        pIndex.className = "title";
        const nodeP = document.createTextNode(title);
        pIndex.appendChild(nodeP);
        return pIndex;
        
    });

    const allPlyrics = date["textSongUrl"].map(lyrics => {
        const aUrl = document.createElement('a');
        aUrl.className = "lyrics";
        aUrl.href = lyrics;
        const nodeA = document.createTextNode("Lyrics");
        aUrl.appendChild(nodeA);
        
        return aUrl
    });


    section[0].appendChild(addArtistName(date["name"]));
    section[0].appendChild(addArtistImage(date));

    for (let i in allPindex){
        const divSong = document.createElement("div");
        divSong.className = "song-box"; 
        divSong.appendChild(allPindex[i]);
        divSong.appendChild(allPtitle[i]);
        divSong.appendChild(allPlyrics[i]);
         section[0].appendChild(divSong)   
    }
    section[0].appendChild(addArtistName(date["name"]));
    section[0].appendChild(addArtistImage(date));

};

const searchArtist=()=>{
    const searchbtn = document.querySelector(".btn-srch");
     const input = document.querySelector(".artist_srch");
    const search = (event) => {
        event.preventDefault()
        const inputValue = input.value;
        artistRequest(inputValue);
        
    };

    searchbtn.addEventListener('click', search);
  
}




const artistRequest=(aritstName="Sarius")=>{
    const link = "https://genius.p.rapidapi.com/search?q=";
    const url = link + aritstName;
    fetch(url, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "genius.p.rapidapi.com",
                "x-rapidapi-key": "805ba8d40emsh1fa9031abdd8f01p126a10jsn3c81c5dab3d8"
            }
        })
        .then(response => response.json()
        ).then(response => response["response"]["hits"]
        ).then(response => {
            const artist=takeInfo(response)
            addSongs(artist);
        }).catch(err => {
        ).then(response => console.log(takeInfo(response))
        ).catch(err => {
            console.log(err);
        });
};

const main=()=>{
    searchArtist()
}
    console.log(0)
    const dateArtis=artistRequest();
}

main()