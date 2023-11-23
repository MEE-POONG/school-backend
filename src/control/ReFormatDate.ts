import { monthArray } from "@/data/date";

export function ReFormatDate(dateString: any, language: string) {
  // Parse the date string into a JavaScript Date object
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // Handle invalid date strings
    return "Invalid Date";
  }

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // Format in English
  const englishDate = `${day} ${monthArray[monthIndex].EN} ${year}`;

  // Format in Thai (Buddhist calendar year)
  const thaiYear = year + 543;
  const thaiDate = `${day} ${monthArray[monthIndex].TH} ${thaiYear}`;

  let dateShow = '';
  if (language === "TH") {
    dateShow = thaiDate;
  } else { // Assuming default language is English
    dateShow = englishDate;
  }

  return dateShow;
}