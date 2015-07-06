console.log("pandora");
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

	var link = "https://rdiolyrics.com/?hash&artist=" + artist + "&song=" + song;
	//console.log(link);

	$.get(link,function(data){
		var Re = new RegExp("</p>","g");
		data = data.replace(Re, "</p><br>");
		$('#myLyric').remove();
		$('#trackDetail').append(
			'<div id="myLyric" class="item lyrics" style="display: block;"><div class="close1"></div><div class="heading">Lyrics</div><div class="itemContent"><div class="threelineshigh" style="max-height: none;">'+ data +'</div></div><div class="divider"></div></div>'
			);
	});

}


var BreakException= {};
var observer = new MutationObserver(function (mutations) {

	mutations.forEach(function (mutation) {
		try {
			[].slice.call(mutation.addedNodes).forEach(function (addedNode) {
				if ((" " + addedNode.className + " ").indexOf("showFullBio") > -1) {
					dynamically_replace();
					throw BreakException;
				}
			});
		} catch(e) {
			if (e!==BreakException) throw e;
		}
	});            
});

// Start observing "childList" events in document and its descendants
observer.observe(document, {
	childList: true,
	subtree:true,
	characterData:true,
	attributes:true  
});