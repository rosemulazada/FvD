console.log('test')
var mijnPlaylist = document.querySelector('section:nth-of-type(2) >section:nth-of-type(2) > ul');
var voegNummerButtons = document.querySelectorAll('section:nth-of-type(2) >section:nth-of-type(1) > ul > li > button:last-of-type');
var mijnPlaylist2 = document.querySelector('section:nth-of-type(2) > section:nth-of-type(2) > ul');
Sortable.create(mijnPlaylist2);

console.log(mijnPlaylist);
console.log(voegNummerButtons);
console.log(mijnPlaylist2);

var huidigeAudioSpeler = null;
var toegevoegdeNummers = [];

function stopMuziekBehalveEen(audioPlayer) {
    var audioSpelers = document.querySelectorAll('audio');
    audioSpelers.forEach((player) => {
        if (player !== audioPlayer) {
            player.pause();
        }
    });
}

voegNummerButtons.forEach((toevoegButton) => {
    toevoegButton.addEventListener("click", () => {
        var oorspronkelijkeItem = toevoegButton.parentElement;
        var oorspronkelijkeAudioSpeler = oorspronkelijkeItem.querySelectorAll("audio")[0];
        var oorspronkelijkeSrc = oorspronkelijkeAudioSpeler.getAttribute("src");
        var titelNummer = oorspronkelijkeSrc.substring(oorspronkelijkeSrc.lastIndexOf('/') + 1,
            oorspronkelijkeSrc.lastIndexOf('-preview'));


        if (toegevoegdeNummers.includes(titelNummer)) {
            alert('This song has already been added to the playlist!');
            return;
        }


        toegevoegdeNummers.push(titelNummer);

        var oorspronkelijkeSpeelButton = oorspronkelijkeItem.querySelectorAll('button')[0];

        var copyItem = oorspronkelijkeItem.cloneNode(true);
        var copyAudiospeler = copyItem.querySelectorAll("audio")[0];
        var copySpeelButton = copyItem.querySelectorAll('button')[0];

        var oorspronkelijkeSrc = oorspronkelijkeAudioSpeler.getAttribute("src");
        var titelNummer = oorspronkelijkeSrc.substring(oorspronkelijkeSrc.lastIndexOf('/') + 1,
            oorspronkelijkeSrc.lastIndexOf('-preview'));

        copyAudiospeler.setAttribute("src", "../opdracht2/music-files/" + titelNummer + "-src.mp3");


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

        copyItem.querySelector('button[data-action="add"]').remove();
        copySpeelButton.innerHTML = 'Play';
        mijnPlaylist2.appendChild(copyItem);
    });
});


var speelPreviewButtons = document.querySelectorAll('section:nth-of-type(2) >section:nth-of-type(1) > ul > li > button:first-of-type');
speelPreviewButtons.forEach((playButton) => {
    playButton.addEventListener("click", () => {
        var audioSpeler = playButton.parentElement.querySelectorAll("audio")[0];
        audioSpeler.play();
        stopMuziekBehalveEen(audioSpeler);
        huidigeAudioSpeler = audioSpeler;
    });
});

var speelButtons = document.querySelectorAll('section:nth-of-type(2) >section:nth-of-type(2) > ul > li > button:first-of-type');
speelButtons.forEach((playButton) => {
    playButton.addEventListener("click", () => {
        var audioSpeler = playButton.previousElementSibling;
        audioSpeler.play();
        stopMuziekBehalveEen(audioSpeler);
        huidigeAudioSpeler = audioSpeler;
    });
});


var tabOneButton = document.querySelector('section:first-of-type>section>button:first-of-type');
var tabTwoButton = document.querySelector('section:first-of-type>section>button:nth-of-type(2)');
var tabOneContent = document.querySelector('section:nth-of-type(2) > section:first-of-type');
var tabTwoContent = document.querySelector('section:nth-of-type(2) > section:nth-of-type(2)');
console.log(tabOneButton);
console.log(tabTwoButton)
console.log(tabOneContent)
console.log(tabTwoContent)
tabTwoButton.addEventListener('click', function () {
    tabOneContent.style.display = 'none';
    tabTwoContent.style.display = 'block';

    tabTwoButton.style.fontWeight = 'bold';
    tabTwoButton.style.borderBottom = '2px solid white';
    tabTwoButton.style.background = 'var(--color-highlight-button)';
    tabOneButton.style.fontWeight = 'none';
    tabOneButton.style.borderBottom = 'none';
    tabOneButton.style.background = 'none';
})

tabOneButton.addEventListener('click', function () {
    tabTwoContent.style.display = 'none';
    tabOneContent.style.display = 'block';

    tabOneButton.style.fontWeight = 'bold';
    tabOneButton.style.borderBottom = '2px solid white';
    tabOneButton.style.background = 'var(--color-highlight-button)';
    tabTwoButton.style.fontWeight = 'none';
    tabTwoButton.style.borderBottom = 'none';
    tabTwoButton.style.background = 'var(--color-highlight)';
})