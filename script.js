function filterData(data){
  let shopListByType = {};
  data.forEach(element => {
    if(element.options.key==="venture"){
      if(element.options.type in shopListByType){
        shopListByType[element.options.type].push(element.options.pillButton.name)
      } else {
        shopListByType[element.options.type] = [element.options.pillButton.name];
      }
    }
  });
  return shopListByType;
}

function tabulateData(dataByType) {
  const dataAreaDiv = document.getElementById('dataArea');
  for(shopType in dataByType){
    const newHeading = document.createElement('h2');
    newHeading.innerText = `${shopType.split('_').join(' ')} - ${dataByType[shopType].length}`;
    const newTable = document.createElement('table');
    const newTableHeaderRow = document.createElement('tr');
    const newTableHeaderContent = document.createElement('th');
    newTableHeaderContent.innerText = "Shop Name";
    newTableHeaderRow.appendChild(newTableHeaderContent);
    newTable.appendChild(newTableHeaderRow);
    dataAreaDiv.append(newHeading, newTable);
    for(shop of dataByType[shopType]){
      const newShopRow = document.createElement('tr');
      const newShopContent = document.createElement('td');
      newShopContent.innerText = shop;
      newShopRow.appendChild(newShopContent);
      newTable.appendChild(newShopRow);
    }
  }
}


fetch("https://business.upland.me/pins")
.then(response => response.json())
.then(data => filterData(data))
.then(shopList => tabulateData(shopList));