function AddToFavorites()  
{  
    var title = document.title; var url = location.href;  
    if (window.sidebar) // Firefox  
        window.sidebar.addPanel(title, url, '');  
    else if(window.opera && window.print) // Opera  
    {  
        var elem = document.createElement('a');  
        elem.setAttribute('href',url);  
        elem.setAttribute('title',title);  
        elem.setAttribute('rel','sidebar'); // required to work in opera 7+  
        elem.click();  
    }   
    else if(document.all) // IE  
        window.external.AddFavorite(url, title);  
}