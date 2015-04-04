using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Drawing.Design;
using System.Windows.Forms.Design;


namespace BurglishControls
{
    /// <summary>
    /// Control keystroke conversion mode
    /// </summary>
    public enum BurglishMode
    {
        /// <summary>
        /// Direct input
        /// </summary>
        None,
        /// <summary>
        /// Keystroke is converted according to usual typewrite keyboard layout
        /// </summary>
        Typewriter,
        /// <summary>
        /// Phonetically convert to Myanmar character from romanized input
        /// </summary>
        Phonetic
    }

    /// <summary>
    /// server control for Myanmar Text Input
    /// </summary>
    [DefaultProperty("Text")]
    [ToolboxData("<{0}:BurglishTextBox runat=server></{0}:BurglishTextBox>")]
    public class BurglishTextBox : TextBox
    {
        protected BurglishMode _burglishMode = BurglishMode.Phonetic;

        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            Page.RegisterRequiresControlState(this);
        }

        protected override object SaveControlState()
        {
            object baseState = base.SaveControlState();

            return new Pair(baseState, _burglishMode);
        }

        protected override void LoadControlState(object savedState)
        {
            Pair p = savedState as Pair;
            if (p != null)
            {
                base.LoadControlState(savedState);
                _burglishMode = (BurglishMode)p.Second;
            }
        }

        protected override void OnPreRender(EventArgs e)
        {
            base.OnPreRender(e);

            // add missing Myanmar font names
            if (this.Style[HtmlTextWriterStyle.FontFamily] == null)
            {
                if (!String.IsNullOrEmpty(this.Font.Name))
                    this.Style[HtmlTextWriterStyle.FontFamily] = this.Font.Name;
                else
                    this.Style[HtmlTextWriterStyle.FontFamily] = "ZawGyi-One";
            }
            

            ClientScriptManager cs = this.Page.ClientScript;

            // Embed logic javascript
            // note embedded assembly resource are defined in AssemblyInfo.cs 
            cs.RegisterClientScriptResource(typeof(BurglishControls.BurglishTextBox), "BurglishControls.basic.js");
            cs.RegisterClientScriptResource(typeof(BurglishControls.BurglishTextBox), "BurglishControls.burmese.js");
            cs.RegisterClientScriptResource(typeof(BurglishControls.BurglishTextBox), "BurglishControls.burglish.js");
            cs.RegisterClientScriptResource(typeof(BurglishControls.BurglishTextBox), "BurglishControls.lib.js");
           
            // attach event handling
            // beware of different reqirement exepcially IE
            this.Attributes.Add("onkeydown", "return _onKDown_(event);");
            this.Attributes.Add("onkeyup", "_onKUp_(event);");
            if (Page.Request.Browser.IsBrowser("IE"))
            {
                this.Attributes.Add("onkeypress", "_onKPress_(event);");
            }
            this.Attributes.Add("onmouseover", "_onMOver_(this)");
            this.Attributes.Add("onmouseup", "_onKUp_(event, this);");
            this.Attributes.Add("onfocus", "onFocus(event, this);");
            this.Attributes.Add("onblur", "onBlur(event, this);");
            this.Attributes.Add("autocomplete", "off");

            string options = GetFontOption(Style[HtmlTextWriterStyle.FontFamily]);

            // initialization of javascript variable
            StringBuilder js = new StringBuilder();
            js.Append("<script  type='text/javascript'>");
            js.Append("initTextarea({id: '" + ClientID + "', " + options + " }, '1');");
            js.Append(@"</script>");
            cs.RegisterClientScriptBlock(typeof(BurglishControls.BurglishTextBox), ClientID + "_initialization", js.ToString());

            // initialization of html element properties
            if (Page.Request.Browser.IsBrowser("IE"))
            {
                js = new StringBuilder("<script  type='text/javascript'>");
                js.Append("obj = document.getElementById('" + ClientID + "');");
                js.Append("obj.select();");
                js.Append("var range = document.selection.createRange();");
                js.Append("obj._h = range.boundingHeight;");
                js.Append(@"</script>");
                cs.RegisterStartupScript(typeof(BurglishControls.BurglishTextBox), ClientID + "_selection", js.ToString());
            }


            
        }

