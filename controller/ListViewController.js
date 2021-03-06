var assign = require('object-assign');
var baseController = require('../lib/BaseController');
var buttonList = require('../stores/ButtonListStore');
var ListViewController = assign({},baseController,{
	regiester:function(){
		//注册机制
		var _this = this;
    	this.dispather.regiester('AddButtonClick',this);
    	this.addListener('AddButtonClick',function(action,index){
    		_this.onButtonClick(action,index);
    	});
    },
    onButtonClick:function(action,index){
    	console.log(action);
    	console.log(index);
        /*
        
        */
        //action.sender 可以单独更新
    	//action.sender.setState({age:111});

        //或着this.view
        /*
        var views = this.getViews();
        for(var i in views){
            views[i].setState({age:111});
        }
        */
        
        buttonList.addOneItem('licx');

        this.updateView();
        //ch:执行完毕后通知执行下一个
        //eg:after you have finish your job ,you must dispather action to the next 
        this.dispather.next(action,index+1);
    },
    deleteItem:function(id){
        buttonList.deleteOneData(id);
        this.updateView();
    },
    updateView:function(){
        //所有的通知一块更新
        var items = buttonList.getItems();
        var views = this.getViews();
        console.log(items);
        views.map(function(view,i){
            view.setState({items:items});
        });
    }
});
ListViewController.initialize();
module.exports = ListViewController;