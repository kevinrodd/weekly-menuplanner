# Weekly Recipe Menu Generator

This Node.js script allows you to search a folder for recipe files in various formats by their titles and, based on selected categories, it creates a balanced weekly menu. It also copies these recipes to a dedicated folder.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Example](#example)
- [License](#license)

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YourUsername/RecipeManagement.git

## Usage
2. **Run the Script:**

To execute the recipe management and menu creation, use the following command, where DIRECTORY_PATH is the path to the directory containing recipe files, and SELECTED_CATEGORIES is a comma-separated list of selected categories in your recipies title language.

1. **Clone the Repository:**

   ```bash
   node script.js dir=DIRECTORY_PATH

## View the Weekly Menu:

The script will create a weekly menu based on the selected categories and print it to the console.

## Example
    node script.js dir="D:/Recipes"  # Example call with directory path

    --Weekly Menu--
    Day 1: Bunte Asia Bowl mit Avocado & grünem Spargel.pdf
    Day 2: Hähnchen-Reispfanne mit Aprikosen-Minz-Joghurt.pdf
    Day 3: Thunfischsalat mit Butterbohnen.pdf
    Day 4: Pizzetta Caprese mit Mozzarella, Antipasti und Rucola.pdf
    Day 5: Deftiger Schinken-Zucchinistrudel.pdf
    Day 6: Ofen-Seehecht auf Tomatenbett.pdf
    Day 7: Mediterraner Burger mit gefülltem Rindfleischpatty.pdf


## License
This project is licensed under the MIT License. See the LICENSE file for more details.
