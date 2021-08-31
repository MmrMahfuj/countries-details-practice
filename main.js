

const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('searchInput');
const countryContainer = document.getElementById('country-container');
const errorDiv = document.getElementById('error');
const countryDetails = document.getElementById("country-details");
const spinner = document.getElementById("spinner");


// load all countries 
spinner.classList.remove('d-none')
fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .then(data => {
        spinner.classList.add('d-none');
        loadData(data);
    })

function loadData(countriesAll) {
    console.log(countriesAll);
    countriesAll.forEach(country => {
        console.log(country)
        const div = document.createElement('div');
        div.classList.add("col-md-3")
        div.innerHTML = `
        <!-- Image -->
      <div class="rounded overflow-hidden border p-2">
        <img
          src="${country.flag}"
          class="w-100"
          alt=""
        />
      </div>
      <!-- Body -->
      <div
        class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-md-center
        "
      >
        <h1>${country.name}</h1>
        <button onclick="showDetails('${country.alpha3Code}')" class="btn btn-dark">Learn More</button>
      </div>
        `;
        countryContainer.appendChild(div);
    })
}



// search section start 
searchBtn.addEventListener('click', function () {
    const search = searchInput.value;
    if (search === '') {
        errorDiv.classList.remove('d-none');
        errorDiv.innerText = 'Search field cannot be empty.';
        return;
    }
    // clean
    countryContainer.textContent = '';
    countryDetails.textContent = '';

    const url = `https://restcountries.eu/rest/v2/name/${search}`

    spinner.classList.remove('d-none');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            spinner.classList.add('d-none');
            showData(data);
        })
})

const showData = (countryArray) => {
    // error handling 
    if (countryArray.message === "Not Found") {
        errorDiv.classList.remove('d-none')
        errorDiv.innerText = 'NO Result Found';
        return;
    }
    else {
        errorDiv.classList.add('d-none')
        errorDiv.innerText = '';
    }
    // console.log(countryArray);
    searchInput.value = '';

    countryArray.map(item => {
        const div = document.createElement('div');
        div.classList.add("col-md-3")
        div.innerHTML = `
        <!-- Image -->
      <div class="rounded overflow-hidden border p-2">
        <img
          src="${item.flag}"
          class="w-100"
          alt=""
        />
      </div>
      <!-- Body -->
      <div
        class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-md-center
        "
      >
        <h1>${item.name}</h1>
        <button onclick="showDetails('${item.alpha3Code}')" class="btn btn-dark">Learn More</button>
      </div>
        `;
        countryContainer.appendChild(div);
    })
}

function showDetails(itemAlpha3Code) {
    window.scrollTo(0, 40);
    fetch(`https://restcountries.eu/rest/v2/alpha/${itemAlpha3Code}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            countryDetails.innerHTML = `
            <div class="col-md-12 bg-light border rounded">
                <h1>${data.name}</h1>
                <p>Capital: ${data.capital}</p>
                <p>Currency Name: ${data.currencies[0].name}</p>
                <p>Currency Symbol: ${data.currencies[0].symbol}</p>
                <p>Numeric Code: ${data.numericCode}</p>
                <p>Population: ${data.population}</p>
                <p>Demonym: ${data.demonym}</p>
                <p>Timezones: ${data.timezones[0]}</p>
                <p>Languages: ${data.languages[0].name}, Native Name: ${data.languages[0].nativeName}</p>
            </div>
            `;
        })
}