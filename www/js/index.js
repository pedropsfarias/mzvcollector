const App = loadVueComponent('../App.vue');

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    const { createApp } = Vue
    const app = createApp(App);
    app.use(ElementPlus);
    app.mount('#app');
    //
    // document.addEventListener('deviceready', function () {
    //window.db = window.openDatabase({ name: 'test.db', location: 'default' });
    // db.transaction(function (tr) {
    //     tr.executeSql('SELECT * FROM MyTable', [], function (tr, rs) {
    //         console.log('Got upperString result: ', rs.rows);
    //     });
    // });
    // db.executeSql('SELECT * FROM MyTable', [], function (rs) {
    //     console.log('Got upperString result: ', rs.rows);
    // }, console.error);
    //});


    window.db = openDatabase("Teste", "1.0", "Teste Web SQL Database", 200000);

    let Cliente = new GenericModel({ db, modelDefinition: models[0] });
    let Motorista = new GenericModel({ db, modelDefinition: models[1] });
    let Veiculo = new GenericModel({ db, modelDefinition: models[2] });
    let Romaneio = new GenericModel({ db, modelDefinition: models[3] });



}
