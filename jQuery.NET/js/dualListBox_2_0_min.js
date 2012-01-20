/*
�2011 MeadMiracle
www.meadmiracle.com
V2.0
CC GPL Licensed
*/
(function(a){function k(){}function g(){}function h(){}function l(b){if(a("#dlb-style-hack").size()===0){var d='<style type="text/css">.filter-input{height:28px}.filter-clear{top:';d+=b==="mozilla"?"0px}":"6px}";d+="</style>";a(d).appendTo("head")}}a.fn.extend({disableSelection:function(){return this.each(function(){this.onselectstart=function(){return!1};this.unselectable="on";a(this).css("-moz-user-select","none")})}});var m=[],j=function(b,d){var c=["last-active","active"],e=i(c);d&&c.pop();var f=
i(c,"li.",","),c=i(c);a(b).parent().children(f).removeClass(c);a(b).addClass(e)},i=function(b,d,c){c||(c=" ");var e="",f="";d&&(e=d);a.each(b,function(){f+=e+this+c});return a.trim(f)};k.prototype={init:function(b,d){if(b.nodeName.toLowerCase()!="select")alert("dualListBox must be called on a <select> element. Initialization failed!");else{var c=this;a.extend(!0,this._options,d);m.push(this);this._target=a(b);this._container=a("<div />",{"class":"dlb-container",id:b.id+"-dlb-container"}).append(this._wrapperTemplate("unselected-wrapper")).append(function(){return c._buildButtons()}).append(this._wrapperTemplate("selected-wrapper"));
a("ul",this._container).css({height:this._target.height(),width:this._target.width()});a(".group-wrapper",this._container).css({height:this._magicNumbers("group-wrapper-height"),width:this._magicNumbers("group-wrapper-width")});a(".buttons-wrapper a:first",this._container).css("margin-top",this._magicNumbers("first-button-margin-top"));a(".filter-input",this._container).css("width",this._magicNumbers("filter-input-width"));this._unselected=a(".unselected-wrapper",this._container);this._selected=a(".selected-wrapper",
this._container);this._itemsFromJsonArr(this._options.dataSource);this._itemsFromOptions(a("option",this._target));this.items.sort(this._options.sort);a.each(this.items,function(a){this.place(a)});a(this._target).hide().after(this._container);this._updateCounters();a(this._container).closest("form").submit(function(a){return c._options.submit.apply(this._container,a)});a(this._container).delegate("li","mousedown",function(b){a(this).focus();if(b.ctrlKey)j(this,!0);else if(b.shiftKey){var c=a(this).parent().children(".last-active");
if(c.size()){var b=a(this).siblings().andSelf(),c=a.inArray(c.get(0),b.get()),d=a.inArray(this,b.get());b.filter("li.active").removeClass("active");c<d?b.slice(c,d+1).addClass("active"):c>d&&b.slice(d,c+1).addClass("active")}else j(this)}else j(this)});a(this._container).delegate("li","dblclick",function(){var b=c.items[a(this).data("index")];b.selected?b.unselect():b.select();c._updateCounters()});a(".select-item",this._container).click(function(b){b.preventDefault();c._unselected.find(".item-list .active").each(function(){c.items[a(this).data("index")].select()});
c._updateCounters()});a(".unselect-item",this._container).click(function(b){b.preventDefault();c._selected.find(".item-list .active").each(function(){c.items[a(this).data("index")].unselect()});c._updateCounters()});a(".select-all-items",this._container).click(function(b){b.preventDefault();c._unselected.find(".item-list *").each(function(){c.items[a(this).data("index")].select()});c._updateCounters()});a(".unselect-all-items",this._container).click(function(b){b.preventDefault();c._selected.find(".item-list *").each(function(){c.items[a(this).data("index")].unselect()});
c._updateCounters()});a(".exchange-items",this._container).click(function(b){b.preventDefault();a.each(c.items,function(){this.selected?this.unselect():this.select()});c._updateCounters()});this._unselectedFilter=new h;this._unselectedFilter.init({instance:c,input:a(".filter-input",this._unselected),clear:a(".filter-clear",this._unselected),targetList:this._unselected});if(this._options.filter)this._selectedFilter=new h,this._selectedFilter.init({instance:c,input:a(".filter-input",this._selected),
clear:a(".filter-clear",this._selected),targetList:this._selected});this._container.height(function(){return a(".group-wrapper:first",this._container).height()+a(".item-counter:first",this._container).height()})}},destroy:function(){this._container.remove();this._target.show()},get:function(b){return m[b]},items:[],_options:{mode:"move",sort:function(b,a){var c=b.text.toLowerCase(),e=a.text.toLowerCase();if(c<e)return-1;if(c>e)return 1;return 0},submit:function(){return!0},filter:function(b,d){return a(b).text().toString().toLowerCase().indexOf(d.toLowerCase())==
-1},counter:function(b,a){return"Showing "+b+" of "+a},buttons:{moveSelected:!0,moveAll:!0,swap:!0},dataSource:[]},_itemsFromJsonArr:function(b){if(b.length){var d=this;a.each(b,function(){var b="selected"in this?this.selected:!1,a=new g;a.init({value:this.value,text:this.text,selected:b,instance:d});d.items.push(a)})}},_itemsFromOptions:function(b){if(b.size()){var a=this;b.each(function(){var b=new g;b.init({instance:a,option:this});a.items.push(b)})}},_magicNumbers:function(b){switch(b){case "group-wrapper-height":return b=
this._options.filter?34:2,this._target.height()+b;case "group-wrapper-width":return this._target.width()+2;case "first-button-margin-top":var a=this._options.buttons,b=this._options.filter?45:75;(a.moveAll||a.moveSelected)&&(!a.moveAll||!a.moveSelected)?b-=33:a.moveAll||(b-=65);a.swap||(b-=16);return this._target.height()/2-b;case "filter-input-width":return this._target.width()-36;default:return 0}},_wrapperTemplate:function(b){var d=a("<ul />",{"class":"item-list"}),c=a("<span />",{"class":"item-counter"}),
b=a("<div />",{"class":"group-wrapper "+b});if(this._options.filter){var e=a("<div />",{"class":"filter-wrapper"}),f=a("<input />",{type:"text","class":"filter-input",placeholder:"Filter"}),g=a("<a />",{href:"#","class":"filter-clear button"}).append(a("<span />",{"class":"cross icon"})).append(a("<span />",{"class":"btn-text"}).text("X"));e.append(f).append(g);b.append(e)}return this._options.counter?b.append(d).append(c):b.append(d)},_updateCounters:function(){if(this._options.counter){var a=this._unselected.find("li"),
d=a.filter(":visible"),c=this._selected.find("li"),e=c.filter(":visible");this._unselected.find(".item-counter").text(this._options.counter(d.size(),a.size()));this._selected.find(".item-counter").text(this._options.counter(e.size(),c.size()))}},_buildButtons:function(){var b=a("<div />",{"class":"buttons-wrapper"});this._options.buttons.swap&&b.append(a("<a />",{href:"#","class":"exchange-items button"}).append(a("<span />",{"class":"exchange icon"})).append(a("<span />",{"class":"btn-text"}).text("Exchange Items")));
this._options.buttons.moveAll&&b.prepend(a("<a />",{href:"#","class":"select-all-items button"}).append(a("<span />",{"class":"dblrightarrow icon"})).append(a("<span />",{"class":"btn-text"}).text("Select All"))).append(a("<a />",{href:"#","class":"unselect-all-items button"}).append(a("<span />",{"class":"dblleftarrow icon"})).append(a("<span />",{"class":"btn-text"}).text("Deselect All")));this._options.buttons.moveSelected&&b.prepend(a("<a />",{href:"#","class":"select-item button"}).append(a("<span />",
{"class":"rightarrow icon"})).append(a("<span />",{"class":"btn-text"}).text("Select Item(s)"))).append(a("<a />",{href:"#","class":"unselect-item button"}).append(a("<span />",{"class":"leftarrow icon"})).append(a("<span />",{"class":"btn-text"}).text("Deselect Item(s)")));return b}};g.prototype={init:function(b){this.instance=b.instance;if(b.option){this.option=a(b.option);if(this.option.attr("selected"))this.selected=!0;this.value=this.option.val();this.text=this.option.text()}else this.selected=
b.selected,this.text=b.text,this.value=b.value,this.option=a("<option />",{value:this.value}).text(this.text).appendTo(this._instance.target);this.listItem=a("<li />",{"data-value":this.value,"class":"draggable"}).text(this.text).disableSelection()},value:"",text:"",selected:!1,option:null,listItem:null,select:function(){if(this.listItem.is(":visible"))return this.insertIn(a(".selected-wrapper .item-list",this.instance._container)),this.option.attr("selected","selected"),this.selected=!0},unselect:function(){if(this.listItem.is(":visible"))return this.insertIn(a(".unselected-wrapper .item-list",
this.instance._container)),this.option.removeAttr("selected"),this.selected=!1,!0},setSelected:function(a){return a?this.select:this.unselect},place:function(b){this.listItem.data("index",b);this.selected?this.listItem.appendTo(a(".selected-wrapper .item-list",this.instance._container)):this.listItem.appendTo(a(".unselected-wrapper .item-list",this.instance._container))},insertIn:function(b){this.listItem.removeClass("active last-active");var d=b.children("li");if(d.size()==0)b.append(this.listItem);
else{var c=[],b={text:this.text,value:this.value};c.push(b);d.each(function(){c.push({text:a(this).text(),value:a(this).data("value")})});c.sort(this.instance._options.sort);b=a.inArray(b,c);b==d.size()?a(d[b-1]).after(this.listItem):a(d[b]).before(this.listItem)}},instance:void 0};h.prototype={init:function(b){var d=this;this.targetList=b.targetList;this.input=b.input;this.clear=b.clear;this.instance=b.instance;this.input.keyup(function(){d.filter(a(this).val())});this.clear.click(function(){d.input.val("");
d.filter("")})},filter:function(b){var d=this;b===""?d.targetList.find("li").show():a.each(d.targetList.find("li"),function(){var c=d.instance.items[a(this).data("index")].option;d.instance._options.filter(c,b)?a(this).hide():a(this).show()});d.instance._updateCounters()},targetList:null,input:null,clear:null,instance:null};a.fn.dualListBox=function(b){a.browser.mozilla?l("mozilla"):a.browser.msie&&l("msie");return this.each(function(){(new k).init(this,b)})}})(jQuery);