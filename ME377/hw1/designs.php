<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Proposal Designers</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="style.css" rel="stylesheet" type="text/css">
</head>

<body>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td width="50%">&nbsp;</td>
    <td width="766" valign="top" style="background-color:#FFFFFF; ">
			<table width="766" border="0" cellspacing="0" cellpadding="0">
			  <tr>
				<td valign="top"><img src="images/left.gif" alt=""></td>
				<td valign="top">
						<table width="604" border="0" cellspacing="0" cellpadding="0">
						  <tr>
							<td valign="top"><img src="images/top.gif" alt=""></td>
						  </tr>
						  <tr>
							<td valign="top" height="544">
										<table width="604" border="0" cellspacing="0" cellpadding="0">
										  <tr>
											<td valign="top" width="184"><a href="index.htm"><img src="images/name.png" alt=""></a>
														<table width="184" border="0" cellspacing="0" cellpadding="0">
														  <tr>
															<td valign="top"><img src="images/about.gif" alt=""></td>
														  </tr>
														  <tr>
															<td valign="top" class="about" width="184">
															<div style="padding-left:10px; padding-top:5px;"><img src="images/ph1.jpg" alt="" align="left"><div class="text1"><div class="text2">Linda Smith</div>"When I started the treasure hunt on top of the Eiffel Tower, I never suspected..."</div><br style="clear:both;">
																														<div class="more"><img src="images/pointer.gif" alt="" align="middle">&nbsp;&nbsp;<a href="#">read more</a></div>
																														<img src="images/line.gif" alt="" hspace="7" vspace="20"><br />
															<img src="images/ph2.jpg" alt="" align="left"><div class="text1"><div class="text2">Alan Smith</div>"Sitting in USA, I could plan out something as elaborate as a personal..."</div><br style="clear:both;">
																													
																														<div class="more"><img src="images/pointer.gif" alt="" align="middle">&nbsp;&nbsp;<a href="#">read more</a></div>
															</div>
															</td>
														  </tr>
														  <tr>
															<td valign="top"><img src="images/about_bottom.gif" alt=""></td>
														  </tr>
														</table>

											</td>
											<td valign="top">
														<table width="0" border="0" cellspacing="0" cellpadding="0">
														  <tr>
															<td valign="top"><img src="images/ph3.jpg" alt=""></td>
															<td valign="top"><img src="images/m1.gif" alt=""><br />
																			<a href="#"><img src="images/m2.gif" alt=""></a><br />
																			<a href="#"><img src="images/m3.gif" alt=""></a><br />
																			<a href="#"><img src="images/m4.gif" alt=""></a><br />
																			<a href="#"><img src="images/m5.gif" alt=""></a><br />
																			<a href="#"><img src="images/m6.gif" alt=""></a><br />
																			<img src="images/m7.gif" alt=""><div id="content"><div class="inner_copy"><a href="http://www.site2you.com/">Website Builder</a> <a href="http://www.freetemplatesonline.com/">fto</a> <a href="http://www.websitetemplates.org/">websitetemplates.org</a> <a href="http://www.webdesign.org/website-design">Website Design</a></div></div></td>
														  </tr>
														</table>
																	<table width="420" border="0" cellspacing="0" cellpadding="0">
																									  <tr>
																										<td valign="top"><img src="images/story.gif" alt=""></td>
																									  </tr>
																									  <tr>
																										
<?php 
$job=$_GET["job"];
$adv=$_GET["adv"];
$trv=$_GET["trv"];
$for=$_GET["for"];

if ($for=="No" || ($adv=="No" && $trv=="No")) {echo "
<td valign=\"top\" class=\"story\"><img src=\"dinner.jpg\" alt=\"\" align=\"left\" hspace=\"20\">
																																																																																																							<div class=\"text3\"><div class=\"text2\">Traditional Way</div>Do the classic movie, dinner and propose. Treat her like a queen. Sweep her off her feet. Make dinner for her. Get her flowers.The works!</div>
																																																																																																							<br style=\"clear:both; \" />																					
																																																																																																							
																																																																																																	";
$place="Palo Alto";	}																																																																																					
																																																																																																	
else if ($adv=="Yes" && $trv=="Yes") {echo "
																																																																																																							<td valign=\"top\" class=\"story\"><img src=\"barrier.jpg\" alt=\"\" align=\"left\" hspace=\"20\">
																																																																																																																																<div class=\"text3\"><div class=\"text2\">Propose while Scuba Diving in Australia!</div>We suggest that you both plan a trip to Australia and scuba dive among the barrier reef. While you are \"treasure hunting\" there will be some clues that we will help you plant and she can stumble across the ring underwater where you will ask here (or show her a board).</div>
																																																																																																																																<br style=\"clear:both; \" />";
$place="Australia";	}

else if ($trv=="Yes" && $adv=="No") {echo "																																																																																																																																																										<td valign=\"top\" class=\"story\"><img src=\"italy.jpg\" alt=\"\" align=\"left\" hspace=\"20\">
																																																																																																																																																										<div class=\"text3\"><div class=\"text2\">Propose on the Italian Riviera</div>We suggest that you both plan a trip to Italy and after a romantically overdriven week, propose at sunset the day before you leave.</div>
																																																																																																																																																										<br style=\"clear:both; \" />
";
$place="Italy";	}																																																																																																																																																																											else if ($adv=="Yes" && $trv=="No") {echo "
																																																																																																																																																																																																														<td valign=\"top\" class=\"story\"><img src=\"tahoe.jpg\" alt=\"\" align=\"left\" hspace=\"20\">
																																																																																																																																																																																																														<div class=\"text3\"><div class=\"text2\">Propose after a ski in Lake Tahoe</div>Take her skiing on Lake Tahoe and after an exhilarating trip on the slopes, ask her to spend the rest of her life with you.</div>
																																																																																																																																																																																																														<br style=\"clear:both; \" />																				
";
$place="Lake Tahoe";	}









																																
																										
																										
																										
echo "																										
																										<div class=\"text4\">Start planning below</div>
																										<div class=\"more\"><img src=\"images/pointer.gif\" alt=\"\" align=\"middle\">&nbsp;&nbsp;<a href=\"plan.php?place=$place \">plan -></a></div><br />";
?>																										<img src="images/gallery.gif" alt=""><br />
																										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"><img src="images/1.gif" alt="" vspace="7" hspace="5"></a><img src="images/2.jpg" alt="" vspace="7" hspace="5"><img src="images/3.jpg" alt="" vspace="7" hspace="5"><img src="images/4.jpg" alt="" vspace="7" hspace="5"><a href="#"><img src="images/5.gif" alt="" vspace="7" hspace="5"></a></td>
																									  </tr>
																								
																								</table>

																							
											</td>
										  </tr>
										</table>
							</td>
						  </tr>
						  <tr>
							<td valign="top" height="27" class="copy">Copyright &copy; 2011 Momentify |  <a href="#">Privacy Policy</a>&nbsp;&nbsp;&nbsp;<a href="http://www.webdesign.org" class="fto1">Web Design</a> by <a href="http://www.freetemplatesonline.com" class="fto1">Free Templates</a> Online</td>
						  </tr>
						  <tr>
						  	<td valign="top"><img src="images/bottom.gif" alt=""></td>
						  </tr>
						</table>
				</td>
				<td valign="top"><img src="images/right.gif" alt=""></td>
			  </tr>
			</table>
	</td>
    <td width="50%">&nbsp;</td>
  </tr>
</table>

</body>
</html>
