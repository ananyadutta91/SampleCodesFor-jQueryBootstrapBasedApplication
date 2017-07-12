var numPerPage = 5;

//no of rows per page select box change event starts
$('#Numberofpages').on('change', function () {
    $('#bulkselect').prop('checked', false);
    numPerPage = this.value;
    var i=0;   
    var table = document.getElementById('myTable');
	  while (table.rows.length > 1) {
	        table.deleteRow(1);
	    }
	
  var retrievedObject = window.localStorage.getItem('student_table');

  var originalObject = JSON.parse(retrievedObject);
  
  for (i in originalObject)
  {
	  $('#myTable tbody').append('<tr class="child"><td><input class="selectcheckbox" id="checkbox' + originalObject[i].id + '" type="checkbox"/></td><td class="selectotherfields" id="fname-' + originalObject[i].id + '">' + originalObject[i].firstname + '</td><td class="selectotherfields" id="lname-' + originalObject[i].id + '">' + originalObject[i].lastname + '</td> <td class="selectotherfields" id="email-' + originalObject[i].id + '">' + originalObject[i].email +  '</td><td class="selectotherfields" id="phone-' + originalObject[i].id + '">' + originalObject[i].phone + '</td><td class="selectotherfields" id="location-' + originalObject[i].id + '">' + originalObject[i].location[0] + '<br/>' + originalObject[i].location[1] + '<br/>'+ originalObject[i].location[2] +'</td><td class="selectotherfields" id="current_class' + originalObject[i].id + '">' + originalObject[i].current_class + '</td><td class="selectotherfields" id="address' + originalObject[i].id + '">' + '<strong> Communication: </strong>'+ originalObject[i].address.communication + '<br/>'+ '<strong> Permanent: </strong>'+ originalObject[i].address.permanent + '</td><td class="selectotherfields" id="marks' + originalObject[i].id + '">' + '<strong>English: </strong>' + originalObject[i].marks.english + '<br/>'+'<strong>Science: </strong>'+originalObject[i].marks.science + '<br/>'+'<strong>Computers:</strong>' +originalObject[i].marks.computers +'<br/>'+'<strong>Hardware: </strong>' +originalObject[i].marks.hardware + '</td</tr>');

  	
  	if(i==(numPerPage-1)){
	  break;}
  }
      
}); //no of rows per page select box change event ends


//filter table elements starts
function filterTableElements(){
    populateInTable();
    $('[id^="icon"]').attr('class', 'fa fa-sort');
    _this = $("#search");
    // Show only matching TR, hide rest of them
    $.each($("#myTable tbody tr"), function () {
          if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1)
            $(this).remove();
    });

}//filter table elements ends

// search function
$("#search").keyup(function () {
    filterTableElements();
}); //search function ends

