// Copyright (c) 2001-2003 Quadralay Corporation.  All rights reserved.
//

function  WWHBookGroups_Books(ParamTop)
{
  var  BookGrouping1;


  BookGrouping1 = ParamTop.fAddGrouping("Notices", null, null, null);
    BookGrouping1.fAddDirectory("Copyright", null, null, null, null);
  BookGrouping1 = ParamTop.fAddGrouping("What's New", null, null, null);
    BookGrouping1.fAddDirectory("WDMGRN", null, null, null, null);
    BookGrouping1.fAddDirectory("Admin", null, null, null, null);
    BookGrouping1.fAddDirectory("Doc", null, null, null, null);
  BookGrouping1 = ParamTop.fAddGrouping("Transport Planner Reference", null, null, null);
    BookGrouping1.fAddDirectory("User", null, null, null, null);
    BookGrouping1.fAddDirectory("swimuser", null, null, null, null);
  BookGrouping1 = ParamTop.fAddGrouping("Tutorials", null, null, null);
    BookGrouping1.fAddDirectory("wdmgtut", null, null, null, null);
    BookGrouping1.fAddDirectory("SWIMtut", null, null, null, null);
}

function  WWHBookGroups_ShowBooks()
{
  return true;
}

function  WWHBookGroups_ExpandAllAtTop()
{
  return false;
}
 function WWHBookGroups_ExpandAllAtTop() 
 { 
   return true; 
 }
