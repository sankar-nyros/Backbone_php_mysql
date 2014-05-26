
var App = {
	run: function(){ 
			this.addview = new this.addView();
			this.showview = new this.showView();
			this.router = new this.Router();
			this.addresscollection = new this.addressCollection();
			Backbone.history.start();
		}
	}
	
App.Router = Backbone.Router.extend({

	routes:{
			'new_address' :  'renderAddnew',
			'directory'   :  'renderAll',
			'edit/:id'    :  'renderEdit'		
 	},
 	renderAddnew : function(){ 	  
 		App.addview.addPage(); 
 	},
 	renderAll : function(){
 		App.showview.getdata(); 
 	},
 	renderEdit : function(id){
 		App.addview.editPage(id); 
 	}
 	
});


App.AddressModel = Backbone.Model.extend({
	sync: function( method , model , options ){
		 //alert(method);
		 if(method == 'update' || method == 'create')
		 {
			 Backbone.ajax({
				dataType : 'json',
				url: '/bb/Addressbook/API/add.php',
				data:{
					id:  (this.get('id') || ''),
					obj : model['attributes']['obj']
				},
				success: function( data ){
					if( data.success === true)
					{
						if(method == 'update')
						{
							App.router.navigate('directory',{ trigger:true });
						}
						else
						{
							$('#newcontactform').get(0).reset();
							$('.Msg').append('<div class="alert alert-success">'+data.msg+'</div>');
						}
					}
					else
					{
						$('.Msg').append('<div class="alert alert-error">'+data.msg+'</div>');
					}
				}
			});
		}
		else
		{
			var id = this.get('id');
			Backbone.ajax({
				dataType : 'json',
				url: '/bb/Addressbook/API/delete.php',
				data:{id : id},
				success: function(data)
				{
					if(data.success === true){
						$('#addressTable tr[data-id="'+ id +'"]').hide('slow');
					}
				}
			}); 
		}
	}
});


App.addressCollection = Backbone.Collection.extend({
	model : App.AddressModel,
	url: '/bb/Addressbook/API/directory.php'
});


App.addView = Backbone.View.extend({

	el: 'div.data',
	template:  _.template($('#addAddressTemplate').html()),
	
	events: {
		'submit form#newcontactform' : 'addContactEvent'
	},
	
    initialize : function(){ 
    	 _.bindAll(this, 'addPage','addContactEvent','editPage');
    },
    
    addPage : function(){ 
    	var address = {};
		this.$el.html(this.template({address:address}));
	},
    
    editPage : function(id){
    	var address = {},
	
		// collection of model get data of id
		model = App.addresscollection.get(id);

		if( id !== undefined && model !== undefined ){
			address = model.toJSON();
		}
		this.$el.html(this.template({address: address}));
	
    },
    
    addContactEvent : function(event){
    	var addobj =  $('#newcontactform').serializeArray();         // Get the formdata
    	id = $('#id').val();
    	result = validations(addobj);								 // Form validations return true r false
    	if(result)
    	{
    		if(id == '')
			{
				var addressmodel = new App.AddressModel({			//Create
					obj:addobj
				});
			}
			else
			{
				var addressmodel = new App.AddressModel({			//Update
					id:id,
					obj:addobj
				});
			}
			addressmodel.save();									 // call save function 
    	}
    	return false;
    }
});


App.showView = Backbone.View.extend({

	el: 'div.data',
	template:  _.template($('#directoryTemplate').html()),
	
	events: {
		'keyup input.ch': 'searchkey',
		'focusin input.ch' : 'gotfocus'
	},
	
	
	initialize: function(){
		_.bindAll(this,'getdata','show','searchkey');
	},
	
	gotfocus : function()
	{
		var tmpStr = $('.ch').val();
		$('.ch').val('');
		$('.ch').val(tmpStr);
	},	
	
	show : function(response,input){
		var self = this;
		this.$el.html(this.template({addresses: response,input:input}));
		this.$el.find('.ch').focus();
		$('#addressTable tr[data-id]').each(function(){
			var id = $(this).attr('data-id');

			$(this).find('a.edit').click(function(){
				self.editContact(id);				
			});
			$(this).find('a.delete').click(function(){
				self.deleteContact(id);				
			});
		});//end of each		
	},
	
	getdata:function(){
		var self = this;
		App.addresscollection.fetch({
			success: function(collection , response){ 
				self.show(response);
			}
		});
	},
	
	editContact: function(id){ 
            App.router.navigate('edit/'+id ,{ trigger : true });
	},
	
	deleteContact: function(id){ 
		$.confirm({
			text: "Are you sure you want to delete..?",
			confirm: function(button) {
				App.addresscollection.get(id).destroy();
			},
			cancel: function(button) {}
		});
	},
	
	searchkey : function(evt){
	    var se = this;
		var charCode = evt.keyCode; 
		if(charCode >  36 && charCode < 42 || (charCode == 8 && $('.search-query').val() != ''))
		{}
		else
		{
			$.ajax({
				dataType : 'json',
				url: '/bb/Addressbook/API/search.php',
				data:{
					input: $('.search-query').val()
				},
				success: function(response ){
					se.show(response,$('.search-query').val());
				}
			});
		}
	}
	

});


$(function(){
	App.run();
});
