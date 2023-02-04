export default function getCategories(data) {
  let allTags = [];
  let allTagsSplit = [];
  let uniqueTags = [];
  // Join all tagsre
  data.forEach((element) => {
    allTags.push(element.tags);
  });

  allTags.forEach((element) => {
    allTagsSplit.push(element.split(",").flatMap((num) => num));
  });

  allTagsSplit
    .flatMap((num) => num)
    .forEach((element) => {
      if (!uniqueTags.includes(element)) {
        uniqueTags.push(element);
      }
    });
  return uniqueTags.filter((n) => n);
}
