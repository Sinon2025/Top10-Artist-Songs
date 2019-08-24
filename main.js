
const takeInfo=(artistInfo)=>{
    console.log(artistInfo);
    
    const fullTitle = artistInfo.map(title => title["result"]["full_title"])
    
    const artistImageUrl = artistInfo[0]["result"]["primary_artist"]["image_url"];

    const textSongUrl = artistInfo.map(textUrl => textUrl["result"]["url"]);

    return {
        "fullTitle": fullTitle,
        "artistImageUrl": artistImageUrl,
        "textSongUrl": textSongUrl,
    }
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
        ).then(response => console.log(takeInfo(response))
        ).catch(err => {
            console.log(err);
        });
};

const main=()=>{
    console.log(0)
    const dateArtis=artistRequest();
}

main()