(function(window, document){
	
	var colors = [
	'rgba(22, 160, 133, 0.5)', 'rgba(39, 174, 96, 0.5)',
	'rgba(41, 128, 185, 0.5)', 'rgba(142, 68, 173, 0.5)',
	'rgba(44, 62, 80, 0.5)', 'rgba(243, 156, 18, 0.5)',
	'rgba(211, 84, 0, 0.5)', 'rgba(192, 57, 43, 0.5)'
	
	]
	
	var quotes = [];
	
	var imgCount = 10;
	
	var images = [];
	
	for(var i = 1; i<imgCount +1; i++) {
		
		images.push('/images/' + i + '.jpg');
	}
	
	var loadedImages = [];
	
	var random = function(min, max) {
		
		return Math.floor(Math.random() * (max - min + 1)) + min;
		
	}
	
	var img;
	var selectedImage = 0;
	var selectedQuote = 0;
	var selectedColor = 0;
	
	var display = function(checkHash) {
		
		if(checkHash && window.location.hash) {
			
			var hash = window.location.hash.split('-')[1];
			selectedQuote = parseInt(hash, 10);
			
		}
		
		var selectedClr = random(0, colors.length - 1);
		var selectedQt = random(0, quotes.length - 1);
		
		selectedColor = (selectedColor !== selectedClr)? selectedClr: selectedClr + 1;
		
		if(!checkHash) {
			selectedQuote = (selectedQuote !== selectedQt)? selectedQt: selectedQt + 1;
		}
		
		if(selectedColor >= colors.length) {
			selectedColor = 0;
		}
		
		if(selectedQuote >= quotes.length || isNaN(selectedQuote)) {
			selectedQuote = 0;
		}
		
		var quote = quotes[selectedQuote];
		document.getElementById('quote').innerHTML = quote.content;
		document.getElementById('by').innerHTML = quote.by;
		document.body.style.backgroundColor = colors[selectedColor];
		
		window.location.hash = "#quote-" + selectedQuote;
		
		if(loadedImages.length) {
			
			selectedImage +=1;
			
			if(selectedImage >= loadedImages.length) {
				selectedImage = 0;
			}
			
			if(img) {
				img.classList.remove('show');
			}
			var src = loadedImages[selectedImage];
			img = document.getElementById(src);
			img.classList.add('show');
		
			if(window.innerHeight > window.innerWidth) {
				img.style.height = window.innerHeight + "px";
			} else {
				img.style.width = window.innerWidth + "px";
			}
		}
	}
	
	window.addEventListener('load', function() {
		
		document.querySelector('#data').style.display = 'none';
		
		Array.prototype.slice.call(document.querySelectorAll('#data blockquote')).forEach(function(elem){
			quotes.push({content: elem.querySelector('h1').innerHTML, by: elem.querySelector('p').innerHTML});
		});
		
		images.forEach(function(src) {
		
			var img = document.createElement('img');
			img.src = src;
			img.id = src;
			img.addEventListener('load', function() {
				loadedImages.push(src);
			});
		
			document.body.appendChild(img);
		
		});
		
		display(true);
	});
	
	window.addEventListener('click', function(e) {
		
		if(!window.getSelection().toString()) {
			
			if(e.ctrlKey || e.metaKey) {
				
				window.location.hash = "#quote-" + ( selectedQuote + 1 );
				display(true);
				
			} else {
				
				display();
			}
		}
		
	});
	
	
})(window, document);