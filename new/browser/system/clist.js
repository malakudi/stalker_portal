"use strict";function CList(parent,customParams){CBase.call(this,parent),customParams||(customParams={}),this.name="CList",this.baseClass="clist-main",this.multipleSelection=!0,this.activeItem=null,this.items=[],this.list=[],this.itemIndex=0,this.listIndex=0,this.pageIndex=0,this.itemsHandle=null,this.scrollHandle=null,this.scrollThumb=null,this.states={},this.manageFocus=!1,this.defaultParams={hidden:!1,marked:!1,disabled:!1,focused:!1,self:this,index:-1,data:null,manageFocus:!1,oncontextmenu:EMULATION?null:function(){return!1},onclick:function(){return this.self.OnMouseover(this),this.self.pressOK(this),!1},onmouseover:function(){return this.self.OnMouseover(this),!1}},customParams.defaultParams&&(this.defaultParams=extend(this.defaultParams,customParams.defaultParams)),this.onPage=customParams.onPage?customParams.onPage:function(){var count={480:5,576:6,720:7,1080:7};return count[screen.height]}(),this.fillsName=customParams.fillsName?customParams.fillsName:{text:"text",data:"data"},this.defaultFilter={hidden:!1,disabled:!1},this.fragment=document.createDocumentFragment()}CList.prototype=Object.create(CBase.prototype),CList.prototype.constructor=CList,CList.prototype.SetList=function(list){return Array.isArray(list)?(this.list=list,!0):!1},CList.prototype.InsertToList=function(arr,start,deleteCount){var lastIndex=0,activeItem=this.list[this.listIndex];if(Array.isArray(arr)&&0!==this.list.length){lastIndex=(this.pageIndex+1)*this.onPage-1,start||0===start||(start=this.list.length),deleteCount?this.list.splice(start,deleteCount):deleteCount=0;for(var i=0;i<arr.length;i++)this.list.splice(start+i,0,arr[i]);return lastIndex>=start&&(start<=this.listIndex&&(this.listIndex=this.FindByElement(activeItem),this.RefreshPageIndex()),this.FillItems()),!0}return!1},CList.prototype.DeleteFromList=function(arr){var index=-1,listIndex=this.listIndex,activeItem=this.list[this.listIndex];if(Array.isArray(arr)&&0!==this.list.length){for(var i=0;i<arr.length;i++)index=this.list.indexOf(arr[i]),-1!==index&&(this.list.splice(index,1),listIndex>index&&listIndex--);return index=this.list.indexOf(activeItem),-1===index?(this.listIndex=listIndex,this.listIndex>=this.list.length&&(this.listIndex=this.list.length-1)):this.listIndex=index,this.RefreshPageIndex(),this.FillItems(),!0}return!1},CList.prototype.RefreshPageIndex=function(){var pageIndex=this.pageIndex;return this.pageIndex=Math.floor(this.listIndex/this.onPage),this.itemIndex=this.listIndex%this.onPage,pageIndex!==this.pageIndex},CList.prototype.FindByElement=function(obj){return this.list.indexOf(obj)},CList.prototype.FindByFild=function(value,fild){var index=-1,map=[];return void 0!==value&&(fild||(fild=this.fillsName.data),map=this.list.map(function(item){return item[fild]}),index=map.indexOf(value)),index},CList.prototype.Init=function(handle){CBase.prototype.Init.call(this,handle);var self=this,table=null;table=element("table",{className:"maxh maxw"},element("tr",{},[this.itemsHandle=element("td",{className:"list"}),element("td",{className:"scroll"},this.scrollHandle=element("div"))])),elchild(this.scrollHandle,this.scrollThumb=element("div",{className:"thumb"})),elchild(this.handleInner,table),this.handleInner.onmousewheel=function(event){var direction=event.wheelDeltaY>0,found=direction?self.Prev():self.Next();return found&&self.Focused(found,!0),event.stopPropagation(),!1},this.RenderBody()},CList.prototype.onShow=function(){this.setScroll()},CList.prototype.RenderBody=function(){if(0===this.itemsHandle.children.length||0===this.items.length){this.items=[];for(var i=0;i<this.onPage;i++)this.items[i]=this.fragment.appendChild(element("div",this.defaultParams)),elchild(this.items[i],this.RenderItem());this.itemsHandle.appendChild(this.fragment)}},CList.prototype.RenderItem=function(){return null},CList.prototype.setScroll=function(){var margin=0,percent=0;percent=Math.ceil(this.onPage/this.list.length*100),percent>=100&&(percent=0),margin=Math.ceil(this.scrollHandle.offsetHeight/Math.ceil(this.list.length/this.onPage)*this.pageIndex),this.scrollThumb.style.height=percent+"%",this.scrollThumb.style.marginTop=margin+"px"},CList.prototype.FillItems=function(noFocus){for(var startPos=this.onPage*this.pageIndex,listLength=this.list.length,active=null,list=[],i=0;i<this.onPage;i++)listLength>i+startPos?(this.items[i].innerHTML=this.list[i+startPos][this.fillsName.text],list.push(this.list[i+startPos]),this.list[i+startPos][this.fillsName.data]&&(this.items[i].data=this.list[i+startPos][this.fillsName.data]),this.items[i].index=i+startPos,this.Hidden(this.items[i],!1),i+startPos===this.listIndex&&(active=this.items[i])):(this.items[i].index=-1,this.items[i].data=null,this.Hidden(this.items[i],!0));return this.Reset(active),noFocus||this.Focused(active,!0),this.setScroll(),"function"==typeof this.onFillItems&&this.onFillItems(active,list),active},CList.prototype.onFillItems=null,CList.prototype.Clear=function(){this.list=[],this.pageIndex=0,this.itemIndex=0,this.listIndex=0,this.activeItem=null,this.states={},this.FillItems()},CList.prototype.Reset=function(item){item&&item.nodeName&&(this.Hidden(item,this.defaultParams.hidden),this.Marked(item,this.defaultParams.marked),this.Disabled(item,this.defaultParams.disabled),item!==this.activeItem||item.focused||(this.activeItem=null),this.Focused(item,this.defaultParams.focused))},CList.prototype.Length=function(){return this.list.length},CList.prototype.SetState=function(item,option,state){if(state=Boolean(state),item[option]!==state){this.states[option]||(this.states[option]=[]);var index=this.states[option].indexOf(item);state?-1===index&&this.states[option].push(item):-1!==index&&this.states[option].splice(index,1);var oldVal=item[option];return item[option]=state,state?item.classList.add(option):item.classList.remove(option),"function"==typeof this.onStateChange&&this.onStateChange(item,option,oldVal,state),!0}return!1},CList.prototype.Hidden=function(item,state){if(state=Boolean(state),item&&item.nodeName){var changed=this.SetState(item,"hidden",state);return changed&&state&&(item.focused&&(this.activeItem=null),this.SetState(item,"marked",!1),this.SetState(item,"focused",!1)),changed}return!1},CList.prototype.Marked=function(item,state){var self=this;return state=Boolean(state),item&&item.nodeName&&!item.disabled&&!item.hidden?(this.multipleSelection===!1&&(this.states.marked||[]).forEach(function(marked){self.SetState(marked,"marked",!1)}),this.SetState(item,"marked",state)):!1},CList.prototype.Disabled=function(item,state){if(state=Boolean(state),item&&item.nodeName){var changed=this.SetState(item,"disabled",state);return changed&&state&&(item.focused&&(this.activeItem=null),this.SetState(item,"marked",!1),this.SetState(item,"focused",!1)),changed}return!1},CList.prototype.OnMouseover=function(item){return this.listIndex===item.index?!1:(this.listIndex=item.index,this.RefreshPageIndex(),void this.Focused(item,!0))},CList.prototype.Focused=function(item,state,manageFocus){var changed=!1,prevent=!1;return state=state!==!1,void 0===manageFocus&&(manageFocus=this.manageFocus),item&&item.nodeName&&!item.disabled&&!item.hidden&&state!==item.focused&&(state?item!==this.activeItem&&("function"==typeof this.onFocus&&(prevent=this.onFocus(item,this.activeItem)),prevent||(changed=this.SetState(item,"focused",state),this.Focused(this.activeItem,!1,manageFocus),this.activeItem=item,manageFocus!==!1&&this.activeItem.focus())):(changed=this.SetState(item,"focused",state),manageFocus!==!1&&this.activeItem.blur(),this.activeItem=null)),changed},CList.prototype.Activate=function(state,manageFocus){if(void 0===manageFocus&&(manageFocus=this.manageFocus),CBase.prototype.Activate.call(this,state),this.isActive){if(this.activeItem=this.activeItem||this.ActiveItem(),null===this.activeItem)return!1;this.itemIndex=this.activeItem.index,this.RefreshPageIndex()?this.FillItems():this.SetState(this.activeItem,"focused",!0),manageFocus===!0&&this.activeItem.focus()}else this.activeItem&&this.activeItem.blur();return!0},CList.prototype.ActiveItem=function(){return this.items[this.itemIndex]||null},CList.prototype.ActiveItems=function(){var list=[];return this.items.forEach(function(item){item.disabled||item.hidden||list.push(item)}),list},CList.prototype.Next=function(count){var next=null,endList=!1;return count=count&&count>0?count:1,this.itemIndex+=count,this.listIndex+=count,this.listIndex>=this.list.length&&(this.listIndex=this.list.length-1,endList=!0),next=(this.itemIndex>=this.onPage||endList)&&this.RefreshPageIndex()?this.FillItems(!1):this.items[this.itemIndex],this.Focused(next,!0),next},CList.prototype.Prev=function(count){var prev=null;return count=count&&count>0?count:1,this.itemIndex-=count,this.listIndex-=count,this.listIndex<0&&(this.listIndex=0),prev=this.itemIndex<0&&this.RefreshPageIndex()?this.FillItems(!1):this.items[this.itemIndex],this.Focused(prev,!0),prev},CList.prototype.SetPosition=function(item,makeFocused){var index=this.items.indexOf(item);return index=-1===index?this.list.indexOf(item):item.index,-1===index||void 0===index?!1:(this.listIndex=index,this.RefreshPageIndex()?this.FillItems():makeFocused&&this.Focused(this.items[this.itemIndex],!0),!0)},CList.prototype.EventHandler=function(event,filter,manageFocus){var found=null;if(void 0===manageFocus&&(manageFocus=this.manageFocus),event.stopped!==!0){switch(event.code){case KEYS.PAGE_UP:this.Prev(this.onPage);break;case KEYS.PAGE_DOWN:this.Next(this.onPage);break;case KEYS.LEFT:case KEYS.HOME:this.Prev(this.list.length);break;case KEYS.RIGHT:case KEYS.END:this.Next(this.list.length);break;case KEYS.UP:this.Prev();break;case KEYS.DOWN:this.Next();break;case KEYS.OK:return this.pressOK(this.ActiveItem()),void event.preventDefault();default:return}event.preventDefault(),this.Focused(found||this.ActiveItem(),!0,manageFocus)}},CList.prototype.pressOK=function(){},CList.prototype.onFocus=null,CList.prototype.onStateChange=null;