
export function ReFormatDate(dateString: Date) {
  // Parse the date string into a JavaScript Date object
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // Handle invalid date strings
    return "Invalid Date";
  }

  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  const thaiDate = `${day} ${thaiMonths[monthIndex]} ${year}`;

  return thaiDate;
}