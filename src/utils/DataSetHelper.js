import moment from 'moment';

export function prepareDataSet(entries,isMultiDay) {
  if(isMultiDay) {
    return formatForGraph(reduceWithMedian(assembleDuplicates(roundByDays(convertToMoment(entries)))));
  } else {
    return formatForGraph(reduceWithMedian(assembleDuplicates(roundByMinutes(convertToMoment(entries),5))));
  }
}

export function getFloatHours(datetime) {
  var _datetime = moment.unix(datetime);
  return _datetime.hours() + _datetime.minutes() / 60.0;
}

function formatForGraph(entries) {
  var data = [[],[],[],[],[],[]];
  var max = NaN, min = NaN;
  var previous = NaN, minDelta = NaN;
  for (var v in entries) {
    let date = moment(v).unix();
    let delta = date - previous;
    minDelta = delta > minDelta ? minDelta : delta;
    max = date < max ? max : date;
    min = date > min ? min : date;
    previous = date;

    data[0].push({
      "time": date,
      "value": entries[v].anger
    })
    data[1].push({
      "time": date,
      "value": entries[v].disgust
    })
    data[2].push({
      "time": date,
      "value": entries[v].fear
    })
    data[3].push({
      "time": date,
      "value": entries[v].joy
    })
    data[4].push({
      "time": date,
      "value": entries[v].sadness
    })
    data[5].push({
      "time": date,
      "value": entries[v].surprise
    })
  }

  return {
    data,
    count: Math.ceil(max - min),
    mean: (max - min) / (entries.length - 1),
    minDelta
  };
}

function median(arr) {
  const sorted = arr.sort((a,b) => a - b);
  const lowMiddle = Math.floor((sorted.length - 1) / 2);
  const highMiddle = Math.ceil((sorted.length - 1) / 2);
  const median = (sorted[lowMiddle] + sorted[highMiddle]) / 2;
  return median;
}

function reduceWithMedian(entries) {
  for (var v in entries){
    entries[v].anger = median(entries[v].anger);
    entries[v].disgust = median(entries[v].disgust);
    entries[v].fear = median(entries[v].fear);
    entries[v].joy = median(entries[v].joy);
    entries[v].sadness = median(entries[v].sadness);
    entries[v].surprise = median(entries[v].surprise);
  }
  return entries;
}

//TODO: refactor, this is disgusting
function assembleDuplicates(entries) {
  var _entries = {};
  entries.forEach(x => {
    if(_entries[x.createdAt.toISOString()] == undefined)
    {
      _entries[x.createdAt.toISOString()] = {
        anger: [x.anger],
        disgust: [x.disgust],
        fear: [x.fear],
        joy: [x.joy],
        sadness: [x.sadness],
        surprise: [x.surprise]
      }
    }
    else
    {
      _entries[x.createdAt.toISOString()].anger.push(x.anger);
      _entries[x.createdAt.toISOString()].disgust.push(x.disgust);
      _entries[x.createdAt.toISOString()].fear.push(x.fear);
      _entries[x.createdAt.toISOString()].joy.push(x.joy);
      _entries[x.createdAt.toISOString()].sadness.push(x.sadness);
      _entries[x.createdAt.toISOString()].surprise.push(x.surprise);
    }
  })
  return _entries;
}

function convertToMoment(entries) {
  return entries.map(x => ({
    ...x,
    createdAt: moment(x.createdAt)
  }));
}

function roundByMinutes(entries, n) {
  return entries.map(x => ({
    ...x,
    createdAt: roundMomentByMinutes(x.createdAt,n),
    trueCreatedAt: x.createdAt
  }))
}

function roundByDays(entries) {
  return entries.map(x => ({
    ...x,
    createdAt: roundMomentByDays(x.createdAt),
    trueCreatedAt: x.createdAt
  }))
}

function roundMomentByMinutes(m,n) {
  console.log(m);
  const _m = m.clone();
  const rounded = Math.round(_m.minutes() / n) * n;
  _m.minutes(rounded).second(0);
  return _m;
}

function roundMomentByDays(m) {
  const _m = m.clone();
  const rounded = m.startOf('day');
  // console.log(_m.toISOString() + " => " + rounded.toISOString());
  return rounded;
}
