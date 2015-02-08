TinyCore.AMD.define('boxpopuli', ['wysiwyg'], function () {
    return {
        onStart: function () {

            var boxpopuli = {

                token: '',
                authorName: '',
                authorEmail: '',
                authorGravatar: '',
                context: '',
                source: '',
                routeList: '',
                routeAdd: '',

                /**
                 * Init boxpopuli object
                 *
                 * @param $o Object
                 */
                init: function($o) {

                    $o.html('');
                    this.token = $o.data('token');
                    this.authorName = $o.data('author-name');
                    this.authorEmail = $o.data('author-email');
                    this.authorGravatar = 'http://www.gravatar.com/avatar/' + md5(this.authorEmail)
                    this.context = $o.data('context');
                    this.source = $o.data('source');
                    this.routeList = $o.data('route-list');
                    this.routeAdd = $o.data('route-add');

                    this.createCommentLayout($o);
                },

                /**
                 * Create comment area
                 *
                 * @param $o Object
                 */
                createCommentLayout: function($o) {

                    $o.append('<div class="box boxpopuli-container"></div>');
                    var $container = $o.find('.boxpopuli-container');

                    this.createFlashArea($container);
                    this.createCommentNewArea($container);
                    this.createCommentList($container);
                },

                /**
                 * Create flash area
                 *
                 * @param $o Object
                 */
                createFlashArea: function($o) {

                    $o.append('<div class="boxpopuli-flash-area"></div>')
                    this.registerFlashCloseButton($o);
                },

                /**
                 * Create flash element
                 *
                 * @param $o Object
                 * @param message Message
                 * @param type Type of message
                 */
                createFlash: function($o, message, type) {

                    var flashContent = '';
                    flashContent += '<p class="boxpopuli-flash boxpopuli-flash-' + type + ' msg-' + type + '">';
                    flashContent += message;
                    flashContent += '<a class="icon-times"></a>';
                    flashContent += '</p>';

                    $o
                        .find(".boxpopuli-flash-area")
                        .append(flashContent);
                },

                /**
                 * Register flash close button
                 *
                 * @param $o Object
                 */
                registerFlashCloseButton: function($o) {

                    $o.on('click', 'a', function() {
                        $(this)
                            .closest('.boxpopuli-flash')
                            .remove();
                    });
                },

                /**
                 * Create comment area
                 *
                 * @param $o Object
                 */
                createCommentNewArea: function($o) {

                    $o.append('<div class="grid boxpopuli-new"><form class="form"><div class="col-1-12"><img class="thumbnail" src="' + this.authorGravatar + '" /></div><div class="col-10-12"><textarea data-tc-modules="wysiwyg" data-tc-fullscreen="false" data-tc-html="false"></textarea></div><div class="col-1-12 ta-c"><button type="submit" class="button-ok button-fat button-icon icon-download"></button></div></form></div>');
                    this.registerAddComment($o);
                },

                /**
                 * Create comment area
                 *
                 * @param $o Object
                 */
                createCommentList: function($o) {

                    var self = this;

                    $.ajax({
                        type: "GET",
                        url: self.routeList,
                        dataType: "json",
                        async: true,
                        success: function(comments){

                            var commentStack = '';
                            $.each(comments, function(_, comment) {

                                commentStack += self.createCommentItem(comment, 0);
                            });

                            $o.append('<div class="boxpopuli-list">');
                            $o.append(commentStack);
                            $o.append('</div>');
                        }
                    });
                },

                /**
                 * Create comment item
                 */
                createCommentItem: function(comment, depth) {

                    var self = this;
                    var entity = comment['entity'];
                    var children = comment['children'];
                    var commentStack = '';
                    var block = '';
                    var authorGravatar = 'http://www.gravatar.com/avatar/' + md5(entity["authorEmail"])

                    block += '<div class="box grid boxpopuli-element boxpopuli-element-depth-' + depth + '"><div class="col-1-12"><img class="thumbnail" src="' + authorGravatar + '" /></div><div class="col-10-12"><div>Done by ' + entity['authorName'] + ' - ' + entity['createdAt'] + '</div>' + entity['content'] + '</div><div class="col-1-12 ta-c"></div></div>';

                    $.each(children, function(_, comment) {

                        commentStack += self.createCommentItem(comment, depth++);
                    });

                    block += commentStack;

                    return block;
                },

                /**
                 * Once a user click add, add this comment into the environment
                 *
                 * @param $o Object
                 */
                registerAddComment: function ($o) {

                    var self = this;

                    $o.on('click', '.boxpopuli-new button', function() {

                        var $this = $(this);
                        var contentWrapper = $this
                                .closest('.boxpopuli-new')
                                .find('textarea')
                                .first();
                        var content = contentWrapper.val();

                        $.ajax({
                            type: "POST",
                            url: self.routeAdd,
                            dataType: 'json',
                            data: {
                                content: content,
                                author_name: self.authorName,
                                author_email: self.authorEmail
                            },
                            async: true,
                            success: function(comment){

                                contentWrapper.val('');
                                $o.find('.boxpopuli-list').first().prepend(self.createCommentItem(comment));
                                self.createFlash($o, 'Comment saved', 'ok');
                            },
                            error: function(){

                                self.createFlash($o, 'Error when commenting', 'ko');
                            }
                        });

                        return false;
                    });
                }
            };

            var md5=(function(){function e(e,t){var o=e[0],u=e[1],a=e[2],f=e[3];o=n(o,u,a,f,t[0],7,-680876936);f=n(f,o,u,a,t[1],
                12,-389564586);a=n(a,f,o,u,t[2],17,606105819);u=n(u,a,f,o,t[3],22,-1044525330);o=n(o,u,a,f,t[4],7,-176418897);f=n(f,o,u,a,t[5],
                12,1200080426);a=n(a,f,o,u,t[6],17,-1473231341);u=n(u,a,f,o,t[7],22,-45705983);o=n(o,u,a,f,t[8],7,1770035416);f=n(f,o,u,a,t[9],
                12,-1958414417);a=n(a,f,o,u,t[10],17,-42063);u=n(u,a,f,o,t[11],22,-1990404162);o=n(o,u,a,f,t[12],7,1804603682);f=n(f,o,u,a,t[13],
                12,-40341101);a=n(a,f,o,u,t[14],17,-1502002290);u=n(u,a,f,o,t[15],22,1236535329);o=r(o,u,a,f,t[1],5,-165796510);f=r(f,o,u,a,t[6],
                9,-1069501632);a=r(a,f,o,u,t[11],14,643717713);u=r(u,a,f,o,t[0],20,-373897302);o=r(o,u,a,f,t[5],5,-701558691);f=r(f,o,u,a,t[10],
                9,38016083);a=r(a,f,o,u,t[15],14,-660478335);u=r(u,a,f,o,t[4],20,-405537848);o=r(o,u,a,f,t[9],5,568446438);f=r(f,o,u,a,t[14],
                9,-1019803690);a=r(a,f,o,u,t[3],14,-187363961);u=r(u,a,f,o,t[8],20,1163531501);o=r(o,u,a,f,t[13],5,-1444681467);f=r(f,o,u,a,t[2],
                9,-51403784);a=r(a,f,o,u,t[7],14,1735328473);u=r(u,a,f,o,t[12],20,-1926607734);o=i(o,u,a,f,t[5],4,-378558);f=i(f,o,u,a,t[8],
                11,-2022574463);a=i(a,f,o,u,t[11],16,1839030562);u=i(u,a,f,o,t[14],23,-35309556);o=i(o,u,a,f,t[1],4,-1530992060);f=i(f,o,u,a,t[4],
                11,1272893353);a=i(a,f,o,u,t[7],16,-155497632);u=i(u,a,f,o,t[10],23,-1094730640);o=i(o,u,a,f,t[13],4,681279174);f=i(f,o,u,a,t[0],
                11,-358537222);a=i(a,f,o,u,t[3],16,-722521979);u=i(u,a,f,o,t[6],23,76029189);o=i(o,u,a,f,t[9],4,-640364487);f=i(f,o,u,a,t[12],
                11,-421815835);a=i(a,f,o,u,t[15],16,530742520);u=i(u,a,f,o,t[2],23,-995338651);o=s(o,u,a,f,t[0],6,-198630844);f=s(f,o,u,a,t[7],
                10,1126891415);a=s(a,f,o,u,t[14],15,-1416354905);u=s(u,a,f,o,t[5],21,-57434055);o=s(o,u,a,f,t[12],6,1700485571);f=s(f,o,u,a,t[3],
                10,-1894986606);a=s(a,f,o,u,t[10],15,-1051523);u=s(u,a,f,o,t[1],21,-2054922799);o=s(o,u,a,f,t[8],6,1873313359);f=s(f,o,u,a,t[15],
                10,-30611744);a=s(a,f,o,u,t[6],15,-1560198380);u=s(u,a,f,o,t[13],21,1309151649);o=s(o,u,a,f,t[4],6,-145523070);f=s(f,o,u,a,t[11],
                10,-1120210379);a=s(a,f,o,u,t[2],15,718787259);u=s(u,a,f,o,t[9],21,-343485551);e[0]=m(o,e[0]);e[1]=m(u,e[1]);e[2]=m(a,e[2]);e[3]=m(f,e[3])}
                function t(e,t,n,r,i,s){t=m(m(t,e),m(r,s));return m(t<<i|t>>>32-i,n)}function n(e,n,r,i,s,o,u){return t(n&r|~n&i,e,n,s,o,u)}
                function r(e,n,r,i,s,o,u){return t(n&i|r&~i,e,n,s,o,u)}function i(e,n,r,i,s,o,u){return t(n^r^i,e,n,s,o,u)}
                function s(e,n,r,i,s,o,u){return t(r^(n|~i),e,n,s,o,u)}function o(t){var n=t.length,r=[1732584193,-271733879,-1732584194,271733878],i;
                for(i=64;i<=t.length;i+=64){e(r,u(t.substring(i-64,i)))}t=t.substring(i-64);var s=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
                for(i=0;i<t.length;i++)s[i>>2]|=t.charCodeAt(i)<<(i%4<<3);s[i>>2]|=128<<(i%4<<3);if(i>55){e(r,s);for(i=0;i<16;i++)s[i]=0}s[14]=n*8;e(r,s);return r}
                function u(e){var t=[],n;for(n=0;n<64;n+=4){t[n>>2]=e.charCodeAt(n)+(e.charCodeAt(n+1)<<8)+(e.charCodeAt(n+2)<<16)+(e.charCodeAt(n+3)<<24)}return t}
                function c(e){var t="",n=0;for(;n<4;n++)t+=a[e>>n*8+4&15]+a[e>>n*8&15];return t}
                function h(e){for(var t=0;t<e.length;t++)e[t]=c(e[t]);return e.join("")}
                function d(e){return h(o(unescape(encodeURIComponent(e))))}
                function m(e,t){return e+t&4294967295}var a="0123456789abcdef".split("");return d})();

            $('.boxpopuli-box').each(function (_, element) {
                boxpopuli.init($(element));
            });
        }
    };
});
