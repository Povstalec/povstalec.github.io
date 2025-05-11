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