"use strict";

//SELECTORS & VARIABLES 🕸️
const searchBtn = document.querySelector(".fa-magnifying-glass");
const searchWord = document.querySelector("input");
const photoSection = document.querySelector(".photos-sec");
const learnBtn = document.querySelector(".load-btn");
let downloadfooterBtn;

const modal = document.querySelector(".modal");
const photoName = document.querySelector(".photo-name");
const downloadModalBtn = document.querySelector(".modal-download");
const closeModalBtn = document.querySelector(".fa-xmark");
const selectedPhoto = document.querySelector(".target-photo");
const list = document.querySelector(".photos-list");

let images;
let i = 1;

//FUNCTIONS ⚙️

const downloader = async function (data) {
  const resp = await fetch(data);
  const blob = await resp.blob();
  const href = URL.createObjectURL(blob);

  const a = Object.assign(document.createElement("a"), {
    href,
    style: "display:none",
    download: new Date().getTime(),
  });
  a.click();
};

const photoGetter = async function (keyword, pageNum) {
  // get result
  let resp = await fetch(
    `https://api.pexels.com/v1/search?query=${keyword}&page=${pageNum}&per_page=20`,
    {
      headers: {
        Authorization:
          "JwU202XswC4r94G2tEdSN6olt7Dy5c2IwzdbikOlmWpwktUQr8mCBMiM",
      },
    }
  );
  let data = await resp.json();
  let photosArr = data.photos;

  // show results
  photosArr.forEach((element) => {
    let i = photosArr.indexOf(element);
    let imgElement = `
    <li class="card">
      <img src="${element.src.large2x}" alt="photo-result" class="img-result" photographer="${element.photographer}">
      <div class="photo-footer">
        <div class="photo-footer-left">
          <i class="fa-solid fa-camera fa-camera-footer"></i>
          <p class="footer-name">${element.photographer}</p> 
        </div>
        <i class="fa-solid fa-download download-footer"></i>
      </div>
    </li>
      `;
    list.insertAdjacentHTML("beforeend", imgElement);
  });
  images = document.querySelectorAll(".img-result");

  images.forEach((img) => {
    img.addEventListener("click", () => {
      document.documentElement.style.setProperty("--display-none", "block");
      modal.style.display = "block";
      selectedPhoto.src = img.src;
      photoName.textContent = img.getAttribute("photographer");
    });
  });

  downloadfooterBtn = document.querySelectorAll(".download-footer");
  downloadfooterBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      console.log(selectedPhoto.src);
      downloader(selectedPhoto.src);
    });
  });
};

//ACTIONS 🔥
photoGetter("random", i);

searchBtn.addEventListener("click", () => {
  photoSection.innerHTML = "";
  photoGetter(searchWord.value, 1);
});

searchWord.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    photoSection.innerHTML = "";
    photoGetter(searchWord.value, 1);
  }
});

learnBtn.addEventListener("click", () => {
  i++;
  searchWord.value == ""
    ? photoGetter("random", i)
    : photoGetter(searchWord.value, i);
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.documentElement.style.setProperty("--display-none", "none");
});

downloadModalBtn.addEventListener("click", () => {
  downloader(selectedPhoto.src);
});
