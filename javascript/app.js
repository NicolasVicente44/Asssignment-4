async function fetchData() {
  const apiKey = "3000ebe8c0msh5cd3674e9b2a9e4p11434cjsnc33abb738c7d";
  const url = "https://realtor.p.rapidapi.com/agents/list";
  const queryParams = new URLSearchParams({
    postal_code: "11234",
    offset: "0",
    limit: "20",
    types: "agent",
    sort: "recent_activity_high",
  });

  const fullUrl = `${url}?${queryParams}`;

  const headers = new Headers({
    "X-RapidAPI-Key": apiKey,
    "X-RapidAPI-Host": "realtor.p.rapidapi.com",
  });

  const options = {
    method: "GET",
    headers: headers,
  };

  try {
    const response = await fetch(fullUrl, options);
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    const realtors = await response.json();
    console.log(realtors);

    displayRealtors(realtors);
  } catch (error) {
    console.error(error);
  }
}

function displayRealtors(realtors) {
  const realtorContainer = document.getElementById("realtorContainer");

  if (!realtors || !realtors.agents || !Array.isArray(realtors.agents)) {
    console.error("Invalid data structure or missing agents array.");
    return;
  }

  console.log(realtors);

  realtors.agents.forEach((realtor) => {
    const websiteLink = document.createElement("a");
    websiteLink.href = realtor.web_url;
    websiteLink.classList.add("realtor-card"); // Apply the realtor-card styles

    const name = document.createElement("h2");
    name.textContent = realtor.name;

    const agency = document.createElement("p");
    agency.textContent = `Agency: ${realtor.broker.name}`;

    const photo = document.createElement("img");
    if (realtor.photo && realtor.photo.href) {
      photo.src = realtor.photo.href;
      photo.alt = `${realtor.name}'s Photo`;
    } else {
      photo.src = "placeholder.jpg";
      photo.alt = "No Photo Available";
    }

    const phone = document.createElement("p");
    phone.textContent = `Phone: ${realtor.phones[0].number}`; // Assuming the phone number is in the first index

    const email = document.createElement("p");
    email.textContent = `Email: ${realtor.email}`;

    photo.style.maxWidth = "250px";
    photo.style.maxHeight = "250px";

    websiteLink.appendChild(photo);
    websiteLink.appendChild(name);
    websiteLink.appendChild(agency);
    websiteLink.appendChild(phone);
    websiteLink.appendChild(email);

    realtorContainer.appendChild(websiteLink);
  });
}

fetchData();
