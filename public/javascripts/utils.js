let characters = [
  {
    id: 1,
    name: "Anakin Skywalker",
    category: "Jedi",
    lightsaberColor: "blue",
    species: "human",
    gender: "male",
    height: 170,
    weight: 165,
    description: "A great warrior, but sensitive to the dark side...",
    img:
      "https://raw.githubusercontent.com/joseherrera7/star-wars/master/src/assets/images/anakin-skywalker.jpg",
  },
  {
    id: 2,
    name: "Obi Wan Kenobi",
    category: "Jedi",
    lightsaberColor: "blue",
    species: "human",
    gender: "male",
    height: 165,
    weight: 170,
    description: "Master in defense, no blaster can hit him.",
    img:
      "https://raw.githubusercontent.com/joseherrera7/star-wars/master/src/assets/images/obi-wan.jpg",
  },
  {
    id: 3,
    name: "Darth Vader",
    category: "Sith",
    lightsaberColor: "red",
    species: "human",
    gender: "male",
    height: 190,
    weight: 200,
    description: "Extremely powerful sith, no heart, just power...",
    img:
      "https://raw.githubusercontent.com/joseherrera7/star-wars/master/src/assets/images/darth-vader.jpg",
  },
  {
    id: 4,
    name: "Master Yoda",
    category: "Jedi",
    lightsaberColor: "green",
    species: "human",
    gender: "male",
    height: 60,
    weight: 50,
    description: "Wise and powerful, very little green guy...",
    img:
      "https://raw.githubusercontent.com/joseherrera7/star-wars/master/src/assets/images/yoda.jpg",
  },
];

function findElement(id) {
  var character = null;
  character = characters.find((element) => element.id === id);
  return character;
}

function setElement(element) {
  try {
    characters.push(element);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function putElement(id, patch) {
  try {
    const char = findElement(id);
    if (char) {
      characters[characters.indexOf(char)] = patch;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

function deleteElement(id, patch) {
    try {
      const char = findElement(id);
      if (char) {
        let newCharacters = characters.splice(characters.indexOf(char),1)
        characters = newCharacters;
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  
exports.characters = characters;
exports.findElement = findElement;
exports.setElement = setElement;
exports.putElement = putElement;
exports.deleteElement = deleteElement;
