function getData() {
   fetch('data.json')
     .then((response) => {
       if (!response.ok) {
         throw new Error('Network response was not ok');
       }
       return response.json();
     })
     .then((data) => {       
      /// EXAM: COMPLÉTEZ LE CODE ICI ! 
      const journal = data;
      console.log(journal);
      
      //Base
      let title = document.getElementById("nom-journal").innerHTML=`${journal.title}`;
      let subtitle = document.getElementById("phrase-accroche").innerHTML =`${journal.subtitle}`;
      let filteredArticles = [...journal.stories];
      let selectedArticles = [...filteredArticles]; 
      let sortState = 0;
      

      //Containeurs
      let containerArticles = document.getElementById("articles-grid")
      let containerThemes = document.getElementById("themes-list")
      let containerAuthor = document.getElementById("authors-list")
      let containerCTA = document.getElementById("call-to-action").innerHTML=`<p>${journal.cta.text}</p><button class="cta-button">${journal.cta.label}</button>`
      let containerButtons =document.getElementById("themes-nav")
      let containerPrinc = document.getElementById("article-principal").innerHTML =`<img src="${journal.feature.imageHero}" id="hero-image">
                                                                                  <div class="hero-info">
                                                                                  <p class="theme-badge">${journal.feature.theme}</p>
                                                                                  <h2 id="hero-titre">${journal.feature.headline}</h2>
                                                                                  <p id="hero-description">${journal.feature.description}</p>
                                                                                  <p id="hero-auteur">Par <b>${journal.feature.author}</b> · ${journal.feature.date}</p>
                                                                                  <button class="read-article-btn">Lire l'article</button>
                                                                                  </div>`
    //Buttons
      //All
      let buttonAll =`<button class="nav-theme-btn all active">Tous</button>`
        containerButtons.insertAdjacentHTML("beforeend", buttonAll)
      let buttonALL = document.querySelector(".all")
          buttonALL.addEventListener("click", function(){
              selectedArticles = [...journal.stories];
              filteredArticles = [...selectedArticles]; // met à jour la liste filtrée
              sortState = 0;
              render(selectedArticles);
              buttons.forEach(b => b.classList.remove("active"));
            buttonALL.classList.add("active");
          })
      
      //Autres
      journal.topics.forEach(topic => {
        let button =`<button class="nav-theme-btn spe">${topic.icon}${topic.nom}</button>`
        containerButtons.insertAdjacentHTML("beforeend", button)
      });
      let buttons = document.querySelectorAll(".spe")
      buttons.forEach((button, i) => {
        button.addEventListener("click", function(){
          selectedArticles = journal.stories.filter(thing => thing.topic === journal.topics[i].nom);
          filteredArticles = [...selectedArticles]; 
          sortState = 0;
          render(selectedArticles);
          buttons.forEach(b => b.classList.remove("active"));
            buttonALL.classList.remove("active");
            button.classList.add("active");
        })
      });
      
      //Bouton Alert
      let buttonCTA = document.querySelector(".cta-button")
      buttonCTA.addEventListener("click", function (){
        alert("☆ Bienvenue ! ☆")
      })

      function scoreEtoile(rating){
        let i = 0
        let result =""
        let nbrEtoiles =  Math.floor(rating);
        while (i < nbrEtoiles && i < 5){
          result += "★";
          i++;
        }
        while (i < 5){
          result += "☆";
          i++;
        }
        result +=`(${rating})`
        return (result)
      }

      function render(list) {
        containerArticles.innerHTML = "";
        list.forEach(article => {
          createCard(article);
        });
      }

      function createCard(article) {
        let card = `<div class="article-card">
                    <img src="${article.image}">
                    <div class="article-content">
                      <p class="theme-badge">${article.theme}</p>
                      <h3>${article.headline}</h3>
                      <p>${article.summary}</p>
                      <p>Par ${article.author} · ${article.date}</p>
                      <p>${scoreEtoile(article.rating)}</p>
                    </div>
                    <button class="read-btn">Lire l'article<button>
                    </div>`
        containerArticles.insertAdjacentHTML("beforeend", card);
      }
      
      function createTopicCard(topic) {
       let topicCard = `<div class="theme-item">
                       <p class="theme-icon">${topic.icon}</p>
                       <h3>${topic.title}</h3>
                       <p>${topic.desc}</p>
                       </div>`
        containerThemes.insertAdjacentHTML("beforeend", topicCard);
        let topiccCard = containerThemes.lastElementChild;
            topiccCard.style.backgroundColor = `${topic.color}`;
      }
      
      function createAuthorCard(author) {
        let AuthorCard = `<div class="author-card">
                         <img src=${author.avatar} class="author-image">
                         <h3>${author.prenom}</h3>
                         <p class="author-role">${author.expertise}</p>
                         <p class="author-bio">${author.bio}</p>
                         <div class="author-socials">
                        <a>${author.email}</a>
                        <a>${author.articles} articles</a>
                         </div>
                         </div>`
        containerAuthor.insertAdjacentHTML("beforeend", AuthorCard);
      }

      render(selectedArticles)

      journal.topics.forEach(topic => {
        createTopicCard(topic);
      });

      journal.contributors.forEach(author => {
        createAuthorCard(author)
      });

    //Try de triage
    let buttonTri = document.getElementById("boutonTri");
    let filteredOriginal = [...selectedArticles]
    // 0 = rien   1 = tri ASC   2 = tri DESC    -> boucle 3clics
    buttonTri.addEventListener("click", function() {
      sortState = (sortState + 1) % 3;
      if(sortState === 0) {
          // revenir à la liste filtrée actuelle
          selectedArticles = [...filteredArticles];
      } else if(sortState === 1) {
          selectedArticles = [...selectedArticles].sort((a, b) => a.rating - b.rating);
      } else if(sortState === 2) {
          selectedArticles = [...selectedArticles].sort((a, b) => b.rating - a.rating);
      }
    render(selectedArticles);
    })
      // // TODO 1: REMPLIR LE HEADER
      // // TODO 2: REMPLIR LA NAVIGATION
          //// rendre les boutons activé!
      // / TODO 3: REMPLIR L'ARTICLE PRINCIPAL
          //l'auteur est pas en noir noir jsp pk
      // // TODO 4: REMPLIR LA GRILLE D'ARTICLES
      // // TODO 5: REMPLIR LES THEMES
      // // TODO 6: REMPLIR LES AUTEURS
      // // TODO 7: REMPLIR LE BOUTON CALL TO ACTION


      /// FIN DU CODE
     })
     .catch((error) => console.error('Erreur lors de la lecture des données :', error));
 }
 
 getData();

 // BONUS: 
 // Alert quand on appuie sur le bouton CTA
      // Fait de manière moche : a enjoliver
 // // Fonction de filtrage par thème
 // //Classer les articles par popularité ou notation
      // //classé par notation :3
 
