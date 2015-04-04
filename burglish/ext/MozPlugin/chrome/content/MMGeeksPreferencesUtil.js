//* Copyright 2008 MMGeeks Organization Thet Twe (thettwe@mmgeeks.org,thettwe@mmgeeks.com,thettwe@poemscorner.com)
function MMGeeksPreferencesUtil() {
  this.prefService = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService);
  this.prefService = this.prefService.getBranch("");
}

// Static strings that specify the names of the preferences used by modifyheaders
MMGeeksPreferencesUtil.typeMode     = "extensions.mmgeeksinput.typeMode";
MMGeeksPreferencesUtil.showTips     = "extensions.mmgeeksinput.showTips";

// Convenience method to get a user preference value
MMGeeksPreferencesUtil.prototype.getPreference = function(type, name) {
  var prefValue;
  
    if (type=='bool') {
      prefValue = this.prefService.getBoolPref(name);
    } else if (type=='char') {
      prefValue = this.prefService.getCharPref(name);
    } else if (type=='int') {
      prefValue = this.prefService.getIntPref(name);
    }
  return prefValue;
}

// Convenience method to set a user preference
MMGeeksPreferencesUtil.prototype.setPreference = function(type, name, value) {
  if (type=='bool') {
    this.prefService.setBoolPref(name, value);
  } else if (type=='char') {
    this.prefService.setCharPref(name, value);
  } else if (type=='int') {
    this.prefService.setIntPref(name, value);
  }
}

MMGeeksPreferencesUtil.prototype.deletePreference = function(name) {
  this.prefService.clearUserPref(name);
}
