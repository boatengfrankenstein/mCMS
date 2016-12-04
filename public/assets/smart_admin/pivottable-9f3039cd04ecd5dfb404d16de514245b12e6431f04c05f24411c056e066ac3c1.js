(function(){var e;(e=function(e){return"object"==typeof exports&&"object"==typeof module?e(require("jquery"),require("c3")):"function"==typeof define&&define.amd?define(["jquery","c3"],e):e(jQuery,c3)})(function(e,t){var n;return n=function(n){return null==n&&(n={}),function(i,o){var r,s,a,l,c,u,d,h,f,p,m,g,v,b,T,E,y,C,D,I,R,O,_,w,S,x,k,K,N,A,L,F,P,B,M,$,H,j,q,U,z,W,V,G,X,Y,J,Q,Z,ee,te,ne;if(v={localeStrings:{vs:"vs",by:"by"},c3:{}},o=e.extend(!0,v,o),null==(a=o.c3).size&&(a.size={}),null==(l=o.c3.size).width&&(l.width=window.innerWidth/1.4),null==(c=o.c3.size).height&&(c.height=window.innerHeight/1.4-50),null==n.type&&(n.type="line"),W=i.getRowKeys(),0===W.length&&W.push([]),p=i.getColKeys(),0===p.length&&p.push([]),C=function(){var e,t,n;for(n=[],e=0,t=p.length;t>e;e++)E=p[e],n.push(E.join("-"));return n}(),j=0,b=i.aggregatorName,i.valAttrs.length&&(b+="("+i.valAttrs.join(", ")+")"),"scatter"===n.type)for(G={x:{},y:{},t:{}},s=i.rowAttrs.concat(i.colAttrs),Q=null!=(F=s[0])?F:"",y=null!=(P=s[1])?P:"",T=s.slice(2).join("-"),J=Q,""!==y&&(J+=" "+o.localeStrings.vs+" "+y),""!==T&&(J+=" "+o.localeStrings.by+" "+T),D=0,_=W.length;_>D;D++)for(z=W[D],I=0,w=p.length;w>I;I++)f=p[I],r=i.getAggregator(z,f),null!=r.value()&&(ee=z.concat(f),X=ee.slice(2).join("-"),""===X&&(X="series"),null==(u=G.x)[X]&&(u[X]=[]),null==(d=G.y)[X]&&(d[X]=[]),null==(h=G.t)[X]&&(h[X]=[]),G.y[X].push(null!=(B=ee[0])?B:0),G.x[X].push(null!=(M=ee[1])?M:0),G.t[X].push(r.format(r.value())));else{for(N=0,R=0,S=C.length;S>R;R++)te=C[R],N+=te.length;for(N>50&&(j=45),m=[],O=0,x=W.length;x>O;O++){for(z=W[O],U=z.join("-"),q=[""===U?i.aggregatorName:U],K=0,k=p.length;k>K;K++)f=p[K],Z=parseFloat(i.getAggregator(z,f).value()),isFinite(Z)?1>Z?q.push(Z.toPrecision(3)):q.push(Z.toFixed(3)):q.push(null);m.push(q)}Q=i.aggregatorName+(i.valAttrs.length?"("+i.valAttrs.join(", ")+")":""),y=i.colAttrs.join("-"),J=b,""!==y&&(J+=" "+o.localeStrings.vs+" "+y),T=i.rowAttrs.join("-"),""!==T&&(J+=" "+o.localeStrings.by+" "+T)}if(Y=e("<p>",{style:"text-align: center; font-weight: bold"}),Y.text(J),L={axis:{y:{label:Q},x:{label:y,tick:{rotate:j,multiline:!1}}},data:{type:n.type},tooltip:{grouped:!1},color:{pattern:["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac"]}},e.extend(!0,L,o.c3),"scatter"===n.type){ne={},A=0,g=[];for(V in G.x)A+=1,ne[V]=V+"_x",g.push([V+"_x"].concat(G.x[V])),g.push([V].concat(G.y[V]));L.data.xs=ne,L.data.columns=g,L.axis.x.tick={fit:!1},1===A&&(L.legend={show:!1}),L.tooltip.format={title:function(){return b},name:function(){return""},value:function(e,t,n,i){return G.t[n][i]}}}else L.axis.x.type="category",L.axis.x.categories=C,L.data.columns=m;return null!=n.stacked&&(L.data.groups=[function(){var e,t,n;for(n=[],t=0,e=W.length;e>t;t++)te=W[t],n.push(te.join("-"));return n}()]),$=e("<div>",{style:"display:none;"}).appendTo(e("body")),H=e("<div>").appendTo($),L.bindto=H[0],t.generate(L),H.detach(),$.remove(),e("<div>").append(Y,H)}},e.pivotUtilities.c3_renderers={"Line Chart":n(),"Bar Chart":n({type:"bar"}),"Stacked Bar Chart":n({type:"bar",stacked:!0}),"Area Chart":n({type:"area",stacked:!0}),"Scatter Chart":n({type:"scatter"})}})}).call(this),function(){var e;(e=function(e){return"object"==typeof exports&&"object"==typeof module?e(require("jquery"),require("d3")):"function"==typeof define&&define.amd?define(["jquery","d3"],e):e(jQuery,d3)})(function(e,t){return e.pivotUtilities.d3_renderers={Treemap:function(n,i){var o,r,s,a,l,c,u,d,h,f,p,m,g;for(s={localeStrings:{},d3:{width:function(){return e(window).width()/1.4},height:function(){return e(window).height()/1.4}}},i=e.extend(s,i),d=e("<div>").css({width:"100%",height:"100%"}),f={name:"All",children:[]},o=function(e,t,n){var i,r,s,a,l,c;if(0===t.length)return void(e.value=n);for(null==e.children&&(e.children=[]),c=t.shift(),l=e.children,r=0,s=l.length;s>r;r++)if(i=l[r],i.name===c)return void o(i,t,n);return a={name:c},o(a,t,n),e.children.push(a)},u=n.getRowKeys(),l=0,c=u.length;c>l;l++)h=u[l],m=n.getAggregator(h,[]).value(),null!=m&&o(f,h,m);return r=t.scale.category10(),g=i.d3.width(),a=i.d3.height(),p=t.layout.treemap().size([g,a]).sticky(!0).value(function(e){return e.size}),t.select(d[0]).append("div").style("position","relative").style("width",g+"px").style("height",a+"px").datum(f).selectAll(".node").data(p.padding([15,0,0,0]).value(function(e){return e.value}).nodes).enter().append("div").attr("class","node").style("background",function(e){return null!=e.children?"lightgrey":r(e.name)}).text(function(e){return e.name}).call(function(){this.style("left",function(e){return e.x+"px"}).style("top",function(e){return e.y+"px"}).style("width",function(e){return Math.max(0,e.dx-1)+"px"}).style("height",function(e){return Math.max(0,e.dy-1)+"px"})}),d}}})}.call(this),function(){var e,t=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1},n=[].slice,i=function(e,t){return function(){return e.apply(t,arguments)}},o={}.hasOwnProperty;(e=function(e){return"object"==typeof exports&&"object"==typeof module?e(require("jquery")):"function"==typeof define&&define.amd?define(["jquery"],e):e(jQuery)})(function(e){var r,s,a,l,c,u,d,h,f,p,m,g,v,b,T,E,y,C;return s=function(e,t,n){var i,o,r,s;for(e+="",o=e.split("."),r=o[0],s=o.length>1?n+o[1]:"",i=/(\d+)(\d{3})/;i.test(r);)r=r.replace(i,"$1"+t+"$2");return r+s},m=function(t){var n;return n={digitsAfterDecimal:2,scaler:1,thousandsSep:",",decimalSep:".",prefix:"",suffix:"",showZero:!1},t=e.extend(n,t),function(e){var n;return isNaN(e)||!isFinite(e)?"":0!==e||t.showZero?(n=s((t.scaler*e).toFixed(t.digitsAfterDecimal),t.thousandsSep,t.decimalSep),""+t.prefix+n+t.suffix):""}},T=m(),E=m({digitsAfterDecimal:0}),y=m({digitsAfterDecimal:1,scaler:100,suffix:"%"}),a={count:function(e){return null==e&&(e=E),function(){return function(){return{count:0,push:function(){return this.count++},value:function(){return this.count},format:e}}}},countUnique:function(e){return null==e&&(e=E),function(n){var i;return i=n[0],function(){return{uniq:[],push:function(e){var n;if(n=e[i],t.call(this.uniq,n)<0)return this.uniq.push(e[i])},value:function(){return this.uniq.length},format:e,numInputs:null!=i?0:1}}}},listUnique:function(e){return function(n){var i;return i=n[0],function(){return{uniq:[],push:function(e){var n;if(n=e[i],t.call(this.uniq,n)<0)return this.uniq.push(e[i])},value:function(){return this.uniq.join(e)},format:function(e){return e},numInputs:null!=i?0:1}}}},sum:function(e){return null==e&&(e=T),function(t){var n;return n=t[0],function(){return{sum:0,push:function(e){if(!isNaN(parseFloat(e[n])))return this.sum+=parseFloat(e[n])},value:function(){return this.sum},format:e,numInputs:null!=n?0:1}}}},min:function(e){return null==e&&(e=T),function(t){var n;return n=t[0],function(){return{val:null,push:function(e){var t,i;if(i=parseFloat(e[n]),!isNaN(i))return this.val=Math.min(i,null!=(t=this.val)?t:i)},value:function(){return this.val},format:e,numInputs:null!=n?0:1}}}},max:function(e){return null==e&&(e=T),function(t){var n;return n=t[0],function(){return{val:null,push:function(e){var t,i;if(i=parseFloat(e[n]),!isNaN(i))return this.val=Math.max(i,null!=(t=this.val)?t:i)},value:function(){return this.val},format:e,numInputs:null!=n?0:1}}}},average:function(e){return null==e&&(e=T),function(t){var n;return n=t[0],function(){return{sum:0,len:0,push:function(e){if(!isNaN(parseFloat(e[n])))return this.sum+=parseFloat(e[n]),this.len++},value:function(){return this.sum/this.len},format:e,numInputs:null!=n?0:1}}}},sumOverSum:function(e){return null==e&&(e=T),function(t){var n,i;return i=t[0],n=t[1],function(){return{sumNum:0,sumDenom:0,push:function(e){if(isNaN(parseFloat(e[i]))||(this.sumNum+=parseFloat(e[i])),!isNaN(parseFloat(e[n])))return this.sumDenom+=parseFloat(e[n])},value:function(){return this.sumNum/this.sumDenom},format:e,numInputs:null!=i&&null!=n?0:2}}}},sumOverSumBound80:function(e,t){return null==e&&(e=!0),null==t&&(t=T),function(n){var i,o;return o=n[0],i=n[1],function(){return{sumNum:0,sumDenom:0,push:function(e){if(isNaN(parseFloat(e[o]))||(this.sumNum+=parseFloat(e[o])),!isNaN(parseFloat(e[i])))return this.sumDenom+=parseFloat(e[i])},value:function(){var t;return t=e?1:-1,(.821187207574908/this.sumDenom+this.sumNum/this.sumDenom+1.2815515655446004*t*Math.sqrt(.410593603787454/(this.sumDenom*this.sumDenom)+this.sumNum*(1-this.sumNum/this.sumDenom)/(this.sumDenom*this.sumDenom)))/(1+1.642374415149816/this.sumDenom)},format:t,numInputs:null!=o&&null!=i?0:2}}}},fractionOf:function(e,t,i){return null==t&&(t="total"),null==i&&(i=y),function(){var o;return o=1<=arguments.length?n.call(arguments,0):[],function(n,r,s){return{selector:{total:[[],[]],row:[r,[]],col:[[],s]}[t],inner:e.apply(null,o)(n,r,s),push:function(e){return this.inner.push(e)},format:i,value:function(){return this.inner.value()/n.getAggregator.apply(n,this.selector).inner.value()},numInputs:e.apply(null,o)().numInputs}}}}},l=function(e){return{Count:e.count(E),"Count Unique Values":e.countUnique(E),"List Unique Values":e.listUnique(", "),Sum:e.sum(T),"Integer Sum":e.sum(E),Average:e.average(T),Minimum:e.min(T),Maximum:e.max(T),"Sum over Sum":e.sumOverSum(T),"80% Upper Bound":e.sumOverSumBound80(!0,T),"80% Lower Bound":e.sumOverSumBound80(!1,T),"Sum as Fraction of Total":e.fractionOf(e.sum(),"total",y),"Sum as Fraction of Rows":e.fractionOf(e.sum(),"row",y),"Sum as Fraction of Columns":e.fractionOf(e.sum(),"col",y),"Count as Fraction of Total":e.fractionOf(e.count(),"total",y),"Count as Fraction of Rows":e.fractionOf(e.count(),"row",y),"Count as Fraction of Columns":e.fractionOf(e.count(),"col",y)}}(a),v={Table:function(e,t){return g(e,t)},"Table Barchart":function(t,n){return e(g(t,n)).barchart()},Heatmap:function(t,n){return e(g(t,n)).heatmap("heatmap",n)},"Row Heatmap":function(t,n){return e(g(t,n)).heatmap("rowheatmap",n)},"Col Heatmap":function(t,n){return e(g(t,n)).heatmap("colheatmap",n)}},h={en:{aggregators:l,renderers:v,localeStrings:{renderError:"An error occurred rendering the PivotTable results.",computeError:"An error occurred computing the PivotTable results.",uiRenderError:"An error occurred rendering the PivotTable UI.",selectAll:"Select All",selectNone:"Select None",tooMany:"(too many to list)",filterResults:"Filter results",totals:"Totals",vs:"vs",by:"by"}}},f=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],c=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],C=function(e){return("0"+e).substr(-2,2)},u={bin:function(e,t){return function(n){return n[e]-n[e]%t}},dateFormat:function(e,t,n,i,o){var r;return null==n&&(n=!1),null==i&&(i=f),null==o&&(o=c),r=n?"UTC":"",function(n){var s;return s=new Date(Date.parse(n[e])),isNaN(s)?"":t.replace(/%(.)/g,function(e,t){switch(t){case"y":return s["get"+r+"FullYear"]();case"m":return C(s["get"+r+"Month"]()+1);case"n":return i[s["get"+r+"Month"]()];case"d":return C(s["get"+r+"Date"]());case"w":return o[s["get"+r+"Day"]()];case"x":return s["get"+r+"Day"]();case"H":return C(s["get"+r+"Hours"]());case"M":return C(s["get"+r+"Minutes"]());case"S":return C(s["get"+r+"Seconds"]());default:return"%"+t}})}}},p=function(){return function(e,t){var n,i,o,r,s,a,l;if(a=/(\d+)|(\D+)/g,s=/\d/,l=/^0/,"number"==typeof e||"number"==typeof t)return isNaN(e)?1:isNaN(t)?-1:e-t;if(n=String(e).toLowerCase(),o=String(t).toLowerCase(),n===o)return 0;if(!s.test(n)||!s.test(o))return n>o?1:-1;for(n=n.match(a),o=o.match(a);n.length&&o.length;)if(i=n.shift(),r=o.shift(),i!==r)return s.test(i)&&s.test(r)?i.replace(l,".0")-r.replace(l,".0"):i>r?1:-1;return n.length-o.length}}(this),b=function(e){var t,n,i;n={};for(t in e)i=e[t],n[i]=t;return function(e,t){return null!=n[e]&&null!=n[t]?n[e]-n[t]:null!=n[e]?-1:null!=n[t]?1:p(e,t)}},d=function(t,n){var i;return i=t(n),e.isFunction(i)?i:p},r=function(){function t(e,n){this.getAggregator=i(this.getAggregator,this),this.getRowKeys=i(this.getRowKeys,this),this.getColKeys=i(this.getColKeys,this),this.sortKeys=i(this.sortKeys,this),this.arrSort=i(this.arrSort,this),this.aggregator=n.aggregator,this.aggregatorName=n.aggregatorName,this.colAttrs=n.cols,this.rowAttrs=n.rows,this.valAttrs=n.vals,this.sorters=n.sorters,this.tree={},this.rowKeys=[],this.colKeys=[],this.rowTotals={},this.colTotals={},this.allTotal=this.aggregator(this,[],[]),this.sorted=!1,t.forEachRecord(e,n.derivedAttributes,function(e){return function(t){if(n.filter(t))return e.processRecord(t)}}(this))}return t.forEachRecord=function(t,n,i){var r,s,a,l,c,u,d,h,f,p,m,g;if(r=e.isEmptyObject(n)?i:function(e){var t,o,r;for(t in n)r=n[t],e[t]=null!=(o=r(e))?o:e[t];return i(e)},e.isFunction(t))return t(r);if(e.isArray(t)){if(e.isArray(t[0])){p=[];for(a in t)if(o.call(t,a)&&(s=t[a],a>0)){h={},f=t[0];for(l in f)o.call(f,l)&&(c=f[l],h[c]=s[l]);p.push(r(h))}return p}for(m=[],u=0,d=t.length;u<d;u++)h=t[u],m.push(r(h));return m}if(t instanceof jQuery)return g=[],e("thead > tr > th",t).each(function(){return g.push(e(this).text())}),e("tbody > tr",t).each(function(){return h={},e("td",this).each(function(t){return h[g[t]]=e(this).text()}),r(h)});throw new Error("unknown input format")},t.convertToArray=function(e){var n;return n=[],t.forEachRecord(e,{},function(e){return n.push(e)}),n},t.prototype.arrSort=function(e){var t,n;return n=function(){var n,i,o;for(o=[],n=0,i=e.length;n<i;n++)t=e[n],o.push(d(this.sorters,t));return o}.call(this),function(e,t){var i,r,s;for(r in n)if(o.call(n,r)&&(s=n[r],i=s(e[r],t[r]),0!==i))return i;return 0}},t.prototype.sortKeys=function(){if(!this.sorted)return this.sorted=!0,this.rowKeys.sort(this.arrSort(this.rowAttrs)),this.colKeys.sort(this.arrSort(this.colAttrs))},t.prototype.getColKeys=function(){return this.sortKeys(),this.colKeys},t.prototype.getRowKeys=function(){return this.sortKeys(),this.rowKeys},t.prototype.processRecord=function(e){var t,n,i,o,r,s,a,l,c,u,d,h,f;for(t=[],h=[],l=this.colAttrs,o=0,r=l.length;o<r;o++)f=l[o],t.push(null!=(c=e[f])?c:"null");for(u=this.rowAttrs,a=0,s=u.length;a<s;a++)f=u[a],h.push(null!=(d=e[f])?d:"null");if(i=h.join(String.fromCharCode(0)),n=t.join(String.fromCharCode(0)),this.allTotal.push(e),0!==h.length&&(this.rowTotals[i]||(this.rowKeys.push(h),this.rowTotals[i]=this.aggregator(this,h,[])),this.rowTotals[i].push(e)),0!==t.length&&(this.colTotals[n]||(this.colKeys.push(t),this.colTotals[n]=this.aggregator(this,[],t)),this.colTotals[n].push(e)),0!==t.length&&0!==h.length)return this.tree[i]||(this.tree[i]={}),this.tree[i][n]||(this.tree[i][n]=this.aggregator(this,h,t)),this.tree[i][n].push(e)},t.prototype.getAggregator=function(e,t){var n,i,o;return o=e.join(String.fromCharCode(0)),i=t.join(String.fromCharCode(0)),n=0===e.length&&0===t.length?this.allTotal:0===e.length?this.colTotals[i]:0===t.length?this.rowTotals[o]:this.tree[o][i],null!=n?n:{value:function(){return null},format:function(){return""}}},t}(),e.pivotUtilities={aggregatorTemplates:a,aggregators:l,renderers:v,derivers:u,locales:h,naturalSort:p,numberFormat:m,sortAs:b,PivotData:r},g=function(t,n){var i,r,s,a,l,c,u,d,h,f,p,m,g,v,b,T,E,y,C,D,I,R,O;c={localeStrings:{totals:"Totals"}},n=e.extend(c,n),s=t.colAttrs,p=t.rowAttrs,g=t.getRowKeys(),l=t.getColKeys(),f=document.createElement("table"),f.className="pvtTable",v=function(e,t,n){var i,o,r,s,a,l,c,u;if(0!==t){for(s=!0,u=i=0,a=n;0<=a?i<=a:i>=a;u=0<=a?++i:--i)e[t-1][u]!==e[t][u]&&(s=!1);if(s)return-1}for(o=0;t+o<e.length;){for(c=!1,u=r=0,l=n;0<=l?r<=l:r>=l;u=0<=l?++r:--r)e[t][u]!==e[t+o][u]&&(c=!0);if(c)break;o++}return o},y=document.createElement("thead");for(d in s)if(o.call(s,d)){r=s[d],D=document.createElement("tr"),0===parseInt(d)&&0!==p.length&&(E=document.createElement("th"),E.setAttribute("colspan",p.length),E.setAttribute("rowspan",s.length),D.appendChild(E)),E=document.createElement("th"),E.className="pvtAxisLabel",E.textContent=r,D.appendChild(E);for(u in l)o.call(l,u)&&(a=l[u],O=v(l,parseInt(u),parseInt(d)),O!==-1&&(E=document.createElement("th"),E.className="pvtColLabel",E.textContent=a[d],E.setAttribute("colspan",O),parseInt(d)===s.length-1&&0!==p.length&&E.setAttribute("rowspan",2),D.appendChild(E)));0===parseInt(d)&&(E=document.createElement("th"),E.className="pvtTotalLabel",E.innerHTML=n.localeStrings.totals,E.setAttribute("rowspan",s.length+(0===p.length?0:1)),D.appendChild(E)),y.appendChild(D)}if(0!==p.length){D=document.createElement("tr");for(u in p)o.call(p,u)&&(h=p[u],E=document.createElement("th"),E.className="pvtAxisLabel",E.textContent=h,D.appendChild(E));E=document.createElement("th"),0===s.length&&(E.className="pvtTotalLabel",E.innerHTML=n.localeStrings.totals),D.appendChild(E),y.appendChild(D)}f.appendChild(y),b=document.createElement("tbody");for(u in g)if(o.call(g,u)){m=g[u],D=document.createElement("tr");for(d in m)o.call(m,d)&&(I=m[d],O=v(g,parseInt(u),parseInt(d)),O!==-1&&(E=document.createElement("th"),E.className="pvtRowLabel",E.textContent=I,E.setAttribute("rowspan",O),parseInt(d)===p.length-1&&0!==s.length&&E.setAttribute("colspan",2),D.appendChild(E)));for(d in l)o.call(l,d)&&(a=l[d],i=t.getAggregator(m,a),R=i.value(),T=document.createElement("td"),T.className="pvtVal row"+u+" col"+d,T.textContent=i.format(R),T.setAttribute("data-value",R),D.appendChild(T));C=t.getAggregator(m,[]),R=C.value(),T=document.createElement("td"),T.className="pvtTotal rowTotal",T.textContent=C.format(R),T.setAttribute("data-value",R),T.setAttribute("data-for","row"+u),D.appendChild(T),b.appendChild(D)}D=document.createElement("tr"),E=document.createElement("th"),E.className="pvtTotalLabel",E.innerHTML=n.localeStrings.totals,E.setAttribute("colspan",p.length+(0===s.length?0:1)),D.appendChild(E);for(d in l)o.call(l,d)&&(a=l[d],C=t.getAggregator([],a),R=C.value(),T=document.createElement("td"),T.className="pvtTotal colTotal",T.textContent=C.format(R),T.setAttribute("data-value",R),T.setAttribute("data-for","col"+d),D.appendChild(T));return C=t.getAggregator([],[]),R=C.value(),T=document.createElement("td"),T.className="pvtGrandTotal",T.textContent=C.format(R),T.setAttribute("data-value",R),D.appendChild(T),b.appendChild(D),f.appendChild(b),f.setAttribute("data-numrows",g.length),f.setAttribute("data-numcols",l.length),f},e.fn.pivot=function(t,n){var i,o,s,l,c;i={cols:[],rows:[],vals:[],dataClass:r,filter:function(){return!0},aggregator:a.count()(),aggregatorName:"Count",sorters:function(){},derivedAttributes:{},renderer:g,rendererOptions:null,localeStrings:h.en.localeStrings},n=e.extend(i,n),l=null;try{s=new n.dataClass(t,n);try{l=n.renderer(s,n.rendererOptions)}catch(t){o=t,"undefined"!=typeof console&&null!==console&&console.error(o.stack),l=e("<span>").html(n.localeStrings.renderError)}}catch(t){o=t,"undefined"!=typeof console&&null!==console&&console.error(o.stack),l=e("<span>").html(n.localeStrings.computeError)}for(c=this[0];c.hasChildNodes();)c.removeChild(c.lastChild);return this.append(l)},e.fn.pivotUI=function(n,i,s,a){var l,c,u,f,m,g,v,b,T,E,y,C,D,I,R,O,_,w,S,x,k,K,N,A,L,F,P,B,M,$,H,j,q,U,z,W,V,G,X,Y;null==s&&(s=!1),null==a&&(a="en"),null==h[a]&&(a="en"),v={derivedAttributes:{},aggregators:h[a].aggregators,renderers:h[a].renderers,hiddenAttributes:[],menuLimit:200,cols:[],rows:[],vals:[],dataClass:r,exclusions:{},inclusions:{},unusedAttrsVertical:85,autoSortUnusedAttrs:!1,rendererOptions:{localeStrings:h[a].localeStrings},onRefresh:null,filter:function(){return!0},sorters:function(){},localeStrings:h[a].localeStrings},T=this.data("pivotUIOptions"),k=null==T||s?e.extend(v,i):T;try{n=r.convertToArray(n),U=function(){var e,t;e=n[0],t=[];for(D in e)o.call(e,D)&&t.push(D);return t}(),A=k.derivedAttributes;for(m in A)o.call(A,m)&&t.call(U,m)<0&&U.push(m);for(f={},I=0,R=U.length;I<R;I++)Y=U[I],f[Y]={};r.forEachRecord(n,k.derivedAttributes,function(e){var t,n,i;n=[];for(D in e)o.call(e,D)&&(i=e[D],k.filter(e)&&(null==i&&(i="null"),null==(t=f[D])[i]&&(t[i]=0),n.push(f[D][i]++)));return n}),V=e("<table>",{"class":"pvtUi"}).attr("cellpadding",5),j=e("<td>"),H=e("<select>").addClass("pvtRenderer").appendTo(j).bind("change",function(){return M()}),L=k.renderers;for(Y in L)o.call(L,Y)&&e("<option>").val(Y).html(Y).appendTo(H);if(g=e("<td>").addClass("pvtAxisContainer pvtUnused"),q=function(){var e,n,i;for(i=[],n=0,e=U.length;n<e;n++)m=U[n],t.call(k.hiddenAttributes,m)<0&&i.push(m);return i}(),X=!1,G="auto"===k.unusedAttrsVertical?120:parseInt(k.unusedAttrsVertical),!isNaN(G)){for(u=0,S=0,O=q.length;S<O;S++)l=q[S],u+=l.length;X=u>G}k.unusedAttrsVertical===!0||X?g.addClass("pvtVertList"):g.addClass("pvtHorizList"),E=function(n){var i,o,r,s,a,l,c,u,h,p,m,v,b,T,E;if(c=function(){var e;e=[];for(D in f[n])e.push(D);return e}(),l=!1,E=e("<div>").addClass("pvtFilterBox").hide(),E.append(e("<h4>").text(n+" ("+c.length+")")),c.length>k.menuLimit)E.append(e("<p>").html(k.localeStrings.tooMany));else for(o=e("<p>").appendTo(E),o.append(e("<button>",{type:"button"}).html(k.localeStrings.selectAll).bind("click",function(){return E.find("input:visible").prop("checked",!0)})),o.append(e("<button>",{type:"button"}).html(k.localeStrings.selectNone).bind("click",function(){return E.find("input:visible").prop("checked",!1)})),o.append(e("<br>")),o.append(e("<input>",{type:"text",placeholder:k.localeStrings.filterResults,"class":"pvtSearch"}).bind("keyup",function(){var t;return t=e(this).val().toLowerCase(),E.find(".pvtCheckContainer p").each(function(){var n;return n=e(this).text().toLowerCase().indexOf(t),n!==-1?e(this).show():e(this).hide()})})),r=e("<div>").addClass("pvtCheckContainer").appendTo(E),p=c.sort(d(k.sorters,n)),h=0,u=p.length;h<u;h++)D=p[h],T=f[n][D],s=e("<label>"),a=!1,k.inclusions[n]?a=t.call(k.inclusions[n],D)<0:k.exclusions[n]&&(a=t.call(k.exclusions[n],D)>=0),l||(l=a),e("<input>").attr("type","checkbox").addClass("pvtFilter").attr("checked",!a).data("filter",[n,D]).appendTo(s),s.append(e("<span>").text(D)),s.append(e("<span>").text(" ("+T+")")),r.append(e("<p>").append(s));return b=function(){var e;return e=E.find("[type='checkbox']").length-E.find("[type='checkbox']:checked").length,e>0?i.addClass("pvtFilteredAttribute"):i.removeClass("pvtFilteredAttribute"),c.length>k.menuLimit?E.toggle():E.toggle(0,M)},e("<p>").appendTo(E).append(e("<button>",{type:"button"}).text("OK").bind("click",b)),m=function(t){var n,i,o;return o=e(t.currentTarget).position(),n=o.left,i=o.top,E.css({left:n+10,top:i+10}).toggle(),E.find(".pvtSearch").val(""),E.find(".pvtCheckContainer p").show()},v=e("<span>").addClass("pvtTriangle").html(" &#x25BE;").bind("click",m),i=e("<li>").addClass("axis_"+y).append(e("<span>").addClass("pvtAttr").text(n).data("attrName",n).append(v)),l&&i.addClass("pvtFilteredAttribute"),g.append(i).append(E),i.bind("dblclick",m)};for(y in q)o.call(q,y)&&(m=q[y],E(m));z=e("<tr>").appendTo(V),c=e("<select>").addClass("pvtAggregator").bind("change",function(){return M()}),F=k.aggregators;for(Y in F)o.call(F,Y)&&c.append(e("<option>").val(Y).html(Y));for(e("<td>").addClass("pvtVals").appendTo(z).append(c).append(e("<br>")),e("<td>").addClass("pvtAxisContainer pvtHorizList pvtCols").appendTo(z),W=e("<tr>").appendTo(V),W.append(e("<td>").addClass("pvtAxisContainer pvtRows").attr("valign","top")),K=e("<td>").attr("valign","top").addClass("pvtRendererArea").appendTo(W),k.unusedAttrsVertical===!0||X?(V.find("tr:nth-child(1)").prepend(j),V.find("tr:nth-child(2)").prepend(g)):V.prepend(e("<tr>").append(j).append(g)),this.html(V),P=k.cols,x=0,_=P.length;x<_;x++)Y=P[x],this.find(".pvtCols").append(this.find(".axis_"+e.inArray(Y,q)));for(B=k.rows,N=0,w=B.length;N<w;N++)Y=B[N],this.find(".pvtRows").append(this.find(".axis_"+e.inArray(Y,q)));null!=k.aggregatorName&&this.find(".pvtAggregator").val(k.aggregatorName),null!=k.rendererName&&this.find(".pvtRenderer").val(k.rendererName),C=!0,$=function(i){return function(){var o,r,s,a,l,u,d,h,f,m,g,v,b,T,E;if(v={derivedAttributes:k.derivedAttributes,localeStrings:k.localeStrings,rendererOptions:k.rendererOptions,sorters:k.sorters,cols:[],rows:[],dataClass:k.dataClass},u=null!=(f=k.aggregators[c.val()]([])().numInputs)?f:0,E=[],i.find(".pvtRows li span.pvtAttr").each(function(){return v.rows.push(e(this).data("attrName"))}),i.find(".pvtCols li span.pvtAttr").each(function(){return v.cols.push(e(this).data("attrName"))}),i.find(".pvtVals select.pvtAttrDropdown").each(function(){return 0===u?e(this).remove():(u--,""!==e(this).val()?E.push(e(this).val()):void 0)}),0!==u)for(h=i.find(".pvtVals"),Y=g=0,m=u;0<=m?g<m:g>m;Y=0<=m?++g:--g){for(l=e("<select>").addClass("pvtAttrDropdown").append(e("<option>")).bind("change",function(){return M()}),b=0,a=q.length;b<a;b++)o=q[b],l.append(e("<option>").val(o).text(o));h.append(l)}if(C&&(E=k.vals,y=0,i.find(".pvtVals select.pvtAttrDropdown").each(function(){return e(this).val(E[y]),y++}),C=!1),v.aggregatorName=c.val(),v.vals=E,v.aggregator=k.aggregators[c.val()](E),v.renderer=k.renderers[H.val()],r={},i.find("input.pvtFilter").not(":checked").each(function(){var t;return t=e(this).data("filter"),null!=r[t[0]]?r[t[0]].push(t[1]):r[t[0]]=[t[1]]}),s={},i.find("input.pvtFilter:checked").each(function(){var t;if(t=e(this).data("filter"),null!=r[t[0]])return null!=s[t[0]]?s[t[0]].push(t[1]):s[t[0]]=[t[1]]}),v.filter=function(e){var n,i;if(!k.filter(e))return!1;for(D in r)if(n=r[D],i=""+e[D],t.call(n,i)>=0)return!1;return!0},K.pivot(n,v),d=e.extend(k,{cols:v.cols,rows:v.rows,vals:E,exclusions:r,inclusions:s,inclusionsInfo:s,aggregatorName:c.val(),rendererName:H.val()}),i.data("pivotUIOptions",d),k.autoSortUnusedAttrs&&(T=i.find("td.pvtUnused.pvtAxisContainer"),e(T).children("li").sort(function(t,n){return p(e(t).text(),e(n).text())}).appendTo(T)),K.css("opacity",1),null!=k.onRefresh)return k.onRefresh(d)}}(this),M=function(){return function(){return K.css("opacity",.5),setTimeout($,10)}}(this),M(),this.find(".pvtAxisContainer").sortable({update:function(e,t){if(null==t.sender)return M()},connectWith:this.find(".pvtAxisContainer"),items:"li",placeholder:"pvtPlaceholder"})}catch(e){b=e,"undefined"!=typeof console&&null!==console&&console.error(b.stack),this.html(k.localeStrings.uiRenderError)}return this},e.fn.heatmap=function(t,n){var i,o,r,s,a,l,c,u,d,h,f;switch(null==t&&(t="heatmap"),u=this.data("numrows"),c=this.data("numcols"),i=null!=n&&null!=(d=n.heatmap)?d.colorScaleGenerator:void 0,null==i&&(i=function(e){var t,n;return n=Math.min.apply(Math,e),t=Math.max.apply(Math,e),function(e){var i;return i=255-Math.round(255*(e-n)/(t-n)),"rgb(255,"+i+","+i+")"}}),o=function(t){return function(n){var o,r,s;return r=function(i){return t.find(n).each(function(){var t;if(t=e(this).data("value"),null!=t&&isFinite(t))return i(t,e(this))})},s=[],r(function(e){return s.push(e)}),o=i(s),r(function(e,t){return t.css("background-color",o(e))})}}(this),t){case"heatmap":o(".pvtVal");break;case"rowheatmap":for(r=a=0,h=u;0<=h?a<h:a>h;r=0<=h?++a:--a)o(".pvtVal.row"+r);break;case"colheatmap":for(s=l=0,f=c;0<=f?l<f:l>f;s=0<=f?++l:--l)o(".pvtVal.col"+s)}return o(".pvtTotal.rowTotal"),o(".pvtTotal.colTotal"),this},e.fn.barchart=function(){var t,n,i,o,r,s;for(r=this.data("numrows"),o=this.data("numcols"),t=function(t){return function(n){var i,o,r,s;return i=function(i){return t.find(n).each(function(){var t;if(t=e(this).data("value"),null!=t&&isFinite(t))return i(t,e(this))})},s=[],i(function(e){return s.push(e)}),o=Math.max.apply(Math,s),r=function(e){return 100*e/(1.4*o)},i(function(t,n){var i,o;return i=n.text(),o=e("<div>").css({position:"relative",height:"55px"}),o.append(e("<div>").css({position:"absolute",bottom:0,left:0,right:0,height:r(t)+"%","background-color":"gray"})),o.append(e("<div>").text(i).css({position:"relative","padding-left":"5px","padding-right":"5px"})),n.css({padding:0,"padding-top":"5px","text-align":"center"}).html(o)})}}(this),n=i=0,s=r;0<=s?i<s:i>s;n=0<=s?++i:--i)t(".pvtVal.row"+n);return t(".pvtTotal.colTotal"),this}})}.call(this);