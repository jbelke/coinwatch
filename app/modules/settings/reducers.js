// @flow

import settings from 'electron-settings';
import { assign } from 'lodash';
import { ipcRenderer } from 'electron';
import {
  SETTINGS_SAVE_COIN,
  SETTINGS_REMOVE_COIN,
  SETTINGS_MAIN_UPDATE,
  SETTINGS_AUTOLAUNCH_ON,
  SETTINGS_AUTOLAUNCH_OFF,
} from './actions';

const defaultSettings = {
  decimal: 4,
};
const initialState = assign(defaultSettings, settings.getAll());

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_SAVE_COIN:
    case SETTINGS_REMOVE_COIN:
      return { ...state, coins: settings.get('coins') };
      break;
    case SETTINGS_AUTOLAUNCH_ON:
      ipcRenderer.send('autolaunch-on');

      return state;
      break;
    case SETTINGS_AUTOLAUNCH_OFF:
      ipcRenderer.send('autolaunch-off');

      return state;
      break;
    case SETTINGS_MAIN_UPDATE:
      return initialState;
      break;
    default:
      return state;
  }
}