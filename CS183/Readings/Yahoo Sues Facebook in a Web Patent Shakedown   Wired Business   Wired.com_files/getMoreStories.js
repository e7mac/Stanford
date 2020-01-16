function getMoreStories() {
    jQuery('#progressbar').show();
    updateOffsetToAlightHeight();
    var wp_posts_offset = jQuery('#column-1 .post').length;
    var wp_posts_num_posts = 5 + WP_POSTS_OFFSET;
    var agg_news_offset = jQuery('#column-2 .agg-news').length;
    var agg_news_num_posts = 5 + AGG_NEWS_OFFSET;
    var wp_posts_ids = getPostIds(jQuery('#column-1').children());
    var agg_news_ids = getPostIds(jQuery('#column-2').children());

    jQuery.post( get_more_stories.ajaxurl,
        {
            'action' : 'get_more_stories',
            'wp_posts_numposts' : wp_posts_num_posts,
            'wp_posts_offset' : wp_posts_offset,
            'wp_posts_ids' : wp_posts_ids,
            'agg_news_numposts' : agg_news_num_posts,
            'agg_news_offset' : agg_news_offset,
            'agg_news_ids' : agg_news_ids
        },
        function(data){
            // Returns PHP Array currently, run something in ContentAPIController::getMoreStories() to format the data properly
            // jQuery("#column-1").html('<pre>' + data + '</pre>');
            var stories = jQuery.parseJSON(data);
            var wp_stories = stories['wp'];
            var agg_stories = stories['agg_news'];
            var total_wp_posts_displayed = stories['total_wp_posts_displayed'];
            var archive_url = stories['archive_url'];
            if (wp_stories !== "") {
                jQuery('#column-1').append(wp_stories);
            }
            if (agg_stories !== "") {
                jQuery('#column-2').append( agg_stories);
            }
            jQuery('#progressbar').hide();
            //We want to display the archive pages after 5 clicks (5 stories are displayed per click)
            if (total_wp_posts_displayed >= 25) {
                jQuery('#getMoreStories').remove();
                jQuery('#content-tiles').append('<div id="getMoreStories"><a href="' + archive_url + '">View entire archive</a></div>')

            }
         }
    );
}

function updateOffsetToAlightHeight() {
    var wp_posts_col_height = jQuery('#column-1').height();
    var agg_news_col_height = jQuery('#column-2').height();
    var wp_posts_count = jQuery('#column-1 .post').length;
    var agg_news_count = jQuery('#column-2 .agg-news').length;

    var h_wp_post = wp_posts_col_height/wp_posts_count;
    var h_agg_news = agg_news_col_height/agg_news_count-2;

    if(wp_posts_col_height > agg_news_col_height) {
        AGG_NEWS_OFFSET = (wp_posts_col_height - agg_news_col_height) / h_agg_news;
        WP_POSTS_OFFSET = 0;
    } else {
        WP_POSTS_OFFSET = (agg_news_col_height - wp_posts_col_height) / h_wp_post;
        AGG_NEWS_OFFSET = 0;
    }

}

function getPostIds(posts) {
    var postIds = "";
    for (var i = 0; i < posts.length; i++) {
        var postId = jQuery(posts[i]).attr("id");
        if (postId != undefined) {
            postIds +=  postId + ",";
        }
    }
    return postIds.substring(0, postIds.length-1);
}