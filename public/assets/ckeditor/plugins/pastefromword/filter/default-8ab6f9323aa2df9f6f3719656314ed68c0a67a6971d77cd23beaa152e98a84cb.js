!function(){function e(e){e=e.toUpperCase();for(var t=s.length,i=0,n=0;n<t;++n)for(var a=s[n],o=a[1].length;e.substr(0,o)==a[1];e=e.substr(o))i+=a[0];return i}function t(e){e=e.toUpperCase();for(var t=1,i=1;0<e.length;i*=26)t+="ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e.charAt(e.length-1))*i,e=e.substr(0,e.length-1);return t}var i=CKEDITOR.htmlParser.fragment.prototype,n=CKEDITOR.htmlParser.element.prototype;i.onlyChild=n.onlyChild=function(){var e=this.children;return 1==e.length&&e[0]||null},n.removeAnyChildWithName=function(e){for(var t,i=this.children,n=[],a=0;a<i.length;a++)t=i[a],t.name&&(t.name==e&&(n.push(t),i.splice(a--,1)),n=n.concat(t.removeAnyChildWithName(e)));return n},n.getAncestor=function(e){for(var t=this.parent;t&&(!t.name||!t.name.match(e));)t=t.parent;return t},i.firstChild=n.firstChild=function(e){for(var t,i=0;i<this.children.length;i++)if(t=this.children[i],e(t)||t.name&&(t=t.firstChild(e)))return t;return null},n.addStyle=function(e,t,i){var n="";if("string"==typeof t)n+=e+":"+t+";";else{if("object"==typeof e)for(var a in e)e.hasOwnProperty(a)&&(n+=a+":"+e[a]+";");else n+=e;i=t}this.attributes||(this.attributes={}),e=this.attributes.style||"",e=(i?[n,e]:[e,n]).join(";"),this.attributes.style=e.replace(/^;+|;(?=;)/g,"")},n.getStyle=function(e){var t=this.attributes.style;if(t)return t=CKEDITOR.tools.parseCssText(t,1),t[e]},CKEDITOR.dtd.parentOf=function(e){var t,i={};for(t in this)-1==t.indexOf("$")&&this[t][e]&&(i[t]=1);return i};var a,o=/^(?:\b0[^\s]*\s*){1,4}$/,r={ol:{decimal:/\d+/,"lower-roman":/^m{0,4}(cm|cd|d?c{0,3})(xc|xl|l?x{0,3})(ix|iv|v?i{0,3})$/,"upper-roman":/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/,"lower-alpha":/^[a-z]+$/,"upper-alpha":/^[A-Z]+$/},ul:{disc:/[l\u00B7\u2002]/,circle:/[\u006F\u00D8]/,square:/[\u006E\u25C6]/}},s=[[1e3,"M"],[900,"CM"],[500,"D"],[400,"CD"],[100,"C"],[90,"XC"],[50,"L"],[40,"XL"],[10,"X"],[9,"IX"],[5,"V"],[4,"IV"],[1,"I"]],l=0,c=null,d=CKEDITOR.plugins.pastefromword={utils:{createListBulletMarker:function(e,t){var i=new CKEDITOR.htmlParser.element("cke:listbullet");return i.attributes={"cke:listsymbol":e[0]},i.add(new CKEDITOR.htmlParser.text(t)),i},isListBulletIndicator:function(e){if(/mso-list\s*:\s*Ignore/i.test(e.attributes&&e.attributes.style))return!0},isContainingOnlySpaces:function(e){var t;return(t=e.onlyChild())&&/^(:?\s|&nbsp;)+$/.test(t.value)},resolveList:function(e){var t,i=e.attributes;return(t=e.removeAnyChildWithName("cke:listbullet"))&&t.length&&(t=t[0])?(e.name="cke:li",i.style&&(i.style=d.filters.stylesFilter([["text-indent"],["line-height"],[/^margin(:?-left)?$/,null,function(e){e=e.split(" "),e=CKEDITOR.tools.convertToPx(e[3]||e[1]||e[0]),!l&&null!==c&&e>c&&(l=e-c),c=e,i["cke:indent"]=l&&Math.ceil(e/l)+1||1}],[/^mso-list$/,null,function(e){if(e=e.split(" "),!(2>e.length)){var t=Number(e[0].match(/\d+/));e=Number(e[1].match(/\d+/)),1==e&&(t!==a&&(i["cke:reset"]=1),a=t),i["cke:indent"]=e}}]])(i.style,e)||""),i["cke:indent"]||(c=0,i["cke:indent"]=1),CKEDITOR.tools.extend(i,t.attributes),!0):(a=c=l=null,!1)},getStyleComponents:function(){var e=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;"></div>',CKEDITOR.document);return CKEDITOR.document.getBody().append(e),function(t,i,n){e.setStyle(t,i),t={},i=n.length;for(var a=0;a<i;a++)t[n[a]]=e.getStyle(n[a]);return t}}(),listDtdParents:CKEDITOR.dtd.parentOf("ol")},filters:{flattenList:function(e,t){t="number"==typeof t?t:1;var i,n=e.attributes;switch(n.type){case"a":i="lower-alpha";break;case"1":i="decimal"}for(var o,r=e.children,s=0;s<r.length;s++)if(o=r[s],o.name in CKEDITOR.dtd.$listItem){var l=o.attributes,u=o.children,h=u[0],p=u[u.length-1];h.attributes&&h.attributes.style&&-1<h.attributes.style.indexOf("mso-list")&&(o.attributes.style=h.attributes.style,h.replaceWithChildren()),p.name in CKEDITOR.dtd.$list&&(e.add(p,s+1),--u.length||r.splice(s--,1)),o.name="cke:li",n.start&&!s&&(l.value=n.start),d.filters.stylesFilter([["tab-stops",null,function(e){(e=e.match(/0$|\d+\.?\d*\w+/))&&(c=CKEDITOR.tools.convertToPx(e[0]))}],1==t?["mso-list",null,function(e){e=e.split(" "),e=Number(e[0].match(/\d+/)),e!==a&&(l["cke:reset"]=1),a=e}]:null])(l.style),l["cke:indent"]=t,l["cke:listtype"]=e.name,l["cke:list-style-type"]=i}else if(o.name in CKEDITOR.dtd.$list){for(arguments.callee.apply(this,[o,t+1]),r=r.slice(0,s).concat(o.children).concat(r.slice(s+1)),e.children=[],o=0,u=r.length;o<u;o++)e.add(r[o]);r=e.children}delete e.name,n["cke:list"]=1},assembleList:function(i){var n,o,s,d,u,h,p=i.children;i=[];for(var m,g,f,b,v,T,y=0;y<p.length;y++)if(n=p[y],"cke:li"==n.name)if(n.name="li",o=n.attributes,f=(f=o["cke:listsymbol"])&&f.match(/^(?:[(]?)([^\s]+?)([.)]?)$/),b=v=T=null,o["cke:ignored"])p.splice(y--,1);else{if(o["cke:reset"]&&(h=d=u=null),s=Number(o["cke:indent"]),s!=d&&(g=m=null),f){if(g&&r[g][m].test(f[1]))b=g,v=m;else for(var C in r)for(var E in r[C])if(r[C][E].test(f[1])){if("ol"!=C||!/alpha|roman/.test(E)){b=C,v=E;break}m=/roman/.test(E)?e(f[1]):t(f[1]),(!T||m<T)&&(T=m,b=C,v=E)}!b&&(b=f[2]?"ol":"ul")}else b=o["cke:listtype"]||"ol",v=o["cke:list-style-type"];if(g=b,m=v||("ol"==b?"decimal":"disc"),v&&v!=("ol"==b?"decimal":"disc")&&n.addStyle("list-style-type",v),"ol"==b&&f){switch(v){case"decimal":T=Number(f[1]);break;case"lower-roman":case"upper-roman":T=e(f[1]);break;case"lower-alpha":case"upper-alpha":T=t(f[1])}n.attributes.value=T}if(h){if(s>d)i.push(h=new CKEDITOR.htmlParser.element(b)),h.add(n),u.add(h);else{if(s<d){d-=s;for(var k;d--&&(k=h.parent);)h=k.parent}h.add(n)}p.splice(y--,1)}else i.push(h=new CKEDITOR.htmlParser.element(b)),h.add(n),p[y]=h;u=n,d=s}else h&&(h=d=u=null);for(y=0;y<i.length;y++)if(h=i[y],C=h.children,m=m=void 0,E=h.children.length,k=m=void 0,p=/list-style-type:(.*?)(?:;|$)/,d=CKEDITOR.plugins.pastefromword.filters.stylesFilter,m=h.attributes,!p.exec(m.style)){for(u=0;u<E;u++)if(m=C[u],m.attributes.value&&Number(m.attributes.value)==u+1&&delete m.attributes.value,m=p.exec(m.attributes.style)){if(m[1]!=k&&k){k=null;break}k=m[1]}if(k){for(u=0;u<E;u++)m=C[u].attributes,m.style&&(m.style=d([["list-style-type"]])(m.style)||"");h.addStyle("list-style-type",k)}}a=c=l=null},falsyFilter:function(){return!1},stylesFilter:function(e,t){return function(i,n){var a=[];(i||"").replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(i,o,r){o=o.toLowerCase(),"font-family"==o&&(r=r.replace(/["']/g,""));for(var s,l,c,d=0;d<e.length;d++)if(e[d]&&(i=e[d][0],s=e[d][1],l=e[d][2],c=e[d][3],o.match(i)&&(!s||r.match(s))))return o=c||o,t&&(l=l||r),"function"==typeof l&&(l=l(r,n,o)),l&&l.push&&(o=l[0],l=l[1]),void("string"==typeof l&&a.push([o,l]));!t&&a.push([o,r])});for(var o=0;o<a.length;o++)a[o]=a[o].join(":");return!!a.length&&a.join(";")+";"}},elementMigrateFilter:function(e,t){return e?function(i){var n=t?new CKEDITOR.style(e,t)._.definition:e;i.name=n.element,CKEDITOR.tools.extend(i.attributes,CKEDITOR.tools.clone(n.attributes)),i.addStyle(CKEDITOR.style.getStyleText(n)),n.attributes&&n.attributes["class"]&&(i.classWhiteList=" "+n.attributes["class"]+" ")}:function(){}},styleMigrateFilter:function(e,t){var i=this.elementMigrateFilter;return e?function(n,a){var o=new CKEDITOR.htmlParser.element(null),r={};r[t]=n,i(e,r)(o),o.children=a.children,a.children=[o],o.filter=function(){},o.parent=a}:function(){}},bogusAttrFilter:function(e,t){if(-1==t.name.indexOf("cke:"))return!1},applyStyleFilter:null},getRules:function(e,t){var i=CKEDITOR.dtd,n=CKEDITOR.tools.extend({},i.$block,i.$listItem,i.$tableContent),a=e.config,r=this.filters,s=r.falsyFilter,l=r.stylesFilter,c=r.elementMigrateFilter,d=CKEDITOR.tools.bind(this.filters.styleMigrateFilter,this.filters),u=this.utils.createListBulletMarker,h=r.flattenList,p=r.assembleList,m=this.utils.isListBulletIndicator,g=this.utils.isContainingOnlySpaces,f=this.utils.resolveList,b=function(e){return e=CKEDITOR.tools.convertToPx(e),isNaN(e)?e:e+"px"},v=this.utils.getStyleComponents,T=this.utils.listDtdParents,y=!1!==a.pasteFromWordRemoveFontStyles,C=!1!==a.pasteFromWordRemoveStyles;return{elementNames:[[/meta|link|script/,""]],root:function(e){e.filterChildren(t),p(e)},elements:{"^":function(e){var t;CKEDITOR.env.gecko&&(t=r.applyStyleFilter)&&t(e)},$:function(e){var o=e.name||"",r=e.attributes;if(o in n&&r.style&&(r.style=l([[/^(:?width|height)$/,null,b]])(r.style)||""),o.match(/h\d/)){if(e.filterChildren(t),f(e))return;c(a["format_"+o])(e)}else if(o in i.$inline)e.filterChildren(t),g(e)&&delete e.name;else if(-1!=o.indexOf(":")&&-1==o.indexOf("cke")){if(e.filterChildren(t),"v:imagedata"==o)return(o=e.attributes["o:href"])&&(e.attributes.src=o),void(e.name="img");delete e.name}o in T&&(e.filterChildren(t),p(e))},style:function(e){if(CKEDITOR.env.gecko){e=(e=e.onlyChild().value.match(/\/\* Style Definitions \*\/([\s\S]*?)\/\*/))&&e[1];var t={};e&&(e.replace(/[\n\r]/g,"").replace(/(.+?)\{(.+?)\}/g,function(e,i,n){i=i.split(","),e=i.length;for(var a=0;a<e;a++)CKEDITOR.tools.trim(i[a]).replace(/^(\w+)(\.[\w-]+)?$/g,function(e,i,a){i=i||"*",a=a.substring(1,a.length),a.match(/MsoNormal/)||(t[i]||(t[i]={}),a?t[i][a]=n:t[i]=n)})}),r.applyStyleFilter=function(e){var i=t["*"]?"*":e.name,n=e.attributes&&e.attributes["class"];i in t&&(i=t[i],"object"==typeof i&&(i=i[n]),i&&e.addStyle(i,!0))})}return!1},p:function(e){if(/MsoListParagraph/i.exec(e.attributes["class"])||e.getStyle("mso-list")&&!e.getStyle("mso-list").match(/^(none|skip)$/i)){var i=e.firstChild(function(e){return e.type==CKEDITOR.NODE_TEXT&&!g(e.parent)});(i=i&&i.parent)&&i.addStyle("mso-list","Ignore")}e.filterChildren(t),f(e)||(a.enterMode==CKEDITOR.ENTER_BR?(delete e.name,e.add(new CKEDITOR.htmlParser.element("br"))):c(a["format_"+(a.enterMode==CKEDITOR.ENTER_P?"p":"div")])(e))},div:function(e){var t=e.onlyChild();if(t&&"table"==t.name){var i=e.attributes;t.attributes=CKEDITOR.tools.extend(t.attributes,i),i.style&&t.addStyle(i.style),t=new CKEDITOR.htmlParser.element("div"),t.addStyle("clear","both"),e.add(t),delete e.name}},td:function(e){e.getAncestor("thead")&&(e.name="th")},ol:h,ul:h,dl:h,font:function(e){if(m(e.parent))delete e.name;else{e.filterChildren(t);var i=e.attributes,n=i.style,a=e.parent;"font"==a.name?(CKEDITOR.tools.extend(a.attributes,e.attributes),n&&a.addStyle(n),delete e.name):(n=(n||"").split(";"),i.color&&("#000000"!=i.color&&n.push("color:"+i.color),delete i.color),i.face&&(n.push("font-family:"+i.face),delete i.face),i.size&&(n.push("font-size:"+(3<i.size?"large":3>i.size?"small":"medium")),delete i.size),e.name="span",e.addStyle(n.join(";")))}},span:function(e){if(m(e.parent))return!1;if(e.filterChildren(t),g(e))return delete e.name,null;if(m(e)){var i=e.firstChild(function(e){return e.value||"img"==e.name}),n=(i=i&&(i.value||"l."))&&i.match(/^(?:[(]?)([^\s]+?)([.)]?)$/);if(n)return i=u(n,i),(e=e.getAncestor("span"))&&/ mso-hide:\s*all|display:\s*none /.test(e.attributes.style)&&(i.attributes["cke:ignored"]=1),i}return(n=(i=e.attributes)&&i.style)&&(i.style=l([["line-height"],[/^font-family$/,null,y?null:d(a.font_style,"family")],[/^font-size$/,null,y?null:d(a.fontSize_style,"size")],[/^color$/,null,y?null:d(a.colorButton_foreStyle,"color")],[/^background-color$/,null,y?null:d(a.colorButton_backStyle,"color")]])(n,e)||""),i.style||delete i.style,CKEDITOR.tools.isEmpty(i)&&delete e.name,null},b:c(a.coreStyles_bold),i:c(a.coreStyles_italic),u:c(a.coreStyles_underline),s:c(a.coreStyles_strike),sup:c(a.coreStyles_superscript),sub:c(a.coreStyles_subscript),a:function(e){var t=e.attributes;t.name&&t.name.match(/ole_link\d+/i)?delete e.name:t.href&&t.href.match(/^file:\/\/\/[\S]+#/i)&&(t.href=t.href.replace(/^file:\/\/\/[^#]+/i,""))},"cke:listbullet":function(e){e.getAncestor(/h\d/)&&!a.pasteFromWordNumberedHeadingToList&&delete e.name}},attributeNames:[[/^onmouse(:?out|over)/,""],[/^onload$/,""],[/(?:v|o):\w+/,""],[/^lang/,""]],attributes:{style:l(C?[[/^list-style-type$/,null],[/^margin$|^margin-(?!bottom|top)/,null,function(e,t,i){if(t.name in{p:1,div:1}){if(t="ltr"==a.contentsLangDirection?"margin-left":"margin-right","margin"==i)e=v(i,e,[t])[t];else if(i!=t)return null;if(e&&!o.test(e))return[t,e]}return null}],[/^clear$/],[/^border.*|margin.*|vertical-align|float$/,null,function(e,t){if("img"==t.name)return e}],[/^width|height$/,null,function(e,t){if(t.name in{table:1,td:1,th:1,img:1})return e}]]:[[/^mso-/],[/-color$/,null,function(e){return"transparent"!=e&&(CKEDITOR.env.gecko?e.replace(/-moz-use-text-color/g,"transparent"):void 0)}],[/^margin$/,o],["text-indent","0cm"],["page-break-before"],["tab-stops"],["display","none"],y?[/font-?/]:null],C),width:function(e,t){if(t.name in i.$tableContent)return!1},border:function(e,t){if(t.name in i.$tableContent)return!1},"class":function(e,t){return!(!t.classWhiteList||-1==t.classWhiteList.indexOf(" "+e+" "))&&e},bgcolor:s,valign:C?s:function(e,t){return t.addStyle("vertical-align",e),!1}},comment:CKEDITOR.env.ie?s:function(e,t){var i=e.match(/<img.*?>/),n=e.match(/^\[if !supportLists\]([\s\S]*?)\[endif\]$/);return n?(n=(i=n[1]||i&&"l.")&&i.match(/>(?:[(]?)([^\s]+?)([.)]?)</),u(n,i)):!(!CKEDITOR.env.gecko||!i)&&(i=CKEDITOR.htmlParser.fragment.fromHtml(i[0]).children[0],(n=(n=(n=t.previous)&&n.value.match(/<v:imagedata[^>]*o:href=['"](.*?)['"]/))&&n[1])&&(i.attributes.src=n),i)}}}},u=function(){this.dataFilter=new CKEDITOR.htmlParser.filter};u.prototype={toHtml:function(e){e=CKEDITOR.htmlParser.fragment.fromHtml(e);var t=new CKEDITOR.htmlParser.basicWriter;return e.writeHtml(t,this.dataFilter),t.getHtml(!0)}},CKEDITOR.cleanWord=function(e,t){e=e.replace(/<!\[([^\]]*?)\]>/g,"<!--[$1]-->"),CKEDITOR.env.gecko&&(e=e.replace(/(\x3c!--\[if[^<]*?\])--\x3e([\S\s]*?)\x3c!--(\[endif\]--\x3e)/gi,"$1$2$3")),CKEDITOR.env.webkit&&(e=e.replace(/(class="MsoListParagraph[^>]+>\x3c!--\[if !supportLists\]--\x3e)([^<]+<span[^<]+<\/span>)(\x3c!--\[endif\]--\x3e)/gi,"$1<span>$2</span>$3"));var i=new u,n=i.dataFilter;n.addRules(CKEDITOR.plugins.pastefromword.getRules(t,n)),t.fire("beforeCleanWord",{filter:n});try{e=i.toHtml(e)}catch(e){t.showNotification(t.lang.pastefromword.error)}return e=e.replace(/cke:.*?".*?"/g,""),e=e.replace(/style=""/g,""),e=e.replace(/<span>/g,"")}}();