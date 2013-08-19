    // Our Google Docs Spreadsheet
    var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0AobCoier8-0ndDFwMWQ4MkdyQUZMUDRoWFVhMkUwcWc&single=true&gid=0&output=html';

	function calculate_budget_percent() {

	var budget_year = document.getElementById("budget_year").value;	
	var budget_percent = document.getElementById("budget_percent");
	var budget_description = document.getElementById("budget_description");
	var budget_amount = document.getElementById("budget_amount");
	var add_amount = document.getElementById("add_amount").value;
	var budget_span = document.getElementById("budget_span").value;
    
    var total_outlay = 0; // Later we'll need to add the overall years if the user selects a range in budget_span above
	var total_percent;
	
	// Tabletop calls our public spreadsheet url and follows up with showInfo function
	
	Tabletop.init( { key: public_spreadsheet_url,
                         callback: showInfo,
                         simpleSheet: true } );
      
      function showInfo(data) {
			// data comes through as a simple array since simpleSheet is turned on
			// we loop through the data to determine year selected by user and outlay

			var budget_end = parseFloat(budget_year) + parseFloat(budget_span);
			var budget_options = document.getElementById("budget_options");
			
								
			for (var i = 0; i <= data.length; i++) {
				
				find_checked();		
				
				// this checks if our budget year matches the year but not beyond the end year on each loop
				if (budget_year == data[i].year && budget_year <= budget_end) {
				
				switch(value) {
				
					case "outlays":	
					total_outlay = total_outlay + parseFloat(data[i].outlays.replace(/\,/g,''));
					budget_description.innerHTML = "Percent of Budget";
					break;
					
					case "revenue":
					total_outlay = total_outlay + parseFloat(data[i].revenue.replace(/\,/g,''));
					budget_description.innerHTML = "Percent of Revenues";					
					break;

					case "population":
					total_outlay = total_outlay + parseFloat(data[i].population.replace(/\,/g,''));
					budget_description.innerHTML = "Per Capita";					
					break;

					case "discretionary":
					total_outlay = total_outlay + parseFloat(data[i].discretionary.replace(/\,/g,''));
					budget_description.innerHTML = "Percent of Discretionary";					
					break;

				}
					
				budget_year++;
						console.log(total_outlay);

				}
				
				if (value != "population") {
				// total_percent calculates the budget percent [add_amount is our thousands, millions, etc.]
				total_percent = ((budget_amount.value.replace(/\,/g,'') * add_amount)/total_outlay) * 100;
				
					
					// If it's a really low percentage we want a better way to communicate that than 0.0000%
					if (total_percent > 0.00009) {
					
					budget_percent.innerHTML = total_percent.toFixed(4) + "%";
	
					}
					
					else { 
					
					budget_percent.innerHTML = "<span>less than</span> 0.0001%";

					}
				
				}
				
				else {
				
					total_percent = ((budget_amount.value.replace(/\,/g,'') * add_amount)/total_outlay);	
				
					if (total_percent > 0.009) {
					// total_percent calculates the budget percent [add_amount is our thousands, millions, etc.]
							
					budget_percent.innerHTML = "$" + total_percent.toFixed(2);			

					
					}

					else { 
					
					budget_percent.innerHTML = "<span>less than</span> $0.01";

					}
				
				}
			
			}

		}
		
	}
	
	function find_checked() {
		
		for (var x = 0; x <= budget_options.length; x++) {
			if (budget_options[x].type == 'radio' && budget_options[x].checked) {
			// get value, set checked flag or do whatever you need to
			value = budget_options[x].value;
			
			return value;
			}
		}
		
	}
	
	function show_advanced () {
		
		var advanced = document.getElementById("advanced");
		var calc_space = document.getElementById("calc_space");
		
		if (advanced.style.display == "block") {
		
		advanced.style.display = "none";
		calc_space.style.height = "100px";
		
		}
		
		else {
		
		advanced.style.display = "block";
		calc_space.style.height = "150px";
		
		}	
			
		
	}