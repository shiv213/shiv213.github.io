const buildDate = new Date(process.env.SITE_BUILD_DATE || Date.now());

if (Number.isNaN(buildDate.getTime())) {
  throw new Error("SITE_BUILD_DATE must be a valid date");
}

function isReleased(date) {
  const releaseDate = date instanceof Date ? date : new Date(date);
  return !Number.isNaN(releaseDate.getTime()) && releaseDate <= buildDate;
}

function releasedItems(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(item => isReleased(item.date));
}

module.exports = { isReleased, releasedItems };
