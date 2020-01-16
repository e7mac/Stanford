/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
html {color:#000;background:#fff;}
body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td {margin:0;padding:0;}
table {border-collapse:collapse;border-spacing:0;}
fieldset,img {border:0;}
address,caption,cite,code,dfn,em,strong,th,var {font-style:normal;font-weight:normal;}
li {list-style:none;}
caption,th {text-align:left;}
h1,h2,h3,h4,h5,h6 {font-size:100%;font-weight:normal;}
q:before,q:after {content:'';}
abbr,acronym {border:0;font-variant:normal;}
sup {vertical-align:text-top;}
sub {vertical-align:text-bottom;}
input,textarea,select {font-family:inherit;font-size:inherit;font-weight:inherit;}
input,textarea,select {*font-size:100%;}
legend {color:#000;}
/*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.1
*/
/* base.css, part of YUI's CSS Foundation */
h1 {
	/*18px via YUI Fonts CSS foundation*/
	font-size:138.5%;  
}
h2 {
	/*16px via YUI Fonts CSS foundation*/
	font-size:123.1%; 
}
h3 {
	/*14px via YUI Fonts CSS foundation*/
	font-size:108%;  
}
h1,h2,h3 {
	/* top & bottom margin based on font size */
	margin:1em 0;
}
h1,h2,h3,h4,h5,h6,strong {
	/*bringing boldness back to headers and the strong element*/
	font-weight:bold; 
}
abbr,acronym {
	/*indicating to users that more info is available */
	border-bottom:1px dotted #000;
	cursor:help;
} 
em {
	/*bringing italics back to the em element*/
	font-style:italic;
}
em strong, strong em {
	font-style:italic;
	font-weight:bold; 
}
blockquote,ul,ol,dl {
	/*giving blockquotes and lists room to breath*/
	margin:1em;
}
ol,ul,dl {
	/*bringing lists on to the page with breathing room */
	margin-left:2em;
}
ol li {
	/*giving OL's LIs generated numbers*/
	list-style: decimal outside;	
}
ul li {
	/*giving UL's LIs generated disc markers*/
	list-style: disc outside;
}
dl dd {
	/*giving UL's LIs generated numbers*/
	margin-left:1em;
}
th,td {
	/*borders and padding to make the table readable*/
	border:0px solid #000;
	padding:.5em;
}
th {
	/*distinguishing table headers from data cells*/
	font-weight:bold;
	text-align:center;
}
caption {
	/*coordinated margin to match cell's padding*/
	margin-bottom:.5em;
	/*centered so it doesn't blend in to other content*/
	text-align:center;
}
p,fieldset,table,pre {
	/*so things don't run into each other*/
	margin-bottom:1em;
}
/* setting a consistent width, 160px; 
   control of type=file still not possible */
input[type=text],input[type=password],textarea{width:12.25em;*width:11.9em;}
/* BEGIN cssPropertyValue classes */
.cssFloatLeft
{
    float: left;
}
.cssFloatRight
{
    float: right;
}
.cssClearBoth
{
    clear: both;
}
.cssDisplayNone
{
    display: none;
}
.cssDisplayBlock
{
    display: block;
}
.cssPositionAbsolute
{
    position: absolute;
}
.cssPositionRelative
{
    position: relative;
}
.cssTextAlignLeft
{
    text-align: left;
}
.cssTextAlignRight
{
    text-align: right;
}
.cssTextAlignCenter
{
    text-align: center;
}
/* margin */
.cssMarginTop5
{
    margin-top: 5px;
}
.cssMarginTop10
{
    margin-top: 10px;
}
.cssMarginTop15
{
    margin-top: 15px;
}
.cssMarginTop20
{
    margin-top: 20px;
}
.cssMarginTop35
{
    margin-top: 35px;
}
.cssMarginRight5
{
    margin-right: 5px;
}
.cssMarginRight6
{
    margin-right: 6px;
}
.cssMarginRight7
{
    margin-right: 7px;
}
.cssMarginRight10
{
    margin-right: 10px;
}
.cssMarginBottom20
{
    margin-bottom: 20px;
}
.cssMarginLeft3
{
    margin-left: 3px;
}
.cssMarginLeft5
{
    margin-left: 5px;
}
.cssMarginLeft7
{
    margin-left: 7px;
}
.cssMarginLeft10
{
    margin-left: 10px;
}
.cssMarginLeft14
{
    margin-left: 14px;
}
/* padding */
.cssPaddingTop5
{
    padding-top: 5px;
}
.cssPaddingTop6
{
    padding-top: 6px;
}
.cssPaddingTop7
{
    padding-top: 7px;
}
.cssPaddingTop25
{
    padding-top: 25px;
}
.cssPaddingBottom5
{
    padding-bottom: 5px;
}
.cssPaddingBottom12
{
    padding-bottom: 12px;
}
.cssPaddingLeft5
{
    padding-left: 5px;
}
.cssPaddingRight5
{
    padding-right: 5px;
}
.cssVerticalAlignTop {
    vertical-align: top;
}
.cssVerticalAlignMiddle
{
    vertical-align: middle;
}
.cssBoldText
{
    font-weight: bold;
}
/** BEGIN the class names bellow refer to the searchbox input fields content-box width. TODO: get rid of it **/
.cssWidth240
{
    width: 225px;
}
.cssWidth270
{
    width: 257px;
}
.cssWidth280
{
    width: 263px;
}
/** END the class names bellow refer to the searchbox input fields content-box width. TODO: get rid of it **/
.cssWidth250
{
    width: 250px;
}
.cssWidth275
{
    width: 275px;
}
.cssLineHeight17
{
    line-height: 17px;
}
/* END cssPropertyValue classes */
/* 
in this file please place only simple classes build 
base on property and value structure, syntax:
.cssPropertyValue { property: value; }
*/
.cssFloatRight, .cssfloatRight, .floatRight{ float: right; } /*only first one is valid, all other calls should be renamed to cssFloatLeft*/
.cssFloatLeft, .cssfloatLeft, .floatLeft { float: left; } /*only first one is valid, all other calls should be renamed to cssFloatRight*/
.cssDisplayNone { display: none; }
.cssDisplayBlock { display: block; }
.cssDisplayInline { display: inline; }
.cssClearBoth, .clear { clear: both; } /*only first one is valid, all other calls should be renamed to cssClearBoth*/
.cssHeight15px {height: 15px;}
.cssTopMargin10px {margin-top: 10px;}  /*it should be renamed to cssMarginTop10px*/
.cssTopMargin35px {margin-top: 35px;}  /*it should be renamed to cssMarginTop35px*/
.cssMarginBottom10px {margin-bottom: 10px;}
.cssMarginBottom50px {margin-bottom: 50px;}
/******* =html ********/
html
{
	height: 100%;
}
/******* =html End ********/
/******* =body ********/
body
{
	text-align: center; 
	margin: 0; 
	height: 100%; 
	width: 100%; 
	padding:0; 
	font-family: Verdana, Arial, Helvetica, Sans-Serif; 
	font-size: 12px;
}
a
{
    text-decoration:none;
    color:#8C8B8B;
}
a:hover
{
    text-decoration:underline;
    color:#ff9900;
}
/******* =body End ********/
/******* Grid14 Start ********/
/* main page needs to be 994px wide and needs to center it self - by default this is handled by #mainWrapper (global_css.axd line 402) but in case this class .grid14 can be used */
.GS14 {width: 994px; margin: 0 auto;}
/* Layout Divs - used to define page layout blocks */
.GSld1,
.GSld2,
.GSld3,
.GSld4,
.GSld5,
.GSld6,
.GSld7,
.GSld8,
.GSld9,
.GSld10,
.GSld11,
.GSld12,
.GSld13,
.GSld14,
.GSld14Alt {float: left;}
.GSld1 {width: 70px;}		
.GSld2 {width: 140px;}	
.GSld3 {width: 210px;}
.GSld4 {width: 280px;}
.GSld5 {width: 350px;}	
.GSld6 {width: 420px;}
.GSld7 {width: 490px;}	
.GSld8 {width: 560px;}
.GSld9 {width: 630px;}
.GSld10 {width: 700px;}
.GSld11 {width: 770px;}	
.GSld12 {width: 840px;}
.GSld13 {width: 910px;}
.GSld14 {width: 994px;}
.GSld14Alt {width: 980px;}
/* Grid Divs - used as content blocks */
.GSgd1,
.GSgd2,
.GSgd3,
.GSgd4,
.GSgd5,
.GSgd6,
.GSgd7,
.GSgd8,
.GSgd9,
.GSgd10,
.GSgd11,
.GSgd12,
.GSgd13,
.GSgd14 {float: left; margin-top: 14px; margin-right: 14px;}
.GSgd1 {width: 56px;}
.GSgd2 {width: 126px;}
.GSgd3 {width: 196px;}
.GSgd4 {width: 266px;}
.GSgd5 {width: 336px;}
.GSgd6 {width: 406px;}
.GSgd7 {width: 476px;}
.GSgd8 {width: 546px;}
.GSgd9 {width: 616px;}
.GSgd10 {width: 686px;}
.GSgd11 {width: 756px;}
.GSgd12 {width: 826px;}
.GSgd13 {width: 896px;}
.GSgd14 {width: 966px; margin-right: 0;}
/* Added grid cells without any margins - Add "0" before collumn number to remove margins */
.GSgd01,
.GSgd02,
.GSgd03,
.GSgd04,
.GSgd05,
.GSgd06,
.GSgd07,
.GSgd08,
.GSgd09,
.GSgd010,
.GSgd011,
.GSgd012,
.GSgd013,
.GSgd014 { margin: 0;}
.GSgd01 {width: 56px;}
.GSgd02 {width: 126px;}
.GSgd03 {width: 196px;}
.GSgd04 {width: 266px;}
.GSgd05 {width: 336px;}
.GSgd06 {width: 406px;}
.GSgd07 {width: 476px;}
.GSgd08 {width: 546px;}
.GSgd09 {width: 616px;}
.GSgd010 {width: 686px;}
.GSgd011 {width: 756px;}
.GSgd012 {width: 826px;}
.GSgd013 {width: 896px;}
.GSgd014 {width: 966px; margin-right: 0;}
/* move GSgd boxes horizontaly across the 14 columns */ 
.GSm0 {margin-left: 14px;}
.GSm1 {margin-left: 70px;}
.GSm2 {margin-left: 140px;}
.GSm3 {margin-left: 210px;}
.GSm4 {margin-left: 280px;}
.GSm5 {margin-left: 350px;}
.GSm6 {margin-left: 420px;}
.GSm7 {margin-left: 490px;}
.GSm8 {margin-left: 560px;}
.GSm9 {margin-left: 630px;}
.GSm10 {margin-left: 700px;}
.GSm11 {margin-left: 770px;}
.GSm12 {margin-left: 840px;}
.GSm13 {margin-left: 910px;}
/* In case grid divs are nested withing each other - need to remove the last grids margin-right: 14px; */
.GSgd1.last,
.GSgd2.last,
.GSgd3.last,
.GSgd4.last,
.GSgd5.last,
.GSgd6.last,
.GSgd7.last,
.GSgd8.last,
.GSgd9.last,
.GSgd10.last,
.GSgd11.last,
.GSgd12.last,
.GSgd13.last,
.GSgd14.last {margin-right: 0 !important}
/*
   Backwards Compatibility for apps that dont use grid14 but use csBlank masterpage.
   This overide will add 3px to areas that use the grid system.
   In each individual app a counter class ( #mcWorkArea.GSm0 {padding-left: 0 !important;} ) must be added
   to prevent the addition of 3px to the grid system
*/ 
#mcWorkArea.GSm0 {padding-left: 3px !important;}
/******* Grid14 End ********/
div.defaultBgd 
{
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x #eee;
    background-position: 0px -822px;
    *zoom: 1;
}
/******* =#preMainWrapper ********/
div#preMainWrapper { display: none;}
/******* =#preMainWrapper End *******/
/******* =#mainWrapper ********/
#mainWrapper { width: 994px; text-align: left; margin: 0px auto; background: #fff;}
/******* =#mainWrapper End ********/
/******* =#mcFooter ********/
#mcFooter { text-align:center; clear:both;}
#mcFooter {width:966px; }
#mcFooter .mcFooterBanner{padding: 10px 0 5px 0;}
#mcFooterContent{ padding: 5px 0 5px 0; text-align:center; }
#mcFooterContent {
    line-height:18px;
    margin-top:16px;
}
/* keeping the etrust graphic inline with copyright text */
#copyrightContainer {position: relative; display: inline-block; margin-top: 10px;}
#copyright {display: inline-block; padding-right: 60px;}
#copyrightImg {position: absolute; right: 0; top: 50%; margin-top: -12px;}  
/* DEV00622234 - repeated in /www30/CORE/02.main.css */
i.iconAdChoices{
    background-image: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd);
    width: 12px; height: 12px; background-position: -176px 0px;
    display: inline-block;
    vertical-align: middle;
    margin: 0 2px;
}
/******* =#mcFooter End ********/
/******* =#login, =#loginModal ********/
.ctlLoginBox , #divLPFields{ color: #474747; }
.ctlLoginBox a.loginSignUp { float: right; }
.ctlLoginBox span.loginSignUp { float: right; color: #7B4F90; text-decoration: underline; cursor: pointer;}
.ctlLoginBox span.loginSignUp:hover { color: #FF9900; }
.ctlLoginBox .loginFields {clear: right; margin:0; }
.ctlLoginBox .loginFields label, #divLPFields  label { font-weight: bold}
.ctlLoginBox input.text-field, #divLPFields input.text-field { display: block; width: 100%; border-color: #b3b9c3; padding: .17em 0; margin: 0.17em 0 1.33em}
#divLPFields .globalButton  { float: right;}
.ctlLoginBox .forgotPass {  margin-top: 0px;width:135px; float: right;}
.ctlLoginBox .persistAction { clear: left; }
.ctlLoginBox .persistAction input {float: left; }
.ctlLoginBox .persistAction label { width: 100px; display: block; float: left; margin-left: 0.4em}
.ctlLoginBox .persistAction input.btnLogin  {float: right;}
#forgotPasslnk { *float: none !important; *display:inline !important; color: #0D51AB; text-align: right; }
.bkmRightHeader {vertical-align:text-bottom;padding-top:5px;position: absolute;right: 0px;}
.fbArea{
	left:50%;
	float:left;
	position:relative;
}
.fbTop{
float: left;
position: relative;
left: -50%;
}
div.fbBtnCenter  {
float: left;
margin-left:50px
}
div.fbBtnCenter.noMarginSignIn  {
margin-left:0
}
div.fbBtnCenter a {
display: block;
text-decoration: none;
position: relative;
cursor:pointer;
}
div.fbBtnCenter a span.fbFirst {
background-position: top left;
width: 57px;
}
div.fbBtnCenter a span.fbMiddle {
	background-position: -58px 0;
	font-weight: bold;
	text-decoration: none;
	color: white;
	line-height: 48px;
	font-family: Arial, Helvetica, Verdana, sans-serif;
	max-width: 340px;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	text-shadow: black 0px -1px 0px
}
#signInContent div.fbBtnCenter a span.fbMiddle {
	font-size:15px
}
div.fbBtnCenter a span.fbMiddle:hover {
	cursor:pointer;
}
/* To account for smaller space on the right hand side of login.monster.com */
div.fbBtnCenter.noMarginSignIn a span.fbMiddle {
max-width: 206px;
}
div.fbBtnCenter a span.fbLast {
background-position: top right;
width: 14px;
}
div.fbBtnCenter a span {
background-image: url("https://securemedia.newjobs.com/mm/redux/buttons/facebookBig.png");
height: 49px;
float: left;
}
.recommendLabel{padding-top:2px;text-align:center;clear:left;}
/******* =#login End ********/
/*  ------- ConnectAcccount--------  */
.loginButton {margin-top:21px;}
/**** Modal Window Generics =#modalOverlay, =.modalContainer, .modal ****/
#modalOverlay { background-color:#000;}
.modalContainer { left:50%; top:15%; text-align: left; zoom: 1; }
.modalContainer .modalBottomLeft { position: relative; background:  url(http://media.newjobs.com/mm/redux/modal/bottomLeft.png) no-repeat bottom left; left:-8px; zoom: 1; }
.modalContainer .modalBottomRight { position: relative; background:  url(http://media.newjobs.com/mm/redux/modal/bottomRight.png) no-repeat bottom right;  left: 14px; zoom: 1; }
.modalContainer .modalInner { position: relative; left: -8px; margin: 0 0 2px; zoom: 1; }
.modalContainer a.modalCloseImg 
{
  display:block;z-index:3200;position:absolute;cursor:pointer; right: .66em; top: .5em; height:13px; width: 13px; text-indent: -5000px; 
  background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat 0px -418px; 
}
.modalContainer .modalHeading { background: url(http://media.newjobs.com/mm/redux/modal/headingBg.png) repeat-x top; height: 24px; margin: 0 5px; line-height: 24px; /*font-size: 1em; color: #5c6d27; font-weight: bold;*/ padding-left: 5px; position: relative; }
.modalContainer .topLeft { width: 13px; height: 24px; background: url(http://media.newjobs.com/mm/redux/modal/headingLeft.png) no-repeat top left; position: absolute; top: 0; left:-8px }
.modalContainer .topRight { width: 13px; height: 24px; background: url(http://media.newjobs.com/mm/redux/modal/headingRight.png) no-repeat top right; position: absolute; top: 0; right:-6px }
.modalContainer .modalInner .modalData { padding: 1em 1.67em 1.80em 1.67em; zoom: 1; }
.modalContainer .modalInner .modalData .modalHighlight { color:#FF413E; font-weight:bold; }
.modalContainer .modalTopImage {height: 93px; background-color: #698D21; }
.ui-draggable .modalHeading { cursor: move; } /* set heading to have move cursor when draggable */
.modal { display: none; }
/**** Modal Windows End ****/
/**** =.siteSearch ****/
div.siteSearch { float: left; position: relative;}
#mcHeader div.siteSearch {margin-top: 1.42em; float: right; }
div.siteSearch dl { padding: 0; margin: 0;   }
div.siteSearch dt { float: left; padding: 0 0 .75em;}
div.siteSearch dt.active { background: url(http://media.newjobs.com/mm/redux/site-search/siteSearchActiveTab.gif) no-repeat bottom;}
div.siteSearch dd { display: none;  margin: 0; padding: 0; height: 27px; background: #e0e5cc url(http://media.newjobs.com/mm/redux/site-search/siteSearchBoxRight.gif) no-repeat right top; width: 30em }
div.siteSearch dd.active { position: absolute; left: 0; top: 1.9em; display: block}
div.siteSearch dt a { border-left: 1px solid #666; color: #666; padding: 0 6px 0 7px; text-decoration: none;}
div.siteSearch dt.first a { border-left: none;}
div.siteSearch dt.active a { color: #e78423; }
div.siteSearch dd div.siteSearchForm {  height: 27px; background: url(http://media.newjobs.com/mm/redux/site-search/siteSearchBoxLeft.gif) no-repeat left top}
div.siteSearch dd input { margin: 4px 0 0 1.2%; width: 14%; float: left; height: 18px; line-height: 18px;  }
div.siteSearch dd input.text-field { border: 1px solid #666; padding: 0 0 0 1%; width: 39%; margin-top: 5px; height: auto; line-height: normal}
div.siteSearch dd input.text-field:focus, div.siteSearch div.siteSearchBox input.ieFocus {border-color: #e78423}
:root div.siteSearch dd, :root div.siteSearch dd div.siteSearchForm { width: 100%}
/**** =.siteSearch End ****/
/* General Classes */
/******* =helpers ******/
.verticalSeparator  {clear: both; float: left; margin:0px; padding: 0px; height: 15px; border: none; background: none; font-size: 0px;}
/******* =helpers End******/
/******* =ul.piped General class for adding pipes to horizontal lists ********/
ul.piped {float: left}
ul.piped li { border-left: 1px solid #CCCCCC; padding: 0 5px; float: left; list-style:none}
ul.piped li.first { border-left: none;}
/******* =ul.piped End ********/
/******* =input.text-field ******/
input.text-field { border: 1px solid #000 }
/******* =input.text-field End ******/
/******* =.overlay ******/
.overlay {position: absolute; width: 100%; z-index: 9999}
/******* =.overlay End ******/
/******* =.collapsable, .collapseTrigger ******/
.collapsable {margin-top: 0; margin-bottom: 0; }
.collapseToggle{cursor: pointer}
/******* =.collapsable End ******/
/******* =.rounded ******/
.rounded { position: relative; zoom: 1}
.rounded .rctl, .rounded .rctr, .rounded .rcbl, .rounded .rcbr { overflow: hidden; position: absolute; height: 4px; width: 4px; line-height: 0 }
.rounded .rctl { top: -1px; left: -1px}
.rounded .rctr { top: -1px; right: -1px}
.rounded .rcbl { bottom: -1px; left: -1px}
.rounded .rcbr { bottom: -1px; right: -1px}
.rcInvWhiteOnTransparentTL,
.rcInvWhiteOnTransparentTR,
.rcInvWhiteOnTransparentBL,
.rcInvWhiteOnTransparentBR
{
	background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat;
	position: absolute;
	display: block;
}
.rcInvWhiteOnTransparentTL
{
	background-position: -432px -50px; 
	width: 5px;
	height: 5px;
	top: 0px;
	left: 0px;
}
.rcInvWhiteOnTransparentTR
{
	background-position: -437px -50px; 
	width: 5px;
	height: 5px;
	top: 0px;
	right: 0px;
}
.rcInvWhiteOnTransparentBL
{
	background-position: -442px -50px; 
	width: 5px;
	height: 5px;
	bottom: 0px;
	left: 0px;
}
.rcInvWhiteOnTransparentBR
{
	background-position: -447px -50px; 
	width: 5px;
	height: 5px;
	bottom: 0px;
	right: 0px;
}
/******* =.rounded End******/
/******* =.ctlErrorMessage ******/
.ctlErrorMessage { display: none; color: #e13a2b; font-size: 0.92em}
.ctlErrorMessage .ctlErrorMessageBox { display: none; border: 1px solid #ff4141; background-color: #faf9cb; }
.ctlErrorMessage .ctlErrorMessageText { position: relative; font-weight: bold; padding: .66em 1.67em .66em 2.25em ; background-image: url(http://media.newjobs.com/mm/redux/errors/redxerror.gif); background-repeat: no-repeat; background-position: 8px 8px}
.ctlErrorMessage .ctlErrorMessageDesc { padding: .75em}
.ctlErrorMessage .rounded .rctl, .ctlErrorMessage .rounded .rctr, .ctlErrorMessage .rounded .rcbl, .ctlErrorMessage .rounded .rcbr {background-image:url(http://media.newjobs.com/mm/redux/errors/errorCorners.gif); background-repeat: no-repeat;  }
.ctlErrorMessage .rounded .rctl { background-position: left top}
.ctlErrorMessage .rounded .rctr { background-position: right top}
.ctlErrorMessage .rounded .rcbl { background: transparent url(http://media.newjobs.com/mm/redux/errors/errorCorners.gif) 0 4px repeat; }
.ctlErrorMessage .rounded .rcbr { background: transparent url(http://media.newjobs.com/mm/redux/errors/errorCorners.gif) 4px 4px repeat; }
/******* =.ctlErrorMessage End ******/
/******* =.ctl036 ******/
.ctl036_hidden {display: none; visibility: hidden; }
.ctl036_ErrorMessage { border: 1px solid #ef6f6d; background-color: #f5f5ed; font-family: Verdana; font-size: 11px; color: #5c583f; margin: 7px 0 0;}
.ctl036_ErrorMessage .rctl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) 0px 0px no-repeat;}
.ctl036_ErrorMessage .rctr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) -4px 0px no-repeat;}
.ctl036_ErrorMessage .rcbl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) 0px -4px no-repeat;}
.ctl036_ErrorMessage .rcbr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) -4px -4px no-repeat; }
.ctl036_ErrorMessage .ctl036_error_error_icon{width: 29px;height: 27px;left: -6px;top: -8px;position: absolute;z-index: 1;background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_icon.gif) no-repeat;}
.ctl036_ErrorMessage .ctl036_errorContent { padding: 9px 0px 11px 34px;}
.ctl036_ErrorMessage .ctl036_errorContent ul li { list-style-image:none !important; list-style-position:inside !important; list-style-type:disc !important; }
.ctl036_ErrorMessage h1 { font-size: 11px; font-weight: bold; margin: 0; padding: 0px 0px 8px 0px; }
.ctl036_ErrorMessage_noIcon { border: 1px solid #ef6f6d; padding: 11px; background-color: #f5f5ed; font-family: Verdana; font-size: 11px; color: #5c583f; width: 142px; float: right; margin: 0 4px -8px 0; z-index:100; top: 0px; position: relative;}
.ctl036_ErrorMessage_noIcon .rctl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) 0px 0px no-repeat;}
.ctl036_ErrorMessage_noIcon .rctr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) -4px 0px no-repeat;}
.ctl036_ErrorMessage_noIcon .rcbl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) 0px -4px no-repeat;}
.ctl036_ErrorMessage_noIcon .rcbr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_corners.gif) -4px -4px no-repeat; }
.ctl036_Question { border: 1px solid #9ebddb; background-color: #f7fbff; /*font-family: Verdana; font-size: 11px; color: #5c583f;*/ margin: 7px 0 0;}
.ctl036_Question .rctl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_question_corners.gif) 0px 0px no-repeat;}
.ctl036_Question .rctr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_question_corners.gif) -4px 0px no-repeat;}
.ctl036_Question .rcbl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_question_corners.gif) 0px -4px no-repeat;}
.ctl036_Question .rcbr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_question_corners.gif) -4px -4px no-repeat; }
.ctl036_Question .ctl036_question_icon{width: 29px;height: 27px;left: -6px;top: -8px;position: absolute;z-index: 1;background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_question_icon.gif) no-repeat;}
.ctl036_Question .ctl036_questionContent { padding: 9px 0px 11px 35px;}
.ctl036_Help { border: 1px solid #e1cc6d; background-color: #fcf1b6; padding: 14px 14px 8px 14px; /*font-family: Verdana; font-size: 11px; color: #5c583f;*/}
.ctl036_Help .rctl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_help_corners.gif) 0px 0px no-repeat;}
.ctl036_Help .rctr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_help_corners.gif) -4px 0px no-repeat;}
.ctl036_Help .rcbl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_help_corners.gif) 0px -4px no-repeat;}
.ctl036_Help .rcbr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_help_corners.gif) -4px -4px no-repeat; }
.ctl036_Form_Error { width: 20px; height: 17px; float: right; margin: 10px 0px 2px 0px; padding: 0; background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_icon_small.png) no-repeat; cursor: pointer;}
.ctl036_TextArea_Error { border: 2px solid #e46f6d !important; }
/******* =.ctl036 End ******/
/******* =.ajaxLoading ******/
.ajaxLoading { zoom: 1; height: 100%; width: 100%; background: url(http://media.newjobs.com/mm/redux/ajax/loading.gif) no-repeat center center; position: absolute; top: 0; left: 0 }
/******* =.ajaxLoading ******/
/******* =.clear-fix ******/
.clearfix { zoom: 1; }
.clearfix:after {
    content: ".";
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
}
/******* =.clear-fix End ******/
/******* =.Help Icons ********/
.anchorHelpIcon,.ctlGreenSections .ctlGreenSections_content .anchorHelpIcon {float:right; margin: 10px 15px 0 0;}
#manageThisResumeContent .anchorHelpIcon { float:right; margin: 0px 10px 2px 0; background-color:#E4D9EA; padding:0;}
#CreateResumePanel.modal .anchorHelpIcon {float: none; margin:-2px 0 0 5px;}
#BC_EditUserInfo .anchorHelpIcon  {margin: 2px 0 0 8px; float: none;}
#searchBoxArea .anchorHelpIcon {margin: 4px 0 0 4px; float: left;}
.ctlLoginBox .loginFields label { float: left; }
.loginFields .anchorHelpIcon { margin: 0px 0 0 8px; float: left; }
.modalHeading .anchorHelpIcon { margin: 4px 0 0 8px; float: left; }
.ctl100_forms_containerTop .modalHeading .anchorHelpIcon { margin: 10px 0 0 8px; font-size: 17px; }
.ctlLoginBox input.text-field { clear: both; }
#divLostPassword .anchorHelpIcon {margin:0}
.monsHelpButton {
  height: 17px;
  width: 17px;
  background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat 0px -874px;
  text-indent:-9999px;
} 
.modalHeadingText { float: left; }
/******* =.Help Icons End *******/
/******* =clear Float *******/
.clearFloat { clear: both; }
/******* login page Absolutly positioned box *******/ /* not anymore */
#nonModal_login {
    position: relative;
    min-height: 556px; /* needed for the float solution on loginboxes below */
}
#nonModal_login .ctlLoginBox {width: 960px;}
#nonModal_login .signInContent,
#nonModal_login .signOutContent
{
	padding: 15px 11px;
	margin: 30px 15px 18px 30px;
    /*position: absolute;    
    right: 0;*/ /* can't use absolute positioning because with long error messages, the loginbox was cutting into the footer */
    float: right;
    position: relative;
    left: 195px;
    z-index: 1;
    background: #ffffff url('http://media.newjobs.com/mm/redux/sprites/SignInLock2.png') no-repeat  right bottom ;
}
#nonModal_login .signOutContent {
	padding: 10px 10px 10px 10px;
}
#nonModal_login .adContainer994x500 {
    position: absolute; /* needed for the float solution on loginboxes above */
    top: 23px;  /* needed for the float solution on loginboxes above */
    padding: 0;
    margin: 15px 0 0 0;
    overflow: hidden;
    width: 960px;
}
#nonModal_login .signInBAM {
clear: both;
border-top: 1px solid #cccccc;
padding: 15px 0 0 0;
margin: 20px 0 20px 0;
}
/******* login page SSL *******/
#signInContent,
#signOutContent
{
	width: 278px;
}
#signInContent-right {
	margin: 4px 10px 0 120px;
	width: 335px;
}
#signInContent-right .innerContainer{
	margin: 11px 0 0 0;
}
#signOutContent .innerContainer,
#signInContent .innerContainer
{
    width: 278px;
    margin-top: 4px;
}
/******* =#content ********/
#mcWorkArea { 
    width: 960px;
    clear: both; 
    z-index: 0; 
    padding: 17px; 
    background: #fff;
}
#mcWorkArea:after { content: "."; display: block; height: 0; clear: both; visibility: hidden;}
/******* =#content End ********/
/******* =.wacCenterStage ********/
.wacCenterStage { padding: 0 }
/******* =.wacCenterStage End ********/
/******* =.wacDoormat ********/
.wacDoormat { padding: 0; position: relative; clear: both;}
/******* =.wacDoormat End ********/
/******* =.wacConsole ********/
.wacConsole { height: 40px; padding: 0; position: fixed; bottom: 0; left: 0; width: 100%; z-index: 10; }
/******* =.wacConsole End ********/
/******* =.wacConsole ********/
.wacWell { height: 60px; padding: 0; margin-bottom: 15px; }
/******* =.wacConsole End ********/
/******* =.wacUtility ********/
.wacUtility { padding: 0;}
/******* =.wacUtility End ********/
/******* =.wacHeadline ********/
.wacLeadStoryBlock { padding: 0; min-height: 13px; } /* min-height required to mimic the behavior in IE6 & IE7 where an empty div will inherit the height of it's default line-height 13px */
/******* =.wacHeadline End ********/
/******************** Start of Container Sets Code **************/
/******* =.cs180R *******/
div.cs180R div.wacUtility { float: right; width: 180px;}
div.cs180R div.wacCenterStage { float: left; width: 765px;}
/******* =.cs180R End*******/
/******* =.cs180L *******/
div.cs180L div.wacUtility { float: left; width: 180px;}
div.cs180L div.wacCenterStage { float: left; width: 756px;}
/******* =.cs180L End*******/
/******* =.cs180L180R *******/
div.cs180L180R div.wacUtility { float: right; width: 180px;}
div.cs180L180R div.wacCenterStage { float: left; width: 570px; margin-left: 15px;}
/******* =.cs180L180R End*******/
/******* =.cs180L180RB *******/
div.cs180L180RB div.wacUtility {width: 180px;}
div.cs180L180RB div.csLeft {float: left;}
div.cs180L180RB div.csRight {float: right; position: relative; top: -130px;}
div.cs180L180RB div.wacCenterStage { float: left; width: 570px; margin-left: 15px;}
/******* =.cs180L180RB End*******/
/******* =.cs180LC *******/
div.cs180LC div.wacUtility { float: left; width: 180px;} 
div.cs180LC div.wacCenterStage { float: right; width: 765px; }
div.cs180LC div.wacConsole {  }
/******* =.cs180LC End*******/
/******* =.cs180L180RC *******/
div.cs180L180RC div.wacUtility { float: right; width: 180px;}
div.cs180L180RC div.wacCenterStage { float: left; width: 570px; margin-left: 15px; }
div.cs180L180RC div.wacConsole {  }
/******* =.cs180L180RC End*******/
/******* =.cs180RC *******/
div.cs180RC div.wacUtility { float: right; width: 180px;}
div.cs180RC div.wacCenterStage { float: left; width: 765px; }
div.cs180RC div.wacConsole {}
/******* =.cs180RC End*******/
/******* =.cs180L960D *******/
div.cs180L960D { position: relative;}
div.cs180L960D div.wacUtility { float: left; width: 180px;  }
div.cs180L960D div.wacCenterStage { float: right; width: 765px; }
div.cs180L960D div.wacDoormat {  }
/******* =.cs180L960D End*******/
/******* =.cs180RD *******/
div.cs180RD { position: relative;}
div.cs180RD div.wacUtility { float: right; width: 180px; }
div.cs180RD div.wacCenterStage { float: left; width: 765px;}
div.cs180RD div.wacDoormat {  }
/******* =.cs180RD End*******/
/******* =.cs180LD *******/
div.cs180LD { position: relative}
div.cs180LD div.wacUtility { float: left; width: 180px; }
div.cs180LD div.wacCenterStage { float: right; width: 765px;}
div.cs180LD div.wacDoormat {}
/******* =.cs180LD End*******/
/******* =.cs180R960D *******/
div.cs180R960D { position: relative}
div.cs180R960D div.wacUtility { float: right; width: 180px; }
div.cs180R960D div.wacCenterStage { float: left; width: 765px;}
div.cs180R960D div.wacDoormat { }
/******* =.cs180R960D End*******/
/******* =.csWC  *******/
div#mcWorkArea.csWC { }
/******* =.csWC , =.cswacConsole End*******/
/******* =.cs375RC *******/
div.cs375RC div.wacUtility { float: right; width: 375px;}
div.cs375RC div.wacCenterStage { float: left; width: 570px;}
div.cs375RC div.wacConsole { }
/******* =.cs375RC End*******/
/******* =.cs375R *******/
div.cs375R div.wacUtility { float: right; width: 375px;}
div.cs375R div.wacCenterStage { float: left; width: 570px; }
/******* =.cs375R End*******/
/******* =.cs375AdviceVert *******/
div.cs375R960D  div.wacLeadStoryBlock { float: left; width: 960px; }
div.cs375R960D div.wacUtility { float: right; width: 375px;}
div.cs375R960D div.wacCenterStage { float: left; width: 580px;}
div.cs375R960D div.wacDoormat {}
/******* =.cs375AdviceVert End*******/
/******* =.WELL310COL960D *******/
div.WELL310COL960D div.wacDoormat {}
div.WELL310COL960D div.wacLeftColumn { float: left; width: 310px; margin:0 15px 0 0; padding:0; }
div.WELL310COL960D div.wacMiddleColumn { float: left; width: 310px; margin:0 15px 0 0; padding:0; }
div.WELL310COL960D div.wacRightColumn  { float: left; width: 310px; margin:0; padding:0; }
div.WELL310COL960D div.wacTopRow  { float: left; width: 960px; margin:0; padding:0; clear: both; }
div.WELL310COL960D div.wacBottomRow  { float: left; width: 960px; margin:0; padding:0; height: 59px; clear: both; }
/******* =.WELL310COL960D End*******/
div.cs180L180RC div.csLeft, div.cs180L180R div.csLeft { float: left}
/******************** End of Container Sets Code **************/
#interMsgsW {
    margin: 0 auto;
    text-align: center;
    width: 100%;
    background-color: #fef9c2;
    position: relative;
    z-index: 1;
    font-family:Arial,Helvetica,sans-serif;
    font-size:13px;
    color:#673695;
}
#interMsgsPar {
    width: 966px;
    height: 60px;
    padding: 0px 14px;
    margin: 0 auto;
    position: relative;
    background-color: #FEF9C2;
}
.interMsg {
    text-align: left;
    width: 966px;
    height: 53px;
    position: absolute;
    top:7px;
    left:14px;
    background-color: #fef9c2;
}
#interMsgsW .closeMsg {
    float: right;
    cursor: pointer;
    padding: 3px 25px 0 0;
	position: relative;
}
#interMsgsW .closeMsgBtn {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	width: 17px;
	height: 17px;
	background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
	background-repeat: no-repeat;
	background-position: -120px 0px;
}
.interMsg h4.fnt9 {
    margin-bottom: 0;
}
.interMsgCookies {
    font-size:11px;  
    padding: 0 25px 0 0;  
    float:right;
}
.ac_results {
	padding: 0px; 
	border: 1px solid #c7c7c7;
	background-color: white;
	overflow: hidden;
	z-index: 99999;
}
.ac_results ul {
	width: 100%;
	list-style-position: outside;
	list-style: none;
	padding: 0;
	margin: 0;
}
.ac_results li {
	margin: 0px;
	padding: 4px 9px;
	cursor: default;
	display: block;
	/* 
	if width will be 100% horizontal scrollbar will apear 
	when scroll mode will be used
	*/
	/*width: 100%;*/
	font: menu;
	font-size: 13px;
	font-family:Arial;
    font-weight: bold !important;
	/* 
	it is very important, if line-height not setted or setted 
	in relative units scroll will be broken in firefox
	*/
	line-height: 16px;
	overflow: hidden;
	text-align:left;
	color:#676565;
}
.ac_results li  strong,
.ac_results li  b {
    font-weight: normal;
}
.ac_loading {
	background: white url('http://media.newjobs.com/mm/redux/rte/default/grid/loading.gif') right center no-repeat;
}
.ac_odd {
	background-color: #fff;
}
.ac_over {
	background-color: #e7e1ed;	
}
/* BEGIN footer Contry Selector styles */
.footerCountrySelector .scrollAreaTranspWrap {
	padding: 5px;
	/*background-image: url("http://media.newjobs.com/mm/redux/www30/sprites/bgdDDtransp1x500.png");*/
	background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30width1px_img.axd');
	background-repeat: repeat-x;
	background-position: 0px 0px;
}
 .footerCountrySelector {
	position: relative;
	text-align: center;
	margin: 18px auto 0;
}
#footerCountrySelector ul li {
	text-align: left;
	border-top:1px solid #EEEEEE;
}
#mcFooter .footerCountrySelector .scrollArea li {
    border-top: 1px solid #EEEEEE;
    display: block;
}
#mcFooter .scrollArea  ul {
    padding: 0;
    margin: 0;
}
 .footerCountrySelector .fCSactiveCountry {
	cursor: pointer;
	display: inline-block;
	text-align: left;
	position: relative;
	zoom: 1; /* IE7 fix part 1*/
	*display: inline; /* IE7 fix part 2*/
	*height: 16px; /* IE7 fix part 3*/
}
 .footerCountrySelector .acFlagWrap {
	float: left;
	width: 16px;
	height: 16px;
	padding: 0px 7px 0px 0;
	border-right: 1px solid #c3c3c3;
}
 .footerCountrySelector .acFlag {
	width: 16px;
	height: 16px;
	background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
	background-repeat: no-repeat;
}
 .footerCountrySelector .acName {
	float: left;
	padding: 1px 0 0px 5px;
	text-align: left; /* maybe center would be better here */
	min-width: 56px;
	border-left: 1px solid #fff;
	color: #673695;
	text-transform: uppercase;
	font-size: 12px;
	font-weight: bold;
}
 .footerCountrySelector .scrollAreaTranspWrap {
	display: none;
	position: absolute;
	top: -318px;
	left: -14px;
    z-index: 100;
}
 .footerCountrySelector .scrollArea {
	background-color: #fff;
	width: 232px;
	height: 288px;
	overflow: auto;
	padding: 10px 14px;
}
 .footerCountrySelector .scrollArea li {
	border-top: 1px solid #eeeeee;
	padding: 5px 0 7px;
}
#mcFooter .footerCountrySelector .scrollArea li:first-child {
	border: 0;
	margin-top: 0;
	padding-top: 0;
}
 .footerCountrySelector .flag {
	display: inline-block;
	width: 16px;
	height: 16px;
	margin: 0px 7px 0 0;
	vertical-align: bottom;
	background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
	background-repeat: no-repeat;
}
 .footerCountrySelector .scrollArea a span { display: block; float: left; margin-top: 1px; } /* so that flags are not underlined in FF */
 .footerCountrySelector .scrollArea a { display: block; } /* so that entire line is a link */
 .footerCountrySelector .flag1 { background-position: 0px -302px; }
 .footerCountrySelector .flag2 { background-position: -16px -302px; }
 .footerCountrySelector .flag3 { background-position: -32px -302px; }
 .footerCountrySelector .flag4 { background-position: -48px -302px; }
 .footerCountrySelector .flag5 { background-position: -64px -302px; }
 .footerCountrySelector .flag6 { background-position: -80px -302px; }
 .footerCountrySelector .flag7 { background-position: -96px -302px; }
 .footerCountrySelector .flag8 { background-position: -112px -302px; }
 .footerCountrySelector .flag9 { background-position: -128px -302px; }
 .footerCountrySelector .flag10 { background-position: -144px -302px; }
 .footerCountrySelector .flag11 { background-position: -160px -302px; }
 .footerCountrySelector .flag12 { background-position: -176px -302px; }
 .footerCountrySelector .flag13 { background-position: -192px -302px; }
 .footerCountrySelector .flag14 { background-position: -208px -302px; }
 .footerCountrySelector .flag15 { background-position: -224px -302px; }
 .footerCountrySelector .flag16 { background-position: -240px -302px; }
 .footerCountrySelector .flag17 { background-position: -256px -302px; }
 .footerCountrySelector .flag18 { background-position: -272px -302px; }
 .footerCountrySelector .flag19 { background-position: -288px -302px; }
 .footerCountrySelector .flag20 { background-position: -304px -302px; }
 .footerCountrySelector .flag21 { background-position: -320px -302px; }
 .footerCountrySelector .flag22 { background-position: -336px -302px; }
 .footerCountrySelector .flag23 { background-position: -352px -302px; }
 .footerCountrySelector .flag24 { background-position: -368px -302px; }
 .footerCountrySelector .flag25 { background-position: -384px -302px; }
 .footerCountrySelector .flag26 { background-position: -400px -302px; }
 .footerCountrySelector .flag27 { background-position: -416px -302px; }
 .footerCountrySelector .flag28 { background-position: -432px -302px; }
 .footerCountrySelector .flag29 { background-position: -448px -302px; }
 .footerCountrySelector .flag30 { background-position: -464px -302px; }
 .footerCountrySelector .flag31 { background-position: -480px -302px; }
 .footerCountrySelector .flag32 { background-position: -496px -302px; }
 .footerCountrySelector .flag33 { background-position: 0px -318px; }
 .footerCountrySelector .flag34 { background-position: -16px -318px; }
 .footerCountrySelector .flag35 { background-position: -32px -318px; }
 .footerCountrySelector .flag36 { background-position: -48px -318px; }
 .footerCountrySelector .flag37 { background-position: -64px -318px; }
 .footerCountrySelector .flag38 { background-position: -80px -318px; }
 .footerCountrySelector .flag39 { background-position: -96px -318px; }
 .footerCountrySelector .flag40 { background-position: -112px -318px; }
 .footerCountrySelector .flag41 { background-position: -128px -318px; }
 .footerCountrySelector .flag42 { background-position: -144px -318px; }
 .footerCountrySelector .flag43 { background-position: -160px -318px; }
 .footerCountrySelector .flag44 { background-position: -176px -318px; }
 .footerCountrySelector .flag45 { background-position: -192px -318px; }
 .footerCountrySelector .flag46 { background-position: -208px -318px; }
 .footerCountrySelector .flag47 { background-position: -224px -318px; }
 .footerCountrySelector .flag48 { background-position: -240px -318px; }
 .footerCountrySelector .flag49 { background-position: -256px -318px; }
 .footerCountrySelector .flag50 { background-position: -272px -318px; }
 .footerCountrySelector .flag51 { background-position: -288px -318px; }
 .footerCountrySelector .flag52 { background-position: -304px -318px; }
 .footerCountrySelector .flag53 { background-position: -320px -318px; }
 .footerCountrySelector .flag54 { background-position: -336px -318px; }
 .footerCountrySelector .flag56 { background-position: -352px -318px; }
 .footerCountrySelector .flag57 { background-position: -368px -318px; }
 .footerCountrySelector .flag58 { background-position: -384px -318px; }
 .footerCountrySelector .flag59 { background-position: -400px -318px; }
 .footerCountrySelector .flag60 { background-position: -416px -318px; }
 .footerCountrySelector .flag61 { background-position: -432px -318px; }
 .footerCountrySelector .flag63 { background-position: -448px -318px; }
 .footerCountrySelector .flag64 { background-position: -464px -318px; }
 .footerCountrySelector .flag65 { background-position: -480px -318px; }
 .footerCountrySelector .flag66 { background-position: -496px -318px; }
 .footerCountrySelector .flag67 { background-position: 0px -334px; }
 .footerCountrySelector .flag68 { background-position: -16px -334px; }
 .footerCountrySelector .flag69 { background-position: -32px -334px; }
 .footerCountrySelector .flag70 { background-position: -48px -334px; }
 .footerCountrySelector .flag71 { background-position: -64px -334px; }
 .footerCountrySelector .flag73 { background-position: -80px -334px; }
 .footerCountrySelector .flag74 { background-position: -96px -334px; }
 .footerCountrySelector .flag75 { background-position: -112px -334px; }
 .footerCountrySelector .flag76 { background-position: -128px -334px; }
 .footerCountrySelector .flag77 { background-position: -144px -334px; }
 .footerCountrySelector .flag78 { background-position: -160px -334px; }
 .footerCountrySelector .flag79 { background-position: -176px -334px; }
 .footerCountrySelector .flag80 { background-position: -192px -334px; }
 .footerCountrySelector .flag81 { background-position: -208px -334px; }
 .footerCountrySelector .flag82 { background-position: -224px -334px; }
 .footerCountrySelector .flag83 { background-position: -240px -334px; }
 .footerCountrySelector .flag84 { background-position: -256px -334px; }
 .footerCountrySelector .flag85 { background-position: -272px -334px; }
 .footerCountrySelector .flag86 { background-position: -288px -334px; }
 .footerCountrySelector .flag87 { background-position: -304px -334px; }
 .footerCountrySelector .flag88 { background-position: -320px -334px; }
 .footerCountrySelector .flag89 { background-position: -336px -334px; }
 .footerCountrySelector .flag90 { background-position: -352px -334px; }
 .footerCountrySelector .flag91 { background-position: -368px -334px; }
 .footerCountrySelector .flag92 { background-position: -384px -334px; }
 .footerCountrySelector .flag93 { background-position: -400px -334px; }
 .footerCountrySelector .flag94 { background-position: -416px -334px; }
 .footerCountrySelector .flag95 { background-position: -432px -334px; }
 .footerCountrySelector .flag96 { background-position: -448px -334px; }
 .footerCountrySelector .flag97 { background-position: -464px -334px; }
 .footerCountrySelector .flag98 { background-position: -480px -334px; }
 .footerCountrySelector .flag99 { background-position: -496px -334px; }
 .footerCountrySelector .flag100 { background-position: 0px -350px; }
 .footerCountrySelector .flag101 { background-position: -16px -350px; }
 .footerCountrySelector .flag102 { background-position: -32px -350px; }
 .footerCountrySelector .flag103 { background-position: -48px -350px; }
 .footerCountrySelector .flag104 { background-position: -64px -350px; }
 .footerCountrySelector .flag105 { background-position: -80px -350px; }
 .footerCountrySelector .flag106 { background-position: -96px -350px; }
 .footerCountrySelector .flag107 { background-position: -112px -350px; }
 .footerCountrySelector .flag108 { background-position: -128px -350px; }
 .footerCountrySelector .flag109 { background-position: -144px -350px; }
 .footerCountrySelector .flag110 { background-position: -160px -350px; }
 .footerCountrySelector .flag111 { background-position: -176px -350px; }
 .footerCountrySelector .flag112 { background-position: -192px -350px; }
 .footerCountrySelector .flag113 { background-position: -208px -350px; }
 .footerCountrySelector .flag114 { background-position: -224px -350px; }
 .footerCountrySelector .flag116 { background-position: -240px -350px; }
 .footerCountrySelector .flag117 { background-position: -256px -350px; }
 .footerCountrySelector .flag118 { background-position: -272px -350px; }
 .footerCountrySelector .flag119 { background-position: -288px -350px; }
 .footerCountrySelector .flag120 { background-position: -304px -350px; }
 .footerCountrySelector .flag121 { background-position: -320px -350px; }
 .footerCountrySelector .flag122 { background-position: -336px -350px; }
 .footerCountrySelector .flag123 { background-position: -352px -350px; }
 .footerCountrySelector .flag124 { background-position: -368px -350px; }
 .footerCountrySelector .flag126 { background-position: -384px -350px; }
 .footerCountrySelector .flag127 { background-position: -400px -350px; }
 .footerCountrySelector .flag128 { background-position: -416px -350px; }
 .footerCountrySelector .flag129 { background-position: -432px -350px; }
 .footerCountrySelector .flag130 { background-position: -448px -350px; }
 .footerCountrySelector .flag131 { background-position: -464px -350px; }
 .footerCountrySelector .flag132 { background-position: -480px -350px; }
 .footerCountrySelector .flag133 { background-position: -496px -350px; }
 .footerCountrySelector .flag134 { background-position: 0px -366px; }
 .footerCountrySelector .flag135 { background-position: -16px -366px; }
 .footerCountrySelector .flag136 { background-position: -32px -366px; }
 .footerCountrySelector .flag137 { background-position: -48px -366px; }
 .footerCountrySelector .flag138 { background-position: -64px -366px; }
 .footerCountrySelector .flag139 { background-position: -80px -366px; }
 .footerCountrySelector .flag140 { background-position: -96px -366px; }
 .footerCountrySelector .flag141 { background-position: -112px -366px; }
 .footerCountrySelector .flag142 { background-position: -128px -366px; }
 .footerCountrySelector .flag143 { background-position: -144px -366px; }
 .footerCountrySelector .flag144 { background-position: -160px -366px; }
 .footerCountrySelector .flag146 { background-position: -176px -366px; }
 .footerCountrySelector .flag147 { background-position: -192px -366px; }
 .footerCountrySelector .flag148 { background-position: -208px -366px; }
 .footerCountrySelector .flag149 { background-position: -224px -366px; }
 .footerCountrySelector .flag151 { background-position: -240px -366px; }
 .footerCountrySelector .flag152 { background-position: -256px -366px; }
 .footerCountrySelector .flag153 { background-position: -272px -366px; }
 .footerCountrySelector .flag154 { background-position: -288px -366px; }
 .footerCountrySelector .flag155 { background-position: -304px -366px; }
 .footerCountrySelector .flag156 { background-position: -320px -366px; }
 .footerCountrySelector .flag157 { background-position: -336px -366px; }
 .footerCountrySelector .flag158 { background-position: -352px -366px; }
 .footerCountrySelector .flag159 { background-position: -368px -366px; }
 .footerCountrySelector .flag160 { background-position: -384px -366px; }
 .footerCountrySelector .flag161 { background-position: -400px -366px; }
 .footerCountrySelector .flag162 { background-position: -416px -366px; }
 .footerCountrySelector .flag163 { background-position: -432px -366px; }
 .footerCountrySelector .flag164 { background-position: -448px -366px; }
 .footerCountrySelector .flag165 { background-position: -464px -366px; }
 .footerCountrySelector .flag166 { background-position: -480px -366px; }
 .footerCountrySelector .flag167 { background-position: -496px -366px; }
 .footerCountrySelector .flag168 { background-position: 0px -382px; }
 .footerCountrySelector .flag169 { background-position: -16px -382px; }
 .footerCountrySelector .flag170 { background-position: -32px -382px; }
 .footerCountrySelector .flag171 { background-position: -48px -382px; }
 .footerCountrySelector .flag172 { background-position: -64px -382px; }
 .footerCountrySelector .flag173 { background-position: -80px -382px; }
 .footerCountrySelector .flag174 { background-position: -96px -382px; }
 .footerCountrySelector .flag175 { background-position: -112px -382px; }
 .footerCountrySelector .flag180 { background-position: -128px -382px; }
 .footerCountrySelector .flag186 { background-position: -144px -382px; }
 .footerCountrySelector .flag187 { background-position: -160px -382px; }
 .footerCountrySelector .flag189 { background-position: -176px -382px; }
 .footerCountrySelector .flag190 { background-position: -192px -382px; }
 .footerCountrySelector .flag192 { background-position: -208px -382px; }
 .footerCountrySelector .flag194 { background-position: -224px -382px; }
 .footerCountrySelector .flag198 { background-position: -240px -382px; }
 .footerCountrySelector .flag200 { background-position: -256px -382px; }
 .footerCountrySelector .flag202 { background-position: -272px -382px; }
 .footerCountrySelector .flag204 { background-position: -288px -382px; }
 .footerCountrySelector .flag205 { background-position: -304px -382px; }
 .footerCountrySelector .flag206 { background-position: -320px -382px; }
 .footerCountrySelector .flag207 { background-position: -336px -382px; }
 .footerCountrySelector .flag208 { background-position: -352px -382px; }
 .footerCountrySelector .flag212 { background-position: -368px -382px; }
 .footerCountrySelector .flag216 { background-position: -384px -382px; }
 .footerCountrySelector .flag219 { background-position: -400px -382px; }
 .footerCountrySelector .flag222 { background-position: -416px -382px; }
 .footerCountrySelector .flag223 { background-position: -432px -382px; }
 .footerCountrySelector .flag227 { background-position: -448px -382px; }
 .footerCountrySelector .flag234 { background-position: -464px -382px; }
 .footerCountrySelector .flag237 { background-position: -480px -382px; }
 .footerCountrySelector .flag239 { background-position: -496px -382px; }
