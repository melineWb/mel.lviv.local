let keysParser = (keys) => {
  keys = keys.split(',');
  keys = keys.map(function(item) {
    return item.trim();
  });

  return keys;
}

module.exports = keysParser;
