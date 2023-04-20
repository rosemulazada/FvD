// check of het document wel juist gelinkt is aan html
console.log("test");
// de eerste ul waaruit je nummers kunt kiezen
var mijnPlaylist = document.querySelector(
  "section:nth-of-type(2) >section:nth-of-type(2) > ul"
);
// de add buttons
var voegNummerButtons = document.querySelectorAll(
  "section:nth-of-type(2) >section:nth-of-type(1) > ul > li > button:last-of-type"
);
// de lege ul, oftewel jouw playlist die je samenstelt
var mijnPlaylist2 = document.querySelector(
  "section:nth-of-type(2) > section:nth-of-type(2) > ul"
);
// enable drag and drop
Sortable.create(mijnPlaylist2);

// loggen om zeker te zijn dat ze juist worden aangeroepen
console.log(mijnPlaylist);
console.log(voegNummerButtons);
console.log(mijnPlaylist2);

// dit is het nummer dat op dit moment speelt. aan het begin staat hij op nul omdat er nog niks speelt
var huidigeAudioSpeler = null;
// houdt bij welke nummers er al in jouw playlist staan. aan het begin is hij leeg want je hebt nog niks samengesteld
var toegevoegdeNummers = [];
// er is not niet op playall geklikt. bij default is het false
var playAll = false;



//voegnummerbuttons = alle addbuttons
voegNummerButtons.forEach((toevoegButton) => {
  toevoegButton.addEventListener("click", () => {
    // als er op de add button wordt geklikt, disable het dan zodat een nummer niet twee keer toegevoegd kan worden
    toevoegButton.disabled = true;
    // original list item
    var oorspronkelijkeItem = toevoegButton.parentElement;
    // original audio player
    var oorspronkelijkeAudioSpeler = oorspronkelijkeItem.querySelector("audio");
    // original src van de audioplayer
    var oorspronkelijkeSrc = oorspronkelijkeAudioSpeler.getAttribute("src");
    // houdt van de filepath alleen 'song-1' over, of 'song-2', enz.
    // dit is omdat ik een naming convention gebruik om te switchen van preview naar full song wanneer het nummer gecloned wordt
    var titelNummer = oorspronkelijkeSrc.substring(
      oorspronkelijkeSrc.lastIndexOf("/") + 1,
      oorspronkelijkeSrc.lastIndexOf("-preview")
    );

    //als er een nummer wordt toegevoegd, save dan de naam van het nummer (bijv. song-1) in array toegevoegdeNummers
    toegevoegdeNummers.push(titelNummer);

    //oorspronkelijke play button van de eerste lijst
    var oorspronkelijkeSpeelButton =
      oorspronkelijkeItem.querySelector("button");

    //zelfde als bovenaan maar dit zijn alle cloned items
    var copyItem = oorspronkelijkeItem.cloneNode(true);
    var copyAudiospeler = copyItem.querySelector("audio");
    var copySpeelButton = copyItem.querySelector("button");

    var oorspronkelijkeSrc = oorspronkelijkeAudioSpeler.getAttribute("src");
    var titelNummer = oorspronkelijkeSrc.substring(
      oorspronkelijkeSrc.lastIndexOf("/") + 1,
      oorspronkelijkeSrc.lastIndexOf("-preview")
    );

    //set de attribute van de geclonede audioplayer naar de filepath + titelNummer (dus bijv song-1) + -src. 
    // hier komt de naming convention in het spel, want alle previews heten [songnaam]-preview.mp3 en alle full songs heten [zelfdesongnaam]-src.mp3
    copyAudiospeler.setAttribute(
      "src",
      "../opdracht2/music-files/" + titelNummer + "-src.mp3"
    );

    //deze functie stopt alle audioplayers behalve de ene die op dat moment aan het spelen is en neemt audioPlayer als een argument
    //audioPlayer is het nummer dat op dat moment speelt
    function stopMuziekBehalveEen(audioPlayer) {
      //selecteert alle audiospelers in de lijst
      var audioSpelers = document.querySelectorAll("audio");
      // zoekt door elke player.
      audioSpelers.forEach((player) => {
        // als de player die gecheckt wordt door de foreach method niet de player is die in de functie is aangegeven en op dat moment speelt (audioPlayer), pauzeer dan alle andere audioplayers
        if (player !== audioPlayer) {
          player.pause();
        }
      });
    }

    //als er een nummer wordt gespeeld, pauzeer de rest en update huidigeaudiospeler zodat het weet welk nummer er op dat moment speelt
    oorspronkelijkeSpeelButton.addEventListener("click", () => {
      stopMuziekBehalveEen(oorspronkelijkeAudioSpeler);
      oorspronkelijkeAudioSpeler.play();
      huidigeAudioSpeler = oorspronkelijkeAudioSpeler;
    });

    //zelfde verhaal voor de clones
    copySpeelButton.addEventListener("click", () => {
      stopMuziekBehalveEen(copyAudiospeler);
      copyAudiospeler.play();
      huidigeAudioSpeler = copyAudiospeler;
    });

    copyAudiospeler.addEventListener("ended", (event) => {
      handleEndOfSong(event);
    });

    // maak een remove knop aan in de nieuwe list
    var removeButton = document.createElement("button");
    //set innerHTML ervan naar remove
    removeButton.innerHTML = "Remove";
    // remove de parent element van de knop (oftewel de hele geclonede lijst) on click
    removeButton.addEventListener("click", () => {
      removeButton.parentElement.remove();
      //remove het nummer van toegevoegdeNummers zodat er wordt bijgehouden wat er nog in de lijst staat 
      toegevoegdeNummers.splice(toegevoegdeNummers.indexOf(titelNummer), 1);
      //log toegevoegdenummers om te checken dat de juiste nummers in de array staan
      console.log(toegevoegdeNummers);
      // re-enable de add button
      toevoegButton.disabled = false;
      //als er geen nummers meer in de array zitten, schakel de play all en remove all buttons uit, want er is niks meer te spelen of verwijderen
      if (toegevoegdeNummers.length === 0) {
        playAllButton.disabled = true;
        removeAllButton.disabled = true;
      }
    });

    //verander de innerHTML van de cloned play button zodat er niet meer staat play preview
    copySpeelButton.innerHTML = "Play";
    //nu alles juist veranderd is, append de list item in de playlist
    mijnPlaylist2.appendChild(copyItem);
    //zet de remove button er ook in
    copyItem.appendChild(removeButton);
    //verwijder de 'add' knop uit de cloned list, die is niet meer nodig
    copyItem.querySelector('button[data-action="add"]').remove();

    // enable remove all and play all omdat er wel nummers in de lijst staan om te spelen/verwijderen
    removeAllButton.disabled = false;
    playAllButton.disabled = false;
  });
});

