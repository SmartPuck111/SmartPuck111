// Get all the carousels on the page
var allCarousels = document.getElementsByClassName('carousel-container');

// Iterate over all of the carousels using a FOR-loop
for(var i=0;i<allCarousels.length;i++) {
	// Create a JSON object to keep track of each carousel
	var carousel = { container: allCarousels[i] };

	// Get the <figure> element inside of this particular carousel
	carousel.figure = carousel.container.querySelector('figure');
	// Grab the UL element inside of that
	carousel.figureCont = carousel.figure.querySelector('ul');
	// Get all the list items inside of the UL
	carousel.items = carousel.figureCont.children;

	// Get the buttons, which will be used for manually changing the carousel
	carousel.buttons = {
		"prev": carousel.container.querySelector('button.carousel-previous'),
		"next": carousel.container.querySelector('button.carousel-advance')
	};

	// Set the default item to the first item; we'll start there
	carousel.currentItem = 0;

	// This is a CLOSURE function
	// We do this so that our carousel var stays the same
	(function(carousel){
		// Add an event listener to the previous button
		carousel.buttons.prev.addEventListener('click', function(e){ carouselPrev(carousel); });
		// Add an event listener to the next button
		carousel.buttons.next.addEventListener('click', function(e){ carouselNext(carousel); });

		// Start the automatic timer to cycle the carousel automatically
		startCarouselTimeout(carousel);
	})(carousel);
}

/**
 * carouselNext
 * @param carousel Object The carousel object to use for cycling next
 */
function carouselNext(carousel) {
	// Increase the index of the current item
	carousel.currentItem++;
	// If we increased it too much
	if(carousel.currentItem >= carousel.items.length) {
		// set it back to the first item
		carousel.currentItem = 0;
	}

	// Now that we've updated the index,
	// we'll display the items
	displayCarouselItem(carousel);
}

/**
 * carouselPrev
 * @param carousel Object The carousel object to use for cycling prev
 */
function carouselPrev(carousel) {
	// Decrease the index of the current item
	carousel.currentItem--;
	// If we're below zero, we've gone too far
	if(carousel.currentItem <= -1) {
		// Set it to the last item
		carousel.currentItem = carousel.items.length - 1;
	}

	// Now that we've updated the index,
	// we'll display the items
	displayCarouselItem(carousel);
}

/**
 * displayCarouselItem
 * @param carousel Object The carousel object to use for updating the carousel
 */
function displayCarouselItem(carousel) {
	// Reset the automatic timer
	startCarouselTimeout(carousel);
	// Set our new margin-left CSS property
	carousel.figureCont.style.marginLeft = -1 * (carousel.currentItem * 256);
}

/**
 * startCarouselTimeout
 * @param carousel Object The carousel object to use for automatically cycling
 */
function startCarouselTimeout(carousel) {
	// Cancel the last automatic timer
	clearTimeout(carousel.interval);
	// Create a new automatic timer
	// that will run carouselNext()
	// every 3 seconds
	carousel.interval = setTimeout(function(){
		carouselNext(carousel);
	},3000);
}