// Copyright (c) 2001-2003 Quadralay Corporation.  All rights reserved.
//

function  WWHJavaScriptSettings_Object()
{
  this.mHoverText = new WWHJavaScriptSettings_HoverText_Object();

  this.mTabs      = new WWHJavaScriptSettings_Tabs_Object();
  this.mTOC       = new WWHJavaScriptSettings_TOC_Object();
  this.mIndex     = new WWHJavaScriptSettings_Index_Object();
  this.mSearch    = new WWHJavaScriptSettings_Search_Object();
  this.mFavorites = new WWHJavaScriptSettings_Favorites_Object();
}

function  WWHJavaScriptSettings_HoverText_Object()
{
  this.mbEnabled = true;

  this.mFontStyle = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 8pt";

  this.mWidth = 150;

  this.mForegroundColor = "#000000";
  this.mBackgroundColor = "#FFFFCC";
  this.mBorderColor     = "#999999";
}

function  WWHJavaScriptSettings_Tabs_Object()
{
  this.mFontStyle = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 10pt ; font-weight: normal";

  this.mSelectedTabForegroundColor = "#FFFFFF";

  this.mDefaultTabForegroundColor = "#000000";
}

function  WWHJavaScriptSettings_TOC_Object()
{
  this.mbShow = true;

  this.mFontStyle = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 8pt";

  this.mHighlightColor = "#CCCCCC";
  this.mEnabledColor   = "#00002B";
  this.mDisabledColor  = "black";

  this.mIndent = 17;
}

function  WWHJavaScriptSettings_Index_Object()
{
  this.mbShow = true;

  this.mFontStyle = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 8pt";

  this.mHighlightColor = "#CCCCCC";
  this.mEnabledColor   = "#00002B";
  this.mDisabledColor  = "black";

  this.mIndent = 17;

  this.mNavigationFontStyle      = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 7pt ; font-weight: bold";
  this.mNavigationCurrentColor   = "black";
  this.mNavigationHighlightColor = "#CCCCCC";
  this.mNavigationEnabledColor   = "#00626F";
  this.mNavigationDisabledColor  = "#999999";
}

function  WWHJavaScriptSettings_Index_DisplayOptions(ParamIndexOptions)
{
  ParamIndexOptions.fSetThreshold(500);
  ParamIndexOptions.fSetSeperator(" - ");
}

function  WWHJavaScriptSettings_Search_Object()
{
  this.mbShow = true;

  this.mFontStyle = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 8pt";

  this.mHighlightColor = "#CCCCCC";
  this.mEnabledColor   = "blue";
  this.mDisabledColor  = "black";

  this.mbResultsByBook = true;
  this.mbShowRank      = true;
}

function  WWHJavaScriptSettings_Favorites_Object()
{
  this.mbShow = false;

  this.mFontStyle = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 8pt";

  this.mHighlightColor = "#CCCCCC";
  this.mEnabledColor   = "#00002B";
  this.mDisabledColor  = "black";
}
