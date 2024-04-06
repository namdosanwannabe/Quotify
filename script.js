const apiKey = "G41xPnZgVD4AsxnptpleGw==emK7vb0BT5TYBemn";

const btnCategory = document.querySelector(".button--category");
const btnGenerate = document.querySelector(".button--generate");
const btnCopy = document.querySelector(".icon--copy");

let dateEl = document.querySelector(".date");
let paragraph = document.querySelector(".quotes-paragraph");
let category = "category";

const date = new Date();
dateEl.innerHTML = date.getFullYear();

btnCopy.addEventListener("click", async () => {
  try {
    const copy = paragraph.textContent;
    await navigator.clipboard.writeText(copy);
    alert("Text copied to clipboard successfully");
  } catch (err) {
    alert("Failed to copy text to clipboard:", err);
  }
});

btnCategory.addEventListener("change", () => {
  let selectedCategory = btnCategory.value;
  category = selectedCategory;
});

btnGenerate.addEventListener("click", () => {
  if (category !== "category") {
    paragraph.innerHTML = "Loading...";
    generateQuotes();
  } else {
    alert("Please select a category.");
  }
});

async function generateQuotes() {
  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    if (!response.ok) throw new Error("Network response was not ok");

    const result = await response.json();
    const quote = result[0].quote;
    paragraph.innerHTML = quote;

    console.log(quote);
  } catch (error) {
    throw new Error("Error:", error);
  }
}
