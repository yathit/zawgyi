<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BurglishTextBoxDemo.aspx.cs"
    Inherits="BurglishTextBoxDemo"  %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>BurglishTextBox Test Page</title>
</head>
<body>
    <form id="form1" runat="server">
    <div style="text-align: center">
        <bg:BurglishTextBox ID="BurglishTextBox4" runat="server"></bg:BurglishTextBox>
        <asp:TextBox ID="TextBox1" runat="server"></asp:TextBox>
        <br />
        <bg:BurglishTextBox ID="BurglishTextBox3" runat="server" Font-Names="Myanmar3"
            BurglishMode="Phonetic" Width="90%" TextMode="MultiLine" Height="100px"></bg:BurglishTextBox>
    </div>
    <center>
        <br />
        Above text editor uses beta version of <a href="http://code.google.com/p/burglish/wiki/BurglishTextBox">
            BurglishTextEditor, ASP.NET AJAX Server Control</a>, 2008 (c)
        <a href="http://www.burglish.com">Burglish.com</a>
        <br />
        Suggestion: <a href="http://www.mmgeeks.org">MMGeeks.org</a>
        Bug report: <a href="mailto:kyatun@hnandar.com">kyawtun@hnandar.com</a>
    </center>
    </form>
</body>
</html>