//view button click start
$("#viewbutton").click(function () {
    $("#dlbootstrap").remove();
    var id;
    var row;
    $("input:checkbox").each(function () {
        var $this = $(this);

        if ($this.is(":checked")) {
            id = $this.attr("id").substr(8);
            row = $this.parent().parent().index();           
        }
    });

    var retrievedObject = localStorage.getItem('student_table');

    var originalObject = JSON.parse(retrievedObject);

    var html;

    for (var i in originalObject)
    {
        if (parseInt(originalObject[i].id) === parseInt(id)) {

           // html = '<tr  id="dlbootstrap"><td colspan="6"><dl id="slidedowndl" style="display:none;" class="dl-horizontal">  <dt>First Name</dt>  <dd>' + originalObject[i].firstname + '</dd>  <dt>Last Name</dt>  <dd>' + originalObject[i].lastname + '</dd>  <dt>Location</dt>  <dd>' + originalObject[i].location[0] + ',' +originalObject[i].location[1]+ ','+originalObject[i].location[2]+'</dd>  <dt>Phone</dt>  <dd>' + originalObject[i].phone + '</dd> <dt>Email</dt>  <dd>' + originalObject[i].email + '</dd> <dt>Current_Class</dt>  <dd>' + originalObject[i].current_class + '</dd> <dt>Marks</dt>  <dd>English: ' + originalObject[i].marks.english+ ' ,Science: '+originalObject[i].marks.science + ' ,Computers: ' + originalObject[i].marks.computers+ ' ,Hardware '+originalObject[i].marks.hardware+'</dd> <dt>Address</dt>  <dd>Communication: ' + originalObject[i].address.communication+ ' ,Permanent: '+originalObject[i].address.permanent +'</dd><dd><button id="viewportremove" class="btn btn-danger">close</button></dl></td></tr>';
        	 html = '<tr  id="dlbootstrap"><td colspan="6"><dl id="slidedowndl" style="display:none;" class="dl-horizontal">  <dt>First Name</dt>  <dd>' + originalObject[i].firstname + '</dd>  <dt>Last Name</dt>  <dd>' + originalObject[i].lastname + '</dd>  <dt>Location</dt>  <dd>' + originalObject[i].location +'</dd>  <dt>Phone</dt>  <dd>' + originalObject[i].phone + '</dd> <dt>Email</dt>  <dd>' + originalObject[i].email + '</dd> <dt>Current_Class</dt>  <dd>' + originalObject[i].current_class + '</dd> <dt>Marks</dt>  <dd>English: ' + originalObject[i].marks.english+ ' ,Science: '+originalObject[i].marks.science + ' ,Computers: ' + originalObject[i].marks.computers+ ' ,Hardware '+originalObject[i].marks.hardware+'</dd> <dt>Address</dt>  <dd>Communication: ' + originalObject[i].address.communication+ ' ,Permanent: '+originalObject[i].address.permanent +'</dd><dd><button id="viewportremove" class="btn btn-danger">close</button></dl></td></tr>';     
        }
    }
    $('#myTable > tbody > tr').eq(row).after(html);
    $("#slidedowndl").slideDown();
});//view button click end


//viewport bootstrap clicked start
$("#myTable").on("click", "#viewportremove", function () {
    $("#slidedowndl").slideUp();
    setTimeout(function () {
        $("#dlbootstrap").remove();
    }, 400);

});//viewport bootstrap clicked end


//function add or update handler starts 
function addOrUpdateHandler(event) {
	
	var validationflag = validate();
    if (validationflag && $("#submitbuttonid").attr("data-addedit") === 'add') {
        addTheData();
    } else if (validationflag && $("#submitbuttonid").attr("data-addedit") === 'edit') {
        updateTheData();
    }
    return false;
} //function add or update handler ends


