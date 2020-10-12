const fetchData = async (location) => {
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            q: location,
            appid: "c8add47e47aff6a67c033828ff8df90a"
        }
    });

    console.log(data);
};

const button = document.querySelector("#button");
const input = document.querySelector("#input");

button.addEventListener("click", (e) => {
    e.preventDefault();
    fetchData(input.value);
});

// const fetchData = () => {
//     fetch("https://api.openweathermap.org/data/2.5/weather?q=Mafikeng,za&APPID=c8add47e47aff6a67c033828ff8df90a")
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error(`Status code error: ${response.status}`);
//             } else {
//                 response.json().then((data) => {
//                     console.log(data)
//                 })
//             }
//         }).catch((error) => {
//             console.log("Oops something wrong");
//         });
// };

// fetchData();