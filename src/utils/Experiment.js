import moment from 'moment';
import { AsyncStorage } from 'react-native';
import { isInRange } from './DateTimeHelper.js';

let weekA_start = moment("05/02/2018", "DD/MM/YYYY");
let weekA_end   = moment("11/02/2018", "DD/MM/YYYY");

let weekB_start = moment("12/02/2018", "DD/MM/YYYY");
let weekB_end   = moment("18/02/2018", "DD/MM/YYYY");

export async function applyExperimentalSettings(group) {
  var group = await AsyncStorage.getItem("auth:group");

  console.log("Group: "+group+ " ("+typeof(group)+")");

  console.log("1");
  //if in experiment –> lock settings
  if(isInRange(moment().utc(),weekA_start,weekB_end) && group != 0) {
    await AsyncStorage.setItem("settings:locked","true");
  } else {
    await AsyncStorage.setItem("settings:locked","false");
    return;
  }

  console.log("2");
  //Week A
  if(isInRange(moment().utc(),weekA_start,weekA_end)) {
    if(group === "1") {
      await AsyncStorage.setItem("settings:is_relative","true");
    } else if(group === "2") {
      await AsyncStorage.setItem("settings:is_relative","false");
    }
    return;
  }

  console.log("3");
  //Week B
  if(isInRange(moment().utc(),weekB_start,weekB_end)) {
    if(group === "1") {
      await AsyncStorage.setItem("settings:is_relative","false");
    } else if(group === "2") {
      await AsyncStorage.setItem("settings:is_relative","true");
    }
    return;
  }
}
