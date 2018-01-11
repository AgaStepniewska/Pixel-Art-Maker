$('button').hide();
$(document).ready(function(){
	
	//setting up a size of table on click 
	$('#submit').click(function(event){
		deleteGrid();
		event.preventDefault();
		makeGrid();
	});

	var button = $('button'),
		table = $('#pixel_canvas');
	
	function makeGrid() {
		var inputWidth = $('#input_width').val(),
			inputHeight = $('#input_height').val();
		//create row in a table:
		for (var i = 1; i <= inputHeight; i++) {
			var makeRow = $('<tr></tr>').appendTo(table);
			//create columns in the table:
			for(var j = 1; j<=inputWidth; j++) {
			makeRow.append('<td></td>');
			}
		}

		button.fadeIn(200);

		$('#borders').prop('checked', true);
		$('#gridBorder').removeClass('hidden');
		$('#pickColor').removeClass('hidden');
		$('#doubleClick').removeClass('hidden');
		
		if(inputWidth >70 || inputHeight > 70){
			alert("Maximum value is 70!");
			deleteGrid();
			button.addClass('hidden');
			$('#gridBorder').addClass('hidden');
			$('#pickColor').addClass('hidden');
			$('#doubleClick').addClass('hidden');
		}
	};

	//table reset after picking up a size
	function deleteGrid() {
		table.children().remove();
	};
	
	// //remove all table
	$('#removeBtn').click(function(){
		$('tr').remove();
	});

	//clear the table
	$('#clearBtn').click(function(){
		$('td').css('background-color', "");
	});
	
// Adding color:	
	var color = $('#colorPicker'),
		mouseClicked = false;

// pointer when mouse is on canva-table:
table.mouseover(function(event){
	$(this).css('cursor', 'pointer');
});

//addimg a color to one cell:
	function colorOneCell() {
		table.on('click', 'td', function(){
			$(this).css('background-color', color.val());
			mouseClicked = false;
		});
		table.on('dblclick', 'td', function(){
			$(this).css('background-color', "");
		});
	}

//remove a color from the cell: 
	function removeColor(){
		table.on('mousemove', 'td', function(){
			if(mouseClicked)
			$(this).css('background-color', "");
		});
		table.on('mousedown', 'td', function(){
			mouseClicked = true;
		});
		table.on('mouseup', 'td', function(){
			mouseClicked = false;
		});
		table.on('click', 'td', function(){
			$(this).css('background-color', "");
		});
	}

//coloring all cells: 
	function colorAllCells(){
		table.on('mousemove', 'td', function(){
			if(mouseClicked){
				$(this).css('background-color', color.val());
			}
		});
		table.on('mousedown', 'td', function(){
			mouseClicked = true;
		});
		table.on('mouseup', 'td', function(){
			mouseClicked = false;
		});

	}
	var eraseBtn = $('#erase'),
		drawBtn = $('#draw');
	
	eraseBtn.click(function(){
		removeColor();
		
	})
	drawBtn.click(function(){
		mouseClicked = false;
		colorOneCell();
		colorAllCells();
	});
	
	colorOneCell();
	colorAllCells();
	
//to show or hide borders in the table grid	
	$('#borders').change(function(){
		$('tr, td').toggleClass('hide');
	});
	
})