        [Bindable(true)]
        [Category("Behavior")]
        [DefaultValue("Phonetic")]
        [Localizable(false)]    
        [Themeable(true)]
        [Description("Control keystroke conversion mode")]
        public BurglishMode BurglishMode
        {
            get
            {
                return _burglishMode;
            }
            set
            {
                _burglishMode = value;
            }
        }

        public override void RenderControl(HtmlTextWriter writer)
        {
            base.RenderControl(writer);

            // attach inline menu
            string class_inline = " style=\"text-align:left !important; float:left !important; position:absolute !important; background-color: #e5ecf9;" +
	            "min-width:150;width:50%; max-height:450; min-height:20; overflow:hidden; padding:3px; visibility:hidden; cursor:pointer;" +
	            "font:13px/1.6em Zawgyi-One,Arial,Verdana,Sans-Serif; z-index:100;\" ";
            writer.Write("<span " + class_inline + " id=\"" + ClientID + "drop\"></span>");
        }


        public static string GetFontOption(string fontName)
        {
            string options = "toburmese : true, self:true , bbcode:false, rows:10";

            if (FontProperty.FontProperties.ContainsKey(fontName))
            {
                options += ", font:'" + FontProperty.FontProperties[fontName].Font + "'";
            }

            return options;
        }
       
    }

    public class FontProperty
    {
        public string FontFamily { get; set; }
        public string Font { get; set; }
        public bool IsUnicode { get; set; }

        public FontProperty(string fontFamily, string font, bool isUnicode)
        {
            FontFamily = fontFamily;
            Font = font;
            IsUnicode = isUnicode;
        }

        public static Dictionary<string, FontProperty> FontProperties;

        static FontProperty()
        {
            FontProperties = new Dictionary<string, FontProperty>();

            FontProperties.Add("Zawgyi-One", new FontProperty("Zawgyi-One", "Zawgyi_One", true));
            FontProperties.Add("UniBurma", new FontProperty("UniBurma", "UniBurma", true));
            FontProperties.Add("MyaZedi", new FontProperty("MyaZedi", "MyaZedi", true));
            FontProperties.Add("Myanmar3", new FontProperty("Myanmar3", "Myanmar3", true));
            FontProperties.Add("PadaukOT", new FontProperty("PadaukOT", "PadaukOT", true));
            FontProperties.Add("Parabaik", new FontProperty("Parabaik", "Parabaik", true));
            FontProperties.Add("WinInnwa", new FontProperty("WinInnwa", "WinInnwa", false));
            FontProperties.Add("M-Myanmar1", new FontProperty("M-Myanmar1", "M_Myanmar1", true));
            FontProperties.Add("Academy", new FontProperty("Academy", "Academy", false));
            FontProperties.Add("Kingmyanmarsar", new FontProperty("Kingmyanmarsar", "Kingmyanmarsar", false));
            FontProperties.Add("GandamarLetter1", new FontProperty("GandamarLetter1", "Gandamar_Letter1", false));
            FontProperties.Add("Metrix-1", new FontProperty("Metrix-1", "Metrix_1", false));
            FontProperties.Add("CECLASSIC", new FontProperty("CECLASSIC", "CECLASSIC", false));
            FontProperties.Add("MS-HEAVY", new FontProperty("MS-HEAVY", "MS_HEAVY", false));
            FontProperties.Add("Wwin_Burmese", new FontProperty("Wwin_Burmese", "Wwin_Burmese", true));
            FontProperties.Add("Kannaka_Unknown", new FontProperty("Kannaka_Unknown", "Kannaka_Unknown", false));
        }

    }


}
