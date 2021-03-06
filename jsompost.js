var formSubmitted = false


// loads the sharepoint list
function loadSharepointList(arg) {


	// create the sharepoint content.
	var clientContext = SP.ClientContext.get_current();
	
	// get the list by the title.
	var oList = clientContext.get_web().get_lists().getByTitle('Burger Ratings');
	debugger

	var itemCreateInfo = new SP.ListItemCreationInformation();
    this.oListItem = oList.addItem(itemCreateInfo);// this is the window in this context, we're giving the window a oListItem property and giviing it the value of oList.addItem(itemCreateInfo)

    for(var k in arg){
      oListItem.set_item( k, arg[k]);	
    }
    // oListItem.set_item('Title', 'Sloppy Joe!'); //burger name, click edit columns and look at the query string in url bar, internal column name is after field=
    // oListItem.set_item('Burger_x0020_Joint_x0020_Name', 'Joes Burgs');//burger joint name, click edit columns and look at the query string in url bar, internal column name is after field=
        
    oListItem.update();

    clientContext.load(oListItem);
        
    clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
}

function onQuerySucceeded() {

    alert('Item created: ' + oListItem.get_id());
    $("img").animate({"opacity":"1"}, 1500);

}

function onQueryFailed(sender, args) {

    alert('Request failed. ' + args.get_message() + '\n' + args.get_stackTrace());
}

$(document).ready(function(){

	$("input#burgerSubmit").click(function(event){

 		event.preventDefault();

 		var burgerJointName = $("input#burgerJointName").val();

 		var burgerName = $("input#burgerName").val();

 		var rating = $("select#dropDown").val()

 		listItemObjects = {

 		  "Title" : burgerName,

 		  "Burger_x0020_Joint_x0020_Name" : burgerJointName,

 		  "Rating" : rating

 		}

 		SP.SOD.executeFunc('sp.js', 'SP.ClientContext',	function () {
	      // load the sharepoint list and create list items
	   	  loadSharepointList(listItemObjects);
        });

	});


})