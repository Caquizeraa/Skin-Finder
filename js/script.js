const skinImg = document.querySelector('.skin_img');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const button = document.querySelector('.download');

const fetchName = async (name) =>{
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.mojang.com/users/profiles/minecraft/${name}`;
    const apiResponse = await fetch(proxy+url);
    const data = await apiResponse.json()
    if(apiResponse.status==200){
        return data;
    }
}

const fetchSkin = async (name) =>{
    const nameData = await fetchName(name);
    if (nameData){
        skinImg.style.display = 'block';
        const id = nameData.id;
        const idFinal = id.slice(0,8) + '-' + id.slice(8,12) + '-' + id.slice(12,16) + '-' + id.slice(16,20) + '-' + id.slice(20);
        const skinDw =  await fetch(`https://crafatar.com/skins/${idFinal}`);
        console.log(skinDw.url);
        button.href = `${skinDw.url}`;
        const skin = await fetch(`https://crafatar.com/renders/body/${idFinal}?overlay`);
        skinImg.src =  skin.url;
    }else{
        skinImg.src = `https://crafatar.com/renders/body/ec561538-f3fd-461d-aff5-086b22154bce`;
        lastId = 'ec561538-f3fd-461d-aff5-086b22154bce';
    }
    input.value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    fetchSkin(input.value);
    
} );

button.addEventListener('click', (event)=>{
});

fetchSkin("Alex");