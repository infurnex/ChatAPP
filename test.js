import axios from "axios"

const fun = async  () => {
    const res  = await axios.get("https://avatar.iran.liara.run/public/boy")
    console.log(res);
}

await fun()