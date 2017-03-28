fetchBookmarks();

$('#btn1').click(function(){

		var siteName = $('#name').val(); // returns the data of the form which has a ID of 'name'
		var siteUrl = $('#url').val();
		var siteDescription = $('#description').val();

		validForm = formValidity(siteName , siteUrl);

		if(validForm == false){
			return false
		}

		var bookmark = {
			name: siteName,
			url:siteUrl,
			description : siteDescription
		}
		/* Convert it to String before saving to LocalStorage : localStorage.setItem('key', JSON.stringify(data));
			
			Convert back to JS object, reading from LocalStorage : data = JSON.parse(localStorage.getItem('key'); */

		if (localStorage.getItem('bookmarks') === null){

			var bookmarks = [];

			bookmarks.push(bookmark);

			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

			// console.log(bookmarks)

		}else{

			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

			bookmarks.push(bookmark);

			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

		}

		$('#form').trigger('reset');

		fetchBookmarks();

	});


function deleteBookmark(url){

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	for(var i=0 ; i<bookmarks.length ; i++){
		if (bookmarks[i].url == url){
			bookmarks.splice(i,1);
		}
	}

	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	fetchBookmarks();



	// $.each( bookmarks , function( key, value ) {

	// 	if (value.url == url){

	// 		bookmarks.splice(key,1);
	// 		// console.log(key)
	// 	}


	// });

	// localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	// fetchBookmars();
}


function formValidity(siteName , siteUrl){

		if(siteName == "" || siteUrl == ""){
			alert('please fill up the form');
			return false
		}

		
		var re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

		validUrl = re.test(siteUrl);

		if(validUrl == false){
			alert('Please enter a valid url');
			return false;
		}

		return true;
}

function fetchBookmarks(){

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  	$('#bookMarks').empty();

  	if (bookmarks != null){

		$.each( bookmarks , function( key, value ) {
	  	
		  	name = value.name;
		  	url = value.url;
		  	description = value.description;
	  	
		  	$('#bookMarks').append('<div class="col-md-12">'+
		  								'<div class="panel panel-primary">'+
		  								'<div class="panel-heading">'+
										'<h3>'+name+' '+
										'<a class="btn btn-default btn-sm" target="_blank" href="'+url+'">Visit</a> '+
										'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger btn-sm" href="#">Delete</a> '+
										'</h3>'+
										'</div>'+
										'<div class="panel-body">'+
										'<p>' + description + '</p>' +
										// '<p>' + url + '</p>' +
										'</div>'+
										'</div>'+
										'</div>');

		});
  	}

}

