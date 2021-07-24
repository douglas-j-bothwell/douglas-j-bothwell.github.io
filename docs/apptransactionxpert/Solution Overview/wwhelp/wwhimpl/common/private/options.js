// Copyright (c) 2001-2003 Quadralay Corporation.  All rights reserved.
//

function  WWHCommonSettings_Object()
{
  this.mTitle = "Solution Overview";

  this.mbCookies            = true;
  this.mCookiesDaysToExpire = 30;
  this.mCookiesID           = "73wyAu1F95I";

  this.mAccessible = "false";

  this.mbSyncContentsEnabled  = true;
  this.mbPrevEnabled          = true;
  this.mbNextEnabled          = true;
  this.mbRelatedTopicsEnabled = true;
  this.mbEmailEnabled         = true;
  this.mbPrintEnabled         = true;
  this.mbBookmarkEnabled      = true;
  this.mbPDFEnabled           = true;

  this.mEmailAddress = "support@opnet.com";

  this.mRelatedTopics = new WWHCommonSettings_RelatedTopics_Object();
  this.mALinks        = new WWHCommonSettings_ALinks_Object();
  this.mPopup         = new WWHCommonSettings_Popup_Object();

  this.mbHighlightingEnabled        = true;
  this.mHighlightingForegroundColor = "#FFFFFF";
  this.mHighlightingBackgroundColor = "#00626F";
}

function  WWHCommonSettings_RelatedTopics_Object()
{
  this.mWidth = 250;

  this.mTitleFontStyle       = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 10pt";
  this.mTitleForegroundColor = "#FFFFFF";
  this.mTitleBackgroundColor = "#999999";

  this.mFontStyle       = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 8pt";
  this.mForegroundColor = "#2E5E45";
  this.mBackgroundColor = "#FFFFFF";
  this.mBorderColor     = "#666666";

  this.mbInlineEnabled = true;
  this.mInlineFontStyle = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 10pt";
  this.mInlineForegroundColor = "#2E5E45";
}

function  WWHCommonSettings_ALinks_Object()
{
  this.mbShowBook = false;

  this.mWidth  = 250;
  this.mIndent = 17;

  this.mTitleFontStyle       = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 10pt";
  this.mTitleForegroundColor = "#FFFFFF";
  this.mTitleBackgroundColor = "#999999";

  this.mFontStyle       = "font-family: Verdana, Arial, Helvetica, sans-serif ; font-size: 8pt";
  this.mForegroundColor = "#00657C";
  this.mBackgroundColor = "#FFFFFF";
  this.mBorderColor     = "#666666";
}

function  WWHCommonSettings_Popup_Object()
{
  this.mWidth = 200;

  this.mBackgroundColor = "#00626F";
  this.mBorderColor     = "#999999";
}
