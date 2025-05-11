const name = document.getElementById('name');
const symbols = document.getElementById('symbols');
const point_of_origin = document.getElementById('point_of_origin');
const symbol_prefix = document.getElementById('symbol_prefix');
const extragalactic_address = document.getElementById('extragalactic_address');

const dimensionList = document.getElementById('dimensionList');
const addressList = document.getElementById('addressList');

name.addEventListener("change", () => { drawOutput(createSolarSystemString()); });
symbols.addEventListener("change", () => { drawOutput(createSolarSystemString()); });
point_of_origin.addEventListener("change", () => { drawOutput(createSolarSystemString()); });
symbol_prefix.addEventListener("change", () => { drawOutput(createSolarSystemString()); });

function createSolarSystemString()
{
	var json = {};
	
	json.name = name.value;
	name.dataset.valid = isNameValid(json.name);
	
	json.symbols = symbols.value;
	symbols.dataset.valid = isResourceLocationValid(json.symbols);
	
	json.point_of_origin = point_of_origin.value;
	point_of_origin.dataset.valid = isResourceLocationValid(json.point_of_origin);
	
	json.symbol_prefix = parseInt(symbol_prefix.value);
	symbol_prefix.dataset.valid = isSymbolValid(json.symbol_prefix);
	
	// Extragalactic Address
	json.extragalactic_address = {};
	
	json.extragalactic_address.address = createAddress(extragalactic_address, 8);
	
	var randomizable = extragalactic_address.querySelector("button[name='randomizable']").value;
	json.extragalactic_address.randomizable = randomizable == "true";
	
	
	// Address List
	json.addresses = [];
	for(const li of addressList.children)
	{
		var addressObject = {}
		addressObject.galaxy = "";
		addressObject.address = createAddress(li, 7);
		addressObject.randomizable = false;
		
		var selectedGalaxy = li.querySelector("input[name='galaxy']");
		var galaxy = selectedGalaxy.value;
		if(galaxy && galaxy.length !== 0)
			addressObject.galaxy = galaxy;
		selectedGalaxy.dataset.valid = isResourceLocationValid(addressObject.galaxy);
		
		var selectedRandomizable = li.querySelector("button[name='randomizable']");
		var rand = selectedRandomizable.value;
		addressObject.randomizable = (rand == "true");
		
		json.addresses.push(addressObject);
	}
	
	// Dimension List
	json.dimensions = [];
	for(const li of dimensionList.children)
	{
		var selectedDimension = li.querySelector("input[name='dimension']");
		json.dimensions.push(selectedDimension.value);
		selectedDimension.dataset.valid = isResourceLocationValid(selectedDimension.value);
	}
	
	return JSON.stringify(json, null, 3);
}

