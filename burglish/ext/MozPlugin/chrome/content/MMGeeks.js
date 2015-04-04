//* Copyright 2008 MMGeeks Organization Thet Twe (thettwe@mmgeeks.org,thettwe@mmgeeks.com,thettwe@poemscorner.com)
function MMGeeks() {
   this.modeArr = new Array();
   this.modeArr.push("Normal");
   this.modeArr.push("Burglish");
   this.modeArr.push("Burmese");
   
   this.prefUtils = new MMGeeksPreferencesUtil();
}

MMGeeks.prototype = {
      
	// Control constants
   MMGEEKS_NORMAL: 0,
   MMGEEKS_BURGLISH : 1,
   MMGEEKS_BURMESE : 2,
   prefUtils : null,
   modeArr : null,
   doc : null,
   currentId : null,
   
   burglish : false,
   burmese : false,
   showTips : false,
   
	openConfig: function() {
	   window.openDialog('chrome://mmgeeksinput/content/preferences.xul');  
	},
	
	switchTypeMode: function()
	{
      var mode = this.prefUtils.getPreference("int",MMGeeksPreferencesUtil.typeMode);
      mode = (mode + 1) % 3;
      this.prefUtils.setPreference("int",MMGeeksPreferencesUtil.typeMode,mode);
      this.updateOptions();
	},

	 
	checkBurglish: function(target){
     if (document.getElementById('burglish_chkb_'+target).getAttribute("checked") == "true")
   	   this.prefUtils.setPreference("int",MMGeeksPreferencesUtil.typeMode,this.MMGEEKS_BURGLISH);
     else 
   	   this.prefUtils.setPreference("int",MMGeeksPreferencesUtil.typeMode,this.MMGEEKS_NORMAL);
     this.updateOptions();
	},
	
	checkBurmese: function(target){
     if (document.getElementById('burmese_chkb_'+target).getAttribute("checked") == "true")
     {
   	   this.prefUtils.setPreference("int",MMGeeksPreferencesUtil.typeMode,this.MMGEEKS_BURMESE);
   	   this.prefUtils.setPreference("bool",MMGeeksPreferencesUtil.showTips,false);
     }
     else 
   	   this.prefUtils.setPreference("int",MMGeeksPreferencesUtil.typeMode,this.MMGEEKS_NORMAL);
     this.updateOptions();
	},

	checkShowTips: function(target){
     if (document.getElementById('showtips_chkb_'+target).getAttribute("checked") == "true")
   	   this.prefUtils.setPreference("bool",MMGeeksPreferencesUtil.showTips,true);
  	  else 
   	   this.prefUtils.setPreference("bool",MMGeeksPreferencesUtil.showTips,false);
      this.updateOptions();   	   
	},

	checkCharList: function(target){
      _activate("bchlist",true);
	},
	
	updatePopup: function(){
      document.getElementById('burglish_chkb_popup').setAttribute("checked",this.burglish);
      document.getElementById('burmese_chkb_popup').setAttribute("checked",this.burmese);
      document.getElementById('showtips_chkb_popup').setAttribute("checked",this.showTips);
      document.getElementById('charlist_chkb_popup').setAttribute("checked",this.showCharList);
	},

	updateMenu: function(){
      document.getElementById('burglish_chkb_menu').setAttribute("checked",this.burglish);
      document.getElementById('burmese_chkb_menu').setAttribute("checked",this.burmese);
      document.getElementById('showtips_chkb_menu').setAttribute("checked",this.showTips);
      document.getElementById('charlist_chkb_menu').setAttribute("checked",this.showCharList);      
	},

   insertHeaderElements : function() {
        var x = window._content;
        var pageHead = x.document.getElementsByTagName("head")[0];
    
        if (pageHead == null) { // if page head doesn't exist, create one
          var pageBody = x.document.getElementsByTagName("html")[0];
          var pageHead = x.document.createElement("head");
    
          pageBody.appendChild(pageHead);
    
          var pageHead = x.document.getElementsByTagName("head")[0];
        }
       
	    var cssCheck = x.document.getElementById("mmgeeks_css");

        if (cssCheck == null) { // insert stylesheet reference
          var css = x.document.createElement("link");
          css.setAttribute("id", "mmgeeks_css");
          css.setAttribute("rel", "stylesheet");
          css.setAttribute("type", "text/css");
          css.setAttribute("href", "chrome://mmgeeksinput/skin/mmgeeksinput.css");
    
          pageHead.appendChild(css);
        }    
    },	

	updateOptions : function()
	{	
   	this.showTips = this.prefUtils.getPreference("bool",MMGeeksPreferencesUtil.showTips);
	   var mode = this.prefUtils.getPreference("int",MMGeeksPreferencesUtil.typeMode);

	   switch (mode)
	   {
	      case this.MMGEEKS_BURGLISH : this.burglish = true ; this.burmese = false; break;
	      case this.MMGEEKS_BURMESE  : this.burglish = false; this.burmese = true ; break;
	      case this.MMGEEKS_NORMAL   : this.burglish = false; this.burmese = false; break;	      	      
	      default : return ; break;	      
	   }
	   
      document.getElementById('mmgeeks_status_label').value = this.modeArr[mode];
	},
	
	init: function(e)
	{
	   this.doc = e.originalTarget;
      this.updateOptions();
      
	   var count= 0;      
      
      var arr = new Array();
	            
	   var txtArr = this.doc.getElementsByTagName("textarea");
      for (i=0;i<txtArr.length;i++)
	      arr.push(txtArr[i]);
	      
	   var tmpArr = this.doc.getElementsByTagName("input");
           
	   for (i=0;i<tmpArr.length;i++)
	     if (tmpArr[i].type=="text")
	      arr.push(tmpArr[i]);

      if (arr.length > 0) 
      {
         this.insertHeaderElements();
         initCharacterList();
      }

	   for (i=0;i<arr.length;i++)
	   {
	      count++;	      
	      if (arr[i].id == "") arr[i].setAttribute("id","mmgeeks_ff_ext_" + count);
	      initTextarea({id: arr[i].id, toburmese : true, self:true , bbcode:false, rows:10});
	   }	   
	},
	
   initTabChangeListener: function()
   {
      gBrowser.tabContainer.addEventListener("TabSelect", function(e) { mmgeeks.tabSelected(e); }, false);      
   },
   
   tabSelected: function(e)
   {
      this.doc = gBrowser.selectedBrowser.contentDocument;   
   }
};

mmgeeks = new MMGeeks();
document.addEventListener("DOMContentLoaded", function(e) { mmgeeks.init(e); }, true);
window.addEventListener("load", function() { mmgeeks.initTabChangeListener(); }, false);
//document.addEventListener("load", function(e) { mmgeeks.init(e); }, true);
