
var artistBefore = "";
var songBefore = "";

function dynamically_replace() {
	var artist = $('.trackData .artistSummary').text();
	var song = $('.songTitle').text();
	song = song.replace("(live)", "");
	artist = artist.slice(artist.length/2);

	if(artist == artistBefore && song == songBefore)
		return;
	else{
		artistBefore = artist;
		songBefore = song;
	}

	//var link = "https://rdiolyrics.com/?hash&artist=" + artist + "&song=" + song;
	//console.log(link);

	var link = "http://api.vagalume.com.br/search.php" + "?art=" + artist + "&mus=" + song;
	$('.myLyrics').remove();
	$.get(link,function(data){
		//var Re = new RegExp("</p>","g");
		//data = data.replace(Re, "</p><br>");
		console.log(data);
		

		if(data.type != "song_notfound")
		{
			$('#trackDetail').append(
				'<div class="item myLyrics" style="display: block;"><div class="close1"></div><div class="heading">Lyrics</div><div class="itemContent"><div class="threelineshigh" style="max-height: none;"><pre style="padding: 0px;" >'+ data.mus[0].text +'</pre></div></div><div class="divider"></div></div>'
				);
			$('.lyrics').remove();
		}
	});

}


var BreakException= {};
var observer = new MutationObserver(function (mutations) {
	try {
		mutations.forEach(function (mutation) {
			
			[].slice.call(mutation.addedNodes).forEach(function (addedNode) {
				if ((" " + addedNode.className + " ").indexOf("showFullBio") > -1) {
					dynamically_replace();
					throw BreakException;
				}
			});
			
		}); 
	} catch(e) {
		if (e!==BreakException) throw e;
	}           
});

// Start observing "childList" events in document and its descendants
observer.observe(document, {
	childList: true,
	subtree:true,
	characterData:true,
	attributes:true  
});