import moment from 'moment';

export function getRangeFromDate(startDate) {
  return getOneDayRange(moment(startDate));
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
