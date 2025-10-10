const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const token = process.env.PRIVATE_REPO_TOKEN; // secreto en Netlify
  const url = "https://api.github.com/repos/Informesttec/SSAA_demanda/actions/workflows/SSAA_semanal.yml/dispatches";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ref: "main" })
    });

    if (!res.ok) throw new Error(await res.text());
    return { statusCode: 200, body: "Workflow activado correctamente." };
  } catch (err) {
    return { statusCode: 500, body: "Error al activar workflow: " + err.message };
  }
};
