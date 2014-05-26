$(document).ready(function(){

$('.nav li').click(function(){
    $('.nav li').removeClass('active');
    $(this).addClass('active');
})

});

// Validations for new address form
function validations(obj)
{
	window.test = obj;
	var ids = new Array();
	var vals = new Array();
	var ret = 0;
	for(i=0;i<obj.length;i++)
	{
		ids[i] = obj[i].name;
		vals[i] = obj[i].value; 		 		
	}
	for(i=0;i<ids.length;i++)
	{
		if(vals[i].trim().length == 0 )
		{
			$('.'+ids[i]).removeClass('false').addClass('true');ret = 1;
		}
		else
		{
			$('.'+ids[i]).removeClass('true').addClass('false');
		}
	}
	
	if(!ret)
	{
		var email = obj[1].value;
		var phone = obj[2].value;
	
		var emailpattern = /^[\w-._]+@([\w-]+\.)+[\w-]+$/;
		
	  	if (!emailpattern.test(email)) 
	  	{
			$('.email').html('Please enter valid email id');
			$('.email').removeClass('false').addClass('true');ret = 1;
		}
		var phonepattern = /^[0-9]+\.?[0-9]*$/;
		if(!phonepattern.test(phone))
		{
			$('.phone').html('Please enter valid mobile number');
			$('.phone').removeClass('false').addClass('true');ret = 1;
		}
	}
	
	if(ret)
	return false;
	else
	return true;
}
