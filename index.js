const fs = require("fs");
const path = require("path");
const { exit } = require("process");
// Parse the command-line arguments
const args = process.argv.slice(2); // Remove the first two arguments (node and script.js)

//Fallback Folder
let directoryPath = "D:/Dropbox/Rezepte";
// Process command line arguments
for (const arg of args) {
  const [key, value] = arg.split("=");

  if (key === "dir" && value) {
    directoryPath = value;
  }
}

// Array to store recipe titles
const recipeTitleList = [];

// Function to search the directory and extract recipe titles
function extractRecipeTitles(directory) {
  try {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isFile()) {
        // Extract filename from file path
        const fileName = path.basename(filePath);

        // Add the filename to the recipeTitleList
        recipeTitleList.push(fileName);
      }
    });
  } catch (e) {
    console.log(
      "\x1b[31m",
      "Could not find or missing path argument. Please change the path with dir='path/to/recipes' as argument.",
      "\x1b[0m"
    );
    process.exit(1);
  }
}

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });

    fs.rmdirSync(folderPath);
  }
}

// Function to create a weekly menu from the recipe titles
function createWeeklyMenu(recipeTitles, numberOfDays, selectedCategories) {
  if (
    recipeTitles.length < numberOfDays ||
    selectedCategories.length < numberOfDays
  ) {
    return "Not enough recipes or categories available for the weekly menu.";
  }

  const balancedMenu = [];
  const usedCategories = new Set();

  for (let day = 0; day < numberOfDays; day++) {
    const availableDishes = [];

    recipeTitles.forEach((title) => {
      selectedCategories.forEach((category) => {
        if (title.includes(category) && !usedCategories.has(category)) {
          availableDishes.push({ title, category });
        }
      });
    });

    if (availableDishes.length === 0) {
      // If no available dishes, add a message
      balancedMenu.push("No matching dish found");
    } else {
      // Randomly select a dish from available dishes
      const randomIndex = Math.floor(Math.random() * availableDishes.length);
      const selectedDish = availableDishes[randomIndex];
      balancedMenu.push(selectedDish.title);
      // Add the used category to the set
      usedCategories.add(selectedDish.category);
    }
  }

  return balancedMenu;
}

// Search the directory and extract recipe titles
extractRecipeTitles(directoryPath);

// Create a weekly menu
// Selected categories for the menu (example)
const selectedCategories = [
  "Hühnchen",
  "Gemüse",
  "Reis",
  "Nudeln",
  "Fleisch",
  "Fisch",
  "Obst",
  "Vollkorn",
  "Hülsenfrüchte",
  "Joghurt",
  "Eier",
  "Magermilch",
  "Nüsse",
  "Samen",
  "Käse",
  "Olivenöl",
  "Avocado",
  "Beeren",
  "Spinat",
  "Karotten",
  "Haferflocken",
  "Brokkoli",
  "Tomaten",
  "Quinoa",
  "Mandeln",
  "Lachs",
  "Tofu",
  "Griechischer Joghurt",
  "Bananen",
  "Spargel",
  "Rucola",
  "Möhren",
  "Linsen",
  "Hummus",
  "Chia-Samen",
  "Rote Beete",
  "Blumenkohl",
  "Zitrusfrüchte",
  "Erdnüsse",
  "Mandelmilch",
  "Schwarzer Tee",
  "Grüner Tee",
  "Vollkornbrot",
  "Vollkornnudeln",
  "Vollkornreis",
  "Walnüsse",
  "Erdbeeren",
  "Himbeeren",
  "Blaubeeren",
  "Chinakohl",
  "Süßkartoffeln",
  "Knoblauch",
  "Zwiebeln",
  "Ingwer",
  "Paprika",
  "Radieschen",
  "Johannisbeeren",
  "Brombeeren",
  "Ananas",
  "Gurken",
  "Melone",
  "Kirschen",
  "Zucchini",
  "Pilze",
  "Petersilie",
  "Basilikum",
  "Oregano",
  "Rosmarin",
  "Thymian",
  "Minze",
  "Koriander",
  "Dill",
  "Senf",
  "Hühnerbrust",
  "Hühnerschenkel",
  "Putenschnitzel",
  "Rindfleisch",
  "Schweinefleisch",
  "Lammfleisch",
  "Ente",
  "Garnelen",
  "Krabben",
  "Hummer",
  "Schalentiere",
  "Tintenfisch",
  "Scholle",
  "Thunfisch",
  "Forelle",
  "Kabeljau",
  "Schinken",
  "Salami",
  "Pfefferoni",
  "Sardellen",
  "Sardinen",
  "Makrele",
  "Forelle",
  "Heilbutt",
  "Hering",
  "Hühnereier",
  "Wachteleier",
  "Rindersteak",
  "Hähnchenschenkel",
  "Kaninchenfleisch",
  "Wildschwein",
  "Lachsforelle",
  "Forellenfilet",
  "Bisonfleisch",
  "Lachsfilet",
  "Steinbutt",
  "Schwertfisch",
  "Seelachs",
  "Schellfisch",
  "Kaninchenfilet",
];

// Create a weekly menu
const numberOfDaysInMenu = 7; // For example, 7 days for a week
const weeklyMenu = createWeeklyMenu(
  recipeTitleList,
  numberOfDaysInMenu,
  selectedCategories
);

function copyFilesToWeeklyMenu(sourceDir, destinationDir, menu) {
  deleteFolderRecursive(destinationDir);

  fs.readdir(sourceDir, (err, files) => {
    if (err) {
      console.error("Fehler beim Lesen des Quellverzeichnisses:", err);
      return;
    }

    if (!fs.existsSync(destinationDir)) {
      fs.mkdirSync(destinationDir);
    }

    menu.forEach((file) => {
      const sourcePath = path.join(sourceDir, file);
      const destinationPath = path.join(destinationDir, file);

      fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error("Fehler beim Kopieren der Datei:", err);
        } else {
        }
      });
    });

    console.log(
      "\x1b[32m",
      "You find your menu here: " + directoryPath + "/weekly-menu",
      "\x1b[0m"
    );
  });
}

copyFilesToWeeklyMenu(
  directoryPath,
  directoryPath + "/weekly-menu",
  weeklyMenu
);

// Print the weekly menu in the console
console.log("\x1b[32m", "--Weekly Menu--", "\x1b[0m");

if (Array.isArray(weeklyMenu)) {
  weeklyMenu.forEach((dish, index) => {
    console.log(`Day ${index + 1}: ${dish}`);
  });
} else {
  console.log(weeklyMenu);
}
