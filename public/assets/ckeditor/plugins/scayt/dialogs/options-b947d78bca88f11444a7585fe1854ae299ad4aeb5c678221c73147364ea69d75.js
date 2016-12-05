CKEDITOR.dialog.add("scaytDialog",function(e){var t=e.scayt,i='<p><img src="'+t.getLogo()+'" /></p><p>'+t.getLocal("version")+t.getVersion()+"</p><p>"+t.getLocal("text_copyrights")+"</p>",n=CKEDITOR.document,a={isChanged:function(){return null!==this.newLang&&this.currentLang!==this.newLang},currentLang:t.getLang(),newLang:null,reset:function(){this.currentLang=t.getLang(),this.newLang=null},id:"lang"},i=[{id:"options",label:t.getLocal("tab_options"),onShow:function(){},elements:[{type:"vbox",id:"scaytOptions",children:function(){var e,i=t.getApplicationConfig(),n=[],a={"ignore-all-caps-words":"label_allCaps","ignore-domain-names":"label_ignoreDomainNames","ignore-words-with-mixed-cases":"label_mixedCase","ignore-words-with-numbers":"label_mixedWithDigits"};for(e in i)i={type:"checkbox"},i.id=e,i.label=t.getLocal(a[e]),n.push(i);return n}(),onShow:function(){this.getChild();for(var t=e.scayt,i=0;i<this.getChild().length;i++)this.getChild()[i].setValue(t.getApplicationConfig()[this.getChild()[i].id])}}]},{id:"langs",label:t.getLocal("tab_languages"),elements:[{id:"leftLangColumn",type:"vbox",align:"left",widths:["100"],children:[{type:"html",id:"langBox",style:"overflow: hidden; white-space: normal;margin-bottom:15px;",html:'<div><div style="float:left;width:45%;margin-left:5px;" id="left-col-'+e.name+'"></div><div style="float:left;width:45%;margin-left:15px;" id="right-col-'+e.name+'"></div></div>',onShow:function(){var t=e.scayt.getLang();n.getById("scaytLang_"+e.name+"_"+t).$.checked=!0}},{type:"html",id:"graytLanguagesHint",html:'<div style="margin:5px auto; width:95%;white-space:normal;" id="'+e.name+'graytLanguagesHint"><span style="width:10px;height:10px;display: inline-block; background:#02b620;vertical-align:top;margin-top:2px;"></span> - This languages are supported by Grammar As You Type(GRAYT).</div>',onShow:function(){var t=n.getById(e.name+"graytLanguagesHint");e.config.grayt_autoStartup||(t.$.style.display="none")}}]}]},{id:"dictionaries",label:t.getLocal("tab_dictionaries"),elements:[{type:"vbox",id:"rightCol_col__left",children:[{type:"html",id:"dictionaryNote",html:""},{type:"text",id:"dictionaryName",label:t.getLocal("label_fieldNameDic")||"Dictionary name",onShow:function(t){var i=t.sender,n=e.scayt;setTimeout(function(){i.getContentElement("dictionaries","dictionaryNote").getElement().setText(""),null!=n.getUserDictionaryName()&&""!=n.getUserDictionaryName()&&i.getContentElement("dictionaries","dictionaryName").setValue(n.getUserDictionaryName())},0)}},{type:"hbox",id:"notExistDic",align:"left",style:"width:auto;",widths:["50%","50%"],children:[{type:"button",id:"createDic",label:t.getLocal("btn_createDic"),title:t.getLocal("btn_createDic"),onClick:function(){var t=this.getDialog(),i=o,n=e.scayt,a=t.getContentElement("dictionaries","dictionaryName").getValue();n.createUserDictionary(a,function(n){n.error||i.toggleDictionaryButtons.call(t,!0),n.dialog=t,n.command="create",n.name=a,e.fire("scaytUserDictionaryAction",n)},function(i){i.dialog=t,i.command="create",i.name=a,e.fire("scaytUserDictionaryActionError",i)})}},{type:"button",id:"restoreDic",label:t.getLocal("btn_restoreDic"),title:t.getLocal("btn_restoreDic"),onClick:function(){var t=this.getDialog(),i=e.scayt,n=o,a=t.getContentElement("dictionaries","dictionaryName").getValue();i.restoreUserDictionary(a,function(i){i.dialog=t,i.error||n.toggleDictionaryButtons.call(t,!0),i.command="restore",i.name=a,e.fire("scaytUserDictionaryAction",i)},function(i){i.dialog=t,i.command="restore",i.name=a,e.fire("scaytUserDictionaryActionError",i)})}}]},{type:"hbox",id:"existDic",align:"left",style:"width:auto;",widths:["50%","50%"],children:[{type:"button",id:"removeDic",label:t.getLocal("btn_deleteDic"),title:t.getLocal("btn_deleteDic"),onClick:function(){var t=this.getDialog(),i=e.scayt,n=o,a=t.getContentElement("dictionaries","dictionaryName"),r=a.getValue();i.removeUserDictionary(r,function(i){a.setValue(""),i.error||n.toggleDictionaryButtons.call(t,!1),i.dialog=t,i.command="remove",i.name=r,e.fire("scaytUserDictionaryAction",i)},function(i){i.dialog=t,i.command="remove",i.name=r,e.fire("scaytUserDictionaryActionError",i)})}},{type:"button",id:"renameDic",label:t.getLocal("btn_renameDic"),title:t.getLocal("btn_renameDic"),onClick:function(){var t=this.getDialog(),i=e.scayt,n=t.getContentElement("dictionaries","dictionaryName").getValue();i.renameUserDictionary(n,function(i){i.dialog=t,i.command="rename",i.name=n,e.fire("scaytUserDictionaryAction",i)},function(i){i.dialog=t,i.command="rename",i.name=n,e.fire("scaytUserDictionaryActionError",i)})}}]},{type:"html",id:"dicInfo",html:'<div id="dic_info_editor1" style="margin:5px auto; width:95%;white-space:normal;">'+t.getLocal("text_descriptionDic")+"</div>"}]}]},{id:"about",label:t.getLocal("tab_about"),elements:[{type:"html",id:"about",style:"margin: 5px 5px;",html:'<div><div id="scayt_about_">'+i+"</div></div>"}]}];e.on("scaytUserDictionaryAction",function(e){var t,i=SCAYT.prototype.UILib,n=e.data.dialog,a=n.getContentElement("dictionaries","dictionaryNote").getElement(),o=e.editor.scayt;void 0===e.data.error?(t=o.getLocal("message_success_"+e.data.command+"Dic"),t=t.replace("%s",e.data.name),a.setText(t),i.css(a.$,{color:"blue"})):(""===e.data.name?a.setText(o.getLocal("message_info_emptyDic")):(t=o.getLocal("message_error_"+e.data.command+"Dic"),t=t.replace("%s",e.data.name),a.setText(t)),i.css(a.$,{color:"red"}),null!=o.getUserDictionaryName()&&""!=o.getUserDictionaryName()?n.getContentElement("dictionaries","dictionaryName").setValue(o.getUserDictionaryName()):n.getContentElement("dictionaries","dictionaryName").setValue(""))}),e.on("scaytUserDictionaryActionError",function(e){var t,i=SCAYT.prototype.UILib,n=e.data.dialog,a=n.getContentElement("dictionaries","dictionaryNote").getElement(),o=e.editor.scayt;""===e.data.name?a.setText(o.getLocal("message_info_emptyDic")):(t=o.getLocal("message_error_"+e.data.command+"Dic"),t=t.replace("%s",e.data.name),a.setText(t)),i.css(a.$,{color:"red"}),null!=o.getUserDictionaryName()&&""!=o.getUserDictionaryName()?n.getContentElement("dictionaries","dictionaryName").setValue(o.getUserDictionaryName()):n.getContentElement("dictionaries","dictionaryName").setValue("")});var o={title:t.getLocal("text_title"),resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:340,minHeight:260,onLoad:function(){if(0!=e.config.scayt_uiTabs[1]){var t=o,i=t.getLangBoxes.call(this);i.getParent().setStyle("white-space","normal"),t.renderLangList(i),this.definition.minWidth=this.getSize().width,this.resize(this.definition.minWidth,this.definition.minHeight)}},onCancel:function(){a.reset()},onHide:function(){e.unlockSelection()},onShow:function(){if(e.fire("scaytDialogShown",this),0!=e.config.scayt_uiTabs[2]){var t=e.scayt,i=this.getContentElement("dictionaries","dictionaryName"),n=this.getContentElement("dictionaries","existDic").getElement().getParent(),a=this.getContentElement("dictionaries","notExistDic").getElement().getParent();n.hide(),a.hide(),null!=t.getUserDictionaryName()&&""!=t.getUserDictionaryName()?(this.getContentElement("dictionaries","dictionaryName").setValue(t.getUserDictionaryName()),n.show()):(i.setValue(""),a.show())}},onOk:function(){var t=o,i=e.scayt;this.getContentElement("options","scaytOptions"),t=t.getChangedOption.call(this),i.commitOption({changedOptions:t})},toggleDictionaryButtons:function(e){var t=this.getContentElement("dictionaries","existDic").getElement().getParent(),i=this.getContentElement("dictionaries","notExistDic").getElement().getParent();e?(t.show(),i.hide()):(t.hide(),i.show())},getChangedOption:function(){var t={};if(1==e.config.scayt_uiTabs[0])for(var i=this.getContentElement("options","scaytOptions").getChild(),n=0;n<i.length;n++)i[n].isChanged()&&(t[i[n].id]=i[n].getValue());return a.isChanged()&&(t[a.id]=e.config.scayt_sLang=a.currentLang=a.newLang),t},buildRadioInputs:function(t,i,n){var o=new CKEDITOR.dom.element("div"),r="scaytLang_"+e.name+"_"+i,s=CKEDITOR.dom.element.createFromHtml('<input id="'+r+'" type="radio"  value="'+i+'" name="scayt_lang" />'),l=new CKEDITOR.dom.element("label"),c=e.scayt;return o.setStyles({"white-space":"normal",position:"relative","padding-bottom":"2px"}),s.on("click",function(e){a.newLang=e.sender.getValue()}),l.appendText(t),l.setAttribute("for",r),n&&e.config.grayt_autoStartup&&l.setStyles({color:"#02b620"}),o.append(s),o.append(l),i===c.getLang()&&(s.setAttribute("checked",!0),s.setAttribute("defaultChecked","defaultChecked")),o},renderLangList:function(i){var n=i.find("#left-col-"+e.name).getItem(0);i=i.find("#right-col-"+e.name).getItem(0);var a,o=t.getScaytLangList(),r=t.getGraytLangList(),s={},l=[],c=0,d=!1;for(a in o.ltr)s[a]=o.ltr[a];for(a in o.rtl)s[a]=o.rtl[a];for(a in s)l.push([a,s[a]]);for(l.sort(function(e,t){var i=0;return e[1]>t[1]?i=1:e[1]<t[1]&&(i=-1),i}),s={},d=0;d<l.length;d++)s[l[d][0]]=l[d][1];l=Math.round(l.length/2);for(a in s)c++,d=a in r.ltr||a in r.rtl,this.buildRadioInputs(s[a],a,d).appendTo(c<=l?n:i)},getLangBoxes:function(){return this.getContentElement("langs","langBox").getElement()},contents:function(e,t){var i=[],n=t.config.scayt_uiTabs;if(!n)return e;for(var a in n)1==n[a]&&i.push(e[a]);return i.push(e[e.length-1]),i}(i,e)};return o});