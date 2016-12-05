CKEDITOR.dialog.add("colordialog",function(e){function t(){g.getById(C).removeStyle("background-color"),c.getContentElement("picker","selectedColor").setValue(""),n()}function i(e){e=e.data.getTarget();var t;"td"==e.getName()&&(t=e.getChild(0).getHtml())&&(n(),d=e,d.setAttribute("aria-selected",!0),d.addClass("cke_colordialog_selected"),c.getContentElement("picker","selectedColor").setValue(t))}function n(){d&&(d.removeClass("cke_colordialog_selected"),d.removeAttribute("aria-selected"),d=null)}function a(e){e=e.replace(/^#/,"");for(var t=0,i=[];2>=t;t++)i[t]=parseInt(e.substr(2*t,2),16);return 165<=.2126*i[0]+.7152*i[1]+.0722*i[2]}function o(e){!e.name&&(e=new CKEDITOR.event(e));var t,i=!/mouse/.test(e.name),n=e.data.getTarget();"td"==n.getName()&&(t=n.getChild(0).getHtml())&&(r(e),i?u=n:h=n,i&&n.addClass(a(t)?"cke_colordialog_focused_light":"cke_colordialog_focused_dark"),s(t))}function r(e){(e=!/mouse/.test(e.name)&&u)&&(e.removeClass("cke_colordialog_focused_light"),e.removeClass("cke_colordialog_focused_dark")),u||h||s(!1)}function s(e){e?(g.getById(T).setStyle("background-color",e),g.getById(y).setHtml(e)):(g.getById(T).removeStyle("background-color"),g.getById(y).setHtml("&nbsp;"))}function l(t){var n=t.data,a=n.getTarget(),o=n.getKeystroke(),r="rtl"==e.lang.dir;switch(o){case 38:(t=a.getParent().getPrevious())&&(t=t.getChild([a.getIndex()]),t.focus()),n.preventDefault();break;case 40:(t=a.getParent().getNext())&&(t=t.getChild([a.getIndex()]))&&1==t.type&&t.focus(),n.preventDefault();break;case 32:case 13:i(t),n.preventDefault();break;case r?37:39:(t=a.getNext())?1==t.type&&(t.focus(),n.preventDefault(!0)):(t=a.getParent().getNext())&&(t=t.getChild([0]))&&1==t.type&&(t.focus(),n.preventDefault(!0));break;case r?39:37:(t=a.getPrevious())?(t.focus(),n.preventDefault(!0)):(t=a.getParent().getPrevious())&&(t=t.getLast(),t.focus(),n.preventDefault(!0))}}var c,d,u,h,p,m=CKEDITOR.dom.element,g=CKEDITOR.document,f=e.lang.colordialog,b={type:"html",html:"&nbsp;"},v=function(e){return CKEDITOR.tools.getNextId()+"_"+e},T=v("hicolor"),y=v("hicolortext"),C=v("selhicolor");return function(){function e(e,i){for(var a=e;a<e+3;a++){var o=new m(p.$.insertRow(-1));o.setAttribute("role","row");for(var r=i;r<i+3;r++)for(var s=0;6>s;s++)t(o.$,"#"+n[r]+n[s]+n[a])}}function t(e,t){var n=new m(e.insertCell(-1));n.setAttribute("class","ColorCell cke_colordialog_colorcell"),n.setAttribute("tabIndex",-1),n.setAttribute("role","gridcell"),n.on("keydown",l),n.on("click",i),n.on("focus",o),n.on("blur",r),n.setStyle("background-color",t);var a=v("color_table_cell");n.setAttribute("aria-labelledby",a),n.append(CKEDITOR.dom.element.createFromHtml('<span id="'+a+'" class="cke_voice_label">'+t+"</span>",CKEDITOR.document))}p=CKEDITOR.dom.element.createFromHtml('<table tabIndex="-1" class="cke_colordialog_table" aria-label="'+f.options+'" role="grid" style="border-collapse:separate;" cellspacing="0"><caption class="cke_voice_label">'+f.options+'</caption><tbody role="presentation"></tbody></table>'),p.on("mouseover",o),p.on("mouseout",r);var n="00 33 66 99 cc ff".split(" ");e(0,0),e(3,0),e(0,3),e(3,3);var a=new m(p.$.insertRow(-1));a.setAttribute("role","row"),t(a.$,"#000000");for(var s=0;16>s;s++){var c=s.toString(16);t(a.$,"#"+c+c+c+c+c+c)}t(a.$,"#ffffff")}(),CKEDITOR.document.appendStyleSheet(CKEDITOR.getUrl(CKEDITOR.plugins.get("colordialog").path+"dialogs/colordialog.css")),{title:f.title,minWidth:360,minHeight:220,onLoad:function(){c=this},onHide:function(){t(),u.removeClass("cke_colordialog_focused_light"),u.removeClass("cke_colordialog_focused_dark"),s(!1),u=null},contents:[{id:"picker",label:f.title,accessKey:"I",elements:[{type:"hbox",padding:0,widths:["70%","10%","30%"],children:[{type:"html",html:"<div></div>",onLoad:function(){CKEDITOR.document.getById(this.domId).append(p)},focus:function(){(u||this.getElement().getElementsByTag("td").getItem(0)).focus()}},b,{type:"vbox",padding:0,widths:["70%","5%","25%"],children:[{type:"html",html:"<span>"+f.highlight+'</span><div id="'+T+'" style="border: 1px solid; height: 74px; width: 74px;"></div><div id="'+y+'">&nbsp;</div><span>'+f.selected+'</span><div id="'+C+'" style="border: 1px solid; height: 20px; width: 74px;"></div>'},{type:"text",label:f.selected,labelStyle:"display:none",id:"selectedColor",style:"width: 76px;margin-top:4px",onChange:function(){try{g.getById(C).setStyle("background-color",this.getValue())}catch(e){t()}}},b,{type:"button",id:"clear",label:f.clear,onClick:t}]}]}]}]}});