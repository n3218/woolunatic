const TranslateToWeight = val => {
  const weightValues = {
    1000: "Cobweb",
    800: "Lace",
    600: "Havy Lace",
    500: "Light Fingering",
    400: "Fingering",
    300: "Sport",
    200: "DK",
    150: "Aran",
    100: "Chunky",
    50: "Super Chunky"
  }

  if (val >= 1000) return weightValues[1000]
  if (val >= 800 && val < 1000) return weightValues[800]
  if (val >= 600 && val < 800) return weightValues[600]
  if (val >= 500 && val < 600) return weightValues[500]
  if (val >= 400 && val < 500) return weightValues[400]
  if (val >= 300 && val < 400) return weightValues[300]
  if (val >= 200 && val < 300) return weightValues[200]
  if (val >= 150 && val < 200) return weightValues[150]
  if (val >= 100 && val < 150) return weightValues[100]
  if (val >= 50 && val < 100) return weightValues[50]
}

export default TranslateToWeight
