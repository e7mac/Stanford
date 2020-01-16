/*jslint evil:true */
/**
 * Dynamic thread loader
 *
 * 
 *  * 
 * 
 * 
*/

// 
var DISQUS;
if (!DISQUS || typeof DISQUS == 'function') {
    throw "DISQUS object is not initialized";
}
// 

// json_data and default_json django template variables will close
// and re-open javascript comment tags

(function () {
    var jsonData, cookieMessages, session, key;

    /* */ jsonData = {"reactions": [], "reactions_limit": 10, "ordered_highlighted": [], "posts": {"163464595": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "Nope. I went. Its real and actually very interesting. ", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2011-03-10_09:21:59", "date": "1 year ago", "message": "<p>Nope. I went. Its real and actually very interesting. </p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "openid-66044", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}, "144670044": {"edited": false, "author_is_moderator": false, "from_request_user": false, "up_voted": false, "can_edit": false, "ip": "", "last_modified_date": null, "dislikes": 0, "raw_message": "Did you check your sources? A search of \"storynet\" on darpa.mil came up empty, and there is the civilian National Storytelling Network at storynet.org. Plus, doesn't the description sound more like a Freshman syllabus?", "has_replies": false, "vote": false, "votable": true, "last_modified_by": null, "real_date": "2011-02-11_06:17:41", "date": "1 year ago", "message": "<p>Did you check your sources? A search of \"storynet\" on <a href=\"http://darpa.mil\" rel=\"nofollow\">darpa.mil</a> came up empty, and there is the civilian National Storytelling Network at <a href=\"http://storynet.org\" rel=\"nofollow\">storynet.org</a>. Plus, doesn't the description sound more like a Freshman syllabus?</p>", "approved": true, "is_last_child": false, "author_is_founder": false, "can_reply": true, "likes": 0, "user_voted": null, "num_replies": 0, "down_voted": false, "is_first_child": false, "has_been_anonymized": false, "highlighted": false, "parent_post_id": null, "depth": 0, "points": 0, "user_key": "facebook-530881696", "author_is_creator": false, "email": "", "killed": false, "is_realtime": false}}, "ordered_posts": [144670044, 163464595], "realtime_enabled": false, "ready": true, "mediaembed": [], "has_more_reactions": false, "realtime_paused": true, "integration": {"receiver_url": "", "hide_user_votes": false, "reply_position": true, "disqus_logo": false}, "highlighted": {}, "reactions_start": 0, "media_url": "http://mediacdn.disqus.com/1339189988", "users": {"openid-66044": {"username": "openid-66044", "tumblr": "", "about": "", "display_name": "Gnome", "url": "http://disqus.com/openid-66044/", "registered": true, "remote_id": "http://www.google.com/profiles/gnomeisland", "linkedin": "", "blog": "http://www.google.com/profiles/gnomeisland", "remote_domain": 4, "points": 1, "facebook": "", "avatar": "http://mediacdn.disqus.com/uploads/users/735/2034/avatar32.jpg?1281549414", "delicious": "", "is_remote": true, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": "OpenID"}, "facebook-530881696": {"username": "facebook-530881696", "tumblr": "", "about": "", "display_name": "Carolina Jm", "url": "http://disqus.com/facebook-530881696/", "registered": true, "remote_id": "530881696", "linkedin": "", "blog": "http://www.facebook.com/profile.php?id=530881696", "remote_domain": 1, "points": 0, "facebook": "http://www.facebook.com/profile.php?id=530881696", "avatar": "http://mediacdn.disqus.com/uploads/users/534/3259/avatar32.jpg?1337947325", "delicious": "", "is_remote": true, "verified": false, "flickr": "", "twitter": "", "remote_domain_name": "Facebook"}}, "user_unapproved": {}, "messagesx": {"count": 0, "unread": []}, "thread": {"voters_count": 0, "offset_posts": 0, "slug": "darpa_seeks_to_understand_storytelling_weaponized_dr_seuss_imminent", "paginate": true, "num_pages": 1, "days_alive": 0, "moderate_none": false, "voters": {}, "total_posts": 2, "realtime_paused": true, "queued": false, "pagination_type": "append", "user_vote": null, "likes": 0, "num_posts": 2, "closed": false, "per_page": 5, "id": 227137040, "killed": false, "moderate_all": false}, "forum": {"use_media": true, "avatar_size": 32, "apiKey": "4Idzn5hQjkPc9WZxXtmeciu0QZdSRAMIJjYKZ91bxnZuWoczUrDuJK6ojId9foej", "features": {}, "comment_max_words": 0, "mobile_theme_disabled": false, "is_early_adopter": false, "login_buttons_enabled": true, "streaming_realtime": false, "reply_position": true, "id": 557332, "default_avatar_url": "http://mediacdn.disqus.com/1339189988/images/noavatar32.png", "template": {"url": "http://mediacdn.disqus.com/1339189988/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.js?252", "mobile": {"url": "http://mediacdn.disqus.com/1339189988/uploads/themes/mobile/theme.js?254", "css": "http://mediacdn.disqus.com/1339189988/uploads/themes/mobile/theme.css?254"}, "api": "1.1", "name": "Houdini", "css": "http://mediacdn.disqus.com/1339189988/uploads/themes/7884a9652e94555c70f96b6be63be216/theme.css?252"}, "max_depth": 5, "ranks_enabled": false, "lastUpdate": 1323112117, "linkbacks_enabled": false, "allow_anon_votes": true, "revert_new_login_flow": false, "stylesUrl": "http://mediacdn.disqus.com/uploads/styles/55/7332/geekosystem.css", "show_avatar": true, "reactions_enabled": false, "disqus_auth_disabled": false, "name": "Geekosystem", "language": "en", "mentions_enabled": true, "url": "geekosystem", "allow_anon_post": true, "thread_votes_disabled": false, "hasCustomStyles": true, "moderate_all": false}, "settings": {"realtimeHost": "qq.disqus.com", "uploads_url": "http://media.disqus.com/uploads", "ssl_media_url": "https://securecdn.disqus.com/1339189988", "realtime_url": "http://rt.disqus.com/forums/realtime-cached.js", "facebook_app_id": "52254943976", "minify_js": true, "recaptcha_public_key": "6LdKMrwSAAAAAPPLVhQE9LPRW4LUSZb810_iaa8u", "read_only": false, "facebook_api_key": "52254943976", "juggler_url": "http://juggler.services.disqus.com", "realtimePort": "80", "debug": false, "disqus_url": "http://disqus.com", "media_url": "http://mediacdn.disqus.com/1339189988"}, "ranks": {}, "request": {"sort": "oldest", "is_authenticated": false, "user_type": "anon", "subscribe_on_post": 0, "missing_perm": null, "user_id": null, "remote_domain_name": "", "remote_domain": "", "is_verified": false, "profile_url": "", "username": "", "is_global_moderator": false, "sharing": {}, "timestamp": "2012-06-09_05:27:01", "is_moderator": false, "ordered_unapproved_posts": [], "unapproved_posts": {}, "forum": "geekosystem", "is_initial_load": true, "display_username": "", "points": null, "has_email": false, "moderator_can_edit": false, "is_remote": false, "userkey": "", "page": 1}, "context": {"use_twitter_signin": true, "use_fb_connect": true, "show_reply": true, "active_switches": ["autocommitted_thread", "bespin", "community_icon", "embedapi", "mentions", "new_thread_create", "realtime_cached", "ssl", "static_styles", "statsd_created", "upload_media", "use_rs_paginator_60m"], "sigma_chance": 10, "use_google_signin": true, "switches": {"olark_admin_addons": true, "digests:add": true, "es_index_threads": true, "limit_get_posts_days_30d": true, "discovery_best_comment": true, "html_email": true, "phoenix_reputation": true, "firehose": true, "olark_admin_packages": true, "upload_media": true, "firehose_gnip_http": true, "transitional_sessions": true, "statsd_created": true, "bespin": true, "firehose_pubsub": true, "firehose_message_db_lookup": true, "digests": true, "shardvote": true, "juggler_thread_onReady": true, "discovery_network": true, "redis_sessions": true, "use_impermium": true, "embedapi": true, "shorten_notifications_links": true, "ssl": true, "shardpost:index": true, "usertransformer_reputation": true, "fingerprint": true, "send_to_impermium": true, "firehose_push": true, "shardpost": true, "train_impermium": true, "shardvote:backfills": true, "show_captcha_on_links": true, "firehose_pubsub_throttle": true, "new_moderate": true, "use_rs_paginator_60m": true, "redis_threadcount": true, "shardvote:index": true, "listactivity_replies": true, "juggler_enabled": true, "next_thread_sharing": true, "use_master_for_api": true, "next_raven": true, "next_realtime:indicators": true, "moderate_ascending": true, "community_icon": true, "static_styles": true, "stats": true, "realtime": true, "redis_notification_tokens": true, "realtime_cached": true, "olark_support": true, "firehose_gnip": true, "discovery_on_content": true, "digests:process": true, "olark_addons": true, "phoenix_optout": true, "edits_to_spam": true, "shardvote:api": true, "phoenix": true, "discovery_redirect_event": true, "new_thread_create": true, "autocommitted_thread": true, "theme_editor_disabled": true, "next_realtime": true, "listactivity_replies_30d": true, "statsd.timings": true, "git_themes": true, "google_analytics": true, "mentions": true, "olark_install": true}, "forum_facebook_key": "", "use_yahoo": true, "subscribed": false, "active_gargoyle_switches": ["digests", "digests:add", "digests:process", "discovery_best_comment", "discovery_network", "discovery_on_content", "discovery_redirect_event", "edits_to_spam", "es_index_threads", "fingerprint", "firehose", "firehose_gnip", "firehose_gnip_http", "firehose_message_db_lookup", "firehose_pubsub", "firehose_pubsub_throttle", "firehose_push", "git_themes", "google_analytics", "html_email", "juggler_enabled", "juggler_thread_onReady", "limit_get_posts_days_30d", "listactivity_replies", "listactivity_replies_30d", "moderate_ascending", "new_moderate", "next_raven", "next_realtime", "next_realtime:indicators", "next_thread_sharing", "olark_addons", "olark_admin_addons", "olark_admin_packages", "olark_install", "olark_support", "phoenix", "phoenix_optout", "phoenix_reputation", "realtime", "redis_notification_tokens", "redis_sessions", "redis_threadcount", "send_to_impermium", "shardpost", "shardpost:index", "shardvote", "shardvote:api", "shardvote:backfills", "shardvote:index", "shorten_notifications_links", "show_captcha_on_links", "stats", "statsd.timings", "theme_editor_disabled", "train_impermium", "transitional_sessions", "use_impermium", "use_master_for_api", "use_rs_paginator_60m", "usertransformer_reputation"], "realtime_speed": 15000, "use_openid": true}}; /* */
    /* __extrajson__ */
    cookieMessages = {"user_created": null, "post_has_profile": null, "post_twitter": null, "post_not_approved": null}; session = {"url": null, "name": null, "email": null};

    DISQUS.jsonData = jsonData;
    DISQUS.jsonData.cookie_messages = cookieMessages;
    DISQUS.jsonData.session = session;

    if (DISQUS.useSSL) {
        DISQUS.useSSL(DISQUS.jsonData.settings);
    }

    // The mappings below are for backwards compatibility--before we port all the code that
    // accesses jsonData.settings to DISQUS.settings

    var mappings = {
        debug:                'disqus.debug',
        minify_js:            'disqus.minified',
        read_only:            'disqus.readonly',
        recaptcha_public_key: 'disqus.recaptcha.key',
        facebook_app_id:      'disqus.facebook.appId',
        facebook_api_key:     'disqus.facebook.apiKey'
    };

    var urlMappings = {
        disqus_url:    'disqus.urls.main',
        media_url:     'disqus.urls.media',
        ssl_media_url: 'disqus.urls.sslMedia',
        realtime_url:  'disqus.urls.realtime',
        uploads_url:   'disqus.urls.uploads'
    };

    if (DISQUS.jsonData.context.switches.realtime_setting_change) {
        urlMappings.realtimeHost = 'realtime.host';
        urlMappings.realtimePort = 'realtime.port';
    }
    for (key in mappings) {
        if (mappings.hasOwnProperty(key)) {
            DISQUS.settings.set(mappings[key], DISQUS.jsonData.settings[key]);
        }
    }

    for (key in urlMappings) {
        if (urlMappings.hasOwnProperty(key)) {
            DISQUS.jsonData.settings[key] = DISQUS.settings.get(urlMappings[key]);
        }
    }
}());

DISQUS.jsonData.context.csrf_token = '7dc59706c4889444e7fc6d946ec7f557';

DISQUS.jsonData.urls = {
    login: 'http://disqus.com/profile/login/',
    logout: 'http://disqus.com/logout/',
    upload_remove: 'http://geekosystem.disqus.com/thread/darpa_seeks_to_understand_storytelling_weaponized_dr_seuss_imminent/async_media_remove/',
    request_user_profile: 'http://disqus.com/AnonymousUser/',
    request_user_avatar: 'http://mediacdn.disqus.com/1339189988/images/noavatar92.png',
    verify_email: 'http://disqus.com/verify/',
    remote_settings: 'http://geekosystem.disqus.com/_auth/embed/remote_settings/',
    edit_profile_window: 'http://disqus.com/embed/profile/edit/',
    embed_thread: 'http://geekosystem.disqus.com/thread.js',
    embed_vote: 'http://geekosystem.disqus.com/vote.js',
    embed_thread_vote: 'http://geekosystem.disqus.com/thread_vote.js',
    embed_thread_share: 'http://geekosystem.disqus.com/thread_share.js',
    embed_queueurl: 'http://geekosystem.disqus.com/queueurl.js',
    embed_hidereaction: 'http://geekosystem.disqus.com/hidereaction.js',
    embed_more_reactions: 'http://geekosystem.disqus.com/more_reactions.js',
    embed_subscribe: 'http://geekosystem.disqus.com/subscribe.js',
    embed_highlight: 'http://geekosystem.disqus.com/highlight.js',
    embed_block: 'http://geekosystem.disqus.com/block.js',
    update_moderate_all: 'http://geekosystem.disqus.com/update_moderate_all.js',
    update_days_alive: 'http://geekosystem.disqus.com/update_days_alive.js',
    show_user_votes: 'http://geekosystem.disqus.com/show_user_votes.js',
    forum_view: 'http://geekosystem.disqus.com/darpa_seeks_to_understand_storytelling_weaponized_dr_seuss_imminent',
    cnn_saml_try: 'http://disqus.com/saml/cnn/try/',
    realtime: DISQUS.jsonData.settings.realtime_url,
    thread_view: 'http://geekosystem.disqus.com/thread/darpa_seeks_to_understand_storytelling_weaponized_dr_seuss_imminent/',
    twitter_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/twitter/begin/',
    yahoo_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/yahoo/begin/',
    openid_connect: DISQUS.jsonData.settings.disqus_url + '/_ax/openid/begin/',
    googleConnect: DISQUS.jsonData.settings.disqus_url + '/_ax/google/begin/',
    community: 'http://geekosystem.disqus.com/community.html',
    admin: 'http://geekosystem.disqus.com/admin/moderate/',
    moderate: 'http://geekosystem.disqus.com/admin/moderate/',
    moderate_threads: 'http://geekosystem.disqus.com/admin/moderate-threads/',
    settings: 'http://geekosystem.disqus.com/admin/settings/',
    unmerged_profiles: 'http://disqus.com/embed/profile/unmerged_profiles/',
    juggler: DISQUS.jsonData.settings.juggler_url,

    channels: {
        def:      'http://disqus.com/default.html', /* default channel */
        auth:     'https://disqus.com/embed/login.html',
        tweetbox: 'http://disqus.com/forums/integrations/twitter/tweetbox.html?f=geekosystem',
        edit:     'http://geekosystem.disqus.com/embed/editcomment.html'
    }
};


// 
//     
DISQUS.jsonData.urls.channels.reply = 'http://mediacdn.disqus.com/1339189988/build/system/reply.html';
DISQUS.jsonData.urls.channels.upload = 'http://mediacdn.disqus.com/1339189988/build/system/upload.html';
DISQUS.jsonData.urls.channels.sso = 'http://mediacdn.disqus.com/1339189988/build/system/sso.html';
DISQUS.jsonData.urls.channels.facebook = 'http://mediacdn.disqus.com/1339189988/build/system/facebook.html';
//     
// 
