// Helper Functions for creating various inputs

function createClearfix(document)
{
	var clearfix = document.createElement('div');
	clearfix.classList.add('clearfix');

	return clearfix;
}

function createRemoveButton(document, onClick)
{
	var removeButton = document.createElement('button');
	removeButton.classList.add('removeButton');
	removeButton.addEventListener("click", (event) => { onClick(event); });
	removeButton.textContent = 'Remove';
	
	return removeButton;
}

function createBoolButton(document, id, value, onClick)
{
	var boolButton = document.createElement('button');
	boolButton.classList.add('boolButton');
	boolButton.id = id;
	boolButton.name = id;
	boolButton.addEventListener("click", (event) => { onClick(event); });
	boolButton.textContent = value;
	boolButton.value = value;
	boolButton.style.width = '48px'
	
	return boolButton;
}

function createSymbolInput(document, id, last, updateFunc)
{
	var symbol = document.createElement("input");
	symbol.setAttribute('type', 'number');
	
	if(!last)
		symbol.classList.add('address');
	symbol.id = 'symbol' + id;
	symbol.placeholder = id;
	symbol.addEventListener("change", (event) => { updateFunc(event); });
	symbol.dataset.valid = false;
	
	return symbol;
}
			
function createResourceLocationInput(document, id, isList, minWidth, updateFunc)
{
	var resourceLocation = document.createElement("input");
	resourceLocation.setAttribute('type', 'text');
	if(isList)
		resourceLocation.classList.add('listInput');
	resourceLocation.id = id;
	resourceLocation.name = id;
	resourceLocation.placeholder = 'namespace:' + id;
	resourceLocation.style.minWidth = minWidth
	resourceLocation.addEventListener("change", (event) => { updateFunc(event); });
	resourceLocation.dataset.valid = false;
	
	return resourceLocation;
}



// Helper Functions for creating values from inputs

function createAddress(par, length)
{
	var symbols = [];
	symbols[0] = par.querySelector("input[id='symbol1']");
	symbols[1] = par.querySelector("input[id='symbol2']");
	symbols[2] = par.querySelector("input[id='symbol3']");
	symbols[3] = par.querySelector("input[id='symbol4']");
	symbols[4] = par.querySelector("input[id='symbol5']");
	symbols[5] = par.querySelector("input[id='symbol6']");
	if(length >= 8)
		symbols[6] = par.querySelector("input[id='symbol7']");
	if(length >= 9)
		symbols[7] = par.querySelector("input[id='symbol8']");
	
	var address = [];
	
	// Simultaneously validates address
	for(let i = 0; i < symbols.length; i++)
	{
		address[i] = parseInt(symbols[i].value);
		
		symbols[i].dataset.valid = isSymbolValid(address[i]);
		
		for(let j = 0; j < i; j++)
		{
			if(address[i] == address[j])
			{
				symbols[i].dataset.valid = false;
				symbols[j].dataset.valid = false;
			}
		}
	}
	
	return address;
}



// Helper Functions for validating inputs

function isNameValid(name)
{
	return name.length > 0;
}

function isResourceLocationValid(resourceLocation)
{
	var parts = resourceLocation.split(':');
	
	if(parts.length == 2 && parts[0].length > 0 && parts[1].length > 0)
		return true;
	
	return false;
}

function isSymbolValid(symbol)
{
	if(isNaN(symbol) || symbol == null || symbol <= 0)
		return false;
	
	return true;
}