/* END footer Contry Selector styles */
/* BEGIN buttons */
.glbBtn:hover
{
	text-decoration: none !important; /* override standard link behavior */
}
.glbBtn
{
	border-right:  1px solid #bbbbbb;
    cursor: pointer;
    background-color: #eeeeee;	/*background-color: transparent;*/
	background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    display: inline-block;
    *display: inline; /* IE7 fix */
    *zoom: 1; /* IE7 fix */
}
span:hover.glbBtn,
a:hover.glbBtn,
span:hover.glbBtn input
{
   color: #893cd1;
}
span:active.glbBtn,
a:active.glbBtn
{
    color: #673695;
}
span.glbBtn.glbBtnDisabled, 
a.glbBtn.glbBtnDisabled, 
.glbBtnDisabled input
{
    color: #999999 !important;
    cursor: default;
}
.glbBtnA, 
span:active.glbBtnA.glbBtnDisabled,
a:active.glbBtnA.glbBtnDisabled
{
    margin: 0px 0px 0px 0px;
    padding: 5px 8px 5px 8px;
    height: 16px; /* needed for mac display issues */
    background-position: 0px -90px;
    height: 16px; /* Safari on Mac fix */
}
span:active.glbBtnA,
a:active.glbBtnA,
a:focus.glbBtnA
{
    background-position: 0px -116px; /* active state has darker top bg and all dark borders (don't confuse with hover state) */
	/*outline: #ffffff dotted 1px;*/ /* for FF (and IE8+ when we drop 7 compat mode); maybe we don't want this */
} 
.glbBtnB, 
span:active.glbBtnB.glbBtnDisabled,
a:active.glbBtnB.glbBtnDisabled
{
    margin: 0px 0px 0px 0px;
    padding: 0 15px !important;
    /**padding-top: 8px;*/ /* IE7 fix */
    background-position: 0px -194px;
    height: 34px; /* Safari on Mac fix */
line-height:36px; /* To vertically center the button */
text-shadow: 1px 1px #fff
}
span:active.glbBtnB,
a:active.glbBtnB,
a:focus.glbBtnB /* for FF and IE8 */
{
    background-position: 0px -228px; /* active state has darker top bg and all dark borders (don't confuse with hover state) */
	/*outline: #ffffff dotted 1px;*/ /* for FF (and IE8+ when we drop 7 compat mode); maybe we don't want this */
}
.glbBtnD, 
span:active.glbBtnD.glbBtnDisabled,
a:active.glbBtnD.glbBtnDisabled
{
    margin: 0px 0px 0px 0px;
    padding: 0 15px !important;
    height: 34px;
	line-height: 36px; /* To vertically center the button */
	text-shadow: 1px 1px #fff;
	color:#333;
    background-position: 0px -398px;
}
span:hover.glbBtnD,
a:hover.glbBtnD
{
    background-position: 0px -432px; /* active state has darker top bg and all dark borders (don't confuse with hover state) */
	/*outline: #ffffff dotted 1px;*/ /* for FF (and IE8+ when we drop 7 compat mode); maybe we don't want this */
} 
span:active.glbBtnD,
a:active.glbBtnD,
a:focus.glbBtnD
{
	color:#333;
    background-position: 0px -466px; /* active state has darker top bg and all dark borders (don't confuse with hover state) */
	/*outline: #ffffff dotted 1px;*/ /* for FF (and IE8+ when we drop 7 compat mode); maybe we don't want this */
} 
/* END buttons */
/*  START Global Button Skeleton */
a.globalButton {
	color:#fff !important;
	font-family: Arial !important;
	font-weight:bold !important;
	font-size:12px !important;
	white-space: nowrap !important;
	overflow: visible !important;		
	cursor:pointer !important;			
	height:18px !important;
	display: inline-block !important;
	display: -moz-inline-box !important;
	zoom: 1 !important;
	vertical-align:middle !important;
	text-decoration: none !important;
	padding: 0px 8px 1px 8px ;
	line-height: 16px;
}
input.globalButton {
	color:#fff !important;
	font-family: Arial !important;
	font-weight:bold !important;
	font-size: 12px !important;
	white-space: nowrap !important;
	overflow: visible !important;		
	cursor: pointer !important;			
	display: block !important;
	zoom: 1 !important;
	vertical-align:middle !important;
	text-decoration: none !important;
	padding: 2px 8px 0 8px;
}
button.globalButton {
	color:#fff !important;
	font-family: Arial !important;
	font-weight:bold !important;
	font-size: 12px !important;
	white-space: nowrap !important;
	overflow: visible !important;		
	cursor: pointer !important;			
	display: block !important;
	zoom: 1 !important;
	vertical-align:middle !important;
	text-decoration: none !important;
	padding: 2px 8px 0 8px;
}
.globalButton:hover { 
	color: white !important; 
	text-decoration: none !important; 
}
@media all and (min-width: 0px){ 
	.globalButton  { 
		margin:0px !important; 
		padding-top: 0px !important; 
		line-height: 18px; 
		height:19px !important;
	}
}
*:first-child+html .globalButton { 
	padding-top: 0px !important; 
	line-height: 18px !important;
}
/*  END Global Button Skeleton */
/*  START Global Button Styles */
.gbOrangeButton
{ 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -420px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#dc8f60 #a3531f #a3531f #dc8f60;
	background-color: #ec8632;
}
.gbOrangeButton:hover { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -439px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#e68d43 #853106 #853106 #e68d43;
	background-color: #ec8632;
}
.gbOrangeButtonSSL { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -420px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#dc8f60 #a3531f #a3531f #dc8f60;
	background-color: #ec8632;
	text-indent: 0 !important;
}
.gbOrangeButtonSSL:hover { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -439px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#e68d43 #853106 #853106 #e68d43;
	background-color: #ec8632;
}
.gbOrangeButtonSSL span.gbButtonLock {
    background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat;
	background-position: -563px 0px; 
	height: 14px;
	width: 8px;
	float: left;
	text-indent: -100em;
	margin: 0px 6px 0 0;
}
.gbGreenButton  { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -516px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#abb85f #657116 #657116 #abb85f;
	background-color: #abc03d;
}
.gbGreenButton:hover { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -535px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#b7c859 #424f03 #424f03 #b7c859;
	background-color: #abc03d;
}
.gbPurpleButton { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -382px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#cfb4db #684477 #4f325b #9b7aaa;
	background-color: #825995;
}
.gbPurpleButton:hover { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -401px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#bfa4cb #583467 #3f224b #8b6a9a;
	background-color: #825995;
}
/* Regular Size Disabled Button */
.gbGrayButton { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -458px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#cdcec6 #7c7e77 #7c7e77 #cdcec6;
}
/*Small Size Disabled Button */
.gbGraySmallButton { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -477px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#c0c1ba #8d8f88 #8d8f88 #c0c1ba; 
	color:#fff !important; 
	font: normal 10px Arial !important; 
	white-space: nowrap !important; 
	cursor:pointer !important; 
	height:13px !important; 
	padding:0px 4px;
	display: inline-block !important; 
	display: -moz-inline-box !important; 
	zoom: 1 !important; 
	vertical-align:middle !important; 
	text-decoration: none !important; 
}
a.gbGreenSmallButton {
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -490px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#9cb368 #666633 #666633 #9cb368; 
	color:#fff !important; 
	font: normal 10px Arial !important; 
	white-space: nowrap !important; 
	cursor:pointer !important; 
	height:13px !important; 
	padding:0px 4px;
	display: inline-block !important; 
	display: -moz-inline-box !important; 
	zoom: 1 !important; 
	vertical-align:middle !important; 
	text-decoration: none !important;
}
a.gbGreenSmallButton:hover { 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x;
	background-position: 0px -503px; 
	border-width:1px; 
	border-style:solid; 
	border-color:#bdd091 #7e9055 #7e9055 #bdd091; 
	text-decoration: none !important;
}
/* START fb button*/
/* #btnFcbk{
	    background: url("http://media.newjobs.com/mm/redux/buttons/facebookBig.png") repeat scroll left transparent;
		height: 49px;
		line-height: 46px;
		display: inline-block;
		margin: 0 10px 0 0;
		padding: 0 0 0 58px;
		postion: relative;
}
#btnFcbk.fntFcbk
{
	color : #fff; 
	font-family: Arial; 
	font-size: 15px; 
	font-weight: bold;
	text-decoration: none;
	text-shadow: #000 0px -1px 0px;
 }	
#btnFcbk span {
	background: url("http://media.newjobs.com/mm/redux/buttons/facebookBig.png") no-repeat scroll right center transparent;
	height: 49px;
	width: 7px;
	left: 7px;
	position: relative;
	float: right;
	*float:none;
	*vertical-align:middle;
	*zoom:1;		
}*/
span.circleSeparator  { 
	text-align: center;
	width: 100%;
	display: block;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #fff;
	height: 0px;
	top: 20px;
	margin: 25px 0 35px 0;
}
span.circleSeparator b { 
	background-color: #fff; 
	font-family: Arial; 
	font-size: 13px; 
	color: #999999; 
	padding: 14px 10px;
	border-radius: 50px;
	box-shadow: 0px 1px 1px #555 inset;
	display: inline-block;
	min-width: 24px;
	margin: auto;
	margin-top: -22px;
}
span.separator
{
    text-align: center;
	width: 100%;
	display: block;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #fff;
	height: 0px;
	margin: 0 0 20px 0px;
	*margin: 20px 0px;
	}
