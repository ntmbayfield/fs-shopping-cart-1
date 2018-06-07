const fs = require('fs')

function addItem (path, item) {
  if (!item.name || !item.quantity) return

  const current = fs.readFileSync(path, 'utf-8').match(/\n/g)
  const count = current ? current.length + 1 : 1

  const text = `${count}\t${item.name}\t${item.quantity}\n`
  fs.writeFileSync(path, text, { flag: 'a' })
  //{ flag: 'a' } in the above line this is an optional parameter which is an object, with three potential properties.  Flag is one of those properties, and the 'a' means - Open file for appending and the file is created if it does not exist.

}

function getItem (path, idx) {
  const current = fs.readFileSync(path, 'utf-8').split('\n')
  const item = current[idx - 1]
  if (!item) return null

  const properties = item.split('\t')
  return {
    name: properties[1],
    quantity: parseInt(properties[2])
  }
}

function updateItem (path, idx, item) {
  //create current variable that will reference the item that's getting updated
  const current = fs.readFileSync(path, 'utf-8').split('\n');
  let itemToUpdate = current[idx-1];
  console.log("item to update looks like," + itemToUpdate);

  const arrOfObjProperties = itemToUpdate.split('\t');

  //then we need to modify the item name if necessary, and change the item quantity to the new amount using
  if (!itemToUpdate) {
    return null;
  }

  else if (!item.name || !item.quantity) {
    return path
  }

  else {
  //properties should look like [count, itemName, quantity]
  arrOfObjProperties[1] = '\t' + item.name + '\t';
  arrOfObjProperties[2] = item.quantity;
  const updatedText = arrOfObjProperties.join('');
  current[idx-1] = updatedText;
  const newShoppingList = current.join('\n');
  console.log(newShoppingList);

  //then write the updated object using writeFileSync
  fs.writeFileSync(path, newShoppingList);
  }
}

module.exports = {
  addItem,
  getItem,
  updateItem
}
