const formatDate = (date, format) => {
  if (!format) format = "YYYY年MM月DD日";
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ("0" + date.getDate()).slice(-2));
  return format;
};

module.exports = {
  formatDate: formatDate,
};
