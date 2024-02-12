const API_KEY = "7c5580914a4d4aa1950955bdb9b47139";
const url = "https://newsapi.org/v2/everything?q=";

document.addEventListener("DOMContentLoaded", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  //   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const sortByParam = "publishedAt"; // Specify the sorting parameter (e.g., "publishedAt")

  const res = await fetch(
    `${url}${query}&apiKey=${API_KEY}&sortBy=${sortByParam}`
  );
  const data = await res.json();
  // Sort articles by published date in descending order

  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");
  const newsLink = cardClone.querySelector("#news-link");
  newsImg.src = article.urlToImage;
  //   newsTitle.innerHTML = article.title;
  // Limit the title to a certain number of words
  const maxTitleWords = 8; // Set the desired maximum number of words
  newsTitle.innerHTML = truncateWords(article.title, maxTitleWords);
  //   newsDesc.innerHTML = article.description;
  // Limit the description to a certain number of words
  const maxWords = 20; // Set the desired maximum number of words
  newsDesc.innerHTML = truncateWords(article.description, maxWords);
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerText = `${article.source.name} · ${date}`;

  //   cardClone.firstElementChild.addEventListener("click", () => {
  //     window.open(article.url, "_blank");
  //   });
  newsLink.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  //   curSelectedNav.classList.add("active");

  const categoryTitle = document.querySelector("#category-title");
  categoryTitle.innerText = `${id}-News`;
  //   console.log(categoryTitle);
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", (event) => {
  event.preventDefault(); // Prevents form submission
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = null;
});

function truncateWords(text, maxWords) {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  } else {
    return text;
  }
}
function openLoginPage() {
  window.location.href = "login.html";
}
// Add event listener to the bookmark icon