//selecteer de play preview buttons in de eerste lijst
var speelPreviewButtons = document.querySelectorAll(
  "section:nth-of-type(2) >section:nth-of-type(1) > ul > li > button:first-of-type"
);
//itereer door elke speel knop in de variabele
speelPreviewButtons.forEach((playButton) => {
  //als er op de play button geklikt wordt, doe dan het volgende
  playButton.addEventListener("click", () => {
    // var audioSpeler = playButton.parentElement.querySelectorAll("audio")[0];
    //dit is de audiospeler van het nummer dat geklikt wordt
    var audioSpeler = playButton.parentElement.querySelector("audio");
    //als het nummer gepauseerd is, doe dan dit
    if (audioSpeler.paused) {
      //als er iets gespeeld wordt, pauseer het dan en verander de innerhtml van de nu gepauseerde knop naar pause
      if (huidigeAudioSpeler !== null) {
        huidigeAudioSpeler.pause();
        var huidigePlayButton = huidigeAudioSpeler.parentElement.querySelector(
          "button:first-of-type"
        );
        huidigePlayButton.innerHTML = "Pause";
      }

      //zorgt ervoor dat een nummer dat gepauseerd was en opnieuw gespeeld wordt, opnieuw begint
      audioSpeler.currentTime = 0;
      audioSpeler.play();
      //hou bij welk nummer gespeeld wordt
      huidigeAudioSpeler = audioSpeler;
      //verander textcontent van button die op dat moment speelt
      playButton.innerHTML = "Pause Preview";
    } else {
      audioSpeler.pause();
      playButton.innerHTML = "Play Preview";
    }
  });
});



