console.log("test");
var mijnPlaylist = document.querySelector(
  "section:nth-of-type(2) >section:nth-of-type(2) > ul"
);
var voegNummerButtons = document.querySelectorAll(
  "section:nth-of-type(2) >section:nth-of-type(1) > ul > li > button:last-of-type"
);
var mijnPlaylist2 = document.querySelector(
  "section:nth-of-type(2) > section:nth-of-type(2) > ul"
);
Sortable.create(mijnPlaylist2);

console.log(mijnPlaylist);
console.log(voegNummerButtons);
console.log(mijnPlaylist2);

var huidigeAudioSpeler = null;
var toegevoegdeNummers = [];

function stopMuziekBehalveEen(audioPlayer) {
  var audioSpelers = document.querySelectorAll("audio");
  audioSpelers.forEach((player) => {
    if (player !== audioPlayer) {
      player.pause();
    }
  });
}

voegNummerButtons.forEach((toevoegButton) => {
  toevoegButton.addEventListener("click", () => {
    var oorspronkelijkeItem = toevoegButton.parentElement;
    var oorspronkelijkeAudioSpeler =
      oorspronkelijkeItem.querySelectorAll("audio")[0];
    var oorspronkelijkeSrc = oorspronkelijkeAudioSpeler.getAttribute("src");
    var titelNummer = oorspronkelijkeSrc.substring(
      oorspronkelijkeSrc.lastIndexOf("/") + 1,
      oorspronkelijkeSrc.lastIndexOf("-preview")
    );

    if (toegevoegdeNummers.includes(titelNummer)) {
      alert("This song has already been added to the playlist!");
      return;
    }

    toegevoegdeNummers.push(titelNummer);

    var oorspronkelijkeSpeelButton =
      oorspronkelijkeItem.querySelectorAll("button")[0];

    var copyItem = oorspronkelijkeItem.cloneNode(true);
    var copyAudiospeler = copyItem.querySelectorAll("audio")[0];
    var copySpeelButton = copyItem.querySelectorAll("button")[0];

    var oorspronkelijkeSrc = oorspronkelijkeAudioSpeler.getAttribute("src");
    var titelNummer = oorspronkelijkeSrc.substring(
      oorspronkelijkeSrc.lastIndexOf("/") + 1,
      oorspronkelijkeSrc.lastIndexOf("-preview")
    );

    copyAudiospeler.setAttribute(
      "src",
      "../opdracht2/music-files/" + titelNummer + "-src.mp3"
    );

    function stopMuziek() {
      stopMuziekBehalveEen(copyAudiospeler);
    }

    oorspronkelijkeSpeelButton.addEventListener("click", () => {
      stopMuziekBehalveEen(oorspronkelijkeAudioSpeler);
      oorspronkelijkeAudioSpeler.play();
      huidigeAudioSpeler = oorspronkelijkeAudioSpeler;
    });

    copySpeelButton.addEventListener("click", () => {
      stopMuziekBehalveEen(copyAudiospeler);
      copyAudiospeler.play();
      huidigeAudioSpeler = copyAudiospeler;
    });

    var action = copySpeelButton.getAttribute("data-action");
    if (action === "play-preview") {
      copySpeelButton.addEventListener("click", () => {
        stopMuziek();
        var audioSpeler = copyItem.querySelectorAll("audio")[0];
        audioPlayer.play();
      });
    }

    var removeButton = document.createElement("button");
    removeButton.innerHTML = "Remove";
    removeButton.addEventListener("click", () => {
      removeButton.parentElement.remove();
      toegevoegdeNummers = [];
    });

    copySpeelButton.innerHTML = "Play";
    mijnPlaylist2.appendChild(copyItem);
    copyItem.appendChild(removeButton);
    copyItem.querySelector('button[data-action="add"]').remove();
  });
});

var speelPreviewButtons = document.querySelectorAll(
  "section:nth-of-type(2) >section:nth-of-type(1) > ul > li > button:first-of-type"
);
// gebruikt var huidigeaudiospeler = null
// 'pause preview' gaat alleen terug naar 'play preview' als je op een nummer klikt binnen dezelfde lijst
// moet 1 code schrijven voor speel preview buttons en speel buttons zodat ik dat wel werkend kan krijgen

speelPreviewButtons.forEach((playButton) => {
  playButton.addEventListener("click", () => {
    var audioSpeler = playButton.parentElement.querySelectorAll("audio")[0];
    if (audioSpeler.paused) {
      if (huidigeAudioSpeler !== null) {
        huidigeAudioSpeler.pause();
        var huidigePlayButton = huidigeAudioSpeler.parentElement.querySelector(
          "button:first-of-type"
        );
        huidigePlayButton.innerHTML = "Play Preview";
      }
      audioSpeler.currentTime = 0;
      audioSpeler.play();
      huidigeAudioSpeler = audioSpeler;
      playButton.innerHTML = "Pause Preview";
    } else {
      audioSpeler.pause();
      playButton.innerHTML = "Play Preview";
    }
  });
});

// pause werkt niet op cloned list omdat die buttons niet goed zijn geselecteerd. maar hoe..?
var speelButtons = document.querySelectorAll(
  "section:nth-of-type(2) >section:nth-of-type(2) > ul > li > button:first-of-type"
);
speelButtons.forEach((playButton) => {
  playButton.addEventListener("click", () => {
    var audioSpeler = playButton.previousElementSibling;
    audioSpeler.play();
    stopMuziekBehalveEen(audioSpeler);
    huidigeAudioSpeler = audioSpeler;
  });
});

// var playAllButton = document.querySelector('body > section:nth-of-type(2) > section:nth-of-type(2) > button:first-of-type');
// playAllButton.addEventListener('click', () => {
//     var playlistItems = mijnPlaylist2.querySelectorAll("li");
//     for (var i = 0; i < playlistItems.length; i++) {
//         var audioPlayer = playlistItems[i].querySelector('audio');
//         audioPlayer.play();
//     }
// });

var tabOneButton = document.querySelector(
  "section:first-of-type>section>button:first-of-type"
);
var tabTwoButton = document.querySelector(
  "section:first-of-type>section>button:nth-of-type(2)"
);
var tabOneContent = document.querySelector(
  "section:nth-of-type(2) > section:first-of-type"
);
var tabTwoContent = document.querySelector(
  "section:nth-of-type(2) > section:nth-of-type(2)"
);
console.log(tabOneButton);
console.log(tabTwoButton);
console.log(tabOneContent);
console.log(tabTwoContent);

tabTwoButton.addEventListener("click", function () {
  tabTwoButton.classList.add("activeButton");
  tabOneButton.classList.remove("activeButton");

  tabTwoContent.style.display = "block";
  tabOneContent.style.display = "none";
});

tabOneButton.addEventListener("click", function () {
  tabTwoButton.classList.remove("activeButton");
  tabOneButton.classList.add("activeButton");

  tabTwoContent.style.display = "none";
  tabOneContent.style.display = "block";
});

var removeAllButton = document.querySelector(
  "body > section:nth-of-type(2) > section:nth-of-type(2) > button:nth-of-type(2)"
);
removeAllButton.addEventListener("click", () => {
  if (mijnPlaylist2.innerHTML === "") {
    alert("This playlist is already empty!");
  } else {
    toegevoegdeNummers = [];
    mijnPlaylist2.innerHTML = "";
  }
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
