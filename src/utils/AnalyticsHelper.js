import { sendAnalytics } from './GraphQL.js';
import { apolloClient } from '../Store';
import { Platform, AsyncStorage } from 'react-native';

export const analyticsTypes = {
  ENTER_SCREEN: 'ENTER_SCREEN',
  OPEN_APPLICATION: 'OPEN_APPLICATION',
  SUBMIT_ENTRY: 'SUBMIT_ENTRY'
};

var isSet = false;
var deviceDetails = {};

function initSession() {
  if(!isSet) {
    deviceDetails = getDeviceDetails();
  }
}

function getDeviceDetails() {
  var details = {
    deviceName: Expo.Constants.deviceName,
    deviceYearClass: Expo.Constants.deviceYearClass,
    isDevice: Expo.Constants.isDevice
  };
  if(Platform.OS === "ios") {
    details = {
      ...details,
      os: 'ios',
      model: Expo.Constants.platform.ios.model,
      platform: Expo.Constants.platform.ios.platform,
      systemVersion: Expo.Constants.platform.ios.systemVersion
    }
  }
  else if(Platform.OS === "android") {
    details = {
      ...details,
      os: 'android',
      systemVersion: Expo.Constants.systemVersion
    }
  }
  return details;
}

export function getEnterScreenPayload(screen) {
  return {
    screen
  };
}

export function getSubmitEntryPayload(inRelativeMode, withRelativeValue){
  return {
    inRelativeMode,
    withRelativeValue
  }
}

export function getOpenApplicationPayload() {
  return {};
}

export function submitAnalytics(type, payload) {
  initSession();
  apolloClient.mutate({mutation: sendAnalytics, variables: {
      type,
      payload,
      sessionId: Expo.Constants.sessionId,
      deviceDetails,
      devMode: __DEV__,
      appVersion: Expo.Constants.manifest.version
    }
  })
}

export async function getGeekData() {
  let secret = await AsyncStorage.getItem("auth:secret");
  return JSON.stringify({
    deviceDetails,
    secret
  });
}
