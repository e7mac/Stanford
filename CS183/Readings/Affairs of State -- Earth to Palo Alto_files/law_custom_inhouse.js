function returnChecked(element) {
	for(xx = 0; xx < element.length; xx++) {
		if(element[xx].checked){return(element[xx].value);}
		else{return("undefined");}
		}
	return true;
	}

function returnCheckedString(element) {
	tempArray = new Array();
	for(xx = 0; xx < element.length; xx++) {
		if(element[xx].checked){tempArray[tempArray.length] = element[xx].value;}
		}
	return(tempArray.join(","));
	}

function submitForm(formType) {
	if(formType == 1) {
		layer_realForm.trueForm.lsrchtype.value="product";
		layer_realForm.trueForm.lqry.value = layer_keyword1.storeSearch.keyword.value;
		 layer_realForm.trueForm.action="http://store.law.com/search_results.asp";
		}
	if(formType == 2) {
		layer_realForm.trueForm.lsrchtype.value="site";
		layer_realForm.trueForm.lqry.value = layer_keyword2.siteSearch.keyword.value;
		}
	layer_realForm.trueForm.submit();
	}

function displayDate() {
	today = new Date();
	month = today.getMonth();
	if (month == 0)
		smon = "January";
	else if (month == 1)
		smon = "February";
	else if (month == 2)
		smon = "March";
	else if (month == 3)
		smon = "April";
	else if (month == 4)
		smon = "May";
	else if (month == 5)
		smon = "June";
	else if (month == 6)
		smon = "July";
	else if (month == 7)
		smon = "August";
	else if (month == 8)
		smon = "September";
	else if (month == 9)
		smon = "October";
	else if (month == 10)
		smon = "November";
	else if (month == 11)
		smon = "December";

	return (smon + " " + today.getDate() + ", " + today.getFullYear());
}


function rldictionary(word)
        {
           var rlditionary = window.open('http://dictionary.law.com/default2.asp?typed='+word,'_blank');

        }
