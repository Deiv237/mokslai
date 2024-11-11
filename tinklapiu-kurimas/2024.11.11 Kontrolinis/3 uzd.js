function sumPositiveNumbers() {
    let sum = 0;
    let input;
    while (true) {
      input = parseInt(prompt("iveskite skaiciu:"));
      if (input < 0) {
        break;
      }
      if (!isNaN(input)) {
        sum += input;
      }
    }
    console.log(`Visu ivestu teigiamu skaiciu suma: ${sum}`);
  }
  
  sumPositiveNumbers();
  