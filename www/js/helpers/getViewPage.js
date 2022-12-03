function getViewPage(pageName) {

    let page = views.find(view => view.name === pageName);

    console.log(page)

    if (!page) {
        return null;
    }

    let fields = page.fields.map(field => {

        let model = models.find(model => model.table === field.model);
        let fieldDefinition = model.fields.find(f => f.name === field.field);
        return fieldDefinition;

    });

    return fields;


}