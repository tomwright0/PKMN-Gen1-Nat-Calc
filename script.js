document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", calculateNature);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
});

const natures = [
    { name: "Hardy", remainder: 0, raises: "None", lowers: "None" },
    { name: "Lonely", remainder: 1, raises: "Attack", lowers: "Defense" },
    { name: "Brave", remainder: 2, raises: "Attack", lowers: "Speed" },
    { name: "Adamant", remainder: 3, raises: "Attack", lowers: "Special Attack" },
    { name: "Naughty", remainder: 4, raises: "Attack", lowers: "Special Defense" },
    { name: "Bold", remainder: 5, raises: "Defense", lowers: "Attack" },
    { name: "Docile", remainder: 6, raises: "None", lowers: "None" },
    { name: "Relaxed", remainder: 7, raises: "Defense", lowers: "Speed" },
    { name: "Impish", remainder: 8, raises: "Defense", lowers: "Special Attack" },
    { name: "Lax", remainder: 9, raises: "Defense", lowers: "Special Defense" },
    { name: "Timid", remainder: 10, raises: "Speed", lowers: "Attack" },
    { name: "Hasty", remainder: 11, raises: "Speed", lowers: "Defense" },
    { name: "Serious", remainder: 12, raises: "None", lowers: "None" },
    { name: "Jolly", remainder: 13, raises: "Speed", lowers: "Special Attack" },
    { name: "Naïve", remainder: 14, raises: "Speed", lowers: "Special Defense" },
    { name: "Modest", remainder: 15, raises: "Special Attack", lowers: "Attack" },
    { name: "Mild", remainder: 16, raises: "Special Attack", lowers: "Defense" },
    { name: "Quiet", remainder: 17, raises: "Special Attack", lowers: "Speed" },
    { name: "Bashful", remainder: 18, raises: "None", lowers: "None" },
    { name: "Rash", remainder: 19, raises: "Special Attack", lowers: "Special Defense" },
    { name: "Calm", remainder: 20, raises: "Special Defense", lowers: "Attack" },
    { name: "Gentle", remainder: 21, raises: "Special Defense", lowers: "Defense" },
    { name: "Sassy", remainder: 22, raises: "Special Defense", lowers: "Speed" },
    { name: "Careful", remainder: 23, raises: "Special Defense", lowers: "Special Attack" },
    { name: "Quirky", remainder: 24, raises: "None", lowers: "None" }
];

function calculateNature() {
    const experienceInput = document.getElementById("experience").value;
    const resultDiv = document.getElementById("result");
    const detailsDiv = document.getElementById("nature-details");

    const experience = parseInt(experienceInput);
    if (isNaN(experience) || experience < 0) {
        resultDiv.textContent = "Please enter a valid positive integer for experience.";
        resultDiv.style.color = "red";
        detailsDiv.textContent = "";
        return;
    }

    const remainder = experience % 25;
    const nature = natures.find(n => n.remainder === remainder);

    if (nature) {
        resultDiv.textContent = `The Pokémon's nature is: ${nature.name}`;
        detailsDiv.innerHTML = `<span>Raises:</span> ${nature.raises}<br><span>Lowers:</span> ${nature.lowers}`;
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = "Something went wrong, please try again.";
        resultDiv.style.color = "red";
        detailsDiv.textContent = "";
    }
}

// Function to get a cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) return decodeURIComponent(cookieValue);
    }
    return "";
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000); // Expiry time
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires.toUTCString()}; path=/`;
}

// Function to update history in cookies
function updateHistory(nature) {
    let history = getCookie("history");
    history = history ? JSON.parse(history) : []; // Parse existing history or start fresh

    history.unshift(nature); // Add new result at the beginning
    if (history.length > 6) history.pop(); // Keep only the last 5 entries

    setCookie("history", JSON.stringify(history), 7); // Store updated history for 7 days
    displayHistory();
}

// Function to display history
function displayHistory() {
    const historyDiv = document.getElementById("history");
    let history = getCookie("history");
    history = history ? JSON.parse(history) : [];

    historyDiv.innerHTML = history.length
        ? `<h3>Last 6 Pokémon</h3><ul>${history.map(n => `<li>${n}</li>`).join("")}</ul>`
        : "<h3>Last 6 Pokémon</h3><p>No Pokémon calculated yet.</p>";
}

// Function to clear history
function clearHistory() {
    setCookie("history", "", -1); // Set expiration in the past to delete the cookie
    displayHistory();
}

// Modified function to calculate nature & save to history
function calculateNature() {
    const experienceInput = document.getElementById("experience").value;
    const resultDiv = document.getElementById("result");
    const detailsDiv = document.getElementById("nature-details");

    const experience = parseInt(experienceInput);
    if (isNaN(experience) || experience < 0) {
        resultDiv.textContent = "Please enter a valid positive integer for experience.";
        resultDiv.style.color = "red";
        detailsDiv.textContent = "";
        return;
    }

    const remainder = experience % 25;
    const nature = natures.find(n => n.remainder === remainder);

    if (nature) {
        const natureText = ` ${nature.name} (↑${nature.raises}, ↓${nature.lowers})`;
        resultDiv.textContent = natureText;
        detailsDiv.innerHTML = `<span>Raises:</span> ${nature.raises}<br><span>Lowers:</span> ${nature.lowers}`;
        resultDiv.style.color = "green";
        
        updateHistory(natureText); // Save result to history
    } else {
        resultDiv.textContent = "Something went wrong, please try again.";
        resultDiv.style.color = "red";
        detailsDiv.textContent = "";
    }
}

// Load history on page load
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calculateBtn").addEventListener("click", calculateNature);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    document.getElementById("clearHistoryBtn").addEventListener("click", clearHistory);
    displayHistory(); // Show history on load
});

function toggleTheme() {
    document.body.classList.toggle("night-mode");
    localStorage.setItem("theme", document.body.classList.contains("night-mode") ? "night" : "light");
    
    // Ensure history section updates to night mode
    const historyDiv = document.getElementById("history");
    if (document.body.classList.contains("night-mode")) {
        historyDiv.classList.add("night-mode");
    } else {
        historyDiv.classList.remove("night-mode");
    }
}

// Ensure theme is applied on page load
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("theme") === "night") {
        document.body.classList.add("night-mode");
    }
});
