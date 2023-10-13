class ViewMainPage {
    showDevices(list, element) {
        let e = document.getElementById("devicesList");
        e.innerHTML = "";
        for (let device of list) {
            let image = "temp.png";
            e.innerHTML += `<li class="collection-item avatar">
            <img src="images/${image}" alt="" class="circle">
            <span class="title">${device.name}</span>
            <p>id: ${device.device_id}</p>
            <p>key: ${device.key}</p>
            <p>time post: ${device.time_post}</p>
            <p>measurements: <a href=/web/measurement/bydevice/${device.device_id} >view</a></p>
          </li>  
          `;
        }
    }
}
