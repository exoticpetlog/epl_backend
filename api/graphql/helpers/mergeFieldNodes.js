function mergeSelections(info) {
  const mergedSelections = [];
  for (let i in info.fieldNodes) {
    const { selections } = info.fieldNodes[i].selectionSet;
    for (let j in selections) {
      mergedSelections.push(selections[j].name.value);
    }
  }
  return mergedSelections;
}

module.exports = mergeSelections;
