//const ABYDOS_CARTOUCHE = "https://raw.githubusercontent.com/Povstalec/StargateJourney/refs/heads/main/src/main/resources/data/sgjourney/sgjourney/address_table/cartouche_abydos.json";


function getJsonFromUrl(url)
{
	fetch(url)
	.then(rep => rep.json())
	.then(data =>
	{
		drawOutput(JSON.stringify(data, null, 3));
	})
}