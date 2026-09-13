const homeScreen = document.getElementById("home-screen");
const scrapbookScreen = document.getElementById("scrapbook-screen");

const startBtn = document.getElementById("start-btn");

const pageContainer = document.getElementById("page-container");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const pageNumber = document.getElementById("page-number");


let pages = [];
let currentPage = 0;


/* --------------------
   LOAD PAGE DATA
-------------------- */

async function loadPages() {

  const response = await fetch("scrapbook/pages.json");

  pages = await response.json();

  renderPage();

}


/* --------------------
   RENDER CURRENT PAGE
-------------------- */

function renderPage() {

  const page = pages[currentPage];

  pageContainer.innerHTML = `

    <p class="page-date">
      ${page.date}
    </p>

    <h2 class="page-title">
      ${page.caption}
    </h2>

    <div class="page-image">
      Placeholder Image
    </div>

    <p>
      ${page.note}
    </p>

  `;


  pageNumber.textContent =
    `${currentPage + 1} / ${pages.length}`;


  prevBtn.disabled =
    currentPage === 0;


  nextBtn.disabled =
    currentPage === pages.length - 1;

}


/* --------------------
   HOME → SCRAPBOOK
-------------------- */

startBtn.addEventListener("click", () => {

  homeScreen.classList.remove("active");

  scrapbookScreen.classList.add("active");

});


/* --------------------
   PAGE NAVIGATION
-------------------- */

nextBtn.addEventListener("click", () => {

  if (currentPage < pages.length - 1) {

    currentPage++;

    renderPage();

  }

});


prevBtn.addEventListener("click", () => {

  if (currentPage > 0) {

    currentPage--;

    renderPage();

  }

});


loadPages();