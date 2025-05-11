// Toggle dropdown
function dropdownFunction()
{
	document.getElementById("objectDropdown").classList.toggle("show");
}

// Close dropdown when cursor clicks outside
window.onclick = function(e)
{
	if (!e.target.matches('.dropButton'))
	{
		var objectDropdown = document.getElementById("objectDropdown");
		if(objectDropdown.classList.contains('show'))
			objectDropdown.classList.remove('show');
	}
}