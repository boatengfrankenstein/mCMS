!function(){function e(e){for(var t,i=0,a=0,n=0,o=e.$.rows.length;n<o;n++){t=e.$.rows[n];for(var r,l=i=0,s=t.cells.length;l<s;l++)r=t.cells[l],i+=r.colSpan;i>a&&(a=i)}return a}function t(e){return function(){var t=this.getValue(),t=!!(CKEDITOR.dialog.validate.integer()(t)&&0<t);return t||(alert(e),this.select()),t}}function i(i,o){var r=function(e){return new CKEDITOR.dom.element(e,i.document)},l=i.editable(),s=i.plugins.dialogadvtab;return{title:i.lang.table.title,minWidth:310,minHeight:CKEDITOR.env.ie?310:280,onLoad:function(){var e=this,t=e.getContentElement("advanced","advStyles");t&&t.on("change",function(){var t=this.getStyle("width",""),i=e.getContentElement("info","txtWidth");i&&i.setValue(t,!0),t=this.getStyle("height",""),(i=e.getContentElement("info","txtHeight"))&&i.setValue(t,!0)})},onShow:function(){var e,t=i.getSelection(),a=t.getRanges(),n=this.getContentElement("info","txtRows"),r=this.getContentElement("info","txtCols"),l=this.getContentElement("info","txtWidth"),s=this.getContentElement("info","txtHeight");"tableProperties"==o&&((t=t.getSelectedElement())&&t.is("table")?e=t:0<a.length&&(CKEDITOR.env.webkit&&a[0].shrink(CKEDITOR.NODE_ELEMENT),e=i.elementPath(a[0].getCommonAncestor(!0)).contains("table",1)),this._.selectedElement=e),e?(this.setupContent(e),n&&n.disable(),r&&r.disable()):(n&&n.enable(),r&&r.enable()),l&&l.onChange(),s&&s.onChange()},onOk:function(){var e=i.getSelection(),t=this._.selectedElement&&e.createBookmarks(),a=this._.selectedElement||r("table"),n={};if(this.commitContent(n,a),n.info){if(n=n.info,!this._.selectedElement)for(var o=a.append(r("tbody")),l=parseInt(n.txtRows,10)||0,s=parseInt(n.txtCols,10)||0,c=0;c<l;c++)for(var d=o.append(r("tr")),u=0;u<s;u++)d.append(r("td")).appendBogus();if(l=n.selHeaders,!a.$.tHead&&("row"==l||"both"==l)){for(d=a.getElementsByTag("thead").getItem(0),o=a.getElementsByTag("tbody").getItem(0),s=o.getElementsByTag("tr").getItem(0),d||(d=new CKEDITOR.dom.element("thead"),d.insertBefore(o)),c=0;c<s.getChildCount();c++)o=s.getChild(c),o.type!=CKEDITOR.NODE_ELEMENT||o.data("cke-bookmark")||(o.renameNode("th"),o.setAttribute("scope","col"));d.append(s.remove())}if(null!==a.$.tHead&&"row"!=l&&"both"!=l){for(d=new CKEDITOR.dom.element(a.$.tHead),o=a.getElementsByTag("tbody").getItem(0),u=o.getFirst();0<d.getChildCount();){for(s=d.getFirst(),c=0;c<s.getChildCount();c++)o=s.getChild(c),o.type==CKEDITOR.NODE_ELEMENT&&(o.renameNode("td"),o.removeAttribute("scope"));s.insertBefore(u)}d.remove()}if(!this.hasColumnHeaders&&("col"==l||"both"==l))for(d=0;d<a.$.rows.length;d++)o=new CKEDITOR.dom.element(a.$.rows[d].cells[0]),o.renameNode("th"),o.setAttribute("scope","row");if(this.hasColumnHeaders&&"col"!=l&&"both"!=l)for(c=0;c<a.$.rows.length;c++)d=new CKEDITOR.dom.element(a.$.rows[c]),"tbody"==d.getParent().getName()&&(o=new CKEDITOR.dom.element(d.$.cells[0]),o.renameNode("td"),o.removeAttribute("scope"));n.txtHeight?a.setStyle("height",n.txtHeight):a.removeStyle("height"),n.txtWidth?a.setStyle("width",n.txtWidth):a.removeStyle("width"),a.getAttribute("style")||a.removeAttribute("style")}if(this._.selectedElement)try{e.selectBookmarks(t)}catch(e){}else i.insertElement(a),setTimeout(function(){var e=new CKEDITOR.dom.element(a.$.rows[0].cells[0]),t=i.createRange();t.moveToPosition(e,CKEDITOR.POSITION_AFTER_START),t.select()},0)},contents:[{id:"info",label:i.lang.table.title,elements:[{type:"hbox",widths:[null,null],styles:["vertical-align:top"],children:[{type:"vbox",padding:0,children:[{type:"text",id:"txtRows","default":3,label:i.lang.table.rows,required:!0,controlStyle:"width:5em",validate:t(i.lang.table.invalidRows),setup:function(e){this.setValue(e.$.rows.length)},commit:n},{type:"text",id:"txtCols","default":2,label:i.lang.table.columns,required:!0,controlStyle:"width:5em",validate:t(i.lang.table.invalidCols),setup:function(t){this.setValue(e(t))},commit:n},{type:"html",html:"&nbsp;"},{type:"select",id:"selHeaders",requiredContent:"th","default":"",label:i.lang.table.headers,items:[[i.lang.table.headersNone,""],[i.lang.table.headersRow,"row"],[i.lang.table.headersColumn,"col"],[i.lang.table.headersBoth,"both"]],setup:function(e){var t=this.getDialog();t.hasColumnHeaders=!0;for(var i=0;i<e.$.rows.length;i++){var a=e.$.rows[i].cells[0];if(a&&"th"!=a.nodeName.toLowerCase()){t.hasColumnHeaders=!1;break}}null!==e.$.tHead?this.setValue(t.hasColumnHeaders?"both":"row"):this.setValue(t.hasColumnHeaders?"col":"")},commit:n},{type:"text",id:"txtBorder",requiredContent:"table[border]","default":i.filter.check("table[border]")?1:0,label:i.lang.table.border,controlStyle:"width:3em",validate:CKEDITOR.dialog.validate.number(i.lang.table.invalidBorder),setup:function(e){this.setValue(e.getAttribute("border")||"")},commit:function(e,t){this.getValue()?t.setAttribute("border",this.getValue()):t.removeAttribute("border")}},{id:"cmbAlign",type:"select",requiredContent:"table[align]","default":"",label:i.lang.common.align,items:[[i.lang.common.notSet,""],[i.lang.common.alignLeft,"left"],[i.lang.common.alignCenter,"center"],[i.lang.common.alignRight,"right"]],setup:function(e){this.setValue(e.getAttribute("align")||"")},commit:function(e,t){this.getValue()?t.setAttribute("align",this.getValue()):t.removeAttribute("align")}}]},{type:"vbox",padding:0,children:[{type:"hbox",widths:["5em"],children:[{type:"text",id:"txtWidth",requiredContent:"table{width}",controlStyle:"width:5em",label:i.lang.common.width,title:i.lang.common.cssLengthTooltip,"default":i.filter.check("table{width}")?500>l.getSize("width")?"100%":500:0,getValue:a,validate:CKEDITOR.dialog.validate.cssLength(i.lang.common.invalidCssLength.replace("%1",i.lang.common.width)),onChange:function(){var e=this.getDialog().getContentElement("advanced","advStyles");e&&e.updateStyle("width",this.getValue())},setup:function(e){e=e.getStyle("width"),this.setValue(e)},commit:n}]},{type:"hbox",widths:["5em"],children:[{type:"text",id:"txtHeight",requiredContent:"table{height}",controlStyle:"width:5em",label:i.lang.common.height,title:i.lang.common.cssLengthTooltip,"default":"",getValue:a,validate:CKEDITOR.dialog.validate.cssLength(i.lang.common.invalidCssLength.replace("%1",i.lang.common.height)),onChange:function(){var e=this.getDialog().getContentElement("advanced","advStyles");e&&e.updateStyle("height",this.getValue())},setup:function(e){(e=e.getStyle("height"))&&this.setValue(e)},commit:n}]},{type:"html",html:"&nbsp;"},{type:"text",id:"txtCellSpace",requiredContent:"table[cellspacing]",controlStyle:"width:3em",label:i.lang.table.cellSpace,"default":i.filter.check("table[cellspacing]")?1:0,validate:CKEDITOR.dialog.validate.number(i.lang.table.invalidCellSpacing),setup:function(e){this.setValue(e.getAttribute("cellSpacing")||"")},commit:function(e,t){this.getValue()?t.setAttribute("cellSpacing",this.getValue()):t.removeAttribute("cellSpacing")}},{type:"text",id:"txtCellPad",requiredContent:"table[cellpadding]",controlStyle:"width:3em",label:i.lang.table.cellPad,"default":i.filter.check("table[cellpadding]")?1:0,validate:CKEDITOR.dialog.validate.number(i.lang.table.invalidCellPadding),setup:function(e){this.setValue(e.getAttribute("cellPadding")||"")},commit:function(e,t){this.getValue()?t.setAttribute("cellPadding",this.getValue()):t.removeAttribute("cellPadding")}}]}]},{type:"html",align:"right",html:""},{type:"vbox",padding:0,children:[{type:"text",id:"txtCaption",requiredContent:"caption",label:i.lang.table.caption,setup:function(e){if(this.enable(),e=e.getElementsByTag("caption"),0<e.count()){e=e.getItem(0);var t=e.getFirst(CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT));t&&!t.equals(e.getBogus())?(this.disable(),this.setValue(e.getText())):(e=CKEDITOR.tools.trim(e.getText()),this.setValue(e))}},commit:function(e,t){if(this.isEnabled()){var a=this.getValue(),n=t.getElementsByTag("caption");if(a)0<n.count()?(n=n.getItem(0),n.setHtml("")):(n=new CKEDITOR.dom.element("caption",i.document),t.append(n,!0)),n.append(new CKEDITOR.dom.text(a,i.document));else if(0<n.count())for(a=n.count()-1;0<=a;a--)n.getItem(a).remove()}}},{type:"text",id:"txtSummary",bidi:!0,requiredContent:"table[summary]",label:i.lang.table.summary,setup:function(e){this.setValue(e.getAttribute("summary")||"")},commit:function(e,t){this.getValue()?t.setAttribute("summary",this.getValue()):t.removeAttribute("summary")}}]}]},s&&s.createAdvancedTab(i,null,"table")]}}var a=CKEDITOR.tools.cssLength,n=function(e){var t=this.id;e.info||(e.info={}),e.info[t]=this.getValue()};CKEDITOR.dialog.add("table",function(e){return i(e,"table")}),CKEDITOR.dialog.add("tableProperties",function(e){return i(e,"tableProperties")})}();