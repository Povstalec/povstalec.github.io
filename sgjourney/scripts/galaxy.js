const output = document.querySelector('.output');
const saveButton = document.querySelector('.saveButton');
const fileName = document.getElementById('fileName');

const name = document.getElementById('name');
const galaxy_type = document.getElementById('galaxy_type');
const default_symbols = document.getElementById('default_symbols');



saveButton.onclick = () =>
{
	saveJSON(fileName.value, createGalaxyString());
}

name.addEventListener("change", () => { drawOutput(createGalaxyString()); });
galaxy_type.addEventListener("change", () => { drawOutput(createGalaxyString()); });
default_symbols.addEventListener("change", () => { drawOutput(createGalaxyString()); });

function createGalaxyString()
{
	var json = {};
	
	json.name = name.value;
	name.dataset.valid = isNameValid(json.name);
	
	json.type = galaxy_type.value;
	galaxy_type.dataset.valid = isResourceLocationValid(json.type);
	
	json.default_symbols = default_symbols.value;
	default_symbols.dataset.valid = isResourceLocationValid(json.default_symbols);
	
	return JSON.stringify(json, null, 3);
}

// Initial json display
drawOutput(createGalaxyString());