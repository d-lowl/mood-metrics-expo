import moment from 'moment';

export function getRangeFromDate(startDate,stopDate) {
  if(stopDate) {
    return getMultipleDayRange(moment(startDate), moment(stopDate));
  } else {
    return getOneDayRange(moment(startDate));
  }
}

export function getToday(){
  return moment(0,"HH");
}

export function getOneDayRange(date) {
  // let nextDate = date.clone();
  // nextDate.add(1,'days');
  return {
    from: date.clone(),
    to: date.clone().add(1,'days')
  }
}

export function getMultipleDayRange(date1, date2) {
  return {
    from: date1.clone(),
    to: date2.clone().add(1,'days')
  }
}

export function isInRange(x,a,b) {
  console.log(x)
  console.log(a)
  console.log(b)
  return x.isBetween(a,b,"day","[]");
}
