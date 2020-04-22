const axios = require('axios');
let Active=false;

setInterval(async function () {
    let FNo = Math.floor(Math.random() * 5) + 1;
    let RNo = Math.floor(Math.random() * 6) + 1;
    let col2L = Math.floor(Math.random() * 10) + 1;
    let smL = Math.floor(Math.random() * 10) + 1;
    let isActive = Math.floor(Math.random() * 2) + 1;
    if(isActive===1)
        Active=true;
    else
        Active=false;

    console.log(`Changing Smoke Level & CO2 Level at Floor no: ${FNo} - Room no: ${RNo} - Smoke Level: ${smL} - CO2 Level: ${col2L}`)
    try {
        const res = await axios.post('http://localhost:5000/update', {
            "Active":Active,
            "FloorNo": FNo,
            "RoomNo": RNo,
            "co2L": col2L,
            "smL": smL
        });
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
}, 1000);

