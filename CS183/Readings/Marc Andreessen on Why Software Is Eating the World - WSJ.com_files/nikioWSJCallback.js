function nikioWSJCallback(state) { 
    if(state == "DATA_RENDERED") {
            dojo.style("wordnikArticle", "visibility", "visible");

            var a = dojo.query("._nikio-glossary a");

            for(var i=0; i<5; i++){
                var lHref =  unescape(a.at(i).attr("href"));

lHref = lHref.replace(/ /g, "+") +"?link=WSJ_article_glossary";

a.at(i).attr("href", lHref);

            }
    }
}