function addAddress()
{
	var listEntry = document.createElement('li');
	listEntry.classList.add('item');
	
	var clearfix = createClearfix(document);
	
	var multiInput = document.createElement('div');
	multiInput.classList.add('listMultiInput');
	
	var clearfix0 = createClearfix(document);
	clearfix0.innerHTML += `<div id = "inputName" class = "tooltip"> <b>galaxy</b> <div id = "info"><sup>(?)</sup></div> <span class = "tooltiptext" style = "width:auto; padding:5px; min-width: 400px; font-family: Arial">The galaxy this Solar System is a part of</span> </div>`
	clearfix0.innerHTML += `<div id = "inputType" style = "color:#00aaff"><b>Resource Location</b></div>`
	clearfix0.appendChild(createResourceLocationInput(document, 'galaxy', false, '260px', (event) => { drawOutput(createSolarSystemString()); }));
	
	var clearfix1 = createClearfix(document);
	clearfix1.innerHTML += `<div id = "inputName" class = "tooltip"> <b>address</b> <div id = "info"><sup>(?)</sup></div> <span class = "tooltiptext" style = "width:auto; padding:5px; min-width: 400px; font-family: Arial">Numerical values of the symbols in the Address, each number must be unique</span> </div>`
	clearfix1.innerHTML += `<div id = "inputType" style = "color:#cb6b1f"><b>int[ ]</b></div>`
	clearfix1.appendChild(createSymbolInput(document, '1', false, (event) => { drawOutput(createSolarSystemString()); }));
	clearfix1.appendChild(createSymbolInput(document, '2', false, (event) => { drawOutput(createSolarSystemString()); }));
	clearfix1.appendChild(createSymbolInput(document, '3', false, (event) => { drawOutput(createSolarSystemString()); }));
	clearfix1.appendChild(createSymbolInput(document, '4', false, (event) => { drawOutput(createSolarSystemString()); }));
	clearfix1.appendChild(createSymbolInput(document, '5', false, (event) => { drawOutput(createSolarSystemString()); }));
	clearfix1.appendChild(createSymbolInput(document, '6', true, (event) => { drawOutput(createSolarSystemString()); }));
	
	var clearfix2 = createClearfix(document);
	clearfix2.innerHTML += `<div id = "inputName" class = "tooltip"> <b>randomizable</b> <div id = "info"><sup>(?)</sup></div> <span class = "tooltiptext" style = "width:auto; padding:5px; min-width: 400px; font-family: Arial">Whether the Address may be randomized when Address randomization is enabled in the config</span> </div>`
	clearfix2.innerHTML += `<div id = "inputType" style = "color:#cb6b1f"><b>boolean</b></div>`
	//clearfix2.innerHTML += `<input type="text" id = "randomizable" name = "randomizable", style = "width:48px" placeholder = true value = true>`
	clearfix2.appendChild(createBoolButton(document, 'randomizable', 'true', (event) => { toggleButton(event.target); }));
	
	multiInput.appendChild(clearfix0);
	multiInput.appendChild(clearfix1);
	multiInput.appendChild(clearfix2);
	
	clearfix.innerHTML = `<div id = "inputName" class = "tooltip" style = "min-height:92px"> <b>address</b> <div id = "info"><sup>(?)</sup></div> <span class = "tooltiptext" style = "width:auto; padding:5px; min-width: 400px; font-family: Arial">The Extragalactic Address of this Solar System and whether it can be randomized</span> </div>`;
	
	clearfix.appendChild(multiInput);
	
	var removeButton = createRemoveButton(document, (event) => { removeAddress(event.target); });
	clearfix.appendChild(removeButton);
	
	listEntry.appendChild(clearfix);
	addressList.appendChild(listEntry);
	
	drawOutput(createSolarSystemString());
}

function addDimension()
{
	var listEntry = document.createElement('li');
	listEntry.classList.add("item");
	
	var button = document.createElement("button");
	button.classList.add('removeButton');
	button.addEventListener("click", (event) => { removeDimension(event.target); });
	button.innerText = "Remove";
	
	listEntry.innerHTML = `<div id = "inputName" class = "tooltip"> <b>dimension</b> <div id = "info"><sup>(?)</sup></div> <span class = "tooltiptext" style = "width:auto; padding:5px; min-width: 400px; font-family: Arial">Dimension that's a part of this Solar System</span> </div>`;
	listEntry.innerHTML += `<div id = "inputType" style = "color:#00aaff"><b>Resource Location</b></div>`;
	listEntry.appendChild(createResourceLocationInput(document, 'dimension', '0px', true, (event) => { drawOutput(createSolarSystemString()); }));
	listEntry.appendChild(button)
	
	dimensionList.appendChild(listEntry);
	
	drawOutput(createSolarSystemString());
}

function removeDimension(button)
{
	button.parentElement.remove();
	drawOutput(createSolarSystemString());
}

function removeAddress(button)
{
	button.parentElement.parentElement.remove();
	drawOutput(createSolarSystemString());
}

function toggleButton(button)
{
	if(button.value == "true")
	{
		button.value = "false";
		button.textContent = "false";
	}
	else
	{
		button.value = "true";
		button.textContent = "true";
	}
	
	drawOutput(createSolarSystemString());
}

// Initial json display
drawOutput(createSolarSystemString());