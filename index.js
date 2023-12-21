let baseInfo = {
  creationDate: {
    date: '03/12/2023',
    chakras: [7, 4, 3, 3, 7]
  }
};

function getTodaysDate() {
  let dateObj = new Date();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let year = dateObj.getFullYear();
  return day + "/" + month + "/" + year;
}

function calculateDaysBetweenDates(dateString1, dateString2) {
  function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
  }

  const date1 = parseDate(dateString1);
  const date2 = parseDate(dateString2);

  const date1ms = date1.getTime();
  const date2ms = date2.getTime();

  const timeDifference = date2ms - date1ms;
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return Math.round(daysDifference);
}

const startDateString = '22/02/2027';
const endDateString = '22/02/2026';

const daysBetween = calculateDaysBetweenDates(startDateString, endDateString);

function calcDayChakra(date) {
  let baseInfoCopy = JSON.parse(JSON.stringify(baseInfo));
  const baseDate = baseInfoCopy.creationDate.date;
  const daysBetween = calculateDaysBetweenDates(baseDate, date);
  let chakras = baseInfoCopy.creationDate.chakras;
  for (let d = 0; d < daysBetween; d++) {
    chakras = iterate(chakras);
  }
  return chakras;
}

function calcDayByChakras(chakras, chakrasToday) {
  let days = 0;
  while (chakras.toString() !== chakrasToday.toString()) {
    chakrasToday = iterate(chakrasToday);
    days++;
  }
  return days;
}

function iterate(chakras) {
  if (chakras[4] === 7) {
      chakras[4] = 1;
      if (chakras[3] === 7) {
        chakras[3] = 1;
        if (chakras[2] === 7) {
          chakras[2] = 1;
          if (chakras[1] === 7) {
            chakras[1] = 1;
            if (chakras[0] === 7) {
              chakras[0] = 1;
            }  else {
              chakras[0]++;
            }  
          } else {
            chakras[1]++;
          }  
        } else {
          chakras[2]++;
        }        
      } else {
        chakras[3]++;
      }
    } else {
      chakras[4]++;
    }
  return chakras;
}

function displayChakras(chakras) {
  const chakraContainer = document.getElementById('chakraContainer');

  chakras.forEach(chakraValue => {
    const chakraDiv = document.createElement('div');
    chakraDiv.className = 'chakra';
    
    const chakraImage = document.createElement('img');
    chakraImage.src = `img/chakras/${chakraValue}.svg`;
    chakraImage.alt = '';
    
    chakraDiv.appendChild(chakraImage);
    chakraContainer.appendChild(chakraDiv);
  });
}

const dateToCalculate = getTodaysDate();
const resultChakras = calcDayChakra(dateToCalculate);
displayChakras(resultChakras);