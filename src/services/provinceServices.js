const fb = require('@/firebaseConfig.js')

const mapPath = (paths, data) => {
    return paths.map((path, index) => {
        path['id'] = "DO-" + (index + 1);
        path['style'] = path.cases > 0 ? data.style : "fill: #66bb6a; stroke: rgb(247, 247, 247); stroke-width: 1.29247px;";
        path['styleFilled'] = data.styleFilled;
        path['hover'] = false;
        return path;
    });
};

const defaultData = {
    styleFilled: "fill: rgb(239, 177, 177); stroke: rgb(247, 247, 247); stroke-width: 1.29247px;",
    style: "fill: rgb(224, 101, 101); stroke: rgb(247, 247, 247); stroke-width: 1.29247px;"
};

const getProvinces = () => {
    return new Promise((resolve, reject) => {
        fb.provinces.on('value', (snapshot) => {
            resolve(mapPath(snapshot.val() || [], defaultData));
        },reject)
    });
};

const getProvincesStat = () => {
    return new Promise( (resolve, reject) => {
                fb.provincesStat.on('value', snapshot => resolve(snapshot.val() || {}), reject)
        })
}

const updateProvincesStat = provincesStat => fb.provincesStat.set(provincesStat)
const updateProvinces = provinces => fb.provinces.set(provinces)

export default {
    getProvinces,
    getProvincesStat,
    updateProvincesStat,
    updateProvinces
}
