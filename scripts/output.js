const output = document.querySelector('.output');
const saveButton = document.querySelector('.saveButton');
const fileName = document.getElementById('fileName');

saveButton.onclick = () =>
{
	saveJSON(fileName.value, createSolarSystemJSON());
}

function saveJSON(fileName, fileContent)
{
	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:attachment/text,' + encodeURI(fileContent);
	hiddenElement.target = '_blank';
	hiddenElement.download = fileName + '.json';
	hiddenElement.click();
}



function clearOutput()
{
	output.innerHTML = '';
}

function drawOutput(dataString)
{
	output.innerHTML = `<div><pre>${dataString}</pre></div>`;
}