var playAllButton = document.querySelector(
  "body > section:nth-of-type(2) > section:nth-of-type(2) > button:first-of-type"
);

playAllButton.addEventListener("click", () => {
  const eersteNummer = mijnPlaylist2.querySelector("li");

  if (eersteNummer) {
    const eersteAudio = eersteNummer.querySelector("audio");
    eersteAudio.play();

    playAll = true;
  }
});

function handleEndOfSong(event) {
  if (playAll) {
    // zoek volgende nummer en spelen
    const currentAudio = event.target;
    console.log(currentAudio)
    currentSong = currentAudio.closest("li");

    var currentAudioButton = currentAudio.nextElementSibling
    console.log(currentAudioButton)
    // var currentAudioButton = firstSibling.nextElementSibling;
    // console.log(currentAudioButton)
    const nextSong = currentSong.nextElementSibling;

    if (nextSong) {
      //   nummer zoeken en spelen
      const nextAudio = nextSong.querySelector("audio");
      nextAudio.play();

    } else {
      //   klaar met play all
      playAll = false;
      console.log("klaar");
      const currentAudio = event.target;
      var currentAudioButton = currentAudio.nextElementSibling
      console.log('finishedsong')

    }
  } else {
    // huidige button naar pause
    const currentAudio = event.target;
    var currentAudioButton = currentAudio.nextElementSibling
    console.log('finishedsong')

  }
}

//eerste tab button.
var tabOneButton = document.querySelector(
  "section:first-of-type>section>button:first-of-type"
);
//tweede tab button
var tabTwoButton = document.querySelector(
  "section:first-of-type>section>button:nth-of-type(2)"
);
//content van de eerste button
var tabOneContent = document.querySelector(
  "section:nth-of-type(2) > section:first-of-type"
);
//content van de tweede button
var tabTwoContent = document.querySelector(
  "section:nth-of-type(2) > section:nth-of-type(2)"
);
//log check of alles goed geselecteerd is
console.log(tabOneButton);
console.log(tabTwoButton);
console.log(tabOneContent);
console.log(tabTwoContent);

//if tab two button is clicked: voeg active stijling toe aan button two, remove die stijling van button one. maak button two expanded ipv button one. verberg content 1 en toon content 2
tabTwoButton.addEventListener("click", function () {
  tabTwoButton.classList.add("activeButton");
  tabOneButton.classList.remove("activeButton");

  tabTwoButton.ariaExpanded = true;
  tabOneButton.ariaExpanded = false;

  tabTwoContent.style.display = "block";
  tabOneContent.style.display = "none";
});

//zelfde maar dan andersom
tabOneButton.addEventListener("click", function () {
  tabTwoButton.classList.remove("activeButton");
  tabOneButton.classList.add("activeButton");

  tabOneButton.ariaExpanded = true;
  tabTwoButton.ariaExpanded = false;

  tabTwoContent.style.display = "none";
  tabOneContent.style.display = "block";
});

// REMOVE ALL
var removeAllButton = document.querySelector(
  "body > section:nth-of-type(2) > section:nth-of-type(2) > button:nth-of-type(2)"
);

//maak hele array leeg en maak de playlist leeg. disable beide 'all' function buttons en re-enable alle add buttons.
removeAllButton.addEventListener("click", () => {
  toegevoegdeNummers = [];
  mijnPlaylist2.innerHTML = "";

  removeAllButton.disabled = true;
  playAllButton.disabled = true;
  document.querySelectorAll('button[data-action="add"]').forEach((button) => {
    button.disabled = false;
  });
});



// toegepaste feedback:
// class ipv .style method voor navigation
// remove button
// geen spatie in de folder meer

// nog doen;
//1. maak van 'play' => 'pause' -> werkt niet op cloned list
// 'pause preview' gaat alleen terug naar 'play preview' als je op een nummer klikt binnen dezelfde lijst
// pause werkt niet op cloned list omdat die buttons niet goed zijn geselecteerd. maar hoe..?

//2. zorgen dat play all button werkt..
//speelt nu alle nummers tegelijk, en vgm update het niet als er een nieuw nummer wordt toegevoegd nadat je al hebt geklikt op play all