span.separator b { 
	background-color: #fff; 
	font-family: Arial; 
	font-size: 13px; 
	color: #999999; 
	padding: 14px 2px;
	display: inline-block;
	min-width: 24px;
	margin: auto;
	margin-top: -22px;
}
/* END fb button*/
/*  END Global Button Styles */
.ctlTitledSections
{
    background-color: #fff; 
    padding: 0; 
    margin:0 0 0 0;
    border: 1px solid #ccc;
}
.ctlTitledSections_title
{
    background: transparent url(http://media.newjobs.com/mm/redux/TitledSections/container_title_bgd.png) repeat-x; 
    height: 25px;
    margin:0; 
    padding: 0px 5px 0px 15px;
    border-bottom: 1px solid #ccc;
}
.ctlTitledSections_title h3
{
   margin: 0; 
   padding: 5px 0; 
   color: #fe700d; 
   font-size: 12px;
}
.ctlTitledSections_right_btn
{
  margin:4px; 
  padding: 2px 5px;
  background-color: #e3e4d1;
  border: 1px solid #cccccc;
  font-size: 0.8em;
  font-weight: bold;
  color: #aca9a9;
  float: right;
}
.ctlTitledSections_content 
{
    margin:0; 
    padding: 22px 15px; 
}
.ctlTitledSections_content p
{
    margin:0; 
    padding: 0; 
    font-size: 11px;
}
/* Menu item on flyout Menu */
.fpwItemStyle
{
	font-Size:11;
    margin: 0px;
    color: #846990;
	display: block;
	cursor: pointer;
    padding: 3px;
    border: 0px;
     background: transparent url(http://media.newjobs.com/mm/redux/flyOutMenu/fpwdottedbg.gif) repeat-x bottom left;
        }
.fpwItemHoverStyle 
{
	 margin-top:0px;
	 font-Size:11;
     color: #846990;
      border: 0px;
      padding: 3px;
       cursor: pointer;
       display: block;
      background: #b6bdd2 url(http://media.newjobs.com/mm/redux/flyOutMenu/fpwdottedbg.gif) repeat-x bottom left;
 }
 .fpwItemStyleIE6 {
      font-Size:11px;
      margin: 5;
      color: #846990;
      cursor: pointer;
      padding: 3px;
      display: inline-block;
      background: transparent url(http://media.newjobs.com/mm/redux/flyOutMenu/fpwdottedbg.gif) repeat-x bottom left;
    }
 .fpwItemHoverStyleIE6 {
	  font-Size:11px;
	  margin: 0;
	  color: #f48d1f;
      cursor: pointer;
      padding: 3px;
      display: inline-block;
      background: transparent url(http://media.newjobs.com/mm/redux/flyOutMenu/fpwdottedbg.gif) repeat-x bottom left;
    }
  .fpwItemStyleDisabled
  {
    font-Size:11;
    margin: 0px;
    color: #846990;
	display: block;
	padding: 3px;
    border: 0px;
    background-color: transparent !important;
    cursor:default !important;
  }
 .fpwItemStyleBlank
	{
	  font-Size:11px;
      margin: 0px;
      color: #846990;
      display: block;
      cursor: pointer;
      padding: 3px;
      border: 0px;
      _display: inline-block;
      background: transparent no-repeat bottom left;
    }
 .fpwItemStyleHoverBlank
	{
	  font-Size:11px;
      margin: 0px;
      color: #f48d1f;
      display: block;
      cursor: pointer;
      padding: 3px;
      border: 0px;
      font-weight:bold;
      _display: inline-block;
      background: transparent no-repeat bottom left;
    }
/******* Basic Style for fly-out popup window **********/
.fpwdialog {
 position:relative;
 /*margin:0px auto;*/
 width:130px;
 min-width:110px;
 max-width:760px; /* based on image dimensions - not quite consistent with drip styles yet */
 color:#000;
 z-index:1;
 text-align:left;
 margin-left:16px; /* default, width of left corner */
 margin-bottom:10px; /* spacing under dialog */
 min-height:50px;
}
.fpwdialog .fpwcontent,
.fpwdialog .fpwtop,
.fpwdialog .fpwbottom,
.fpwdialog .fpwbottom div {
 /*background:transparent url(dialogBox.png) no-repeat top right;*/
 background-color:Transparent;
 /*background-image:url(dialogBox.png);*/
 background-repeat:no-repeat;
 background-position:top right;
  /*_background-image:url(dialogBoxIE6RightArrow.gif);*/
}
.fpwdialog .fpwcontent {
 position:relative;
 _zoom:1; /*  hack for ie6*/
 _overflow-y:hidden;
 /*padding:0px 17px 0px 0px;*/
padding-right:17px;
}
.fpwdialog .fpwtop {
 /* top+left vertical slice */
 position:absolute;
 left:0px;
 top:0px;
 width:16px; /* top slice width */
 margin-left:-16px;
 height:100%;
 _height:500px; /* arbitrary long height, IE 6 */
 background-position:top left;
}
.fpwdialog .fpwbottom {
 /* bottom */
 position:relative;
 width:100%;
}
.fpwdialog .fpwbottom,
.fpwdialog .fpwbottom div {
 height:30px; /* height of bottom cap/shade */
 font-size:1px;
}
.fpwdialog .fpwbottom {
 background-position:bottom right;
 background-repeat:no-repeat;
 }
.fpwdialog .fpwbottom div {
 position:relative;
 width:16px; /* bottom corner width */
 margin-left:-16px;
 background-position:bottom left;
 background-repeat:no-repeat;
}
.fpwdialog .wrapper {
 /* extra content protector - preventing vertical overflow (past background) */
 position:static;
 max-height:500px;
 min-height:130px;
 overflow:auto; /* note that overflow:auto causes a rather annoying redraw "lag" in Firefox 2, and may degrade performance. Might be worth trying without if you aren't worried about height/overflow issues. */
}
.fpwtitleheader
{
	border:0px solid blue;
	width:100%;
	height:40px;
	clear:both
}
.fpwdialog p {
 margin:0px; /* margins will blow out backgrounds, leaving whitespace. */
 color:#846990; 
 padding-left:10px;
 }
.fpwdialog ul {
 margin:0; /* margins will blow out backgrounds, leaving whitespace. */
 padding-left:10px;
 padding-right:10px;
 border:0px solid blue;
 clear:both;
}
.fpwdialog h1 {
 padding-bottom:0px;
 color:#af5c31;
 font-size:11px;
 font-weight:bold;
 font-family:Verdana;
 padding-left:5px;
 padding-right:15px;
 margin-top:0px;
 padding-top:17px;
 float:left;
}
a.fpwCloseImg
{
	display:block;
	float:right; 
	cursor:pointer; 
	margin-top: 17px;
	padding-right:10px; 
	background: url(http://media.newjobs.com/mm/redux/flyOutMenu/fpwclose.gif) no-repeat top left; 
	width: 13px; 
	height: 13px;
}
a.fpwCloseImgWhite
{
	display:block;
	float:right; 
	cursor:pointer; 
	margin-top: 17px;
	padding-right:10px; 
	background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat 0px -418px; 
	width: 13px; 
	height: 13px 
}
/* Static Flyout*/
.fpwdialogStatic {
 position:relative;
 /*margin:0px auto;*/
 width:120px;
 min-width:110px;
 max-width:760px; /* based on image dimensions - not quite consistent with drip styles yet */
 color:#000;
 z-index:1;
 text-align:left;
 margin-top: -16px !important;
 margin-left: 10px !important;
 margin-bottom:10px; /* spacing under dialog */
 min-height:50px;
}
.fpwdialogStatic .fpwcontent,
.fpwdialogStatic .fpwtop,
.fpwdialogStatic .fpwbottom,
.fpwdialogStatic .fpwbottom div {
 background:transparent url(http://media.newjobs.com/mm/redux/flyOutMenu/fpwBoxRightArrow.png) no-repeat top right;
 background-color:Transparent;
 /*background-image:url(dialogBox.png);*/
 background-repeat:no-repeat;
 background-position:top right;
 _background-image:url(http://media.newjobs.com/mm/redux/flyOutMenu/fpwBoxIE6RightArrow.gif);
}
.fpwdialogStatic .fpwcontent {
 position:relative;
 _zoom:1; /*  hack for ie6*/
 _overflow-y:hidden;
 /*padding:0px 17px 0px 0px;*/
padding-right:17px;
}
.fpwdialogStatic .fpwcontent li{
 cursor: pointer;
}
.fpwdialogStatic .fpwtop {
 /* top+left vertical slice */
 position:absolute;
 left:0px;
 top:0px;
 width:16px; /* top slice width */
 margin-left:-16px;
 height:100%;
 _height:500px; /* arbitrary long height, IE 6 */
 background-position:top left;
}
.fpwdialogStatic .fpwbottom {
 /* bottom */
 position:relative;
 width:100%;
}
.fpwdialogStatic .fpwbottom,
.fpwdialogStatic .fpwbottom div {
 height:30px; /* height of bottom cap/shade */
 font-size:1px;
}
.fpwdialogStatic .fpwbottom {
 background-position:bottom right;
 background-repeat:no-repeat;
 }
.fpwdialogStatic .fpwbottom div {
 position:relative;
 width:16px; /* bottom corner width */
 margin-left:-16px;
 background-position:bottom left;
 background-repeat:no-repeat;
}
.fpwdialogStatic .wrapper {
 /* extra content protector - preventing vertical overflow (past background) */
 position:static;
 max-height:500px;
 min-height:130px;
 overflow:auto; /* note that overflow:auto causes a rather annoying redraw "lag" in Firefox 2, and may degrade performance. Might be worth trying without if you aren't worried about height/overflow issues. */
}
/* CSS stylesheet for the DropDownCheckBoxList control */
/**
  * Styles controlling the rendering of the checkbox list
 **/
div.DropDownCheckBoxList {}
div.DropDownCheckBoxList div.comboBox {
  /* border */
  border-color: #B2B6C1;
  border-style: solid;
  border-width: 1px;
  /* size */
  height: 20px;
  line-height: 20px;
  /* background */
  background-color: white;
}
div.DropDownCheckBoxList div.comboBoxFocus {
  /* border */
  border-color: #B2B6C1;
  border-style: solid;
  border-width: 1px;
  /* size */
  height: 20px;
  line-height: 20px;
  /* background */
  background-color: white;
}
div.DropDownCheckBoxList div.comboText {
  font-family:Verdana, Geneva, Arial, Helvetica, sans-serif;
  font-size: 11px;
  color: #676565;
  line-height: 18px;
  padding-left: 2px;
  cursor: pointer;
  padding-left:2px !important;
}
div.DropDownCheckBoxList div.comboImage {
  width: 18px;
  height: 18px;
  padding-right: 1px;
  padding-top: 1px;
}
/**
  * Styles controlling the rendering of the checkbox list
 **/
div.DropDownCheckBoxList div.CheckBoxList {float:left;}
div.DropDownCheckBoxList div.TwoTierCheckBoxList {border: 1px solid #7f9db9;background-color: #FFF;}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.folder,
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.folderSelected {
  font: 11px Verdana, Geneva, Arial, Helvetica, sans-serif;
  color: #333333;
  cursor:pointer;
  min-height:16px;
}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.folderSelected {font-weight:bold;}
div.DropDownCheckBoxList div.TwoTierCheckBoxList .cbl_folder {
  cursor:pointer;
  height:16px;
  padding-left: 20px;
}
div.DropDownCheckBoxList div.TwoTierCheckBoxList .collapse {
  background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat 0px -437px;
  margin-left: 5px; 
  margin-top: 1px;
}
div.DropDownCheckBoxList div.TwoTierCheckBoxList .expand {
  background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat 0px -456px;
  margin-left: 5px;
  margin-top: 1px;
}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.folderSelected div.item,
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.folder div.item {
  padding:0px 0px 0px 20px !important;
}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.item {
  font-size:8pt;
  font-weight:normal;
  cursor:auto;
  padding:0 0 0 2px !important;
}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.item input {font-size:8pt;height:16px;vertical-align:middle;}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.item .cbl_item {padding-left:2px;line-height:16px;}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.folder div.item label,
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.folderSelected div.item label {
  font-family: Verdana, Geneva, Arial, Helvetica, sans-serif !important;
  font-size: 10px !important;
  font-style: normal;
  white-space: normal;
  color: #333333;
  vertical-align: middle;
  height:16px;
}
div.DropDownCheckBoxList div.TwoTierCheckBoxList div.item label {
  font-family: Verdana, Geneva, Arial, Helvetica, sans-serif !important;
  font-size: 11px !important;
  font-style: normal;
  white-space: normal;
  color: #333333;
  vertical-align: middle;
  height:16px;
}
/**
  * Styles controlling the rendering of the checkbox list footer (unselect and close buttons)
 **/
div.DropDownCheckBoxList div.checkBoxListFooter {
  height: 24px;
  width:100%;
  font-family: Verdana !important;
  font-size: 11px !important;
  color: #FFFFFF !important;
  position: relative;
}
div.DropDownCheckBoxList div.checkBoxListFooter a.leftLink {
  font-family: Verdana !important;
  font-size: 10px !important;
  text-decoration:underline !important;
  color: #727D5F !important;
  padding-left:5px;
}
div.DropDownCheckBoxList div.checkBoxListFooter a.rightLink {
  font-family: Verdana !important;
  font-size: 10px !important;
  text-decoration:underline !important;
  color: #727D5F !important;
}
div.DropDownCheckBoxList div.checkBoxListFooter td.leftFooterCorner {
  background: url(http://media.newjobs.com/mm/redux/jobsearch/jsr/js_combo_left.png) no-repeat;
  width: 6px;
  height: 24px;
}
div.DropDownCheckBoxList div.checkBoxListFooter td.rightFooterCorner {
  background: url(http://media.newjobs.com/mm/redux/jobsearch/jsr/js_combo_right.png) no-repeat;
  width: 6px;
  color: #7f9db9;
}
div.DropDownCheckBoxList div.checkBoxListFooter td.centerFooter {
  background: url(http://media.newjobs.com/mm/redux/jobsearch/jsr/js_combo_body.png) repeat-x;
}
.loader { height: 100%; width: 100%; position: relative; background: url(http://media.newjobs.com/mm/redux/ajax/loading.gif) 50% 50% no-repeat; }
div.DropDownCheckBoxList td, div.DropDownCheckBoxList th { border: 0 !important; padding: 0 !important; }
#ddcbl_close {
  height:13px; width: 13px; text-indent: -5000px; 
  background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat 0px -418px;
}
/******* TEMPORARY STYLES CREATED BY KSODERSTROM - UX TO REPLACE ********/
/******* =#ratingStackedFiveStars ********/
.ratingStackedFiveStars { background:transparent url(http://media.newjobs.com/id/content20/CORE/stars_stacked_small.gif) repeat scroll 0%; height:12px; width:60px;}
/******* =#blk ********/
#blk img.thumbnail { margin: 0 5px 5px 0; }
/******* =#blkShrd ********/
#blkShrd { padding:0; margin:0; }
#blkShrd div.header { padding: 5px; border-bottom: solid 1px #8c8b8b; font-weight:bold; font-size:12px; color:#564060; }
#blkShrd div.item { margin: 0px; display: inline;}
#blkShrd img.thumbnailFL { float:left; margin: 0 5px 5px 0; }
#blkShrd img.thumbnailTNF { margin: 5px; }
.monthYearPicker{
	display: block;
	clear: both;
}
.monthYearPicker .monthYearPicker_helpContainer,
.monthYearPicker img.monthYearPicker_helpIcon,
.editMode .monthYearPicker .monthYearPicker_helpContainer.hidden{
	display: none;
}
.editMode .monthYearPicker .monthYearPicker_helpContainer{
	display: block;
	clear: both;
}
.monthYearPicker .monthYearPicker_helpContainer span{
	display: none !important;
}
.editMode .monthYearPicker img.monthYearPicker_helpIcon{
	display: inline;
	margin: 2px;
	cursor: pointer;
}
.monthYearPicker .monthYearPicker_dayField{
	width: auto;
}
.monthYearPicker .monthYearPicker_monthField{
	width: auto;
}
.monthYearPicker .monthYearPicker_selectOptionsField{
	width: 230px !important;
}
.ToolBox {
   width: 180px;
   margin:0;
   padding:0;
}
.ToolBoxTitle
{
    height: 30px; 
    padding: 5px 11px; 
}
.ToolBox h2 {
    /*font-weight:bold; 
    color: #564060;
    font-size: 13px;*/
    padding: 6px 0 0 0;
    margin:0;
}
.ToolBox h3 {
    border-top: 1px solid #dfdfd7;
    border-bottom: 1px solid #dfdfd7;
    background-color: #f9f9f4;
    padding: 7px 11px;
    margin: 10px 1px 1px 1px;
    /*font-size: 13px;
    color: #564060;*/
}
#helpAndAdviceBoxTitleIcon { 
  /*  background: transparent url(http://media.newjobs.com/mm/redux/jobsearch/rightUtilities/right_utilities_help_icon.gif) no-repeat 0 3px;*/
    padding-left: 0px;
}
#showMeBox div, #currentSearchBox div{
    padding: 10px 10px 10px 15px;
}
.expanded_li, .collapsed_li {
   list-style: none;
   font-weight: bold;
}
.expanded_li .toolbox_arrow,.collapsed_li .toolbox_arrow {
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	float: left;
	margin-left: -11px;
	margin-top: 3px;
}
.expanded_li .toolbox_arrow {
	background-position: -274px -50px;
	width: 7px;
	height: 7px;
}
.collapsed_li .toolbox_arrow {
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	background-position: -281px -50px;
	width: 7px;
	height: 7px;   
}
.expandedContent
{
    background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	background-position: -751px 0px;;
}
.collapsedContent
{
    background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	background-position: -571px 0px;;
    padding-bottom: 15px;
}
.BoxIndicator_expanded {
    background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	background-position: -377px -50px;;
	width: 17px;
	height: 17px;
	display: block;
    cursor: pointer;
    float: right;
    margin:4px 0;
	padding:0;
    }
.BoxIndicator_collapsed {
    background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	background-position: -360px -50px;
	width: 17px;
	height: 17px;
	display: none;
    cursor: pointer;
    float: right;
    margin:4px 0;
	padding:0;
    }
.expandedBgd {
    margin: 0;
    padding: 0 0 10px 0;
	border-right: 1px solid #e8d7ee;
	border-left: 1px solid #e8d7ee;
}
.bottomBgd {
    background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	background-position: -13px -50px;;
    height: 20px;
    padding: 0px;
	margin: 0 0 0 -1px;
	width:180px;
}
#showMeContent, #CurrentSearchContent, #helpAndAdviceContent {
    /*font-size: 10px;    
    color: #6b407f;*/
    margin:0; 
    padding: 0px; 
}
#showMeContent ul, #helpAndAdviceContent ul, #helpAndAdviceContent p {
   margin: 0px 10px 0px 17px;
   padding: 5px 0 0 0;
   border-top: 1px solid white;
} 
.showMeContent_li {
   margin: 4px 0px 4px 6px; 
   padding: 1px 2px 2px 3px; 
   cursor: pointer;
   }
.slpHeadBoard .headBoard {float:left}    
.slpHeadBoard .headBoard .homeHeader  {width:575px; height:250px; float:left; margin-right:12px; background:#f4f4f4 url(http://media.newjobs.com/mm/redux/headboard/images/wwwHeadboardJobsearch.jpg) no-repeat 0 0;}
.slpHeadBoard .headBoard .homeHeader  .content{padding:19px 0 0 21px;}
.slpHeadBoard .headBoard .homeHeader  .content h1{margin:0 0 3px;}
.slpHeadBoard .headBoard .homeHeader  .content h2{margin:0 0 28px; padding-right:215px;}
.slpHeadBoard .headBoard .homeHeader  .content .links a{display:inline-block; margin-bottom:11px;}
.slpHeadBoard .headBoard .homeHeaderStaticProfile  { background:transparent url(http://media.newjobs.com/mm/redux/headboard/images/profile_static.jpg) no-repeat 0 0; width:575px;height:250px;}
.slpHeadBoard .headBoard .homeHeaderStaticJobSearch  { background:transparent url(http://media.newjobs.com/mm/redux/headboard/images/jobsearch_static.jpg) no-repeat 0 0; width:575px;height:250px;}
.slpHeadBoard .headBoard .homeHeader #JobsHeaderStaticDiv {position: relative; color: White; text-align: center;}
.slpHeadBoard .headBoard .homeHeader #JobsHeaderStaticDiv .JHBmessage1 {position: absolute; width: 340px; right: 0px; top: 55px; font-size: 26px; padding: 0 5px;}
.slpHeadBoard .headBoard .homeHeader #JobsHeaderStaticDiv .JHBmessage2 {position: absolute; width: 340px; right: 0px; top: 150px; font-size: 20px; padding: 0 5px;}
.slpHeadBoard .headBoard .homeHeader #ProfileHeaderStaticDiv {position: relative; color: White; text-align: center;}
.slpHeadBoard .headBoard .homeHeader #ProfileHeaderStaticDiv #JHBmessage1 {position: absolute; width: 340px; right: 0px; top: 55px; font-size: 26px; padding: 0 5px;}
.slpHeadBoard .headBoard .homeHeader #ProfileHeaderStaticDiv #JHBmessage2 {position: absolute; width: 340px; right: 0px; top: 150px; font-size: 20px; padding: 0 5px;}
.slpHeadBoard .headBoard .homeHeader .messageText {float:left; margin-top:35px; display:none; width: 245px; padding: 0 15px; text-align:center;}
.slpHeadBoard .homeHeaderTitle {color:#a8ca47; font-size: 18px;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderText{margin-top:10px;color:#fff;font-size: 13px;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons{color:#fff;text-align:center;margin-top:40px;z-index:0;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderProfile a {color: #fff !important;text-decoration:none;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderProfile a:hover span{text-decoration: underline;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderJobs a  {color: #fff !important;text-decoration:none;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderJobs a:hover span{text-decoration: underline;}    
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderCareerTool a:hover span {text-decoration: underline !important;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderCareerTool a {color: #fff !important;text-decoration:none;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderHome a:hover span {text-decoration: underline !important;}
.slpHeadBoard .headBoard .homeHeader .messageText .homeHeaderIcons .homeHeaderHome a {color: #fff !important;text-decoration:none;}
.slpHeadBoard .headBoard .homeHeader .messageTextOnly {position:relative;height:230px;padding-left:20px;padding-top:30px;display:none;width: 450px; text-align: center !important;color: #fff;}
.messageTextOnly .line1{color: #A8CA42; font-size: 26px; margin-bottom: 5px; padding: 0 10px;}
.messageTextOnly .line2{color:#F7F883; font-size:18px;}
.messageTextOnly .line3{color: #fff;right:85px;position:absolute;bottom:25px;text-align: right !important;}
.messageTextOnly .line4{font-size:10px;color: #fff;right:85px;position:absolute;bottom:13px;text-align: right !important;}
.slpHeadBoard .headBoard .homeHeader .flashSlideShow {width:auto;height:auto;display:none;}
.slpHeadBoard .headerContentWrapper {clear:both;padding-top:10px;}
.homeHeaderJobs .headboardIcon {height: 48px;}
#homeHeader .flashPlayer {float: left; width: 280px; display: none; padding: 20px 0 0 20px; background-color: #7B4F90; }
#homeHeader div#flashVideo {width: 280px;}
#homeHeader div#messageTextWithVideoWrapper {background-color: #7B4F90;}
#homeHeader #messageTextWithVideoWrapper table {margin-top: 15px !important;}
#homeHeader #messageTextWithVideoWrapper table td {padding: 0 5px;}
#homeHeader #messageTextWithVideoWrapper table .icon {height: 48px;}
#homeHeader #messageTextWithVideoWrapper table .iconP span {width: 53px !important; height: 41px !important;}
#homeHeader #messageTextWithVideoWrapper table .iconCT span {width: 53px !important; height: 48px !important;}
#homeHeader #messageTextWithVideoWrapper table .iconJ span {width: 52px !important; height: 39px !important;}
#homeHeader #messageTextWithVideoWrapper table .iconH span {width: 57px !important; height: 44px !important;}
#homeHeader #messageTextWithVideoWrapper table a {color: White; font-weight: bold; text-decoration: none;}
/****** new look ***/
.wdgActItem { position:relative; margin:0px auto; min-width:8em; color:#000; /* max-width:250px; /* based on image dimensions - not quite consistent with drip styles yet */ /* _width:250px;*/ /* z-index:1; margin-left:7px; /* default, width of left corner */ /* margin-bottom:0.5em; /* spacing under dialog */}
.wdgActItem .wdgActWrapper,
.wdgActItem .wdgActTop,
.wdgActItem .wdgActBottom,
.wdgActItem .wdgActBottom div {
 background:transparent url(http://media.newjobs.com/mm/redux/widgets/dialog_monster_widget.png) no-repeat top right;
 _background-image:url(http://media.newjobs.com/mm/redux/widgets/dialog_monster_widget.png);
}
.wdgActItem .wdgHeaderTitle
{padding-left:4px;height:47px;line-height:47px;/*color:#555c34;font-weight:bold;*/	}
.wdgActItem .wdgHeaderTitle img
{padding-right:10px;float:left;}
.wdgActItem .wdgActWrapper 
{position:relative; zoom:1; _overflow-y:hidden; padding:0px 7px 0px 0px;z-index:1;}
.wdgActItem .wdgActTop 
{ /* top+left vertical slice */ position:absolute; left:0px; top:0px; width:7px; /* top slice width */ margin-left:-3px; height:100%; _height:1600px; /* arbitrary long height, IE 6 */ background-position:top left;}
.wdgActItem .wdgActBottom 
{ /* bottom */ position:relative; width:100%;}
.wdgActItem .wdgActBottom,
.wdgActItem .wdgActBottom div 
{ height:7px; /* height of bottom cap/shade */ _font-size:1px;}
.wdgActItem .wdgActBottom 
{ background-position:bottom right;}
.wdgActItem .wdgActBottom div 
{ position:relative; width:7px; /* bottom corner width */ margin-left:-3px; background-position:bottom left;}
.wdgActItem .wrapper {
 /* extra content protector - preventing vertical overflow (past background) */
 position:static;
 max-height:1000px;
 overflow:auto; /* note that overflow:auto causes a rather annoying redraw "lag" in Firefox 2, and may degrade performance. Might be worth trying without if you aren't worried about height/overflow issues. */
}
/*
.wdgActItem .wdgActItem h1,
.wdgActItem .wdgActItem p {
 margin:0px; /* margins will blow out backgrounds, leaving whitespace. */
/*
}
.wdgActItem .wdgActItem h1 {
 padding-bottom:0px;
}
*/
.wdgActItem .wdgActFooter
{text-align:right;clear:both;height:21px;background:transparent url(http://media.newjobs.com/mm/redux/widgets/actFooter.png) repeat-x 0 0;line-height:16px;padding-right:10px; padding-top: 10px;}
.wdgActItem .wdgActFooter a
{/*color:#7b4f90;text-decoration:underline;font-size:11px;*/}
.wdgActItem .wdgContentBlock
{	background-color: #fff;	/*font-family: Verdana;	color: #777777;	font-size: 10px; font-weight: normal;	margin: 0px 7px 0 7px ;*/	/*padding:7px;*/	/*height: 100%;*/	vertical-align: top;padding:8px;}
.wdgActItem .wdgContentBlock span a
{	
	font-weight: bold;	
}
.wdgActItem .wdgContentBlock a
{	/*color: #78558D;	font-size: 11px;	font-weight: normal;	text-decoration: underline;*/}
.wdgActItem .wdgContentBlock a:hover
{}
.wdgActItem .wdgContentBlock h2 {margin: 0 0 .5em 0;}
/*porting over confirmationWidgetBody classes for the careerAdvice widget.*/
.wdgActItem .confirmationWidgetBody
{	background-color: #fff;	/*font-family: Verdana;	color: #777777;	font-size: 10px; font-weight: normal; margin: 0px 7px 0 7px ; padding:7px; height: 100%;*/	vertical-align: top;padding:8px;}
.wdgActItem .confirmationWidgetBody span a
{	
	/*font-weight: bold;*/	
}
.wdgActItem .confirmationWidgetBody a
{	/*color: #78558D;	font-size: 11px;	font-weight: normal;	text-decoration: underline;*/}
.wdgActItem .confirmationWidgetBody a:hover
{}
/****** new widgetLook ****/
.loaderBox
{border: none !important; /* hack for ie 6 */ _height: 1%;}
.wdgDatagridDivider
{
	border-width: 0px 1px 0px 1px;
	border-color: #E2E2E0;
	border-style: solid;
	background-color: #F0F1E9;
	height: 7px;
}
/* Temporary CSS */
.slpWidgetSpacing
{
	margin: 7px 10px 7px 0px;
	_margin: 0px 10px 7px 0px;
}
.slpWidgetSpacingRight
{
	margin: 7px 0px 0px 7px;
	_margin: 0px 0px 0px 7px;
}
.slpWidgetSpacingUtility
{
	margin-top: 15px !important;
}
.slpSavedSearches
{
	width: 363px;
	float: right;
	margin-right: 10px;
    _margin-right: 5px;
}
.slpApplyHistory
{
	width: 180px;
	/*height: 285px;*/
}
.slpSavedJobs
{
	width: 180px;
	/*height: 285px;*/
}
.slpProfile
{
	width: 363px;
	float: right;
	margin-right: 10px;
    _margin-right: 5px;
/*	margin-top: 12px;*/
}
.slpBrowseJobs
{
	width: 180px;
	height: 260px;
}
.slpCTA{
width:180px;
}
.slpRecommendedJobs
{
	width: 375px;
	min-height: 347px;
	_height:347px;
}
.slpCareerGoals
{
		width: 375px;
	min-height: 347px;
	_height:347px;
}
.slpResumes
{
	width: 375px;
	min-height: 260px;
	_height:260px;
}
.slpCoverLetters
{
	width: 180px;
	min-height: 260px;
	_height:260px
}
.slpBigSlimAdUnit
{
	height: 363px;
	width: 180px;
	margin-right: 0px;
	text-align: center;
	background-image: url("http://media.newjobs.com/mm/redux/slps/verticaladbg.gif");
	margin-top:15px;
	margin-left:5px;
}
.slpBigSlimAdUnit iframe, .slpBigSlimAdUnit img.adCrossPromo_BrowseJobs, .slpBigSlimAdUnit img.adCrossPromo_Profile
{
	margin-top: 30px;
	border: none;
}
.slpSquareAdUnit
{
	width: 374px;
	height: 268px;
	padding: 18px 0 0 0;
	border-left: 1px solid #E1E1E1;
	border-right: 1px solid #E1E1E1;
}
.slpSquareAdUnit iframe, .slpSquareAdUnit > div
{
	display: block;
	margin: 0 auto;
}
.slpSquareAdUnit > div
{
	position: relative !important;
	width: 300px;
}
.slpContentBlockSmall
{	height: 163px;	width: 180px; /* hack for ie 6*/ position: relative;}
.slpContentBlockLarge{
/*	height: 163px;*/	width: 374px;}
.slpContentBlockCTASmall{
width: 180px;margin-left:15px;}
.slpContentBlockCTASmall .confirmationWidgetBody{min-height:105px;_height:105px;}
.slpJSLPHeadSplashProfile
{
	background-image: url(http://media.newjobs.com/mm/redux/slps/slpJobsearch.jpg);
	background-repeat: no-repeat;
	background-position: right top;
	height: 250px;
	margin-top: 39px;
	width: 960px;
}
.slpJSLPHeadSplash
{
	background-image: url(http://media.newjobs.com/mm/redux/slps/slpJobsearch.jpg);
	background-repeat: no-repeat;
	background-position: right top;
	height: 250px;
	margin-top: 12px;
	width: 960px;
}
.slpJSLPHeadSplashProfile .homeHeaderStatic
{
background: #99FF33 url(http://media.newjobs.com/mm/redux/slps/profile_static.jpg) no-repeat 0 0;
width:575px;
height:250px;
}
.slpJSLPHeadSplash .homeHeaderStatic
{
background: #99FF33 url(http://media.newjobs.com/mm/redux/slps/search_static.jpg) no-repeat 0 0;
width:575px;
height:250px;
}
/* Saved Searches */
.wdgSSLeftColumn
{
	float: left;
	text-align: left;
	padding-left: 5px;	
	width: 180px;
	height: 20px;
	line-height: 20px;
}
.wdgSSRightColumn
{
	float: left;
	text-align: left;
	padding-left: 5px;
	width: 130px;
	margin-left: 2px;
	color: black;
	height: 20px;
	line-height: 20px;
}
.wdgSSColumnBGNormal
{
	background-color: #F9F6F1;
}
.wdgSSColumnBGAlt
{
	background-color: White;
}
.wdgSSHeadingName
{
	color: #79816A;
	font-size: 10px;
	padding-left: 5px;	
	text-align: left;
	width: 180px;
	font-weight: bold;
	height: 15px;
	line-height: 15px;
	float:left;
}
.wdgSSHeadingEmail
{
	color: #79816A;
	font-size: 10px;
	padding-left: 5px;	
	text-align: left;
	width: 130px;
	font-weight: bold;
	height: 15px;
	line-height: 15px;
	float:left;
}
.wdgHeading
{
	color: #79816A;
	font-size: 10px;
	font-weight: bold;
	font-family: Verdana;	
}
.wdgGrayHeading
{
	color: #939393;
	font-size: 10px;
	font-weight: bold;
	font-family: Verdana;	
}
.wdgActItem .wdgResume-OptionsList
{
	clear:both;
	margin: 0 0 0 15px;
	list-style: none;
}
.wdgActItem .wdgResume-OptionsList li
{
	list-style: none;
}
.wdgActItem .wdgGridSpacing
{
	height: 20px;
	line-height: 20px;
}
.wdgActItem .wdgJSSADatagridLeftColumn
{
	width: 115px;
 	margin: 7px 0px 7px 0px;
}
.wdgActItem .wdgJSSADatagridRightCol
{
	margin: 7px 0px 7px 0px; 
}
.wdgActItem .wdgJSSLPDatagridLeftColumn
{
	width: 115px;
 	margin: 7px 0px 7px 0px;
}
.wdgActItem .wdgJSSLPDatagridRightCol
{
	margin: 7px 0px 7px 0px; 
}
.wdgActItem .wdgContentBlock hr
{
	border-style: dotted;
	border-width: 1px;
	border-color: #747474;
	height: 1px;
	overflow: hidden;
	margin-top: 3px;
	margin-bottom: 3px;
}
.wdgActItem .wdgContentBlockOverride
{
	padding: 0px;
}
.wdgActItem div.hr { border-top: 1px dotted #747474; height: 1px;}
.wdgActItem .ctrJobListSeparator
{
	height: 7px;
	background-color: transparent;
	_font-size:1px;
}
.wdgActItem .ctrJobsListItem
{
	background-color: white;
	height: 31px;
	padding: 7px;
}
.wdgActItem .wdgDataGridViewAll
{
	text-align:right;
	padding: 5px;
	/*margin:0px 7px 0px 7px;*/
	background-color:#fff;
	font-size:11px;
}
.wdgActItem .wdgDataGridViewAll a
{
/*color:#7b4f90;
text-decoration:underline;*/
}
.wdgActItem .wdgHr
{
 /*_line-height:3px;height:5px;width:100px;*/
 display:none;
}
.wdgLinksP
{
/*
padding-top:10px;
*/
}
/*
.wdgAlternativeFooter{_float:left;width:98%;display:block !Important;height: 5px;background: transparent url('http://media.newjobs.com/mm/redux/widgets/default_footer_p1.gif') no-repeat scroll left top;	zoom: 1;vertical-align:top;	text-decoration: none;}
.wdgAlternativeFooterEnd{display:block !Important;background: transparent url('http://media.newjobs.com/mm/redux/widgets/default_footer_p2.png') no-repeat scroll left top;	vertical-align: top;_position: absolute;margin-top: -5px;_margin-top: 0px;	width: 7px;	height: 5px;float: right;_margin-left:0px}
*/
/**** widget profile ****/
.slpProfile .wdgProfileRecognized{}
.slpProfile .wdgProfileRecognizedContent{background: #fff url(http://media.newjobs.com/mm/redux/widgets/profile_indicator_bg.png) no-repeat 0 45px;}
.slpProfile .wdgProfileRecognizedContent{padding:0px !important;background-color:#fff}
.slpProfile .wdgProfilePhotoWrapper{float:right;margin:0px 5px 0px 7px;background-color:#e5e5e5}
.slpProfile .wdgProfilePhotoWrapper img {border:1px solid #ccc;background-color:#fff;margin:4px; padding: 0px;}
.slpProfile .wdgProfileName{/*font-size:13px;font-weight:bold;color:#7b4f90;*/display:block; width: 210px; height: 18px; overflow: hidden;}
.slpProfile .wdgProfileInfo{width:210px; height:130px; margin:0px; padding:7px; _padding:7px 7px 1px 7px; }
.slpProfile .wdgProfileJobTitle{/*font-size:11px;*/padding-top:3px;display:block; width: 210px; height: 15px; overflow: hidden;}
.slpProfile .wdgProfileLastUpdateMsg{display:inline-block;/*color:#7b4f90;font-size:10px;height:15px;*/padding-top:2px;}
.slpProfile .wdgProfileLastUpdate{/*font-size:10px;height:15px;*/display:inline-block;padding-top:2px;}
/*.wdgProfileInfo pan{display:block;}*/
.slpProfile .wdgProfileCarrerStatus{display:block;/*font-size:10px;height:10px;*/}
.slpProfile .wdgProfileIndicator{border:0px solid red;display:inline-block;padding-top:8px;/*color:#7b4f90;font-size:10px;*/}
.slpProfile .wdgProfileIndicatorImg{margin-top:5px;display: block;}
.slpProfile .wdgProfileLinks{clear:both;padding:0;margin:0;width:356px; 	height: 44px;}
.slpProfile .wdgProfileText{display:none;}
.slpProfile .wdgProfileFooterText{float:left;margin-left:10px;_margin-left:5px;margin-top:2px;/*font-size:10px;*/width:195px;}
.slpProfile .wdgProfileUnknownContent {height:175px;border:0px solid blue;background-color:#fff;padding-bottom:5px;padding-right:5px;}
.slpProfile .wdgProfileUnknownContent a.globalButton{margin: 5px 5px 0 0;}
.slpProfile .wdgProfileUnknownTitle {/*color:#7b4f90*/}
.slpProfile .wdgProfileUnknownList ul{margin-left:1em}
.slpProfile .wdgProfileUnknownList li{margin:0;padding:0;padding-left:15px;padding-top:5px;list-style-type:none;background:transparent url(http://media.newjobs.com/mm/redux/widgets/wdgBlueDot.gif) no-repeat 0 9px;}
.slpProfile .wdgProfileDivider{clear:both;margin-bottom:10px;}
.slpProfile .wdgProfileBreak{display:none}
.slpProfile .wdgActFooter{line-height:normal !important;text-align:left !important}
/**** widget recomended jobs ****/
/*.slpRecommendedJobs */
.slpRecommendedJobs .wdgRecommendJobsWrapper{height:285px;_height:285px;clear:both;padding:0}
/*.slpRecommendedJobs .wdgRecommendJobsList{height:256px;_height:250px;overflow:auto}*/
.slpRecommendedJobs .wdgRecommendJobsLinks{clear:both;}
.slpRecommendedJobs .ctlJobTitle{clear:both;padding:2px 4px 2px 6px;text-align:left;background-color:#fff;}
.slpRecommendedJobs .ctlJobTitle a{/*color:#7b4f90;text-decoration:underline;font-size:10px;font-weight:bold;*/background-color:#fff;}
.slpRecommendedJobs .ctlJobCompany{/*font-size:10px;*/border:0px solid red;padding:2px 4px 2px 6px;text-align:left;background-color:#fff;}
.slpRecommendedJobs .ctlPosted{border:0px solid blue;padding:2px 4px 2px 6px ;/*font-size:10px;*/text-align:left;background-color:#fff;}
.slpRecommendedJobs .ctlLocation{border:0px solid green;padding:2px 4px 4px 6px;/*font-size:10px;*/text-align:left;background-color:#fff;}
.slpRecommendedJobs .ctlLocation a{/*font-size:10px;*/}
.slpRecommendedJobs .ctlJobListSeparator{clear:both;_font-size:1px;}
.slpRecommendedJobs .ctlJobListToggle{clear:both;border-bottom:0px solid #eeeeee;}
.slpRecommendedJobs .ctlJobList{overflow:auto;height:240px;}
/**** rewrite standard styles for background color of widget and more ***/
.slpRecommendedJobs .wdgContentBlock{background-color:transparent !important}
.slpRecommendedJobs .wdgDataGridViewAll{padding:11px !important;}
/**** widget resume for LP ****/
.slpResumes .wdgResumeContentWrapper{height:300px; margin:0px;padding:7px;}
.slpResumes .wdgResumeWrapper{margin:0px;padding:0px;}
.slpResumes .wdgResumeListContent{background-color:#fff;}
.slpResumes .wdgResumeList{height:159px;_height:159px;overflow:auto;_padding:8px;_background-color:#fff;}
.slpResumes .wdgResumeTitle{display:block}
.slpResumes .wdgResumeCell1{display:block;float:left;width:150px;margin-top:5px;}
.slpResumes .wdgResumeCell2{display:block;float:left;margin-top:3px;}
.slpResumes .wdgResumeCellReset{clear:both}
.slpResumes .wdgResumeCell3{display:block;float:left;width:150px;margin-top:3px;}
.slpResumes .wdgResumeCell4{display:block;float:left;margin-top:3px;}
.slpResumes .wdgResumeListSeparator{clear:both;padding:5px;border-top:1px dotted #787878;}
.slpResumes .wdgResumeLinks{clear:both;}
.slpResumes .wdgResumeDivider{clear:both;width:140px;background:transparent url('http://media.newjobs.com/mm/redux/slps/widget_divider.gif') no-repeat 0 0;height:10px;margin-top:5px}
.slpResumes .wdgResumeRadio{/*height:14px;*/ float:left; margin: 3px 3px 0 0; padding:0;}
.slpResumes .wdgResumelbl{/*height:14px;*/display:block;float:left;margin-left:3px;/*margin-top:3px;*/}
.slpResumes .wdgResumeRadioItem{clear:left;padding-top:5px;}
.slpResumes .wdgResumeButtonCreate{clear:both;text-align:right;height:25px;}
.slpResumes .wdgResumeLinksP {}
.slpResumes .resumeLblMessage{background-color:#fff;min-height:18px;_height:18px;padding-top:10px;_padding-left:10px;_padding-top:8px;_padding-bottom:8px;vertical-align:middle;clear:both;}
/*.slpResumes .wdgContentBlock{padding:0px}*/
/*** rewrite some class **/
.slpResumes p{padding-bottom:0;}
/**** widget coverLetter for LP ****/
.wdgCoverLetterListContent{height:193px;background-color:#fff;}
.wdgCoverLetterList {height:150px;overflow:auto;}
.wdgCoverLetterListSeparator{clear:both;padding:5px;border-top:1px dotted #787878;}
.slpCoverLetters .wdgNoCoverLetterContent{height:298px;background-color:#fff;}
.slpCoverLetters .wdgNoCoverLetterContent ul {margin: 10px 0;}
.slpCoverLetters .wdgNoCoverLetterContent ul li {padding-top: 5px; list-style: none;}
.slpCoverLetters .wdgCoverLetterLinks{text-align:right;}
.slpCoverLetters .wdgCoverLetterDivider{clear:both;width:140px;background:#fff url('http://media.newjobs.com/mm/redux/slps/widget_divider.gif') no-repeat 0 0;height:10px;}
.slpCoverLetters .wdgCoverLetterLinksP {margin-top:10px;}
.slpCoverLetters p{margin:0;padding:0;}
/**** CTA widgets ******/
.slpCTA .wdgCTAContent{height:210px;background-color:#fff;}
.slpCTA .wdgDefaultFooter{width:96%}
.slpCTA .rctr{display:none}
.slpCTA .rcbr{display:none}
.slpCTA span.confirmationBody {	/*font-family: verdana;	font-size: 11px; 	font-weight: normal; 	color: #666666; */	margin: 0 0 5px 0;	padding: 0;	clear: both;}
.slpCTA .confirmationWidget {background-color:transparent; width: 170px; padding: 5px 5px 5px 5px; text-align: left; margin: 2px 8px 20px 0; height: 210px; }
.slpCTA h2.confirmationGreenH2 {/*font-family: verdana;font-size: 11px;font-weight: bold;color: #75825e;  */ margin: 0 0 5px 0;	padding: 0;	background-color:#fff;    }
.slpCTA h2.confirmationPurpleH2{/*font-family: verdana;font-size: 12px; font-weight: bold;color: #666699;  */	margin: 0 0 5px 0;padding: 5px;background-color:#fff;    }
/*.slpCTA a.confirmationLink:link {font-family: verdana;font-size: 11px;font-weight: normal;color:#7b4f90;text-decoration:underline }
.slpCTA a.confirmationLink:visited {font-family: verdana;font-size: 11px;font-weight: normal;color:#7b4f90;text-decoration:underline   }
.slpCTA a.confirmationLink:active  {font-family: verdana;font-size: 11px;font-weight: normal;color:#7b4f90;text-decoration:underline    }
.slpCTA a.confirmationLink:hover   {font-family: verdana;font-size: 11px;font-weight: normal;color:#7b4f90;text-decoration:underline    }*/
.slpCTA div.confirmationLink  {margin: 5px 0 5px 0;/*font-family: verdana;font-size: 11px;font-weight: normal;color:#7b4f90;*/clear: both;}
.slpCTA .confirmationWidgetBody    {background-color:#fff;height:300px;padding:8px;}
/**** widget saved jobs ****/
/*.slpSavedJobs*/
.slpSavedJobs .wdgSavedJobsContentList{height:264px;background-color:#fff;}
.slpSavedJobs .wdgSavedJobsContent {height:300px;background-color:#fff;}
.slpSavedJobs .wdgActFooter p{margin:0;padding:0;}
/*.wdgCoverLetterListSeparator{clear:both;padding:5px;border-top:1px dotted #787878;}
.slpCoverLetters .wdgNoCoverLetterContent{height:234px;border:0px solid blue;background-color:#fff;margin:0px 5px 0px 5px;padding:5px 5px 0px 5px;}*/
/*** widget my apply history ***/
.slpApplyHistory .wdgApplyHistoryContentList{height:264px;background-color:#fff;}
/*.wdgCoverLetterListSeparator{clear:both;padding:5px;border-top:1px dotted #787878;}*/
.slpApplyHistory .wdgNoApplyHistoryContent{height:300px;border:0px solid blue;background-color:#fff;}
.slpApplyHistory .wdgApplyHistoryContentWrapper{height:155px;border:0px solid blue;background-color:#fff;}
.slpApplyHistory .wdgApplyHistoryLinks{text-align:right;}
.slpApplyHistory .wdgApplyHistoryLinks p{margin:0;padding:0;}
/*** widget save search **/
/*.slpSavedSearches */
.slpSavedSearches .wdgSavedSearchUnknown{height:170px;background-color:#fff;/*margin:0px 7px 0px 7px*/;padding:8px;}
.slpSavedSearches .wdgSavedSearchContent{height:140px;background-color:#fff;border:0;margin:0}
.wdgSavedSearchContentGlobal{width:100%;}
.wdgSavedSearchContentLeft{width:45%;margin-left:5px;float:left; height: 178px; overflow: auto;}
.wdgSavedSearchContentLeftTitle{color:#7B4F90;font-weight:bold;}
.wdgSavedSearchContentLeftText{color:#7B4F90;font-weight:bold;margin-top:5px;}
.wdgSavedSearchContentRight{width:155px;float:right;}
.wdgSavedSearchContentRightTitle{clear:both;color:#79816A;font-size:16px;font-weight:bold;margin-bottom:5px;}
.wdgSavedSearchContentImg{margin-top:5px;margin-bottom:10px;}
.wdgSavedSearchContentRightText{clear:both;}
.wdgSavedSearchContentRightLink{clear:both;}
.slpSavedSearches .wdgSavedSearchLinks{clear:both;}
.slpSavedSearches .savedSearchMyCarousel{margin:0;padding:0}
.slpSavedSearches .wdgSavedSearchList{height:128px;/*margin:0px 7px 0px 7px*/}
.slpSavedSearches ul{margin:0px !important;padding:0px !important;display:block}
.slpSavedSearches li{display:block}
.slpSavedSearches .ctlJobListSeparator{clear:both;}
.slpSavedSearches .wdgLeftBtn{display:none}
.slpSavedSearches .wdgRightBtn{display:none}
.slpSavedSearches p{margin:0;padding:0;}
/*** affinity labs ***/
.slpMycommunity {width: 363px; margin:0 0 0 3px;}
.slpWidgetSpacingCommunity {margin: 6px 0 0 0 !important; padding: 0;}
.slpWidgetCareerAdviceCommunity {margin: 0; padding: 0;}
.slpMycommunity .communityUserInfoUNRE .wdgContentBlock{margin:0; padding: 20px; height: 120px;}
.slpMycommunity .communityUserInfoRE .wdgContentBlock {height: 60px; margin:0; padding: 7px 10px 10px 10px;}
.slpMycommunity .communityUserInfoRE h4{/*font-size: 14px; font-weight: bold; color:#758e30;*/ margin:0; padding: 0 0 0 0;}
.slpMycommunity .communityUserInfoUNRE h4{/*font-size: 20px; font-weight: bold; color:#758e30; */margin:0 0 23px 0; padding: 0;}
.slpMycommunity .communityUserInfoRE p{/*font-size: 11px; font-weight: bold; color:#a8b87c; */margin:3px 0 0 0; padding: 0;}
.slpMycommunity .communityUserInfoRE p.arrow{font-size: 11px; font-weight: normal; color:#7b4f90; margin:3px 0 0 0; padding: 0;}
.slpMycommunity .communityUserInfoRE p a{/*font-size: 11px; font-weight: normal; color:#7b4f90; text-decoration: underline;*/ margin:0 0 6px 0;}
.slpMycommunity .communityUserInfoRE p a:hover{/*color:#7b4f90; text-decoration: none*/}
.slpMycommunity .communityUserInfoUNRE p{/*font-size: 12px; font-weight: normal; color:#394c0c;*/ margin:0; padding: 0;}
.slpMycommunity .communityUserInfoRE .PreviewCommunityBtnDiv {float: right; margin: 25px 10px 10px 10px; padding: 0;}
.slpMycommunity .communityUserInfoUNRE .PreviewCommunityBtnDiv {float: right; margin: 15px 0 0 0; padding: 0;}
.slpSuggestionBox {padding: 0; margin:0;}
.slpSuggestionBox.wdgActItem .wdgContent {/*font-size: 11px; color: #575757;*/ padding: 12px; height: 64px; background-color: #ffffff; }
.slpSuggestionBox .suggestion_input {/*font-size: 11px; color: #575757; */padding: 2px; border: 1px solid #b4b4b4; width: 250px; margin: 0; }
.slpSuggestionBox .inputHolder {margin: 0; padding: 0; float: left;}
.slpSuggestionBox .buttonHolder {margin: 1px 0 0 6px; padding: 0; float: left;}
.slpSuggestionBox p {margin: 0 0 10px 0; padding:0; /*font-size: 11px;*/}
.slpSuggestionBox .confirmationMsg {/*font-size: 12px; */margin: 10px 0 0 0;}
.slpRecommendCommunity {background-color: #ffffff;}
.slpRecommendCommunity p {margin-bottom: 0;}
.slpRecommendCommunity .withImg img {margin: 5px 5px 5px 0;}
.slpRecommendCommunity .rightText {margin: 0 0 0 5px; padding: 25px 0 0 0; /* font-size: 11px; */width: 210px;}
.slpRecommendCommunity .rightTextVert {margin: 0 0 0 5px; padding: 15px 0 0 0; /* font-size: 11px;*/}
.slpRecommendCommunity .withImg {width: 125px; margin: 0 5px; padding: 0; }
.slpRecommendCommunity .withImgVert {text-align: center; margin: 0 5px; padding: 0; }
.slpRecommendCommunity .withImgVert img {margin: 15px 5px 5px 0;}
.slpRecommendCommunity .bottomJoin {padding:0; margin:50px 0 0 0; border: 1px solid white;}
.slpRecommendCommunity .bottomJoinVert {padding:0; margin:25px 0 5px 0;}
/*.slpRecommendCommunity .previewLink {margin: 0; padding: 0 12px 0 0;}
.slpRecommendCommunity .previewLink a {text-decoration: underline;}
.slpRecommendCommunity .previewLink a:hover {text-decoration: none;}*/
.slpRecommendCommunity .previewLinkVert {margin: 0; padding: 0 0 6px 0;}
.slpRecommendCommunity .previewLinkVert a {text-decoration: underline; color: #7B4F90;}
.slpRecommendCommunity .previewLinkVert a:hover {text-decoration: none; color: #7B4F90;}
/*** career goals ***/
/*.slpCareerGoals */
.slpCareerGoals .wdgCarrerGoalsContentWrapper{height:300px;}
.slpCareerGoals .wdgCarrerGoalsList{}
.carrerGoalsCarousel{width:360px}
.slpCareerGoals #wdgCareerGoalsCarousel {width:360px;margin-left:-3px; overflow-y: auto !important;}
.slpCareerGoals .wdgLeftBtn{cursor:pointer;position:relative;left:20px;top:5px;z-index:3;}
.slpCareerGoals .wdgRightBtn{cursor:pointer;position:relative;left:300px;top:5px;z-index:3;}
.slpCareerGoals .wdgCarrerGoalsList{overflow:auto;height:250px;}
.slpCareerGoals .wdgCarrerGoalsTextHeader  {font-weight:bold;color:#79816A;}
.slpCareerGoals .wdgCarrerGoalsLinks{text-align:right}
/*.slpCareerGoals li{width:360px;}*/
.slpCareerGoals  #wdgCareerGoalsCarousel li{widtH:360px;}
.slpCareerGoals  #wdgCareerGoalsCarousel ul{height:240px;} 
.slpCareerGoals .carrerGoalsItem{width:360px;text-align:center;}
.slpCareerGoals .carrerGoalsItemToggle{text-align:left;padding:4px;}
.slpCareerGoals .carouselUl{min-height:272px;} 
.slpCareerGoals .ctlJobTitle{cleaR:both;padding:4px;text-align:left;background-color:#fff}
.slpCareerGoals .ctlJobTitle a{/*color:#7b4f90;text-decoration:underline;font-size:10px;font-weight:bold*/}
.slpCareerGoals .ctlJobCompany{/*font-size:10px;*/border:0px solid red;padding:2px 4px 2px 4px;text-align:left;background-color:#fff}
.slpCareerGoals .ctlPosted{display:none;border:0px solid blue;padding:2px 4px 2px 4px ;/*font-size:10px;*/text-align:left;background-color:#fff}
.slpCareerGoals .ctlLocation{border:0px solid green;padding:2px 4px 2px 4px;/*font-size:10px;*/text-align:left;background-color:#fff}
.slpCareerGoals .ctrJobListSeparator{clear:both;height:7px;_font-size:1px;}
.slpCareerGoals .ctlJobListToggle{clear:both;border-bottom:0px solid #eeeeee;}
.slpCareerGoals .careerGoalTitle {margin-top:3px;padding-bottom:7px;display:block;background-color:#fff}
.slpCareerGoals .careerGoalTitle a{padding-top:3px;/*font-size:11px;font-weight:bold;color:#7b4f90;text-decoration:underline*/}
.slpCareerGoals .careerGoalTitle.fnt6 {margin-bottom: 0;}
.slpCareerGoals .ctlJobList {height: 240px; overflow-y: auto;}
.slpCareerGoals p{margin:0;padding:0;}
/**** career advice ***/
/*** profile ****/
.slpContentBlock h4 {padding:0;padding-bottom:5px;}
.slpContentBlock h4 a{/*font-weight:bold;text-decoration:none;*/}
.slpContentBlock .thumbnailFL{border:3px solid #e5e5e5}
.slpContentBlock .wdgCareerAdviceContent{min-height:64px;_height:64px}
/*** jobsearch ***/
.slpContentBlockSmall .wdgCareerAdviceContent{min-height:105px;_height:105px}
/** Career Tools Search Box **/
.searchBoxCareerTools { padding:7px; }
.searchBoxCareerTools .marginBottom7 { margin-bottom:7px; }
.searchBoxCareerTools .textAlignCenter { text-align:center; }
.searchBoxCareerTools .searchControls { width:225px;margin-bottom: 7px; }
.searchBoxCareerTools .careerToolsSearchImage { height:90px;width:120px;background-color:Grey;margin-right:7px; }
.searchBoxCareerTools select { width:225px; } 
.searchBoxCareerTools input { border:1px solid #C3C3C3; width:213px; padding:5px; cursor:text; } 
/***** end *****/
/*** widget cms ***/
  .wdgCmsWrapper{margin-top:15px;height:154px;}
   .CP_interview{background:transparent url('http://media.newjobs.com/mm/redux/home/CP_interview.png') no-repeat top left}
   .CP_resume_agent{background:transparent url('http://media.newjobs.com/mm/redux/home/CP_resume_agent.png') no-repeat top left}
   .CP_online_training{background:transparent url('http://media.newjobs.com/mm/redux/home/CP_online_training.png') no-repeat top left}
   .CP_resume_writing{background:transparent url('http://media.newjobs.com/mm/redux/home/CP_resume_writing.png') no-repeat top left}     
  .wdgCmsWrapperTop{background:transparent url(http://media.newjobs.com/mm/redux/home/my_cms_area_top.gif) no-repeat 0 0;height:5px;font-size:4px;}
  .wdgCmsWrapperBottom{background:transparent url(http://media.newjobs.com/mm/redux/home/my_cms_area_bottom.gif) no-repeat 0 0;height:5px;}
  .wdgBannerWrapperContent{min-height:143px;border-left:1px solid #cccccc;border-right:1px solid #cccccc;}
  .wdgCmsWrapperContent{width:225px;}
  .wdgCmsWrapperContent h3{margin-left:10px;padding-top:10px;color:#745581}
  .wdgCmsWrapperContent p{font-size:11px;margin-left:10px;margin-top:10px;} 
  .wdgCmsWrapperContent strong{color:#75825e}
  .wdgCmsWrapperContent a {color:#75825e;text-decoration:underline;font-weighT:normal;font-size:11px;}
  .wdgCmsContentLinks{margin-left:10px;margin-top:10px;}
  .wdgCmsWrapperContent img{float:right}
  .wdgCmsContentTitle {background:transparent url(images/articleHeaderBg.gif) no-repeat 0 5px;padding-left:20px;padding-bottom:20px;color:#745581;font-weight:normal;}
/**** edit widget *****/
/*
.editWidget{display:none;background:#fff;margin:0px 7px 7px 7px;padding:7px 7px 7px 7px;}
*/
/*
.wdgHeader
{	
	padding-left: 7px;
	font-family: Verdana;
	color: #555B39;
	font-size: 11px;
	font-weight: bold;
	height: 25px;
	line-height: 25px;
	background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_module_header_p1.png') no-repeat scroll left top;
	_background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_module_header_p1.gif') no-repeat scroll left top;
	/*zoom: 1;*/
	/*vertical-align:top;
	text-decoration: none;
	margin-right: 5px;
}
.wdgHeaderEnd
{
	background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_module_header_p2.png') no-repeat scroll left top;
	_background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_module_header_p2.gif') no-repeat scroll left top;
	display: block;
	vertical-align: top;
	_position: absolute;
	margin-top: -25px;
	width: 7px;
	_margin-left:-7px;
	height: 25px;
	float: right;
}
/*
@media all and (min-width: 0px){
	.wdgHeader { margin:0px; padding-top: 0px; line-height: 25px}
	.wdgHeader div { margin: 0px; position: static; }
}
.wdgDefaultFooter
{		
	height: 5px;	
	background: transparent url('http://media.newjobs.com/mm/redux/widgets/default_footer_p1.png') no-repeat scroll left top;
	_background: transparent url('http://media.newjobs.com/mm/redux/widgets/default_footer_p1.gif') no-repeat scroll left top;
	zoom: 1;
	vertical-align:top;
	text-decoration: none;
	width:98%;
	float:left;
}
.wdgDefaultFooterEnd
{
	background: transparent url('http://media.newjobs.com/mm/redux/widgets/default_footer_p2.png') no-repeat scroll left top;
	_background: transparent url('http://media.newjobs.com/mm/redux/widgets/default_footer_p2.gif') no-repeat scroll left top;
	_display: block;
	/*vertical-align: ;*/
	/*_position: absolute;*/
	/*margin-top: -14px;*/
	/*_margin-top: -5px;*/
	/*_margin-left:-7px;*/
/*	width: 7px;
	height: 5px;
	float: right;
}
/*
@media all and (min-width: 0px){
	.wdgDefaultFooter { margin:0px; padding-top: 0px; }
	.wdgDefaultFooter div { margin: 0px; position: static; }
}
/*
.wdgOuterContainer
{
	border-width: 0px 1px 0px 1px;
	border-color: #E2E2E0;
	border-style: solid;
	/*background:#e2e7cf url(http://my.monster.com/images/wdgBg.gif) repeat-y 0 0;	*/
/*}*/
/*
.wdgInnerContainer
{
	/*border-width: 7px 7px 0px 7px; 
	border-style: solid;
	border-color: #F0F1E9;*/
	/*
	background-color: #e2e7cf;
	/*padding-top:7px;*/
/*	width:100%;
	/*height:100%;*/
/*
}
*/
/*
.wdgInnerContainerOverride
{
	background-color: #F0F1E9;
	padding: 0px;	
}
*/
/*
.wdgActionFooter
{	
	/*padding-left: 7px;*/
	/*font-family: Verdana;
	color: #555B39;
	font-size: 11px;
	/*font-weight: bold;*/
	/*min-height: 40px;
	_height:40px;
	/*line-height: 40px;*/
	/*background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_action_footer_p1.png') no-repeat scroll left top;
	_background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_action_footer_p1.gif') no-repeat scroll left top;
	/*zoom: 1;*/
	/*vertical-align:top;
	text-decoration: none;	
	text-align: left;
	min-width: 96%;
	float: left;
	/*display:inline-block;*//*
}
.wdgActionFooter-end
{
	background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_action_footer_p2.png') no-repeat scroll left top;
	_background: transparent url('http://media.newjobs.com/mm/redux/widgets/widget_action_footer_p2.gif') no-repeat scroll left top;
	/*display: block;
	display: block;*/
/*	vertical-align: top;
	/*_position: absolute;*/
/*	margin:0;
	padding:0;
	width: 7px;
	min-height: 40px;
	_height:40px;
	float: left;
	/*display:inline-block;*/
/*
.wdgActionFooter span a
{	
	font-weight: bold;	
}
.wdgActionFooter a
{
	color: #78558D;
	font-size: 11px;
	font-weight: normal;
	text-decoration: underline;
}
*/
.wdgHeading H2, .slpCareerGoals .wdgCarrerGoalsTextHeader H2
{
	color: #79816A;
	font-size: 10px;
	font-weight: bold;
	font-family: Verdana;
    padding-bottom: 0px;
    padding-top: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
}
.wdgActItem .wdgHeaderTitle H1
{
    padding-left:0px;height:47px;line-height:47px;/*color:#555c34;font-weight:bold;*/	
    /*font-family:Verdana,Arial,Helvetica,Sans-Serif;*/
    /*font-size:12px;*/
    margin-top: 0px;
    padding-top: 0px;
 }
  .w310 {
    width:310px;
  }
  .witem 
  {
    background-color: #EEEEEE;
    border: 1px solid #DFDFDF;
    padding: 6px 4px 4px;
  }
  .lipWidget {
    width:300px;
  }  
  #widgetItem {
    border: 1px solid #DFDFDF;
    background: #fff;
    color: #666666;
    font-size: 11px;
    overflow: hidden;
    padding: 10px;
    padding-bottom: 5px;
  }
  #widgetItem h5 {
    font-size:12px;
    font-weight:bold;
    color:#2E96CD;
    text-transform:uppercase;
  }
  #widgetItem p {
    line-height: 1.5;
  } 
  #widgetItem span.linkedInButton {
    position:relative;
    left:-5px;
    bottom: -6px;
    display:block; 
    width:52px;
    height:15px;  
    background:url('http://media.newjobs.com/mm/redux/global/logo_52x15.gif') no-repeat;   
  }
  #widgetItem a.linkedInButton span {
    display:none;
  }
  #widgetItem .button {
    float:right;
  }
.ViewEditAjaxForm { position: relative; }
.ViewEditAjaxForm .Busy { display: none; position: absolute; height: 48px; width: 100%; background: url(http://media.newjobs.com/mm/redux/ajax/loading.gif) 50% 50% no-repeat; }
.ViewEditAjaxForm .ctlGreenSections_content { margin: 0; padding: 12px 8px 10px 8px; font-family: Arial, sans-serif; color: #444; }
.wdgSecItem {
 position:relative;
 min-width:150px;
 max-width:310px; /* based on image dimensions - not quite consistent with drip styles yet Max size is 310 and minimum is up to you :)*/
 _width:310px;
 width: auto !important;
 color:#9c79ac;
 z-index:1;
 font-family:Verdana;
 font-size:12px;
 padding-bottom: 10px;
}
.wdgSecItem .wdgHeaderTitle,
.wdgSecItem .wdgSecTopRight,
.wdgSecItem .wdgSecBody,
.wdgSecItem .wdgSecTop,
.wdgSecItem .wdgSecBottom,
.wdgSecItem .wdgSecBottom div {
 background:transparent url(http://media.newjobs.com/mm/redux/widgets/wdgSecurityNotice.png) no-repeat top right;
 _background-image:url(http://media.newjobs.com/mm/redux/widgets/wdgSecurityNotice.png);
}
.wdgSecItem .wdgHeaderTitle
{
	background-position:-4px 0px;
	border:0px solid red;
	padding-left:14px;
	padding-top:3px;
	line-height:30px;
	font-weight:bold;
	color:#6b407f;
}
.wdgSecItem .wdgSecWrapper {
 position:relative;
 zoom:1;
 _overflow-y:hidden;
}
.wdgSecItem .wdgSecTop {
 /* top+left vertical slice */
 position:relative;
 left:0px;
 top:0px;
 float:left;
 width:5px; /* top slice width */
 margin-left:0px;
 height:32px;
 background-position:top left;
 font-size:0px;
 line-height:0px;
}
.wdgSecItem .wdgSecTopRight
{
width:5px;
height:32px;
top:0px;
right:0px;
border:0px solid red;
position:absolute;	
background-position:-315px 0px;
}
.wdgSecItem .wdgSecBody
{
	background-position:-321px 0px;
	background-color:#f2e7f7;
	border-right:1px solid #bbb3bf;
	clear:both;
	padding:10px 15px 0 15px;
}
.BoldSmallPurple
{
	display: none;
	}
.wdgSecItem .wdgSecBody a
{
	 color:#9c79ad;
	 font-size:10px;
	 font-weight:bold;
}
.wdgSecItem .wdgSecBottomRight
{
width:9px;
height:6px;
top:0px;
right:0px;
position:absolute;
background-position:top right;	
}
.wdgSecItem .wdgSecBottom {
 /* bottom */
 position:relative;
}
.wdgSecItem .wdgSecBottom,
.wdgSecItem .wdgSecBottom .wdgSecBottomContent {
 height:6px; /* height of bottom cap/shade */
 }
.wdgSecItem .wdgSecBottom {
 background-position:-645px 0px;
 margin-left:5px;
}
.wdgSecItem .wdgSecBottom .wdgSecBottomContent {
 position:relative;
 width:5px; /* bottom corner width */
 margin-left:-5px;
 height:6px;
 background-position:-641px 0px;
 border:0px solid red;
}
.wdgSecItem h1,
.wdgSecItem p {
 margin:0px; 
 padding:0.5em 0px 0.5em 0px;
}
.wdgSecItem h1 {
 padding-bottom:0px;
}
/*-----------------------------------------------------------------------*/
/*---------------------------- PagingB ----------------------------------*/
/*-----------------------------------------------------------------------*/
.ctl010PagingB
{
	color:#ccc;
	display:block;
	font:bold 16px Arial;
	margin:35px 0;
}
.pagingTop .ctl010PagingB
{
	margin-bottom:15px;
}
.ctl010PagingB .itemsPerPage {
	float:left;
	color:#333;
	font-size:11px;
	vertical-align: middle;   
}
.ctl010PagingB .itemsPerPageLabel {
	color: #7b4f90; 
	margin: 2px 5px;
}
.ctl010PagingB .itemsPerPageLabel, .ctl010PagingB .itemsPerPageDropdown { 
	display: inline; 
	float: left;
}
.ctl010PagingB .navLinks{
	margin:0 17px;
}
.ctl010PagingB .box { 
	min-width: 26px;
	width:26px;
	height: 26px; 
	line-height: 26px;	
	display: inline-block;
	text-align: center; 
	margin: 0 1px;
	text-decoration: none; 
	color: #0d51ab;
	background-color: #fff;
}
.ctl010PagingB .box:hover{
	text-decoration:underline;
}
.ctl010PagingB .selected {
	background-color: #eee; 
	color: #000
}
.ctl010PagingB .pagingEllipsis { 
	float: left; 
	padding: 2px;
}
.ctl010PagingB .navigationBar {
	text-align:center;
}
.ctl010PagingB .pagingSeparator{
	background-color:#cfcfcf;
	width:1px;
	height:16px;
	float:left;
	margin-left:10px;
	margin-right:10px;
}
.ctl010PagingB .pagingLinkPrev, .ctl010PagingB .pagingLinkNext {
	text-indent: -1000px;
	overflow: hidden;
	display: block; 
	float: left; 
	background: transparent url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
	margin: 0px;
}
.ctl010PagingB .pagingLinkPrev { 
	width: 18px;
	height: 18px;
	background-position: -306px -50px;
	margin: 0px 10px 0px 0px;
}
.ctl010PagingB .pagingLinkPrev.disableLink { 
	width: 18px;
	height: 18px;
	background-position: -288px -50px;
}
.ctl010PagingB .pagingLinkNext { 
	width: 18px;
	height: 18px;
	background-position: -342px -50px;
	margin: 0px 0px 0px 10px; 
}
.ctl010PagingB .pagingLinkNext.disableLink { 
	width: 18px;
	height: 18px;
	background-position: -324px -50px;
}
.jsps_results_criteria {
	height: 20px; 
	padding-top: 10px;
}
/*-----------------------------------------------------------------------*/
/*--------------------------- End PagingB -------------------------------*/
/*-----------------------------------------------------------------------*/
/*-----------------------------------------------------------------------*/
/*--------------------- Facets Filters PagingB --------------------------*/
/*-----------------------------------------------------------------------*/
#facetsList .ctl010PagingB
{
	font-size:13px;
	color:#ccc;
	margin:10px 0 10px -14px;
}
#facetsList .ctl010PagingB .navLinks
{
	margin:0 6px;
}
#facetsList .ctl010PagingB .box
{
	background-color: #F7F1FB;
	color: #0D51AB;
	height: 21px;
	line-height:20px;
	margin-right: 1px;
	min-width: 20px;
	width: 20px;
}
#facetsList .ctl010PagingB .selected
{
	background-color: #eee; 
	color: #000
}
/*-----------------------------------------------------------------------*/
/*------------------- End Facets Filters PagingB ------------------------*/
/*-----------------------------------------------------------------------*/
/*-----------------------------------------------------------------------*/
/*------------------------Pagination-StyleA------------------------------*/
/*-----------------------------------------------------------------------*/
.ctl010AGlobalPaging{
    width:765px;
    height:50px;
    border-top:solid 1px #ccc;
    float:right;
    clear:both;
    margin-top:0.5em;
    padding-top:1em;
    position:relative;
 }
.ctl010APagingElements{
    height:20px;
    position:relative;
 }
.ctl010ARssFedd{
    height:1.6em;
 }
.ctl010ARssImg{
    float:left;
    margin-top:0.1em;
    margin-right:0.2em;
 }
.ctl010ARssMsg{
    font-size:11px;
    color:#333;
    float:left;
    margin-right:0.2em;
 }
.ctl010ARssLnk{
    color:#75825e;
    text-decoration:underline;
    float:left;
    font-size:11px;
 }
.ctl010APagingSeparator{
    background-color:#cfcfcf;
    width:1px;
    height:16px;
    float:left;
    margin-left:10px;
    margin-right:10px;
 }
.ctl010AItemsPerPage{
    font-family:Verdana;
    float:left;
    color:#333;
    font-size:11px; 
    vertical-align:middle;   
}
.ctl010ASelectItemsPerPage{
   border:solid 1px #b3b9c3;
   color:#333;
}
.ctl010ATextItemPerPage{
    float:left;
    margin-right:0.6em;
    height:1.6em;
}
.ctl010ASelectItemPerPageDiv{
    float:left;
    height:1.6em; 
}
.ctl010ASelectItemPerPage{
    border:solid 1px #b3b9c3;
    width:50px;
}
.ctl010APaging{
    font-family:Verdana;
    font-size:11px;
    color:#333333;
    display:inline; 
	padding-right:10px;
 }
.ctl010APagingDisplaying{
    float:left;
    height:1.6em;
 }
.ctl010APagingNavigation{
    float:left;
    height:1.6em;
    margin-top:-2px;
 }
.ctl010APagingTextBox{
    border:1px solid #b3b9c3;
    width:20px !important;
    color:#333;
 }
 .ctl010APagingLinkPrev, .ctl010APagingLinkNext, .ctl010APagingLinkPrev:visited, .ctl010APagingLinkNext:visited {
    color:#6d8d07;
    text-decoration:underline;
 }
 .ctl010APagingLinkPrev:hover , .ctl010APagingLinkNext:hover {
    color:#ff9900;
    text-decoration:none;
 }
.ctl010ImgPaging{
    margin-bottom:-2px;
}
.ctl010AAllLeft{
    float:right;
    clear:none;
}
.ctl010APagingButtonFirst {display: none;}
.ctl010APagingButtonLast {display: none;}
/*-----------------------------------------------------------------------*/
/*-----------------------End Pagination-StyleA---------------------------*/
/*-----------------------------------------------------------------------*/
/*-----------------------------------------------------------------------*/
/*------------------------------- RSS feed ------------------------------*/
/*-----------------------------------------------------------------------*/
.rssFeed{
    float:left;
    width:80px;
}
/*-----------------------------------------------------------------------*/
/*--------------------------- End RSS feed ------------------------------*/
/*-----------------------------------------------------------------------*/
/*---------------------------------*/
/*----- PopOutPanel Style A -----  */
/*---------------------------------*/
.cornerTopLeft{
    float:left;
    width:14px;
    height:14px;
}
.topBackground{
    background:url(http://media.newjobs.com/mm/redux/jobsearch/flyOut/topBackground.png) repeat-x;
    float:left;
    height:14px;
    width:586px;
}
.cornerTopRight{
    float:left;
    width:14px;
    height:14px;
}
.leftBackground{
    float:left;
    clear:both;
    width:14px;
    height:190px;
}
.mainBackground{
  background:url(http://media.newjobs.com/mm/redux/jobsearch/flyOut/background.png) repeat-x;
    float:left;
    height:190px;
    width:586px;
}
.background{
  float:left;
  width:574px;
  height:177px;
  overflow:auto;   
  margin-top:0px;
  margin:0px 6px auto 6px;
}
.rightBackground{
    float:left;
    width:14px;
    height:190px;
}
.cornerBottomLeft{
    float:left;
    clear:both;
    width:14px;
    height:14px;
}
.bottomBackground{
    background:url(http://media.newjobs.com/mm/redux/jobsearch/flyOut/bottomBackground.png) repeat-x;
    float:left;
    height:14px;
    width:586px;
}
.cornerBottomRight{
    float:left;
    width:14px;
    height:14px;
}
.closeButton{
    float:right;
    position:relative;
    cursor:pointer;
    margin:-6px -6px 4px 0px !important;
    width:13px;
    height:13px;
}
.closeButtonMore{
    float:right;
    position:relative;
    cursor:pointer;
    width:13px;
    height:13px;
}
.jobTitle{
    clear:both;
    float:left;
    color:#fe700d;
    font-family:Verdana;
    font-size:11px;
    font-weight:bold;
    text-align:left;
}
.centerDate{
    text-align:center;
}
.wrapJobTitle{
    white-space:normal;
}
.jobDescription{
    float:left;
    color:#333;
    font-family:Arial;
    font-size:11px;
    text-align:left; 
    margin-top:0.67em;
    width:100%;
    clear:both;
}
.jobLink{
    color:#5f5f2b;
    font-family:Arial;
    font-size:11px;
    margin-top:0.5em;
}
.textInFlyOut{
    margin-top:0em;
    float:left;
    clear:both;
    color:#333;
    font-family:verdana;
    font-size:11px;
    text-align:left;
}
.columnLeftText{
    margin-left:0.5em;
    margin-right:1.17em;
    float:left;
    clear:both;
    width:180px;
}
.columnMiddleText{
    margin-right:1.17em;
    float:left;
    width:180px;
}
.columnRightText{
    float:left;
    width:160px;
}
.yearsExperience{
    margin-top:5px;
}
.jobEducationLevel{
    margin-top:5px;
}
.viewJobDesc{
    font-size:0.92em;
    color:#5f5f2b;
    font-family:Verdana;
}
.viewJobDescImg{
    clear:both;
    float:left;
    margin-right:0.5em;
}
.viewJobDescLink{
    float:left;
}
.playVideoImg{
    clear:both;
    float:left;
    margin-right:0.5em;
}
.playVideoLink{
    float:left;
}
.playVideo{
    margin-top:3em;
    color:#5f5f2b;
    font-family:Verdana;
}
.separator{
    width:1px;
    height:80px;
    float:left;
    background-color:#d7d7d7;
}
.footerFlyout{
    margin-bottom:10px;    
}
.mouseoverPanel{
    display:none;
    width:628px;
}
/*---------------------------------*/
/*--- End PopOutPanel Style A ---  */
/*---------------------------------*/
/*---------------------------------*/
/*----- PopOutPanel Style B -----  */
/*---------------------------------*/
.fpwcontentWhite {}
/*---------------------------------*/
/*--- End PopOutPanel Style B ---  */
/*---------------------------------*/
.fntBodyCopy, .fntBodyCopyA , .fntBodyCopyB,
.fntPageHead,
.fntSectionHead, .fntSectionHeadA, .fntSectionHeadF,
.fntSectionSubHead1, .fntSubHeadE, .fntSubHeadC ,
.fntActions,
.fntPageHeadInfo {/*font-family: Verdana; font-weight: normal;*/ }
.fntBodyCopy, .fntBodyCopyB { font-size: 12px; color: #000000; } /* main font should be used everywhere*/
.fntBodyCopyA { font-size: 11px; color: #000000; } 
.fntPageHead { font-family: Arial; font-weight: bold; font-size: 17px; color: #666666; } /* page tiltle/header, used in page containers (big grey) */
.fntPageHeadInfo{font-size: 11px; color: #748451; } /* text below page title/header, bread crumbs in page containers (small green)*/
.fntSectionHead { font-size: 17px; color: #e86d00;  font-weight: bold; padding: 0px; margin: 0px; line-height: 30px;} /* orange bold subtitle used on confirmation pages*/
.fntSectionHeadA { font-size: 17px; color: #e86d00;  font-weight: bold; padding: 0px; margin: 0px; line-height: 30px;} /* copy of .fntSectionHead which shoudl be replaced by .fntSectionHeadA*/
.fntSectionHeadF { font-size: 17px; color: #7b4f90;  font-weight: bold; padding: 0px; margin: 0px; line-height: 30px;} 
.fntSubHeadE { font-size: 16px; color: #787878; padding: 0px; margin: 0px; line-height: 18px;}
.fntSubHeadC { font-size: 11px; color: #7b4f90; font-weight: bold;  padding: 0px; margin: 0px; line-height: 13px;}
.fntSectionSubHead1 { font-size: 14px; color: #7b4f90;  font-weight: bold;} /* purple bold subtitle used mostly on forms*/
.fntSectionSubHead2 { font-size: 12px; color: #525252;  font-weight: bold;} /* grey bold subtitle redesigned*/
.fntActions {} /* action links, used in "Next Section" on confirmation pages, used only for <A>s*/
	/*a.fntActions {color: #7b4f90; font-weight: bold; text-decoration: underline;}
	a:hover.fntActions {text-decoration: none; color: #ff9900; }*/
/****** Styleguide A1 ******/
.test {}
.fntA1 a {font: Verdana; font-size: 11px; color: #7B4F90; text-decoration: underline;}
	.fntA1 a:visited {color: #7B4F90; text-decoration: underline;}
	.fntA1 a:hover {color: #FF9900; text-decoration: none;}
.fntA1b a {font: Verdana; font-size: 11px; color: #7B4F90; text-decoration: underline;}
	.fntA1b a:visited {color: #999999; text-decoration: underline;}
	.fntA1b a:hover {color: #FF9900; text-decoration: none;}
.fntA1c a {font: Verdana; font-size: 12px; color: #7B4F90; text-decoration: underline;}
	.fntA1c a:visited {color: #7B4F90; text-decoration: underline;}
	.fntA1c a:hover {color: #FF9900; text-decoration: none;}
/****** Styleguide A2 ******/
.fntA2 a {font: Verdana; font-size: 11px; color: #7B4F90; text-decoration: none;}
	.fntA2 a:visited {color: #7B4F90; text-decoration: none;}
	.fntA2 a:hover {color: #FF9900; text-decoration: underline;}
.fntA2b a {font: Verdana; font-size: 11px; color: #7B4F90; text-decoration: none;}
	.fntA2b a:visited {color: #999999; text-decoration: none;}
	.fntA2b a:hover {color: #FF9900; text-decoration: underline;}
/****** Styleguide B1 (Default) ******/
.fntB1 a {font: Verdana; font-size: 11px; font-weight: bold; color: #7B4F90; text-decoration: underline;}
	.fntB1 a:visited {color: #7B4F90; text-decoration: underline;}
	.fntB1 a:hover {color: #4E0471; text-decoration: underline;}
/****** Styleguide B2 (Toggle) ******/
.fntB2 a {font: Verdana; font-size: 11px; font-weight: bold; color: #7B4F90; text-decoration: none;}
	.fntB2 a:visited {color: #999999; text-decoration: none;}
	.fntB2 a:hover {color: #4E0471; text-decoration: underline;}
/****** Styleguide C (Expand or Collapse) ******/
.fntC a {font: Verdana; font-size: 11px; font-weight: bold; color: #7B4F90; text-decoration: none;}
	.fntC a:visited {color: #7B4F90; text-decoration: none;}
	.fntC a:hover {color: #7B4F90; text-decoration: none;}
/****** Styleguide D (Button s) ******/
.fntD a {font: Verdana; color: #7B4F90; text-decoration: underline;}
	.fntD a:visited {color: #7B4F90; text-decoration: underline;}
	.fntD a:hover {color: #4E0471; text-decoration: underline;}
.fntD {color: #777777; font-size: 11px;}
/****** Header  Styles (Green Base, White :hover) ******/
.headFnt a {font: Verdana; font-size: 11px; color: #6a6c47; text-decoration: underline;}
	.headFnt a:visited {color: #6a6c47; text-decoration: underline;}
	.headFnt a:hover {color: White; text-decoration: none;}
/****** font colors ******/
.redFnt{color: #ff0100;}
/** NEW FONTS DEFINITIONS - This file was created referencing to //depot/Documents/UXGlobal/LIBRARY/B - Web/3 - Controls/Fonts/2012.05.0/fonts.xlsx font styleguide **/
.fnt1 {
    font-size: 11px; 
    font-weight: normal;
    color: #333;
    cursor: default;
}
.fnt1 a, a.fnt1 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt1 a:visited, a.fnt1:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt1 a:hover, a.fnt1:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt2 {
    font-size: 11px; 
    font-weight: normal;
    color: #fff;
    cursor: default;
}
.fnt2 a, a.fnt2 {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt2 a:visited, a.fnt2:visited {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt2 a:hover, a.fnt2:hover {
    color: #fff; 
    text-decoration: none;
    cursor: pointer;
}
.fnt3 {
    font-size: 11px; 
    font-weight: normal;
    color: #d5b2f6;
    cursor: default;
}
.fnt3 a , a.fnt3 {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt3 a:visited, a.fnt3:visited {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt3 a:hover, a.fnt3:hover {
    color: #fff; 
    text-decoration: none;
    cursor: pointer;
}
.fnt4 {
    font-size: 13px; 
    font-weight: normal;
    color: #333;
    cursor: default;
}
.fnt4 a , a.fnt4 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt4 a:visited, a.fnt4:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt4 a:hover, a.fnt4:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt5 {
    font-size: 13px; 
    font-weight: bold;
    color: #333;
    cursor: default;
}
.fnt5 a , a.fnt5 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt5 a:visited, a.fnt5:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt5 a:hover, a.fnt5:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
/* -- deprecated styles --
.fnt6 {
    font-size: 13px; 
    font-weight: bold;
    color: #333;
    cursor: default;
}
.fnt6 a , a.fnt6 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt6 a:visited, a.fnt6:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt6 a:hover, a.fnt6:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
*/
.fnt7 {
    font-size: 13px; 
    font-weight: bold;
    color: #fff;
    cursor: default;
}
.fnt7 a , a.fnt7 {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt7 a:visited, a.fnt7:visited {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt7 a:hover, a.fnt7:hover {
    color: #fff; 
    text-decoration: none;
    cursor: pointer;
}
.fnt8 {
    font-family: inherit; /* fix FF buttons */
    font-size: 13px; 
    font-weight: bold;
    color: #673695;
    text-transform: uppercase;
    cursor: pointer;
}
/* -- deprecated styles --
.fnt9 {
    font-size: 16px; 
    font-weight: bold;
    color: #333;
    cursor: default;
}
.fnt9 a , a.fnt9 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt9 a:visited, a.fnt9:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt9 a:hover, a.fnt9:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
*/
.fnt10 {
    font-family: inherit; /* fix FF buttons */
    font-size: 16px; 
    font-weight: bold;
    color: #673695;
    text-transform: uppercase;
    cursor: pointer;
}
.fnt11 {
    font-size: 16px; 
    font-weight: normal;
    color: #333;
    cursor: default;
}
.fnt11 a , a.fnt11 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt11 a:visited, a.fnt11:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt11 a:hover, a.fnt11:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt11_js {
    font-size: 16px; 
    font-weight: normal;
    color: #333;
    cursor: default;
}
.fnt11_js a , a.fnt11_js {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt11_js a:visited, a.fnt11_js:visited {
    color: #955cca; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt11_js a:hover, a.fnt11_js:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt12 {
    font-size: 16px; 
    font-weight: bold;
    color: #333;
    cursor: default;
}
.fnt12 a , a.fnt12 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt12 a:visited, a.fnt12:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt12 a:hover, a.fnt12:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt13 {
    font-size: 13px; 
    font-weight: normal;
    color: #565656;
    cursor: default;
}
.fnt13 a , a.fnt13 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt13 a:visited, a.fnt13:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt13 a:hover, a.fnt13:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt14 {
    font-size: 11px; 
    font-weight: normal;
    color: #0e774a;
    cursor: default;
}
.fnt14 a , a.fnt14 {
    color: #0e774a; 
    text-decoration: none;
    cursor: pointer;
}
.fnt14 a:visited, a.fnt14:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt14 a:hover, a.fnt14:hover {
    color: #0e774a; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt15 {
    font-size: 13px; 
    font-weight: normal;
    color: #ac0000;
    cursor: default;
}
.fnt16 {
    font-size: 13px; 
    font-weight: normal;
    color: #0e774a;
    cursor: default;
}
.fnt16 a , a.fnt16 {
    color: #0e774a; 
    text-decoration: none;
    cursor: pointer;
}
.fnt16 a:visited, a.fnt16:visited {
    color: #0e774a; 
    text-decoration: none;
    cursor: pointer;
}
.fnt16 a:hover, a.fnt16:hover {
    color: #0e774a; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt17 {
    font-size: 16px; 
    font-weight: bold;
    color: #ccc;
    cursor: default;
}
.fnt17 a , a.fnt17 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt17 a:visited, a.fnt17:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt17 a:hover, a.fnt17:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt18 {
    font-size: 16px; 
    font-weight: bold;
    color: #fff;
    cursor: default;
}
.fnt18 a , a.fnt18 {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt18 a:visited, a.fnt18:visited {
    color: #fff; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt18 a:hover, a.fnt18:hover {
    color: #fff; 
    text-decoration: none;
    cursor: pointer;
}
.fnt19 {
    font-size: 16px; 
    font-weight: normal;
    color: #333;
    cursor: default;
}
.fnt19 a , a.fnt19 {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt19 a:visited, a.fnt19:visited {
    color: #955cca; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt19 a:hover, a.fnt19:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt20 {
    font-size: 11px; 
    font-weight: normal;
    color: #565656;
    cursor: default;
}
.fnt20 a , a.fnt20 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt20 a:visited, a.fnt20:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt20 a:hover, a.fnt20:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt21 {
    font-size: 11px; 
    font-weight: normal;
    color: #ac0000;
    cursor: default;
}
.fnt21 a , a.fnt21 {
    color: #ac0000; 
    text-decoration: none;
    cursor: pointer;
}
.fnt21 a:visited, a.fnt21:visited {
    color: #ac0000; 
    text-decoration: none;
    cursor: pointer;
}
.fnt21 a:hover, a.fnt21:hover {
    color: #ac0000; 
    text-decoration: none;
    cursor: pointer;
}
.fnt22 {
    font-size: 28px; 
    font-weight: normal;
    color: #333;
    cursor: default;
}
.fnt22 a , a.fnt22 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt22 a:visited, a.fnt22:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt22 a:hover, a.fnt22:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt23 {
    font-size: 28px; 
    font-weight: bold;
    color: #333;
    cursor: default;
}
.fnt23 a , a.fnt23 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt23 a:visited, a.fnt23:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt23 a:hover, a.fnt23:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt24 {
    font-size: 22px; 
    font-weight: normal;
    color: #333;
    cursor: default;
}
.fnt24 a , a.fnt24 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt24 a:visited, a.fnt24:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt24 a:hover, a.fnt24:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
.fnt25 {
    font-size: 22px; 
    font-weight: bold;
    color: #333;
    cursor: default;
}
.fnt25 a , a.fnt25 {
    color: #0d51ab; 
    text-decoration: none;
    cursor: pointer;
}
.fnt25 a:visited, a.fnt25:visited {
    color: #955cca; 
    text-decoration: none;
    cursor: pointer;
}
.fnt25 a:hover, a.fnt25:hover {
    color: #0d51ab; 
    text-decoration: underline;
    cursor: pointer;
}
/*------------------------------------------------------------------*/
/*------------------------Icons-Remove------------------------------*/
/*------------------------------------------------------------------*/
.icnRemove{
    background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat;
    background-position:0px -893px;
    height:13px;
    width:13px;
    float:left;
    margin-right:4px;
}
.icnRemove:hover{
    background-position:0px -912px;
}
.icnRemove span {
	display:none;
}
/*------------------------------------------------------------------*/
/*---------------------------End Icons-Remove-----------------------*/
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*-----------------------Icons grid JSR-----------------------------*/
/*------------------------------------------------------------------*/
 .mapIcon,.accIcon,.divIcon,.videoIcon,.salaryIcon,.salaryIconNoInfo,.salary2Icon,.actionIcon,.rssImg{
    background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat;
    width:19px;
    height:19px;
    display:block;
    text-decoration:none;
    text-indent:-1000em;
    line-height:1px;
 }
 .ctl010APagingLinkPrev, .ctl010APagingLinkNext {
background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat;
}
.ctl010APagingLinkPrev { background-position:left -1084px; padding-left: 17px;padding-right: 15px;}
.ctl010APagingLinkPrev:hover { background-position:left -1097px;}
.ctl010APagingLinkPrev.disableLink { background-position:left -1110px;}
.ctl010APagingLinkNext { background-position:right -1123px;  padding-left: 15px; padding-right: 17px;}
.ctl010APagingLinkNext:hover { background-position:right -1136px;}
.ctl010APagingLinkNext.disableLink { background-position:right -1149px;}
 .ctl010APagingPageInfo {
  float: left;
 }
 .ctl010APagingLinkNext, .ctl010APagingLinkPrev {
  float: left;
 }
 .rssImg{
    margin-left: 0px; 
    background-position:0px -1007px;
 }
 .mapIcon{
    background-position:0px -19px;
 }
 .mapIcon:hover{
    background-position:0px -38px;
    cursor:pointer;  
    text-indent:-1000em;
    width:19px;
    height:19px;
    line-height:1px;   
 }
 .multiJobMapIcon
 {
     background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/iconsLargeMap2.png') no-repeat !important;
 }
.accIcon{
    background-position:0px -247px;   
 }
.accIcon:hover{
    background-position:0px -266px;
    cursor:pointer;     
}
.divIcon{
    background-position:0px -304px;  
}
.divIcon:hover{
    background-position:0px -323px;
    cursor:pointer;
}
.videoIcon{
    background-position:0px -76px;
}
.videoIcon:hover{
    background-position:0px -95px;
    cursor:pointer;
}
.salaryIcon{
    background-position:0px -133px;
}
.salaryIcon:hover{
    background-position:0px -171px;
    cursor:pointer;
}
.salaryIconNoInfo{
    background-position:0px -152px;
}
.contextSalaryInfo{
    color:#896D97;
    font-size:0.95em;
    clear: both;
}
.salaryIconNoInfo:hover{
    background-position:0px -171px;
    cursor:pointer;
}
.salary2Icon:hover{
   background-position:0px -171px;
   cursor:pointer;
}
.actionIcon{
    background-position:0px -361px;
}
.actionIcon:hover{
    background-position:0px -380px;
    cursor:pointer;
}
/*------------------------------------------------------------------*/
/*------------------End Icons grid JSR------------------------------*/
/*------------------------------------------------------------------*/
/*------------------------------------------------------------------*/
/*--------------------- Icons header grid --------------------------*/
/*------------------------------------------------------------------*/
.imgHeaderColumnMap, .imgHeaderColumnVideo,.imgHeaderColumnSalary,.imgHeaderColumnAcces,.imgHeaderColumnDiversity,.imgHeaderColumnAction{
    background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat;
    width:19px;
    height:19px;
 }
 .imgHeaderColumnMap{
    background-position:0px 0px;
 }
 .imgHeaderColumnVideo{
    background-position:0px -57px;
 }
 .imgHeaderColumnSalary{
    background-position:0px -114px;
 }
 .imgHeaderColumnAcces{
    background-position:0px -228px;
 }
 .imgHeaderColumnDiversity{
    background-position:0px -285px;
 }
 .imgHeaderColumnAction{
    background-position:0px -342px;
 }
/*------------------------------------------------------------------*/
/*------------------- End Icons header grid ------------------------*/
/*------------------------------------------------------------------*/
/*------------------------Icons-roundListButton---------------------*/
.icnRoundList{
    background:transparent url("http://media.newjobs.com/mm/redux/jobsearch/jsr/roundListButton.gif") no-repeat 0px 3px;
    float:left;
    padding-left:11px;
    text-decoration:underline;
    color:#78825D;
}
/*---------------------End Icons-roundListButton-----------------------*/
/*---------------------start Icons-pb-----------------------*/
.iconBriefcaseBrown,
.iconDocument,
.iconGlobe{
	background:url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd);
	display:inline-block;
	background-repeat:no-repeat;
	background-position:0 0;
	*vertical-align:middle;
}
.iconBriefcaseBrown{width: 16px; height: 16px; background-position: -452px -50px;}
.iconDocument{width: 14px; height: 16px; background-position: -468px -50px;}
.iconGlobe{width: 16px; height: 16px; background-position: -482px -50px;}
.iconBriefcaseBrown{width: 16px; height: 16px; background-position: -452px -50px;}
.iconDocument{width: 14px; height: 16px; background-position: -468px -50px;}
.iconGlobe{width: 16px; height: 16px; background-position: -482px -50px;}
 #nav .iconBriefcaseBrown .iconDocument .iconGlobe{
    left: 0px;
    top: 3px;
}
/*---------------------end Icons-pb-----------------------*/
.beKnownLogo64x11 { 
     width: 64px; height: 11px; background-position: -498px -50px;
 }
 .imgReplacement 
 {
    text-indent:-1000em;
    line-height:1px;   
 }
.beelogo40x54 { 
     background:url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd);
     width: 40px; height: 54px; background-position: -562px -50px;
 }
 
/****** Errors ******/
#error404Banner {width: auto; height: 137px; background: url(http://media.newjobs.com/mm/redux/static_pages/error_404_banner.jpg) no-repeat;}
	#error404Banner .error404Header {width: 560px; height: 90px; padding: 30px 0 0 20px; overflow: hidden;}
	#error404Banner .error404Header h1 {color: #b7d067; font-size: 26px; font-weight: normal; margin: 0px; padding: 0px;}
#error404Container {width: auto; display: block; background: url(http://media.newjobs.com/mm/redux/create-account/becomeMember_containerBG_.gif) repeat-y; padding: 1px 0 0 0; min-height: 100px; height: auto !important; height: 100px;}
#error404Container li {list-style:none; margin: 0px 0 0 16px; padding: 0}
#error404Container h3 {font-size:1.2em; color: #7b4f90; padding: 30px 0;}
#error404Container h2{font-size:1.9em; color: #b7d067; padding: 25px 0 0 20px; font-weight:bold}
#error404Container #wrapper{ width: 960px; margin: 0 auto; background: #f9f9f9}
#error404Container p{ margin:0 0 0 18px;}
#error404Container ul{ margin: 18px 0 17px 18px;}
#error404Container h3{ margin: 25px 0 16px 18px; padding: 0;}
#error404Bottom {width: auto; height: 35px; background: url(http://media.newjobs.com/mm/redux/create-account/becomeMember_containerBottom.gif) no-repeat top left;}
#error500Banner {width: auto; height: 137px; background: url(http://media.newjobs.com/mm/redux/static_pages/error_404_banner.jpg) no-repeat;}
	#error500Banner .error500Header {width: 560px; height: 90px; padding: 30px 0 0 20px; overflow: hidden;}
	#error500Banner .error500Header h1 {color: #b7d067; font-size: 26px; font-weight: normal; margin: 0px; padding: 0px;}
#error500Container {width: auto; display: block; background: url(http://media.newjobs.com/mm/redux/create-account/becomeMember_containerBG_.gif) repeat-y; padding: 1px 0 0 0; min-height: 100px; height: auto !important; height: 100px;}
#error500Container li {list-style:none; margin: 0px 0 0 16px; padding: 0}
#error500Container h3 {font-size:1.2em; color: #7b4f90; padding: 30px 0;}
#error500Container h2{font-size:1.9em; color: #b7d067; padding: 25px 0 0 20px; font-weight:bold}
#error500Container #wrapper{ width: 960px; margin: 0 auto; background: #f9f9f9}
#error500Container p{ margin:0 0 0 18px;}
#error500Container ul{ margin: 18px 0 17px 18px;}
#error500Container h3{ margin: 25px 0 16px 18px; padding: 0;}
#error500Bottom {width: auto; height: 35px; background: url(http://media.newjobs.com/mm/redux/create-account/becomeMember_containerBottom.gif) no-repeat top left;}
/****** monsCarousel Default Styles ******/
div#monsterCarousel {overflow: hidden; position: relative;}
div#MCWrapper {position: relative;}
div.MCgrayBarTop {background: url(http://media.newjobs.com/mm/redux/global/carousels/MCgrayBar_top_middle.gif) repeat-x; margin-bottom: 10px}
	div.MCgrayBarTop .MCgrayBarLeft {width: 58px; float: left; background: url(http://media.newjobs.com/mm/redux/global/carousels/MCgrayBar_top_right.gif) no-repeat;}
	div.MCgrayBarTop .MCgrayBarRight {width: 58px; float: right; background: url(http://media.newjobs.com/mm/redux/global/carousels/MCgrayBar_top_left.gif) no-repeat;}
div.MCgrayBarBottom {background: url(http://media.newjobs.com/mm/redux/global/carousels/MCgrayBar_bottom_middle.gif) repeat-x; margin-top: 10px;}
	div.MCgrayBarBottom .MCgrayBarLeft {width: 58px; float: left; background: url(http://media.newjobs.com/mm/redux/global/carousels/MCgrayBar_bottom_left.gif) no-repeat;}
	div.MCgrayBarBottom .MCgrayBarRight {width: 58px; float: right; background: url(http://media.newjobs.com/mm/redux/global/carousels/MCgrayBar_bottom_right.gif) no-repeat;}
div#monsterCarousel ul {float: left; margin: 0; padding: 0; display: block; list-style-type: none; overflow: hidden; position: relative;}
	div#monsterCarousel #MCprevButton {float: left; position: relative;}
	div#monsterCarousel #MCnextButton {float: right; position: relative;}
	div#monsterCarousel #MCprevButton .prev {background: url(http://media.newjobs.com/mm/redux/crunch/cmJCarouselButtonsPrev.gif) no-repeat scroll left top; z-index: 10;}
	div#monsterCarousel #MCnextButton .next {background: url(http://media.newjobs.com/mm/redux/crunch/cmJCarouselButtonsNext.gif) no-repeat scroll left top; z-index: 10;}
	div#monsterCarousel #MCprevButton .disabled, #monsterCarousel #MCnextButton .disabled {background-position: left center !important;}
	div#monsterCarousel #MCprevButton .hover {background-position: left bottom;}
	div#monsterCarousel #MCnextButton .hover {background-position: left bottom;}
div#monsterCarousel ul li {list-style-type: none; display: block; float: left; text-align: center;}
div#monsterCarousel ul .MCDivider {background: url(http://media.newjobs.com/mm/redux/crunch/jpDottedLine.gif) no-repeat scroll center center;}
/**
 * This <div> element is wrapped by jCarousel around the list
 * and has the classname "jcarousel-container".
 */
.jcarousel-container {
    position: relative;
}
.jcarousel-clip {
    z-index: 2;
    padding: 0;
    margin: 0;
    overflow: hidden;
    position: relative;
}
.jcarousel-list {
    z-index: 1;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
}
.jcarousel-list li,
.jcarousel-item {
    float: left;
    list-style: none;
    /* We set the width/height explicitly. No width/height causes infinite loops. */
    width: 75px;
    height: 75px;
}
/**
 * The buttons are added dynamically by jCarousel before
 * the <ul> list (inside the <div> described above) and
 * have the classnames "jcarousel-next" and "jcarousel-prev".
 */
.jcarousel-next {
    z-index: 3;
    display: none;
}
.jcarousel-prev {
    z-index: 3;
    display: none;
}
/*Page Container 960 default skin  - NEW DEFINITON*/
.pageContainer { width: 960px; padding: 0px; margin: 0px; }
.pageContainerTitle { padding: 3px 0px 0px 0px; margin: 0px; overflow: hidden; width: 765px;} /* top padding 3px, together with standard -35 negative bottom margin on mcPod creates effective padding 16px*/
.PgHeadingTop { padding:8px 0px 0px 0px; margin: 0px; overflow: hidden; width: 765px;}
.pageContainerSubTitle { padding: 13px 0px 0px 0px; margin: 0px; }
.pageContainer .pcBgTop , 
.pageContainer .pcBgMid , 
.pageContainer .pcBgBtm { background: transparent url('http://media.newjobs.com/mm/redux/pageContainers/pageContainer.png') no-repeat scroll; }
.pageContainer .pcBgTop { background-position: 0px 0px; height: 8px; font-size: 1px; margin-top: 15px; width: 960px; }
.pageContainer .pcBgMid { background-position: -1921px 0px; min-height: 50px; height: auto !important; height: 50px; border-left: 1px solid #cccccc; border-right: 1px solid #cccccc; width: 958px; }
.pageContainer .pcBgBtm { background-position: -960px 0px; height: 8px; font-size:1px; width: 960px; }
.pageContainer .pcBody { padding: 8px 15px 8px 15px; }
/*Page Container 765px width skin*/
.pageContainer.skin765 { width: 765px; }
.pageContainer.skin765 .pcBgTop , 
.pageContainer.skin765 .pcBgMid , 
.pageContainer.skin765 .pcBgBtm { background: transparent url('http://media.newjobs.com/mm/redux/pageContainers/pageContainer.skin765.png') no-repeat scroll; }
.pageContainer.skin765 .pcBgTop { width: 765px; }
.pageContainer.skin765 .pcBgMid { background-position: -1531px 0px; width: 763px; }
.pageContainer.skin765 .pcBgBtm { background-position: -765px 0px; width: 765px; }
.pageContainer .pcBody .pcDivider {height: 1px; width: 733px; overflow: hidden; margin: 7px 0; background: url(http://media.newjobs.com/mm/redux/pageContainers/grayGradientBox/ggBoxDivider.gif) no-repeat;}
/* /////////////////////////////////////////////// */
/*Page Container 960 default skin  - OLD DEFINITON - should be migrated to new one, see above*/
.pageContainerDefault960 { width: 960px; padding: 0px; margin: 0px 0px 10px 0px; }
.pageContainerDefault960 h1.pcTitle { font-family: Verdana; font-size: 26px; color: #758e30; font-weight: normal; margin: 0px 0px 7px 0px; padding: 0px; overflow: hidden; width: 765px; height: 35px; line-height: 35px; }
.pageContainerDefault960 h2.pcSubTitle { font-family: Verdana; font-size: 17px; color: #e86d00; font-weight: bold; margin: 0px 0px 5px 0px; padding: 0px; }
.pageContainerDefault960 .pcBgTop , .pageContainerDefault960 .pcBgMid , .pageContainerDefault960 .pcBgBtm { background: transparent url('http://media.newjobs.com/mm/redux/pageContainers/pcDefault960.png') no-repeat scroll; }
.pageContainerDefault960 .pcBgTop { background-position: 0px 0px; height: 8px; font-size: 1px; }
.pageContainerDefault960 .pcBgMid { background-position: -1921px 0px; min-height: 50px; height: auto !important; height: 50px; border-left: 1px solid #cccccc; border-right: 1px solid #cccccc; }
.pageContainerDefault960 .pcBgBtm { background-position: -960px 0px; height: 8px; font-size:1px; }
.pageContainerDefault960 .pcBody {  padding: 8px 15px 8px 15px; }
.pageContainerDefault765 { width: 765px; padding: 0px; margin: 0px 0px 10px 0px; }
.pageContainerDefault765 h1.pcTitle { font-family: Verdana; font-size: 26px; color: #758e30; font-weight: normal; margin: 0px 0px 7px 0px; padding: 0px; overflow: hidden; width: 765px; height: 35px; line-height: 35px; }
.pageContainerDefault765 h2.pcSubTitle { font-family: Verdana; font-size: 17px; color: #e86d00; font-weight: bold; margin: 0px 0px 5px 0px; padding: 0px; }
.pageContainerDefault765 .pcBgTop , .pageContainerDefault765 .pcBgMid , .pageContainerDefault765 .pcBgBtm { background: transparent url('http://media.newjobs.com/mm/redux/pageContainers/pcDefault765.png') no-repeat scroll; }
.pageContainerDefault765 .pcBgTop { background-position: 0px 0px; height: 8px; font-size: 1px; }
.pageContainerDefault765 .pcBgMid { background-position: -1531px 0px; min-height: 50px; height: auto !important; height: 50px; border-left: 1px solid #cccccc; border-right: 1px solid #cccccc; }
.pageContainerDefault765 .pcBgBtm { background-position: -765px 0px; height: 8px; font-size:1px; }
.pageContainerDefault765 .pcBody {  padding: 8px 15px 8px 15px; }
.pageContainerDefault960 .pcDefault960Left3C,.pageContainerDefault960 .pcDefault960Right2C  {margin: 0px; padding: 0px; } 
.pageContainerDefault960 .pcDefault960Left3C { width: 555px; float: left;  border-top: 1px solid #e4e4e4;  }
.pageContainerDefault960 .pcDefault960Right2C { width: 358px; float: right;   }
.pageContainerDefault960 .noTopBorder {border: none;}
/* /////////////////////////////////////////////// */
/****** New Gray Gradient Containers ******/
.ggBox765 {width: 763px;}
#ggBoxContainer {border: 1px solid #cccccc; position: relative; background: url(http://media.newjobs.com/mm/redux/pageContainers/grayGradientBox/ggBoxCorner_gradient2.gif) top left repeat-x;}
#ggBoxContainer .ggCornerTopLeft {width: 8px; height: 8px; position: relative; z-index: 5; float: left; margin: -1px 0 0 -1px; background: url(http://media.newjobs.com/mm/redux/pageContainers/grayGradientBox/ggBoxCorner_topLeft.gif) top left no-repeat; overflow: hidden;}
#ggBoxContainer .ggCornerTopRight {width: 8px; height: 8px; position: relative; z-index: 5; float: right; margin: -1px -1px 0 0; background: url(http://media.newjobs.com/mm/redux/pageContainers/grayGradientBox/ggBoxCorner_topRight.gif) top right no-repeat; overflow: hidden;}
#ggBoxContainer .ggCornerBottomLeft {width: 8px; height: 8px; position: relative; z-index: 5; float: left; margin: 0 0 -2px -1px; background: url(http://media.newjobs.com/mm/redux/pageContainers/grayGradientBox/ggBoxCorner_bottomLeft.gif) top left no-repeat; overflow: hidden;}
#ggBoxContainer .ggCornerBottomRight {width: 8px; height: 8px; position: relative; z-index: 5; float: right; margin: 0 -1px -2px 0; background: url(http://media.newjobs.com/mm/redux/pageContainers/grayGradientBox/ggBoxCorner_bottomRight.gif) top right no-repeat; overflow: hidden;}
#ggBoxContainer .ggDivider {height: 1px; width: 733px; overflow: hidden; margin: 7px 0; background: url(http://media.newjobs.com/mm/redux/pageContainers/grayGradientBox/ggBoxDivider.gif) no-repeat;}
/**************** Content Container D ****************/
.containerDHeader {width:765px; height:5px; background: url(http://media.newjobs.com/mm/redux/pageContainers/containerD/containerD.gif) center top no-repeat; background-position: -765px 0px; }
.containerDBottom {background: url(http://media.newjobs.com/mm/redux/pageContainers/containerD/containerD.gif) center bottom no-repeat; background-position: -1532px 0px; width:765px; height:5px}
.containerDWrapper { width:723px; min-height: 30px; border-right: 1px solid #cc99cc; border-left: 1px solid #cc99cc; padding:15px 20px; background: url(http://media.newjobs.com/mm/redux/pageContainers/containerD/containerD.gif) left bottom no-repeat; }
    /* field controls basics */
         .ctl060_textField {border: 1px solid #b3b9c3; margin: 2px 0 0 16px; padding: 4px 0px 4px 4px; /*font-family: Arial; font-size: 11px; color: #5f5f5f;*/}
		 .ctl060_textField1 {border: 1px solid #b3b9c3; margin: 2px 0 0 6px; padding: 4px 0px 4px 4px; /*font-family: Arial; font-size: 11px; color: #5f5f5f;*/}
		 .ctl060_textField2 {border: 1px solid #b3b9c3; margin: 4px 2px 0 2px; padding: 2px 0px 2px 2px; /*font-family: Arial; font-size: 11px; color: #5f5f5f;*/}
         .ctl060_selectList {border: 1px solid #b3b9c3; margin: 2px 0 0 16px; padding: 2px 1px; /*font-family: Arial; font-size: 11px; color: #5f5f5f;*/}
		 .ctl060_selectList1 {border: 1px solid #b3b9c3; margin: 2px 0 0 6px; padding: 2px 1px; /*font-family: Arial; font-size: 11px; color: #5f5f5f;*/}
         .ctl060_checkBox {border: 1px solid #b3b9c3; margin: 0px; padding: 0; color: #2aac28; width:14px; height: 14px;}
         .ctl060_radioButton {border: none; margin: 0px; padding: 0; color: #2aac28; }
         .ctl060_options {padding: 0 0 0 5px;}
         .ctl060_textArea {border: 1px solid #b3b9c3; margin: 2px 0 0 16px; padding: 4px; font-family: Arial; font-size: 11px; color: #5f5f5f; width: 550px;}
         .ctl060_formFieldLabelWrapper {padding:0; margin:0 0 0 -4px;display:block;}
         .ctl060_formFieldLabel { float: left; margin:2px 0 0 0; /*font-weight: bold; color: #5f5f5f; */}
         .ctl060_formFieldLabelWrapper span{float: left;}
         .ctl060_formFieldSubLabel {display:inline; font-weight: normal; margin:2px 0px 0 16px; color: #5f5f5f; font-size: 11px;}
        /* field controls interactions */
        .ctl060_inFocus {border: 1px solid #889d5d; color: #5f5f5f;}
        .ctl060_prompt {border: 1px solid #889d5d; color: #9e9e9e;}
        .ctl060_asterisk {width: 14px; height: 11px; margin: 3px 3px 0 3px; padding: 0; background:transparent url(http://media.newjobs.com/mm/redux/ctl036/ctl036_form_icons_small.png) no-repeat 0px -28px; text-indent: -100em;}
        .ctl060_optionalSpan {width: 14px; height: 11px; margin: 3px 3px 0 3px; padding: 0; background:transparent url(http://media.newjobs.com/mm/redux/ctl036/ctl036_form_icons_small.png) no-repeat 0px 0px; text-indent: -100em;}
        .ctl060_anchorHelpIcon {width: 14px; height: 14px; margin: 0 3px 0 5px; padding: 0; background:transparent url(http://media.newjobs.com/mm/redux/ctl036/ctl036_form_icons_small.png) no-repeat 0px -42px; text-indent: -100em;float: left; cursor: pointer;}
        .ctl060_disabledField {background-color: #eeeef0; color: #606060;}
        .ctl060_charCounter {font-size: 10px; padding:0; margin:8px 0 0 16px; color: #9e9e9e;}
        /* custom label */
        .ctl060_labelInstruction {color: #8e6298; font-size: 11px; font-weight: normal; padding:0; margin:0;}
        .ctl060_hint {padding:0; margin:0 0 0 16px; font-size: 10px; color: #767676;}
        .ctl060_bottomLink {color: #8e6298; font-size: 11px; font-weight: normal; padding:0; margin:3px 0 0 16px;}
        .ctl060_bottomLink a {color: #8e6298; text-decoration: underline;}
        .ctl060_bottomLink a:hover {color: #8e6298; text-decoration: none;}
        .ctl060_radioWrapper {float:left; padding:0; margin: 6px 8px 0 16px; width:14px; height:14px;}
        .ctl060_radioLabelWrapper {float:left; padding:0; margin: 6px 0 0 0;}
        .ctl060_AOIRadio {font-weight: normal; display: block; padding:0; margin:0; font-size: 11px; color: #5f5f5f;}
        .ctl060_RadioButtonHorSpace {margin-right: 16px;}
        .ctl060_checkBoxWrapper {float:left; padding:0; margin: 4px 8px 0px 16px; width:14px; height:14px;}
        .ctl060_checkBoxLabelWrapper {float:left; padding:0; margin: 3px 0 0 0;}
        .ctl060_checkBoxLabel {display:inline; vertical-align: top; margin:0; padding:0;}
        .ctl060_AOICheckbox {font-weight: normal; display: block; padding:0; margin:3px 0 0 0; font-size: 11px; color: #5f5f5f; clear: left;}
         /* custom predefined properties */
        .ctl060_width55, input.ctl060_width55 {width: 55px;}
        .ctl060_width65, input.ctl060_width65 {width: 65px;}
		.ctl060_width100, input.ctl060_width100 {width: 100px;}
		.ctl060_width120, input.ctl060_width120 {width: 120px;}
		.ctl060_width135, input.ctl060_width135 {width: 135px;}
        .ctl060_width150, input.ctl060_width150 {width: 150px;}
        .ctl060_width160, input.ctl060_width160 {width: 160px;}
        .ctl060_width170, input.ctl060_width170 {width: 170px;}
        .ctl060_width175, input.ctl060_width175 {width: 175px;}
		.ctl060_width180, input.ctl060_width180 {width: 180px;}
		.ctl060_width270, input.ctl060_width270 {width: 270px;}
        .ctl060_width210, input.ctl060_width210 {width: 210px;}
		.ctl060_width330, input.ctl060_width330 {width: 330px;}
        .ctl060_width365, input.ctl060_width365 {width: 365px;}
        .ctl060_width685, input.ctl060_width685 {width: 685px;}
        .ctl060_width465, input.ctl060_width685 {width: 465px;}
        .ctl060_defaultWidth, input.ctl060_defaultWidth {width: 410px}
        .ctl060_defaultSelectWidth, input.ctl060_defaultSelectWidth {width: 343px}
        .ctl060_maxWidth, input.ctl060_maxWidth {width: 575px;}
        /* used for combination of fields when we need less space between the fields */
        .ctl060_RightMargin7 {margin-right:7px;}
         .ctl060_RightMargin4 {margin-right:4px;}
        .ctl060_RightMargin25 {margin-right:25px;}
        .ctl060_RightMargin10 {margin-right:10px;}
        .ctl060_LeftMargin4 {margin-left:4px;}
        .ctl060_LeftMargin8 {margin-left:8px;}
        .ctl060_LeftMargin5 {margin-left:5px;}
        .ctl060_LeftMargin0 {margin-left:0px;}
        .ctl060_BottomMargin7 {margin-bottom:7px;}
        .ctl060_BottomMargin16 {margin-bottom: 16px;}
        .ctl060_TopMargin8 {margin-top: 8px;}
        .ctl060_TopMargin5 {margin-top: 5px;}
        /* wrappers */ 
        .ctl060_formFieldWrapper.Column, .ctl060_innerformFieldWrapper.Column{float: left;}
        .ctl060_formFieldWrapper.Row, .ctl060_innerformFieldWrapper.Row{clear: left;}
        .ctl060_formFieldWrapper {margin:5px 0 15px 0; padding:0;}
        .ctl060_innerformFieldWrapper {margin:0; padding:0;}
   .ctl060_SectionHead {padding:0 0 1px 0; margin:0;}
   .ctl060_SubSectionHead {width: 713px; padding:0; margin:6px 0 0 0;}
  .ctl060_formSeparator713 {width: 713px; height: 2px; margin: 5px 0 0 0; padding:0; background: transparent url('http://media.newjobs.com/mm/redux/global/formSeparator713.png') no-repeat;}
    .ctl060_fieldSeparator {height: 1px; margin: 0 7px 12px 7px; padding:0; background: transparent url('http://media.newjobs.com/mm/redux/global/dotted_divider.gif') repeat-x;}
  .ctl060_form p {padding:0; margin:0 0 25px 0;}
  .ctl060_rightFloat {float:right; padding:0; margin:0;} 
  .ctl060_centerAlign {text-align:center;padding-right:70px;} 
  .ctl060_colorRed {color: #f36149;}
  .ctl060_formHint {color: #033333; font-size: 11px; font-weight: normal;}
  .ctl060_form {padding: 0; margin:0;}
  .ctl060_greyBackground {background-color:#f1f1f1; margin: 0 0 6px 0; padding: 6px 0 1px 2px;}
  .ctl060_noBackground { margin: 0; padding: 6px 0 0 0;}
.ctl060_captchaDiv {padding: 0 0 0 16px;}
.ctl060_captchaImg {padding: 12px 0 0 0;}
.ctl060_captchaImg img{width: 300px; height: 80px;}
.icnDelete{
    background:transparent url('http://media.newjobs.com/mm/redux/jobsearch/icons/icons6.png') no-repeat;
    background-position:0px -893px;
    height:13px;
    width:13px;
    display: inline-block;
    cursor: pointer;
}
.icnDelete:hover{
    background-position:0px -912px;
}
.icnDelete span {
	display: none;
}
            
/****** Forms Style Guide (Based on CTL 036) *****/
.formStyleGuide {position: relative;}
.formStyleGuide .clear {clear: both; overflow: hidden; height: 0; width: 0px; font-size: 0px; line-height: 0px;}
.formStyleGuide .hidden {display: none !important;}
.formStyleGuide .ctl060CheckBoxRow {padding-bottom: 8px; min-height: 15px; height: auto !important; height: 15px;}
.formStyleGuide .ctl060Row {padding-bottom: 20px; overflow: visible; min-height: 10px; height: auto !important; height: 10px;}
.formStyleGuide .ctl060RowLast {padding-bottom: 0px; overflow: visible; min-height: 10px; height: auto !important; height: 10px;}
.formStyleGuide .ctl060Row .ctl060Input, .formStyleGuide .ctl060RowLast .ctl060Input {padding-left: 18px;}
.formStyleGuide .ctl060Row .ctl060InputPlain {padding-left: 0px;}
.formStyleGuide .ctl060Row,
.formStyleGuide .ctl060RowLast {}
.formStyleGuide .ctl060Row .ctl060RowRight, .formStyleGuide .ctl060Row .ctl060RowLeft {float: left; width: 349px; overflow: visible;}
.formStyleGuide .ctl060RowLast .ctl060RowRight, .formStyleGuide .ctl060RowLast .ctl060RowLeft {float: left; width: 349px; overflow: visible;}
.formStyleGuide .ctl060Row .ctl060RowRight, .formStyleGuide .ctl060RowLast .ctl060RowRight {padding-left: 7px;}
.formStyleGuide .required, 
.formStyleGuide .ctl060ErrorIcon, 
.formStyleGuide .ctl060HelpIconLink, 
.formStyleGuide .ctl060HelpIcon {width: 15px; height: 15px; overflow: hidden; vertical-align: top;}
.formStyleGuide .required {display: block; position: absolute; top: 0px; left: 0px; color: #FF0000; font-size: 10px; font-weight: normal; text-align: right;}
.formStyleGuide .ctl060ErrorIcon {display: block; position: absolute; top: 0px; left: 0px; background: url(http://media.newjobs.com/mm/redux/ctl036/fsgIconSprite_errorHelp.png) no-repeat top left;}
.formStyleGuide .ctl060HelpIconLink {display: inline-block; background: url(http://media.newjobs.com/mm/redux/ctl036/fsgIconSprite_errorHelp.png) no-repeat bottom left; cursor: pointer;}
.formStyleGuide .ctl060EmptyIcon {padding-left: 18px;}
.formStyleGuide .ctl060CheckBox {float: left; margin-right: 3px;}
.formStyleGuide .ctl060CheckBox .ctl060Label {padding: 0px;}
.formStyleGuide .ctl060InputRadios {padding-left: 18px; line-height: 13px;}
.formStyleGuide .ctl060RowCheckboxes .required,
 .formStyleGuide .ctl060RowCheckboxes .ctl060ErrorIcon {position: static; float: left; margin-right: 3px;}
/* Fonts, Labels, Links, Etc */
.errorText {color: #ff0000 !Important; font-weight: bold !important;}
.formStyleGuide .ctl060Label {position: relative; font-weight: bold; color: #5f5f5f; font-size: 12px; padding-bottom: 2px; display: block; min-height: 15px; height: auto !important; height: 15px;}
.formStyleGuide .ctl060Label .ctl060PlainText {font-size: inherit; font-weight: normal;}
.formStyleGuide .ctl060Label .ctl060LabelText {position: relative; top: 0px; left: 18px;}
.formStyleGuide .ctl060EmptyIcon .ctl060Label .ctl060LabelText {left: 0;}
.formStyleGuide .ctl060Label .ctl060LabelText a {font-weight: normal;}
.formStyleGuide .ctl060PlainLabel {color: #000000; font-size: 11px;}
.formStyleGuide .ctl060InputRadios label {line-height: 13px; padding: 0 25px 0 8px;}
.formStyleGuide .ctl060InputSubText {}
.formStyleGuide .ctl060InputSubText div {padding-top: 5px;}
.formStyleGuide .ctl060InputSubText span {}
.formStyleGuide .ctl060InputSubText .ctl060DescError {color: #ff0000; font-size: 12px; display: none;}
.formStyleGuide .ctl060InputSubText .ctl060Hint,
.formStyleGuide .ctl060Hint {color: #9e9e9e; font-size: 10px;}
/* Form Fields */
.formStyleGuide .lrgTextField {width: 323px;}
.formStyleGuide .smTextField {width: 145px;}
.formStyleGuide .smTextField1 {width: 50px;}
.formStyleGuide .lrgSelectMenu {width: 329px;}
.formStyleGuide .lrgSelectMenu1 {width: 100px; margin: 2px 5px 0 0;}
.formStyleGuide .lrgSelectMenu2 {width: 160px; margin: 2px 5px 0 0;}
.formStyleGuide .smSelectMenu {width: 145px;}
.formStyleGuide .lrgTextarea {width: 677px;}
.formStyleGuide .medTextarea {width: 465px;}
.formStyleGuide .textInput {background-color: White; border: 1px solid #b3b9c3; color: #747474; font-family: Arial; font-size: 11px; padding: 3px;}
.formStyleGuide textarea {background-color: White; border: 1px solid #b3b9c3; color: #747474; font-family: Arial; font-size: 11px; padding: 3px;}
.formStyleGuide .ctl060CheckBox input {margin: 0px !important; padding: 0px !important; overflow: hidden; width: 14px; height: 14px;}
.formStyleGuide .selectMenu {background-color: White; border: 1px solid #b3b9c3; color: #5f5f5f; font-family: Verdana; font-size: 11px; font-weight: normal;}
.formStyleGuide .ctl060InputRadios input {margin: 0; padding: 0; height: 13px; width: 13px; overflow: hidden; vertical-align: middle;}
/* Interacting with the page container */
.formStyleGuide .ctl060Indent {padding-left: 5px !important; padding-right: 5px !important;}
.formStyleGuide .subColWrapper {clear: both; padding-top: 10px; margin: 0px; position: relative;}
.formStyleGuide .subColWrapper .subColLeft {width: 360px; float: left; position: relative;}
.formStyleGuide .subColWrapper .subColRight {width: 360px; float: left; position: relative;}
.formStyleGuide .nopaddingtopbottom { padding-top:0px; padding-bottom:0px;}
/* Buttons */
.ctl060Buttons {float: right; height: 21px;}
.formStyleGuide .ctl060Buttons .ctl060PrimaryButton, .formStyleGuide .ctl060Buttons .ctl060SecondaryButton {float: left; padding-left: 15px;}
.formStyleGuide .ctl060Buttons .ctl060SecondaryButton {line-height: 20px;}
/******* rewritted form error handling styles******/
/******* =.ctl036 ******/
.ctl036_ErrorMsg { border: 1px solid #dddfc8; background-color: #f5f5ed; font-size: 11px; color: #ff0000; font-weight: bold; margin: 10px 0 15px 0 ; position: relative;}
.ctl036_ErrorMsg .rctl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_rounded_corners.gif) 0px 0px no-repeat;}
.ctl036_ErrorMsg .rctr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_rounded_corners.gif) -4px 0px no-repeat;}
.ctl036_ErrorMsg .rcbl {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_rounded_corners.gif) 0px -4px no-repeat;}
.ctl036_ErrorMsg .rcbr {background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_rounded_corners.gif) -4px -4px no-repeat; }
.ctl036_ErrorMsg .ctl036_error_error_icon{width: 30px;height: 29px;left: -6px; top: -8px;position: absolute;z-index: 1;background:transparent url(http://media.newjobs.com/mm/redux/errors/ctl036_error_icon_big.png) no-repeat;}
.ctl036_ErrorMsg .ctl036_errorContent { padding: 13px 0px 9px 34px;}
.ctl036_ErrorMsg .ctl036_errorContent h4 {padding:0 0 5px 0; margin:0;}
.ctl036_ErrorMsg .ctl036_errorContent ul {padding:0; margin:0;}
.ctl036_ErrorMsg .ctl036_errorContent ul li { list-style-image:none !important; list-style-position:inside !important; list-style-type:none !important; padding: 0 0 4px 0; margin:0;}
.ctl036_AOIlabelError {color: #e8444f; margin: 3px 0 0 0;}
.ctl036_chckboxlabelIcon {color: #e8444f; margin:0 0px 0 -12px; float: left;}
.ctl036_chckboxlabelError {color: #e8444f;}
.ctl036_labelError {color: #e8444f; margin:2px 0px 0 0;}
.ctl036_iconError {width: 14px; height: 14px; margin: 2px 3px 0 3px; padding: 0; background:transparent url(http://media.newjobs.com/mm/redux/ctl036/ctl036_form_icons_small.png) no-repeat 0px -14px;text-indent: -100em;}
.ctl036_chckboxiconError {width: 14px; height: 14px; margin: 3px; padding: 0; background:transparent url(http://media.newjobs.com/mm/redux/ctl036/ctl036_form_icons_small.png) no-repeat 0px -14px;text-indent: -100em;}
.ctl036_errorDiv {/*color: #e8444f; font-size: 11px;*/ padding: 0; margin:2px 0 0 16px;}
.ctl036_chckBoxerrorDiv {color: #e8444f; font-size: 11px; padding: 0; margin:5px 0 0 0px;}
.ctl036_LeftMargin0 {margin-left:0px;}
/******* =.ctl036 End ******/
/****** CSS for the monsPopupPanel jquery plugin ******/
/* General Styles */
div.monsPopUpWrapper {position: relative;}
	div.monsPopUpWrapper .monsPopUpClose {position: absolute; top: 10px; right: 10px; background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_close.gif) no-repeat; z-index: 5;}
	div.monsPopUpWrapper .monsPopUpTop div, div.monsPopUpWrapper .monsPopUpBottom div {float: left;}
	div.monsPopUpWrapper .monsLeftSide {background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_Middle.png) repeat-y top left;}
	div.monsPopUpWrapper .monsRightSide {background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_Middle.png) repeat-y top right;}
	div.monsPopUpWrapper .monsPopUpMiddle {}
	div.monsPopUpWrapper .monsPopUpTLCorner {top: 0px; left: 0px; background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_TLCorner.png) no-repeat;}
	div.monsPopUpWrapper .monsPopUpTRCorner {top: 0px; right: 0px; background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_TRCorner.png) no-repeat;}
	div.monsPopUpWrapper .monsPopUpBLCorner {bottom: 0px; left: 0px; background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_BLCorner.png) no-repeat;}
	div.monsPopUpWrapper .monsPopUpBRCorner {bottom: 0px; right: 0px; background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_BRCorner.png) no-repeat;}
	div.monsPopUpWrapper .monsPopUpTop, div.monsPopUpWrapper .monsPopUpBottom {position: relative;}
	div.monsPopUpWrapper .monsPopUpTMiddle {background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_TMiddle.png) repeat-x;}
	div.monsPopUpWrapper .monsPopUpBMiddle {background: url(http://media.newjobs.com/mm/redux/global/popUps/monsPopupPanel_default_BMiddle.png) repeat-x;}
/****** Re-Usable Ads ******/	
.trackingTag {
    position: absolute;
    top: -2000px;
}
.ad728x90backgroundGray {width: 747px; height: 102px; padding: 12px 0 0 18px; margin: 0 auto; background: url(http://media.newjobs.com/mm/redux/reusedBoxes/ad728x90backgroundGray.gif) no-repeat;}
.ad300x250backgroundLine {width: 330px; height: 260px; padding: 10px 0 0 30px; background: url(http://media.newjobs.com/mm/redux/reusedBoxes/ad300x250backgroundLine.gif) no-repeat;}
.ad300x360backgroundLine {width: 341px; height: 370px; padding: 10px 0 0 0; }
.ad160x600backgroundGray {width: 170px; height: 640px; padding: 10px 0 0 10px; background: url(http://media.newjobs.com/mm/redux/reusedBoxes/ad160x600backgroundGray.gif) no-repeat;}
.confirmationColumnSpacer{height:10px;}
.ad300x250noborder {width: 300px; height: 250px;}
.ad120x240noborder {width: 120px; height: 240px;}
/* overiding globally set TD, TH padding so ads are centered in their container */
.ad160x600backgroundGray td, .ad160x600backgroundGray th {padding: 0;}
/****** Push-Down Ads ******/	
.wacCenterStage .pushdownAdDiv{
                margin-bottom:-3px !important;                                              /* Career Tools */
}
.pushdownHolder,
.pushdownAdDiv{
                font-size:0;         /* To correct IE7 from adding height to this empty div */
}
#mcWorkArea > .pushdownAdDiv > table,
#mcWorkArea > .pushdownAdDiv > div,                                               /* www20 */
.wacLeadStoryBlock .pushdownAdDiv > table,
.wacLeadStoryBlock .pushdownAdDiv > div,        /* jobsearch, Career Advice */
.wacCenterStage .pushdownAdDiv > table,
.wacCenterStage .pushdownAdDiv > div{                             /* Career Tools */
                display:table;
                padding:0 !important;
                /*margin-top:12px !important;*/  /* to do - remove these after full test RichS */
                /*margin-bottom: 0 !important;*/
                margin-bottom:10px !important;
}
/*
.wacLeadStoryBlock .pushdownHolder .pushdownAdDiv{
                margin-bottom:-7px !important;  /* to do - remove these after full test RichS */
}
*/
.wacLeadStoryBlock .pushdownHolder .pushdownAdDiv > table,              /* Communities and my.monster.com */
.wacLeadStoryBlock .pushdownHolder .pushdownAdDiv > div{                  /* Pages without search bar content */
                display:table;
                padding:0 !important;
               /* margin:36px auto 0 !important;*/ /* to do - remove these after full test RichS */
}
#errorPageLists {background:url(http://media.newjobs.com/mm/redux/errorPage/bg.png) no-repeat 10px bottom;  }
#errorPageLists .d-col { float:left;width: 180px;margin-right: 15px;margin-top: 40px; }
#errorPageLists .d-row {background: url(http://media.newjobs.com/mm/redux/errorPage/line.gif) 0px 65px no-repeat;  min-height:240px; width:100%; overflow: hidden; }
#errorPageLists ul { float:left; padding:0; margin: 0px; margin-top:22px; list-style:none; list-style-image:none;border: 0px solid red;}
#errorPageLists ul li { float:left;	width:150px; padding: 0px 0px 0px 14px; background:url(http://media.newjobs.com/mm/redux/errorPage/bullet.gif) no-repeat 0px 6px; list-style:none; list-style-image:none; margin: 4px 4px 4px 6px; }
.errorPageCanHeader,
.errorPageNonCanHeader { float: left; height: 21px; padding: 10px 0px 0px 12px; margin: 20px 1px 10px 0px; background: #dee4e9 url('http://media.newjobs.com/mm/redux/can/canHeaderBackground.gif') repeat-x 0 0; }
.errorPageCanHeader.col1 { width: 278px; }
.errorPageCanHeader.col2 { width: 232px; }
.errorPageCanHeader.col3 { width: 184px; }
.errorPageNonCanHeader.col1 { width: 50px; }
.errorPageNonCanHeader.col2 { width: 300px; }
.errorPageNonCanHeader.col3 { width: 210px; }
.errorPageNonCanHeader.col4 { width: 121px; }
.errorPageNonCanColumn.col1 { width: 50px; }
.errorPageNonCanColumn.col2 { width: 300px; }
.errorPageNonCanColumn.col3 { width: 210px; }
.errorPageNonCanColumn.col4 { width: 121px; }
.errorPageNonCanColumn a, 
.errorPageNonCanColumn .jobPlace { color: #3D6008; font-family: Tahoma; text-decoration: underline; }
/****** CSS for SocialBookmarkControl ******/	
/*******=#shareLayer ********/
#shareLayer {position:absolute; z-index: 999; display: none; font-size: 10px;}
#shareLayer .container {background-image: url(http://media.newjobs.com/id/content20/CORE/shareLayer_bg.png);}
#shareLayer .container, #shareLayer .container div {overflow: visible; min-height: 1px; height: auto !important; height: 1px; width: 141px;}
#shareLayer .container a {color: #856991 !important; position: relative; text-decoration: none !important; font-size: 10px !important;}
#shareLayer .container a:hover {color: #f68e1f !important; font-weight: bold; text-decoration: none !important;}
#shareLayer .container ul {display: block; margin: 0 0 0 18px !important; padding-top: 5px; width: 107px !important;}
#shareLayer .container ul li {list-style-type: none !important; list-style-position: outside !important; line-height: 15px; margin: 0 !important; padding: 3px 0 !important; background: url(http://media.newjobs.com/id/content20/CORE/share/shareLayerBorder.gif) repeat-x bottom left !important; padding: 3px 0;}
#shareLayer .container ul li.shareLI {padding-left: 0 !important;}
#shareLayer .container ul li img {margin-left: 0 !important; padding-left: 0 !important;}
#shareLayer .header {width: 141px; height: 32px; background: url(http://media.newjobs.com/id/content20/CORE/shareLayer_header.png) no-repeat; color: #af5c31; font-size: 11px; font-weight: bold; overflow: hidden; text-align: left;}
#shareLayer .header .sandbag {width: 20px; height: 15px; float: left;}
#shareLayer .header .messageDiv {width: 90px; line-height: 40px; float: left;}
#shareLayer .footer {width: 141px; height: 14px; background: url(http://media.newjobs.com/id/content20/CORE/shareLayer_bottom.png) no-repeat;}
#shareLayer a.fpwCloseImg {margin-top: 13px !important; padding-right: 13px !important;}
#shareLayer .footer .closer {z-index: auto;}
#shareLayer .messageDiv, #shareLayer .fpwCloseImg {position: relative;}
	#seocontainer{
		margin-left:10px;
		clear: both;
		float: none;
	}
	#seocontainer h4{
	margin-top: 8px;
	margin-bottom: 10px;
	}
	.double{
		float: left;
		width: 450px;
		/*font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;*/
		line-height: 20px;
	}
	.firstColumn
    {
        clear:left;    
    }
    .lastColumn{
        clear:both;
    }
    .hextupleColumn
    {
        float:left;
        width:156px;
    }
    .tripleColumn
    {
        float:left;
        width:306px;
    }
    .doubleColumn
    {
        float:left;
        width:456px;
    }
	.triple{
		float: left;
		width: 300px;
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		line-height: 20px;
	}
	.double a, .triple a, .hextuple a{
		/*color: #663399;*/
	}
	.hextuple{
		float: left;
		width: 150px;
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		padding: 3px;
	}
	#alphabet{
		font-size: 12px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		line-height: 40px;
		color: #000000;
	}
	#alphabet a{
		color: #663399;
	}
	#alphabet .selected{
		color: #999973;
		font-weight: bold;
	}
	#states_sm{
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		line-height: 16px;
		color: #000000;
		width:938px;
	}
	#states_sm a{
		color: #663399;
	}
	#states_sm .selected{
		color: #999973;
		font-weight: bold;
	}
	#hybidseo{
		font-size: 12px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		line-height: 40px;
		color: #000000;
	}
	#hybidseo a{
		color: #663399;
		background: #ffb381;
		padding: 5px;
		margin-right: 5px;
		border: 1px solid #ff6600;
	}
	#hybidseo a:hover{
		background: #ff6600;
	}
	#hybidseo .selected{
		color: #fff;
		background: #8d66b3;
		font-weight: bold;
		border: 1px solid #663399;
	}
	#multicolumns{
		clear: both;
		width: 943px;
	}
	#pop-ups #title{
		width: 943px;
		position: absolute;
		top: -205px;
		left: 10px;
		z-index: 100;
	}
	#pop-ups #states{
		width: 943px;
		position: absolute;
		left: 10px;
		top: -205px;
		z-index: 100;
	}
	#pop-ups #city{
		width: 943px;
		position: absolute;
		top: -205px;
		left: 10px;
		z-index: 100;
	}
	#pop-ups #category{
		width: 943px;
		position: absolute;
		top: -205px;
		left: 10px;
		z-index: 100;
	}
	#pop-ups #industry{
		width: 943px;
		position: absolute;
		top: -205px;
		left: 10px;
		z-index: 100;
	}
	#pop-ups #company{
		width: 943px;
		position: absolute;
		top: -205px;
		left: 10px;
		z-index: 100;
	}
	#pop-ups #country{
		width: 943px;
		position: absolute;
		top: -205px;
		left: 10px;
		z-index: 100;
	}
	.bubble_header{
		background: url(http://media.newjobs.com/id/njs/58/bubble-top1.gif) no-repeat bottom center;
		height: 8px;
		text-align: right;
		font-size: 10px;
		color: #fff;
	}
	.bubble_header_sub
    {
    position:relative;
    font-size:10px;
    text-align:right;
    min-height: 19px; 
    height: auto !important; 
    height: 19px;
    min-width: 100px;
    width:100px;
    width:auto ! Important;
    _bottom: -4px  /* IE 6 hack */
    }
    .bubble_header_sub_lt
    {
        min-width: 13px; width: auto !important; width: 13px;
        min-height: 19px; height: auto !important; height: 19px;
        float:right;
        background:transparent url(http://media.newjobs.com/id/njs/58/bubble-top_sub_lt.gif) no-repeat scroll 0 0;
    }
    .bubble_header_sub_rt
    {
        min-width: 13px; width: auto !important; width: 13px;
        min-height: 19px; height: auto !important; height: 19px;
        float:right;
        background:transparent url(http://media.newjobs.com/id/njs/58/bubble-top_sub_rt.gif) no-repeat scroll 0 0;
    }
    .bubble_header_sub_Mid
    {    
        min-width: 100px;  width: 100px;width: auto !important;
        min-height: 19px; height: auto !important; height: 19px;
        float:right;
        background:transparent url(http://media.newjobs.com/id/njs/58/bubble-top_sub_mid.gif) repeat-x scroll 0 0 !important;
    }
	.bubble_footer{
		background: url(http://media.newjobs.com/id/njs/58/bubble-bot.gif);
		height: 12px;
	}
	.bubble_main{
		background: url(http://media.newjobs.com/id/njs/58/bubble-bg.gif);
		width: 943px;
		height: 165px;
	}
	.bubble_main_container
	{
	    float:left;
	    overflow:auto;
	    width:937px;
	    height: 165px;
	    margin-right:6px;	
	 }
	.state_container{
		float: left;
		width: 150px;
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		padding: 3px 0px 3px 5px;
		white-space: nowrap;
	}
	.state_container a, .wide_container a, .exwide_container a, .exexwide_container a{
		color: #666;
	}
	.seoPanelColumn .listColumn
	{
		height:160px;
	}
	.fntA1 .wide_container
	{
		padding-top:0 !important;
		padding-bottom:0 !important;
	}
	.wide_container{
		float: left;
		width: 225px;
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		padding: 3px 0px 3px 5px;
		white-space: nowrap;
	}
	.wide_container_col3 {
        float:left;
        font-family:Verdana,Geneva,Arial,Helvetica,sans-serif;
        font-size:10px;
        padding:2px 5px 3px;
        width:296px;
        white-space: nowrap;
    }
	.exwide_container{
		float: left;
		width: 300px;
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		padding: 3px 5px 3px 5px;
		white-space: nowrap;
	}
	.exexwide_container{
		float: left;
		width: 430px;
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		padding: 3px 5px 3px 5px;
		white-space: nowrap;
	}
	#pop-ups{
		position:relative; 
		z-index:100;
	}
	.locco{
		margin: 2px 0px 2px 0px;
		clear: both;
		float: none;
	}
	.loclist{
		width: 933px;
		display: none;
		padding: 4px 0px 10px 10px;
	}
	.loctitle{
		width: 938px;
		background: #eee;
		padding-left: 5px;
		line-height: 22px;
		font-size: 10px;
		font-family: Verdana, Geneva, Arial, Helvetica, sans-serif;
		font-weight: bold;
		cursor:default;
	}
	.browseby{
		/*font-size:10px; */		
		padding-bottom:15px;
		/*color: #666666;*/
		padding-top: 15px;
	}
	.clearThis {
		clear:both;
	}
	.browseby a{
		/*color: #5E6436;
		text-decoration: underline;*/
	}	
	.browseby_short{
		/*font-size:10px; */		
		padding-bottom:5px;
		/*color: #666666;*/
		padding-top: 0px;
	}
	.browseby_short a{
        /*text-decoration: none;
        color: #666;*/
    }
	.inactive
	{
		text-decoration : none;
		cursor:text;
	}
	#statenav, #statenav ul {
	padding: 0;
	margin: 0;
	list-style: none;
	}
	#statenav a {
		display: block;
		width: 10em;
	}
	#statenav li {
		float: left;
		width: 10em;
	}
	#statenav li ul {
		position: absolute;
		width: 10em;
		left: -999em;
	}
	#statenav li:hover ul {
		left: auto;
	}
	#statenav li:hover ul, #statenav li.sfhover ul {
		left: auto;
	}
.BasicPersonalizationMsgBox_CloseBtn  {
    background: url("http://media.newjobs.com/mm/redux/hotjobs/flyout/x_popup.gif") no-repeat scroll 0 0 transparent;
    float: right; 
    top: -10px; 
    left: 5px; 
    position: relative;
    height: 14px;
    width: 14px;
    cursor: pointer;
}	
.BasicPersonalizationMsgBox_Div {
    background-color:#FEF9C1; 
    padding: 20px 15px; 
    display: none;
    width: 735px;
    min-height: 30px;
}
.BasicPersonalizationMsgBox_Bodydiv {
    position: relative;
    margin-right: 50px;
}
.PersonalizationMsgBoxForRedirectsOuter {
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.4);
    -moz-border: 4px 4px 4px 4px;
    display: none;
    position: absolute;
    top: 210px;
    left: 417px;
    z-index: 90;
}
.PersonalizationMsgBoxForRedirects_Body 
{
    margin: 5px;
    -moz-border: 4px 4px 4px 4px;
    background-color: #FFFFFF;
    border: 1px solid #C0C0C0;
    width: 413px;
    height: 167px;
}
.PersonalizationMsgBoxForRedirects_HeadingText {
    font: bold 22px Verdana;
    color: #653694;
    position: relative;
    margin-left: 23px;
    top: 15px;
}
.PersonalizationMsgBoxForRedirects_BodyText {
    font-family: Verdana;
    font-size: 12px;
    font-weight: normal;
    color: #666666;
    position: relative;
    margin-left: 25px;
    margin-right: 25px;
    top: 30px;
}
.PersonalizationMsgBoxForRedirects_CloseBtn {
    background: url("http://media.newjobs.com/mm/redux/globalIcons/xBlue-whiteBG.png") no-repeat scroll 0 0 transparent;
    float: right; 
    top: 2px; 
    left: -2px; 
    position: relative;
    height: 14px;
    width: 14px;
    cursor: pointer;
}
.PersonalizationMsgBoxForRedirects_DynamicIcon {
    position: relative;
    top: 2px;
}
.PersonalizationMsgBoxForRedirects_LinkText {
    font: 13px Arial,sans-serif;
    color: #78558D;
    position: relative;
    top: 50px;
    margin-left: 25px;
}
.PersonalizationMsgBoxForRedirects_LinkText a {
    color: #78558D;
    text-decoration: underline;
}
.PersonalizationMsgBoxForRedirects_LinkText a:hover {
    text-decoration: none;
    color: #78558D;
}
.lpfBackLinkingWidget .backLinkngItems {padding:8px 0px;border-bottom: 1px solid #EEEEEE;}
.lpfBackLinkingWidget .anchorBackLinkingTitle {padding-right:8px;}
.wdgContainer {/*padding-bottom:20px;*/}
.wdgHeader {background:none repeat scroll 0 0 #fff;/*height:32px;line-height:32px;padding-left:14px;*/}
.wdgHeader h1 {margin:0 !important;color:#444444;}
.wdgContainer .wdgBody {background:none repeat scroll 0 0 #FFFFFF;min-height:20px;height:auto!important;height:20px;/*padding:14px 14px 0;*/}
.lpfBackLinkingWidget .backLinkngLastItem {padding:8px 0px; padding-bottom:0px !Important;}
.wdgContainer .wdgFooter {text-align:left;padding-right:14px;padding-top:10px;}
/**  Answer Popular **/
#jqa_QuestionAnswerWdg .wdgHeader .fnt12{background-color:#EEEEEE; padding:14px; }
#jqa_QuestionAnswerWdg .wdgBody {background-color:#EEEEEE; padding:0 14px 14px 14px; margin-top:-16px;}
#jqa_QuestionAnswerWdg .jqaQuestionAnswerWdg td{padding:0px;}
/* BEGIN navigation styles */
.navWrapper {
    font: 13px Arial,sans-serif; /* this definition should be on body level*/
    position:relative;
    z-index: 800;
    padding: 0px 14px 0px 10px; /* added a reduced left padding to accomodate navigation items in FR & RU */
    height: 39px;
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x #EEE;
    background-position: 0px -822px;
    *zoom: 1;
}
.navWrapper ol, .navWrapper ul, .navWrapper ul li, .navWrapper ol li {
    list-style: none;
}
.navWrapper ul {
    margin: 0px;
}
.navWrapper ul.mainNav{
  /*  width: 551px;*/
}
.navWrapper ul.mainNav > li {
    float: left;
    padding: 4px 7px;
    margin: 8px 2px 8px 7px; 
    position: relative;
    z-index: 2; /* so that it's same like StaticNav */
}
.navWrapper ul.mainNav > li:first-child {
    margin: 8px 2px 8px -10px; /* added selector to reduce left margin on first elementto accomodate navigation items in FR & RU */
}
.navWrapper>div.cssFloatRight {
    position: absolute;
    right: 0px;
    margin-right: 14px;
}
.navWrapper ul.mainNav > li:hover ,
.navWrapper ul.mainNav > li.active ,
.navWrapper ul.mainNav > li.ddactive ,
.navWrapper ul.StaticNav > li:hover ,
.navWrapper ul.StaticNav > li.ddactive { 
    background-color: #563575;
}
div.cssFloatRight ul .StaticNav{
    list-style: none;
}
.navWrapper ul.mainNav > li.active > span > a ,
.navWrapper ul.mainNav > li.ddactive > span > a 
{
    text-decoration: none;
}
.navWrapper ul.mainNav > li div.subnav {
    position: absolute;
    display: none;
    left: -9px;
    top: 24px;
    z-index: 1000;
}
.navWrapper ul.mainNav > li:hover div.subnav {
    display: block;
}
.navWrapper ul.mainNav > li div.navArrow,
.navWrapper ul.StaticNav > li div.navArrow {
    position: absolute;
    display: none;
    right: -14px;
    top: 0px;
    width: 14px;
    height: 24px;
    cursor: pointer;
    z-index: 1000;
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    background-position: -137px 0px;
}
.navWrapper ul.mainNav > li:hover div.navArrow {
    display: block; /*we need 0 empty space between b/c of hover preservation*/
}
.navWrapper .subnav ,
.navWrapper .footerCountrySelector .scrollAreaTranspWrap {
    padding: 5px;
    /*background-image: url("http://media.newjobs.com/mm/redux/www30/sprites/bgdDDtransp1x500.png");*/
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30width1px_img.axd');
    background-repeat: repeat-x;
    background-position: 0px 0px;
}
.navWrapper .subnavContent {
    padding: 6px;
    background-color: #fff;
    width: 538px; /*width is needed - 538px*/
    position: relative;
}
.navWrapper .subnavContent a.subnavClose {
    position: absolute;
    right: 6px;
    top: 6px;
    display: none;
    cursor: pointer;
    width: 17px;
    height: 17px;
    text-indent: -9999px;
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    background-position: -120px 0px;
}
.navWrapper .subnav li a {
    display: block; /* so that links are active on entire line (esp. right StaticNav) */
}
.navWrapper .subnavRight li a {
    display: inline; /* entire line active links not possible everywhere */
}
.navWrapper .subnav li a.ext
{
    padding-right: 14px;
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    background-position: right 0px;
}
.navWrapper .subnavLeft {
    float: left;
    width: 166px;
    padding: 4px 15px 0px 7px;
    overflow: hidden;
    background-color: #fff;
}
.navWrapper .subnavLeft li {
    border-top: 1px solid #eeeeee;
    padding: 6px 0 7px;
}
.navWrapper .subnavLeft li:first-child {
    border: 0;
    margin-top: 0;
    padding-top: 0;
}
.navWrapper .subnavRight {
    float: left;
    width: 322px;
    padding: 10px 14px;
    overflow: hidden;
    background-color: #f7f1fb;
}
.navWrapper .subnavRight ul {
    list-style: none outside none;
}
.navWrapper .subnavRight h3 {
    margin-top: 14px;
}
.navWrapper .subnavRight li {
    padding: 0px 0 0px 8px;
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    background-position: 0px -1142px;
    zoom: 1; /* IE7 disappearing bullet fix */
    margin-top: 3px;
}
.navWrapper .subnavRight li:first-child {
    margin-top: 0px;
}
.navWrapper .subnavRight .hSeparator {
    height: 1px;
    background-color: #fff;
    margin: 11px 0 14px;
    margin-left: -14px;
    width: 400px;
}
.navWrapper .subnavBottom {
    float: left;
    padding: 10px 14px;
    overflow: hidden;
    background-color: #f7f1fb;
    margin-top:7px;
    width:510px;    
}
.navWrapper ul.StaticNav {
    position: relative; /* IE7 fix - after employeractive class was added by JS, content was shifting */
    z-index: 2; /* needed with the above so that dropdown doesn't go under */
}
.navWrapper ul.StaticNav > li {
    float: left;
    padding: 6px 7px 4px;
    margin: 8px 0 7px 8px;
    position: relative;
    z-index: 2; /* must be higher than .employeractive */
}
.navWrapper ul.StaticNav > li.navItemsJoint {
    margin-left: 0;
    margin-right: 0;
    padding: 6px 0 4px;
}
.navWrapper ul.StaticNav > li.navItemsJoint + li {
    margin-left: 0px; /* need remove left margin on joint's next sibling rather than set the negative margin on joint (Webkit breaks StaticNav when a single-letter joint with neg. margin is used (e.g. on ITIT)) */
}
.navWrapper ul.StaticNav > li.navItemsJoint:hover {
    background: none;
}
.navWrapper ul.StaticNav > li div.subnav {
    position: absolute;
    right: -14px;
    display: none;
    top: 24px; /*we need 0 empty space between b/c of robust hover preservation - 24px for IE*/
    z-index: 1000;
}
.navWrapper ul.StaticNav > li:hover div.subnav {
    display: block;
}
.navWrapper ul.StaticNav > li.ddactive > a {
    text-decoration: none;
}
.navWrapper ul.StaticNav > li.employeractive {
    background-color: #FEF9C2 !important; /* !important so that we don't lose emp. hightlight on hover when standard :hover bgcolor is overrideen by channelized css*/
    z-index: 1; /* so that navArrow doesn't go under li.employeractive bg*/
}
.navWrapper ul.StaticNav > li.employeractive a {
    color: #0D51AB;
}
.navWrapper ul.StaticNav > li div.navArrow {
    border-right: 1px solid #72469b; /* to clear Employers highlight */
}
.navWrapper ul.StaticNav > li:hover div.navArrow {
    display: block;
}
.navWrapper ul.StaticNav .subnavContent {
    width: 143px; /*override for static nav - 143px*/
    padding: 10px 14px 5px;
}
.navWrapper ul.StaticNav .subnavContent a.subnavClose {
    right: 0px;
    top: 0px;
}
.navWrapper ul.StaticNav .subnav li {
    border-top: 1px solid #eeeeee;
    padding: 6px 0 7px;
}
.navWrapper ul.StaticNav .subnav li:first-child {
    border: 0;
    margin-top: 0;
    padding-top: 0;
}
/* extraTopNav shared styles (but now only C1) */
/*.navWrapper .extraTopNavWrapper {}*/
.navWrapper ul.extraTopNav {
    height: 24px; /* IE7 fix */
}
.navWrapper ul.extraTopNav > li {
    float: left;
    margin: 6px 0px 7px 0;
    padding: 0px 12px 1px;
}
/* skinny header styles */
/* to support channles skinny logo the logo should be changed to sprite image */
.navWrapper ul.logoTiny {
    display: block;
    float: left;
    padding:0 8px 8px 14px;
    margin:0 8px 0 -14px;
    cursor: pointer;
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x #674488;
    background-position: 0px -728px;
}
.navWrapper ul.logoTiny li {
    margin:7px 2px 0 0;
    padding-right:20px;
}
.navWrapper ul.logoTiny li span {
    border-color:#fff transparent transparent;
    border-style:solid;
    border-width:4px;
    display: inline-block;
    float: none;
    margin: 0;
    position: absolute;
    right: 4px;
    top: 10px;
    width: 0;
}
.navWrapper ul.logoTiny li.logo {
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat;
    background-position: -260px 0px;
    width: 123px;
    height: 20px;
    margin:8px 5px 0 0;
    padding:0;
}
.navWrapper ul.logoTiny.ruru li.logo{
    background: url(http://media.newjobs.com/mm/redux/sprites/logos/ruru_143x38.png) no-repeat 0 0;
    height:31px;
    margin-top:0;
    width:148px;
}
.navWrapper ul.logoTiny.nldu li.logo{
    background: url(http://media.newjobs.com/mm/redux/sprites/logos/nldu_143x38.png) no-repeat 0 0;
    height:31px;
    margin-top:0;
    width:148px;
}
.skinnyHdrLinksRight > ul > li {display: none;}
.skinnyHdrLinksRight > ul > li.security {display:inline;}
.skinnyHdrLinksLeft {}
.searchBoxWrapperS {
    top: -1200px;
    margin-bottom: -76px;
}
/* END navigation styles */
.intLocation {display: none;}
.searchBoxWrapper, #mcFooter {font: 13px Arial,sans-serif;} /* this definition should be on body level*/
.footerSearchBox .searchButton,
.searchBoxWrapper .searchButton {
   background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat;
   background-position: 0px 0px;
   width: 39px;
   height: 34px;
   text-indent: -1000px;
   overflow: hidden;
   /*margin-top: -1px;*/
   float: left;
   display: inline-block;
   *display: inline;
   *zoom:1;
}
.footerSearchBox .searchButton:hover,
.searchBoxWrapper .searchButton:hover {
   background-position: -78px 0px;
}
.footerSearchBox .searchButton:active,
.searchBoxWrapper .searchButton:active {
   background-position: -39px 0px;
}
.searchBoxWrapper #mainPws {position:absolute;}
.searchBoxWrapper #mainLuc {position:absolute;}
.searchBoxWrapper .b1 {float: left; width: 220px; }
.searchBoxWrapper .b1 input {width: 195px; margin-bottom: 3px; }
.searchBoxWrapper .b2 {float: left;}
.searchBoxWrapper .b2 input {width: 195px;}
.searchBoxWrapper .b3 {float: left; width:186px;}
.searchBoxWrapper .b3 input {width: 170px; margin-bottom: 3px; }
.footerSearchBox .b1 {float: left; width: 251px; }
.footerSearchBox .b1 input {width: 225px; margin-bottom: 3px;}
.footerSearchBox .b2 {float: left;}
.footerSearchBox .b2 input {width: 225px;}
.footerSearchBox .b3 {float: left; width:233px;}
.footerSearchBox .b3 input {width: 220px; margin-bottom: 3px;}
.searchBoxWrapper #mainLuc .b1 {float: left; width:431px;}
.searchBoxWrapper #mainLuc .b1 input {width: 415px;}
.searchBoxWrapper #mainLuc .b1.int {float: left; width:231px;}
.searchBoxWrapper #mainLuc .b1.int input {width: 215px;}
.searchBoxWrapper #mainLuc .b3.int {width: 386px;} 
.footerSearchBox #mainLucF .b1 {float: left; width:400px;}
.footerSearchBox #mainLucF .b1 input {width: 388px;}
.footerSearchBox #mainLucF .b3  {width: 321px;} 
.footerSearchBox #mainLucF .b3 input {width: 308px;}
.footerSearchBox #mainLucF .b3.int input { width: 148px;} 
.footerSearchBox #mainLucF .b3.int select { width: 151px;} 
.intLocation {width: 100%;} 
.footerSearchBox .intLocation select {width: 193px;margin-top: 2px; margin-right: 9px;}
.searchBoxWrapper .intLocation select {width: 193px;margin-top: 4px;}
.searchBoxWrapper .b4 {
    float: right; 
    margin-right: 14px;
    width: 154px;
}
.searchBoxWrapper .b5 {
    float: left;
    width: 100px;
    overflow: hidden;
    margin-left: 14px;
}
.searchBoxWrapper .b5 a { white-space: nowrap;}
.footerSearchBox .b4 {
    float: left; 
    margin-left: 14px;
}
.footerSearchBox .b5 {
    float: left;
    width: 100px;
    overflow: hidden;
    margin-left: 14px;
}
.footerSearchBox .b5 a { white-space: nowrap;}
.searchBoxWrapper .logoTiny {display: none; padding-left: 110px; cursor: pointer;}
.mainWrapper>p {margin: 20px;}
#mainWrapper .searchBox {
    width: 100%;
}
#mainWrapper .searchBoxFieldsBgd {
    float: left;
    padding: 14px 0 0 0;
    width: 100%;
	display: inline;
}
#mainWrapper #mcFooter .searchBoxFieldsBgd  {
    margin-left: 63px;
    text-align: left;
    width: auto;
}
.searchBoxFieldsBgd .inLabel {
    display: inline;
    text-align: center;
    padding: 4px 0 11px;
    margin: 6px 0px 0px 0px; width: 26px; 
    float: left; 
    overflow: hidden;
}
.footerSearchBox .inLabel {
    display: inline;
    text-align: center;
    padding: 4px 0 11px;
    margin: 3px 0px 0px 0px; width: 32px; 
    float: left; 
    overflow: hidden;
}
#mainWrapper .searchBoxFieldsBgd input {
    border: 1px solid #c3c3c3;
    padding: 7px;
    height: 18px;
    cursor: text;
}
#mainWrapper .searchButtonWrapper {
    text-align: center;
}
#mainWrapper .searchButtonWrapper > div {
    *zoom: 1;  /* IE7 fix */
    *padding-bottom: 8px; /* IE7 fix */
}
.browseJobs ol, .browseJobs ul, .browseJobs ul li, .browseJobs ol li {list-style: none;}
#mainWrapper .browseJobs {
    width: 966px;
    height: 290px;
    padding: 10px 14px 0;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    top:76px;
    display: none;
}
#mainWrapper .browseJobs .cols{
    width: 313px; 
    padding: 0;
    margin-left: 13px;
    background-color: #fff;
    float: left;
    text-align: center;
}
#mainWrapper .browseJobs .cols:first-child{margin-left: 0;}
#mainWrapper .browseJobs .cols > div.fnt9:first-child {margin-bottom: 0;} /* override fnt9 margin to protect fixed height for the future */
#mainWrapper .browseJobs .scrollArea {
    height: 224px;
    overflow: auto;
    margin-top: 9px;
}
#mainWrapper .browseJobs .cols ul{
    padding: 7px 14px;
    background-color: #f7f1fb;
    text-align: left;
    margin: 0;
}
#mainWrapper .browseJobs .cols li {
    border-top: 1px solid #ebe2f2;
    padding: 7px 0 7px 0;
}
#mainWrapper .browseJobs .cols li:first-child {
    border-top: 0;
}
#mainWrapper .browseJobs .cols li a {
    display: block; /* usability: to have entire line as active link */
}
#mainWrapper .browseJobs .yellowBgd {
    background-color: #ffffcc;
    padding: 8px 14px;
    text-align: center;
    margin: 7px 0 0 0;
}
#mainWrapper .browseJobs .yellowBgd a {
    font-weight: bold;
}
#mainWrapper .browseJobs .closeBtn {
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    background-position: -151px 0px;
    width: 25px;
    height: 25px;
    text-indent: -30000px;
    position: absolute;
    top: 7px;
    right: 7px;
    z-index: 3;
    cursor: pointer;
}
#mainWrapper .contentWrapper {
    padding: 14px 14px;
    background-color: #fff;
}
#mainWrapper .contentLeftArea {
    float:left;
    width: 630px; /* to prevent contentRightArea ads from being pushed under when incompatible content blocks are inserted to contentLeftArea through CMS */
}
#mainWrapper .contentRightArea {float:left;}
#mainWrapper .doormatWrapper {
    background-color: #fff;
    padding-bottom: 14px;
    margin-bottom: 3px;
}
#mainWrapper .doormatBgd {
    background-color: #EEE;
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30height1px_img.axd'); /* using Faux Columns to make all doormats go to the bottom */
    background-repeat: repeat-y;
    background-position: 0px 0px;
}
#mainWrapper .doormat {
    float: left;
    width: 203px;
    padding: 11px 14px; 
    margin: 0 0 0 14px;
}
#mainWrapper .doormat dt {margin-bottom: 7px;}
#mainWrapper .doormat ul {
    list-style: none outside none;
    margin: 2px 0 0;
    padding: 0;
}
#mainWrapper .doormat li{
    padding: 0px 0 2px 8px;
    /*background: url("http://media.newjobs.com/mm/redux/www30/sprites/bulletTransp4x11.png") no-repeat 0px 0px;*/
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    background-position: 0px -1142px;
    zoom: 1; /* IE7 fix - bullets were disappearing e.g. on FIFN */
}
#mainWrapper .footerWrapper {
    padding: 0 14px 14px;
    background-color: #673695;
    min-height: 320px;
    text-align: center;
}
#mainWrapper .footerSearchBox {
    background-color: #4d2870;
    text-align: center;
    padding: 11px 0 11px;
    display: inline-block;
    position: relative;
    width: 100%; /* FF and IE8 bgcolor extension */
    *zoom: 1; /* IE7 fix */
    *display: inline; /* IE7 fix */
}
#mainWrapper .footerSearchBox .footerSearchField {display: inline;}
/*#mainWrapper .footerSearchBox #footPws {}*/
#mainWrapper .footerSearchBox input[type='text'] {
    border: 1px solid #c3c3c3;
    padding: 4px 5px;
}
#mainWrapper .footerSearchBox .footerSearchSwitch {float: left;}
#mainWrapper .footerSearchBox .footerSearchTips {display: inline;}
#mainWrapper .footerMessages {
    margin-top: 16px;
    line-height: 18px;
}
#mainWrapper .bottomNav li {
    display: inline;
    padding: 0 7px 0 7px;
    border-left: 1px solid #835ba7;
}
#mainWrapper .bottomNav li:first-child {
    padding: 0 7px 0 0px;
    border-left: 0px solid #835ba7;
}       
#mainWrapper .searchBoxWrapper {
    position: relative;
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x #674488;
    background-position: 0px -728px;
    height: 76px;
    padding: 0px;
    z-index: 50; /* IE7 fix for dropdown navigation - position: relative was causing Dropdown to go under, so adding a lower z-index */
}
#mainWrapper .searchBoxWrapper .monsterLogo  { 
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat;
    background-position: -117px 0px;
    width: 143px;
    height: 38px;
    float: left;
    margin: 0 14px;
}
#mainWrapper .searchBoxWrapper .searchBoxFieldsBgd .ruru  { 
    background: url("http://media.newjobs.com/mm/redux/sprites/logos/ruru_143x38.png") no-repeat;
}
#mainWrapper .searchBoxWrapper .searchBoxFieldsBgd .nldu  { 
    background: url("http://media.newjobs.com/mm/redux/sprites/logos/nldu_143x38.png") no-repeat;
}
#mainWrapper .searchBoxWrapper .searchBoxFieldsBgd .plpo  { 
    background: url("http://media.newjobs.com/mm/redux/sprites/logos/plpo_143x38.png") no-repeat;
}
#mainWrapper .searchBoxWrapper .searchBoxFieldsBgd .trtr  { 
    background: url("http://media.newjobs.com/mm/redux/sprites/logos/trtr_143x38.png") no-repeat;
}
#mainWrapper .searchBoxWrapper .searchBoxFieldsBgd .czcz  { 
    background: url("http://media.newjobs.com/mm/redux/sprites/logos/czcz_143x38.png") no-repeat;
}
#mainWrapper .searchBoxWrapper .searchBoxFieldsBgd .sksk  { 
    background: url("http://media.newjobs.com/mm/redux/sprites/logos/sksk_143x38.png") no-repeat;
}
#mainWrapper .searchBoxWrapper .monsterLogo  a { 
   width: 143px;
   height: 38px;
   display: block;
   overflow: hidden;
   text-indent: -1000px;
}
#mainWrapper .locationsBlock {
    width: 250px;
    text-align: right;
}
#doormat
{
    font: 13px Arial,sans-serif; /* this definition should be on body level*/
}
#doormat {
    width: 966px; 
    position: relative;
    padding-top: 14px;
}
#doormat ol, #doormat ul, #doormat ul li, #doormat ol li
{
	list-style: none;
}
.wacDoormat{
    zoom: 1;
    margin-bottom: -7px;
    margin-left: -3px;
}
.wacDoormat  .mcFooterBanner{
    padding-top: 14px;
    text-align: center;
}
.wacCenterStage .mcFooterBanner{
    text-align: center;
}
#doormat .dmInner {
    background:#dddddd;
    padding:7px;
    position: relative;
    top: 40px;
    *top: 35px; /* IE7 fix */
    margin-bottom: 30px;
}
#doormat .dmTabs {
    margin: 0 0 0 13px;
    padding: 0;
    position: absolute;
    float: left;
    /*width: 100%;*/
}   
#doormat .dmTabs li {
    cursor: pointer;
    background-color: #EEE;
    border-right: 1px solid #EEE;    
    display: inline-block;
    *display: inline; /* IE7 fix */
    *zoom: 1; /* IE7 fix */
    margin: 0px 7px 0px 0px;
    padding: 13px 4px 13px 4px;
    *padding-top: 8px; /* IE7 fix */
    float: left;
    width:  173px;
    height: 14px;
    text-align:center;   
}
#doormat .dmTabs li.active {
    border-right:  1px solid #bbbbbb;
    background-color: #bbbbbb;
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
    background-repeat: no-repeat;
    background-position: 0px -262px;
}
#doormat .dmTabsContent {
    z-index: 10;
    background: #fff;
    padding: 10px 20px 35px 20px;
    text-align: left;
    border-top: 1px solid #cccccc;
}
#doormat .dmTabsContent>div {
    display: none;
    max-height: 486px;
    overflow: hidden;
}
/* BEGIN modules/content components styles */
/** Modules **/
.module1 {
   margin-bottom: 32px;   
}
.module1 .plcholder2, 
.module1 .plcholder3 {
  margin: 0 0 0 14px;
  float: left;
  width: 196px; 
}
.module1 .plcholder1 {
  margin: 0;   
  float: left;
  width: 196px; 
}
.module2 {
   margin-bottom: 35px;    
}
.module2 h2 {
   margin-bottom: 7px;
}
.module2 .componentHolder {
   background-color: #EEE;
   padding: 14px;
   margin: 14px 14px 0;
}
.module2 .componentHolder:first-child {
   margin-top: 0;
}
.module2 .componentHolder h2 {
   margin-top: -3px;
   *margin-top: 0px; /* IE7 fix */
   margin-bottom: 14px;
}
.module3 {
   margin-bottom: 35px; 
}
.module3 h2 {
   margin-top: -4px;
   *margin-top: 0px; /* IE7 fix */
   margin-bottom: 7px;
}
.moduleWrapper45 {
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30height1px_img.axd');
   background-repeat: repeat-y;
   background-position: -994px 0px;
}
.moduleWrapper45 h2, 
.moduleWrapper45 .component4C6 > div:first-child { /*4C6 has div instead of h1 or h2...*/
   margin-top: -4px;
   *margin-top: 0px; /* IE7 fix */
   margin-bottom: 7px;
}
.moduleWrapper45 .fnt5 {
   margin-bottom: 6px;
}
.module5 {
   margin-left: 14px;
}
/** contentRightArea on homepage **/
.rrModule1, 
.rrModule2 {
   margin: 14px 0 0 0;
}
.rrDivider {
   width: 336px; /* IE7 fix */
   height: 1px;
   background-color: #eee;
   margin: 21px 0;
}
/** doormat modules for all instances of doormat NOT on homepage **/
.dmTabsContent .module1, 
.dmTabsContent .module2 {
   float: left;
}
.dmTabsContent .module1>div, 
.dmTabsContent .module2>div {
   width: 442px;
   padding-right: 14px;
}
/** 3C1, 3C2, 3C3 **/
.component3C1, 
.component3C2, 
.component3C3 {
   width:196px;
   padding: 0;
   margin: 0;
}
.component3C1 .img180x135wrapper, 
.component3C2 .img180x135wrapper, 
.component3C3 .img180x135wrapper {
   padding: 0 8px 11px 8px;  
}
.component3C1 > p.fnt4 {
   /*margin-top: -6px;*/
}
.component3C1 h2 {
   padding-bottom: 2px;
} 
.component3C2 ul.fnt4 {
   /*margin-top: -2px;*/
   padding-bottom: 7px;   
}
.component3C2 li {
   padding: 0px 0 1px 8px;
   /*background: url("http://media.newjobs.com/mm/redux/www30/sprites/bulletTransp4x11.png") no-repeat 0px 0px;*/
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
.component3C2 > p.fnt5 {
   margin-bottom: 0;
}
.component3C3 > div {
   text-align: center;
}
.component3C3 .selectField {
   width: 188px;
   display: block;
   margin: 3px 4px 8px;
}
.component3C3 label,
.component3C3 .textInput,
.component3C3 .Btn3C3 {
   display: inline-block; /* inline block needed for UKEN and Scotland lonely button whose bg would otherwise be cut in IE7 */
   *display: inline; /* IE7 fix */
   *zoom: 1;  /* IE7 fix */
}
.component3C3 label,
.component3C3 .textInput {
   *position: relative;  /* IE7 fix */
   *top: -1px; /* IE7 fix */
}
.component3C3 label {
   padding-bottom: 3px;
}
.component3C3 .textInput {
   width: 65px;
   padding: 4px 2px;
   border: 1px solid #ccc;
   margin: 0px 10px 0 6px;
}
.component3C3 .Btn3C3 a { /* can't change the component markup anymore so copying-over button styles */
   border-right:  1px solid #bbb;
   background-color: #eee;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   margin: 0px 0px 0px 0px;
   padding: 5px 8px 5px 8px;
   background-position: 0px -90px;
   display: inline-block;
   *display: inline;
   *zoom: 1;
   height: 16px; /* Safari on Mac fix */
}
.component3C3 .Btn3C3 a:active,
.component3C3 .Btn3C3 a:focus { /* can't change the component markup anymore so copying-over button styles */
   background-position: 0px -116px;
}
.component3C3 .Btn3C3 a:hover {
   text-decoration: none !important; /* can't change the component markup anymore so hardcoding underlining removal and color */
   color: #893cd1;
}
/** 4C1, 4C2, 4C3, 4C4, 4C5, 4C6 **/
.component4C1, 
.component4C2, 
.component4C3, 
.component4C4, 
.component4C5, 
.component4C6 {
   width:266px;
}
.componentHolder .component4C1, 
.componentHolder .component4C3, 
.componentHolder .component4C4, 
.componentHolder .component4C5 { /*4C2 and 4C6 can be in module5 only*/
   width:238px;
}
.component4C1 .img92x69wrapper, 
.component4C2 .img92x69wrapper {
   float: left;
   margin: 0 9px 0 0;
}
.component4C1 .img92x69wrapper {
   margin-top: -3px;
}
.component4C1 > div.fnt5,
.component4C5 > div.fnt5 {
   margin-top: -6px;
   margin-bottom: 8px;
}
.component4C2 .img92x69wrapper {
   padding-top: 3px;
}
.component4C2 ul {
   padding-bottom: 7px;   
}
.component4C2 li {
   padding: 0px 0 1px 8px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
.component4C3 > div.fnt4 {
   /*margin-top: -7px;*/
}
.component4C3 > div.cssMarginTop15 {
   margin-top: 11px;
}
.component4C3 .glbBtn {
   *position: relative;  /* IE7 fix */
   /**top: -4px;*/ /* IE7 fix - not needed with above*/
}
.component4C4 > ul.fnt4 {
   /*margin-top: -7px;*/
}
.component4C4 > div.fnt5 {
   margin-top: -1px;
   margin-bottom: -3px;
}
.component4C4 ul{
   padding-bottom: 7px;   
}
.component4C4 li{
   padding: 0px 0 2px 8px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
.component4C5 > div.fnt4 {
   /*margin-top: -7px;*/
}
.component4C5 > div.fnt5.cssMarginTop15 {
   margin-top: 8px;
   margin-bottom: -3px;
   //margin-bottom: 0px; /* IE fix */
}
.component4C6 > div.fnt4 {
   /*margin-top: -4px;*/
   /**margin-top: 0px;*/ /* IE7 fix */
}
.component4C6 .imgSocial_iconsLg {
   padding: 11px 0;
}
.component4C5 .imgSocial_iconsLg li,
.component4C6 .imgSocial_iconsLg li {
   display: inline;
   padding-left: 18px;
}
.component4C6 .imgSocial_iconsLg li:first-child {
   padding-left: 0;
}
.component4C5 .imgSocial_icons {
   padding-top: 10px;
}
.component4C6 .imgSocial_icons {
   padding: 0;
}
.component4C5 .imgSocial_icons li,
.component4C6 .imgSocial_icons li{
   display: inline;
   padding: 0 0 0 10px;
}
.component4C6 .imgSocial_icons li:first-child {
   padding: 0;
}
/** 5C1, 5C2, 53, 5C4 **/
.component5C1, 
.component5C2, 
.component5C3, 
.component5C4 {
   width:336px;
}
.module4 .component5C1, 
.module4 .component5C2 {
   width: 322px;
   padding-right: 14px;
}
.component5C1 .img120x90wrapper, 
.component5C2 .img120x90wrapper {
   float: left;
   margin: 3px 14px 0 0;
}
.component5C2 ul {
   padding-bottom: 3px;
   width: 188px;   
}
.component5C2 li {
   padding: 0px 0 2px 8px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
.component5C3 > h2:first-child {
   margin-bottom: 6px; /* adding margin bottom because fnt classes have no margins */
}
.component5C3 ul{
}
.component5C3 li{
   border-bottom: 1px solid #eee;
   padding: 8px 0 8px 0;
}
.component5C4 .scrollContent > div.clearfix {
   margin-top: 11px;
}
.component5C4 .scrollContent > div.clearfix:first-child {
   margin-top: 0px;
}
.component5C4 .scrollContent {
   overflow: auto;
   height: 260px;
}
.component5C4 .img92x69wrapper {
   float: left;
   margin: 0 8px 0 0;
}
.component5C4 .scrollContent > div.clearfix > div.img92x69wrapper {
   margin-top: 3px; 
}
.component5C4 .scrollContent > div.clearfix > div.fnt4,
.component5C4 ul {
   /*margin-top: -7px; */
}
.component5C4 ul {
   padding-bottom: 3px;   
}
.component5C4 li {
   padding: 0px 0 2px 8px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
/** 7C1, 7C2, 7C3 **/
.component7C1,
.component7C2,
.component7C3
{
   width: 476px;
}
.component7C1 {
   margin-bottom: 20px;
}
.component7C1 h1, .component7C2 h1, .component7C3 h1,
.component7C1 h2, .component7C2 h2, .component7C3 h2 {
   margin-top: 1px;
   padding: 0px;
}
.component7C1 .img120x90wrapper {
   float: left;
   margin: 3px 14px 0 0;
}
.component7C1 ul,
.component7C3 ul {
   width: 442px;   
   margin: 0px;
   padding: 3px 3px 10px 3px;
}
.component7C1 li,
.component7C3 li {
   padding: 0px 0px 0px 8px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
.component7C3 ul {
   width: 214px;
   float: left;
}
.component7C2 dl, 
.component7C2 dt, 
.component7C2 dd{
   margin: 0px; 
   padding: 0px;
}
.component7C2 dl {
   margin-top: -6px
}
.component7C2 dt {
   margin-top: 14px;
}
.component7C2 dd {
   margin-top: 1px;
}
/** 9C1, 9C2, 9C3 **/
.component9C1,
.component9C2,
.component9C3 {
   width:616px;
}
.component9C1 .scrollAreaWrap  {
   padding-top: 3px;
   overflow: auto; /* for horiz. scrollbar */
}
.component9C1 .scrollArea {
   background-color: #EEE;
   padding: 0 0px 5px 7px;
   /*height: 142px;*/ /* commented out to allow texts on 2 lines without needing a vert. scrollbar ("zivotopisy a motivacn� dopisy" on CZCZ is under charlimit 30 and needs this) */
   overflow: auto;
}
.component9C1 .scrollArea > div {
   width: 128px; /* limit item width to break long texts and prevent breaking and appearance of vert. scrollbar */
   padding: 0 3px; /* so that texts don't touch */
}
.component9C1 .img120x90wrapper {
   width:120px;
   height: 90px;
   margin: 14px auto 10px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px 0px;
}
.component9C2 .img180x135wrapper,
.component9C3 .img180x135wrapper {
   float: left;
   margin: 3px 14px 0 0;
   width: 180px;
}
.component9C2 .textwrapper,
.component9C3 .textwrapper {
   float: left;
   width:414px;
}
.component9C2 .textwrapper div.fnt4 {
   margin-top: -6px;
}
.component9C2 ul{
   padding: 19px 0 7px 0;   
}
.component9C2 li{
   padding: 0px 0 2px 8px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
.component9C3 ul {
   padding-bottom: 6px;   
}
.component9C3 li {
   padding: 0px 0 2px 8px;
   background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
   background-repeat: no-repeat;
   background-position: 0px -1142px;
   zoom: 1; /* IE7 disappearing bullet fix */
}
/** DC1, DC2, DC3 **/
.componentDC1 ul,
.componentDC2 ul,
.componentDC3 ul {
   margin: 0px; 
   padding: 0px;
   margin-bottom: -4px;    
}
.componentDC1 h3,
.componentDC2 h3,
.componentDC3 h3 {
   margin: 0;
   padding:0;
   margin-bottom: 7px;
}
.componentDC1,
.componentDC2,
.componentDC3 {
   margin: 0;
   padding: 0;
}
.componentDC3 #navCarAdvSearch .navCarAdvSearchBox {
   width: 197px; /* for FRFR's "RECHERCHER" button we need 197 in FF/IE + negative margin for button in IE7 */
   border: 1px solid #C3C3C3;
   padding: 4px 6px 4px;
   margin-right: 3px;
   vertical-align: top;
}
.componentDC3 a.glbBtn {
   color: #673695; /* can't change the component markup anymore so hardcoding here; .fnt4 is overriding .fnt8 setting down the line */
   display: inline-block; /* so that it's not too high */ /* expansion to 27px height caused by this is fixed */
   *margin-left: -9px; /* IE7 fix */
}
.componentDC3 #navCarAdvSearch {
   height: 26px;
   overflow: hidden;
}
.componentDC3 a.glbBtn:hover {
   color: #893CD1; /* can't change the component markup anymore so hardcoding here; .fnt4 is overriding .fnt8 setting down the line */
}
/** 3C-4, 3C-5 **/
.component3C-4,
.component3C-5
{
   background:#EEE;
   padding:14px;
   line-height:18px;
   margin:0 0 14px;
}
.component3C-4 h3,
.component3C-5 h3
{
   margin:0 0 10px;
}
.component3C-4 hr
{
   margin:0 -2px 12px;
   height:0;
   clear:both;
   padding:0;
   color:#d3d3d3;
   background:#d3d3d3;
   border:1px solid #d3d3d3;
   border-width:1px 0 0 0;
}
.component3C-4 .iconLink
{
   margin-bottom:4px;
}
.component3C-4 .iconLink img
{
   display:inline-block;
   float:left;
}
.component3C-4 .dollarSign img
{
   margin-left:5px;
}
.component3C-4 .iconLink a
{
   display:block;
   margin-left:21px;
}
.component3C-5 .imageContainer
{
   text-align:center;
   margin:0 0 10px;
}
/* END modules/content components styles */
/**** Course Widget ****/
.CMISkillContent .course,
.CMICourseContent .course
{
    padding: 10px 0;
    border-bottom: 1px solid #CBCBCB;
}
.CMISkillContent .course.last,
.CMICourseContent .course.last
{
    border-bottom: none;
}
.CMISkillContent .course:hover,
.CMICourseContent .course:hover
{
    background-color: #EEE;
}
.CMISkillContent .SectionHeader,
.CMICourseContent .SectionHeader
{
    color: #333333;
    font-size: 13px;
    font-weight: bold;
}
/**** END Course Widget ****/
/**** Skill Chart Widget ****/
.CMISkillContent .CMISkillChart .CMIInnerContainer
{
    width:100%;
    position:relative;
    white-space:nowrap;
    margin-top:12px;
}
.CMISkillContent .CMISkillChart .body
{
    width:100%;
    position:relative;
}
.CMISkillContent .CMISkillChart .body a.skill
{
    background-color:#deed99;
    height:20px;
    margin-bottom:7px;
    text-align:left;
    display:block;
    text-decoration:none;
}
.CMISkillContent .CMISkillChart .body a.skill:hover
{
    background-color:#eef6cd;
    text-decoration:none;
}
.CMISkillContent .CMISkillChart .body a.skill:hover span
{
    text-decoration:underline;
}
.CMISkillContent .CMISkillChart .footer
{
    width:100%;
    margin:0;
}
.CMISkillContent .CMISkillChart .footer td
{
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_width1px_img.axd) repeat-x; 
    background-position: 0px -804px;
    border:0 none;
    padding:0;
    *padding-top:1px;
}
.CMISkillContent .CMISkillChart .footer td.left div
{
    float:left;
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
    background-position: 0px -104px;
    width: 8px;
    height: 8px;
}
.CMISkillContent .CMISkillChart .footer td.middle
{
    text-align:center;
}
.CMISkillContent .CMISkillChart .footer td.middle span#axisLabel
{
    background-color: #fff;
    padding: 0 7px;
}
.CMISkillContent .CMISkillChart .footer td.right div
{
    float:right;
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
    background-position: -8px -104px;
    width: 8px;
    height: 8px;
}
.CMISkillContent .CMISkillChart .bodybg 
{
    position:absolute;
    margin:0;
    width:100%;
}
.CMISkillContent .CMISkillChart .bodybg td
{
    border:0 none;
    border-left:1px solid #ccc;
    padding:0;
    width:10%;
}
.CMISkillContent .CMISkillChart .bodybg td.last
{
    border-right:1px solid #ccc;
}
/**** END Skill Chart Widget ****/
.toolTip {
    background-image: url("http://img-seeker.newjobs.com/mons/v3.4.7.5331d/global_main30width1px_img.axd");
    background-position: 0 0;
    background-repeat: repeat;
    padding: 5px !important;
    position: absolute;
    z-index: 100;
}
.toolTipContent .spinner {
   background: url("http://media.newjobs.com/mm/redux/ajax/loading.gif") no-repeat scroll center center transparent;
   height: 100%;
   width: 100%;
   position: absolute;
   top: 0px;
   left: 0px;
   z-index: 125;
}
.toolTipContent {	
    padding: 6px !important;
	background-color: #fff;
	min-width: 100px; 
    min-height: 100px; 
	position: relative;
}
 a.toolTipClose  {
	position: absolute;
	right: 6px;
	top: 6px;
	display: none;
	cursor: pointer;
	width: 17px;
	height: 17px;
	text-indent: -9999px;
    outline: none;
	background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main30_img.axd');
	background-repeat: no-repeat;
	background-position: -120px 0px;
}
.toolTipContent .tryAgain{
	line-height: 100px;
	margin: 0px 30px;
}
.toolTipBottomButtonBar
{
	 text-align: right;
	 padding: 0px 0 10px;
	 clear:both;
	 margin-top: 10px;
	 border-color: #CCCCCC;
	 border-style:none none solid;
	 border-width:0 0 1px;
	 margin-bottom: 10px;
}
.stdModal
{
	background:#999;
	background:rgba(0, 0, 0, 0.4);
	display:none;
    padding: 5px;
	z-index:11;
}
.stdModal .smHeader
{
	background:#614080;
	padding:6px 14px;
	position:relative;
}
.stdModal .smHeader .smClose
{
	background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/js20_new_img.axd);
	width: 17px; height: 17px; background-position: -93px 0px;
	cursor:pointer;
	display:inline-block;
	position:absolute;
	top:7px;
	right:7px;
}
.stdModal .smNoTitle
{
	background:#ffffff;
	padding:0;
}
.stdModal .smNoTitle .smClose
{
	top:0;
	right:0;
}
.stdModal .smContent
{
	background:#fff;
	padding:10px 14px;
	zoom:1;
}
#stdModalOverlay
{
	width:100%;
	height:100%;
	position:fixed;
	background:#FFF;
	top:0;
	left:0;
	z-index:10;
	display:none;
	opacity:0;															/* Most Browsers */
	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";	/* IE8 - MUST BE FIRST */
	filter: alpha(opacity=0);											/* IE7 - MUST BE SECOND */
}
/* Moves header positioning to correctly show modal */
.moveHeaderZindex
{
	position:relative;
	z-index:0;
}
/* validation */
.validation-summary-valid
{
	display: none;
}
.validation-summary-errors
{
	color: #ff0000;
	background: #ffe3e3;
	padding: 10px 14px;
	font-weight: 700;
	margin-bottom: 21px;
	border: 1px solid #c7c7c7;
}
.validation-summary-errors ul li
{
	list-style: disc !important;
}
.label-validation-error
{
	background: #e20000;
	font-weight: 700;
	color: #fff!important;
	float: left;
	margin-bottom: 0;
	padding: 2px 5px;
}
.label-validation-error a
{
    color: #fff !important;
    text-decoration: underline;
}
.input-validation-error
{
    background: #fff!important;	
}
.field-validation-error
{
    color: #ff0000;
    font-size: 11px;
}
 #socialBookmarkModal 
   {
     position: absolute;
     z-index: 1000;
     top: 27px;
     left: -240px;
     width: 285px;
   }
    #socialBookmarkModal .SocialBookmarkRow
   {
       border-bottom: 1px solid #eee;
   }
    #socialBookmarkModal .SocialBookmarkIcn
   {
      float: left;
      width: 120px;  
      height: 32px; 
      margin: 7px;
   }
   #socialBookmarkModal .socialIcns
   {
      width: 24px;  
      height: 24px;
      display: block;
      float: left;
      padding: 5px 0 0 0px;
      text-indent: 31px;
   }
    #socialBookmarkModal .monster-facebook-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: 0px 0px;
      width: 120px;  
      height: 32px; 
      display: block;
      float: left;
      padding: 5px 0 0 0px;
      text-indent: -3000em;
   }
    #socialBookmarkModal .monster-twitter-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: -120px 0px;
      width: 120px;  
      height: 32px; 
      display: block;
      float: left;
      padding: 5px 0 0 0px;
      text-indent: -3000em;
   }
    #socialBookmarkModal .monster-stumbleupon-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: -240px 0px;
   }
    #socialBookmarkModal .monster-delicious-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: -264px 0px;
   }
    #socialBookmarkModal .monster-digg-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: -288px 0px;
   }
    #socialBookmarkModal .monster-technorati-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: -312px 0px;
   }
    #socialBookmarkModal .monster-reddit-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: -336px 0px;
   }
    #socialBookmarkModal .monster-myspace-icn
   {
      background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
      background-repeat: no-repeat;
      background-position: -360px 0px;
   }
#socialBookmarkModal .monster-googlebookmarks-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -456px 0px;
}  
#socialBookmarkModal .monster-yahoobuzz-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -792px 0px;
}
#socialBookmarkModal .monster-live-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -576px 0px;
}
#socialBookmarkModal .monster-linkedin-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -552px 0px;
}
#socialBookmarkModal .monster-viadeo-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -720px 0px;
}
#socialBookmarkModal .monster-wikio-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -768px 0px;
}
#socialBookmarkModal .monster-webnews-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -744px 0px;
}
#socialBookmarkModal .monster-misterwong-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -600px 0px;
}
#socialBookmarkModal .monster-yigg-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -816px 0px;
}
#socialBookmarkModal .monster-studivz-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -696px 0px;
}
#socialBookmarkModal .monster-ekudos-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -384px 0px;
}
#socialBookmarkModal .monster-hyves-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -480px 0px;
}
#socialBookmarkModal .monster-msnreporternl-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -624px 0px;
}
#socialBookmarkModal .monster-nujij-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -672px 0px;
}
#socialBookmarkModal .monster-newsvine-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -648px 0px;
}
#socialBookmarkModal .monster-fark-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -408px 0px;
}
#socialBookmarkModal .monster-kwoff-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -528px 0px;
}
#socialBookmarkModal .monster-googlebuzz-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -432px 0px;
}
#socialBookmarkModal .monster-iwiw-icn
{
    background-image: url('http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_socialnetworkicns_img.axd');
    background-repeat: no-repeat;
    background-position: -504px 0px;
}
/**** css for chat app ****/
.imgTalkToEmployer 
{
       background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat; 
       background-position: -16px -104px;
       width: 180px;
       height: 135px;
}
.chatMonsterLogo
{
    background: url(http://img-seeker.newjobs.com/promo-usen/v3.7.2.2888/global_main_img.axd) no-repeat;
   background-position: -260px 0px;
   width: 123px;
   height: 20px;
   float: left;
}
.mstModal .mmHeader
{
	background:#614080;
}
.mstModal.mmShaded .mmContent
{
	background-color: #F7F1FB;
}
