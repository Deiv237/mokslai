function filterItems(arr, query) {
    if (!Array.isArray(arr)) {
      return 'Klaida: pateiktas duomenų tipas nėra masyvas';
    }
  
    const filtered = arr.filter(item => item.toLowerCase().includes(query.toLowerCase()))
                        .sort()
                        .map(item => `*${item}`);
    return filtered;
  }
  
  const friends = ["Rika", "Jacob", "Alex", "Oliver", "Marika"];
  
  console.log(filterItems(friends, 'ka'));
  console.log(filterItems(friends, 'e'));
  