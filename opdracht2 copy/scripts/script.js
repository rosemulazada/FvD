// JavaScript Document
console.log("test123");

// hier maak ik een functie aan waarmee ik de lijst kan sorteren van A-Z
function vanAnaarZsorteren() {
  // ik maak een variabele aan, hierin sla ik de allereerste ul op
    var ulOne = document.querySelector("ul");
    // in deze variabele sla ik alle list elementen in deze ul op. ik gebruik array.from() om een array te maken van alle list elementen.
    //dit doe ik zodat ik ze straks kan sorteren
     var lijstEen = Array.from(ulOne.querySelectorAll("li"));
   
     // var eindlijst is een variabele waarin de gesorteerde versie van lijsteen wordt opgeslagen.
     // a en b staan voor de twee elementen die telkens vergeleken worden zodat er gesorteerd kan worden
     // met textcontent bekijken we de inhoud van a en b (dus telkens een ander list element uit onze array)
     // met toUpperCase zorgen we ervoor dat er niet wordt gekeken naar hoofdletters wanneer er gesorteerd wordt
     var eindLijst = lijstEen.sort((a, b) => {
       var lijstA = a.textContent.toUpperCase();
       var lijstB = b.textContent.toUpperCase();
       // localcompare bekijkt welk van de items die vergeleken worden eerst moet komen. als de eerste string voor de tweede komt krijg je een negatieve waarde terug, andersom positief en als ze gelijk zijn krijg je 0.
       // hiermee kunnen we dus de volgorde bepalen
       return lijstA.localeCompare(lijstB); 
     });
   //hier zetten we de html content van de ul naar niks. hierdoor worden de list elementen verwijderd.
     ulOne.innerHTML = "";
     // uiteindelijk wordt de waarde van de uiteindelijke lijst te stellen. 
     // appendChild voegt dus de gesorteerde lijst elementen vanuit de eindLijst variabele toe aan de parent, oftewel de ul die we hebben opgeslagen in ulOne.
     //forEach wordt dan gebruikt om ook elke li toe te voegen
     eindLijst.forEach((li) => ulOne.appendChild(li));
   }

//maak variabele aan voor button en log om te zien of het wordt aangesproken
//herhaal voor tweede button
var buttonOne = document.querySelector('body>button:first-of-type');
console.log(buttonOne)
buttonTwo = document.querySelector('body>button:nth-of-type(2)');
console.log(buttonTwo)

//deze eventlistener luistert of er wordt geklikt op de eerste button buttonone.
//zo wel, voer dan functie vananaarzsorteren uit
//daarna heb je nog een eventlistener die luistert of er geklikt wordt en die veranderd dan de achtergrondkleur van de geklikte button naar groen
//de achtergrondkleur van de tweede button wordt verwijderd als er al op was geklikt en het dus ook groen was. hierdoor krijgt het zijn default kleur terug en heb je niet twee actieve groene buttons
buttonOne.addEventListener('click', vanAnaarZsorteren)
buttonOne.addEventListener('click', function() {
    buttonOne.style.background = 'var(--color-highlight-button)';
    buttonTwo.style.background = '';
  });


 
function vanZnaarAsorteren() {
  var ulTwo = document.querySelector("ul");
  var lijstTwee = Array.from(ulTwo.querySelectorAll("li"));
  
  var eindLijst = lijstTwee.sort((a, b) => {
    var lijstA = a.textContent.toUpperCase();
    var lijstB = b.textContent.toUpperCase();
    // het enige verschil met de functie vanAnaarZsorteren is dat je hieronder de volgorde van de vergelijking omwisselt.
    // van daar ook van Z-A!
    return lijstB.localeCompare(lijstA); 
  });
  
  ulTwo.innerHTML = "";
  eindLijst.forEach((li) => ulTwo.appendChild(li));
}

//zelfde verhaal als bovenaan, alleen natuurlijk met de buttons omgedraaid
buttonTwo.addEventListener('click', vanZnaarAsorteren);
buttonTwo.addEventListener('click', function() {
    buttonOne.style.background = '';
    buttonTwo.style.background = 'var(--color-highlight-button)';
  });




// dit is de tweede lijst met beschikbare nummers waaruit je kunt kiezen
var beschikbaar = document.querySelector('body>ul:nth-of-type(2)');
//dit is de eerste lijst die jij zelf kunt samenstellen
var mijnPlaylist = document.querySelector('body>ul:first-of-type')

//voeg een eventlistener toe aan de lijst van beschikbare nummers. 
//deze luistert naar een click event op de tweede ul
// we hebben event nodig om te kijken op welk element er geklikt is uit de ul, dus welke van de vele li's
//als er geklikt wordt, voer dan de volgende functie uit..
beschikbaar.addEventListener('click', function(event) {
   // deze code wordt alleen uitgevoerd als het element dat geklikt is een list element is.
  // er staat, als er geklikt wordt en de naam van het html element dat geklikt is is LI, voer het dan uit
  if (event.target && event.target.nodeName === 'LI') {
    // de attribute data nummer van de geklikte li wordt opgeslagen in deze variabele
    var nummerData = event.target.getAttribute('data-nummer');
     // hier wordt gekeken of het gekozen nummer al in jouw playlist staat.
    // alleen dan wordt de code verder uitgevoerd
    if (!mijnPlaylist.querySelector('[data-nummer="' + nummerData + '"]')) {
       // het gekozen nummer wordt gekopieerd en opgeslagen in deze variabele gekozennummer
      var gekozenNummer = event.target.cloneNode(true);
      // in de variabele verwijderen wordt een button aangemaakt bij het toebehorende gekopieerde element maar voegt het nog niet toe aan de DOM
      var verwijderen = document.createElement('button');
       // hierbij wordt de tekst die in de button staat aangewezen
      verwijderen.innerText = 'Remove';
      //als er op de remove knop wordt geklikt, voer dan deze functie uit
      verwijderen.addEventListener('click', function(event) {
        //verwijder het nummer dat gekozen is, oftewel de parent van de button, dus de gekopieerde list
        // removechild is dus het tegenovergestelde van appendchild
        mijnPlaylist.removeChild(event.target.parentNode);
      });
      // hierdoor wordt de remove knop toegevoegd aan de DOM
      gekozenNummer.appendChild(verwijderen);

      // voeg het gekopieerde gekozen nummer toe aan jouw playlist
      mijnPlaylist.appendChild(gekozenNummer);
    }
  }
});

//gebruik sortableJS op de playlist om drag and drop te enablen. keyboard; true zorgt ervoor dat het ook (voor zover mogelijk) met het toetsenbord te bedienen is
new Sortable(mijnPlaylist, {
  keyboard: true
});