//validating form
	function validate() {
		
		 var firstname, lastname, email, phone, location, address_comm, address_perm, marks_eng, marks_sci, marks_comp, marks_hdwr;
		 firstname = document.getElementById("firstname").value.toString();
		 lastname = document.getElementById("lastname").value.toString();
		 email = document.getElementById("email").value.toString(); 
		 phone = document.getElementById("phone").value.toString(); 
		 //location= document.getElementById("location").value.toString();
		 study_class = document.getElementById("study_class").value.toString();
		 /*address_comm = document.getElementById("communication").value.toString();
		 address_perm = document.getElementById("permanent").value.toString();*/
		 marks_eng = document.getElementById("english").value.toString();
		 marks_sci = document.getElementById("science").value.toString();
		 marks_comp = document.getElementById("computers").value.toString();
		 marks_hdwr = document.getElementById("hardware").value.toString();

		var fnameflag = validatename(firstname);
	    var lnameflag = validatename(lastname);
	    var emailflag = validateemail(email);
	    var phoneflag = validatephone(phone);
	  //  var locationflag = validatename(location);
	   /* var address_comm_flag = validatename(address_comm);
	    var address_perm_flag = validatename(address_perm);*/
	    var marks_eng_flag = validatephone(marks_eng);
	    var marks_sci_flag = validatephone(marks_sci);
	    var marks_comp_flag = validatephone(marks_comp);
	    var marks_hdwr_flag = validatephone(marks_hdwr);
	    
	    var validation_success = true;
	     
	    if (!fnameflag) {     
	     document.forms["myForm"]["firstname"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">First Name must be filled out!<span>');
	     validation_success = false;
	    } 
	    if (!lnameflag) {
	    	document.forms["myForm"]["lastname"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Last Name must be filled out!<span>');
	    	validation_success = false;
	    } 
	    if (!emailflag) {
	    	document.forms["myForm"]["email"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Email should be in proper format!<span>');
	    	validation_success = false;
	    } 
	    if (!phoneflag) {
	    	document.forms["myForm"]["phone"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Enter a valid phone number!<span>');
	    	validation_success = false;
	    } 
	   /* if (!locationflag) {
	    	document.forms["myForm"]["location"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Location must be filled out!<span>');
	    	validation_success = false;
	    } */
	   /* if (!address_comm_flag) {
	    	document.forms["myForm"]["communication"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Communication Address must be filled out!<span>');
	    	validation_success = false;
	    }
	    if (!address_perm_flag) {
	    	document.forms["myForm"]["permanent"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Permanent Address must be filled out!<span>');
	    	validation_success = false;
	    }*/
	    if (!marks_eng_flag) {
	    	document.forms["myForm"]["english"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Marks of English must be filled out!<span>');
	    	validation_success = false;
	    }
	    if (!marks_hdwr_flag) {
	    	document.forms["myForm"]["science"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Marks of Science must be filled out!<span>');
	    	validation_success = false;
	    }
	    if (!marks_comp_flag) {
	    	document.forms["myForm"]["computers"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Marks of Computers must be filled out!<span>');
	    	validation_success = false;
	    }
	    if (!marks_eng_flag) {
	    	document.forms["myForm"]["hardware"].insertAdjacentHTML('afterEnd', '<span class="errormsg text-danger">Marks of Hardware must be filled out!<span>');
	    	validation_success = false;
	    }
	    return validation_success;

	} //validating form data ends
	
//adding data after validation	
function addTheData() {

	    var obj_storage = null;
	    var address_storage = null;
	    var marks_storage = null;
	    
	    var firstname = document.getElementById("firstname").value.toString();
	    var lastname = document.getElementById("lastname").value.toString();
	    var email = document.getElementById("email").value.toString(); 
	    var phone = document.getElementById("phone").value.toString(); 
	    
	    var location= document.getElementById("location").value.toString();
	        
	    var study_class = document.getElementById("study_class").value.toString();
	    var address_comm = document.getElementById("communication").value.toString();
	    var address_perm = document.getElementById("permanent").value.toString();
	    var marks_eng = document.getElementById("english").value.toString();
	    var marks_sci = document.getElementById("science").value.toString();
	    var marks_comp = document.getElementById("computers").value.toString();
	    var marks_hdwr = document.getElementById("hardware").value.toString();
	    
	    var tmp = JSON.parse(window.localStorage.getItem("student_table"));
	    
	    if (tmp.length > 0)
	    {
	        var maxid = Math.max.apply(Math, tmp.map(function (o) {
	            return o.id;
	        }));
	        maxid = maxid + 1; 
	        
	        address_storage={
	        		
	        		"communication":address_comm,
	        		"permanent":address_perm
	        		
	        };
	        
	        marks_storage={
	        		
	        		"english":marks_eng,
	        		"science":marks_sci,
	        		"computers":marks_comp,
	        		"hardware":marks_hdwr
	        };
	        obj_storage = {
          	      
	        		"id": maxid,
	        		"firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "phone": phone,
                    "location" : location,
                    "current_class":study_class,
                    "address":address_storage,
                    "marks":marks_storage               
          };
	        
	     tmp.push(obj_storage);	     
	     //tmp.push({"id": maxid, "firstname": firstname, "lastname": lastname,"email": email,"phone": phone,"location" : location });

	    } else {
	    	
	    	   address_storage={
		        		
		        		"communication":address_comm,
		        		"permanent":address_perm
		        		
		        };
	    	   marks_storage={
		        		
		        		"english":marks_eng,
		        		"science":marks_sci,
		        		"computers":marks_comp,
		        		"hardware":marks_hdwr
		        };
	    	
	    	obj_storage = {
	          	      
	        		"id": 1,
	        		"firstname": firstname,
                    "lastname": lastname,
                    "email": email,
                    "phone": phone,
                    "location" : location,
                    "current_class":study_class,
                    "address":address_storage,
                    "marks":marks_storage      
          };

	    tmp.push(obj_storage);

	    }
	    localStorage.setItem('student_table', JSON.stringify(tmp));
	    
	    //console.log(localStorage.getItem('student_table'));

	    var table = document.getElementById('myTable');

		  while (table.rows.length > 1) {
		        table.deleteRow(1);
		    }
		
	    var retrievedObject = window.localStorage.getItem('student_table');

	    var originalObject = JSON.parse(retrievedObject);
	    
	    for (var i in originalObject)
	    {
	    	$('#myTable tbody').append('<tr class="child"><td><input class="selectcheckbox" id="checkbox' + originalObject[i].id + '" type="checkbox"/></td><td class="selectotherfields" id="fname-' + originalObject[i].id + '">' + originalObject[i].firstname + '</td><td class="selectotherfields" id="lname-' + originalObject[i].id + '">' + originalObject[i].lastname + '</td> <td class="selectotherfields" id="email-' + originalObject[i].id + '">' + originalObject[i].email +  '</td><td class="selectotherfields" id="phone-' + originalObject[i].id + '">' + originalObject[i].phone + '</td><td class="selectotherfields" id="location-' + originalObject[i].id + '">' + originalObject[i].location +'</td><td class="selectotherfields" id="current_class' + originalObject[i].id + '">' + originalObject[i].current_class + '</td><td class="selectotherfields" id="address' + originalObject[i].id + '">' + '<strong> Communication: </strong>'+ originalObject[i].address.communication + '<br/>'+ '<strong> Permanent: </strong>'+ originalObject[i].address.permanent + '</td><td class="selectotherfields" id="marks' + originalObject[i].id + '">' + '<strong>English: </strong>' + originalObject[i].marks.english + '<br/>'+'<strong>Science: </strong>'+originalObject[i].marks.science + '<br/>'+'<strong>Computers:</strong>' +originalObject[i].marks.computers +'<br/>'+'<strong>Hardware: </strong>' +originalObject[i].marks.hardware + '</td</tr>');

	    }

	    document.forms["myForm"].reset();
	    $(".close").trigger("click");

	}//add data ends


//edit start
function updateTheData() {

	    var firstname = document.getElementById("firstname").value.toString();
	    var lastname = document.getElementById("lastname").value.toString();
	    var email = document.getElementById("email").value.toString(); 
	    var phone = document.getElementById("phone").value.toString(); 
	    var location = document.getElementById("location").value.toString();
	
	    var location= document.getElementById("location").value.toString();
        
	    var study_class = document.getElementById("study_class").value.toString();
	    var address_comm = document.getElementById("communication").value.toString();
	    var address_perm = document.getElementById("permanent").value.toString();
	    var marks_eng = document.getElementById("english").value.toString();
	    var marks_sci = document.getElementById("science").value.toString();
	    var marks_comp = document.getElementById("computers").value.toString();
	    var marks_hdwr = document.getElementById("hardware").value.toString();
	    
    var arr = $('input:checkbox.selectcheckbox:checked').map(function () {
        return this.id;
    }).get();

    var id;
    for (var j in arr)
    {
        var temp = arr[j];
        id = temp.toString().substr(8);

    }
    var retrievedObject = localStorage.getItem('student_table');

    var originalObject = JSON.parse(retrievedObject);
    for (var i in originalObject)
    {
        if (parseInt(originalObject[i].id) === parseInt(id)) {
            originalObject[i].firstname = firstname;
            originalObject[i].lastname = lastname;
            originalObject[i].email = email;
            originalObject[i].phone = phone;
            originalObject[i].location = location;
            
            originalObject[i].current_class = study_class;
            originalObject[i].address.communication = address_comm;
            originalObject[i].address.permanent = address_perm;
            originalObject[i].marks.english = marks_eng;
            originalObject[i].marks.science = marks_sci;
            originalObject[i].marks.computers = marks_comp;
            originalObject[i].marks.hardware = marks_hdwr;
          
            
        }
       }

    localStorage.setItem('student_table', JSON.stringify(originalObject));
    document.forms["myForm"].reset();
    $(".close").trigger("click");
    $("#editbutton").attr("disabled", "disabled");
    $("#deletebutton").attr("disabled", "disabled");
    $("#viewbutton").attr("disabled", "disabled");
    // populateInTable();
    

    var table = document.getElementById('myTable');

	  while (table.rows.length > 1) {
	        table.deleteRow(1);
	    }
	
    var retrievedObject = window.localStorage.getItem('student_table');

    var originalObject = JSON.parse(retrievedObject);
    
    for (var i in originalObject)
    {
    	$('#myTable tbody').append('<tr class="child"><td><input class="selectcheckbox" id="checkbox' + originalObject[i].id + '" type="checkbox"/></td><td class="selectotherfields" id="fname-' + originalObject[i].id + '">' + originalObject[i].firstname + '</td><td class="selectotherfields" id="lname-' + originalObject[i].id + '">' + originalObject[i].lastname + '</td> <td class="selectotherfields" id="email-' + originalObject[i].id + '">' + originalObject[i].email +  '</td><td class="selectotherfields" id="phone-' + originalObject[i].id + '">' + originalObject[i].phone + '</td><td class="selectotherfields" id="location-' + originalObject[i].id + '">' + originalObject[i].location +'</td><td class="selectotherfields" id="current_class' + originalObject[i].id + '">' + originalObject[i].current_class + '</td><td class="selectotherfields" id="address' + originalObject[i].id + '">' + '<strong> Communication: </strong>'+ originalObject[i].address.communication + '<br/>'+ '<strong> Permanent: </strong>'+ originalObject[i].address.permanent + '</td><td class="selectotherfields" id="marks' + originalObject[i].id + '">' + '<strong>English: </strong>' + originalObject[i].marks.english + '<br/>'+'<strong>Science: </strong>'+originalObject[i].marks.science + '<br/>'+'<strong>Computers:</strong>' +originalObject[i].marks.computers +'<br/>'+'<strong>Hardware: </strong>' +originalObject[i].marks.hardware + '</td</tr>');

    }
  
}
//edit end


//check box when clicked triggerd events start
$("#myTable").on("click", ".selectcheckbox", function () {
    var $box = $(this);
    if ($box.is(":checked")) {
        // the name of the box is retrieved using the .attr() method
        // as it is assumed and expected to be immutable

        // the checked state of the group/box on the other hand will change
        // and the current value is retrieved using .prop() method

        $box.prop("checked", true);
        $(this).parents('tr').addClass("selected");
    } else {
        $(this).parents('tr').removeClass("selected");
        $box.prop("checked", false);
    }
    if ($('.selectcheckbox').filter(':checked').length == 1) {

        $("#deletebutton").removeAttr("disabled");
        $("#editbutton").removeAttr("disabled");
        $("#viewbutton").removeAttr("disabled");

    } else if ($('.selectcheckbox').filter(':checked').length == 0) {

        $("#editbutton").attr("disabled", "disabled");
        $("#deletebutton").attr("disabled", "disabled");
        $("#viewbutton").attr("disabled", "disabled");
    } else
    {
        $("#editbutton").attr("disabled", "disabled");
        $("#viewbutton").attr("disabled", "disabled");

        $("#deletebutton").removeAttr("disabled");
    }

}); //check box when clicked triggerd events end

//bulk select starts
var currentPage = 0;
var numPerPage = 5;
$(function () {
    $('#bulkselect').change(function () {
        if ($(this).is(":checked")) {
            var greaterthan = (currentPage + 1) * numPerPage;
            var lessthan = currentPage * numPerPage;
            $('#myTable tr .selectcheckbox').slice(lessthan, greaterthan).prop('checked', true);
            $('#myTable tr').slice(lessthan + 1, greaterthan + 1).addClass("selected");
            $("#editbutton").attr("disabled", "disabled");
            $("#viewbutton").attr("disabled", "disabled");
            $("#deletebutton").removeAttr("disabled");
        } else {
            $('.selectcheckbox').parents('tr').removeClass("selected");
            $('#myTable .selectcheckbox').prop('checked', false);
            $("#editbutton").attr("disabled", "disabled");
            $("#viewbutton").attr("disabled", "disabled");
            $("#deletebutton").attr("disabled", "disabled");
        }
    });

});//bulk select ends


//delete start
function deleteSelectedRow(event) {
    event.preventDefault();
    var arr = $('input:checkbox.selectcheckbox:checked').map(function () {
        return this.id;
    }).get();
    console.log(arr);

    var retrievedObject = localStorage.getItem('student_table');

    var originalObject = JSON.parse(retrievedObject);

    for (var j in arr)
    {
        var temp = arr[j];
        var id = temp.toString().substr(8);
        for (var i in originalObject)
        {
            if (parseInt(originalObject[i].id) === parseInt(id)) {
                originalObject.splice(i, 1);
            }
        }
    }

    localStorage.setItem('student_table', JSON.stringify(originalObject));
    $(".close").trigger("click");
    $("#editbutton").attr("disabled", "disabled");
    $("#deletebutton").attr("disabled", "disabled");
    $("#viewbutton").attr("disabled", "disabled");
    $("#search").val('');
    $('#bulkselect').prop('checked', false);
    populateInTable();
}
//delete end

//data populate starts
function populateInTable(){
	
	  var table = document.getElementById('myTable');
	  var str ="";

	  while (table.rows.length > 1) {
	        table.deleteRow(1);
	    }
	
    var retrievedObject = window.localStorage.getItem('student_table');

    var originalObject = JSON.parse(retrievedObject);
    
    for (var i in originalObject)
    {
    	//$('#myTable tbody').append('<tr class="child"><td><input class="selectcheckbox" id="checkbox' + originalObject[i].id + '" type="checkbox"/></td><td class="selectotherfields" id="fname-' + originalObject[i].id + '">' + originalObject[i].firstname + '</td><td class="selectotherfields" id="lname-' + originalObject[i].id + '">' + originalObject[i].lastname + '</td> <td class="selectotherfields" id="email-' + originalObject[i].id + '">' + originalObject[i].email +  '</td><td class="selectotherfields" id="phone-' + originalObject[i].id + '">' + originalObject[i].phone + '</td><td class="selectotherfields" id="location-' + originalObject[i].id + '">' + originalObject[i].location[0] + '<br/>' + originalObject[i].location[1] + '<br/>'+ originalObject[i].location[2] +'</td><td class="selectotherfields" id="current_class' + originalObject[i].id + '">' + originalObject[i].current_class + '</td><td class="selectotherfields" id="address' + originalObject[i].id + '">' + '<strong> Communication: </strong>'+ originalObject[i].address.communication + '<br/>'+ '<strong> Permanent: </strong>'+ originalObject[i].address.permanent + '</td><td class="selectotherfields" id="marks' + originalObject[i].id + '">' + '<strong>English: </strong>' + originalObject[i].marks.english + '<br/>'+'<strong>Science: </strong>'+originalObject[i].marks.science + '<br/>'+'<strong>Computers:</strong>' +originalObject[i].marks.computers +'<br/>'+'<strong>Hardware: </strong>' +originalObject[i].marks.hardware + '</td</tr>');
    	$('#myTable tbody').append('<tr class="child"><td><input class="selectcheckbox" id="checkbox' + originalObject[i].id + '" type="checkbox"/></td><td class="selectotherfields" id="fname-' + originalObject[i].id + '">' + originalObject[i].firstname + '</td><td class="selectotherfields" id="lname-' + originalObject[i].id + '">' + originalObject[i].lastname + '</td> <td class="selectotherfields" id="email-' + originalObject[i].id + '">' + originalObject[i].email +  '</td><td class="selectotherfields" id="phone-' + originalObject[i].id + '">' + originalObject[i].phone + '</td><td class="selectotherfields" id="location-' + originalObject[i].id + '">' + originalObject[i].location +'</td><td class="selectotherfields" id="current_class' + originalObject[i].id + '">' + originalObject[i].current_class + '</td><td class="selectotherfields" id="address' + originalObject[i].id + '">' + '<strong> Communication: </strong>'+ originalObject[i].address.communication + '<br/>'+ '<strong> Permanent: </strong>'+ originalObject[i].address.permanent + '</td><td class="selectotherfields" id="marks' + originalObject[i].id + '">' + '<strong>English: </strong>' + originalObject[i].marks.english + '<br/>'+'<strong>Science: </strong>'+originalObject[i].marks.science + '<br/>'+'<strong>Computers:</strong>' +originalObject[i].marks.computers +'<br/>'+'<strong>Hardware: </strong>' +originalObject[i].marks.hardware + '</td</tr>');
    	
    	//str +=$('#myTable tbody') + '<tr class="child"><td><input class="selectcheckbox" id="checkbox' + originalObject[i].id + '" type="checkbox"/></td><td class="selectotherfields" id="fname-' + originalObject[i].id + '">' + originalObject[i].firstname + '</td><td class="selectotherfields" id="lname-' + originalObject[i].id + '">' + originalObject[i].lastname + '</td> <td class="selectotherfields" id="email-' + originalObject[i].id + '">' + originalObject[i].email +  '</td><td class="selectotherfields" id="phone-' + originalObject[i].id + '">' + originalObject[i].phone + '</td><td class="selectotherfields" id="location-' + originalObject[i].id + '">' + originalObject[i].location + '</td></tr>';

    }
}


$( document ).ready(function() {
		
	//first thing to do when page loads checking local storage and getting json data with ajax if not starts
	var getStudentJSONData = function () {
	    var promise = new Promise(function (resolve, reject) {

	        var xmlhttp = new XMLHttpRequest();

	        xmlhttp.onreadystatechange = function () {
	            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
	                if (xmlhttp.status === 200) {

	                    resolve(xmlhttp.response);

	                } else if (xmlhttp.status === 400) {
	                    alert('There was an error 400');
	                } else {
	                    alert('something else other than 200 was returned');
	                }
	            }
	        };
	        
	        xmlhttp.open("GET", "students_record.json");
	        xmlhttp.responseType = 'json';

	        xmlhttp.send();
	    });
	    return promise;
	};
	var retrievedObject = window.localStorage.getItem('student_table');
	if (!retrievedObject) {
	    var fn_return = getStudentJSONData();
	    fn_return.then(function (success_response) {

	       window.localStorage.setItem('student_table', JSON.stringify(success_response));

	        populateInTable();

	    },
	            function (err) {
	                document.write(err);
	            });
	}//if local storage is not available
	else {
		populateInTable();
	}//first thing to do when page loads checking local storage and getting json data with ajax if not ends

	
	//add button clicked starts
	$("#addbutton").click(function () {
	    $("#lineModalLabel").html('Add Info');
	    $("#submitbuttonid").attr("data-addedit", 'add');
	    document.forms["myForm"].reset();
	});
	//add button clicked ends
	
	
	//edit button clicked starts
	$("#editbutton").click(function () {
	    $("#lineModalLabel").html('Edit Info');
	    $("#submitbuttonid").attr("data-addedit", 'edit');
	    var id;
	    $("input:checkbox").each(function () {
	        var $this = $(this);
	        if ($this.is(":checked")) {
	            id = $this.attr("id").substr(8);
	        }

	    });

	    var retrievedObject = localStorage.getItem('student_table');
	    var originalObject = JSON.parse(retrievedObject);

	    for (var i in originalObject)
	    {
	        if (parseInt(originalObject[i].id) === parseInt(id)) {
	            document.forms["myForm"]["firstname"].value = originalObject[i].firstname;
	            document.forms["myForm"]["lastname"].value = originalObject[i].lastname;
	            document.forms["myForm"]["email"].value = originalObject[i].email;
	            document.forms["myForm"]["phone"].value = originalObject[i].phone;
	            document.forms["myForm"]["location"].value = originalObject[i].location;
	            
	            document.forms["myForm"]["study_class"].value = originalObject[i].current_class;
	            document.forms["myForm"]["communication"].value = originalObject[i].address.communication;
	            document.forms["myForm"]["permanent"].value = originalObject[i].address.permanent;
	            document.forms["myForm"]["english"].value = originalObject[i].marks.english;
	            document.forms["myForm"]["science"].value = originalObject[i].marks.science;
	            document.forms["myForm"]["computers"].value = originalObject[i].marks.computers;
	            document.forms["myForm"]["hardware"].value = originalObject[i].marks.hardware;
	        }
	    }

	});
	//edit button clicked ends

}); //end of document.ready function
	
//validating name
function validatename(name) {
		
		var letters = /^[A-Za-z]+$/; // name must have alphabet characters only
		
	    if (name.length === 0 || !name.match(letters))
	        return false;
	    else {
	        return true;
	    }
	} // end of  validating name


//validating Phone
function validatephone(phone) {
		
		 var numbers = /^[0-9]+$/;

	     if(phone.match(numbers)){
	          
	    	 return true;
		 
		 } else{
		    	 
		    	 return false;
		     }
	} //end of validating Phone

//validating Email
function validateemail(email) {
	    
		var email_id = email.toString();
	    var atposition=email_id.indexOf("@");  
	    var dotposition=email_id.lastIndexOf(".");  
	    
	    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email_id.length){ 
	    	
	    	 return false;
	    	 
	    }else {

	            return true;
	    }
	} //end of validating email
