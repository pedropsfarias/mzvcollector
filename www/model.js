window.models = [
    {
        table: 'cliente',
        fields: [
            { name: 'id', title: '#', type: 'TEXT', pk: true },
            { name: 'nome', title: 'Nome', type: 'TEXT' },
        ]
    },
    {
        table: 'motorista',
        fields: [
            { name: 'id', title: '#', type: 'TEXT', pk: true },
            { name: 'nome', title: 'Nome', type: 'TEXT' },
        ]
    },
    {
        table: 'veiculo', fields: [
            { name: 'id', title: '#', type: 'TEXT', pk: true },
            { name: 'placa', title: 'Placa', type: 'TEXT' },
        ]
    },
    {
        table: 'romaneio',
        fields: [
            { name: 'id', title: '#', type: 'TEXT', pk: true },
            { name: 'numero', title: 'Numero', type: 'INTEGER' },
            { name: 'data', title: 'Data', type: 'DATE' },
            { name: 'cliente_id', title: 'Cliente', type: 'INTEGER', references: 'cliente', fk: 'id', descriptive: 'nome', hasMany: true },
            { name: 'motorista_id', title: 'Motorista', type: 'INTEGER', references: 'motorista', fk: 'id', descriptive: 'nome' },
            { name: 'veiculo_id', title: 'Placas Veiculos', type: 'INTEGER', references: 'veiculo', fk: 'id', descriptive: 'placa' },
            { name: 'status', title: 'Status', type: 'INTEGER' }
        ]
    }
]